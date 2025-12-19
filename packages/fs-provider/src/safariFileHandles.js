
async function handleFromEntry(entry)
{
  const handle = {
      name: entry.name,
      kind: entry.isFile      ? 'file' :
            entry.isDirectory ? 'directory' :
                                'unknown',
    }

  if (handle.kind === 'file') {
    handle.getFile = () => new Promise((resolve, reject) =>
      entry.file(resolve, reject))
  }
  else if (handle.kind === 'directory') {
    handle.values = async function* () {
        const reader = entry.createReader()
        while (true) {
          const entries = await new Promise((resolve, reject) =>
            reader.readEntries(resolve, reject))
          if (!entries.length) {
            break
          }
          for (const e of entries) {
            try {
              yield await handleFromEntry(e)
            }
            catch {
              continue
            }
          }
        }
      }
  }
  else {
    throw new TypeError('Entry must be file or directory')
  }

  return handle
}


/**
 *
 * @param {DataTransferItem} dti
 * @returns {Promise<FileSystemHandle>}
 */
export async function safariGetAsHandle(dti)
{
  return handleFromEntry(dti.webkitGetAsEntry())
}

