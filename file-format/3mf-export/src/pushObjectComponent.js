import {matrix2str} from './matrix2str.js'

/**
 * @param {number} id
 * @param {import('../index.js').Child3MF[]} components
 * @param {string} [name]
 * @return {import("../xml-schema-3mf").Xml3mfComponentObject}
 */
export const genObjectWithComponents = (id, components, name) => ({
  "@_id": id,
  "@_type": "model",
  "@_name": name,
  components: {
    component: components.map(({ objectID, transform }) => ({
      "@_objectid": objectID,
      "@_transform": transform !== undefined ? matrix2str(transform) : undefined,
    }))
  }
})