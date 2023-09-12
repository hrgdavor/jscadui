/**
 * This is OrbitControl starting as a simpler and more primitive than others, meant to support multiple webgl engines.
 *
 * Some resources considered while in making (aside from looking a bit onto other OrbitControl implementations):
 * https://webglfundamentals.org/webgl/lessons/webgl-3d-camera.html
 * https://elalish.blogspot.com/2022/04/3d-interaction.html
 * https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/SmoothControls.ts
 */
import { OrbitState } from './OrbitState'
import { getCommonRotCombined } from './commonCamera'
import { closerAngle } from './normalizeAngle'

const { PI } = Math

export class OrbitControl extends OrbitState {
  // onchange may be debounced, and when animating called at the end when camera stops at a position
  onchange
  // oninput may be debounced, and when animating called at the end when camera stops at a position
  oninput
  el
  animDuration = 200

  /**
   * @param {Element|Array<Element>} el
   * @param {Object} options
   */
  constructor(el, { position, target = [0, 0, 0], rx=PI/4, rz=PI/4, len=200, panRatio = 800, rxRatio = 0.01, rzRatio = 0.01, zoomRatio = 0.05 } = {}) {
    super({ position, target, rx, rz, len })

    this.el = el
    this.rxRatio = rxRatio
    this.rzRatio = rzRatio

    let isDown = false
    let doubleDown = false
    let isPan = false
    let isZoom = false
    let isMoving = false
    let theButton = 0
    let lx = 0
    let ly = 0

    // Pinch to zoom gesture
    const pointers = {}
    let lastPinch

    // Calculate distance and midpoint of two pointers
    const calculatePinch = () => {
      const ids = Object.keys(pointers)
      const [x1, y1] = pointers[ids[0]]
      const [x2, y2] = pointers[ids[1]]
      const dx = x2 - x1
      const dy = y2 - y1
      return {
        distance: Math.sqrt(dx * dx + dy * dy),
        midpoint: [(x1 + x2) / 2, (y1 + y2) / 2],
      }
    }

    const doListen = el => {
      el.addEventListener('pointerdown', e => {
        theButton = e.button
        lx = e.clientX
        ly = e.clientY
        isDown = true
        pointers[e.pointerId] = [e.clientX, e.clientY]
        if (Object.keys(pointers).length === 2) doubleDown = true
      })

      el.addEventListener('pointerup', e => {
        isDown = false
        if (isMoving) el.releasePointerCapture(e.pointerId)
        isMoving = false
        delete pointers[e.pointerId]
        if (Object.keys(pointers).length < 2) {
          doubleDown = false
          lastPinch = undefined
        }
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
        pointers[e.pointerId] = [e.clientX, e.clientY]

        if (isPan) {
          const ratio = this.len / panRatio
          this.panBy(dx * ratio, dy * ratio)
        } else if (isZoom) {
          this.zoomBy((dx + dy) / 200)
        } else if (doubleDown) {
          // Pinch to zoom and pan
          const newPinch = calculatePinch()
          if (lastPinch) {
            // Pan
            const dx = lastPinch.midpoint[0] - newPinch.midpoint[0]
            const dy = lastPinch.midpoint[1] - newPinch.midpoint[1]
            const ratio = this.len / panRatio
            this.panBy(dx * ratio, dy * ratio)
            // Zoom
            const pinchFactor = newPinch.distance / lastPinch.distance
            this.zoomBy(1 - pinchFactor)
          }
          lastPinch = newPinch
        } else {
          this.rotateBy(dy * this.rxRatio, dx * this.rzRatio)
        }
        lx = e.clientX
        ly = e.clientY
      })
    }

    if (el instanceof Array) el.forEach(doListen)
    else doListen(el)
  }

  doAnim() {
    let percent = Math.min(1, (Date.now() - this.startTime) / this.animDuration)
    const newState = this.stateStart.calcAnim(this.stateEnd, percent)
    ctrl.setRotate(newState.rx, newState.rz, newState.target, false)
    // update orbit control so it can continue working during or after anim
    if (percent < 1) {
      this.animTimer = requestAnimationFrame(() => this.doAnim())
      this.fireInput()
    } else {
      this.stopAnim()
    }
  }

  stopAnim() {
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
    this.animTimer = requestAnimationFrame(() => this.doAnim())
  }

  animateToCommonCamera(cam) {
    const [rx, rz] = getCommonRotCombined(cam)
    ctrl.animateToCamera({ rx, rz, target: [0, 0, 0] })
  }

  setCommonCamera(name) {
    this.setRotate(...getCommonRotCombined(name), [0, 0, 0])
  }
}
