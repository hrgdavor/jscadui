"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swCadJs = require('swcad-js').init({ lib: jscad });

console.log(swJscad)
console.log(swjUi)
console.log(swCadJs)

const { intersect, subtract } = jscad.booleans
const { colorize } = jscad.colors
const { cube, sphere } = jscad.primitives

const {
  colors,
} = swjUi.ux

function main() {
  const outer = subtract(
    cube({ size: 10 }),
    sphere({ radius: 6.8 })
  )
  const inner = intersect(
    sphere({ radius: 4 }),
    cube({ size: 7 })
  )
  return [
    colorize(colors.lightGreen, outer),
    colorize(colors.orange, inner),
  ]
  // return [
  //   outer,
  //   inner,
  // ]
}

module.exports = { main }
