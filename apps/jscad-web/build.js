import { copyTask, parseArgs } from '@jsx6/build'
import { mkdirSync } from 'fs'
import liveServer from 'live-server'

import { buildBundle, buildOne } from './src_build/esbuildUtil.js'

// *************** read parameters **********************
const { dev, port = 5120 } = parseArgs()
const watch = dev
const outDir = dev ? 'build_dev' : 'build'

/******************************* SETUP  *************/
mkdirSync(outDir, { recursive: true })

/**************************** COPY STATIC ASSETS  *************/

copyTask('static', outDir, { include: [], exclude: [], watch, filters: [] })

/**************************** BUILD JS that is static *************/
await buildBundle(outDir + '/build', 'bundle.threejs.js', { globalName: 'THREE' })
await buildBundle(outDir + '/build', 'bundle.jscad_modeling.js', { format: 'cjs' })

/**************************** BUILD JS THAT can change and watch if in dev mode *************/
await buildOne('src_bundle', outDir + '/build', 'bundle.worker.js', watch, { format: 'iife' })

await buildOne('src_bundle', outDir, 'bundle.fs-serviceworker.js', watch, { format: 'iife' })


/**************************** BUILD MAIN JS and watch if in dev mode *************/
await buildOne('.', outDir, 'main.js', watch, { format: 'esm' })


/**************************** LIVE SERVER if in dev mode *************/
if (dev) liveServer.start({ root: outDir, port, open: false })

//*/
