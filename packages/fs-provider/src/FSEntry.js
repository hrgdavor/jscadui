/**
 * @typedef {(FSFileEntry | FSDirectoryEntry)} FSEntry 
 * 
 * @typedef FSFileEntry
 * @prop {string} name
 * @prop {string} fullPath
 * @prop {string} fsDir
 * @prop {FileSystemFileHandle} handle
 * @prop {true} isFile
 * @prop {false} isDirectory
 * @prop {number} [size]
 * @prop {number} [lastModified]
 * @prop {number} [_size] - may not be present if not read
 * @prop {number} [_lastModified] - may not be present if not read
 * 
 * @typedef FSDirectoryEntry
 * @prop {string} name
 * @prop {string} fullPath
 * @prop {string} fsDir
 * @prop {FileSystemDirectoryHandle} handle
 * @prop {Array<FSEntry>} [children]
 * @prop {false} isFile
 * @prop {true} isDirectory
 */

/**
 * @param {FileSystemHandle} handle
 * @param {FSDirectoryEntry} parent
 * @returns {FSEntry}
 */
export const toFSEntry = (handle, parent) => {
  if (handle.kind === 'directory') {
    const directoryHandle = /** @type {FileSystemDirectoryHandle} */(handle)
    return {
      handle: directoryHandle,
      name: handle.name,
      fsDir: parent.fullPath + '/',
      fullPath: parent.fullPath + '/' + handle.name,
      isDirectory: true,
      isFile: false,
    }
  } else {
    const fileHandle = /** @type {FileSystemFileHandle} */(handle)
    return {
      handle: fileHandle,
      name: handle.name,
      fsDir: parent.fullPath + '/',
      fullPath: parent.fullPath + '/' + handle.name,
      isDirectory: false,
      isFile: true,
    }
  }
}

/** Check file for changes and write previous values to the entry into ._lastModified and ._size.
 *  This simplifies checking because the entry itself has all the information about the prev and new state
 *   so when result is consumed, the consumer can see if there was a change, without having own internal tracking
 * @param {FSFileEntry} entry 
 * @returns {Promise<[FSFileEntry,File]>} 
 */
export const entryCheckPromise = async entry => {
  entry._lastModified = entry.lastModified
  entry._size = entry.size
  const file = await entry.handle.getFile()
  entry.lastModified = file.lastModified
  entry.size = file.size
  return [entry, file]
}