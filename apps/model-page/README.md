# HTML page example

This is a project that aims to build a simple set of scripts that can be included in a HTML page to show JSCAD models. It is work in progress, but will likely improve based on user feedback.

To run the demo first go to root folder of this repository and run `npm i`. 

then come back to this project and start it

```
cd apps/model-page
npm start
```

you must run `npm i` it the project root only when you freshly checkout or after pull.


# bundling and converting scripts

jscad application is complex and can run different flavors of scripts, but it comes with a size cost. It uses babel to convert typescript and ES modules to require syntax, because that is only variant that can be used in eval ATM.

To simplify your application you can write 


To bundle your jscad scripts you can use this sample `esbuild` command:

```sh
esbuild .\script.js --bundle --external:@jscad/modeling --outdir=build
--sourcemap=inline --format=cjs --watch
```

This way `@jscad/modeling` will not be included in the bundle, and that is ok because worker has it available unlike other dependencies that you might have. You can drag and drop the generated script on https://jscad.app and develop it even further before including with your HTML page.

`--sourcemap=inline` option is gives line numbers when errors occur, it is nice while developing, but can be omitted for production build.
