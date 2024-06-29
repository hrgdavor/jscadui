import { copyTask, parseArgs } from '@jsx6/build'
import { mkdirSync } from 'fs'
import liveServer from 'live-server'

import { buildBundle, buildOne } from './esbuildUtil.js'
import { serve } from './serve.js'

// *************** read parameters **********************
const { d, dev: isDev = d, port = 5122, serve: serveBuild = false } = parseArgs()
const watch = isDev
const outDir = isDev ? 'build_dev' : 'build'
const assetDir = outDir + '/assets'

/******************************* SETUP  *************/
mkdirSync(outDir, { recursive: true })

/**************************** COPY STATIC ASSETS  *************/

copyTask('static', outDir, { include: [], exclude: [], watch, filters: [] })

/**************************** BUILD JS that is static *************/
await buildBundle(assetDir, 'bundle.threejs.js', { globalName: 'THREE', skipExisting: isDev })
await buildBundle(assetDir, 'bundle.jscad_modeling.js', { format: 'cjs', skipExisting: isDev })
await buildBundle(assetDir, 'bundle.jscad_io.js', { format: 'cjs', skipExisting: isDev })
await buildBundle(assetDir, 'bundle.jscadui.transform-babel.js', {
  globalName: 'jscadui_transform_babel',
  skipExisting: isDev,
})

/**************************** BUILD JS THAT can change and watch if in dev mode *************/
await buildOne('src/bundle', assetDir, 'bundle.worker.js', watch, { format: 'esm' })

/**************************** BUILD MAIN JS and watch if in dev mode *************/
await buildOne('.', assetDir, 'main.js', watch, { format: 'esm', outbase:'src' })

/**************************** LIVE SERVER if in dev mode *************/
if (isDev) liveServer.start({ root: outDir, port, open: false})
else if (serveBuild) serve(port)

//*/
