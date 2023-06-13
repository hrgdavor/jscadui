import { Zip } from 'fflate'
import { writeFileSync } from 'fs'
import { fileForContentTypes, fileForRelThumbnail } from './index.js'

const parts = []
const zip = new Zip((err, dat, final) => {
  if (!err) {
    // output of the streams
    // console.log(final, dat.length);
    parts.push(dat)
    if (final) {
      let blob = new Blob(parts, { type: 'application/octet-stream' })
      writeFileSync('testfile.3mf', blob)
    }
  }
})
// TODO generate 3mf, add thumb, add static files



/** intentionally not part of the lib, you may or may not need it in your export code */
async function blobToArrayBuffer(blob) {
  if ('arrayBuffer' in blob) return await blob.arrayBuffer();
  
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject;
      reader.readAsArrayBuffer(blob);
  });
}