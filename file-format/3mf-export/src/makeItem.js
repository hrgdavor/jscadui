import { defMatrix } from './defMatrix.js'
import { matrix2str } from './matrix2str.js'

/**
 * @param {number} id - must start with 1, can not be zero by spec
 * @param {import('./defMatrix.js').mat4} matrix 
 * @returns 
 */
export const makeItem = (id = 1, matrix = defMatrix) =>
  `    <item objectid="${id}" transform="${matrix2str(matrix)}" />\n`
