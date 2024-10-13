# refresh badge after publishing

```sh
curl -X PURGE BADGE_URL
```

# libs source for easier integrationd with IDE

Make `index.js` that exports all from `src` to have errors in console or `console.log` display fine lanem taht is not `index.js`. In case where I had multiple libs separated, and because they are simple, code was directly in `index.js`. This caused visibility issues because many trace lines had `index.js` as source and then you need to look closely at full path to find out what lib is causing it.

Renamaing `index.js` to `lib-name.js` and declaring it as main in `package.json` works for importing and bundling, but unfortunately VSCode fails to provide navigation to source functions. 

This is a naming pattern that is forced because bad IDE support. Instead of crying about it, I prefer to tweak the naming, so I have nicer experience in IDE.

# TODO
worker re-read dir if cached listing, but file/folder not found, ot make sure it was not added in the meantime

https://fonts.bunny.net
