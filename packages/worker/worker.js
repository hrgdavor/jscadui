import { JscadToCommon } from '@jscadui/format-jscad'
import { initMessaging, withTransferable } from '@jscadui/postmessage'
import { clearFileCache, clearTempCache, readFileWeb, require, requireCache, resolveUrl } from '@jscadui/require'

import { exportStlText } from './src/exportStlText.js'
import { combineParameterDefinitions, getParameterDefinitionsFromSource } from './src/getParameterDefinitionsFromSource.js'
import { extractDefaults } from './src/extractDefaults.js'
import { extractPathInfo, readAsArrayBuffer, readAsText } from '../fs-provider/fs-provider.js'

/**
@typedef Alias
 @prop {String} name
 @prop {String} path

@typedef RunScriptOptions
 @prop {string} script - script source
 @prop {string} url - script url/name
 @prop {string} base - base url 
 @prop {string} base - root (do not allow paths below that root)  

 @typedef ExportDataOptions
 @prop {string} format

 @typedef ClearFileCacheOptions
 @prop {Array<String>} files

 @typedef RunMainOptions
 @prop {Object} params

 @typedef InitOptions
 @prop {String} baseURI - to resolve inital relative path
 @prop {Array<Alias>} alias - 
 @prop {Array<Alias>} bundle - bundle alias {name:path} 
 
 @typedef ScriptResponse
 @prop {Array<any>} entities  
 @prop {number} mainTime  - script run time
 @prop {number} convertTime  - tim converting script output to gl data


@typedef JscadWorker
@prop {String} name
@prop {(options:InitOptions)=>Promise<void>} init
@prop {(options:RunMainOptions)=>Promise<ScriptResponse>} runMain
@prop {(options:RunScriptOptions)=>Promise<ScriptResponse>} runScript
@prop {(options:ExportDataOptions)=>Promise<void>} exportData
@prop {(options:ClearFileCacheOptions)=>Promise<void>} clearFileCache
@prop {()=>Promise<void>} clearTempCache

*/

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

export const init = options => {
  let { baseURI, alias = [], bundles = {} } = options
  if (baseURI) globalBase = baseURI

  if (bundles) Object.assign(requireCache.bundleAlias, bundles)
  // workspace aliases
  alias.forEach(({ name, path }) => {
    requireCache.alias[name] = path
  })
  console.log('init alias', alias, 'bundles',bundles)
  userInstances = options.userInstances
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
  console.log('runMain with params', params)
  let entities = []
  const transferable = []

  if (!main) throw new Error('no main function exported')

  let time = performance.now()
  solids = flatten(await main(params || {}))
  const mainTime = performance.now() - time

  time = performance.now()
  JscadToCommon.clearCache()
  entities = JscadToCommon.prepare(solids, transferable, userInstances)
  entities = entities.all
  return withTransferable({entities, mainTime, convertTime: performance.now() - time}, transferable)
}

// https://stackoverflow.com/questions/52086611/regex-for-matching-js-import-statements
const importReg = /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/
const exportReg = /export.*from/

const runScript = async ({ script, url='jscad.js', base=globalBase, root=base }) => {
  console.log('run script with base:', base)
  if(!script) script = readFileWeb(resolveUrl(url, base, root).url)

  const shouldTransform = url.endsWith('.ts') || script.includes('import') && (importReg.test(script) || exportReg.test(script))
  let def = []
  
  const scriptModule = require({url,script}, shouldTransform ? transformFunc : undefined, readFileWeb, base, root, importData)
  const fromSource = getParameterDefinitionsFromSource(script)
  def = combineParameterDefinitions(fromSource, await scriptModule.getParameterDefinitions?.())
  main = scriptModule.main
  // if the main function is the default export
  if(!main && typeof scriptModule == 'function') main = scriptModule
  let params = extractDefaults(def)
  let out = await runMain({ params })
  out.def = def
  out.params = params
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


