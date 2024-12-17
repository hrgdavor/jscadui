import { XMLBuilder } from 'fast-xml-parser'
import { genItem } from './src/makeItem.js'
import { genModel } from './src/pushHeader.js'
import { genObjectWithComponents } from './src/pushObjectComponent.js'
import { genObjectWithMesh } from './src/pushObjectMesh.js'
import { fileForContentTypes } from './src/staticFiles.js'

export * from './src/staticFiles.js'

/**
 * @typedef Mesh3MF
 * @prop {number} id
 * @prop {Float32Array} vertices
 * @prop {Uint32Array} indices
 * @prop {string} [name]
 *
 * @typedef Mesh3MFSimpleExt
 * @prop {import('./src/defMatrix.js').mat4} [transform]
 *
 * @typedef {Mesh3MF & Mesh3MFSimpleExt} Mesh3MFSimple
 *
 * @typedef Component3MF
 * @prop {number} id
 * @prop {string} name
 * @prop {Array<Child3MF>} children
 *
 * @typedef Child3MF
 * @prop {number} objectID
 * @prop {import('./src/defMatrix.js').mat4} [transform]
 *
 * @typedef To3MF
 * @prop {Array<Mesh3MF>} meshes - manually declare meshes
 * @prop {Array<Component3MF>} [components] - components can combine items
 * @prop {Array<Child3MF>} items - output items, each pointing to component or mesh with objectID
 * @prop {number} [precision]
 * @prop {import('./src/pushHeader.js').Header} [header]
 */

/**
 * @param {To3MF} options
 * @returns {string}
 */
export function to3dmodel({ meshes = [], components = [], items = [], precision = 17, header }) {
  /** @type {import('./xml-schema-3mf.js').Xml3mf} */
  const data = {
    '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
    model: genModel(
      header ?? {},
      [
        //Mesh objects
        ...meshes.map(({ id, vertices, indices, name }) => ({
          object: genObjectWithMesh(id, vertices, indices, precision, name)
        })),
        //Component objects
        ...components.map(({ id, children, name }) => ({
          object: genObjectWithComponents(id, children, name)
        })),
      ],
      { item: items.map(v => genItem(v.objectID, v.transform)) },
    )
  }

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true
  })

  return builder.build(data)
}

/**
 * Simple export provided meshes that have transform attached to them and autocreate items and pass to to3dmodel.
 * @param {Array<Mesh3MFSimple>} meshes
 * @param {import('./src/pushHeader.js').Header} [header]
 * @param {number} [precision]
 * @returns {string}
 */
export function to3dmodelSimple(meshes, header, precision) {
  /** @type {Child3MF[]} */
  const items = meshes.map(({ id, transform }) => ({ objectID: id, transform }))

  return to3dmodel({ meshes, items, header, precision })
}

/**
 * @typedef {[string,Uint8Array,boolean]} ZipContent  FileName, FileContent, CanBeCompressed
 */

/**
 * @param {To3MF} options
 * @param {Uint8Array | undefined} [thumbnailPng]
 * @returns {ZipContent[]}
 */
export function to3mfZipContent(options, thumbnailPng) {
  /** @type {ZipContent[]} */
  const result = []
  const utf8Encoder = new TextEncoder()

  result.push([fileForContentTypes.name, utf8Encoder.encode(fileForContentTypes.content), true])

  const fileForRelThumbnail = new FileForRelThumbnail()
  fileForRelThumbnail.add3dModel('3D/3dmodel.model')

  if (thumbnailPng !== undefined) {
    result.push(['Metadata/thumbnail.png', thumbnailPng, false])
    fileForRelThumbnail.addThumbnail('Metadata/thumbnail.png')
  }

  result.push(['3D/3dmodel.model', utf8Encoder.encode(to3dmodel(options)), true])
  result.push([fileForRelThumbnail.name, utf8Encoder.encode(fileForRelThumbnail.content), true])

  return result
}

/**
 * @param {{meshes:Array<Mesh3MFSimple>,header?:import('./src/pushHeader.js').Header,precision?:number}} options
 * @param {Uint8Array | undefined} [thumbnailPng]
 * @returns {ZipContent[]}
 */
export function to3mfZipContentSimple({ meshes, header, precision }, thumbnailPng) {
  const items = meshes.map(({ id, transform }) => ({ objectID: id, transform }))

  return to3mfZipContent({ meshes, items, header, precision }, thumbnailPng)
}

/** File that describes file relationships inside a 3mf  */
export class FileForRelThumbnail {
  idSeq = 0
  name = '_rels/.rels'

  /** @type {import('./xml-schema-3mf.js').Xml3mfRelationFile} */
  data = {
    '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
    Relationships: {
      '@_xmlns': 'http://schemas.openxmlformats.org/package/2006/relationships',
      Relationship: []
    },
  }  

   /**
   * @param {string} target file path
   * @param {string} xmlType xml schema url
   */
  addRel(target, xmlType) {
    this.data.Relationships.Relationship.push(
      { '@_Target': target, "@_Id": `rel-${++this.idSeq}`, '@_Type': xmlType }
    )
  }

  /** @param {string} path */
  add3dModel = (path) => this.addRel(path, 'http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel')

  /** @param {string} path */
  addThumbnail = (path) => this.addRel(path, 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail')

  get content() {
    const builder = new XMLBuilder({ ignoreAttributes: false, format: true, suppressEmptyNode: true })
    return builder.build(this.data)
  }
}
