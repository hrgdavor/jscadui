/**
 * 
 * @param out {Arrray<string>}
 * @param obj 
 * @returns 
 */
export function pushObjectWithMesh(out,id, vertices, indices){
    out.push(
`  <object id="${id}" type="model">
   <mesh>
    <vertices>
`
    )

    for(let i=0; i<vertices.length; i+=3){
        out.push(`     <vertex x="${vertices[i]}" y="${vertices[i+1]}" z="${vertices[i+2]}" />\n`)
    }

    out.push(
`    </vertices>
    <triangles>
`
    )

    for(let i=0; i<indices.length; i+=3){
        out.push(`     <triangle v1="${indices[i]}" v2="${indices[i+1]}" v3="${indices[i+2]}" />\n`)
    }


    out.push(
`    </triangles>
   </mesh>
  </object>
`
    )

    return out
}