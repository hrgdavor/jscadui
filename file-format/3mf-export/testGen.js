// if not in browser
import { Blob } from 'buffer'
import { Zip, ZipDeflate, ZipPassThrough } from 'fflate'
import { readFileSync, writeFileSync } from 'fs'

import { to3mfZipContentSimple } from './index.js'

//#region hardcoded cube data
let vertices = new Float32Array([
  -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1,
  -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, 1, 1, -1, 1, 1,
  1, 1, -1, 1, 1,
])

let indices = new Uint32Array([
  0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22,
  20, 22, 23,
])
//#endregion

const zipParts = []
const zip = new Zip(async (err, dat, final) => {
  if (!err) {
    // output of the streams
    zipParts.push(dat)
    // if (final) { // web version
    //   let blob = new Blob(parts, { type: 'application/octet-stream' })
    //   writeFileSync('testfile.3mf', blob)
    // }
    writeFileSync('./testfile.3mf', dat, { flag: zipParts.length === 1 ? 'w' : 'a' })
  }
})


const thumb = readFileSync('testThumbnail.png')
const zipContents = to3mfZipContentSimple({
  meshes: [{ vertices, indices, id: 1 }],
  header: { application: 'jscad.app', title: 'jscad model' }
}, thumb)

for (const [fileName, fileContent, canBeCompressed] of zipContents) {
  const fileStream = canBeCompressed ? new ZipDeflate(fileName, { level: 9 }) : new ZipPassThrough(fileName)
  zip.add(fileStream)
  fileStream.push(fileContent, true)
}

zip.end()

/** example how to generate thumb from canvas
* @param {HTMLCanvasElement} canvas
*/
function canvasToPngA8(canvas) {
  let url = canvas.toDataURL('image/png')
  url = url.substring(url.indexOf(',') + 1)
  // strToU8 function from fflate
  return strToU8(url)
  // string to Uint8Array taken from stackoverflow, and should work in browser
  return new Uint8Array(
    atob(url)
      .split('')
      .map(c => c.charCodeAt(0)),
  )
}

/** intentionally not part of the lib, you may or may not need it in your export code 
 * @param {*} blob 
*/
async function blobToArrayBuffer(blob) {
  if ('arrayBuffer' in blob) return await blob.arrayBuffer()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject
    reader.readAsArrayBuffer(blob)
  })
}
