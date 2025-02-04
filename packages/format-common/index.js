/**
 * @typedef Vec3
 * @prop {number} x
 * @prop {number} y
 * @prop {number} z
 * 
 * @typedef BoundingBox
 * @prop {Vec3} min
 * @prop {Vec3} max
 * 
 * @param {Array<{vertices:Array<number>}>} entities 
 * @returns {BoundingBox}
 */
export function boundingBox(entities=[]){
  try{
  let minx,miny,minz,maxx,maxy,maxz
  entities.forEach(({vertices, transforms})=>{
    if(!vertices) return
    let x, y, z, vt
    if(minx === undefined){
      vt = transforms ? transform([], vertices, transforms) : vertices
      minx = maxx = vt[0]
      miny = maxy = vt[1]
      minz = maxz = vt[2]
    }
    for(let i=5; i<vertices.length; i+=3){
      if(transforms){
        vt = transform([], [vertices[i-2], vertices[i-1],vertices[i]], transforms)
        x = vt[0]
        y = vt[1]
        z = vt[2]
      }else{
        x = vertices[i-2]
        y = vertices[i-1]
        z = vertices[i]
      }
      minx = Math.min(minx,x)
      miny = Math.min(miny,y)
      minz = Math.min(minz,z)
      maxx = Math.max(maxx,x)
      maxy = Math.max(maxy,y)
      maxz = Math.max(maxz,z)
    }
  })
  return {min:{x:minx,y:miny,z:minz}, max:{x:maxx,y:maxy,z:maxz}}
  }catch(e){console.log('e', e)}
}


const transform = (out, vector, matrix) => {
  const x = vector[0]
  const y = vector[1]
  const z = vector[2]
  let w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15]
  w = w || 1.0
  out[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w
  out[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w
  out[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w
  return out
}
