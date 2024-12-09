import {defMatrix} from './defMatrix.js'
import {matrix2str} from './matrix2str.js'

/**
 * @param {Array<String>} out 
 * @param {number} id 
 * @param {Array<import('../index.js').Child3MF>} children 
 * @param {string} name 
 */
export function pushObjectWithComponents(out, id, children, name) {
  out.push(`<object id="${id}" type="model"${
      name == null ? '' : ' name="' + name + '"'}>\n`)
  out.push(` <components>\n`)
  children.forEach(
      ({objectID, transform}) => {addComp(out, objectID, transform)})
  out.push(` </components>\n`)
  out.push(`</object>\n`)
}

/**
 * @param {Array<String>} out 
 * @param {number} id - must start with 1, can not be zero by spec 
 * @param {import('./defMatrix.js').mat4} matrix 
 */
const addComp = (out, id = 1, matrix = defMatrix) => {
  out.push(
      `    <component objectid="${id}" transform="${matrix2str(matrix)}" />\n`)
}
