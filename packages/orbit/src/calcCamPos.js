import * as vec3 from 'gl-matrix/esm/vec3.js'

import { OrbitState } from './OrbitState'
import { fromXZRotation } from './fromXZRotation'

/**
 *
 * @param {OrbitState} options
 * @returns
 */
export const calcCamPos = ({ target, len = 1, rz = 0, rx = 0 }) => {
  const out = vec3.transformMat4([], [0, 0, len], fromXZRotation(rx, rz))
  return target ? vec3.add([], out, target) : out
}
