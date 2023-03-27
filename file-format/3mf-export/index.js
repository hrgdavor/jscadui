// this implementation exports to 3mf by filling array of strings and doing join at the encoding
// tests for large files have shown significant speedup related to using string concatenation

const toDate = d=> d ? d.toISOString().substring(0,10) : ''

export const staticFiles = [
{
    name:'[Content_Types].xml',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
 <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
 <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
 <Default Extension="png" ContentType="image/png" />
</Types>`
},
{
    name:'_rels/.rels',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
 <Relationship Target="/3D/3dmodel.model" Id="rel-1" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
 <Relationship Target="/Metadata/thumbnail.png" Id="rel-2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail" />
</Relationships>`
},
]

/** transform for attribute as specifiend in 3mf format
 * 
 * When objects need to be transformed for rotation, scaling, or translation purposes, 
 * row-major affine 3D matrices (4x4) are used. The matrix SHOULD NOT be singular or nearly singular.
 * Transforms are of the form, where only the first 3 column values are specified. 
 * The last column is never provided, and has the fixed values 0.0, 0.0, 0.0, 1.0. 
 * When specified as an attribute value, 
 * matrices have the form "m00 m01 m02 m10 m11 m12 m20 m21 m22 m30 m31 m32" 
 * where each value is a decimal number of arbitrary precision.
 * 
 * @return string tarnsform attribute value
*/
const matrix2str = m=>{
    let str = ''
    for(let i=0; i<16; i++){
        if(i % 4 == 3) continue
        if(i>0) str += ' '
        str += m[i] || 0
    }
    return str
}

function toMesh(out,obj){
    out.push(
`  <object id="${obj.id}" type="model">
   <mesh>
    <vertices>
`
    )

    let {vertices, indices} = obj
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


export function to3dmodel({
    unit='millimeter', 
    title='jscad model', 
    author='', 
    description='', 
    application='jscad', 
    creationDate=new Date(), 
    license='',
    modificationDate
},geoms, objects){

    let defMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]

    let maxId = 0
    let items = []
    let components = []
    const addObj = (id=0, matrix=defMatrix)=>{
        items.push(`    <item objectid="${id}" transform="${matrix2str(matrix)}" />\n`)
    }
    const addComp = (out, id=0, matrix=defMatrix)=>{
        out.push(`    <component objectid="${id}" transform="${matrix2str(matrix)}" />\n`)
    }

    function addMeshes(out, geoms){    

        geoms.forEach(g=>{
        // let length = geoms.length
        // for(let i=0; i<length; i++){
            // let g = geoms[i]
            if(g.type === 'mesh' || g.type === 'instance'){
                toMesh(out,g)
            }
            if(maxId < g.id) maxId = g.id
        })

        maxId ++
        out.push(`<object id="${maxId}" type="model">\n`)
        out.push(` <components>\n`)
        objects.forEach(g=>{
            if(g.type === 'mesh') addComp(out,g.id, g.csg.transforms)
            if(g.type === 'instance'){
                g.list.forEach(csg=>addComp(out,g.id, csg.transforms))
            } 
        })
        out.push(` </components>\n`)
        out.push(`</object>\n`)
    }


let output = [
`<?xml version="1.0" encoding="UTF-8"?>
<model unit="${unit}" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:slic3rpe="http://schemas.slic3r.org/3mf/2017/06">
 <metadata name="slic3rpe:Version3mf">1</metadata>
 <metadata name="Title">${title}</metadata>
 <metadata name="Designer">${author}</metadata>
 <metadata name="Description">${description||title}</metadata>
 <metadata name="Copyright"></metadata>
 <metadata name="LicenseTerms">${license}</metadata>
 <metadata name="Rating"></metadata>
 <metadata name="CreationDate">${toDate(creationDate)}</metadata>
 <metadata name="ModificationDate">${toDate(modificationDate||creationDate)}</metadata>
 <metadata name="Application">${application}</metadata>
 <resources>
`]

addMeshes(output, geoms)

addObj(maxId)

output.push(
` </resources>
 <build>
 `,
...items,
`</build>
</model>`
)

return output.join('')

}


