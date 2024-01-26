/**
 * Demonstrates Hull and Hull Chain operations in 2D and 3D
 */

const jscad = require('@jscad/modeling')
const { colorize } = jscad.colors
const { circle, rectangle, sphere } = jscad.primitives
const { translate } = jscad.transforms
const { hull, hullChain } = jscad.hulls

function main() {
  const radius = 1.5
  const segments = 16

  const shapes2d = [
    circle({ center: [-5, 8], radius }),
    rectangle({ center: [0, 0], size: [6, 3] }),
    circle({ center: [5, 8], radius })
  ]
  const shapes3d = [
    sphere({ center: [-5, 18, 0], radius, segments }),
    sphere({ center: [-3, 30, 0], radius, segments }),
    sphere({ center: [3, 30, 0], radius, segments }),
    sphere({ center: [5, 18, 0], radius, segments })
  ]
  return [
    colorize([1.0, 0.0, 0.0], translate([-20, 0, 0], [shapes2d, shapes3d])),
    colorize([0.1, 0.7, 0.1], translate([0, 0, 0], [hullChain(shapes2d), hullChain(shapes3d)])),
    colorize([0.2, 0.2, 1.0], translate([20, 0, 0], [hull(shapes2d), hull(shapes3d)]))
  ]
}

module.exports = { main }
