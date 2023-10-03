import { initMessaging } from '@jscadui/postmessage'

// https://gomakethings.com/series/service-workers/

const version = 'SW7'
const clientMap = {}
let prefix = new URL(location.toString()).searchParams.get('prefix')
let initPath = prefix + 'init'

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})

self.addEventListener('install', event => {
  // https://gomakethings.com/how-to-immediately-activate-a-service-worker-with-vanilla-js/
  self.skipWaiting()
})

const getClientWrapper = async clientId =>{
  let clientWrapper = clientMap[clientId]
  if(!clientWrapper){
    clientWrapper = clientMap[clientId] = initMessaging(await clients.get(clientId), {})
    clientWrapper.cache = await caches.open(prefix + clientId)
  }
  return clientWrapper
}

self.addEventListener('fetch', async event => {
  const urlPath = event.request.url
  let path = new URL(urlPath).pathname
  if (path === initPath) {
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

        let time = Date.now()
        const fileReq = new Request(path)
        let rCached = await clientWrapper.cache.match(fileReq)
        if (rCached) {
          resolve(rCached)
          return (done = true)
        }

        let resp = await clientWrapper.sendCmd('getFile', { path: path })
        rCached = await clientWrapper.cache.match(fileReq)
        done = true
        resolve(rCached || new Response(path + ' not in cache', { status: rCached ? 200 : 404 }))
      }),
    )
  }
})

self.addEventListener('message', event => {
  const client = clientMap[event.source.id]
  client?.listener(event)
})

// clients.matchAll({
//   includeUncontrolled: true
// }).then(clients=>{
//   clients.forEach(client => {
//     console.log('client', client)
//   });
// });
