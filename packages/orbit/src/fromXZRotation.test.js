import * as mat4 from 'gl-matrix/esm/mat4.js'
import { describe, expect, it } from 'vitest'

import { fromXZRotation } from './fromXZRotation'

/** use gl-matrix to produce a 4x4 matrix theat does the rotation based on the rotation angles provided for X and Z.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rx - rotation on X axis
 * @param {Number} rz  - rotation on Z axis
 * @returns {mat4}
 */
const fromXZRotationReference = (rx, rz) => {
  return mat4.multiply([], mat4.fromZRotation([], rz), mat4.fromXRotation([], rx))
}

// change -0 to 0 so test deos not fail when one gives 0 and other -0
const fixZero = a => a.map(n => (n === -0 ? 0 : n))

//  Use fromXZRotationReference to test the fromXZRotation that does the same in sigle pass without creating 2 matrices and multiplaying it.
const doTestAngle = (rx, rz) =>
  expect(fixZero(fromXZRotation(rx, rz))).toEqual(fixZero(fromXZRotationReference(rx, rz)))

it('suite', () => {
  doTestAngle(1, 1)
  doTestAngle(0, 0)
  doTestAngle(Math.PI, 0)
  doTestAngle(Math.PI, Math.PI)
  doTestAngle(Math.PI / 4, Math.PI / 4)
})
