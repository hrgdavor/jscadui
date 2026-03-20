/**
 * SVG Import Demonstration
 * @category Imports
 * @skillLevel 1
 * @description Importing SVG files. Drag the whole SVGImport folder into JSCAD
 * @tags svg, import
 * @authors Simon Clark
 * @licence MIT License
 */

import { translate } from '@jscad/modeling'
import { extrudeLinear } from '@jscad/modeling'
import { polygon } from '@jscad/modeling'

// Load the SVG files using require
const panda = require('./babypanda2.svg')

export const main = () => {
  // SVG shapes are imported as an array of paths. We want to convert those to polygons to extrude.
  const poly = panda.map((shape) => polygon({ points: shape.points }))
  return translate([-40, 50, 0], extrudeLinear({ height: 2 }, poly))
}
