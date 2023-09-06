/**  
 This is OrbitContolr starting as a simpler and more primitive than others, meant to support multiple webgl engines.

 some resources considered while in making (aside from looking a bit onto other OrbitControl implementations)
 https://webglfundamentals.org/webgl/lessons/webgl-3d-camera.html
 https://elalish.blogspot.com/2022/04/3d-interaction.html
 https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/SmoothControls.ts
*/
import { OrbitState } from './OrbitState'
import { getCommonRotCombined } from './commonCamera'
import { closerAngle } from './normalizeAngle'

const { PI } = Math

export class OrbitControl extends OrbitState {
  // onchange may be debounced, and when animating called at the end when camera stops et a position
  onchange
  // oninput may be debounced, and when animating called at the end when camera stops et a position
  oninput
  el
  animDuration = 200

  /**
   * 
   * @param {Element|Array<Element>} el 
   * @param {Object} options 
   */
  constructor(el, { position, target = [0, 0, 0], rx=PI/4, rz=PI/4, len=200, rxRatio = 0.01, rzRatio = 0.01, zoomRatio = 0.05 } = {}) {
    super({ position, target, rx, rz, len })

    this.el = el
    this.rxRatio = rxRatio
    this.rzRatio = rzRatio

    let isDown = false
    let isPan = false
    let isZoom = false
    let isMoving = false
    let theButton = 0
    let lx = 0
    let ly = 0

    const doListen = el=>{
      el.addEventListener('pointerdown', e => {
        theButton = e.button
        lx = e.clientX
        ly = e.clientY
        isDown = true
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
  
        isPan = theButton === 1 || (theButton === 0 && e.shiftKey)
        isZoom = e.ctrlKey
        let dx = lx - e.clientX
        let dy = ly - e.clientY
  
        if (isPan) {
          const { len } = this
          const ratio = len / 1600
          this.panBy(dx * ratio, dy * ratio)
        } else if(isZoom){
          this.zoomBy((dx+dy)/200)
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

  doAnim(){
    let percent = Math.min(1, (Date.now() - this.startTime) / this.animDuration)
    const newState = this.stateStart.calcAnim(this.stateEnd, percent)
    ctrl.setRotate(newState.rx, newState.rz, newState.target, false)
    // update orbit control so it can continue working during or after anim
    if (percent < 1){
      this.animTimer = requestAnimationFrame(()=>this.doAnim())
      this.fireInput()
    }else{
      this.stopAnim()
    }
  }
  
  stopAnim(){
    cancelAnimationFrame(this.animTimer)
    this.animTimer = null
    this.startTime = 0
    this.fireChange()
  }
  
  animateToCamera({ target, rx, rz }) {
    // normalize angle to avoid crazy spinning if scene was rotated a lot
    // rx does not need this fix as it only operates inside one half of a rotation
    this.rz = closerAngle(this.rz, rz) 

    this.startTime = Date.now()
    this.stateStart = new OrbitState(ctrl, true)
    this.stateEnd = new OrbitState({ target: target || ctrl.target, rx, rz, len: ctrl.len })
    this.animTimer = requestAnimationFrame(()=>this.doAnim())
  }

  animateToCommonCamera(cam) {
    const [rx, rz] = getCommonRotCombined(cam)
    ctrl.animateToCamera({ rx, rz, target: [0, 0, 0] })  
  }
  
  setCommonCamera(name) {
    this.setRotate(...getCommonRotCombined(name), [0, 0, 0])
  }
}
