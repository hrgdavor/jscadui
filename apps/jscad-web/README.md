# JSCAD web app

This is the JSCAD web application hosted at https://jscad.app

If you want to discuss jscad or jscadui, please join us on discord: https://discord.gg/AaqGskur93

## Running Locally

You must install modules from root of the project because it uses npm workspaces.

After cloning the project, go to the root folder of the checked out jscadui repo. Then install npm dependencies by running:

```
npm i
```

To start the local development server, go to the `apps/jscad-web` directory and run:

```
npm start
```

this will start the dev server without generating jscad docs, which is like ok 99% of time.

to start dev server that also has docs run

```
npm run start:full
```

## External editor

You can edit your jscad scripts/projects in editor of your own choice and have jscad.app preview result when you save.

Just save your jscad script/project on your drive, and use drag&drop to drop the project folder or single script onto jscad.app. It will check file changes periodicaly and reload changed files.

For projects, you must drag&drop the folder and jscad.app will look into `package.json` for `main`. If you
do not have `package.json` then jscad.app will try following.

- index.js
- index.ts
- FOLDER_NAME.js
- FOLDER_NAME.ts

jscad.app does not read node_modules for now, but loads dependencies from jsdelivr, and some modules may be bundled with jscad.app to avoid going to jsdelivr:

```js
const bundles = {
  // local bundled alias for common libs.
  '@jscad/modeling': toUrl('./build/bundle.jscad_modeling.js'),
  '@jscad/io': toUrl('./build/bundle.jscad_io.js'),
  '@jscad/csg': toUrl('./build/bundle.V1_api.js'),
}
```

*you can see which exactly in [main.js](main.js) in case this readme is out of sync with source*

## Deployment

To start the production server run:

```
npm run serve
```

# using url to load external script and CORS

If you want to share a script from your website you should setup CORS, and make sure to use HTTPS!

if you do not setup CORS [jscad.app](https://jscad.app) can fallback to `/remote` to download the script, but this workaround  may not be available forever (such enpoint could be abused to hide IP for attacks).


For hostings (that are uaually cheap and abundant) on CPanel adding .htaccess to your folder should work.
```
<IfModule mod_headers.c>
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Headers "origin, x-requested-with, content-type"
Header set Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
</IfModule>
```

If you are using github you should be fine, as gists and github pages have those CORS headers.

# using data url

you can use data url to pack the script into the url

- [example](https://jscad.app/#data:application/javascript;base64,bW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24gbWFpbigpe3JldHVybiByZXF1aXJlKCdAanNjYWQvbW9kZWxpbmcnKS5wcmltaXRpdmVzLnNwaGVyZSh7cmFkaXVzOiA0MH0pfQ==)

*NOTICE: utf8 encoding is assumed when converting bytes to string*

# using data url and gzip

you can also use gzip to minimize the length of the url.

- [example](https://jscad.app/#data:application/gzip;base64,H4sICN1FqGUAA3Rlc3QADcrBDkAwDADQu6/YjV3GxUUi8SuLFRXrpl1FIv6dd34xBT3AwZ0TFxkXpblgIhM9UmMfhqJMhuFUZGjqaZfZhzamAAfSWluXGSMWvECc5A3+9LAPqDKYvnvtW33S8ZutYgAAAA==)

*NOTICE: utf8 encoding is assumed when converting bytes to string*

# using github gists to share scripts

- To reference latest version, no commit hash should be in URL:
- max-age=300 for raw gist cannot be lowered
- publish change, wait for 5 minutes before sharing with ppls that gist was changed

