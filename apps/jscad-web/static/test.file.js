import * as jscad from '@jscad/modeling'

export const main =({// @jscad-params
  mesh,// {type:"file"}
  check=false,
  bla='test',
  bla1='test', // {type:'choice', values:["a","b"]}
})=>{  
  return mesh ? mesh : jscad.primitives.sphere()

}
