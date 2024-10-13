# require


## import.meta.url

- [swc impl](https://github.com/swc-project/swc/pull/4670) - explore, seems nodejs specific `require("url").pathToFileURL(__filename).toString()`


## import.meta.resolve

MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve

This is an implementation of import/require to be able to run JavaScript(and TypeScript) files.
It is primarily used in jscad.app to execute the scripts.

I admire the JSFiddle, CodePen, stackBlitz, and any other such tool I may not know about, but
currently my impression is that most of the effort is put into monetizing this knowledge, instead
of consolidating it for the community to thrive on top of it. Tools like Vite are very nice
but it is making developers lazy and I do not like the systems that create complex engines with plugins.
I prefer tools that do their own thing well, combined with shared knowledge how to combine them.

Hopefully this `require` implementation will enable running complex jscad scripts, and allow some other
similar projects by using the package, or learning from it.

There is a long history of JS modules, from non-existent to multiple attempts, to finally ESM,
this package will help handle those, and document the limits, where you must intervene or provide
extra information for a specific import. It remains to be seen how far can this go to make imports
work automatically.

## import.meta.url

When running a ESM module it is useful for a module to know it's location to load additional
resources like WASM file. Try to `eval` ESM script that uses `import.meta.url` and it will fail. Fortunately `module.meta.url` is same length as `import.meta.url` so simply replacing it before evaluation will not affect line numbers in source-maps.

## correct line numbers in console.log & stack traces

Initially attempt used `new Function` was used to run the script and pass parameters: `require, exports, module`. 
Unfortunately new Functions screws with sourcemaps as it adds a prefix to the source. Next solution is with `eval` to do the same without prefix.
Then with that we need to be nice to bundlers and use (indirect eval)[https://esbuild.github.io/content-types/#direct-eval]
Then again `self` is not available in nodejs. A lot of hoops need to be jumped to `eval` the code and get nice stack traces etc.

The final code for our use-case looks like this: 

```js
export const runModule = (typeof self === 'undefined' ? eval : self.eval)(
  '(require, exports, module, source)=>eval(source)',
)
```

To get the proper file-name along with correct line numbers you must add to the end of the script: `script + '\n//# sourceURL='+url` . You can add more variables to the script environment if needed.

## loading from CDN

### jscad/modeling

It contains `unpkg` entry in package.json that point to bundled file.

### pantograph2d

This library defines `main` in package.json, and using that instead of bundled jsdelivr allowed
our require function to load the lib and internal deps it has.

