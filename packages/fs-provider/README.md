# fs-provider

Provider that fills cache for `fs-service-worker` that you need in your main script to fill files data.

Use case is for creating a virtual folder that can be accessed by JavaScript during fetch or sync/async XMLHttpRequest. 

## utilities for `FileReader`

[FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) is a bit old and does not use promises. It is a bit cumbersome to use. This is why in this library you have convenient `async` functions that you can use with `.then()` or `await`.

- readAsArrayBuffer - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer
- readAsBinaryString - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
- readAsDataURL - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
- readAsText - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText

To read text with `FileReader` you need:
```js
const reader = new FileReader()
reader.onload = event => {
  const text = event.target.result
  // DO SOMETHING with text
}
reader.onerror = event => console.log('error', event)
reader.readAsText(f)
```

and with mentioned utility functions you simply use `readAsText`
```js
const text = await readAsText(f)
// DO SOMETHING with text
```

## utilities for `FileSystemFileEntry`

[FileSystemFileEntry](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry) is also freaky to use because of the implementation details that are not immediately obvious.

First issue is that the `readEntries` does not return all entries in a directory, but some unspecified number, and needs to be called multiple times until empty array is returned. Check this [stackoverflow question](https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree/53058574#53058574).

Second issue is that it also uses callback that is not Promise, but alike.

Third issue is that you will get an error if you try to continue reading too soon, before the previous callback is finished. This will hit you with **"An operation that depends on state cached in an interface object was made but the state had changed since it was read from disk."**