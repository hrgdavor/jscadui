# dataTransfer

- `.files` 
  - can be transfered to the worker
  - will not update `lastModified` when changed
- `.items` - can not be transfered to worker
  - can provide https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry
  - use `getAsEntry` and `webkitGetAsEntry` https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
  - use `item.file(callback)` to read file metadata periodically to get new `lastModified` value if changed
  - file provided by the callback can be transfered

## new Function madafakka two linex extra

### original
I was pulling my hair out from using new Function() ... to load bundled code with inline sourcemaps.
this is nice because it opens more workflows, and allows for debugging and proper line numbers in console.log or stack trace
but ... lines were shifted by +2 ... and then I was digging if the bundler is the issues ... until I tried fn.toString()
```js
console.log(new Function('a','b','return a+b').toString())
// output:
function anonymous(a,b
) {
return a+b
}
```
dammit ... the bloody thing adds a prefix that has 2 newlines ... 
### First attempt
so I 
```js
// converted
const anonFn = new Function('require', 'exports', 'module', source)
// to
self.eval('function anonFn(require, exports, module){'+source+'}')
```
also this:  https://esbuild.github.io/content-types/#direct-eval

Well this workes only if nothing important is in the first line. And it turns out if we minify it, the bundle is entirely in the first line, and we again get some offset in line numbers.

### Second atempt
One fix is adding a comment banner to output, but then you have to be aware of it when bundling, and for external deps you have no control of the bundling process....

so, to avoid adding any offset to the code and also play nice with bundlers regarding eval 
```js
const runModule = self.eval('(require, exports, module, source)=>eval(source)')
```
