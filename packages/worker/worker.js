import { JscadToCommon } from '@jscadui/format-jscad'
import { messageProxy, withTransferable } from '@jscadui/postmessage'
import { clearFileCache, jscadClearTempCache, readFileWeb, require, requireCache, resolveUrl } from '@jscadui/require'

import { exportStlText } from './src/exportStlText.js'
import { combineParameterDefinitions, getParameterDefinitionsFromSource } from './src/getParameterDefinitionsFromSource.js'
import { extractDefaults } from './src/extractDefaults.js'
import { extractPathInfo, readAsArrayBuffer, readAsText } from '../fs-provider/fs-provider.js'

/**
@typedef Alias
 @prop {String} name
 @prop {String} path

@typedef RunScriptOptions
 @prop {string} [script] - script source
 @prop {string} url - script url/name
 @prop {string} base - base url 
 @prop {string} [root] - root (do not allow paths below that root)  

 @typedef ExportDataOptions
 @prop {string} format
 @prop {ArrayBuffer} [thumb]

 @typedef RunMainOptions
 @prop {import('@jscadui/format-common').UserParameters} params
 @prop {boolean} [skipLog]

 @typedef InitOptions
 @prop {string} [baseURI] - to resolve initial relative path
 @prop {Array<Alias>} [alias] - 
 @prop {Object.<string,string>} [bundles] - bundle alias {name:path} 
 @prop {boolean} [userInstances] called useInstances at other places


@typedef JscadWorker
@prop {(options:InitOptions)=>Promise<void>} jscadInit
@prop {(options:RunMainOptions)=>Promise<import('@jscadui/format-common').JscadMainResult>} jscadMain - run the main method of the loaded script
@prop {(options:RunScriptOptions)=>Promise<import('@jscadui/format-common').JscadScriptResultWithParams>} jscadScript - run a jscad script
@prop {(options:ExportDataOptions)=>Promise<unknown>} jscadExportData
@prop {(options:import('@jscadui/require').ClearFileCacheOptions)=>Promise<void>} jscadClearFileCache
@prop {(transferable:Array)=>Promise<void>} restoreTransferable
@prop {()=>Promise<void>} jscadClearTempCache

@typedef ImportData
@prop {(ext:string) => boolean } isBinaryExt
@prop {(options:{url:string, filename:string, ext:string}, fileContent:string | ArrayBuffer ) => unknown} deserialize //TODO

@typedef {(script:string,url:string)=>string} TransformFunction
*/

/** @type {import('@jscadui/format-common').JscadMainFunctionRaw | undefined} */
let main

/** @type {import('@jscadui/format-common').JscadModule} */
let scriptModule = {}

globalThis.JSCAD_WORKER_ENV = {}

/** @type {TransformFunction} */
let transformFunc = x => x

let globalBase = location.origin
/** @type {boolean | undefined } */
let userInstances

/** @type {ImportData | undefined} */
let importData
let meshes

/**
 * @template T
 * @param {T | T[]} arr 
 * @returns {T[]}
 */
export const flatten = arr => {
  /** @type {T[]} */
  const out = []

  /** @param {T |T[]} _in */
  const doFlatten = (_in) => {
    if (_in instanceof Array) {
      _in.forEach(el => doFlatten(el))
    } else {
      out.push(_in)
    }
  }

  doFlatten(arr)
  return out
}

/**
 * @param {InitOptions} options 
 */
export const jscadInit = options => {
  let { baseURI, alias = [], bundles = {} } = options
  if (baseURI) globalBase = baseURI

  if (bundles) Object.assign(requireCache.bundleAlias, bundles)
  // workspace aliases
  alias.forEach(({ name, path }) => {
    requireCache.alias[name] = path
  })
  console.log('init alias', alias, 'bundles', bundles)
  userInstances = options.userInstances
}
/**
 * @param {import('../fs-provider/fs-provider.js').FSFileEntry | Blob} file 
 * @param {{bin?:boolean}} options 
 * @returns {Promise<ArrayBuffer | string>}
 */
async function readFileFile(file, { bin = false } = {}) {
  if (bin) return await readAsArrayBuffer(file)
  else return readAsText(file)
}

/** @type {import('@jscadui/format-common').JscadMainResultRaw[]} */
let solids = []

/**
 * @param {{params?:import('@jscadui/format-common').UserParameters,skipLog?:boolean}} options
 * @returns {Promise<import('@jscadui/format-common').JscadMainResult>}
 */
export async function jscadMain({ params, skipLog } = {}) {
  params = { ...params }
  for (let p in params) {
    if (params[p] instanceof File && importData) {
      const info = extractPathInfo(params[p].name)
      let content = await readFileFile(params[p], { bin: importData.isBinaryExt(info.ext) })
      params[p] = importData.deserialize(info, content)
    }
  }
  if (!skipLog) console.log('jscadMain with params', params)
  const transferable = []

  if (!main) throw new Error('no main function exported')

  let time = performance.now()
  solids = flatten(await main(params || {}))
  const mainTime = performance.now() - time

  time = performance.now()
  JscadToCommon.clearCache()
  const entities = JscadToCommon.prepare(solids, transferable, userInstances).all
  return withTransferable({ entities, mainTime, convertTime: performance.now() - time }, transferable)
}

// https://stackoverflow.com/questions/52086611/regex-for-matching-js-import-statements
const importReg = /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/
const exportReg = /export.*from/

/**
 * @param {{script:string,url?:string,base?:string,root?:string}} param0 
 * @returns {Promise<import('@jscadui/format-common').JscadScriptResultWithParams>}
 */
const jscadScript = async ({ script, url = 'jscad.js', base = globalBase, root = base }) => {
  console.log('run script with base:', base)
  if (!script) script = readFileWeb(resolveUrl(url, base, root).url)

  const shouldTransform = url.endsWith('.ts') || script.includes('import') && (importReg.test(script) || exportReg.test(script))
  let def = []

  try {
    scriptModule = require({ url, script }, shouldTransform ? transformFunc : undefined, readFileWeb, base, root, importData)
  } catch (e) {
    // with syntax error in browser we do not get nice stack trace
    // we then try to parse the script to let transform function generate nice error with nice trace
    if (e.name === 'SyntaxError') transformFunc(script, url)
    // if error is not SyntaxError or if transform func does not find syntax err (very unlikely)
    throw e
  }
  const fromSource = getParameterDefinitionsFromSource(script)
  def = combineParameterDefinitions(fromSource, await scriptModule.getParameterDefinitions?.())
  main = scriptModule.main
  // if the main function is the default export
  if (!main && typeof scriptModule == 'function') main = scriptModule
  let params = extractDefaults(def)
  const out = await jscadMain({ params })
  return {
    def,
    params,
    ...out,
  }
}

// TODO remove, or move to another package, along with exportStlText
// this is interesting in regards to exporting to stl, and 3mf which actually need vertex data, 
// and not jscad geometry polygons. So it will be interesting to can give back transferable buffers
// instead of re-running conversion. or move export to main thread where the data already is, as it is needed for rendering
/**
 * @param {ExportDataOptions} params 
 * @returns {Promise<{data:ArrayBuffer[]}>}
 */
const jscadExportData = async (params) => {
  if (self.exportData) return await self.exportData(params)

  // todo check if it is ok to give back transferables after webgl has used the buffers
  // then we would not need to clone the data
  // other option is to clone data before sending transferable
  JscadToCommon.clearCache()
  let entities = JscadToCommon.ConvertMulti(solids, [], false)

  const arr = exportStlText(entities)
  const data = [await new Blob(arr).arrayBuffer()]
  return withTransferable({ data }, data)
}

const restoreTransferable = (params) => {
  console.log('restoreTransferable', meshes = params)
}

export const currentSolids = () => solids
export const currentMeshes = () => meshes

const handlers = { jscadScript, jscadInit, jscadMain, jscadClearTempCache, jscadClearFileCache: clearFileCache, jscadExportData, restoreTransferable }
// allow main thread to call worker methods and any method from the loaded script
const handlersProxy = new Proxy(handlers, {
  get(target, prop, receiver) {
    return target[prop] || scriptModule[prop]
  }
})

/**
 * @param {TransformFunction | undefined} transform 
 * @param {(options:ExportDataOptions)=>Promise<{data:ArrayBuffer[]}>} [jscadExportData ]
 * @param {ImportData} [_importData]
 */
export const initWorker = (transform, jscadExportData, _importData) => {
  if (transform) transformFunc = transform
  if (jscadExportData) handlers.jscadExportData = jscadExportData
  importData = _importData

  JSCAD_WORKER_ENV.client = messageProxy(self, handlersProxy)
}


