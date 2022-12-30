import { initMessaging } from "@jscadui/postmessage";

export const registerServiceWorker = async (workerScript, prefix='/swfs/') => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(workerScript, {
        scope: '/',
      })
      if (registration.installing) {
        console.log('Service worker installing')
      } else if (registration.waiting) {
        console.log('Service worker installed')
      } else if (registration.active) {
        console.log('Service worker active')
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`)
    }
    const sw = initMessaging(navigator.serviceWorker, {
      getFile: async ({ path }) => {
        await sw.cache.put(new Request(path), new Response(path + '-response'))
        return 'ok'
      },
    })

    const id = await fetch(prefix+'init').then(r => r.text())
    sw.id = id
    const cacheId = prefix + id
    window.addEventListener('beforeunload', e => caches.delete(cacheId))

    sw.cache = await caches.open(cacheId)
    return sw
  }
}
