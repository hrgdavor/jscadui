/** Produce directly a 4x4 matrix theat does the rotation based on the rotation angles provided for X and Z
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rx - rotation on X axis
 * @param {Number} rz  - rotation on Z axis
 * @returns {mat4}
 */
export const fromXZRotation = (rx, rz) => {
  var zs = Math.sin(rz)
  var zc = Math.cos(rz)
  var xs = Math.sin(rx)
  var xc = Math.cos(rx)
  return [zc, zs, 0, 0, -zs * xc, zc * xc, xs, 0, -zs * -xs, zc * -xs, xc, 0, 0, 0, 0, 1]
  /*  var out = []
  out[0] = zc
  out[1] = zs
  out[2] = 0
  out[3] = 0
  out[4] = -zs * xc
  out[5] = zc * xc
  out[6] = xs
  out[7] = 0
  out[8] = -zs * -xs
  out[9] = zc * -xs
  out[10] = xc
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out*/
}
