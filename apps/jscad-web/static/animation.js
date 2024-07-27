const jscad = require('@jscad/modeling')
const {ellipsoid} = jscad.primitives
const {rotate, translate} = jscad.transforms

const cached = translate([0,0,10],ellipsoid({radius:[10,10,20]}))
const {PI} = Math
// two test* inputs are used to see how layout for slider fits other inputs 
function main({// @jscad-params
  testTextInput='a',
  t=0.1,// Animation {type:"slider", min:0, max:4, step:0.016, fps:60, live:true, autostart:true}
  testNumInput=12,
}){
  return rotate([0,PI*t,0],cached)
}

module.exports = {main}
