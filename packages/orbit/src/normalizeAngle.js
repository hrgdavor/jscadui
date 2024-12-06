const { PI } = Math
const TAU = PI * 2

/**
 * Bring angle into range [0...TAU]
 * @param {number} a - (Radians) angle that might need correcting
 * @returns {number}
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
 * @param {number} a - (Radians) angle that might need correcting
 * @param {number} b - (Radians) already normalized reference angle
 * @returns
 */
export const closerAngle = (a, b) => {
  a = normalizeAngle(a)
  if (a - b > PI) return a - TAU
  if (b - a > PI) return a + TAU
  return a
}
