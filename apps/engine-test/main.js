import { makeAxes, makeGrid } from '@jscadui/scene'
import { light as theme } from '@jscadui/themes'

import style from './main.css'
import * as THREE from './src/Three.jscad.js'
import { OrbitCamera, camRotation, calcCamPos, OrbitControl } from './src/orbitControls.js'
import { initTestBabylon } from './testBabylon.js'
import { initTestRegl } from './testRegl.js'
import { initTestThree } from './testThree.js'
import { Gizmo } from '@jscadui/html-gizmo'

export const byId = id => document.getElementById(id)

customElements.define('jscadui-gizmo', Gizmo);

window.THREE = THREE // expose for console testing
// global: jscadReglRenderer
// global: BABYLON
window.regl = window.jscadReglRenderer

let viewers = (self.viewer = [
  initTestThree(THREE, byId('box0')),
  initTestBabylon(BABYLON, byId('box2')),
  initTestRegl(jscadReglRenderer, byId('box3')),
])
const gizmo = window.gizmo = new Gizmo()
byId('box1').appendChild(gizmo)

const axes = [makeAxes(50)]
const grid = makeGrid({ size: 200, color1: theme.grid1, color2: theme.grid2 })

viewers.forEach(viewer => {
  viewer.setScene?.({
    items: [
      { id: 'axes', items: axes },
      { id: 'grid', items: grid },
    ],
  })
})

const setViewerCamera = (position, target, calc)=>{
  viewers.forEach(v => v.setCamera({ position, target }))
  gizmo.rotateXZ(calc.rx,calc.rz)
}

const updateCamera = e => {
  const pos = formValue(document.forms.posForm)
  const lat = formValue(document.forms.lookForm)
  const target = [lat.x,lat.y, lat.z]
  const position = [pos.x,pos.y, pos.z]
  let rot = camRotation({position, target})
  setViewerCamera(position, target, rot)
  fillForm(document.forms.rotForm, rot)
}

const updateRotation = e => {
  const pos = formValue(document.forms.posForm)
  const lat = formValue(document.forms.lookForm)
  const rot = formValue(document.forms.rotForm)
  console.log('rot', rot)
  const target = [lat.x,lat.y, lat.z]
  const position = [pos.x,pos.y, pos.z]
  let cur = camRotation({position, target})
  console.log('cur', cur)
  const { rx, rz, lenXY, len, vec } = cur
  const camPos = calcCamPos({target, len:rot.len, rx:rot.rx, rz:rot.rz})
  console.log('camPos', camPos)
  pos.x = camPos[0]
  pos.y = camPos[1]
  pos.z = camPos[2]
  setViewerCamera([pos.x, pos.y, pos.z],[lat.x, lat.y, lat.z], rot)
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

let cam1 = new OrbitCamera()
let rotation = camRotation(cam1)
fillForm(document.forms.rotForm, rotation)

const ctrl = window.ctrl = new OrbitControl(byId('box1'))
gizmo.rotateXZ(ctrl.calc.rx, ctrl.calc.rz)
gizmo.oncam = ({cam})=>ctrl.setCommonCamera(cam)
ctrl.onchange = ({position, target, rx, rz, len, ...rest}) => {
  fillForm(document.forms.posForm, {x:position[0], y:position[1], z:position[2]})
  fillForm(document.forms.lookForm, {x:target[0], y:target[1], z:target[2]})
  fillForm(document.forms.rotForm, {rx, rz, len})
  setViewerCamera(position, target, {rx,rz})
}

