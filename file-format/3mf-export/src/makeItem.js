import { defMatrix } from './defMatrix.js'
import { matrix2str } from './matrix2str.js'

export const makeItem = (id = 0, matrix = defMatrix) =>
  `    <item objectid="${id}" transform="${matrix2str(matrix)}" />\n`
