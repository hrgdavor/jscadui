import { JscadToCommon } from '@jscadui/format-jscad'
import { initMessaging } from '@jscadui/postmessage'
import { require, requireCache, clearTempCache, readFileWeb } from '@jscadui/require'

import { combineParameterDefinitions, getParameterDefinitionsFromSource } from './getParameterDefinitionsFromSource.js'

let main
self.JSCAD_WORKER_ENV = {}
let transformFunc = x=>x
let client
let base

export const init = params => {
  let { baseURI, alias = [], bundles = {} } = params
  if (!baseURI && typeof document !== 'undefined' && document.baseURI) {
    baseURI = document.baseURI
  }else{
    baseURI = location.origin
  }
  base = baseURI

  Object.assign(requireCache.bundleAlias, bundles)
  console.log('bundles', bundles, requireCache.bundleAlias)
  alias.forEach(arr => {
    const [orig, ...aliases] = arr
    aliases.forEach(a => {
      requireCache.alias[a] = orig
      if (a.toLowerCase().substr(-3) !== '.js') {
        requireCache.alias[a + '.js'] = orig
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
  console.log('runFile', file, base, requireCache.alias)
  const r = await fetch(file)
  // console.log('response', r)
  const text = await r.text()
  // console.log('content', text)
  // console.log('alias', require.alias)
  // const script = transformFunc(text, file).code
  // initScript({script, url:file})
  
  const script = require(file, transformFunc, readFileWeb, base)
  main = script.main
  runMain({})
}

const handlers = { initScript, init, runMain, runFile, clearTempCache}

export const initWorker = (transform)=>{
  if(transform) transformFunc = transform

  client = initMessaging(self, handlers)
}
