/**
 *
 * @param {Arrray<string>} out
 * @param {string} id
 * @param {Float32Array} vertices
 * @param {Uint32Array} indices
 * @param {number} precision
 * @param {string} [name]
 * @returns
 */
export function pushObjectWithMesh(
    out, id, vertices, indices, precision, name) {
  out.push(`  <object id="${id}" type="model"${
      !name ? '' : ' name="' + name + '"'}>
   <mesh>
    <vertices>
`)

  for (let i = 0; i < vertices.length; i += 3) {
    out.push(`     <vertex x="${vertices[i].toPrecision(precision)}" y="${
        vertices[i + 1].toPrecision(
            precision)}" z="${vertices[i + 2].toPrecision(precision)}" />\n`)
  }

  out.push(`    </vertices>
    <triangles>
`)

  for (let i = 0; i < indices.length; i += 3) {
    out.push(`     <triangle v1="${indices[i]}" v2="${indices[i + 1]}" v3="${
        indices[i + 2]}" />\n`)
  }


  out.push(`    </triangles>
   </mesh>
  </object>
`)

  return out
}