// this implementation exports to 3mf by filling array of strings and doing join at the encoding
// tests for large files have shown significant speedup related to using string concatenation
import { makeItem } from './src/makeItem.js'
import { pushHeader } from './src/pushHeader.js'
import { pushObjectWithComponents } from './src/pushObjectComponent.js'
import { pushObjectWithMesh } from './src/pushObjectMesh.js'

export * from './src/staticFiles.js'


export function to3dmodel({ simple = [], meshes = [], components = [], ...header }) {
  // items to be placed on the scene (build section of 3mf)
  let items = []
  let out = []

  // <model> tag is opened here
  pushHeader(out, header)
  
  //#region resources
  out.push('  <resources>\n')

  simple.forEach(({ id, vertices, indices, transforms }) => {
    pushObjectWithMesh(out, id, vertices, indices)
    items.push(makeItem(id, transforms))
  })
  
  meshes.forEach(({ id, vertices, indices, transforms }) => pushObjectWithMesh(out, id, vertices, indices))

  components.forEach(({ id, items, transforms }) => {
    pushObjectWithComponents(id, items)
    items.push(makeItem(id, transforms))
  })

  out.push('  </resources>\n')
  //#endregion

  out.push(`<build>\n`, ...items, '</build>\n')
  
  out.push('</model>\n')// model tag was opened in the pushHeader()

  return out.join('')
}
