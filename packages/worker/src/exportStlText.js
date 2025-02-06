/**
 * @param {import("@jscadui/format-common").JscadMeshEntity[]} objects 
 * @returns {string[]}
 */
export const exportStlText = (objects) => {
  const out = ['solid JSCAD\n']
  convertToStl(objects, out)
  out.push('endsolid JSCAD\n')
  return out
}

/**
 * @param {import("@jscadui/format-common").JscadMeshEntity[]} objects 
 * @param {string[]} out 
 * @returns 
 */
const convertToStl = (objects, out) => {
  objects.forEach((object, i) => {
    convertToFacets(object, out)
  })
  return out
}

/**
 * @param {string} prefix 
 * @param {Float32Array} v 
 * @param {number} idx 
 * @returns {string}
 */
const vertexToStlString = (prefix, v, idx) => `${prefix} ${v[idx]} ${v[idx + 1]} ${v[idx + 2]}\n`

/**
 * @param {import("@jscadui/format-common").JscadMeshEntity} polygon 
 * @param {string[]} out 
 * @returns {string[]}
 */
const convertToFacets = (polygon, out) => {
  const {vertices, indices, normals} = polygon
  const max = indices.length - 2
  for(let i=0; i<max; i+=3){
    out.push(vertexToStlString('facet normal', normals, i))
    out.push('outer loop\n')
    out.push(vertexToStlString('vertex', vertices, indices[i] * 3))
    out.push(vertexToStlString('vertex', vertices, indices[i + 1] * 3))
    out.push(vertexToStlString('vertex', vertices, indices[i + 2] * 3))  
    out.push('endloop\nendfacet\n')
  }
  return out
}
