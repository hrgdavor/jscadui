/**
 * Demonstrates the types of extrusions, and the variety of objects they can create.
 */

import * as jscad from '@jscad/modeling'
const { bezier } = jscad.curves
const { circle, line, polygon, rectangle, roundedRectangle, star } = jscad.primitives
const { extrudeLinear, extrudeRotate, extrudeFromSlices, slice } = jscad.extrusions
const { translate } = jscad.transforms
const { expand } = jscad.expansions
const { mat4 } = jscad.maths

export const main = () => {
  const shapes = []

  // rounded box
  const rect = roundedRectangle({ size: [6, 3], roundRadius: 1 })
  shapes.push(rect)
  shapes.push(extrudeLinear({}, rect))
  shapes.push(extrudeLinear({ height: 4 }, rect))

  // expanded lines
  const aLine = line([[-3, 0], [0, 0], [2, 2], [3, 4]])
  shapes.push(aLine)
  shapes.push(extrudeLinear({ height: 1 }, expand({ delta: 1, corners: 'edge' }, aLine)))
  shapes.push(extrudeLinear({ height: 1 }, expand({ delta: 1, corners: 'round', segments: 32 }, aLine)))

  // polygon twist
  const poly = polygon({ points: [[-2, -1], [2, -1], [2.5, 2], [1, 1], [0, 2], [-1, 1], [-2, 2]] })
  shapes.push(poly)
  shapes.push(extrudeLinear({ height: 4 }, poly))
  shapes.push(extrudeLinear({ height: 4, twistAngle: Math.PI / 4, twistSteps: 10 }, poly))

  // extrude rotate
  shapes.push(extrudeRotate({ angle: Math.PI, segments: 24 }, rectangle({ center: [3, 0] })))
  shapes.push(extrudeRotate({ angle: Math.PI, segments: 24 }, circle({ center: [3, 0] })))
  shapes.push(extrudeRotate({ angle: Math.PI, segments: 24 }, star({ center: [3, 0] })))

  // extrude bezier
  shapes.push(extrudeBezier(8))

  // Arrange primitives in a grid
  return shapes.map((primitive, index) => translate([(index % 3 - 1) * 10, Math.floor(index / 3 - 1) * 8, 0], primitive))
}

// Extrude a slice while varying the x and y dimensions using a bezier curve
const extrudeBezier = (height) => {
  const squareSlice = slice.fromPoints([[2, 2], [-2, 2], [-2, -2], [2, -2]])

  const xCurve = bezier.create([1, 1.8, 0.4, 1])
  const yCurve = bezier.create([1, 1.8, 0.5])

  return extrudeFromSlices({
    numberOfSlices: 20,
    capStart: true,
    capEnd: true,
    callback: function (progress, count, base) {
      let newslice = slice.transform(mat4.fromTranslation(mat4.create(), [0, 0, height * progress]), base)
      newslice = slice.transform(mat4.fromScaling(mat4.create(), [
        bezier.valueAt(progress, xCurve),
        bezier.valueAt(progress, yCurve),
        1
      ]), newslice)
      return newslice
    }
  }, squareSlice)
}
