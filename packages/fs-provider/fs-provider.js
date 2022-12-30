import { initMessaging } from '@jscadui/postmessage'

export const getFile = async (path, sw) => {
  return path + '-response'
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
        await sw.cache.put(new Request(path), new Response(await _getFile(path, sw)))
        return 'ok'
      },
    })
    sw.roots = []
    sw.libRoots = []

    // id is important as we use it to name the temporary cache instance
    // for now we use fetch to extract our id, but a better way could be found later
    const id = await fetch(prefix + 'init').then(r => r.text())
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

// https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree/53058574#53058574
export const readDir = async dir => {
  const directoryReader = dir.createReader()
  let entries = [];
  let readEntries = await readEntriesPromise(directoryReader);
  while (readEntries.length > 0) {
    entries.push(...readEntries);
    readEntries = await readEntriesPromise(directoryReader);
  }
  return entries;
}

async function readEntriesPromise(directoryReader) {
  try {
    return await new Promise((resolve, reject) => {
      directoryReader.readEntries(resolve, reject);
    });
  } catch (err) {
    console.log(err);
  }
}
