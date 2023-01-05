import { JscadToCommon } from '@jscadui/format-jscad'
import { initMessaging } from '@jscadui/postmessage'
import { require, requireModule, relativeRequire, clearTempCache } from '@jscadui/require'

import { combineParameterDefinitions, getParameterDefinitionsFromSource } from './getParameterDefinitionsFromSource.js'

let main
self.JSCAD_WORKER_ENV = {}
let requireForScript = require
let transformFunc = x=>x
let client

export const init = params => {
  let { baseURI, alias = [] } = params
  if (!baseURI && typeof document !== 'undefined' && document.baseURI) {
    baseURI = document.baseURI
  }else{
    baseURI = location.origin
  }

  if (baseURI) requireForScript = relativeRequire(baseURI)

  alias.forEach(arr => {
    const [orig, ...aliases] = arr
    aliases.forEach(a => {
      require.alias[a] = orig
      if (a.toLowerCase().substr(-3) !== '.js') {
        require.alias[a + '.js'] = orig
      }
    })
  })
}

export function runMain({ params } = {}) {
  const transferable = []

  let time = Date.now()
  const solids = main(params || {})
  const solidsTime = Date.now() - time

  time = Date.now()
  JscadToCommon.clearCache()
  const entities = JscadToCommon(solids, transferable, false)

  client.sendNotify('entities', { entities, solidsTime, entitiesTime: Date.now() - time }, transferable)
}

export const initScript = ({ script, url }) => {

  const scriptModule = requireModule(url, script, requireForScript)
  
  main = scriptModule.exports.main

  const fromSource = getParameterDefinitionsFromSource(script)
  const def = combineParameterDefinitions(fromSource, scriptModule.exports.getParameterDefinitions)
  return { def }
}

export const runFile = async ({file})=>{
  // console.log('runFile', file)
  const r = await fetch(file)
  // console.log('response', r)
  const text = await r.text()
  // console.log('content', text)
  // console.log('alias', require.alias)
  const script = transformFunc(text).code
  initScript({script, url:file})
  runMain({})
}

const handlers = { initScript, init, runMain, runFile, clearTempCache}

export const initWorker = (transform)=>{
  if(transform) transformFunc = transform

  client = initMessaging(self, handlers)
}
