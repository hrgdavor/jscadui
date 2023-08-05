import { defMatrix } from './defMatrix.js'
import { matrix2str } from './matrix2str.js'
/**
 * 
 * @param {string} id 
 * @param {mat4} matrix 
 * @returns 
 */
export const makeItem = (id = 0, matrix = defMatrix) =>
  `    <item objectid="${id}" transform="${matrix2str(matrix)}" />\n`
