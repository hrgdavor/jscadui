/**
 * @typedef FSEntry
 * @prop {string} name
 * @prop {string} fullPath
 * @prop {string} fsDir
 * @prop {FileSystemHandle} handle
 * @prop {boolean} isFile
 * @prop {boolean} isDirectory
 * @prop {number} [size]
 * @prop {number} [lastModified]
 * @prop {number} [_size] - may not be present if not read
* @prop {number} [_lastModified] - may not be present if not read
 */

/**
 *
 * @param {FileSystemHandle} handle
 * @param {FSEntry} parent
 * @returns {FSEntry}
 */
export const toFSEntry = (handle, parent) => {
  const isDirectory = handle.kind === 'directory'
  return {
    handle,
    name: handle.name,
    fsDir: parent.fullPath + '/',
    fullPath: parent.fullPath + '/' + handle.name,
    isDirectory,
    isFile: !isDirectory,
  }
}

/** Check file for changes and write previous values to the entry into ._lastModified and ._size.
 *  This simplifies checking because the entry itself has all the information about the prev and new state
 *   so when result is consumed, the consumer can see if there was a change, without having own internal tracking
 * @param {FSEntry} entry 
 * @returns {Promise<[FSEntry,FileSystemFileHandle]>} 
 */
export const entryCheckPromise = async entry => {
  entry._lastModified = entry.lastModified
  entry._size = entry.size
  const file = await     entry.handle.getFile()
      entry.lastModified = file.lastModified
      entry.size = file.size
      return [entry, file]
}