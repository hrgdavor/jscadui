// import * as jscad from '@jscad/modeling'

const jscad = require('@jscad/modeling')
let ManifoldModule = require('manifold-3d')

function toMesh(manifold) {
  let manifoldMesh = manifold.getMesh()
  return { type: 'mesh', vertices: manifoldMesh.vertProperties, indices: manifoldMesh.triVerts }
}

let Manifold
async function main({
  // @jscad-params
  segments = 32, // {type:'slider', min:10, max:64, live:true}
  radius = 60, // {type:'slider', min:51, max:80, live:true}
}) {
  if (ManifoldModule.cached) {
    Manifold = ManifoldModule.cached
  } else {
    console.log()
    Manifold = await ManifoldModule()
    Manifold.setup()
    ManifoldModule.cached = Manifold
  }
  const { cube, sphere } = Manifold.Manifold

  //
  const box = cube([100, 100, 100], true)
  const ball = sphere(radius, segments)
  let result = box.subtract(ball)
  try {
    return [toMesh(result)]
  } finally {
    box.delete()
    ball.delete()
    result.delete()
  }
  return [jscad.primitives.sphere({ size: 1 })]
}

module.exports = { main }
