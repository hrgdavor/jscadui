import { booleans, primitives, transforms, colors } from '@jscad/modeling'
import { Gizmo } from '@jscadui/html-gizmo'
import {
  OrbitControl,
  OrbitState,
  calcCamPos,
  camRotation,
  closerAngle,
  getCommonRotCombined,
  normalizeAngle,
} from '@jscadui/orbit'
import { makeAxes, makeGrid } from '@jscadui/scene'
import { light as theme } from '@jscadui/themes'

import style from './main.css'
import { CSGToBuffers } from './src/CsgToBuffers'
import * as THREE from './src/Three.jscad.js'
import { initTestBabylon } from './testBabylon.js'
import { initTestRegl } from './testRegl.js'
import { initTestThree } from './testThree.js'

const { subtract } = booleans
const { translate } = transforms
const { colorize } = colors

export const byId = id => document.getElementById(id)

customElements.define('jscadui-gizmo', Gizmo)

window.THREE = THREE // expose for console testing
// global: jscadReglRenderer
// global: BABYLON
window.regl = window.jscadReglRenderer

let viewers = (self.viewer = [
  initTestThree(THREE, byId('box0')),
  initTestBabylon(BABYLON, byId('box2')),
  initTestRegl(jscadReglRenderer, byId('box3')),
])
const gizmo = (window.gizmo = new Gizmo())
byId('box1').appendChild(gizmo)

const axes = [makeAxes(50)]
const grid = makeGrid({ size: 200, color1: theme.grid1, color2: theme.grid2 })

const modelRadius = 30
let model = [subtract(
  primitives.sphere({ radius: modelRadius, segments: 16 }),
  translate([modelRadius,0,modelRadius],primitives.sphere({ radius: modelRadius , segments:16})),
)]
model.push(colorize([0.7,0,0],translate([60,0,0],primitives.sphere({ radius: 10 }))))
model.push(colorize([0,0.7,0],translate([0,60,0],primitives.sphere({ radius: 10 }))))
model.push(colorize([0,0,0.7],translate([0,0,60],primitives.sphere({ radius: 10 }))))
model.push(colorize([1,0.7,0,0.5],translate([-20,-20,0],primitives.cube({ size: 30 }))))

model = model.map(m=>CSGToBuffers(m))
console.log(model[1])

viewers.forEach(viewer => {
  viewer.setBg(theme.bg)
  viewer.setMeshColor(theme.color)
  viewer.setScene?.({
    items: [
      { id: 'axes', items: axes },
      { id: 'grid', items: grid },
      { id: 'model', items: model },
    ],
  })
})

const setViewerCamera = ({ position, target, rx, rz }) => {
  viewers.forEach(v => v.setCamera({ position, target }))
  gizmo.rotateXZ(rx, rz)
}

const updateCamera = e => {
  const pos = formValue(document.forms.posForm)
  const lat = formValue(document.forms.lookForm)
  const target = [lat.x, lat.y, lat.z]
  const position = [pos.x, pos.y, pos.z]
  let rot = camRotation({}, position, target)
  setViewerCamera(rot)
  fillForm(document.forms.rotForm, rot)
}

const updateRotation = e => {
  const pos = formValue(document.forms.posForm)
  const lat = formValue(document.forms.lookForm)
  const rot = formValue(document.forms.rotForm)
  console.log('rot', rot)
  const target = [lat.x, lat.y, lat.z]
  const position = [pos.x, pos.y, pos.z]
  let cur = camRotation({}, position, target)
  console.log('cur', cur)
  const camPos = (cur.position = calcCamPos({ target, len: rot.len, rx: rot.rx, rz: rot.rz }))
  console.log('camPos', camPos)
  pos.x = camPos[0]
  pos.y = camPos[1]
  pos.z = camPos[2]
  setViewerCamera(cur)
  fillForm(document.forms.posForm, pos)
}

listenChange(document.forms.lookForm, updateCamera)
listenChange(document.forms.posForm, updateCamera)
listenChange(document.forms.rotForm, updateRotation)
function listenChange(form, callback) {
  Array.prototype.forEach.call(form.elements, e => (e.oninput = callback))
}

function formValue(form) {
  const out = {}
  Array.prototype.forEach.call(form.elements, i => {
    let value = i.value
    if (i.type === 'number') value = parseFloat(value)
    out[i.name] = value
  })
  return out
}

function fillForm(form, values) {
  Array.prototype.forEach.call(form.elements, i => {
    let value = values[i.name]
    if (value === null || value === undefined) value = i.type === 'number' ? 0 : ''
    i.value = value
  })
}

fillForm(document.forms.rotForm, { x: 1, y: 1 })

const ctrl = (window.ctrl = new OrbitControl(byId('box1'), { position: [180, -180, 220] }))
//gizmo.rotateXZ(ctrl.rx, ctrl.rz)
setViewerCamera(ctrl)

const updateFromCtrl = change => {
  // console.log('change', change)
  const { position, target, rx, rz, len, ...rest } = change
  fillForm(document.forms.posForm, { x: position[0], y: position[1], z: position[2] })
  fillForm(document.forms.lookForm, { x: target[0], y: target[1], z: target[2] })
  fillForm(document.forms.rotForm, { rx, rz, len })
  setViewerCamera(change)
}

updateFromCtrl(ctrl)

ctrl.onchange = change => {
  stopAnim()
  updateFromCtrl(change)
}

gizmo.oncam = ({ cam }) => {
  const [rx, rz] = getCommonRotCombined(cam)
  startAnim({ rx, rz, target: [0, 0, 0] })
  //  ctrl.setCommonCamera(cam)
}

const startAnim = ({ target, rx, rz }) => {
  startTime = Date.now()
  // rx does not need this fix as it only operates inside one half of a rotation
  ctrl.rz = closerAngle(ctrl.rz, rz)
  stateStart = new OrbitState(ctrl, true)
  stateEnd = new OrbitState({ target: ctrl.target, rx, rz, len: ctrl.len })
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
