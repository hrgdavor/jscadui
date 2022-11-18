import { makeAxes, makeGrid } from '@jscadui/scene'
import { light as theme } from '@jscadui/themes'

import style from './main.css'
import * as THREE from './src/Three.jscad.js'
import { OrbitCamera, camRotation, testCamRotation, calcCamPos } from './src/orbitControls.js'
import { initTestBabylon } from './testBabylon.js'
import { initTestRegl } from './testRegl.js'
import { initTestThree } from './testThree.js'

export const byId = id => document.getElementById(id)

window.THREE = THREE // expose for console testing
// global: jscadReglRenderer
// global: BABYLON
window.regl = window.jscadReglRenderer

let viewers = (self.viewer = [
  // initTestThree(THREE, byId('box0')),
  // initTestBabylon(BABYLON, byId('box2')),
  initTestRegl(jscadReglRenderer, byId('box3')),
])

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

const updateCamera = e => {
  const pos = formValue(document.forms.posForm)
  const lat = formValue(document.forms.lookForm)
  viewers.forEach(v => v.setCamera({ position: [pos.x, pos.y, pos.z], target: [lat.x, lat.y, lat.z] }))
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
  const { ry, rz, lenXY, len, vec } = cur
  const camPos = calcCamPos({target, len, ry:rot.ry, rz:rot.rz})
  console.log('camPos', camPos)
  pos.x = camPos[0]
  pos.y = camPos[1]
  pos.z = camPos[2]
  viewers.forEach(v => v.setCamera({ position: [pos.x, pos.y, pos.z], target: [lat.x, lat.y, lat.z] }))
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
let rotation = testCamRotation(cam1)
fillForm(document.forms.rotForm, rotation)
