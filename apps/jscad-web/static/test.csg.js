const csg = require('@jscad/csg')
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

function main() {
  return cube({size:[20,20,20],center:true})

  return difference(
    union(
      cube({size:[20,20,20],center:true}),
      cube({size:[50,8,8],center:true}).translate([0,0,14]),
      cube({size:[20,8.5,8.5],center:true}).rotateX(45).translate([0,4,10]),
      cube({size:[20,8.5,8.5],center:true}).rotateX(45).translate([0,-4,10]),
      // cylinder({start: [-10,5,10], end: [10,5,10], r: 5, fn: 20}),
      // cylinder({start: [-10,-5,10], end: [10,-5,10], r: 5, fn: 20}),
      cube({size:[10,8,20],center:true}).rotateY(20).translate([9,0,5]),
      cube({size:[10,8,20],center:true}).rotateY(-20).translate([-9,0,5])
     ).expand(2,20),
      cube({size:[20,20,40],center:true}).translate([0,0,-10])
    );
}

// ---------------------------- JS V1 SHIM FOOTER -----------------------------------------------------------------------------------------
// this is footer of the JS shim, to export the main and getParameterDefinitions
module.exports = { main }
// some scripts will not have parameters, so we silently ignore the error line below would cause
try{ module.exports.getParameterDefinitions = getParameterDefinitions }catch(e){}
