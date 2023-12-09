import * as jscad from '@jscad/modeling'

export const main =({// @jscad-params
  mesh,// {type:"file"}
  check=false,
})=>{  
  return mesh ? mesh : jscad.primitives.sphere()

}
