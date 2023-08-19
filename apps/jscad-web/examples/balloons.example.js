/**
 * Birthday Balloons with interactive parameters
 * @authors Z3 Dev, Simon Clark
 */

import * as jscad from '@jscad/modeling'
const { subtract, union } = jscad.booleans
const { colorize, hexToRgb } = jscad.colors
const { extrudeFromSlices, extrudeLinear, slice } = jscad.extrusions
const { geom2 } = jscad.geometries
const { hullChain } = jscad.hulls
const { mat4 } = jscad.maths
const { measureBoundingBox } = jscad.measurements
const { circle, ellipsoid } = jscad.primitives
const { vectorText } = jscad.text
const { translate, scale, rotateX, center } = jscad.transforms

export const getParameterDefinitions = () => [
  { name: 'balloon', type: 'group', caption: 'Balloons' },
  { name: 'isBig', type: 'checkbox', checked: true, initial: '20', caption: 'Big?' },
  { name: 'color', type: 'color', initial: '#ffb431', caption: 'Color?' },
  { name: 'count', type: 'slider', initial: 4, min: 2, max: 10, step: 1, caption: 'How many?' },
  { name: 'friend', type: 'group', caption: 'Friend' },
  { name: 'name', type: 'text', initial: '', size: 20, maxLength: 20, caption: 'Name?', placeholder: '20 characters' },
  { name: 'birthdate', type: 'date', initial: '', min: '1915-01-01', max: '2030-12-31', caption: 'Birthday?', placeholder: 'YYYY-MM-DD' },
  { name: 'age', type: 'int', initial: 20, min: 1, max: 100, step: 1, caption: 'Age?' }
]

// Build text by creating the font strokes (2D), then extruding up (3D).
const text = (message, extrusionHeight, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterLineWidth / 2
  const lineCorner = circle({ radius: lineRadius })

  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character
  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message2D = union(lineSegments)
  const message3D = extrudeLinear({ height: extrusionHeight }, message2D)
  return center({ axes: [true, true, false] }, message3D)
}

const createSingleBalloon = (params) => {
  let t = rotateX(Math.PI / 2, text(params.age.toString(), 2, 2))
  const m = measureBoundingBox(t)
  const x = (params.bRadius * 0.70) / Math.max(m[1][0], m[1][2])
  const y = params.bRadius * 3
  const z = x
  t = translate([0, y / 2, 0], scale([x, y, z], t))

  const b = ellipsoid({
    radius: [params.bRadius, params.bRadius, params.bRadius],
    segments: params.segments || 32
  })
  return subtract(b, t)
}

const createRope = (to) => {
  const base = slice.fromSides(geom2.toSides(circle({ radius: 0.25 })))
  const rope = extrudeFromSlices({
    callback: (p, i, b) => {
      if (i === 1) {
        const matrix = mat4.fromTranslation(mat4.create(), to)
        b = slice.transform(matrix, b)
      }
      return b
    }
  }, base)
  return colorize([0, 0, 0], rope)
}

const createBalloons = (params) => {
  const balloon = createSingleBalloon(params)
  const out = []
  const startingAngle = 360 * Math.random()
  const angleSpread = 360 / params.count

  const ropeOffset = params.bRadius - 1
  for (let i = 0; i < params.count; i++) {
    const angle = Math.floor(startingAngle + (angleSpread * i)) % 360
    const x = Math.cos(angle * Math.PI / 180) * 2 * params.bRadius
    const y = Math.sin(angle * Math.PI / 180) * 2 * params.bRadius
    const z = params.bRadius * 4 + (40 * Math.random())
    const aBalloon = colorize(params.bColor, translate([x, y, z], balloon))
    const aRope = createRope([x, y, z - ropeOffset])
    out.push(aBalloon, aRope)
  }
  return out
}

const createSalutation = (name) => {
  const salutation = name ? `Happy Birthday, ${name}!` : 'Happy Birthday!'
  return translate([0, -10, 0], scale([0.5, 0.5, 0.5], text(salutation, 2, 2)))
}

const createBirthDate = (birthDate) => {
  const birthDateStr = birthDate.toString()
  if (birthDateStr.length === 0) {
    return []
  }
  let birthDate3D = text(birthDate.toString(), 2, 1)
  birthDate3D = scale([0.7, 0.7, 0.7], birthDate3D)
  birthDate3D = translate([0, -30, 0], birthDate3D)
  return birthDate3D
}

export const main = (params) => {
  // use the checkbox to determine the size of the sphere
  params.bRadius = (params.isBig === true) ? 16 : 10
  // use the color chooser to determine the color of the sphere
  params.bColor = hexToRgb(params.color)

  return [
    createBalloons(params),
    createSalutation(params.name),
    createBirthDate(params.birthdate)
  ]
}
