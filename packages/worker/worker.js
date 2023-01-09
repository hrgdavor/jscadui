import { JscadToCommon } from '@jscadui/format-jscad'
import { initMessaging, withTransferable } from '@jscadui/postmessage'
import { clearFileCache, clearTempCache, readFileWeb, require, requireCache, resolveUrl } from '@jscadui/require'

import { exportStlText } from './exportStlText.js'
import { combineParameterDefinitions, getParameterDefinitionsFromSource } from './getParameterDefinitionsFromSource.js'

let main
self.JSCAD_WORKER_ENV = {}
let transformFunc = x => x
let client
let base = location.origin

export const init = params => {
  let { baseURI, alias = [], bundles = {} } = params
  if (baseURI) base = baseURI

  if (bundles) Object.assign(requireCache.bundleAlias, bundles)
  alias?.forEach(arr => {
    const [orig, ...aliases] = arr
    aliases.forEach(a => {
      requireCache.alias[a] = orig
      if (a.toLowerCase().substr(-3) !== '.js') {
        requireCache.alias[a + '.js'] = orig
      }
    })
  })
}
let entities = [],
  solids = []
export function runMain({ params } = {}) {
  const transferable = []

  let time = Date.now()
  solids = main(params || {})
  if (!(solids instanceof Array)) solids = [solids]
  const solidsTime = Date.now() - time

  time = Date.now()
  JscadToCommon.clearCache()
  entities = JscadToCommon(solids, transferable, false)
  client.sendNotify('entities', { entities, solidsTime, entitiesTime: Date.now() - time }, transferable)
  entities = [] // we lose access to bytearray data, it is transfered, and on our side it shows length=0
}

export const initScript = ({ script, url }) => {
  const scriptModule = requireModule(url, script, requireForScript)

  main = scriptModule.exports.main

  const fromSource = getParameterDefinitionsFromSource(script)
  const def = combineParameterDefinitions(fromSource, scriptModule.exports.getParameterDefinitions)
  return { def }
}

export const runFile = async ({ file }) => {
  console.log('runFile', file, base, requireCache.alias)
  const script = readFileWeb(resolveUrl(file,base).url,{base})
  const scriptModule = require(file, transformFunc, readFileWeb, base, readFileWeb)

  const fromSource = getParameterDefinitionsFromSource(script)
  const def = combineParameterDefinitions(fromSource, scriptModule.getParameterDefinitions)

  main = scriptModule.main
  runMain({})
  return {def}
}

// TODO remove, or move to another package, along with exportStlText
// this is interesting in regards to exporting to stl, and 3mf which actually need vertex data, 
// and not jcad geometry polygons. So it will be interesting to see if main can give back transferable buffers
// instead of re-running conversion. or move export to main thread where the data already is, as it is needed for rendering
const exportData = async (params) => {
  if(self.exportData) return self.exportData(params, solids, entities)

  const { format } = params
  // todo check if it is ok to give back transferables after webgl has used the buffers
  // then we would not need to clone the data
  // other option is to clone data before sending transferable
  JscadToCommon.clearCache()
  if (solids.length && !entities.length) entities = JscadToCommon(solids, [], false)

  const arr = exportStlText(entities)
  data = [await new Blob(arr).arrayBuffer()]
  return withTransferable({ data }, data)
}

export const currentSolids = ()=>solids

const handlers = { initScript, init, runMain, runFile, clearTempCache, clearFileCache, exportData }

export const initWorker = (transform, exportData) => {
  if (transform) transformFunc = transform
  if(exportData) handlers.exportData = exportData

  client = initMessaging(self, handlers)
}
