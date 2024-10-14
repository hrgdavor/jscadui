import { messageProxy } from '@jscadui/postmessage'

import { toFSEntry, entryCheckPromise } from './src/FSEntry.js'
import { readAsArrayBuffer, readAsText } from './src/FileReader.js'

/**
 * @typedef {import('./src/FSEntry.js').FSEntry} FSEntry
  *
 * @typedef SwHandler
* @prop {string} id
 * @prop {string} fileToRun
 * @prop {string} folderName
* @prop {string} projectName
 * @prop {string} defProjectName
 * @prop {Array<FSEntry>} filesToCheck
 * @prop {Array<Array<FSEntry>>} roots
 * @prop {number} lastCheck
 * @prop {string} base
 * @prop {unknown} api
 * @prop {Cache} cache
* @prop {Array<undefined>} libRoots This is never used. TODO Remove
* 
 * @typedef WorkspaceAlias
 * @prop {string} name
 * @prop {string} path
 *
 */

export * from './src/FileReader.js'
export * from './src/FSEntry.js'

/**
 * @param {string | Array<string>} path
 * @returns {Array<string>}
 */
export const splitPath = path => (typeof path === 'string' ? path.split('/').filter(p => p && p !== '.') : path)
export function extractPathInfo(url) {
  let idx = url.lastIndexOf('/')
  let filename = url.substring(idx + 1)
  idx = filename.lastIndexOf('.')
  let ext = filename.substring(idx + 1)
  return { url, filename, ext }
}

/**
 * @param {string} path
 * @param {SwHandler} sw
 * @returns {Promise<FSEntry | undefined>}
 */
export const getFile = async (path, sw) => {
  const arr = splitPath(path)
  return await findFileInRoots(sw.roots, arr)
}

export const getFileContent = async (path, sw) => {
  let match = await getFile(path, sw)
  if (match) {
    fileIsRequested(path, match, sw)
    return readAsArrayBuffer(match)
  }
}

/**
 * @param {unknown} dir
 * @returns {Promise<Array<FSEntry>>}
 */
export const readDir = async dir => {
  const out = []
  for await (const [key, value] of dir.handle.entries()) {
    out.push(toFSEntry(value, dir))
  }
  return out
}

/** add path to cache, with content that can be anything that response allows
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
 *
 *
 * @param {Cache} cache
 * @param {string} path
 * @param {Blob|ArrayBuffer|TypedArray|DataView|FormData|ReadableStream|URLSearchParams|string} content
 * @returns {Promise<void>}
 */
export const addToCache = async (cache, path, content) => await cache.put(new Request(path), new Response(content))


export const addPreLoadAll = async (sw, paths, ignoreMissing) => {
  const out = []
  for (let i = 0; i < paths.length; i++) {
    const match = await addPreLoad(sw, paths[i], ignoreMissing)
    out.push([paths[i], match])
  }
  return out
}

export const addPreLoad = async (sw, path, ignoreMissing) => {
  const match = await findFileInRoots(sw.roots, path)
  if (!match) {
    if (!ignoreMissing) throw new Error('File not found ' + path)
    return
  }
  if(match.isDirectory) return
  let f = await match.handle.getFile()
  match.lastModified = f.lastModified
  await addToCache(sw.cache, path, await readAsArrayBuffer(f))
  return match
}

/**
 *
 * @param {*} workerScript
 * @param {*} _getFile
 * @param {*} param2
 * @returns {Promise<SwHandler>}
 */
export const registerServiceWorker = async (
  workerScript,
  _getFile = getFileContent,
  { prefix = '/swfs/', scope = '/' } = {},
) => {
  if ('serviceWorker' in navigator) {
    try {
      let reg = await navigator.serviceWorker.getRegistration()
      if (!reg) { // no sw register yet, go for it
        await navigator.serviceWorker.register(workerScript, { scope, })
      } else if (!navigator.serviceWorker.controller) {
        // handling hard refresh here
        await new Promise((resolve) => {
          const messageChannel = new MessageChannel()
          messageChannel.port1.onmessage = (event) => resolve(event.data)
          reg.active.postMessage({ type: 'CLAIM_CLIENTS' }, [messageChannel.port2])
        })
      }
    } catch (error) {
      console.error(`service worker registration failed with ${error}`)
    }

    // this code handle app first load, when the serviceWorker is still activating
    // here we force it to wait until it switch to 'ativated' state
    const rdy = await navigator.serviceWorker.ready
    if (rdy.active.state != 'activated') {
      await new Promise((resolve) => {
        const listener = () => {
          rdy.active.removeEventListener('statechange', listener)
          resolve()
        }
        rdy.active.addEventListener('statechange', listener)
      })
    }

    /** @type {SwHandler} */
    const sw = { roots: [], libRoots: [] }
    sw.api = messageProxy(navigator.serviceWorker, {
      getFile: async ({ path }) => {
        const file = await _getFile(path, sw)
        if (file) {
          await addToCache(sw.cache, path, file)
          return 'ok'
        } else {
          return 'not_found'
        }
      },
    })

    // id is important as we use it to name the temporary cache instance
    // for now we use fetch to extract our id, but a better way could be found later
    const id = await fetch(prefix + 'init').then(res => {
      if (!res.ok) {
        console.error(res)
        throw new Error('failed to start service worker')
      }
      return res.text()
    })
    sw.id = id
    const cacheId = prefix + id
    window.addEventListener('beforeunload', e => caches.delete(cacheId))

    sw.cache = await caches.open(cacheId)
    sw.defProjectName = 'project'
    sw.filesToCheck = []
    sw.lastCheck = Date.now()
    sw.base = new URL(`${prefix}${sw.id}/`, document.baseURI).toString()
    checkFiles(sw)

    return sw
  } else {
    throw new Error('service worker unavailable')
  }
}

export const clearFs = async sw => {
  sw.roots = []
  sw.libRoots = []
  return clearCache(sw.cache)
}

export const clearCache = async cache => {
  ; (await cache.keys()).forEach(key => cache.delete(key))
}



/**
 *
 * @param {DataTransfer} dt
 * @returns {Promise<Array<FSEntry>>}
 */
export const extractEntries = async dt => {
  let items = dt.items
  if (!items) return []

  const root = {
    name: '',
    fsDir: '',
    fullPath: '',
  }

  /** @type {FSEntry} */
  let file
  /** @type {Array<FSEntry>} */
  let files = []
  // Use DataTransferItemList interface to access the items(s).
  // it is not an array, can not use .filter or othe Array methods
  // todo remove usage of FileEetry webkitGetAsEntry and use new File_System_API
  for (let i = 0; i < items.length; i++) {
    // If dropped items aren't files, reject them
    if (items[i].kind === 'file') {
      file = toFSEntry(await items[i].getAsFileSystemHandle(), root)
      files.push(file)
    }
  }
  return files
}

/**
 * 
 * @param {Array<Array<FSEntry>>} roots 
 * @param {Array<string> | string} path 
 * @returns {Promise<FSEntry | undefined>}
 */
export const findFileInRoots = async (roots, path) => {
const paths = splitPath(path)
  let out
  for (let i = 0; i < roots.length; i++) {
    out = await findFile(roots[i], paths, 0)
    if (out) break
  }
  return out
}

/**
 * 
 * @param {Array<FSEntry>} arr 
 * @param {Array<string>} path 
 * @param {number} i 
 * @returns {Promise<FSEntry | undefined>}
 */
export const findFile = async (arr, path, i) => {
  const name = path[i]
  const match = arr.find(f => f.name === name)
  if (match) {
    if (i >= path.length - 1) {
      return match
    }
    return findFile(await loadDir(match), path, i + 1)
  }
}

/**
 * @param {FSEntry} dir 
 * @returns 
 */
export const loadDir = async dir => {
  if (dir.isDirectory && !dir.children) {
    dir.children = await readDir(dir)
  }
  return dir.children || []
}

/**
 * 
 * @param {SwHandler} sw 
 */
export const checkFiles = sw => {
  const now = Date.now()
  if (now - sw.lastCheck > 300 && sw.filesToCheck.length != 0) {
    sw.lastCheck = now
    let todo = sw.filesToCheck.map(entryCheckPromise)
    Promise.all(todo).then(result => {
      result = result.filter(([entry, file]) => entry.lastModified != entry._lastModified)
      if (result.length) {
        const todo = []
        const files = result.map(([entry, file]) => {
          todo.push(addToCache(sw.cache, entry.fullPath, file))
          return entry.fullPath
        })
        Promise.all(todo).then(result => {
          sw.onfileschange?.(files)
        })
      }
    })

    // TODO clear sw cache
    // TODO sendCmd jscadClearFileCache {files}
  }
  requestAnimationFrame(() => checkFiles(sw))
}

/**
 * 
 * @param {SwHandler} sw 
 * @param {Array<FSEntry>} files 
 */
export async function fileDropped(sw, files) {
  sw.filesToCheck.length = 0
  sw.fileToRun = 'index.js'
  clearFs(sw)
/** @type {Array<FSEntry>}*/
  let rootFiles = []
  if (files.length === 1) {
    const file = files[0]
    if (file.isDirectory) {
      sw.folderName = file.name
      file.fullPath = ''
      rootFiles = await readDir(file)
    } else {
      rootFiles.push(file)
      sw.fileToRun = file.name
    }
  } else {
    rootFiles = Array.from(files)
  }
  sw.roots.push(rootFiles)
}

/**
 * @param {SwHandler} sw 
 */
export async function analyzeProject(sw) {
  const alias = await getWorkspaceAliases(sw)

  if (sw.fileToRun && sw.fileToRun[0] != '/') {
    sw.fileToRun = `/${sw.fileToRun}`
  }

  const preLoad = [sw.fileToRun, '/package.json']
  const loaded = await addPreLoadAll(sw, preLoad, true)

  sw.projectName = sw.defProjectName
  if (sw.fileToRun !== 'index.js') sw.projectName = sw.fileToRun.replace(/\.js$/, '')
  if (sw.folderName) sw.projectName = sw.folderName

  let script = ''
  if (sw.fileToRun) {
    const file = await findFileInRoots(sw.roots, sw.fileToRun)
    if (file) {
      sw.filesToCheck.push(file)
      script = await readAsText(file)
    } else {
      throw new Error(`main file not found ${sw.fileToRun}`)
    }
  }
  return { alias, script }
}

/**
 * Parse package.json, and return a list of workspace aliases.
 * Also parses the main file to run, if any.
 *
 * @param {SwHandler} sw
 * @returns {Promise<Array<WorkspaceAlias>>}
 */
const getWorkspaceAliases = async sw => {
/** @type {Array<WorkspaceAlias>} */
  const alias = []
  let pkgFile = await findFileInRoots(sw.roots, 'package.json')
  if (pkgFile) {
    try {
      sw.filesToCheck.push(pkgFile)
      const pack = JSON.parse(await readAsText(pkgFile))
      if (pack.main) sw.fileToRun = pack.main
      if (pack.workspaces)
        for (let i = 0; i < pack.workspaces.length; i++) {
          const w = pack.workspaces[i]
          // debugger
          let pack2 = await findFileInRoots(sw.roots, `/${w}/package.json`)
          if (pack2) pack2 = JSON.parse(await readAsText(pack2))
          let name = pack2?.name || w
          let main = pack2?.main || 'index.js'
          alias.push({ name, path: `/${w}/${main}` })
        }
    } catch (error) {
      error.message = `failed to parse package.json\n  ${error}`
      throw error
    }
  }
  return alias
}

export const findByFullPath = (arr, file) => {
  const path = typeof file === 'string' ? file : file.fullPath
  return arr.find(f => f.fullPath === path)
}

export const fileIsRequested = (path, file, sw) => {
  const match = findByFullPath(sw.filesToCheck, file)
  if (match) return
  sw.filesToCheck.push(file)
}
