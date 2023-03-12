// https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree/53058574#53058574
export const readDir = async dir => {
  if (!dir.createReader) return []
  const directoryReader = dir.createReader()
  let entries = []
  let readEntries = await readEntriesPromise(directoryReader)
  while (readEntries.length > 0) {
    entries.push(...readEntries)
    readEntries = await readEntriesPromise(directoryReader)
  }
  const fsDir = dir.fsPath && dir.fsPath !== '/' ? dir.fsPath + '/' : '/'
  return entries.map(e => fileToFsEntry(e, fsDir))
}

export const readEntriesPromise = async directoryReader => cbToPromise(directoryReader, 'readEntries')

export const filePromise = async entry =>{
  const out = await cbToPromise(entry, 'file')
  // propagate info from file to the entry
  entry.lastModified = out.lastModified
  entry.size = out.size
  return out
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
    entry.file(file=>{
      entry.lastModified = file.lastModified
      entry.size = file.size
      resolve([entry, file])
    }, reject)
  })
}


/** Convert methods that are not async/Promise but use similar pattern func(callback, errback) to async.
 * This way they can easily be used in modern JS with await
 * @param {*} src
 * @param {*} func
 * @returns
 */
export async function cbToPromise(src, func) {
  return new Promise((resolve, reject) => {
    src[func](resolve, reject)
  })
}

export const fileToFsEntry = (entry, fsDir) => {
  entry.fsPath = fsDir + entry.name
  return entry
}
