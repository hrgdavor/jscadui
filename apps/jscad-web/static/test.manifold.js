// import * as jscad from '@jscad/modeling'

const jscad = require('@jscad/modeling')
let ManifoldModule = require('manifold-3d')

function toMesh(manifold){
  let manifoldMesh = manifold.getMesh()
  return { type: 'mesh', vertices: manifoldMesh.vertProperties, indices: manifoldMesh.triVerts }
}

let Manifold
async function main() {
  if (ManifoldModule.cached) {
    Manifold = ManifoldModule.cached
  } else {
    console.log()
    Manifold = await ManifoldModule()
    Manifold.setup()
    ManifoldModule.cached = Manifold
  }
  const {cube, sphere} = Manifold.Manifold

  //
  const box = cube([100, 100, 100], true);
  const ball = sphere(60, 100);
  let result = box.subtract(ball);
  result = toMesh(result)
  return [result]
  return [jscad.primitives.sphere({ size: 1 })]
}

module.exports = { main }
