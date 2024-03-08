import * as jscad from '@jscad/modeling'
// import * as ManifoldModule from 'manifold-3d'

//const jscad = require('@jscad/modeling')
let ManifoldModule = require('manifold-3d')

function toMesh(manifold) {
  let manifoldMesh = manifold.getMesh()
  return { type: 'mesh', vertices: manifoldMesh.vertProperties, indices: manifoldMesh.triVerts }
}

if(!ManifoldModule.get){
  ManifoldModule.get = async function(){
    if (!ManifoldModule.cached) {
      let Manifold
      Manifold = await ManifoldModule()
      Manifold.setup()
      ManifoldModule.cached = Manifold
    }
    return ManifoldModule.cached.Manifold
  }
}

export async function main({
  // @jscad-params
  useManifold = true,
  segments = 32, // {type:'slider', min:10, max:96, live:true}
  radius = 60, //16 {type:'slider', min:51, max:80, live:true}
}) {
  
  if (useManifold) {
    const { cube, sphere } = await ManifoldModule.get()
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
  } else {
    const box = jscad.primitives.cube({ size: 100 })
    const ball = jscad.primitives.sphere({ radius, segments })
    return jscad.booleans.subtract(box, ball)
  }
}


