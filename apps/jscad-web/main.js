import { JscadToCommon } from '@jscadui/format-jscad'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl, OrbitState, closerAngle, getCommonRotCombined } from '@jscadui/orbit'
import { genParams } from '@jscadui/params'
import { initMessaging } from '@jscadui/postmessage'

import {
  addPreLoadAll,
  addToCache,
  clearFs,
  entryCheckPromise,
  extractEntries,
  filePromise,
  fileToFsEntry,
  findFileInRoots,
  readAsArrayBuffer,
  readAsText,
  readDir,
  registerServiceWorker,
} from '@jscadui/fs-provider'
import { ViewState } from './src/viewState.js'
import * as engine from './src/engine.js'

import * as editor from "./src/editor.js"
import * as menu from "./src/menu.js"
import * as welcome from "./src/welcome.js"
import * as exporter from "./src/exporter.js"

export const byId = id => document.getElementById(id)
customElements.define('jscadui-gizmo', Gizmo)

const viewState = new ViewState()

const gizmo = (window.gizmo = new Gizmo())
byId('layout').appendChild(gizmo)

let model = []
model = model.map(m => JscadToCommon(m))

const elements = [byId('viewer')]

function setViewerScene(model) {
  viewState.setModel(model)
}
const ctrl = (window.ctrl = new OrbitControl(elements, { ...viewState.camera, alwaysRotate: false }))
function setViewerCamera({ position, target, rx, rz }) {
  viewState.setCamera({ position, target })
  gizmo.rotateXZ(rx, rz)
}

const updateFromCtrl = change => {
  const { position, target, rx, rz, len, ...rest } = change
  setViewerCamera(change)
}

updateFromCtrl(ctrl)

ctrl.onchange = state => viewState.saveCamera(state)
ctrl.oninput = state => updateFromCtrl(state)

gizmo.oncam = ({ cam }) => {
  const [rx, rz] = getCommonRotCombined(cam)
  ctrl.animateToCamera({ rx, rz, target: [0, 0, 0] })
}

const dropModal = byId('dropModal')
const showDrop = show => {
  clearTimeout(showDrop.timer)
  dropModal.style.display = show ? 'initial' : 'none'
}
document.body.ondrop = ev => {
  ev.preventDefault()
  showDrop(false)
  fileDropped(ev)
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

const handlers = {
  entities: ({ entities }) => {
    if (!(entities instanceof Array)) entities = [entities]
    setViewerScene((model = entities))
    setError(undefined)
  },
}

const setError = (error) => {
  const errorBar = byId('error-bar')
  if (error) {
    const message = error.toString().replace(/^Error: /, '')
    const errorMessage = byId('error-message')
    errorMessage.innerText = message
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
  const { data } = await sendCmdAndSpin('exportData', { format }) || {}
  if(data){
    save(new Blob([data], { type: 'text/plain' }), `${projectName}.${extension}`)
    console.log('save', `${projectName}.${extension}`, data)
  } 
}

async function sendCmdAndSpin(method, params){
  spinner.style.display = 'block'
  try{
    return await sendCmd(method, params)
  }catch(error){
    setError(error)
    throw error
  }finally{
    spinner.style.display = 'none'
  }
}

const worker = new Worker('./build/bundle.worker.js')
const { sendCmd, sendNotify } = initMessaging(worker, handlers)

let sw
const toUrl = path => new URL(path, document.baseURI).toString()
registerServiceWorker('bundle.fs-serviceworker.js?prefix=/swfs/', async (path, sw) => {
  let arr = path.split('/').filter(p => p)
  let match = await findFileInRoots(sw.roots, arr)
  if (match) {
    fileIsRequested(path, match)
    return readAsArrayBuffer(await filePromise(match))
  }
}).then(async (_sw) => {
  sw = _sw
  await sendCmdAndSpin('init', {
    bundles: {
      '@jscad/modeling': toUrl('./build/bundle.jscad_modeling.js'),
    },
    baseURI: new URL(`/swfs/${sw.id}/`, document.baseURI).toString(),
  })
  editor.setCompileFun((script) => runScript(script))
}).catch((error) => setError(error))

const findByFsPath = (arr, file) => {
  const path = typeof file === 'string' ? file : file.fsPath
  return arr.find(f => f.fsPath === path)
}

const fileIsRequested = (path, file) => {
  let match
  if ((match = findByFsPath(filesToCheck, file))) return
  filesToCheck.push(file)
}

let filesToCheck = (window.filesToCheck = [])
let fileToRun
let projectName = 'jscad'
let lastCheck = Date.now()

const checkFiles = () => {
  const now = Date.now()
  if (now - lastCheck > 300 && filesToCheck.length != 0) {
    lastCheck = now
    let todo = filesToCheck.map(entryCheckPromise)
    Promise.all(todo).then(result => {
      result = result.filter(([entry, file]) => entry.lastModified != entry._lastModified)
      if (result.length) {
        const todo = []
        const files = result.map(([entry, file]) => {
          todo.push(addToCache(sw.cache, entry.fsPath, file))
          return entry.fsPath
        })
        sendNotify('clearFileCache', { files })
        Promise.all(todo).then(result => {
          if (fileToRun) runFile(fileToRun)
        })
        console.log(
          'result',
          result.map(([entry, file]) => entry.fsPath + '/' + entry.lastModified),
        )
      }
    })

    // TODO clear sw cache
    // TODO sendCmd clearFileCache {files}
  }
  requestAnimationFrame(checkFiles)
}

const spinner = byId('spinner')
const paramChangeCallback = params => {
  console.log('params changed', params)
  sendCmdAndSpin('runMain', { params })
}
const runScript = async (script, url = './index.js') => {
  const result = await sendCmdAndSpin('runScript', { script, url })
  if(result) genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
}
const runFile = async file => {
  const result = await sendCmdAndSpin('runFile', { file })
  if(result) genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
}

checkFiles()

async function fileDropped(ev) {
  //this.worker.postMessage({action:'fileDropped', dataTransfer})
  let files = extractEntries(ev.dataTransfer)
  if (!files.length) return

  filesToCheck.length = 0
  fileToRun = 'index.js'
  let folderName
  clearFs(sw)
  sendCmd('clearTempCache', {})
  let rootFiles = []
  if (files.length === 1) {
    const file = files[0]
    if (file.isDirectory) {
      folderName = file.name
      file.fsDir = '/'
      rootFiles = await readDir(file)
    } else {
      rootFiles.push(file)
      fileToRun = file.name
    }
  } else {
    rootFiles = Array.from(files)
  }
  rootFiles = rootFiles.map(e => fileToFsEntry(e, '/'))
  sw.roots.push(rootFiles)

  let pkgFile = await findFileInRoots(sw.roots, 'package.json')
  if (pkgFile) {
    try {
      const pack = JSON.parse(await readAsText(pkgFile))
      if (pack.main) fileToRun = pack.main
      const alias = []
      if (pack.workspaces)
        for (let i = 0; i < pack.workspaces.length; i++) {
          const w = pack.workspaces[i]
          // debugger
          let pack2 = await findFileInRoots(sw.roots, `/${w}/package.json`)
          if (pack2) pack2 = JSON.parse(await readAsText(pack2))
          let name = pack2?.name || w
          let main = pack2?.main || 'index.js'
          alias.push([`/${w}/${main}`, name])
        }
      if (alias.length) {
        sendNotify('init', { alias })
      }
    } catch (error) {
      console.error('error parsing package.json', error)
    }
  }

  let time = Date.now()
  const preLoad = ['/' + fileToRun, '/package.json']
  const loaded = await addPreLoadAll(sw, preLoad, true)
  console.log(Date.now() - time, 'preload', loaded)

  projectName = 'jscad'
  if (fileToRun !== 'index.js') projectName = fileToRun.replace(/\.js$/, '')
  if (folderName) projectName = folderName

  if (fileToRun) {
    fileToRun = `/${fileToRun}`
    const file = await findFileInRoots(sw.roots, fileToRun)
    if (file) {
      runFile(fileToRun)
      filesToCheck.push(file)
      editor.setSource(await readAsText(file))
    } else {
      setError(`main file not found ${fileToRun}`)
    }
  }
}

const loadExample = (source) => {
  editor.setSource(source)
  runScript(source)
}

// Initialize three engine
engine.init().then((viewer) => {
  viewState.setEngine(viewer)
  setViewerScene(model)
})

editor.init()
menu.init(loadExample)
welcome.init()
exporter.init(exportModel)
