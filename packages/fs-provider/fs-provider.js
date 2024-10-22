import { messageProxy } from '@jscadui/postmessage'

import { toFSEntry, entryCheckPromise } from './src/FSEntry.js'
import { readAsArrayBuffer, readAsText } from './src/FileReader.js'

/**
 * @typedef {import('./src/FSEntry.js').FSEntry} FSEntry
 * @typedef {import('./src/FSEntry.js').FSDirectoryEntry} FSDirectoryEntry
 * @typedef {import('./src/FSEntry.js').FSFileEntry} FSFileEntry
 *
 * @typedef SwHandler
 * @prop {string} id
 * @prop {string} fileToRun
 * @prop {string} folderName
 * @prop {string} projectName
 * @prop {string} defProjectName
 * @prop {Array<FSFileEntry>} filesToCheck
 * @prop {Array<Array<FSEntry>>} roots
 * @prop {number} lastCheck
 * @prop {string} base
 * @prop {unknown} api
 * @prop {Cache} cache
 * @prop {OnFilesChangeHandler} onfileschange
 * @prop {Array<undefined>} libRoots This is never used. TODO Remove
 * 
 * @typedef {Function} OnFilesChangeHandler
 * @param {Array<FSFileEntry>} files
 * @returns {void}
 * 
 * @typedef WorkspaceAlias
 * @prop {string} name
 * @prop {string} path
 *
 * 
 * @typedef PathInfo
 * @prop {string} url
 * @prop {string} filename
 * @prop {string} ext
 */

export * from './src/FileReader.js'
export * from './src/FSEntry.js'

/**
 * @param {string | Array<string>} path
 * @returns {Array<string>}
 */
export const splitPath = path => (typeof path === 'string' ? path.split('/').filter(p => p && p !== '.') : path)

/**
 * 
 * @param {string} url 
 * @returns {PathInfo}
 */
export function extractPathInfo(url) {
  let idx = url.lastIndexOf('/')
  const filename = url.substring(idx + 1)
  idx = filename.lastIndexOf('.')
  const ext = filename.substring(idx + 1)
  return { url, filename, ext }
}

/**
 * @param {string} path
 * @param {SwHandler} sw
 * @returns {Promise<FSFileEntry | undefined>}
 */
export const getFile = async (path, sw) => {
  const arr = splitPath(path)
  return await findFileInRoots(sw.roots, arr)
}

/**
 * @param {string} path
 * @param {SwHandler} sw
 * @returns {Promise<ArrayBuffer | undefined>}
 */
export const getFileContent = async (path, sw) => {
  const match = await getFile(path, sw)
  if (match) {
    fileIsRequested(path, match, sw)
    return readAsArrayBuffer(match)
  }
}

/**
 * @param {FSDirectoryEntry} dir
 * @returns {Promise<Array<FSEntry>>}
 */
export const readDir = async dir => {
  const out = []
  for await (const fileHandles of dir.handle.values()) {
    out.push(toFSEntry(fileHandles, dir))
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


/**
 * @param {SwHandler} sw 
 * @param {Array<string>} paths 
 * @param {boolean} ignoreMissing 
 * @returns {Promise<[string, FSFileEntry | undefined][]>}
 */
export const addPreLoadAll = async (sw, paths, ignoreMissing) => {
  /** @type {[string, FSFileEntry | undefined][]}*/
  const out = []
  for (const path of paths) {
    //todo load parallel
    const match = await addPreLoad(sw, path, ignoreMissing)
    out.push([path, match])
  }
  return out
}

/**
 * @param {SwHandler} sw 
 * @param {string} path 
 * @param {boolean} ignoreMissing 
 * @returns {Promise<FSFileEntry | undefined>}
 */
export const addPreLoad = async (sw, path, ignoreMissing) => {
  const match = await findFileInRoots(sw.roots, path)
  if (!match) {
    if (!ignoreMissing) throw new Error('File not found ' + path)
    return
  }
  const f = await match.handle.getFile()
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

/**
 * @param {SwHandler} sw 
 */
export const clearFs = async sw => {
  sw.roots = []
  sw.libRoots = []
  await clearCache(sw.cache)
}

/**
 * @param {Cache} cache 
 */
export const clearCache = async cache => {
  const keys = await cache.keys()
  await Promise.all(keys.map(key => cache.delete(key)))
}

/**
 *
 * @param {DataTransfer} dt
 * @returns {Promise<Array<FSEntry>>}
 */
export const extractEntries = async dt => {
  const items = dt.items
  if (!items) return []

  const root = {
    name: '',
    fsDir: '',
    fullPath: '',
  }

  /** @type {Array<FSEntry>} */
  const fsEntries = []
  // Use DataTransferItemList interface to access the items(s).
  // todo remove usage of FileEntry webkitGetAsEntry and use new File_System_API
  // todo load files parallel

  // DataTransferItemList is not an array by default
  for (const item of Array.from(items)) {
    // If dropped items aren't files or directories, reject them
    // Directories also have kind === 'file'
    if (item.kind === 'file') {
      const handle = await item.getAsFileSystemHandle()
      const fsEntry = toFSEntry(handle, root)
      fsEntries.push(fsEntry)
    }
  }
  return fsEntries
}

/**
 * 
 * @param {Array<Array<FSEntry>>} roots 
 * @param {Array<string> | string} path 
 * @returns {Promise<FSFileEntry | undefined>}
 */
export const findFileInRoots = async (roots, path) => {
  const paths = splitPath(path)
  for (const root of roots) {
    const out = await findFile(root, paths, 0)
    if (out) return out
  }
}

/**
 * Finds a file by path
 * @param {Array<FSEntry>} arr 
 * @param {Array<string>} path 
 * @param {number} i The current position in the path
 * @returns {Promise<FSFileEntry | undefined>}
 */
export const findFile = async (arr, path, i) => {
  const name = path[i]
  const match = arr.find(f => f.name === name)
  if (match) {
    if (i >= path.length - 1) {
      if (match.isFile) {
        return match
      } else {
        return undefined
      }
    }

    if (match.isDirectory) {
      const children = await loadDir(match)
      return findFile(children, path, i + 1)
    } else {
      return undefined
    }
  }
}

/**
 * @param {FSDirectoryEntry} dir 
 * @returns {Promise<Array<FSEntry>>}
 */
export const loadDir = async dir => {
  if (dir.isDirectory && dir.children === undefined) {
    dir.children = await readDir(dir)
  }
  return dir.children ?? []
}

/**
 * This function is async but it is intentionally called without await
 * @param {SwHandler} sw 
 */
export const checkFiles = async sw => {
  const now = Date.now()
  if (now - sw.lastCheck > 300 && sw.filesToCheck.length != 0) {
    sw.lastCheck = now
    let filesToCheck = await Promise.all(sw.filesToCheck.map(entryCheckPromise))
    filesToCheck = filesToCheck.filter(([entry, _file]) => entry.lastModified != entry._lastModified)
    if (filesToCheck.length) {
      const addToCachePromises = filesToCheck.map(([entry, file]) => addToCache(sw.cache, entry.fullPath, file))
      const files = filesToCheck.map(([entry, _file]) => entry.fullPath)
      await Promise.all(addToCachePromises)//All files must be added to cache
      sw.onfileschange?.(files)
    }

    // TODO clear sw cache
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
  const candidates = ['index.js', 'index.ts']
  sw.fileToRun = candidates[0]
  clearFs(sw)
  /** @type {Array<FSEntry>}*/
  let rootFiles = []
  if (files.length === 1) {
    const file = files[0]
    if (file.isDirectory) {
      sw.folderName = file.name
      file.fullPath = ''
      candidates.push(sw.folderName + '.js')
      candidates.push(sw.folderName + '.ts')
      rootFiles = await readDir(file)
      for (const candidate of candidates) {
        const found = await findFileInRoots([rootFiles], candidate)
        if (found) {
          sw.fileToRun = candidate
          break
        }
      }
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
  if (sw.folderName) {
    sw.projectName = sw.folderName
  } else if (sw.fileToRun !== 'index.js') {
    sw.projectName = sw.fileToRun.replace(/\.js$/, '')
  }

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
  const pkgFile = await findFileInRoots(sw.roots, 'package.json')
  if (pkgFile) {
    try {
      sw.filesToCheck.push(pkgFile)
      const pack = JSON.parse(await readAsText(pkgFile))
      if (pack.main) sw.fileToRun = pack.main
      if (pack.workspaces)
        for (const workspace of pack.workspaces) {
          const workspacePackageFile = await findFileInRoots(sw.roots, `/${workspace}/package.json`)
          let workspacePackageJson
          if (workspacePackageFile) workspacePackageJson = JSON.parse(await readAsText(workspacePackageFile))
          const name = workspacePackageJson?.name ?? workspace
          const main = workspacePackageJson?.main ?? 'index.js'
          alias.push({ name, path: `/${workspace}/${main}` })
        }
    } catch (error) {
      error.message = `failed to parse package.json\n  ${error}`
      throw error
    }
  }
  return alias
}

/**
 * @param {Array<FSFileEntry>} arr 
 * @param {FSFileEntry | string} file 
 * @returns 
 */
export const findByFullPath = (arr, file) => {
  const path = typeof file === 'string' ? file : file.fullPath
  return arr.find(f => f.fullPath === path)
}

/**
 * @param {string} path 
 * @param {FSFileEntry} file 
 * @param {SwHandler} sw 
 */
export const fileIsRequested = (path, file, sw) => {
  const match = findByFullPath(sw.filesToCheck, file)
  if (match) return
  sw.filesToCheck.push(file)
}
