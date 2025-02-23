import * as vec3 from 'gl-matrix/esm/vec3.js'

import { calcBetween } from './calcBetween.js'
import { calcCamPos } from './calcCamPos.js'
import { camRotation } from './camRotation.js'
import { fromXZRotation } from './fromXZRotation.js'

const { PI } = Math

/** Orbit state can be created in 2 ways
 *
 * 1) {target, rx, rz, len}
 * 2) {target, position}
 *
 *
 */
export class OrbitState {
    target
    rx
    rz
    len
  /** Position is derived value and calculated if not provided. */
    position


  // onchange may be debounced, and when animating called at the end when camera stops at a position
  /**
   * @type {((state: OrbitState) => void) | undefined}
   */
  onchange
  // oninput may be debounced, and when animating called at the end when camera stops at a position
  /**
   * @type {((state: OrbitState) => void) | undefined}
   */
  oninput

/**
   * @param {import('../cameraState.js').OrbitStateInit} options 
   * @param {boolean} [clone]
   */
  constructor({ target, rx, rz, len, position }, clone = false) {
    this.target = target
    this.rx = rx
    this.rz = rz
    this.len = Math.abs(len) // not sure how, but I saw negative len

    if (clone) {
      this.position = position
    } else {
      if (position) camRotation(this, position, target)
      else this.position = calcCamPos(this)
    }
  }

/**
   * @param {[number,number,number]} position 
   * @param {[number,number,number]} target 
   * @param {boolean} [fire]
   */
  set(position, target, fire = true) {
    if (target) this.target = target
    if (position) this.position = position
    this.updateCalc()
    if (fire) this.fireChange()
  }

  updateCalc() {
    camRotation(this, this.position, this.target)
  }

/**
   * 
   * @param {import('../cameraState.js').CameraAnimationState} newState 
   * @param {number} percent 
   * @returns {import('../cameraState.js').CameraAnimationState} 
   */
  calcAnim(newState, percent) {
    const a1 = this.target
    const a2 = newState.target
    const target = []
    for (let i = 0; i < 3; i++) target[i] = calcBetween(a1[i], a2[i], percent)
    return {
      rx: calcBetween(this.rx, newState.rx, percent),
      rz: calcBetween(this.rz, newState.rz, percent),
      target,
    }
  }

/**
   * @param {number} rx 
   * @param {number} rz 
   * @param {[number,number,number]} target 
   * @param {boolean} [fire]
   */
  setRotate(rx = 0, rz = 0, target, fire = true) {
    if (target) this.target = target
    this.rx = rx
    this.rz = rz
    this.position = calcCamPos(this)
    if (fire) this.fireChange()
  }

  rotateBy(rx = 0, rz = 0) {
    this.rx += rx
    if (this.rx < 0) this.rx = 1.0e-10
    if (this.rx > PI) this.rx = PI
    this.rz += rz
    this.position = calcCamPos(this)
    this.fireChange()
  }

/**
   * @param {number} dx 
   * @param {number} dy 
   */
  panBy(dx, dy) {
    const { rx, rz } = this
    let pan = [dx, -dy, 0]
    pan = vec3.transformMat4([], pan, fromXZRotation(rx, rz))
    this.moveBy(pan)
  }

/** @param {[number,number,number]} vec  */
  moveBy(vec) {
    this.position = vec3.add([], this.position, vec)
    this.target = vec3.add([], this.target, vec)
    this.fireChange()
  }
  
  /**
   * @param {number} boxMin 
   * @param {number} boxMax 
   * @param {number} fov 
   * @param {number} aspect 
   * @param {number} fitOffset 
   */
  fit(boxMin, boxMax, fov, aspect, fitOffset = 1.2){
    const sizex = boxMax.x - boxMin.x
    const sizey = boxMax.y - boxMin.y
    const sizez = boxMax.z - boxMin.z
    const maxSize = Math.max( sizex, sizey, sizez );
    const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * fov / 360 ) );
    const fitWidthDistance = fitHeightDistance / aspect;
    const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );
    // look at center
    this.target = [boxMin.x + sizex/2, boxMin.y + sizey /2, boxMin.z + sizez/2]
    this.setLen(distance)
  }

  /** @param {number} len */
  setLen(len) {
    this.len = len
    this.position = calcCamPos(this)
    this.fireChange()
  }

  /** @param {number} amount */
  zoomBy(amount) {
    this.setLen(this.len * (1 + amount))
  }

  clone() {
    return new OrbitState(this, true)
  }

  toJSON() {
    const { position, ...rest } = this
    return rest
  }

  fireInput() {
    this.oninput?.(this)
  }

  fireChange() {
    this.onchange?.(this)
    this.fireInput()
  }
}
