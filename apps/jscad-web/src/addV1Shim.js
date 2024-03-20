export function addV1Shim(script) {
  if (script.includes('JS V1 SHIM HEADER')) return script

  return `const csg = require('@jscad/csg')
const { OpenJsCad, debug } = csg
const {circle, square, polygon, triangle} = csg.primitives2d
const {cube, sphere, cylinder, geodesicSphere, torus, polyhedron} = csg.primitives3d
const {union, difference, intersection} = csg.booleanOps
const {translate, center, scale, rotate, transform, mirror, expand, contract, minkowski, hull, chain_hull} = csg.transformations
const {extrudeInOrthonormalBasis, extrudeInPlane, extrude, linear_extrude, rotate_extrude, rotateExtrude, rectangular_extrude} = csg.extrusions
const {css2rgb, color, rgb2hsl, hsl2rgb, rgb2hsv, hsv2rgb, html2rgb, rgb2html} = csg.color
const {sin, cos, asin, acos, tan, atan, atan2, ceil, floor, abs, min, max, rands, log, lookup, pow, sign, sqrt, round} = csg.maths
const {vector_char, vector_text, vectorText} = csg.text
const { CSG, CAG } = csg.csg
function echo(){console.warn("echo() will be deprecated in the near future: please use console.log/warn/error instead");for(var e="",t=arguments,n=0;n<t.length;n++)n&&(e+=", "),e+=t[n];console.log(e)}
// lines above are a JS shim, to make .jscad scripts work as regular JS
// ------------------------------ JS V1 SHIM HEADER ---------------------------------------------------------------------------------------
  
${script}


// ---------------------------- JS V1 SHIM FOOTER -----------------------------------------------------------------------------------------
// this is footer of the JS shim, to export the main and getParameterDefinitions
module.exports = { main }
// some scripts will not have parameters, so we silently ignore the error line below would cause
try{ module.exports.getParameterDefinitions = getParameterDefinitions }catch(e){}
  `
}
