// @ts-nocheck

// if not in browser
import { to3dmodel, to3mfZipContentSimple } from './index.js'

function multiply(arr, mult, func){
  let out = new func(arr.length * mult)
  for(let i=0; i<mult; i++){
    out.set(arr, i * arr.length)
  }
  return out
}

let verticesData = [
  -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1,
  -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, 1, 1, -1, 1, 1,
  1, 1, -1, 1, 1,
]

let indicesData = [
  0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22,
  20, 22, 23,
]

function oneRun(name,vertices, indices){
  
  let start = performance.now()
  const zipContents = to3dmodel({
    meshes: [{ vertices, indices, id: 1 }],
    header: { application: 'jscad.app', title: 'jscad model' }
  })
  console.log(name)
  console.log('count', vertices.length+indices.length, 'vertices', vertices.length, 'indices', indices.length)
  console.log(Math.round(performance.now() - start), 'len',zipContents.length)
  console.log('')
}

let vertices = multiply(verticesData, 99,Float32Array)
let indices = multiply(indicesData, 99,Uint32Array)
oneRun('warmup',vertices, indices)
vertices = multiply(verticesData, 9999,Float32Array)
indices = multiply(indicesData, 9999,Uint32Array)
oneRun('test1',vertices, indices)
oneRun('test2',vertices, indices)
  