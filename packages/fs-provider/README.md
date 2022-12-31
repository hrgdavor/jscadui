# fs-provider

Provider that fills cache for `fs-service-worker` that you need in your main script to fill files data.

Use case is for creating a virtual folder that can be accessed by JavaScript during fetch or sync/async XMLHttpRequest. 

## utilities for `RileReader`

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

