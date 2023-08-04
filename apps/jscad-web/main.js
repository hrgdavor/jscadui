import { extractEntries, fileDropped, registerServiceWorker } from '@jscadui/fs-provider'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl } from '@jscadui/orbit'
import { genParams } from '@jscadui/params'
import { initMessaging } from '@jscadui/postmessage'

import defaultCode from './examples/jscad.example.js'
import * as editor from './src/editor.js'
import * as engine from './src/engine.js'
import * as exporter from './src/exporter.js'
import * as menu from './src/menu.js'
import { ViewState } from './src/viewState.js'
import * as welcome from './src/welcome.js'

export const byId = id => document.getElementById(id)
const toUrl = path => new URL(path, document.baseURI).toString()

customElements.define('jscadui-gizmo', Gizmo)

const viewState = new ViewState()

const gizmo = (window.gizmo = new Gizmo())
byId('layout').appendChild(gizmo)

let model = []

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
async function initFs() {
  sw = await registerServiceWorker('bundle.fs-serviceworker.js?prefix=/swfs/')
  sw.defProjectName = 'jscad'
  sw.onfileschange = files => {
    sendNotify('clearFileCache', { files })
    if (sw.fileToRun) runScript({ url: sw.fileToRun, base: sw.base })
  }
}
const dropModal = byId('dropModal')
const showDrop = show => {
  clearTimeout(showDrop.timer)
  dropModal.style.display = show ? 'initial' : 'none'
}
document.body.ondrop = async ev => {
  try {
    ev.preventDefault()
    let files = extractEntries(ev.dataTransfer)
    if (!files.length) return {}
  
    if (!sw) await initFs()
    showDrop(false)
    sendCmd('clearTempCache', {})
    const { alias, script } = await fileDropped(sw, files)
    projectName = sw.projectName
    if (alias?.length) {
      sendNotify('init', { alias })
    }
    runScript({ url: sw.fileToRun, base: sw.base })
    editor.setSource(script)
  } catch (error) {
    setError(error)
    console.error(error)
  }
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
  const { data } = (await sendCmdAndSpin('exportData', { format })) || {}
  if (data) {
    save(new Blob([data], { type: 'text/plain' }), `${projectName}.${extension}`)
    console.log('save', `${projectName}.${extension}`, data)
  }
}

const worker = new Worker('./build/bundle.worker.js')
const handlers = {
  entities: ({ entities }) => {
    if (!(entities instanceof Array)) entities = [entities]
    viewState.setModel((model = entities))
    setError(undefined)
  },
}
const { sendCmd, sendNotify } = initMessaging(worker, handlers)

const spinner = byId('spinner')
async function sendCmdAndSpin(method, params) {
  spinner.style.display = 'block'
  try {
    return await sendCmd(method, params)
  } catch (error) {
    setError(error)
    throw error
  } finally {
    spinner.style.display = 'none'
  }
}

sendCmdAndSpin('init', {
  bundles: {
    '@jscad/modeling': toUrl('./build/bundle.jscad_modeling.js'),
  },
}).then(() => {
  runScript({ script: defaultCode })
})

const paramChangeCallback = params => {
  console.log('params changed', params)
  sendCmdAndSpin('runMain', { params })
}

const runScript = async ({ script, url = './index.js', base, root }) => {
  const result = await sendCmdAndSpin('runScript', { script, url, base, root })
  genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
}

let projectName = 'jscad'

const loadExample = source => {
  editor.setSource(source)
  runScript({ script: source })
}

// Initialize three engine
engine.init().then(viewer => {
  viewState.setEngine(viewer)
})

editor.init(defaultCode, script => runScript({ script }))
menu.init(loadExample)
welcome.init()
exporter.init(exportModel)
