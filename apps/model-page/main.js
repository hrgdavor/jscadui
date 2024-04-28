import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl, OrbitState, closerAngle, getCommonRotCombined } from '@jscadui/orbit'
import { messageProxy } from '@jscadui/postmessage'
import { makeAxes, makeGrid } from '@jscadui/scene'
import * as themes from '@jscadui/themes'

import { genParams } from '../../packages/params-form/src/params'
import { initTestThree } from './src/testThree'

/** @typedef {import('@jscadui/worker').JscadWorker} JscadWorker*/

const theme = themes.light
let fileToRun
let sceneGrid
let sceneAxes = makeAxes(50)
let sceneEntities = []
let viewer

export const byId = id => id?.nodeType !== undefined ? id:document.getElementById(id)

const gizmo = (window.gizmo = new Gizmo())
byId('layout').appendChild(gizmo)

function setViewerScene(model) {
  const all = [...model, ...sceneGrid, sceneAxes]
  viewer.setScene({ items: [{ id: 'model', items: all }] })
  sceneEntities = model
}

function setTheme(theme) {
  viewer.setMeshColor(theme.color)
  viewer.setBg(theme.bg)
  sceneGrid = makeGrid({ size: 200, color1: theme.grid1, color2: theme.grid2 })
  setViewerScene(sceneEntities) // set again if theme changes meshes with default color need to change too
}

const stored = localStorage.getItem('camera.location')
let initialCamera = { position: [180, -180, 220] }
try {
  if (stored) initialCamera = JSON.parse(stored)
} catch (error) {
  console.log(error)
}

const elements = [byId('root')]

const ctrl = (window.ctrl = new OrbitControl(elements, { ...initialCamera, alwaysRotate: false }))
function setViewerCamera({ position, target, rx, rz }) {
  viewer.setCamera({ position, target })
  gizmo.rotateXZ(rx, rz)
}

const updateFromCtrl = change => {
  const { position, target, rx, rz, len, ...rest } = change
  setViewerCamera(change)
}

const saveCamera = cam => localStorage.setItem('camera.location', JSON.stringify(cam))

ctrl.onchange = change => {
  saveCamera(change)
  stopAnim()
  updateFromCtrl(change)
}

gizmo.oncam = ({ cam }) => {
  const [rx, rz] = getCommonRotCombined(cam)
  startAnim({ rx, rz, target: [0, 0, 0] })
  saveCamera(stateEnd)
}

const startAnim = ({ target, rx, rz }) => {
  startTime = Date.now()
  // rx does not need this fix as it only operates inside one half of a rotation
  ctrl.rz = closerAngle(ctrl.rz, rz)
  stateStart = new OrbitState(ctrl, true)
  stateEnd = new OrbitState({ target: target || ctrl.target, rx, rz, len: ctrl.len })
  animTimer = requestAnimationFrame(doAnim)
}

const stopAnim = () => {
  cancelAnimationFrame(animTimer)
  animTimer = null
  startTime = 0
}

const doAnim = () => {
  let percent = Math.min(1, (Date.now() - startTime) / animDuration)
  const newState = stateStart.calcAnim(stateEnd, percent)
  ctrl.setRotate(newState.rx, newState.rz, newState.target, false)
  updateFromCtrl(ctrl)
  // update orbit control so it can continue working during or after anim
  if (percent < 1) animTimer = requestAnimationFrame(doAnim)
}

let animDuration = 200
let animTimer, stateStart, stateEnd, startTime

const handlers = {
  entities: ({ entities }) => {
    if (!(entities instanceof Array)) entities = [entities]
    setViewerScene(entities)
  },
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
  sendCmd('jscadExportData', [{ format }]).then(({ data }) => {
    console.log('save', fileToRun + '.stl', data)
    save(new Blob([data], { type: 'text/plain' }), fileToRun + '.stl')
  })
}
window.exportModel = exportModel

var worker = new Worker('./build/bundle.worker.js')
/** @type {JscadWorker} */
const workerApi = globalThis.workerApi = messageProxy(worker, handlers, {  })

const paramChangeCallback = params => {
  console.log('params', params)
  workerApi.jscadMain({ params })
}

export const jscadScript = file => {
  fileToRun = file.replace(/.*\//, '').replace(/\..*/, '')
  workerApi.jscadScript({ url: file }).then(result => {
    console.log('result', result)
    genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
  })
}

// ************ init ui     *********************************

export const initEngine = async (THREE, elem, workerOptions) => {
  viewer = initTestThree(THREE, byId(elem))
  updateFromCtrl(ctrl)
  setTheme(theme)

  await workerApi.jscadInit(workerOptions)
}
