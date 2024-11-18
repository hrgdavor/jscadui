import * as jscad from '@jscad/modeling'
import ManifoldModule from 'manifold-3d'

export async function main({// @jscad-params
  useManifold = true,
  segments = 32,
  radius = 60, // {type:'slider', min:51, max:80, live:true}
}) {

  return useManifold ? mainManifold({segments,radius}) :  mainJscad({segments,radius})
}
function mainJscad({segments = 32, radius = 60}){
    const box = jscad.primitives.cube({ size: 100 })
    const ball = jscad.primitives.sphere({ radius, segments })
    return jscad.booleans.subtract(box, ball)  
}

async function mainManifold({segments = 32, radius = 60}){
    const { cube, sphere } = await ManifoldModule.get()
    const box = cube([100, 100, 100], true)
    const ball = sphere(radius, segments)
    const ball2 = sphere(radius-20, segments)
    let result = box.subtract(ball)
    try {
      return [toMesh(result),toMesh(ball2)]
    } finally {
      box.delete()
      ball.delete()
      ball2.delete()
      result.delete()
    }  
}

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


