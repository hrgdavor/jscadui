export function formValue(form) {
  const out = {}
  Array.prototype.forEach.call(form.elements, i => {
    let value = i.value
    if (i.type === 'number') value = parseFloat(value)
    out[i.name] = value
  })
  return out
}

export function fillForm(form, values) {
  Array.prototype.forEach.call(form.elements, i => {
    let value = values[i.name]
    if (value === null || value === undefined) value = i.type === 'number' ? 0 : ''
    i.value = value
  })
}
