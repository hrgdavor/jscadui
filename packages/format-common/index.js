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
  let minx,miny,minz,maxx,maxy,maxz
  entities.forEach(({vertices})=>{
    if(!vertices) return
    if(minx === undefined){
      minx = maxx = vertices[0]
      miny = maxy = vertices[1]
      minz = maxz = vertices[2]
    }
    for(let i=2; i<vertices.length; i+=3){
      const x = vertices[i-2]
      const y = vertices[i-1]
      const z = vertices[i]
      minx = Math.min(minx,x)
      miny = Math.min(miny,y)
      minz = Math.min(minz,z)
      maxx = Math.max(maxx,x)
      maxy = Math.max(maxy,y)
      maxz = Math.max(minz,z)
    }
  })
  return {min:{x:minx,y:miny,z:minz}, max:{x:maxx,y:maxy,z:maxz}}
}