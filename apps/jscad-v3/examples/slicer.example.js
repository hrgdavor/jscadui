"use strict"
/**
 * Slice a geometry object into layers
 */

import { colorize } from '@jscad/modeling'
import { intersect } from '@jscad/modeling'
import { extrudeLinear, project } from '@jscad/modeling'
import { measureBoundingBox } from '@jscad/modeling'
import { cuboid, sphere } from '@jscad/modeling'
import { translate } from '@jscad/modeling'

export const getParameterDefinitions = () => [
  { name: 'thicness', type: 'slider', initial: 0.75, min: 0.1, max: 2, step: 0.1, caption: 'Layer thickness:' },
]

export const main = ({ thicness }) => {
  const obj = sphere({ radius: 6 })

  // calculate bounding box
  const bbox = measureBoundingBox(obj)

  // slice obj into an array of slices
  const out = []
  // from min z to max z
  for (let z = bbox[0][2]; z < bbox[1][2]; z += thicness) {
    // intersect with a cuboid
    const cutter = cuboid({
      size: [100, 100, thicness],
      center: [0, 0, z + thicness / 2]
    })
    const cut = intersect(obj, cutter)

    // project the cut into a 2D shape
    //if (cut.polygons.length === 0) continue // not needed in V3
    //const projected = project({}, cut)

    // extrude back to 3D
    //const extruded = extrudeLinear({ height: thicness }, projected)
    //const translated = translate([0, 0, z], extruded)
    out.push(cut)
  }

  return colorize([0.7, 0, 0.1], out)
}
