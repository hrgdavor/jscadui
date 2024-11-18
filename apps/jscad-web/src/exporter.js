const exportFormats = [
  { name: '3mf', extension: '3mf', label: '3MF' },
  { name: 'stla', extension: 'stl', label: 'STL (ascii)' },
  { name: 'stlb', extension: 'stl', label: 'STL (binary)' },
  { name: 'amf', extension: 'amf', label: 'AMF' },
  { name: 'dxf', extension: 'dxf', label: 'DXF' },
  { name: 'json', extension: 'json', label: 'JSON' },
  { name: 'obj', extension: 'obj', label: 'OBJ' },
  { name: 'x3d', extension: 'x3d', label: 'X3D' },
  { name: 'svg', extension: 'svg', label: 'SVG' },
  { name: 'scriptUrl', label: 'Copy to clipboard script url' },
]

export const init = (exportFn) => {
  populateFormats(exportFormats)
  // Bind export buttons
  document.getElementById('export-button').addEventListener('click', () => {
    // Export model in selected format
    const formatSelect = document.getElementById('export-format')
    const format = exportFormats.find((f) => f.name === formatSelect.value)
    exportFn(format.name, format.extension)
  })
}

const populateFormats = (formats) => {
  const select = document.getElementById('export-format')
  formats.forEach((format) => {
    const option = document.createElement('option')
    option.value = format.name
    option.text = format.label
    select.appendChild(option)
  })
}
