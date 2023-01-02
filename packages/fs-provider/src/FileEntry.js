
// https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree/53058574#53058574
export const readDir = async dir => {
  if (!dir.createReader) return []
  const directoryReader = dir.createReader()
  let entries = []
  directoryReader.readEntries(x=>{console.log(x)})
  setTimeout(() => {
    directoryReader.readEntries(x=>{console.log(x)})
  }, 1);
  return []
  let readEntries = await readEntriesPromise(directoryReader)
  while (readEntries.length > 0) {
    entries.push(...readEntries)
    readEntries = await readEntriesPromise(directoryReader)
  }
  return entries
}

export const readEntriesPromise = async directoryReader => cbToPromise(directoryReader, 'readEntries')
export const filePromise = async entry => cbToPromise(entry, 'file')

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