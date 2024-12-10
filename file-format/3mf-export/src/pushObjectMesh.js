/**
 * @param {number} id
 * @param {Float32Array} vertices
 * @param {Uint32Array} indices
 * @param {number} precision
 * @param {string} [name]
 * @return {import('../xml-schema-3mf').Xml3mfMeshObject}
 */
export const genObjectWithMesh = (id, vertices, indices, precision, name) => {
  /** @type { import('../xml-schema-3mf').Xml3mfVertex[]} */
  const xmlVertex = []
  for (let i = 0; i < vertices.length; i += 3) {
    xmlVertex.push({
      '@_x': vertices[i].toPrecision(precision),
      '@_y': vertices[i + 1].toPrecision(precision),
      '@_z': vertices[i + 2].toPrecision(precision),
    })
  }

  /** @type { import('../xml-schema-3mf').Xml3mfTriangle[]} */
  const xmlTriangles = []
  for (let i = 0; i < indices.length; i += 3) {
    xmlTriangles.push({
      '@_v1': indices[i],
      '@_v2': indices[i + 1],
      '@_v3': indices[i + 2],
    })
  }

  return {
    '@_id': id,
    '@_type': 'model',
    '@_name': name,
    mesh: {
      vertices: { vertex: xmlVertex },
      triangles: { triangle: xmlTriangles },
    },
  }
}