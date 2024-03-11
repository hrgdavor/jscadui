# postMessage utility

Allows for simpler usage of [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) by defining a RPC protocol that can send notifications or call methods. 
Calling methods is handled with Promises because the postMessage is async by definition.

If you use this utility both in your main thread and in the worker you will get the most benefits.

Consider these steps depending on the complexity

1. **postMessage**: if you have only few messages pushing some data, you do not even need this
2. **RPC:** if you have messages, and some of them are response to a request(functionally) you should try formalizing a protocol and this RPC here can be a good starting point
3. **Proxy+methods:** as soon as you are considering RPC, I would recommend going the step further and formalize the communication with documented method names and parameter types (TS or JSDoc) and use the Proxy object to have nice code hints in your IDE.

# RPC protocol

The RPC protocol is inspired by JSONRPC, as I personally found it useful in multiple projects.

**Request:** Structure the top level object like this:

 - `method` - name of the method called
 - `params` - array of parameters
 - `id` - id of the request. Optional, not used for one-way notifications. Used to match response with the original request.

**Response:** Structure the top level object like this:

 - `response` - value returned by the method
 - `error` - `{code,message,stack}` if method fails
 - `id` - id of the request to match this response to

# Proxy  object and method definitions

With modern JavaScript we can go few steps further and make communication with worker be as simple 
as calling methods(all of them async ofc.).

Here is partial sample of jsdoc definitions for jscad worker
```ts
/**
@typedef InitOptions
@prop {String} baseURI - to resolve inital relative path
@prop {Array<Alias>} alias - 
@prop {Array<Alias>} bundles - bundle alias {name:path} 

@typedef ScriptResponse
@prop {Array<any>} entities  
@prop {number} mainTime  - script run time
@prop {number} convertTime  - tim converting script output to gl data

@typedef JscadWorker
@prop {String} name
@prop {(options:InitOptions)=>Promise<void>} init
@prop {(options:RunMainOptions)=>Promise<ScriptResponse>} runMain
*/
```

Manuall calling `init` worker method documented above, requires sending
`worker.postMessage({method:'init', params:[{bundles}]})` just to trigger the method.
Then you would also need to handle response, and wrap it  all into a promise

If you do not want to be fancy with typed code you can just use `initMessaging` and call worker methods using `sendCmd`.

```js
const {sendCmd } = initMessaging(worker, handlers, { onJobCount: trackJobs })
await sendCmd('init',[{ bundles }])
const result = await sendCmd('runScript', [{ script}])
// IDE does not know type of the result
```

You can then import and use the definition

```ts
/** @typedef {import('@jscadui/worker').JscadWorker} JscadWorker*/

/** @type {JscadWorker} */
const workerApi = messageProxy(worker, handlers, { onJobCount: trackJobs })
await workerApi.init({ bundles })
const result = await workerApi.runScript({ script})
// result is now known to be ScriptResponse and you get autocomplete
```




## transferable

It is simple to send transferable objects when sending a message to the worker by adding a parameter to `postMessage`.
It is however more tricky to support transferable for return values without complicating simple use cases that do not need transferable.

If you have a method that can be called and it needs to return transferable then you must use object as a return value.
When returning such object, include `__transferable` key in the return value. It will not be in the data at the receiving end but will be taken out and passed to postMessage as a transferable parameter.
