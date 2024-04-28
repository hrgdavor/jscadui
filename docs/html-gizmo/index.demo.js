import { Gizmo } from './index.js'
// this is required to register the jscadui-gizmo web component
Gizmo.define()

const rotateGizmos = () => {
  document.body.querySelectorAll('jscadui-gizmo').forEach(gizmo => gizmo.rotateXZ(rx, rz))
}

let rx = Math.PI / 4
let rz = Math.PI * 1.8
window.onload = e=>{
  const names = {T:'T',B:'B',N:'N',S:'S',E:'E',W:'W'}
  document.body.querySelectorAll('jscadui-gizmo.custom-names').forEach(gizmo => gizmo.setNames(names))
  rotateGizmos(rx, rz)
}
const el = document.body

let isDown = false
let isMoving = false
let lx = 0
let ly = 0

el.addEventListener('pointerdown', e => {
  lx = e.clientX
  ly = e.clientY
  isDown = true
})

el.addEventListener('pointerup', e => {
  isDown = false
  if (isMoving) el.releasePointerCapture(e.pointerId)
  isMoving = false
})

el.addEventListener('pointermove', e => {
  if (!isDown) return

  if (!isMoving) {
    // pointer capture inside pointerdown caused clicking to not work
    // it is better to capture pointer only on pointer down + first movement
    el.setPointerCapture(e.pointerId)
    isMoving = true
  }

  let dx = lx - e.clientX
  let dy = ly - e.clientY
  rx += dy * 0.01
  rz += dx * 0.01
  rotateGizmos(rx, rz)

  lx = e.clientX
  ly = e.clientY
})
