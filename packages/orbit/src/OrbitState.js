import * as vec3 from 'gl-matrix/esm/vec3.js'

import { calcCamPos } from './calcCamPos.js'
import { camRotation } from './camRotation.js'
import { fromXZRotation } from './fromXZRotation.js'

const { PI } = Math

/** Orbit state can be created in 2 ways
 *
 */
export class OrbitState {
  target
  rx
  rz
  len
  /** Position is derived value and calculated if not provided. */
  position
  constructor({ target, rx, rz, len, position }, clone=false){
    this.target = target
    this.rx = rx
    this.rz = rz
    this.len = len

    if (clone) {
      this.position = position
    } else {
      if(position)
        camRotation(this, position, target)
      else
        this.position = calcCamPos(this)
    }
  }

  set(position, target, fire = true) {
    if (target) this.target = target
    if (position) this.position = position
    this.updateCalc()
    if (fire) this.fireChange()
  }

  updateCalc() {
    camRotation(this, this.position, this.target)
  }

  setRotate(rx = 0, rz = 0, target) {
    if (target) this.target = target
    this.rx = rx
    this.rz = rz
    this.position = calcCamPos(this)
    this.fireChange()
  }

  rotateBy(rx = 0, rz = 0) {
    this.rx += rx
    if (this.rx < 0) this.rx = 1.0e-10
    if (this.rx > PI) this.rx = PI
    this.rz += rz
    this.position = calcCamPos(this)
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
    this.len *= 1 + amount
    this.position = calcCamPos(this)
    this.fireChange()
  }

  clone() {
    return new OrbitState(this, true)
  }
  
  toJSON(){
    const {position, ...rest} = this
    return rest
  }

  fireChange() {
    this.onchange?.(this)
  }
}
