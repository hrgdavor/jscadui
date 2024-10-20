import {
  addToCache,
  analyzeProject,
  clearFs,
  extractEntries,
  fileDropped,
  findFile,
  findFileInRoots,
  getFile,
  getFileContent,
  readAsText,
  registerServiceWorker,
} from '@jscadui/fs-provider'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl } from '@jscadui/orbit'
import { genParams, getParams } from '@jscadui/params'
import { messageProxy } from '@jscadui/postmessage'
import { gzipSync } from 'fflate'

import { runMain } from '../../packages/worker/worker.js'
import defaultCode from './examples/jscad.example.js'
import { addV1Shim } from './src/addV1Shim.js'
import * as editor from './src/editor.js'
import * as engine from './src/engine.js'
import * as exporter from './src/exporter.js'
import * as menu from './src/menu.js'
import * as remote from './src/remote.js'
import { formatStacktrace } from './src/stacktrace.js'
import { str2ab } from './src/str2ab.js'
import { ViewState } from './src/viewState.js'
import { AnimRunner } from './src/animRunner.js'
import * as welcome from './src/welcome.js'

export const byId = id => document.getElementById(id)

/** @typedef {import('@jscadui/worker').JscadWorker} JscadWorker*/

const appBase = document.baseURI
let currentBase = appBase
const toUrl = path => new URL(path, appBase).toString()

const viewState = new ViewState()
viewState.onRequireReRender = () => paramChangeCallback(lastRunParams)

const gizmo = (window.gizmo = new Gizmo())
byId('overlay').parentNode.appendChild(gizmo)

let projectName = 'jscad'
let model = []
let setParamValues, setAnimStatus

// load default model unless another model was already loaded
let loadDefault = true

const ctrl = (window.ctrl = new OrbitControl([byId('viewer')], { ...viewState.camera, alwaysRotate: false }))

const updateFromCtrl = change => {
  const { position, target, rx, rz, len, ...rest } = change
  viewState.setCamera({ position, target })
  gizmo.rotateXZ(rx, rz)
}
updateFromCtrl(ctrl)

ctrl.onchange = state => viewState.saveCamera(state)
ctrl.oninput = state => updateFromCtrl(state)

gizmo.oncam = ({ cam }) => ctrl.animateToCommonCamera(cam)

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
  const getFileWrapper = (path, sw) => {
    const file = getFileContent(path, sw)
    // notify editor of active files
    file.then(() => editor.setFiles(sw.filesToCheck))
    return file
  }
  let scope = document.location.pathname
  try{
    sw = await registerServiceWorker(`bundle.fs-serviceworker.js?prefix=${scope}swfs/`, getFileWrapper, {
      scope,
      prefix: scope + 'swfs/',
    })
  }catch(e){
    const lastReload = localStorage.getItem('lastReload')
    if (!lastReload || Date.now() - lastReload > 3000) {
      localStorage.setItem('lastReload', Date.now())
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
const showDrop = show => {
  clearTimeout(showDrop.timer)
  dropModal.style.display = show ? 'initial' : 'none'
}
document.body.ondrop = async ev => {
  try {
    ev.preventDefault()
    let files = await extractEntries(ev.dataTransfer)
    if (!files.length) return {}
    await resetFileRefs()
    if (!sw) await initFs()
    showDrop(false)
    workerApi.jscadClearTempCache()

    await fileDropped(sw, files)

   reloadProject()

  } catch (error) {
    setError(error)
    console.error(error)
  }
}

async function reloadProject() {
  saveMap = {}
  sw.filesToCheck = []
  let { alias, script } = await analyzeProject(sw)
  projectName = sw.projectName
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

document.body.ondragover = ev => {
  ev.preventDefault()
  showDrop(true)
}
document.body.ondragleave = document.body.ondragend = ev => {
  clearTimeout(showDrop.timer)
  showDrop.timer = setTimeout(() => {
    showDrop(false)
  }, 300)
}

const setError = error => {
  const errorBar = byId('error-bar')
  if (error) {
    const name = (error.name || 'Error') + ': '
    byId('error-name').innerText = name
    const message = formatStacktrace(error)
    byId('error-message').innerText = message
    errorBar.classList.add('visible')
  } else {
    errorBar.classList.remove('visible')
  }
}

// Dummy link for download action
const link = document.createElement('a')
link.style.display = 'none'
document.body.appendChild(link)
function save(blob, filename) {
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

const exportModel = async (format, extension) => {
  if (format === 'scriptUrl') {
    if(editor.getEditorFiles().length > 1) {
      alert('Can not export multifile projects as url')
      return
    }
    let src = editor.getSource()
    let gzipped = gzipSync(str2ab(src))
    let str = String.fromCharCode.apply(null, gzipped)
    let url = document.location.origin + '#data:application/gzip;base64,' + btoa(str)
    console.log('url\n', url)
    try {
      await navigator.clipboard.writeText(url)
      alert('URL with gzipped script was succesfully copied to clipboard')
      } catch (err) {
        console.error('Failed to copy: ', err)
        alert('failed to copy to clipboard\n'+err.message)
    }
    return
  }

  let { data } = (await workerApi.jscadExportData({ format })) || {}
  if (data) {
    if(!(data instanceof Array)) data = [data]
    console.log('save', `${projectName}.${extension}`, data)
    let type = 'text/plain'
    if(format == '3mf') type = 'application/zip'

    // save(data, `${projectName}.${extension}`)
    save(new Blob(data, { type }), `${projectName}.${extension}`)
  }
}

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
  entities: ({ entities, mainTime, convertTime },{skipLog}={}) => {
    if (!(entities instanceof Array)) entities = [entities]
    viewState.setModel((model = entities))
    if(!skipLog) console.log('Main execution:', mainTime?.toFixed(2), ', jscad mesh -> gl:', convertTime?.toFixed(2), entities)
    setError(undefined)
    onProgress(undefined, mainTime?.toFixed(2) + ' ms')
  },
  onProgress,
}

/** @type {JscadWorker} */
const workerApi = (globalThis.workerApi = messageProxy(worker, handlers, { onJobCount: trackJobs }))

const progress = byId('progress').querySelector('progress')
const progressText = byId('progressText')
let jobs = 0
let firstJobTimer

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

const jscadScript = async ({ script, url = './jscad.model.js', base = currentBase, root }) => {
  currentBase = base
  loadDefault = false // don't load default model if something else was loaded
  try {
    const result = await workerApi.jscadScript({ script, url, base, root, smooth: viewState.smoothRender })
    let tmp = genParams({ target: byId('paramsDiv'), params: result.def || [], callback: paramChangeCallback, pauseAnim: pauseAnimCallback, startAnim: startAnimCallback })
    setParamValues = tmp.setValue
    setAnimStatus = tmp.animStatus
    lastRunParams = result.params
    handlers.entities(result)
    if(result.def){
      result.def.find(def=>{
        if(def.fps && def.autostart){
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
}

await workerApi.jscadInit({ bundles })

let working
let lastParams
let lastRunParams
const paramChangeCallback = async (params, source) => {
  if(source == 'group'){
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
    result = await workerApi.jscadMain({ params, smooth: viewState.smoothRender })
    lastRunParams = params
  } finally {
    working = false
  }
  handlers.entities(result, { smooth: viewState.smoothRender })
  if (lastParams && lastParams != params) paramChangeCallback(lastParams)
}
/** @type {AnimRunner} */
let currentAnim

function stopCurrentAnim(){
  if(!currentAnim) return false
  currentAnim.pause()
  currentAnim = null
  setAnimStatus('')
  return true
}
const startAnimCallback = async (def,value) => {  
  if(stopCurrentAnim()) return
  setAnimStatus('running')
  const handleEntities = (result, paramValues, times)=>{
    lastRunParams = paramValues
    setParamValues(times || {}, true)
    handlers.entities(result, { smooth: viewState.smoothRender, skipLog:true })
  }

  const handleEnd = ()=>stopCurrentAnim()

  currentAnim = new AnimRunner(workerApi, {handleEntities, handleEnd})
  currentAnim.start(def, value, getParams(byId('paramsDiv')))
}

const pauseAnimCallback = async (def,value) => {
  stopCurrentAnim()
}

const loadExample = async (source, base = appBase) => {
  await resetFileRefs()
  editor.setSource(source, base)
  jscadScript({ script: source, base })
}

// Initialize three engine
viewState.setEngine(await engine.init())

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
      await workerApi.jscadClearFileCache({ files: [path] , root: sw.base})
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
try{
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
}catch(e){
  console.error(e)  
}
exporter.init(exportModel)
if (loadDefault && !hasRemoteScript) {
  jscadScript({ script: defaultCode, smooth: viewState.smoothRender })
}

try {
  await initFs()
} catch (err) {
  setError(err)
}

if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
  // service workers are disabled on hard-refresh, so need to reload.
  // to prevent a reload loop, don't reload again within 3 seconds.
  const lastReload = localStorage.getItem('lastReload')
  if (!lastReload || Date.now() - lastReload > 3000) {
    setError('cannot start service worker, reloading')
    localStorage.setItem('lastReload', Date.now())
    //location.reload()
  } else {
    console.error('cannot start service worker, reload required')
  }
  setError('cannot start service worker, reload required')
}
