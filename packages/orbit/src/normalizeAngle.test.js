import { expect, it } from 'vitest'

import { TAU } from './commonCamera.js'
import './normalizeAngle.js'
import { closerAngle } from './normalizeAngle.js'

const { PI } = Math

it('anlges', () => {
  expect(closerAngle(1, 1)).toEqual(1)
  expect(closerAngle(0, 0)).toEqual(0)

  expect(closerAngle(PI + 1, 0)).toEqual(PI + 1 - TAU)
  expect(closerAngle(0, PI + 1)).toEqual(TAU)
})
