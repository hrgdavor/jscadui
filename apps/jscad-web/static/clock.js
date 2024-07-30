const jscad = require('@jscad/modeling')
const {ellipsoid, cuboid} = jscad.primitives
const {rotate, translate} = jscad.transforms
const {colorize} = jscad.colors

const {PI} = Math
const r = 50
const handHour = colorize([0.3,0.3,0.3],translate([0,r*0.7/2,0],cuboid({size:[5,r*0.7,2]})))
const handMin = translate([0,r/2-5,0],cuboid({size:[3,r,1]}))
const handSec = colorize([0.6,0.6,0],translate([0,r/2,0],cuboid({size:[1,r,2.2]})))
const dials = []
for(let i=0; i<60; i++){
  let len = 2
  if(i%5 == 0) len = 5
  if(i%15 == 0) len = 10  
  dials.push( rotate([0,0,-PI*i/30],translate([0,r+len/2+1,0],cuboid({size:[2,len,2]}))) )
}
// two test* inputs are used to see how layout for slider fits other inputs 
function main({// @jscad-params
  t=0,// Animation {type:"slider", min:0, max:60, step:1, fps:1, live:true, autostart:true, loop:'restart'}
}){
  let date = new Date()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  return [
    rotate([0,0,-PI*(date.getHours()+((min+sec/60)/60))/6],handHour),
    rotate([0,0,-PI*(min+sec/60)/30],handMin),
    rotate([0,0,-PI*(sec)/30],handSec),
    ...dials,
  ]
}

module.exports = {main}
