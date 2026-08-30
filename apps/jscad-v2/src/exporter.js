import { gzipSync } from 'fflate'
import { str2ab } from './str2ab.js'
import * as editor from './editor.js'

/** @typedef {import('@jscadui/worker').JscadWorker} JscadWorker*/

/**
 * @typedef {Object} ExportFormat
 * @property {string} name
 * @property {string} label
 * @property {()=>Promise<void>} execute
 */

/** @type {ExportFormat[]} */
// NOTE: This list should match the list in src_bundle/bundle.worker.js
const exportFormats = [
  { name: '3mf', label: '3MF', execute: () => exportAsFile('3mf') },
  { name: 'stla', label: 'STL (ascii)', execute: () => exportAsFile('stla', 'stl') },
  { name: 'stlb', label: 'STL (binary)', execute: () => exportAsFile('stlb', 'stl') },
  { name: 'obj', label: 'OBJ', execute: () => exportAsFile('obj') },
  { name: 'x3d', label: 'X3D', execute: () => exportAsFile('x3d') },
  { name: 'dxf', label: 'DXF', execute: () => exportAsFile('dxf') },
  { name: 'json', label: 'JSON', execute: () => exportAsFile('json') },
  { name: 'svg', label: 'SVG', execute: () => exportAsFile('svg') },
  { name: 'URL', label: 'Copy JSCAD script (URL) to clipboard', execute: () => exportToScriptUrl() },
]

const exportButton = /** @type {HTMLButtonElement} */ (document.getElementById('export-button'))
const exportFormatSelect = /** @type {HTMLSelectElement} */ (document.getElementById('export-format'))

/** @type {JscadWorker} */
let workerApi

/** @param {JscadWorker} newWorkerApi */
export const init = (newWorkerApi) => {
  workerApi = newWorkerApi

  for (const format of exportFormats) {
    const option = document.createElement('option')
    option.value = format.name
    option.text = format.label
    exportFormatSelect.appendChild(option)
  }

  // Bind export buttons
  exportButton.addEventListener('click', async () => {
  // Export model in selected format    
    const format = /** @type {ExportFormat} */ (exportFormats.find((f) => f.name === exportFormatSelect.value))
    await format.execute()
  })
}

/**
 * @param {Blob} blob 
 * @param {string} filename 
 */
function sendAsDownload(blob, filename) {
  // Dummy link for download action
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

const exportToScriptUrl = async () => {
  if (editor.getEditorFiles().length > 1) {
    alert('Can not export multi file projects as url')
    return
  }
  const src = editor.getSource()
  const gzipped = gzipSync(str2ab(src))
  const str = String.fromCharCode(...gzipped)
  const baseUrl = document.location.origin + document.location.pathname
  const url = baseUrl + '#data:application/gzip;base64,' + btoa(str)
  try {
    await navigator.clipboard.writeText(url)
    alert('URL with gzipped script was successfully copied to clipboard')
  } catch (err) {
    console.error(`FAILED to create URL\n${err}`)
    alert(`FAILED to create URL\n${err}`)
  }
}

/** 
 * @param {string} formatName
 * @param {string} formatExtension
 */
const exportAsFile = async (formatName, formatExtension = formatName) => {
  let { data } = (await workerApi.jscadExportData({ format: formatName })) || {}
  if (data) {
    if (!(data instanceof Array)) data = [data]
    let type = 'text/plain'
    if (formatName === '3mf') type = 'application/zip'

    sendAsDownload(new Blob(data, { type }), `${exportConfig.projectName}.${formatExtension}`)
  }
}

export const exportConfig = {
  projectName: 'jscad',
}
