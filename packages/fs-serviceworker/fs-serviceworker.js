import { messageProxy } from '@jscadui/postmessage'

// https://gomakethings.com/series/service-workers/

const version = 'SW7'
const clientMap = {}
const searchParams = new URL(location.toString()).searchParams
let prefix = searchParams.get('prefix')
let initPath = prefix + 'init'
let debug = searchParams.get('debug')

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})

self.addEventListener('install', event => {
  // https://gomakethings.com/how-to-immediately-activate-a-service-worker-with-vanilla-js/
  self.skipWaiting()
})

/** Create a client wrapper, or return one from cache. It is important to know
 * that cache can disappear (likely due to browser suspending the worker when idle).
 * page calling init will create a cached instance, but if dev tools in chrome
 * are nto open, after about 10 seconds, looks like cache is gone (likely worker got suspended)
 *
 * @param {string} clientId
 * @returns
 */
const getClientWrapper = async clientId => {
  let clientWrapper = clientMap[clientId]
  if (!clientWrapper) {
    clientWrapper = clientMap[clientId] = { api: messageProxy(await clients.get(clientId), {}, { debug }) }
    clientWrapper.cache = await caches.open(prefix + clientId)
  }
  return clientWrapper
}

self.addEventListener('fetch', async event => {
  const urlPath = event.request.url
  let path = new URL(urlPath).pathname
  if (path === initPath) {
    // this procedure allows tab-page-client to know it's clientId
    // that way urls in worker can have clientId in path to preperly route file requests
    const clientId = event.clientId
    event.respondWith(new Response(clientId))
    getClientWrapper(clientId)
  } else if (path.startsWith(prefix)) {
    path = path.substring(prefix.length)
    let idx = path.indexOf('/')
    const clientId = path.substring(0, idx)
    path = path.substring(idx)
    event.respondWith(
      new Promise(async (resolve, reject) => {
        const clientWrapper = await getClientWrapper(clientId)
        let done = false
        setTimeout(() => {
          if (!done) resolve(new Response('timeout for ' + path, { status: 404 }))
        }, 1000)

        const fileReq = new Request(path)
        let rCached = await clientWrapper.cache.match(fileReq)
        if (rCached) {
          resolve(rCached)
          return (done = true)
        }

        let resp = await clientWrapper.api.getFile({ path: path })
        rCached = await clientWrapper.cache.match(fileReq)
        done = true
        resolve(rCached || new Response(path + ' not in cache', { status: rCached ? 200 : 404 }))
      }),
    )
  }
})

self.addEventListener('message', async event => {
  if (event.data?.type == 'CLAIM_CLIENTS') { // handling hard refresh
    await self.clients.claim();
    event.ports[0].postMessage(true)
  } else {
    const client = clientMap[event.source.id]
    if (client) client.api.onmessage(event)
  }
})
