import * as jscad from '@jscad/modeling'
const { subtract } = jscad.booleans
const { translate } = jscad.transforms
const { colorize } = jscad.colors
const { cube, sphere } = jscad.primitives

export const defaultModel = () => {
  const modelRadius = 30
  let model = [
    subtract(
      sphere({ radius: modelRadius, segments: 16 }),
      translate([modelRadius, 0, modelRadius], sphere({ radius: modelRadius, segments: 16 })),
    ),
  ]
  
  model.push(colorize([0.7, 0, 0], translate([60, 0, 0], sphere({ radius: 10 }))))
  model.push(colorize([0, 0.7, 0], translate([0, 60, 0], sphere({ radius: 10 }))))
  model.push(colorize([0, 0, 0.7], translate([0, 0, 60], sphere({ radius: 10 }))))
  model.push(colorize([1, 0.7, 0, 0.5], translate([-20, -20, 0], cube({ size: 30 }))))

  return model
}
