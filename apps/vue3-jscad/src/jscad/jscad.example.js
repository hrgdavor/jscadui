import * as jscad from '@jscad/modeling'
const { intersect, subtract } = jscad.booleans
const { colorize } = jscad.colors
const { cube, sphere } = jscad.primitives

export const main = () => {
  const outer = subtract(
    cube({ size: 10 }),
    sphere({ radius: 6.8 })
  )
  const inner = intersect(
    sphere({ radius: 4 }),
    cube({ size: 7 })
  )
  return [
    colorize([0.65, 0.25, 0.8], outer),
    colorize([0.7, 0.7, 0.1], inner),
  ]
}
