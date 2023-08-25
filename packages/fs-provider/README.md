# fs-provider


Provider that fills cache for `fs-service-worker` that you need in your main script to fill files data.

Use case is for creating a virtual folder that can be accessed by JavaScript during fetch or sync/async XMLHttpRequest. 

## important known issue

Service worker does not work after hard refresh: CTRL+F5 or CTR*+refresh. You can work around this by calling regular refresh.
Service worker also does not work at all in incognito mode in Firefox, and there maybe other reasons it does not work.

It is also important to check if reload was already called to avoid infinite reloading of the page. Here is a sample snippet that you can customize.

```js
if('serviceWorker' in navigator){
  // initialize serviceWorker here, or elsewhere with the above check

  // call the following code after initializing the service worker
  if (!navigator.serviceWorker.controller) {
    // service workers are disabled on hard-refresh, so need to reload.
    // to prevent a reload loop, don't reload again within 3 seconds.
    const lastReload = localStorage.getItem('lastReload')
    if (!lastReload || Date.now() - lastReload > 3000) {
      console.error('cannot start service worker, reloading')
      localStorage.setItem('lastReload', Date.now())
      location.reload()
    } else {
      console.error('cannot start service worker, reload required')
    }
  }  
}

```

`'serviceWorker' in navigator` will return false in incognito mode in Firefox

`navigator.serviceWorker.controller` will be falsy, but only after you try to load a service worker!.


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