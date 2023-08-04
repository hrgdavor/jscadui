import {defMatrix} from './defMatrix.js'
import {matrix2str} from './matrix2str.js'

export function pushObjectWithComponents(out, id, children, name) {
  out.push(`<object id="${id}" type="model"${
      name == null ? '' : ' name="' + name + '"'}>\n`)
  out.push(` <components>\n`)
  children.forEach(
      ({objectID, transform}) => {addComp(out, objectID, transform)})
  out.push(` </components>\n`)
  out.push(`</object>\n`)
}

const addComp = (out, id = 0, matrix = defMatrix) => {
  out.push(
      `    <component objectid="${id}" transform="${matrix2str(matrix)}" />\n`)
}
