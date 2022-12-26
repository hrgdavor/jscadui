import { JscadToCommon } from '@jscadui/format-jscad'
import { getParameterDefinitionsFromSource, combineParameterDefinitions } from './getParameterDefinitionsFromSource.js'
import { initMessaging } from '@jscadui/postmessage'

let workerBaseURI
let main
self.JSCAD_WORKER_ENV = {}

function require (url) {
  url = require.alias[url] || url
  if (url[0] != '/' && url.substr(0, 2) != './' && url.substr(0, 4) != 'http') url = 'https://unpkg.com/' + url
  let exports = require.cache[url] // get from cache
  if (!exports) { // not cached
    const module = requireModule(url)
    require.cache[url] = exports = module.exports // cache obj exported by module
  }
  return exports // require returns object exported by module
}

function requireFile (url) {
  try {
    const X = new XMLHttpRequest()
    X.open('GET', new URL(url, workerBaseURI), 0) // sync
    X.send()
    if (X.status && X.status !== 200) throw new Error(X.statusText)
    return X.responseText
  } catch (e) {
    console.log('problem loading url ', url, 'base', workerBaseURI, ' error:', e.message)
    throw e
  }
}

function requireModule (url, source) {
  if (!source && !url) throw new Error('You must define either a script source or urls for script download')
  try {
    const exports = {}
    if (!source) source = requireFile(url)
    const module = { id: url, uri: url, exports: exports, source } // according to node.js modules
    //const anonFn = new Function('require', 'exports', 'module', source) // create a Fn with module code, and 3 params: require, exports & module
    /* damn Function constructor creates function with 2 newlines at the begining before source starts
    the prefix is: `function anonymous(a,b\n) {\n`
    
    it messes up the line numbers for the initial script log lines and stack traces ( they report +2 line numbers).

    that is why we use eval to do the same trick, but prepended a function that has no newlines
    also https://esbuild.github.io/content-types/#direct-eval
    */
    self.eval('function anonFn(require, exports, module){'+source+'}')
    // console.log('source',anonFn.toString())
    anonFn(require, exports, module) // call the Fn, Execute the module
    return module
  } catch (err) {
    console.error('Error loading module ' + url, err.message)
    throw err
  }
}

require.cache = {}
require.alias = {}

const init = (params) => {
  let { baseURI, alias = [] } = params
  if (!baseURI && typeof document !== 'undefined' && document.baseURI) {
    baseURI = document.baseURI
  }

  if (baseURI) workerBaseURI = baseURI.toString()

  alias.forEach((arr) => {
    const [orig, ...aliases] = arr
    aliases.forEach((a) => {
      require.alias[a] = orig
      if (a.toLowerCase().substr(-3) !== '.js') { require.alias[a + '.js'] = orig }
    })
  })
  initialized = true
  console.log('@jscad/modeling',require('@jscad/modeling'))
}


function runMain ({params}={}) {
  const transferable = []

  let time = Date.now()
  const solids = main(params || {})
  const solidsTime = Date.now() - time

  time = Date.now()
  JscadToCommon.clearCache()
  const entities = JscadToCommon(solids, transferable, false)

  sendNotify('entities',{entities, solidsTime, entitiesTime: Date.now() - time }, transferable)
}

let initialized = false

const initScript = ({ script, url}) => {
  if (!initialized) {
    console.error('worker not initialized')
    return
  }
  
  const scriptModule = requireModule(url, script)
  
  main = scriptModule.exports.main

  const fromSource = getParameterDefinitionsFromSource(script)
  const def = combineParameterDefinitions(fromSource, scriptModule.exports.getParameterDefinitions)
  return {def}
}

const handlers = { initScript, init, runMain}

const { sendCmd, sendNotify } = initMessaging(self, handlers)

sendNotify('loaded')
