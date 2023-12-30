import { JscadToCommon } from '@jscadui/format-jscad'
import { initMessaging, withTransferable } from '@jscadui/postmessage'
import { clearFileCache, clearTempCache, readFileWeb, require, requireCache, resolveUrl } from '@jscadui/require'

import { exportStlText } from './src/exportStlText.js'
import { combineParameterDefinitions, getParameterDefinitionsFromSource } from './src/getParameterDefinitionsFromSource.js'
import { extractDefaults } from './src/extractDefaults.js'
import { extractPathInfo, readAsArrayBuffer, readAsText } from '../fs-provider/fs-provider.js'

let main
self.JSCAD_WORKER_ENV = {}
let transformFunc = x => x
let client
let globalBase = location.origin
let userInstances
let importData

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
  alias.forEach(({ name, path }) => {
    requireCache.alias[name] = path
  })
  console.log('init alias', alias, 'bundles',bundles)
  userInstances = params.userInstances
}

async function readFileFile(file, {bin=false}={}){
  if(bin) return await readAsArrayBuffer(file)
  else return readAsText(file)
}

solids = []
export async function runMain({ params } = {}) {
  params = {...params}
  for(let p in params){
    if(params[p] instanceof File && importData){
      const info = extractPathInfo(params[p].name)
      let content = await readFileFile(params[p],{bin: importData.isBinaryExt(info.ext)})
      params[p] = importData.deserialize(info, content)
    }
  }
  console.log('runMain', params)
  let entities = []
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
  //  client.sendNotify('entities', { entities, solidsTime, entitiesTime: Date.now() - time }, transferable)
  return withTransferable({entities}, transferable)
}

// https://stackoverflow.com/questions/52086611/regex-for-matching-js-import-statements
const importReg = /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/
const exportReg = /export.*from/

const runScript = async ({ script, url, base=globalBase, root=base }) => {
  console.log('run script with base:', base)
  if(!script) script = readFileWeb(resolveUrl(url, base, root).url)

  const shouldTransform = url.endsWith('.ts') || script.includes('import') && (importReg.test(script) || exportReg.test(script))
  let def = []
  
  const scriptModule = require({url,script}, shouldTransform ? transformFunc : undefined, readFileWeb, base, root, importData)
  const fromSource = getParameterDefinitionsFromSource(script)
  def = combineParameterDefinitions(fromSource, await scriptModule.getParameterDefinitions?.())
  main = scriptModule.main
  let out = await runMain({ params: extractDefaults(def) })
  out.def = def
  return out
}

// TODO remove, or move to another package, along with exportStlText
// this is interesting in regards to exporting to stl, and 3mf which actually need vertex data, 
// and not jcad geometry polygons. So it will be interesting to can give back transferable buffers
// instead of re-running conversion. or move export to main thread where the data already is, as it is needed for rendering
const exportData = async (params) => {
  if(self.exportData) return self.exportData(params)

  const { format } = params
  // todo check if it is ok to give back transferables after webgl has used the buffers
  // then we would not need to clone the data
  // other option is to clone data before sending transferable
  JscadToCommon.clearCache()
  let entities = JscadToCommon(solids, [], false)

  const arr = exportStlText(entities)
  data = [await new Blob(arr).arrayBuffer()]
  return withTransferable({ data }, data)
}

export const currentSolids = ()=>solids

const handlers = { runScript, init, runMain, clearTempCache, clearFileCache, exportData }

export const initWorker = (transform, exportData, _importData) => {
  if (transform) transformFunc = transform
  if(exportData) handlers.exportData = exportData
  importData = _importData

  client = initMessaging(self, handlers)
}
