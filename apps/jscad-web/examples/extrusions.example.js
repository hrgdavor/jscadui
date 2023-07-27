/**
 * Basic Extrude Functions
 * @category Creating Shapes
 * @skillLevel 3
 * @description Demonstrating the basic types of extrusions, and the variety of objects they can create.
 * @tags extrude, linear, extrudelinear, extruderotate, bezier
 * @authors Rene K. Mueller, Moissette Mark, Simon Clark, platypii
 * @license MIT
 */

const jscad = require('@jscad/modeling')
const { bezier } = jscad.curves
const { line, polygon, star } = jscad.primitives
const { extrudeLinear, extrudeRotate, extrudeFromSlices, slice } = jscad.extrusions
const { translate } = jscad.transforms
const { expand } = jscad.expansions
const { mat4 } = jscad.maths

const main = () => {
  const shapes = []

  const aLine = line([[0, 0], [0, 5], [2, 8], [5, 9]])
  shapes.push(translate([-10, 0, 0], aLine))
  const pathSquare = extrudeLinear({ height: 1 }, expand({ delta: 1, corners: 'edge' }, aLine))
  shapes.push(translate([0, 0, 0], pathSquare))
  const pathRound = extrudeLinear({ height: 1 }, expand({ delta: 1, corners: 'round', segments: 32 }, aLine))
  shapes.push(translate([10, 0, 0], pathRound))

  const poly = polygon({ points: [[-1, -1], [3, -1], [3.5, 2], [2, 1], [1, 2], [0, 1], [-1, 2]] })
  shapes.push(translate([-10, 16, 0], poly))
  const polyLinear = extrudeLinear({ height: 5 }, poly)
  shapes.push(translate([0, 16, 0], polyLinear))
  const polyTwist = extrudeLinear({ height: 5, twistAngle: Math.PI / 4, twistSteps: 10 }, poly)
  shapes.push(translate([10, 16, 0], polyTwist))

  const starPoly = translate([3, 0, 0], star())
  shapes.push(translate([-10, 28, 0], starPoly))
  const extrudedStar = extrudeRotate({
    segments: 32,
    startAngle: 0,
    angle: (Math.PI * 0.75),
    overflow: 'cap'
  }, starPoly)
  shapes.push(translate([0, 28, 0], extrudedStar))

  shapes.push(translate([10, 28, 0], extrudeBezier(10)))

  return shapes
}

// Extrude a slice while varying the x and y dimensions using a bezier curve
const extrudeBezier = (height) => {
  const squareSlice = slice.fromPoints([[2, 2], [-2, 2], [-2, -2], [2, -2]])

  const xCurve = bezier.create([1, 2, 0.4, 1])
  const yCurve = bezier.create([1, 2, 0.5])

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

module.exports = { main }
