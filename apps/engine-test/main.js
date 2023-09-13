import { booleans, colors, primitives, transforms } from '@jscad/modeling'
import { JscadToCommon } from '@jscadui/format-jscad'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl, OrbitState, closerAngle, getCommonRotCombined } from '@jscadui/orbit'
import { genParams } from '@jscadui/params'
import { initMessaging } from '@jscadui/postmessage'
import { makeAxes, makeGrid } from '@jscadui/scene'
import * as themes from '@jscadui/themes'

import {
  fileDropped,
  extractEntries,
  registerServiceWorker,
} from '@jscadui/fs-provider'
import { availableEngines, availableEnginesList } from './src/availableEngines'
import { CurrentUrl } from './src/currentUrl'
import { EngineState } from './src/engineState'

const theme = themes.light
const { subtract } = booleans
const { translate } = transforms
const { colorize } = colors

export const byId = id => document.getElementById(id)
const toUrl = path => new URL(path, document.baseURI).toString()
const currentUrl = new CurrentUrl()
Gizmo.define()

const engineState = new EngineState(availableEngines, theme, makeAxes, makeGrid)
const useEngines = currentUrl.initGet('engines', 'three').split(',')

const gizmo = (window.gizmo = new Gizmo())
byId('layout').appendChild(gizmo)

let projectName = 'jscad'
const modelRadius = 30
let model = [
  subtract(
    primitives.sphere({ radius: modelRadius, segments: 16 }),
    translate([modelRadius, 0, modelRadius], primitives.sphere({ radius: modelRadius, segments: 16 })),
  ),
]

model.push(colorize([0.7, 0, 0], translate([60, 0, 0], primitives.sphere({ radius: 10 }))))
model.push(colorize([0, 0.7, 0], translate([0, 60, 0], primitives.sphere({ radius: 10 }))))
model.push(colorize([0, 0, 0.7], translate([0, 0, 60], primitives.sphere({ radius: 10 }))))
model.push(colorize([1, 0.7, 0, 0.5], translate([-20, -20, 0], primitives.cube({ size: 30 }))))

model = model.map(m => JscadToCommon(m))

function setTheme(theme) {
  viewers.forEach(viewer => {
    viewer.setBg(theme.bg)
    viewer.setMeshColor(theme.color)
  })
}

const stored = localStorage.getItem('camera.location')
let initialCamera = { position: [180, -180, 220] }
try {
  if (stored) initialCamera = JSON.parse(stored)
} catch (error) {
  console.log(error)
}

const elements = []
availableEnginesList.forEach(code => {
  const cfg = availableEngines[code]
  const el = byId('box_' + code)
  el.querySelector('i').textContent = cfg.name
  elements.push(el)
})

function setViewerScene(model) {
  engineState.setModel(model)
}
const ctrl = (window.ctrl = new OrbitControl(elements, { ...initialCamera, alwaysRotate: false }))
function setViewerCamera({ position, target, rx, rz }) {
  engineState.setCamera({ position, target })
  gizmo.rotateXZ(rx, rz)
}

const updateFromCtrl = change => {
  // console.log('change', change)
  const { position, target, rx, rz, len, ...rest } = change
  setViewerCamera(change)
}

updateFromCtrl(ctrl)

const saveCamera = cam => localStorage.setItem('camera.location', JSON.stringify(cam))

ctrl.onchange = state => saveCamera(state)
ctrl.oninput = state => updateFromCtrl(state)

gizmo.oncam = ({ cam }) => {
  const [rx, rz] = getCommonRotCombined(cam)
  ctrl.animateToCamera({ rx, rz, target: [0, 0, 0] })
}

const sel = byId('themeSelect')
for (let tn in themes) {
  const tmp = themes[tn]
  sel.add(new Option(tmp.name, tn))
}
sel.value = 'light'
sel.oninput = e => {
  const tmp = themes[sel.value]
  setTheme(tmp)
  setViewerScene(model)
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
    if (alias.length) {
      sendNotify('init', { alias })
    }
    runScript({ url: sw.fileToRun, base: sw.base })
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

function setError(error) {
  const errorBar = byId('error-bar')
  if (error) {
    errorBar.style.display = "block"
    const errorMessage = byId('error-message')
    errorMessage.innerText = error
  } else {
    errorBar.style.display = "none"
  }
}

const link = document.createElement('a')
link.style.display = 'none'
document.body.appendChild(link)
function save(blob, filename) {
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

function exportModel(format) {
  sendCmd('exportData', { format }).then(({ data }) => {
    console.log('save', fileToRun + '.stl', data)
    save(new Blob([data], { type: 'text/plain' }), fileToRun + '.stl')
  }).catch(setError)
}
window.exportModel = exportModel

const worker = new Worker('./build/bundle.worker.js')
const handlers = {
  entities: ({ entities }) => {
    if (!(entities instanceof Array)) entities = [entities]
    setViewerScene((model = entities))
    setError(undefined)
  },
}
const { sendCmd, sendNotify } = initMessaging(worker, handlers)

const spinner = byId('spinner')
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

sendCmdAndSpin('init', {
  bundles: {
    '@jscad/modeling': toUrl('./build/bundle.jscad_modeling.js'),
  },
}).then(()=>{
  runScript({script:`const { sphere, geodesicSphere } = require('@jscad/modeling').primitives
  const { translate, scale } = require('@jscad/modeling').transforms
  
  const main = () => [
    translate([15, -25, 0], sphere({ radius: 10, segments: 12 })),
    translate([-15, -25, 0], geodesicSphere({ radius: 10, frequency: 6 })),
    
    translate([15, 0, 0], sphere({ radius: 10, segments: 32 })),
    translate([-15, 0, 0], geodesicSphere({ radius: 10, frequency: 24 })),
    
    scale([0.5, 1, 2], translate([15, 25, 0], sphere({ radius: 10, segments: 32 }))),
    scale([0.5, 2, 1], translate([30, 25, 0], sphere({ radius: 10, segments: 32 }))),
    scale([0.5, 1, 2], translate([-15, 25, 0], geodesicSphere({ radius: 10, frequency: 18 }))),
    scale([0.5, 2, 1], translate([-30, 25, 0], geodesicSphere({ radius: 10, frequency: 18 })))
  ]
  
  module.exports = { main }`
  })
})

const paramChangeCallback = params => {
  console.log('params changed', params)
  sendCmdAndSpin('runMain', { params })
}

const runScript = async ({script, url = './index.js', base, root}) => {
  const result = await sendCmdAndSpin('runScript', { script, url, base, root })
  genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
}

let sw
async function initFs() {
  sw = await registerServiceWorker('bundle.fs-serviceworker.js?prefix=/swfs/')
  sw.defProjectName = 'jscad'
  sw.onfileschange = files => {
    sendNotify('clearFileCache', { files })
    if (sw.fileToRun) runScript({ url: sw.fileToRun, base: sw.base })
  }
}

// ************ init ui     *********************************

window.boxInfoClick = function (event, box) {
  console.log('boxInfoClick', box, event.target)
}

Promise.all(useEngines.map(engine => engineState.initEngine(byId('box_' + engine), engine, ctrl))).then(() => {
  //
  console.log('engines initialized', useEngines)
})
