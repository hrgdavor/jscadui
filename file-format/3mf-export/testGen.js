// if not in browser
import { Blob } from 'buffer'
import { Zip, ZipDeflate, ZipPassThrough, strToU8 } from 'fflate'
import { readFileSync, writeFileSync } from 'fs'

import { fileForContentTypes, fileForRelThumbnail, to3dmodel, to3dmodelSimple } from './index.js'

//#region hardcoded cube data
let vertices = [
  -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1,
  -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, 1, 1, -1, 1, 1,
  1, 1, -1, 1, 1,
]

let indices = [
  0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22,
  20, 22, 23,
]
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

let modelStr = to3dmodelSimple([{ vertices, indices, id: '1' }])
addToZip(zip, '3D/3dmodel.model', modelStr)

let staticFiles = [fileForContentTypes, fileForRelThumbnail]
staticFiles.forEach(({ name, content }) => addToZip(zip, name, content))

let thumb = readFileSync('testThumbnail.png')
const pngPreviewFile = new ZipPassThrough('Metadata/thumbnail.png')
zip.add(pngPreviewFile)
pngPreviewFile.push(thumb, true)

zip.end()

function addToZip(zip, name, content) {
  const zf = new ZipDeflate(name, { level: 9 })
  zip.add(zf)
  zf.push(strToU8(content), true)
}

/** //example how to generate thumb from canvas and add it in fflate
const pngPreviewFile = new fflate.ZipPassThrough('Metadata/thumbnail.png');
zip.add(pngPreviewFile);
pngPreviewFile.push(cavassToPngA8(canvas), true);
*/
function cavassToPngA8(canvas) {
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

/** intentionally not part of the lib, you may or may not need it in your export code */
async function blobToArrayBuffer(blob) {
  if ('arrayBuffer' in blob) return await blob.arrayBuffer()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject
    reader.readAsArrayBuffer(blob)
  })
}
