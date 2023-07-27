/**
 * JSCAD Primitives Demonstration
 * @category Creating Shapes
 * @skillLevel 1
 * @description Demonstrating the basics of a variety of 2D and 3D primitives
 * @tags circle, square, line, ellipse, polygon, cube, cylinder, sphere, shape, 2d, 3d
 * @authors Simon Clark, platypii
 * @license MIT
 */

const jscad = require('@jscad/modeling')
const { arc, circle, ellipse, line, polygon, rectangle, roundedRectangle, square, star } = jscad.primitives
const { cube, cuboid, cylinder, cylinderElliptic, ellipsoid, geodesicSphere, roundedCuboid, roundedCylinder, sphere, torus } = jscad.primitives
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  const allPrimitives = [
    arc({ center: [-1, -1], radius: 2, startAngle: 0, endAngle: (Math.PI / 2), makeTangent: false, segments: 32 }),
    line([[1, 1], [-1, -1], [1, -1]]),
    circle({ radius: 1.8, segments: 10 }),
    ellipse({ radius: [0.7, 2] }),
    polygon({ points: [[-3, -1], [3, -1], [3.5, 2], [1.5, 1], [0, 2], [-1.5, 1], [-3.5, 2]] }),
    rectangle({ size: [2, 3] }),
    roundedRectangle({ size: [4, 3], roundRadius: 0.7 }),
    square({ size: 3.5 }),
    star(),
    star({ vertices: 9, outerRadius: 2, innerRadius: 0.8, density: 2, startAngle: Math.PI / 18 }),

    cube(),
    cuboid({ size: [1, 2, 3] }),
    roundedCuboid({ size: [2, 3, 2], roundRadius: 0.4, segments: 32 }),
    roundedCuboid({ size: [1, 2, 3], roundRadius: 0.4, segments: 16 }),
    sphere({ radius: 2, segments: 16 }),
    geodesicSphere({ radius: 1.5, segments: 16 }),
    ellipsoid({ radius: [2, 1, 1.5], segments: 64, axes: [[1, 1, 0], [0, -1, 1], [-1, 0, 1]] }),
    cylinder({ radius: 1, height: 5 }),
    roundedCylinder({ radius: 1, height: 8, roundRadius: 0.8 }),
    cylinderElliptic({ height: 8, startRadius: [1, 1], endRadius: [0, 0] }),
    cylinderElliptic({ height: 8, startRadius: [1, 2], startAngle: 0, endRadius: [1, 2], endAngle: (Math.PI / 8), segments: 32 }),
    cylinder({ start: [0, 0, 0], end: [3, 3, 10], radius: 1 }),
    torus({ innerRadius: 1, outerRadius: 1.2 }),
    torus({ innerRadius: 1, outerRadius: 1.5, innerSegments: 4, outerSegments: 6, innerRotation: 0 }),
  ]

  return allPrimitives.map((primitive, index) => translate([(index % 6 - 1) * 6, Math.floor(index / 6 - 1) * 6, 0], primitive))
}

module.exports = { main }
