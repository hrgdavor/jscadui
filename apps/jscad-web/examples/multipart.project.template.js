/**
 * Demonstrates a multipart project with part select input.
 * 
 * https://github.com/jscad/OpenJSCAD.org/discussions/1141
 */
const jscad = require('@jscad/modeling')
const { sphere, cube } = jscad.primitives
const { translate } = jscad.transforms

// all of the functions that generate parts will see the parameters without declaring them explicitly
const main = ({//@jscad-params
  size = 10, // {type: 'slider'}
  part,
}, getParams) => {

  // UTILITY placeholder for part generator functions
  const parts = {}

  // CTRL+R in vscode works just fine
  parts.Sample_Cube = () => cube({ size })

  parts.Sample_Sphere = () => {
    return sphere({ radius: size / 2 })
  }

  // parts can easily be combined
  parts.Assembly = () => [
    // jump to definition in vscode (ALT+click) works
    parts.Sample_Cube(),
    translate([size + 5, 0, 0], parts.Sample_Sphere()),
  ]

  /*********************** UTILITY below is just utility code. do not change **************** */

  // we were called by getParameterDefinitions so we need to provide list of parts
  if(getParams === true){
    const values = Object.keys(parts)
    return {values, initial: values[0]}
  }

  // make sure we always call one of the functions
  if(!parts[part]) part = Object.keys(parts)[0]
  return parts[part]()
}

const getParameterDefinitions = () => [
  { name: 'part', caption: 'Part', type: 'choice', ...main({}, true)}
]

module.exports = {main, getParameterDefinitions}
