import { TAU } from './commonCamera.js'

const { PI } = Math

/** Bring angle into range [0...2PI]
 * 
 * @param {Number} a - (Radians) angle that might need correcting
 * @returns 
 */
export const normalizeAngle = a => {
  while (a < 0) a += TAU
  while (a > TAU) a -= TAU
  return a
}

/**
 * calculate closer rotation angle a from angle b that is already normalized.
 * This is needed to make rotation animations to travel
 *
 * @param {Number} a - (Radians) angle that might need correcting
 * @param {Number} b - (Radians) already normalized reference angle
 * @returns
 */
export const closerAngle = (a, b) => {
  a = normalizeAngle(a)
  if (a - b > PI) return a - TAU
  if (b - a > PI) return a + TAU
  return a
}
