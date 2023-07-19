export const init = (exportFn) => {
  // Bind export buttons
  document.getElementById("export-button").addEventListener("click", () => {
    // Export model in selected format
    const formatSelect = document.getElementById("export-format")
    const format = formatSelect.value
    exportFn(format)
  })

  // TODO: Populate formats from @jscad/io
}
