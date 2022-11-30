import * as vec3 from 'gl-matrix/esm/vec3.js'

const { hypot, acos } = Math

export const camRotation = (out,position, target) => {
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
  out.target = target
  out.position = position
  out.rx = rx
  out.rz = rz
  out.len = len
  return out
}
