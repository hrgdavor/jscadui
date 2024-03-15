import {
  addToCache,
  clearFs,
  extractEntries,
  analyzeProject,
  fileDropped,
  getFile,
  getFileContent,
  registerServiceWorker,
} from '@jscadui/fs-provider'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl } from '@jscadui/orbit'
import { genParams } from '@jscadui/params'
import { initMessaging, messageProxy } from '@jscadui/postmessage'

import defaultCode from './examples/jscad.example.js'
import * as editor from './src/editor.js'
import * as engine from './src/engine.js'
import * as exporter from './src/exporter.js'
import * as menu from './src/menu.js'
import * as remote from './src/remote.js'
import { formatStacktrace } from './src/stacktrace.js'
import { ViewState } from './src/viewState.js'
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
  sw = await registerServiceWorker(`bundle.fs-serviceworker.js?prefix=${scope}swfs/`, getFileWrapper, {
    scope,
    prefix: scope + 'swfs/',
  })
  sw.defProjectName = 'jscad'
  sw.onfileschange = files => {
    console.log('files', files)
    if(files.includes('/package.json')){
      reloadProject()
    }else{
      workerApi.clearFileCache({ files })
      editor.filesChanged(files)
    }
    if (sw.fileToRun) runScript({ url: sw.fileToRun, base: sw.base })
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
    workerApi.clearTempCache()

    await fileDropped(sw, files)

    reloadProject()

  } catch (error) {
    setError(error)
    console.error(error)
  }
}

async function reloadProject(){
  saveMap = {}
  const { alias, script } = await analyzeProject(sw)
  projectName = sw.projectName
  if (alias.length) {
    workerApi.init({ alias })
  }
  let url = sw.fileToRun
  runScript({ url, base: sw.base })
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
  const { data } = (await workerApi.exportData({ format })) || {}
  if (data) {
    save(new Blob([data], { type: 'text/plain' }), `${projectName}.${extension}`)
    console.log('save', `${projectName}.${extension}`, data)
  }
}

const onProgress = (value, note) => {
  const el = progress.querySelector('progress')
  if (value == undefined) {
    el.removeAttribute('value')
  } else {
    el.value = value
  }
  progress.querySelector('div').innerText = note ?? ''
}

const worker = new Worker('./build/bundle.worker.js')
const handlers = {
  entities: ({ entities, mainTime, convertTime }) => {
    if (!(entities instanceof Array)) entities = [entities]
    viewState.setModel((model = entities))
    console.log('Main execution:', mainTime?.toFixed(2), ', jscad mesh -> gl:', convertTime?.toFixed(2))
    setError(undefined)
  },
  onProgress,
}

/** @type {JscadWorker} */
const workerApi = messageProxy(worker, handlers, { onJobCount: trackJobs })

const progress = byId('progress')
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

const runScript = async ({ script, url = './jscad.model.js', base = currentBase, root }) => {
  currentBase = base
  loadDefault = false // don't load default model if something else was loaded
  try{
    const result = await workerApi.runScript({ script, url, base, root, smooth: viewState.smoothRender })
    genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
    lastRunParams = result.params
    handlers.entities(result)
  }catch(err){
    setError(err)    
  }
}

const bundles = {
  // local bundled alias for common libs.
  '@jscad/modeling': toUrl('./build/bundle.jscad_modeling.js'),
  '@jscad/io': toUrl('./build/bundle.jscad_io.js'),
}

await workerApi.init({ bundles })
if (loadDefault) {
  runScript({ script: defaultCode, smooth: viewState.smoothRender })
}

let working
let lastParams
let lastRunParams
const paramChangeCallback = async params => {
  if (!working) {
    lastParams = null
  } else {
    lastParams = params
    return
  }
  working = true
  let result
  try {
    result = await workerApi.runMain({ params, smooth: viewState.smoothRender })
    lastRunParams = params
  } finally {
    working = false
  }
  handlers.entities(result, { smooth: viewState.smoothRender })
  if (lastParams && lastParams != params) paramChangeCallback(lastParams)
}

const loadExample = async (source, base = appBase) => {
  await resetFileRefs()
  editor.setSource(source, base)
  runScript({ script: source, base })
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
      editor.filesChanged([file])
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
      // if not cleared by calling clearFileCache, require will not try to reload the file
      await workerApi.clearFileCache({ files: [path] })
      if (sw.fileToRun) runScript({ url: sw.fileToRun, base: sw.base })
    } else {
      runScript({ script })
    }
  },
  async (script, path) => {
    console.log('save file', path)
    let pathArr = path.split('/')
    let fileHandle = (await sw?.getFile(path))?.fileHandle
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
menu.init(loadExample)
welcome.init()
remote.init(
  (script, url) => {
    // run remote script
    editor.setSource(script, url)
    runScript({ script, base: url })
    welcome.dismiss()
  },
  err => {
    // show remote script error
    loadDefault = false
    setError(err)
    welcome.dismiss()
  },
)
exporter.init(exportModel)

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
    location.reload()
  } else {
    console.error('cannot start service worker, reload required')
  }
  setError('cannot start service worker, reload required')
}
