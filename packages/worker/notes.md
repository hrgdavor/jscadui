# dataTransfer

- `.files` 
  - can be transfered to the worker
  - will not update `lastModified` when changed
- `.items` - can not be transfered to worker
  - can provide https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry
  - use `getAsEntry` and `webkitGetAsEntry` https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
  - use `item.file(callback)` to read file metadata periodically to get new `lastModified` value if changed
  - file provided by the callback can be transfered

