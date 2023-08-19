/**
 * Nuts and Bolts
 * Demonstrates advanced extrusion using slices to generate screw threads.
 */

import * as jscad from '@jscad/modeling'
const { cylinder } = jscad.primitives
const { subtract, union } = jscad.booleans
const { colorize } = jscad.colors
const { extrudeFromSlices, slice } = jscad.extrusions
const { translate } = jscad.transforms

export const getParameterDefinitions = () => [
  { name: 'hexWidth', type: 'number', initial: 4, min: 0 },
  { name: 'hexHeight', type: 'number', initial: 3, min: 0 },
  { name: 'threadLength', type: 'number', initial: 12, min: 0 },
  { name: 'threadSize', type: 'number', initial: 2, min: 0 },
  { name: 'innerRadius', type: 'number', initial: 1.2, min: 0 },
  { name: 'outerRadius', type: 'number', initial: 2.4, min: 0 },
  { name: 'slicesPerRevolution', type: 'number', initial: 12, min: 8 },
  { name: 'segments', type: 'int', initial: 16, min: 3 },
]

export const main = (params) => {
  return [
    colorize([0.9, 0.6, 0.2], bolt(params)),
    colorize([0.4, 0.4, 0.4], translate([15, 0, 0], nut(params)))
  ]
}

// generate bolt by attaching threads to a hex head
const bolt = (params) => {
  return union(
    translate([0, 0, params.threadLength], hex(params)),
    threads(params)
  )
}

// generate nut by subtracting threads from a hex block
const nut = (params) => {
  return subtract(
    hex(params),
    threads({ ...params, threadLength: params.hexHeight })
  )
}

// generate hexagonal block
const hex = (params) => {
  const radius = params.hexWidth * 1.1547005 // hexagon outer radius
  const height = params.hexHeight
  return cylinder({ center: [0, 0, height / 2], height, radius, segments: 6 })
}

// generate a threaded shaft using extrudeFromSlices
const threads = (params) => {
  const { innerRadius, outerRadius, segments, threadLength } = params
  const revolutions = threadLength / params.threadSize
  const numberOfSlices = params.slicesPerRevolution * revolutions

  if (threadLength === 0) return []
  if (params.slicesPerRevolution < 8) throw new Error('slicesPerRevolution must be at least 8')
  if (!(params.threadSize > 0)) throw new Error('threadSize must be greater than zero')
  if (!(innerRadius <= outerRadius)) throw new Error('innerRadius must be less than outerRadius')

  return extrudeFromSlices({
    numberOfSlices,
    callback: (progress, index, base) => {
      // generate each slice manually
      const points = []
      for (let i = 0; i < segments; i++) {
        const pointAngle = Math.PI * 2 * i / segments
        const threadAngle = (2 * Math.PI * revolutions * progress) % (Math.PI * 2)

        // define the shape of the threads
        const phase = angleDiff(threadAngle, pointAngle) / Math.PI
        const radius = lerp(innerRadius, outerRadius, 1.4 * phase - 0.2)

        const x = radius * Math.cos(pointAngle)
        const y = radius * Math.sin(pointAngle)
        points.push([x, y, threadLength * progress])
      }
      return slice.fromPoints(points)
    }
  }, {})
}

// linear interpolation with bounding
const lerp = (a, b, t) => Math.max(a, Math.min(b, a + (b - a) * t))

const angleDiff = (angle1, angle2) => {
  const diff = Math.abs((angle1 - angle2) % (Math.PI * 2))
  return diff > Math.PI ? Math.PI * 2 - diff : diff
}

