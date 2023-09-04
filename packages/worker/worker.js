import { JscadToCommon } from '@jscadui/format-jscad'
import { initMessaging, withTransferable } from '@jscadui/postmessage'
import { clearFileCache, clearTempCache, readFileWeb, require, requireCache, requireModule, resolveUrl } from '@jscadui/require'

import { exportStlText } from './exportStlText.js'
import { combineParameterDefinitions, getParameterDefinitionsFromSource } from './getParameterDefinitionsFromSource.js'

let main
self.JSCAD_WORKER_ENV = {}
let transformFunc = x => x
let client
let globalBase = location.origin
let userInstances

export const flatten = arr=>{
  const doFlatten = (_in, out)=>{
    if(_in instanceof Array){
      _in.forEach(el=>doFlatten(el,out))
    }else{
      out.push(_in)
    }
  }

  const out = []
  doFlatten(arr,out)
  return out
}

export const init = params => {
  let { baseURI, alias = [], bundles = {} } = params
  if (baseURI) globalBase = baseURI

  if (bundles) Object.assign(requireCache.bundleAlias, bundles)
  // workspace aliases
  alias?.forEach(arr => {
    const [orig, ...aliases] = arr
    aliases.forEach(a => {
      requireCache.alias[a] = orig
      if (a.toLowerCase().substr(-3) !== '.js') {
        requireCache.alias[a + '.js'] = orig
      }
    })
  })
  console.log('init alias', alias, 'bundles',bundles)
  userInstances = params.userInstances
}
let entities = [],
  solids = []
export async function runMain({ params } = {}) {
  const transferable = []

  if (!main) throw new Error('no main function exported')

  let time = Date.now()
  solids = flatten(await main(params || {}))
  // if (!(solids instanceof Array)) {
  //   solids = [solids]
  // } else {
  //   solids = flatten(solids)
  // }
  const solidsTime = Date.now() - time

  time = Date.now()
  JscadToCommon.clearCache()
  entities = JscadToCommon.prepare(solids, transferable, userInstances)
  entities = entities.all
  // entities = [...entities.lines, ...entities.line, ...entities.instance]
  client.sendNotify('entities', { entities, solidsTime, entitiesTime: Date.now() - time }, transferable)
  entities = [] // we lose access to bytearray data, it is transfered, and on our side it shows length=0
}

// https://stackoverflow.com/questions/52086611/regex-for-matching-js-import-statements
const importReg = /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/
const exportReg = /export.*from/

const runScript = async ({ script, url, base=globalBase, root=base }) => {
  if(!script) script = readFileWeb(resolveUrl(url, base, root).url,{base})

  console.log('{ script, url, base, root }', { script, url, base, root })
  const shouldTransform = url.endsWith('.ts') || script.includes('import') && (importReg.test(script) || exportReg.test(script))
  let def = []

  const scriptModule = require({url,script}, shouldTransform ? transformFunc : undefined, readFileWeb, base, root, readFileWeb)
  const fromSource = getParameterDefinitionsFromSource(script)
  def = combineParameterDefinitions(fromSource, await scriptModule.getParameterDefinitions?.())
  main = scriptModule.main
  const params = {}
  def.forEach(({ name, initial }) => params[name] = initial)
  await runMain({ params })
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

const handlers = { runScript, init, runMain, clearTempCache, clearFileCache, exportData }

export const initWorker = (transform, exportData) => {
  if (transform) transformFunc = transform
  if(exportData) handlers.exportData = exportData

  client = initMessaging(self, handlers)
}
