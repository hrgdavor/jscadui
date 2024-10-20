/**
 * @param {import('./FSEntry.js').FSFileEntry | Blob} f 
 * @returns {Promise<ArrayBuffer>}
 */
export const readAsArrayBuffer = async f => readAs(f, 'readAsArrayBuffer')
/**
 * @param {import('./FSEntry.js').FSFileEntry | Blob} f 
 * @returns {Promise<string>}
 */
export const readAsBinaryString = async f => readAs(f, 'readAsBinaryString')
/**
 * @param {import('./FSEntry.js').FSFileEntry | Blob} f 
 * @returns {Promise<string>}
 */
export const readAsDataURL = async f => readAs(f, 'readAsDataURL')
/**
 * @param {import('./FSEntry.js').FSFileEntry | Blob} f 
 * @returns {Promise<string>}
 */
export const readAsText = async f => readAs(f, 'readAsText')

/**
 * 
 * @param {import("./FSEntry").FSFileEntry | Blob} f 
 * @param {string} as 
 * @returns 
 */
const readAs = async (f, as) =>
  new Promise(async (resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => resolve(event.target?.result)
    reader.onerror = error => {
      const msg = 'error reading ' + f.name
      console.error(msg, f, error)
      reject(msg)
    }
    try {
      if ('handle' in f) {
        const tmp = await f.handle.getFile()
        f.lastModified = tmp.lastModified
        f.size = tmp.size
        f = tmp
      }

      reader[as](f)
    } catch (e) {
      console.warn(as, f)
      throw e
    }
  })
