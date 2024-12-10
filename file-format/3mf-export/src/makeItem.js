import { matrix2str } from './matrix2str.js'

/**
 * @param {number} id - must start with 1, can not be zero by spec
 * @param {import('./defMatrix.js').mat4} [matrix]
 * @returns {import('../xml-schema-3mf.js').Xml3mfItem}
 */
export const genItem = (id, matrix) => ({
  "@_objectid": id,
  "@_transform": matrix !== undefined ? matrix2str(matrix) : undefined,
})