/**
 * @typedef FSEntry
 * @prop {string} name
 * @prop {string} fullPath
 * @prop {string} fsDir
 * @prop {FileSystemHandle} handle
 * @prop {boolean} isFile
 * @prop {boolean} isDirectory
 * @prop {number} lastModified - may not be present if not read

 */

/**
 *
 * @param {FileSystemHandle} handle
 * @param {FSEntry} parent
 * @returns {FSEntry}
 */
export const toFSEntry = (handle, parent) => {
  let isDirectory = handle.kind === 'directory'
  return {
    handle,
    name: handle.name,
    fsDir: parent.fullPath + '/',
    fullPath: parent.fullPath + '/'+ handle.name,
    isDirectory,
    isFile: !isDirectory,
  }
}

/** Check file for changes and write previous values to the entry into ._lastModified and ._size.
 *  This simplifies checking because the entry itself has all the information about the prev and new state
 *   so when result is consumed, the consumer can see if there was a change, without having own internal tracking
 * @param {*} entry 
 * @returns 
 */
export const entryCheckPromise = async entry =>{
  entry._lastModified = entry.lastModified
  entry._size = entry.size
  return new Promise((resolve, reject) => {
      entry.handle.getFile().then(file=>{
        entry.lastModified = file.lastModified
        entry.size = file.size
        resolve([entry, file])
      }).catch(reject)
    })
}