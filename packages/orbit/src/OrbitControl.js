/**  
 This is OrbitContolr starting as a simpler and more primitive than others, meant to support multiple webgl engines.

 some resources considered while in making (aside from looking a bit onto other OrbitControl implementations)
 https://webglfundamentals.org/webgl/lessons/webgl-3d-camera.html
 https://elalish.blogspot.com/2022/04/3d-interaction.html
 https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/SmoothControls.ts
*/
import { OrbitState } from './OrbitState'
import { getCommonRotCombined } from './commonCamera'

const { PI } = Math

export class OrbitControl extends OrbitState {
  el
  constructor(el, { position, target = [0, 0, 0], rx=PI/4, rz=PI/4, len=200, rxRatio = 0.01, rzRatio = 0.01, zoomRatio = 0.05 } = {}) {
    super({ position, target, rx, rz, len })

    this.el = el
    this.rxRatio = rxRatio
    this.rzRatio = rzRatio

    let isDown = false
    let isPan = false
    let isMoving = false
    let lx = 0
    let ly = 0

    const doListen = el=>{
      el.addEventListener('pointerdown', e => {
        lx = e.clientX
        ly = e.clientY
        isDown = true
        isPan = e.shiftKey || e.button === 1
      })
  
      el.addEventListener('pointerup', e => {
        isDown = false
        if (isMoving) el.releasePointerCapture(e.pointerId)
        isMoving = false
      })
  
      el.addEventListener('wheel', e => {
        const dir = Math.sign(e.deltaY)
        this.zoomBy(dir * zoomRatio)
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
  
        if (isPan) {
          const { len } = this
          const ratio = len / 500
          this.panBy(dx * ratio, dy * ratio)
        } else {
          this.rotateBy(dy * this.rxRatio, dx * this.rzRatio)
        }
        lx = e.clientX
        ly = e.clientY
      })
    }

    if(el instanceof Array) el.forEach(doListen)
    else doListen(el)

  }
  setCommonCamera(name) {
    this.setRotate(...getCommonRotCombined(name), [0, 0, 0])
  }
}
