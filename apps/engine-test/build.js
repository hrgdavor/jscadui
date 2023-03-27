import { runEsbuild } from '@jsx6/build'
import { copyTask, parseArgs, watchDir } from '@jsx6/build'
import * as esbuild from 'esbuild'
// import { copyTask } from './src_build/copyTask.js'
import { mkdirSync, readdirSync } from 'fs'
import liveServer from 'live-server'

import { buildBundle, buildOne, buildOneIfNeeded, esbDef } from './src_build/esbuildUtil.js'

// *************** read parameters **********************
const { dev, port = 5120 } = parseArgs()
const watch = dev
const outDir = dev ? 'build_dev' : 'build'

/******************************* SETUP  *************/
mkdirSync(outDir, { recursive: true })

/**************************** COPY STATIC ASSETS  *************/

copyTask('public', outDir, { include: [], exclude: [], watch, filters: [] })
copyTask('static', outDir, { include: [], exclude: [], watch, filters: [] })

/**************************** BUILD JS that is static *************/
await buildBundle(outDir + '/build', 'bundle.regl.js', { globalName: 'REGL' })
await buildBundle(outDir + '/build', 'bundle.babylonjs.js', { globalName: 'BABYLON' })
await buildBundle(outDir + '/build', 'bundle.threejs.js', { globalName: 'THREE' })
await buildBundle(outDir + '/build', 'bundle.jscad_modeling.js', { format: 'cjs' })

/**************************** BUILD JS THAT can change and watch in dev *************/
await buildOne('src_bundle', outDir + '/build', 'bundle.worker.js', watch, { format: 'iife' })

await buildOne('src_bundle', outDir, 'bundle.fs-serviceworker.js', watch, { format: 'iife' })

await buildOne('.', outDir, 'main.js', watch, { format: 'esm' })

/**************************** LIVE SERVER  *************/

if (dev) liveServer.start({ root: outDir, port, open: false })

//*/
