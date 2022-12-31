import { initMessaging } from "@jscadui/postmessage";
// https://gomakethings.com/series/service-workers/

const version = 'SW6'
const clientMap = {}
let prefix = ''
let initPath = prefix+'init'
self.addEventListener("activate", (event) => {
  prefix = new URL(location.toString()).searchParams.get('prefix')
  initPath = prefix+'init'
  event.waitUntil(clients.claim());
  console.log(version+' activate', prefix, 'location:',location, event)
  
});

self.addEventListener("install", (event) => {
  // https://gomakethings.com/how-to-immediately-activate-a-service-worker-with-vanilla-js/
  self.skipWaiting();
  console.log(version+' installed')
})

self.addEventListener("fetch", async (event) => {
  const urlPath = event.request.url
  let path = new URL(urlPath).pathname
  if(path === initPath){
    const clientId = event.clientId;
    event.respondWith(new Response(clientId));
    const client = await clients.get(clientId)
    console.log(version+' client init', urlPath, client, event)
    clientMap[clientId] = initMessaging(client,{})
    clientMap[clientId].cache = await caches.open(prefix+clientId)

  }else if(path.startsWith(prefix)){
    path = path.substring(prefix.length)
    let idx = path.indexOf('/')
    const clientId = path.substring(0,idx);
    path = path.substring(idx);
    const client = clientMap[clientId]
    console.log(version+' fetch', clientId, path, '\nclient', client, '\nevent', event)
    if(client){
      event.respondWith(new Promise(async (resolve, reject)=>{
        let done = false
        setTimeout(() => {
          if(!done) resolve(new Response('timeout for '+path,{status:404}))
        }, 1000);

        let time = Date.now()
        const fileReq = new Request(path)
        let rCached = await client.cache.match(fileReq)
        console.log(Date.now()-time ,'getFile cached', rCached)
        if(rCached) {
          resolve(rCached)
          return done = true 
        }

        let resp = await client.sendCmd('getFile',{path:path})
        console.log(Date.now()-time ,'getFile responded', resp)
        rCached = await client.cache.match(fileReq)
        done = true
        console.log(Date.now()-time ,'in cache ',path, rCached)
        resolve(rCached || new Response(path+' not in cache'))
      }));
    }else{
      event.respondWith(Promise.resolve(new Response('1234')));
    }
  }
})

self.addEventListener("message", (event) => {
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