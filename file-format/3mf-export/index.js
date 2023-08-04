// this implementation exports to 3mf by filling array of strings and doing join
// at the encoding tests for large files have shown significant speedup related
// to using string concatenation
import {makeItem} from './src/makeItem.js'
import {pushHeader} from './src/pushHeader.js'
import {pushObjectWithComponents} from './src/pushObjectComponent.js'
import {pushObjectWithMesh} from './src/pushObjectMesh.js'

export * from './src/staticFiles.js'


export function to3dmodel({
  simple = [],
  meshes = [],
  components = [],
  items = [],
  precision = 17,
  header
}) {
  // items to be placed on the scene (build section of 3mf)
  const out = []

  // <model> tag is opened here
  pushHeader(out, header)

  // #region resources
  out.push('  <resources>\n')

  simple.forEach(({ id, vertices, indices, transform }) => {
    pushObjectWithMesh(out, id, vertices, indices)
    items.push({objectID:id, transform})
  })

  if (items.length == 0) {
    console.error('3MF empty build! Include items or simple.')
  }

  meshes.forEach(
      ({id, vertices, indices, name}) =>
          pushObjectWithMesh(out, id, vertices, indices, precision, name))

  components.forEach(
      ({id, children, name}) => {
          pushObjectWithComponents(out, id, children, name)})

  out.push('  </resources>\n')
  // #endregion

  out.push(`<build>\n`)
  items.forEach(
      ({objectID, transform}) => {out.push(makeItem(objectID, transform))})
  out.push('</build>\n')

  out.push('</model>\n')  // model tag was opened in the pushHeader()

  return out.join('')
}
