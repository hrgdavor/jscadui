/**
 * Parametric design that lets you select an example to run
 */

const primitives3d = require('./core/primitives/primitives3D.js')
const basicColors = require('./core/colors/basicColors.js')
const basicBooleans = require('./core/booleans/basicBooleans.js')
const nutsAndBolts = require('./core/extrusions/nutsAndBolts.js')

const examples = {
  primitives3d: { main: primitives3d.main, caption: 'Primitives 3D' },
  basicColors: { main: basicColors.main, caption: 'Basic Colors' },
  basicBooleans: { main: basicBooleans.main, caption: 'Basic Booleans' },
  nutsAndBolts: { main: nutsAndBolts.main, caption: 'Nuts and Bolts' },
}

const getParameterDefinitions = () => [
  {
    name: 'example',
    type: 'choice',
    caption: 'Examples:',
    values: Object.entries(examples).map(([k, v]) => k),
    captions: Object.entries(examples).map(([k, v]) => v.caption),
    initial: 'basicColors',
  },
]

const main = (params) => {
  return examples[params.example].main()
}

module.exports = { main, getParameterDefinitions }
