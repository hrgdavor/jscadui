// this implementation exports to 3mf by filling array of strings and doing join at the encoding
// tests for large files have shown significant speedup related to using string concatenation
import { makeItem } from './src/makeItem.js'
import { pushObjectWithComponents } from './src/pushObjectComponent.js'
import { pushObjectWithMesh } from './src/pushObjectMesh.js'
import { toDate3mf } from './src/toDate3mf.js'

export * from './src/staticFiles.js'

// items to be placed on the sene (build section of 3mf)
let items = []

export function to3dmodel({
  simple = [],
  meshes = [],
  components = [],
  unit = 'millimeter',
  title = 'jscad model',
  author = '',
  description = '',
  application = 'jscad',
  creationDate = new Date(),
  license = '',
  modificationDate,
}) {
  let out = [
    `<?xml version="1.0" encoding="UTF-8"?>
<model unit="${unit}" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:slic3rpe="http://schemas.slic3r.org/3mf/2017/06">
 <metadata name="slic3rpe:Version3mf">1</metadata>
 <metadata name="Title">${title}</metadata>
 <metadata name="Designer">${author}</metadata>
 <metadata name="Description">${description || title}</metadata>
 <metadata name="Copyright"></metadata>
 <metadata name="LicenseTerms">${license}</metadata>
 <metadata name="Rating"></metadata>
 <metadata name="CreationDate">${toDate3mf(creationDate)}</metadata>
 <metadata name="ModificationDate">${toDate3mf(modificationDate || creationDate)}</metadata>
 <metadata name="Application">${application}</metadata>
 <resources>
`,
  ]
  //#region resources
  simple.forEach(({ id, vertices, indices, transforms }) => {
      pushObjectWithMesh(out, id, vertices, indices)
      items.push(makeItem(id, transforms))
    })
    meshes.forEach(({ id, vertices, indices, transforms }) => pushObjectWithMesh(out, id, vertices, indices))
    
  components.forEach(({ id, items, transforms }) => {
    pushObjectWithComponents(id,items)
    items.push(makeItem(id, transforms))
})

  //#endregion
  out.push(
    ` </resources>
 <build>
 `,
    ...items,
    `</build>
</model>`,
  )

  return out.join('')
}
