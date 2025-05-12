import {
  addToCache,
  analyzeProject,
  clearCache,
  clearFs,
  extractEntries,
  fileDropped,
  getFile,
  getFileContent,
  registerServiceWorker,
} from '@jscadui/fs-provider'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl, OrbitState } from '@jscadui/orbit'
import { boundingBox } from '@jscadui/format-common'
import { genParams, getParams } from '@jscadui/params'
import { messageProxy } from '@jscadui/postmessage'

import defaultCode from './examples/jscad.example.js'
import { addV1Shim } from './src/addV1Shim.js'
import * as editor from './src/editor.js'
import * as engine from './src/engine.js'
import * as exporter from './src/exporter.js'
import * as menu from './src/menu.js'
import * as remote from './src/remote.js'
import { setError } from './src/error.js'
import { ViewState } from './src/viewState.js'
import { AnimRunner } from './src/animRunner.js'
import * as welcome from './src/welcome.js'

/**
 * @typedef {import('@jscadui/worker').UserParameters} UserParameters
 */


/** 
 * @param {string} id
 * @returns {HTMLElement}
 */
export const byId = id => /** @type {HTMLElement} */(document.getElementById(id))

/** @typedef {import('@jscadui/worker').JscadWorker} JscadWorker*/

const appBase = document.baseURI
let currentBase = appBase

/**
 * @param {string} path
 * @return {string}
 */
const toUrl = path => new URL(path, appBase).toString()

const viewState = new ViewState()
viewState.onRequireReRender = () => paramChangeCallback(lastRunParams)

const gizmo = new Gizmo()
byId('layout').append(gizmo)

/** @type {(v:unknown,skipUndefined?:boolean)=>void} */
let setParamValues

/** @type {(status:"running" | "")=>void} */
let setAnimStatus

// load default model unless another model was already loaded
let loadDefault = true

const ctrl = new OrbitControl([byId('viewer')], { ...viewState.camera })

/** @param {OrbitState} change */
const updateFromCtrl = change => {
  const { position, target, rx, rz } = change
  viewState.setCamera({ position, target })
  gizmo.rotateXZ(rx, rz)
}
updateFromCtrl(ctrl)

ctrl.onchange = (/** @type {OrbitState} */ state) => viewState.saveCamera(state)
ctrl.oninput = (/** @type {OrbitState} */ state) => updateFromCtrl(state)

gizmo.onRotationRequested = (/** @type {string} */ cam) => ctrl.animateToCommonCamera(cam)

/** @type {import('@jscadui/fs-provider').SwHandler} */
let sw

async function resetFileRefs() {
  editor.setFiles([])
  saveMap = {}
  if (sw) {
    delete sw.fileToRun
    await clearFs(sw)
  }
}

async function initFs() {
  /**
   * @param {string} path
   * @param {import('@jscadui/fs-provider').SwHandler} sw
   */
  const getFileWrapper = (path, sw) => {
    const file = getFileContent(path, sw)
    // notify editor of active files
    file.then(() => editor.setFiles(sw.filesToCheck))
    return file
  }
  let scope = document.location.pathname
  try {
    sw = await registerServiceWorker(`bundle.fs-serviceworker.js?prefix=${scope}swfs/`, getFileWrapper, {
      scope,
      prefix: scope + 'swfs/',
    })
  } catch (e) {
    const lastReload = localStorage.getItem('lastReload')
    if (lastReload === null || Date.now() - parseInt(lastReload) > 3000) {
      localStorage.setItem('lastReload', Date.now().toString())
      //location.reload()
    }
  }
  sw.defProjectName = 'jscad'
  sw.onfileschange = files => {
    if (files.includes('/package.json')) {
      reloadProject()
    } else {
      workerApi.jscadClearFileCache({ files, root: sw.base })
      editor.filesChanged(files)
      if (sw.fileToRun) jscadScript({ url: sw.fileToRun, base: sw.base })
    }
  }
  sw.getFile = path => getFile(path, sw)
}
const dropModal = byId('dropModal')

/** @type {number | NodeJS.Timeout | undefined} */
let showDropTimer

/**@param {boolean} show */
const showDrop = show => {
  clearTimeout(showDropTimer)
  dropModal.style.display = show ? 'initial' : 'none'
}

document.body.addEventListener('drop', async ev => {
  try {
    ev.preventDefault()
    if (ev.dataTransfer === null) return
    const files = await extractEntries(ev.dataTransfer)
    if (!files.length) return
    await resetFileRefs()
    if (!sw) await initFs()
    showDrop(false)
    await fileDropped(sw, files)

    reloadProject()
  } catch (error) {
    setError(error)
    console.error(error)
  }
})

async function reloadProject() {
  workerApi.jscadClearTempCache()
  clearCache(sw.cache)
  saveMap = {}
  sw.filesToCheck = []
  let { alias, script } = await analyzeProject(sw)
  exporter.exportConfig.projectName = sw.projectName
  if (alias.length) {
    workerApi.jscadInit({ alias })
  }
  let url = sw.fileToRun
  // inject jscad v1 shim, and also inject changed script to cache
  // so worker and editor have the same code
  if (sw.fileToRun?.endsWith('.jscad')) {
    script = addV1Shim(script)
    addToCache(sw.cache, sw.fileToRun, script)
  }
  jscadScript({ url, base: sw.base })
  editor.setSource(script, url)
  editor.setFiles(sw.filesToCheck)
}

document.body.addEventListener("dragover", ev => {
  ev.preventDefault()
  showDrop(true)
})


const dragEndOrLeave = () => {
  clearTimeout(showDropTimer)
  showDropTimer = setTimeout(() => {
    showDrop(false)
  }, 300)
}

document.body.addEventListener("dragend", dragEndOrLeave);
document.body.addEventListener("dragleave", dragEndOrLeave);

/**
 * @param {number} [value]
 * @param {string} [note]
 */
const onProgress = (value, note) => {
  if (value == undefined) {
    progress.removeAttribute('value')
  } else {
    progress.value = value
  }
  progressText.innerText = note ?? ''
}

const worker = new Worker('./build/bundle.worker.js')
const handlers = {
  /**
   * @param {{entities:unknown | Array<unknown>,mainTime:number,convertTime:number}} options1 
   * @param {{skipLog?:boolean }} options2
   */
  entities: ({ entities, mainTime, convertTime }, { skipLog } = {}) => {
    if (!(entities instanceof Array)) entities = [entities]
    viewState.setModel(entities)
    if(viewState.zoomToFit){
      let {min,max} = boundingBox(entities)
      console.warn('min', min, 'max', max, viewState.viewer.getCamera())
      let { fov, aspect } = viewState.viewer.getCamera()
      ctrl.fit(min,max, fov,aspect,1.2)
    }
    if (!skipLog) console.log('Main execution:', mainTime?.toFixed(2), ', jscad mesh -> gl:', convertTime?.toFixed(2), entities)
    setError(undefined)
    onProgress(undefined, mainTime?.toFixed(2) + ' ms')
  },
  onProgress,
}

const workerApi = /** @type {JscadWorker} */ (messageProxy(worker, handlers, { onJobCount: trackJobs }))

const progress = /** @type {HTMLProgressElement} */ (byId('progress').querySelector('progress'))
const progressText = byId('progressText')

/**@type {NodeJS.Timeout} */
let firstJobTimer


/**
 * @param {number} jobs
 */
function trackJobs(jobs) {
  if (jobs === 1) {
    // do not show progress for fast renders
    clearTimeout(firstJobTimer)
    firstJobTimer = setTimeout(() => {
      onProgress()
      progress.style.display = 'block'
    }, 300)
  }
  if (jobs === 0) {
    clearTimeout(firstJobTimer)
    progress.style.display = 'none'
  }
}

/** @param {{script?:string,url?:string,base?:string,root?:string}} options*/
const jscadScript = async ({ script, url = './jscad.model.js', base = currentBase, root }) => {
  currentBase = base
  loadDefault = false // don't load default model if something else was loaded
  try {
    const result = await workerApi.jscadScript({ script, url, base, root })
    let tmp = genParams({ target: byId('paramsDiv'), params: result.def || [], callback: paramChangeCallback, pauseAnim: pauseAnimCallback, startAnim: startAnimCallback })
    setParamValues = tmp.setValue
    setAnimStatus = tmp.animStatus
    lastRunParams = result.params
    handlers.entities(result)
    if (result.def) {
      result.def.find(def => {
        if (def.type === "slider" && def.fps && def.autostart) {
          startAnimCallback(def, lastRunParams[def.name] || 0)
          return true
        }
      })
    }
  } catch (err) {
    setError(err)
  }
}

const bundles = {
  // local bundled alias for common libs.
  '@jscad/modeling': toUrl('./build/bundle.jscad_modeling.js'),
  '@jscad/io': toUrl('./build/bundle.jscad_io.js'),
  '@jscad/csg': toUrl('./build/bundle.V1_api.js'),
  'sw-jscad': toUrl('./build/bundle.sw-jscad.js'),
}

await workerApi.jscadInit({ bundles })

/** @type {boolean} */
let working

/** @type {UserParameters | null} */
let lastParams
/** @type {UserParameters} */
let lastRunParams

/**
 * @param {UserParameters} params 
 * @param {string} [source]
 * @returns 
 */
const paramChangeCallback = async (params, source) => {
  if (source == 'group') {
    // TODO make sure when saving param state is implemented
    // this change is saved, but skip param re-render
    return
  }
  stopCurrentAnim()
  if (!working) {
    lastParams = null
  } else {
    lastParams = params
    return
  }
  working = true
  let result
  try {
    result = await workerApi.jscadMain({ params })
    lastRunParams = params
  } finally {
    working = false
  }
  handlers.entities(result, {})
  if (lastParams && lastParams != params) paramChangeCallback(lastParams)
}
/** @type {AnimRunner | null} */
let currentAnim

/**
 * @typedef {object} AnimationDefinition
 * @prop {string} type
 */

function stopCurrentAnim() {
  if (!currentAnim) return false
  currentAnim.pause()
  currentAnim = null
  setAnimStatus('')
  return true
}

/**
 * @param {AnimationDefinition} def 
 * @param {string | number} value //TODO check why this is sometimes a string
 */
const startAnimCallback = async (def, value) => {
  if (stopCurrentAnim()) return
  setAnimStatus('running')

  /**
   * @param {import('@jscadui/worker').ScriptResponse} result
   * @param {UserParameters} paramValues 
   * @param {object | undefined} times 
   */
  const handleEntities = (result, paramValues, times) => {
    lastRunParams = paramValues
    setParamValues(times || {}, true)
    handlers.entities(result, { skipLog: true })
  }

  const handleEnd = () => stopCurrentAnim()

  currentAnim = new AnimRunner(workerApi, { handleEntities, handleEnd })
  currentAnim.start(def, value, getParams(byId('paramsDiv')))
}

/**
 * @param {AnimationDefinition} def 
 * @param {string} value
 */
const pauseAnimCallback = async (def, value) => {
  stopCurrentAnim()
}

// Initialize three engine
viewState.setEngine(await engine.init())

/** @type {Object.<string,FileSystemFileHandle>} */
let saveMap = {}
setInterval(async () => {
  for (let p in saveMap) {
    let handle = saveMap[p]
    let file = await handle.getFile()
    if (file.lastModified > handle.lastMod) {
      handle.lastMod = file.lastModified
      await editor.filesChanged([file])
      editor.runScript();
    }
  }
}, 500)

editor.init(
  defaultCode,
  async (script, path) => {
    if (sw && sw.fileToRun) {
      await addToCache(sw.cache, path, script)
      // imported script will be also cached by require/import implementation
      // it is expected if multiple files require same file/module that first time it is loaded
      // but for others resolved module is returned
      // if not cleared by calling jscadClearFileCache, require will not try to reload the file
      await workerApi.jscadClearFileCache({ files: [path], root: sw.base })
      if (sw.fileToRun) jscadScript({ url: sw.fileToRun, base: sw.base })
    } else {
      jscadScript({ script })
    }
  },
  async (script, path) => {
    let pathArr = path.split('/')
    let fileHandle = (await sw?.getFile(path))?.handle
    console.log('save file', path, fileHandle)
    if (!fileHandle) fileHandle = saveMap[path]
    if (!fileHandle) {
      const opts = {
        suggestedName: pathArr[pathArr.length - 1],
        excludeAcceptAllOption: true,
        types: [
          {
            description: 'Javascript',
            accept: { 'application/javascript': ['.js'] },
          },
        ],
      }
      fileHandle = await globalThis.showSaveFilePicker?.(opts)
    }
    if (fileHandle) {
      const writable = await fileHandle.createWritable()
      await writable.write(script)
      await writable.close()
      saveMap[path] = fileHandle
      fileHandle.lastMod = Date.now() + 500
    }
  },
  path => sw?.getFile(path),
)
menu.init()
welcome.init()
let hasRemoteScript
try {
  hasRemoteScript = await remote.init(
    (script, url) => {
      // run remote script
      url = new URL(url, appBase).toString()
      editor.setSource(script, url)
      jscadScript({ script, base: url })
      welcome.dismiss()
    },
    err => {
      // show remote script error
      loadDefault = false
      setError(err)
      welcome.dismiss()
    },
  )
} catch (e) {
  console.error(e)
}
exporter.init(workerApi)

/* uncomment to test fake file tree for running scripts

loadDefault = false
async function setFileTree(sw, files){
  clearCache(sw.cache)
  files.forEach(f=>addToCache(sw.cache, f.path, f.fileContent))
}

const virtualTree = [
  {
      "filename": "index.js",
      "path": "/index.js",
      "fileContent": "const {subtract} = require('@jscad/modeling').booleans; \n\nfunction main(){\n  const childShape = require('/component/childShape.js');\n  const childShape2 = require('/childShape2.js');\n  return subtract(childShape.main(),childShape2.main())\n}\n\nmodule.exports= {main}",
  },
  {
      "path": "/component/childShape.js",
      "filename": "childShape.js",
      "fileContent": "const {cube} = require('@jscad/modeling').primitives; \n function main(){ return cube({size:5})}\n module.exports= {main}",
  },
  {
      "path": "/childShape2.js",
      "filename": "childShape2.js",
      "fileContent": "const {sphere} = require('@jscad/modeling').primitives; \n function main(){ return sphere({radius:3})}\n module.exports= {main}",
  },
];
if (!sw) await initFs()
setFileTree(sw, virtualTree)
jscadScript({ url: '/index.js', base: sw.base })
editor.setSource(virtualTree[0].fileContent, '/index.js')
// */

if (loadDefault && !hasRemoteScript) {
  jscadScript({ script: defaultCode })
}

try {
  if(!sw) await initFs()
} catch (err) {
  setError(err)
}

if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
  // service workers are disabled on hard-refresh, so need to reload.
  // to prevent a reload loop, don't reload again within 3 seconds.
  const lastReload = localStorage.getItem('lastReload')
  if (lastReload === null || Date.now() - parseInt(lastReload) > 3000) {
    setError('cannot start service worker, reloading')
    localStorage.setItem('lastReload', Date.now().toString())
    //location.reload()
  } else {
    console.error('cannot start service worker, reload required')
  }
  setError('cannot start service worker, reload required')
}
