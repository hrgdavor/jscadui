import { booleans, colors, primitives, transforms } from '@jscad/modeling'
import { JscadToCommon } from '@jscadui/format-jscad'
import { extractEntries, fileDropped, registerServiceWorker } from '@jscadui/fs-provider'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl, OrbitState, closerAngle, getCommonRotCombined } from '@jscadui/orbit'
import { genParams } from '@jscadui/params'
import { messageProxy } from '@jscadui/postmessage'
import { makeAxes, makeGrid } from '@jscadui/scene'
import * as themes from '@jscadui/themes'

import { availableEngines, availableEnginesList } from './src/availableEngines'
import { urlInit, urlReplace } from './src/urlUtil.js'
import { EngineState } from './src/engineState.js'

/** @typedef {import('@jscadui/worker').JscadWorker} JscadWorker*/

const theme = themes.light
const { subtract } = booleans
const { translate } = transforms
const { colorize } = colors

export const byId = id => document.getElementById(id)
const toUrl = path => new URL(path, document.baseURI).toString()

const engineState = new EngineState(availableEngines, theme, makeAxes, makeGrid)
const useEngines = urlInit('engines', 'three,regl,babylon').split(',')
urlReplace()// use the new url with defaults applied

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
    workerApi.jscadClearTempCache()
    const { alias, script } = await fileDropped(sw, files)
    projectName = sw.projectName
    if (alias.length) {
      workerApi.jscadInit({ alias })
    }
    jscadScript({ url: sw.fileToRun, base: sw.base })
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
    errorBar.style.display = 'block'
    const errorMessage = byId('error-message')
    errorMessage.innerText = error
  } else {
    errorBar.style.display = 'none'
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
  workerApi
    .jscadExportData({ format })
    .then(({ data }) => {
      console.log('save', fileToRun + '.stl', data)
      save(new Blob([data], { type: 'text/plain' }), fileToRun + '.stl')
    })
    .catch(setError)
}
window.exportModel = exportModel

const paramChangeCallback = async params => {
  console.log('params changed', params)
  let result = await workerApi.jscadMain({ params })
  handlers.entities(result)
}

const jscadScript = async ({ script, url = './index.js', base, root }) => {
  const result = await workerApi.jscadScript({ script, url, base, root })
  console.log('result', result)
  genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
  handlers.entities(result)
}

/** @type {JscadWorker} */
const worker = new Worker('./build/bundle.worker.js')
const workerApi = messageProxy(worker, handlers, { onJobCount: trackJobs })
const handlers = {
  entities: ({ entities }) => {
    if (!(entities instanceof Array)) entities = [entities]
    setViewerScene((model = entities))
    setError(undefined)
  },
}

const spinner = byId('spinner')
let firstJobTimer

function trackJobs(jobs) {
  if (jobs === 1) {
    // do not show spinner for fast renders
    firstJobTimer = setTimeout(() => {
      spinner.style.display = 'block'
    }, 300)
  }
  if (jobs === 0) {
    clearTimeout(firstJobTimer)
    spinner.style.display = 'none'
  }
}

await workerApi.jscadInit({
  bundles: {
    '@jscad/modeling': toUrl('./build/bundle.jscad_modeling.js'),
  },
})

jscadScript({
  script: `const { sphere, geodesicSphere } = require('@jscad/modeling').primitives
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
  
  module.exports = { main }`,
})

let sw
async function initFs() {
  sw = await registerServiceWorker('bundle.fs-serviceworker.js?prefix=/swfs/')
  sw.defProjectName = 'jscad'
  sw.onfileschange = files => {
    workerApi.jscadClearFileCache({ files, root: sw.base })
    if (sw.fileToRun) jscadScript({ url: sw.fileToRun, base: sw.base })
  }
}

// ************ init ui     *********************************

Promise.all(useEngines.map(engine => engineState.initEngine(byId('box_' + engine), engine, ctrl))).then(() => {
  //
  console.log('engines initialized', useEngines)
})
