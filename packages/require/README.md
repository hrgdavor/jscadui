# fs-provider

Provider that fills cache for `fs-service-worker` that you need in your main script to fill files data.

Use case is for creating a virtual fodler taht can be accessed by javascript uring fetch or sync/async XMLHttpRequest. 

## temp caches

This require wrapper will be used for running jscad scripts that might be whole project folders. In that case it can have local libraries in workspaces, and also will have multiple files. It is important to separate global cache (that caches possibly things like '@jscad/modeling' or some other library, versus modules or files from uploaded folder). When new folder is uploaded we should be able to purge only files cached from previous folder, and not others.

Maybe this use case for temp caches will prove to be not so useful, so we also need to support full cache purging.

# URL - useful to resolve relative paths

Regardless if url is something `http://` or some fake prefix `fs:/` the `URL` class can be used to resolve paths relative to a file for us. We do not even need to cut the file name out, it will use the folder as basis like you would expect for html resources.

```js
new URL('/index.js','fs:/bb/aaa/ccc/bla.js')
// .pathname: /index.js
new URL('./index.js','fs:/bb/aaa/ccc/bla.js')
// .pathname: /bb/aaa/ccc/index.js
new URL('../index.js','fs:/bb/aaa/ccc/bla.js')
// .pathname: /bb/aaa/index.js
```