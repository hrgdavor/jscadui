import { JscadToCommon } from '@jscadui/format-jscad'
import { initMessaging } from '@jscadui/postmessage'
import { require, requireModule, relativeRequire } from '@jscadui/require'

import { combineParameterDefinitions, getParameterDefinitionsFromSource } from './getParameterDefinitionsFromSource.js'

let initialized
let main
self.JSCAD_WORKER_ENV = {}
let requireForScript = require

const init = params => {
  let { baseURI, alias = [] } = params
  if (!baseURI && typeof document !== 'undefined' && document.baseURI) {
    baseURI = document.baseURI
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
  initialized = true
}

function runMain({ params } = {}) {
  const transferable = []

  let time = Date.now()
  const solids = main(params || {})
  const solidsTime = Date.now() - time

  time = Date.now()
  JscadToCommon.clearCache()
  const entities = JscadToCommon(solids, transferable, false)

  sendNotify('entities', { entities, solidsTime, entitiesTime: Date.now() - time }, transferable)
}

const initScript = ({ script, url }) => {
  if (!initialized) {
    console.error('worker not initialized')
    return
  }

  const scriptModule = requireModule(url, script, requireForScript)

  main = scriptModule.exports.main

  const fromSource = getParameterDefinitionsFromSource(script)
  const def = combineParameterDefinitions(fromSource, scriptModule.exports.getParameterDefinitions)
  return { def }
}

const runFolder = ({folder})=>{
  console.log('runFolder', folder, folder.createReader)
}

const handlers = { initScript, init, runMain, runFolder}

const { sendCmd, sendNotify } = initMessaging(self, handlers)
