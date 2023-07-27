/**
 * Hull and HullChain example
 * @category Creating Shapes
 * @skillLevel 8
 * @description Demonstrating the basics of Hulls in two dimensions
 * @tags hull, hullchain
 * @authors Simon Clark, platypii
 * @license MIT
 */

const jscad = require('@jscad/modeling')
const { circle, cuboid, rectangle, sphere } = jscad.primitives
const { translate } = jscad.transforms
const { hull, hullChain } = jscad.hulls

const getParameterDefinitions = () => [
  { name: 'doHull', type: 'radio', caption: 'Show:', values: ['shapes', 'hull', 'chain'], captions: ['Original Shapes', 'Hull', 'Hull Chain'], initial: 'shapes' }
]

const main = (params) => {
  const shapes2d = [
    translate([15, 0, 0], circle({ radius: 2, segments: 16 })),
    translate([8, 6, 0], circle({ radius: 3.5, segments: 16 })),
    translate([0, -4, 0], circle({ radius: 5, segments: 16 })),
    translate([-15, 5, 0], rectangle({ size: [5, 17] }))
  ]
  const shapes3d = [
    translate([10, 20, 5], sphere({ radius: 2, segments: 16 })),
    translate([-3, 20, 0], sphere({ radius: 3.5, segments: 16 })),
    translate([0, 30, -3], sphere({ radius: 5, segments: 16 })),
    translate([5, 25, -10], cuboid({ size: [15, 17, 2] }))
  ]
  if (params.doHull === 'hull') {
    return [hull(shapes2d), hull(shapes3d)]
  } else if (params.doHull === 'chain') {
    return [hullChain(shapes2d), hullChain(shapes3d)]
  } else {
    return [shapes2d, shapes3d]
  }
}

module.exports = { main, getParameterDefinitions }
