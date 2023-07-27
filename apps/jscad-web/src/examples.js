import cube from '../examples/jscad.example.js'
import prim from '../examples/primitives.example.js'
import gear from '../examples/gear.example.js'
import nuts from '../examples/nuts-and-bolts.example.js'
import text from '../examples/text.example.js'
import balloons from '../examples/balloons.example.js'
import extrusions from '../examples/extrusions.example.js'
import hulls from '../examples/hulls.example.js'

export const examples = [
  { name: 'JSCAD Logo', source: cube },
  { name: 'Primitives', source: prim },
  { name: 'Extrusions', source: extrusions },
  { name: 'Hulls', source: hulls },
  { name: 'Parametric Gear', source: gear },
  { name: 'Nuts and Bolts', source: nuts },
  { name: 'Text Shapes', source: text },
  { name: 'Balloons', source: balloons },
]
