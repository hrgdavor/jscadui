/*
 if you do not see the shape, it couldbe that it is out os view, so zoom out to check
 if you have a single shape svg that is red, it is inverted
 just call .points.reverse() before extruding
*/

const jscad = require('@jscad/modeling')

/** Adds color to paths based on direction (that also determines how it is extruded later)
- green: solid (outer) shell
- red: hole
 */
function analyzeSvg(svg) {
  let colors = [
    [0, 1, 0],
    [1, 0, 0],
  ]
  // svg that is single path will be parsed as single geometry by jscad svg deserializer
  // svg with multiple paths will be returned as array by jacad svg deserializer
  if (!svg instanceof Array) svg = [svg]
  return svg.map((p, i) => {
    let solid = jscad.maths.utils.area(p.points) > 0
    if (!solid) {
      let p2 = { ...p, points: Array.from(p.points).reverse() }
      console.log('area', jscad.maths.utils.area(p.points), jscad.maths.utils.area(p2.points))
    }
    console.log('path ', i, 'is', solid ? 'solid(green)' : 'hole(red)', p)
    return jscad.colors.colorize(colors[solid ? 0 : 1], p)
  })
}

const main = ({
  //@jscad-params
  svg = [], // SVG to test {type:'file', hint:'0,2'}
  // Fix: index of shapes to invert
  toReverse = '', // To reverse (0,3,...) {type:'text'}
  // Preview
  extrude = false, // Extrude preview
  height = 2,// Extrusion height
  tx = 0, // trasnate X
  ty = 0, // translate Y
}) => {
  if (!svg instanceof Array){
    svg = [svg]
  }else{
    // clone to avoid messing with cache
    svg = Array.from(svg)
  }
  if (!svg?.length) return []
  // single index will be seen as numeric value and autoconverted by jscad
  if (typeof toReverse == 'number') toReverse += ''

  if(tx || ty){
    svg = svg.map(p=>jscad.transforms.translate([tx,ty,0],p))
  }


  if (toReverse.length) {
    // avoid reversing multiple times if user inputs same index more than once
    let reversed = {}
    toReverse.split(',').forEach(str => {
      let i = parseFloat(str)
      if (reversed[i]) return
      try {
        if (reversed[i]) return
        reversed[i] = true
        if (svg[i]?.points) {
          // clone to avoid messing with cache
          svg[i] = { ...svg[i], points: Array.from(svg[i].points).reverse() }
        }
        console.log('reversing', i, svg[i])
      } catch (e) {
        console.log('problem reversing ', str, e)
      }
    })
  }
  let analyzed = analyzeSvg(svg)
  if (extrude) {
    return jscad.extrusions.extrudeLinear({ height }, ...analyzed)
  } else {
    return analyzed
  }
}

module.exports = { main }
