import { booleans, colors, primitives, transforms } from '@jscad/modeling'
import { JscadToCommon } from '@jscadui/format-jscad'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl, OrbitState, closerAngle, getCommonRotCombined } from '@jscadui/orbit'
import { makeAxes, makeGrid } from '@jscadui/scene'
import * as themes from '@jscadui/themes'
import { initMessaging } from '@jscadui/post-message'

import style from './main.css'
import { initTestBabylon } from './src/testBabylon.js'
import { initTestRegl } from './src/testRegl.js'
import { initTestThree } from './src/testThree.js'

const theme = themes.light
const { subtract } = booleans
const { translate } = transforms
const { colorize } = colors

export const byId = id => document.getElementById(id)

customElements.define('jscadui-gizmo', Gizmo)

// global: THREE // expose for console testing
// global: REGL
// global: BABYLON
window.REGL = window.REGL || window.jscadReglRenderer

let viewers = self.viewer = []
if(typeof THREE != 'undefined') viewers.push(initTestThree(THREE, byId('box0')))
if(typeof BABYLON != 'undefined') viewers.push(initTestBabylon(BABYLON, byId('box2')))
if(typeof REGL != 'undefined') viewers.push(initTestRegl(REGL, byId('box3')))

const gizmo = (window.gizmo = new Gizmo())
byId('box1').appendChild(gizmo)

const axes = [makeAxes(50)]
const grid = makeGrid({ size: 200, color1: theme.grid1, color2: theme.grid2 })

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

function setScene() {
  viewers.forEach(viewer => {
    viewer.setScene?.({
      items: [
        { id: 'axes', items: axes },
        { id: 'grid', items: grid },
        { id: 'model', items: model },
      ],
    })
  })
}
setTheme(theme)
setScene()

const setViewerCamera = ({ position, target, rx, rz }) => {
  viewers.forEach(v => v.setCamera({ position, target }))
  gizmo.rotateXZ(rx, rz)
}

const stored = localStorage.getItem('camera.location')
let initialCamera = { position: [180, -180, 220] }
try {
  if (stored) initialCamera = JSON.parse(stored)
} catch (error) {
  console.log(error)
}

const elements = [byId('box0'), byId('box1'), byId('box2'), byId('box3')]
const ctrl = (window.ctrl = new OrbitControl(elements, { ...initialCamera, alwaysRotate: false }))
//gizmo.rotateXZ(ctrl.rx, ctrl.rz)
setViewerCamera(ctrl)

const updateFromCtrl = change => {
  // console.log('change', change)
  const { position, target, rx, rz, len, ...rest } = change
  setViewerCamera(change)
}

updateFromCtrl(ctrl)

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
  //  ctrl.setCommonCamera(cam)
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

const sel = byId('themeSelect')
for (let tn in themes) {
  const tmp = themes[tn]
  sel.add(new Option(tmp.name, tn))
}
sel.value = 'light'
sel.oninput = e => {
  const tmp = themes[sel.value]
  setTheme(tmp)
  setScene()
}

let checkChange_timer
let fileToWatch

function checkChange(){
  if(!fileToWatch) return

  clearTimeout(checkChange_timer)
  fileToWatch.file(f=>{
    console.log('lastModified::',f.lastModified, f)
  })
  checkChange_timer = setTimeout(checkChange,1000)
}
  
function fileDropped (ev){
  let dataTransfer = {files:ev.dataTransfer.files}
  //this.worker.postMessage({action:'fileDropped', dataTransfer})
  let file
  dataTransfer = ev.dataTransfer
  if (dataTransfer.items) {
    console.log('dataTransfer items', dataTransfer)
    // Use DataTransferItemList interface to access the file(s)
    for (let i = 0; i < dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (dataTransfer.items[i].kind === 'file') {
        file = dataTransfer.items[i]
        if (file.webkitGetAsEntry) file = file.webkitGetAsEntry()
        else if (file.getAsEntry) file = file.getAsEntry()
        else file = file.webkitGetAsFile()
        console.log('... webkit file[' + i + '].name = ' + file.name)
        break
      }
    }
  }
  if (file){
    fileToWatch = file
    checkChange()
  }
}

const handlers = {
  entitties: ({entities})=>{
    console.log('entities', entities)
  },
  loaded:()=>{
    console.log('worker loaded')
    return 'hello worker'
  }
}

var worker = new Worker('./build/bundle.worker.js');
const { sendCmd, sendNotify } = initMessaging(worker, handlers)
