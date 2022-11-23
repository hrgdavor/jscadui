/** Based on orbitControls from @openjscad/regl-renderer 
 and https://webglfundamentals.org/webgl/lessons/webgl-3d-camera.html
 and
   https://elalish.blogspot.com/2022/04/3d-interaction.html
   https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/SmoothControls.ts
*/
import * as mat4 from 'gl-matrix/esm/mat4.js'
import * as vec3 from 'gl-matrix/esm/vec3.js'

const { hypot, acos, asin, PI, cos, sin } = Math
const PId2 = PI / 2
const TAU = PI * 2

export class OrbitCamera {
  position = [180, -180, 220]
  target = [0, 0, 0]
}

export class OrbitState {
  position
  target
  calc
  constructor(position = [180, -180, 220], target = [0, 0, 0], ...args) {
    if (args.length) {
      // clone
      this.position = position
      this.target = target
      this.calc = args[0]
    } else {
      this.set(position, target, false)
    }
  }

  set(position, target, fire = true) {
    if (target) this.target = target
    if (position) this.position = position
    this.updateCalc()
    if (fire) this.fireChange()
  }

  updateCalc() {
    this.calc = camRotation({ target: this.target, position: this.position })
  }

  setRotate(rx = 0, rz = 0, target) {
    if(target) this.target = target
    this.calc.rx = rx
    this.calc.rz = rz
    this.position = calcCamPos({ ...this.calc, target: this.target })
    this.fireChange()
  }

  rotateBy(rx = 0, rz = 0) {
    this.calc.rx += rx
    if (this.calc.rx < 0) this.calc.rx = 1.0e-10
    if (this.calc.rx > PI) this.calc.rx = PI
    this.calc.rz += rz
    this.position = calcCamPos({ ...this.calc, target: this.target })
    this.fireChange()
  }

  panBy(dx, dy) {
    const { rx, rz } = this.calc
    let pan = [dx, -dy, 0]
    pan = vec3.transformMat4([], pan, fromXZRotation(rx, rz))
    this.moveBy(pan)
  }

  moveBy(vec) {
    this.position = vec3.add([], this.position, vec)
    this.target = vec3.add([], this.target, vec)
    this.fireChange()
  }

  zoomBy(amount) {
    this.calc.len *= 1 + amount
    this.position = calcCamPos({ ...this.calc, target: this.target })
    this.fireChange()
  }

  clone() {
    const calc = this.calc
    return new OrbitState([...this.position], [...this.target], { ...calc, vec: [...calc.vec] })
  }

  fireChange() {
    this.onchange?.({ position: [...this.position], target: [...this.target], ...this.calc })
  }
}

export class OrbitControl extends OrbitState {
  el
  constructor(
    el,
    { position = [180, -180, 220], target = [0, 0, 0], rxRatio = 0.01, rzRatio = 0.01, zoomRatio = 0.05 } = {},
  ) {
    super(position, target)

    this.el = el
    this.rxRatio = rxRatio
    this.rzRatio = rzRatio

    let isDown = false
    let isPan = false
    let isMoving = false
    let lx = 0
    let ly = 0
    
    el.addEventListener('pointerdown', e => {
      lx = e.clientX
      ly = e.clientY
      isDown = true
      isPan = e.shiftKey
    })
    
    el.addEventListener('pointerup', e => {
      isDown = false
      if(isMoving) el.releasePointerCapture(e.pointerId)
      isMoving = false
    })

    el.addEventListener('wheel', e => {
      const dir = Math.sign(e.deltaY)
      this.zoomBy(dir * zoomRatio)
    })

    el.addEventListener('pointermove', e => {
      if (!isDown) return

      if(!isMoving){
        // pointer capture inside pointerdown caused clicking to not work
        // it is better to capture pointer only on pointer down + first movement
        el.setPointerCapture(e.pointerId)
        isMoving = true
      }

      let dx = lx - e.clientX
      let dy = ly - e.clientY

      if (isPan) {
        const { len } = this.calc
        const ratio = len / 500
        this.panBy(dx * ratio, dy * ratio)
      } else {
        this.rotateBy(dy * this.rxRatio, dx * this.rzRatio)
      }
      lx = e.clientX
      ly = e.clientY
    })
  }
  setCommonCamera(name) {
    this.setRotate(...getCommonRotCombined(name), [0,0,0])
  }
}

export const getCommonRotCombined = name => {
  name = name.toUpperCase()
  let rx = PId2
  let rz = 0
  let rz1
  let rz2
  let topOrBottom
  for (let i = 0; i < name.length; i++) {
    const ch = name[i]
    const rot = getCommonRotByName(ch)
    if (ch === 'T' || ch === 'B') {
      rx = rot[0]
      topOrBottom = ch
    } else {
      if (rz1 === undefined) rz1 = rot[1]
      else rz2 = rot[1]
    }
  }
  if (rz1 !== undefined) {
    if (topOrBottom) rx = topOrBottom === 'T' ? PI / 4 : PI * 0.75
    if (rz2 !== undefined) {
      if (rz2 < rz1) {
        const tmp = rz2
        rz2 = rz1
        rz1 = tmp
      }
      // edge case fix so my fancy math works
      if (rz1 === 0 && rz2 >= PI * 1.5) rz2 = -PId2
      rz = (rz1 + rz2) / 2
    } else {
      rz = rz1
    }
  }
  return [rx, rz]
}

export const getCommonRotByName = name => {
  return commonCameras[name] || commonCameras.top
}

export const commonCameras = {
  T: [1e-10, 0],
  B: [PI, 0],
  S: [PId2, 0],
  N: [PId2, PI],
  W: [PId2, PI * 1.5],
  E: [PId2, PId2],
}

/**
 *
 * @param {OrbitCamera} cam
 */

export const camRotation = ({ position, target }) => {
  let vec = vec3.subtract([], position, target)
  const [x, y, z] = vec
  let len = Math.hypot(x, y, z)
  let lenXY = hypot(x, y)
  let rz = lenXY == 0 ? 0 : acos(x / lenXY)
  let rx = lenXY == 0 ? 0 : acos(lenXY / len)
  if (z < 0) rx *= -1 // negative side is lost during sqr/sqrt hypot
  // my brain does not work right now, so I can not explain why it works with y>0 instead y<0
  // maybe one day I will realize, for now, who cares, it works
  if (y > 0) rz *= -1 // negative side is lost during sqr/sqrt hypot

  return { rx, rz, lenXY, len, vec }
}

export const calcCamPos = ({ target, len = 1, rz = 0, rx = 0 }) => {
  // let rot = mat4.fromXRotation([], rx)
  // const rot2 = mat4.fromZRotation([], rz)
  // const rot3 = mat4.multiply([], rot2, rot)
  const out = vec3.transformMat4([], [0, 0, len], fromXZRotation(rx, rz))
  return target ? vec3.add([], out, target) : out
}

export const fromXZRotation = (rx, rz) => {
  return mat4.multiply([], mat4.fromZRotation([], rz), mat4.fromXRotation([], rx))
}
