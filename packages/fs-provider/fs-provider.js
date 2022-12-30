import { initMessaging } from '@jscadui/postmessage'

export const getFile = async (path, sw)=>{
  return path + '-response'
}

export const registerServiceWorker = async (workerScript, _getFile=getFile, {prefix = '/swfs/'}={}) => {
  if ('serviceWorker' in navigator) {
    try {
      let registration = await navigator.serviceWorker.register(workerScript, {
        scope: '/',
      })
      for(let i=1; i<=10; i++){
        if(registration.active) break;
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
