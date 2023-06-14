export function pushObjectWithComponents(out, id, items){
  
    out.push(`<object id="${id}" type="model">\n`)
    out.push(` <components>\n`)
    items.forEach(part => {
        addComp(out, part.id, part.transforms)
    })
    out.push(` </components>\n`)
    out.push(`</object>\n`)
  }

  const addComp = (out, id = 0, matrix = defMatrix) => {
    out.push(`    <component objectid="${id}" transform="${matrix2str(matrix)}" />\n`)
  }
