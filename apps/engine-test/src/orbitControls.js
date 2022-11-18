/** Based on orbitControls from @openjscad/regl-renderer 
 and https://webglfundamentals.org/webgl/lessons/webgl-3d-camera.html
 and
   https://elalish.blogspot.com/2022/04/3d-interaction.html
   https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/SmoothControls.ts
*/
import * as mat4 from 'gl-matrix/esm/mat4.js'
import * as vec3 from 'gl-matrix/esm/vec3.js'

const { hypot, acos, asin, PI } = Math

export class OrbitCamera {
  position = [180, -180, 220]
  target = [0, 0, 0]
}

/**
 *
 * @param {OrbitCamera} cam
 */

export const camRotation = ({ position, target }) => {
  let vec = vec3.subtract([], position, target)
  const [x, y, z] = vec
  let len = vec3.length(vec)
  let lenXY = hypot(x, y)
  let rz = lenXY == 0 ? 0 : acos(x / lenXY)
  let ry = lenXY == 0 ? 0 : acos(lenXY / len)
  // my brain does not work, so I can not explain why it works with z>0 instead z<0
  // maybe one day I will realize, for now, who cares, it works
  if (z > 0) ry *= -1 // negative side is lost during sqr/sqrt hypot
  if (y < 0) rz *= -1 // negative side is lost during sqr/sqrt hypot

  return { ry, rz, lenXY, len, vec }
}

export const calcCamPos = ({target, len, rz, ry})=>{
  let rot = mat4.fromYRotation([], ry)
  const rot2 = mat4.fromZRotation([], rz)
  const rot3 = mat4.multiply([], rot2, rot)
  const out = vec3.transformMat4([], [len, 0, 0], rot3)
  return target ? vec3.add([],out,target) : out
}

export const testCamRotation = ({ position, target }) => {
  const { ry, rz, lenXY, len } = camRotation({ position, target })
  console.log('len', len)
  console.log('xyLen', lenXY)
  console.log('rotZ', (rz * 180) / PI)
  console.log('rotY', (ry * 180) / PI)
  let rot = mat4.fromYRotation([], ry)
  const rot2 = mat4.fromZRotation([], rz)
  const rot3 = mat4.multiply([], rot2, rot)
  console.log('rot', rz)
  const test = vec3.transformMat4([], [len, 0, 0], rot3)
  console.log('test', test)
  return { ry, rz, lenXY, len }
}
