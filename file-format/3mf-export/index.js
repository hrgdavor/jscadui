// this implementation exports to 3mf by filling array of strings and doing join
// at the encoding tests for large files have shown significant speedup related
// to using string concatenation
import { makeItem } from './src/makeItem.js'
import { pushHeader } from './src/pushHeader.js'
import { pushObjectWithComponents } from './src/pushObjectComponent.js'
import { pushObjectWithMesh } from './src/pushObjectMesh.js'

export * from './src/staticFiles.js'

/**
 * @typedef Mesh3MF
 * @prop {string} id
 * @prop {Float32Array} vertices
 * @prop {Uint32Array} indices
 * @prop {string} [name]
 *
 * @typedef Mesh3MFSimpleExt
 * @prop {mat4} transform
 *
 * @typedef {Mesh3MF & Mesh3MFSimpleExt} Mesh3MFSimple
 *
 * @typedef Component3MF
 * @prop {string} id
 * @prop {string} name
 * @prop {Array<Child3MF>} children
 *
 * @typedef Child3MF
 * @prop {string} objectID
 * @prop {mat4} transform
 *
 * @typedef To3MF
 * @prop {Array<Mesh3MF>} meshes - manually declare meshes
 * @prop {Array<Component3MF>} [components] - components can combine items
 * @prop {Array<Child3MF>} items - output items, each pointing to component or mesh with objectID
 * @prop {number} precision
 * @prop {import('./src/pushHeader.js').Header} header
 */

/**
 * @param {To3MF} options
 * @returns string
 */
export function to3dmodel({ meshes = [], components = [], items = [], precision = 17, header }) {
  // items to be placed on the scene (build section of 3mf)
  const out = []

  // <model> tag is opened here
  pushHeader(out, header)

  // #region resources
  out.push('  <resources>\n')

  if (items.length == 0) {
    console.error('3MF empty build! Include items or simple.')
  }

  meshes.forEach(({ id, vertices, indices, name }) => pushObjectWithMesh(out, id, vertices, indices, precision, name))

  components.forEach(({ id, children, name }) => {
    pushObjectWithComponents(out, id, children, name)
  })

  out.push('  </resources>\n')
  // #endregion

  out.push(`<build>\n`)
  items.forEach(({ objectID, transform }) => {
    out.push(makeItem(objectID, transform))
  })
  out.push('</build>\n')

  out.push('</model>\n') // model tag was opened in the pushHeader()

  return out.join('')
}

/** Simple export provided meshes that have transform attached to them and autocreate items and pass to to3dmodel.
 *
 * @param {Array<Mesh3MFSimple>} meshes
 * @param {import('./src/pushHeader.js').Header} header
 * @param {number} precision
 * @returns string
 */
export function to3dmodelSimple(meshes, header, precision) {
  const items = []
  meshes.forEach(({ id, transform }) => {
    items.push({ objectID: id, transform })
  })
  return to3dmodel({ meshes, items, header, precision })
}

/** File that describes file relationships inside a 3mf  */
export class FileForRelThumbnail {
  constructor() {
    this.idSeq = 0
    this.lines = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`,
    ]
  }
  get name() {
    return '_rels/.rels'
  }
    /**
   *
   * @param {*} target file path
   * @param {*} xmlType xml schema url
   */
  addRel(target, xmlType) {
    this.lines.push(`  <Relationship Target="${target}" Id="rel-${++this.idSeq}" Type="${xmlType}" />`)
  }
  add3dModel(path) {
    this.addRel(path, 'http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel')
  }
  addThumbnail(path) {
    this.addRel(path, 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail')
  }

  get content() {
    return this.lines.join('\n') + `\n</Relationships>`
  }
}
