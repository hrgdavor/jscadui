import { defMatrix } from './defMatrix.js'
import { matrix2str } from './matrix2str.js'
/**
 * 
 * @param {string} id - must start with 1, can not be zero by spec
 * @param {mat4} matrix 
 * @returns 
 */
export const makeItem = (id = 1, matrix = defMatrix) =>
  `    <item objectid="${id}" transform="${matrix2str(matrix)}" />\n`
