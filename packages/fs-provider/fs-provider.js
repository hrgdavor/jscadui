import { initMessaging } from '@jscadui/postmessage'

import { filePromise, readDir } from './src/FileEntry.js'
import { readAsArrayBuffer } from './src/FileReader.js'

export * from './src/FileReader.js'
export * from './src/FileEntry.js'

export const splitPath = path => (typeof path === 'string' ? path.split('/').filter(p => p && p !== '.') : path)

export const getFile = async (path, sw) => {
  let arr = splitPath(path)
  let match = await findFileInRoots(sw.roots, arr)
  if (match) return readAsArrayBuffer(await filePromise(match))
}

export const addToCache = async (cache, path, content) => cache.put(new Request(path), new Response(content))

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
  let f = await filePromise(match)
  await addToCache(sw.cache, path, await readAsArrayBuffer(f))
  return match
}

export const registerServiceWorker = async (workerScript, _getFile = getFile, { prefix = '/swfs/' } = {}) => {
  if ('serviceWorker' in navigator) {
    try {
      let registration = await navigator.serviceWorker.register(workerScript, {
        scope: '/',
      })
      for (let i = 1; i <= 10; i++) {
        if (registration.active) break
        registration = await navigator.serviceWorker.getRegistration()
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`)
    }
    const sw = initMessaging(navigator.serviceWorker, {
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
    sw.roots = []
    sw.libRoots = []

    // id is important as we use it to name the temporary cache instance
    // for now we use fetch to extract our id, but a better way could be found later
    const id = await fetch(prefix + 'init').then((res) => {
      if (!res.ok) {
        throw new Error('failed to start service worker')
      }
      return res.text()
    })
    sw.id = id
    const cacheId = prefix + id
    window.addEventListener('beforeunload', e => caches.delete(cacheId))

    sw.cache = await caches.open(cacheId)
    return sw
  }
}

export const clearFs = async sw => {
  sw.roots = []
  sw.libRoots = []
  return clearCache(sw.cache)
}

export const clearCache = async cache => {
  await cache.keys(key => cache.delete(key))
}

export const extractEntries = dt => {
  let items = dt.items
  if (!items) return []

  let file
  let files = []
  // Use DataTransferItemList interface to access the items(s).
  // it is not an array, can not use .filter or othe Array methods
  for (let i = 0; i < items.length; i++) {
    // If dropped items aren't files, reject them
    if (items[i].kind === 'file') {
      file = items[i]
      if (file.webkitGetAsEntry) file = file.webkitGetAsEntry()
      else if (file.getAsEntry) file = file.getAsEntry()
      else file = file.webkitGetAsFile()
      files.push(file)
    }
  }
  return files
}

export const findFileInRoots = async (roots, path) => {
  path = splitPath(path)
  let out
  for (let i = 0; i < roots.length; i++) {
    out = await findFile(roots[i], path, 0)
    if (out) break
  }
  return out
}

export const findFile = async (arr, path, i) => {
  let name = path[i]
  let match = arr.find(f => f.name === name)
  if (match) {
    if (i >= path.length - 1) {
      return match
    }
    return findFile(await loadDir(match), path, i + 1)
  }
}

export const loadDir = async dir => {
  if (dir.isDirectory && !dir.children) {
    dir.children = await readDir(dir)
  }
  return dir.children || []
}
