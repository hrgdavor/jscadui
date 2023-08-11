import * as jscad from '@jscad/modeling'
const { colorize } = jscad.colors
const { intersect } = jscad.booleans
const { extrudeLinear, project } = jscad.extrusions
const { measureBoundingBox } = jscad.measurements
const { cuboid, sphere } = jscad.primitives
const { translate } = jscad.transforms

const thicness = 0.5

export const main = () => {
  const obj = sphere({ radius: 5 })

  // calculate bounding box
  const bbox = measureBoundingBox(obj)

  // slice obj into an array of slices
  const out = []
  // from min z to max z
  for (let z = bbox[0][2]; z < bbox[1][2]; z += thicness) {
    // intersect with a cuboid
    const cutter = cuboid({
      size: [100, 100, thicness],
      center: [0, 0, z]
    })
    const cut = intersect(obj, cutter)

    // project the cut into a 2D shape
    if (cut.polygons.length === 0) continue // not needed in V3
    const projected = project({}, cut)

    // extrude back to 3D
    const extruded = extrudeLinear({ height: thicness }, projected)
    const translated = translate([0, 0, z], extruded)
    out.push(translated)
  }

  return colorize([0.7, 0, 0.1], out)
}
