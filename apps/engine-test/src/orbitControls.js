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

  setRotate(rx = 0, rz = 0) {
    this.calc.rx = rx
    this.calc.rz = rz
    this.position = calcCamPos({ ...this.calc, target: this.target })
    this.fireChange()
  }

  rotateBy(rx = 0, rz = 0) {
    this.calc.rx += rx
    if (this.calc.rx < 0) this.calc.rx = 1.0e-12
    if (this.calc.rx > PI) this.calc.rx = PI
    this.calc.rz += rz
    this.position = calcCamPos({ ...this.calc, target: this.target })
    this.fireChange()
  }

  panBy(py, pz) {
    const { rx, rz } = this.calc
    let pan = [0, py, -pz]
    pan = vec3.transformMat4([], pan, fromYZRotation(rx, rz))
    this.moveBy(pan)
  }

  moveBy(vec) {
    this.set((this.position = vec3.add([], this.position, vec)), (this.target = vec3.add([], this.target, vec)))
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
    let lx = 0
    let ly = 0

    el.addEventListener('pointerdown', e => {
      lx = e.clientX
      ly = e.clientY
      isDown = true
      isPan = e.shiftKey
      el.setPointerCapture(e.pointerId)
    })

    el.addEventListener('pointerup', e => {
      isDown = false
      el.releasePointerCapture(e.pointerId)
    })

    el.addEventListener('wheel', e => {
      const dir = Math.sign(e.deltaY)
      this.zoomBy(dir * zoomRatio)
    })

    el.addEventListener('pointermove', e => {
      if (!isDown) return

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
    this.setRotate(...getCommonRotCombined(name))
  }
}

export const getCommonRotCombined = name => {
  if (typeof name === 'string' && name.includes(',')) name = name.split(',')
  if (name instanceof Array && name.length === 1) name = name[0]

  console.log('name', name)
  if (name instanceof Array) {
    let offset = 0
    let rx = 0
    if (name[0] === 'top') {
      rx = PI / 4
      offset = 1
    } else if (name[0] === 'bottom') {
      rx = PI * 0.75
      offset = 1
    } else {
      rx = PId2
    }
    let rz = getCommonRotByName(name[offset])[1]
    if (name.length > offset + 1) {
      let other = getCommonRotByName(name[offset + 1])[1]
      if(other < rz){
        const tmp = other
        other = rz
        rz = tmp
      }
      if(rz === 0 && other >= PI*1.5) other = -PId2
      rz = rz + other 
      rz = rz/ 2
    }
    console.log('[rx,rz]', [rx/PI, rz/PI])
    return [rx, rz]
  } else {
    return getCommonRotByName(name)
  }
}

export const getCommonRotByName = name => {
  console.log(name, commonCameras[name][1]/PI)
  return commonCameras[name] || commonCameras.top
}

export const commonCameras = {
  top: [1e-12, 0],
  bottom: [PI, 0],
  front: [PId2, 0],
  right: [PId2, PId2],
  back: [PId2, PI],
  left: [PId2, PI*1.5],
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
  // my brain does not work, so I can not explain why it works with z>0 instead z<0
  // maybe one day I will realize, for now, who cares, it works
  if (z < 0) rx *= -1 // negative side is lost during sqr/sqrt hypot
  if (y > 0) rz *= -1 // negative side is lost during sqr/sqrt hypot

  return { rx, rz, lenXY, len, vec }
}

export const calcCamPos = ({ target, len = 1, rz = 0, rx = 0 }) => {
  let rot = mat4.fromXRotation([], rx)
  const rot2 = mat4.fromZRotation([], rz)
  const rot3 = mat4.multiply([], rot2, rot)
  const out = vec3.transformMat4([], [0, 0, len], rot3)
  return target ? vec3.add([], out, target) : out
}

export const fromYZRotation = (rx, rz) => {
  return mat4.multiply([], mat4.fromZRotation([], rz), mat4.fromYRotation([], rx))
}
