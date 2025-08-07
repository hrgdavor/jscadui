import { copyTask, parseArgs } from '@jsx6/build'
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import liveServer from 'live-server'
import {serve} from './serve.js'

import { buildBundle, buildOne } from './src_build/esbuildUtil.js'

// *************** read parameters **********************
const { dev, port = 5120, serve:serveBuild=false, skipDocs=false } = parseArgs()
const watch = dev
const outDir = dev ? 'build_dev' : 'build'
const docsDir = 'jscad/docs'
// if docs dir does not exist, then clone jscad and run `npm run docs` to generate it
if (!skipDocs &&!existsSync(docsDir)) {
  console.log('generating docs')
  if (!existsSync('jscad')) {
    // TODO: faster to fetch https://github.com/jscad/OpenJSCAD.org/archive/refs/heads/master.zip
    execSync('git clone https://github.com/jscad/OpenJSCAD.org jscad')
  }
  execSync('cd jscad && npm install && npm run docs')
}

/******************************* SETUP  *************/
mkdirSync(outDir, { recursive: true })

/**************************** COPY STATIC ASSETS  *************/

copyTask('static', outDir, { include: [], exclude: [], watch, filters: [] })
copyTask('examples', outDir+'/examples', { include: [], exclude: [], watch, filters: [] })
copyTask('lib-demo', outDir+'/lib-demo', { include: [], exclude: [], watch, filters: [] })
copyTask('projects', outDir+'/projects', { include: [], exclude: [], watch, filters: [] })
//in dev mode dont try to sync docs, just copy the first time 
if(!skipDocs && !(dev & existsSync(outDir + "/docs"))){
  // this task is heavy
  copyTask(docsDir, outDir + "/docs", { include: [], exclude: [], watch:false, filters: [] })
}

/**************************** BUILD JS that is static *************/
await buildBundle(outDir + '/build', 'bundle.threejs.js', { globalName: 'THREE', skipExisting: dev })
await buildBundle(outDir + '/build', 'bundle.jscad_modeling.js', { format: 'cjs', skipExisting: dev })
await buildBundle(outDir + '/build', 'bundle.jscad_io.js', { format:'cjs', skipExisting: dev })
await buildBundle(outDir + '/build', 'bundle.V1_api.js', { format:'cjs', skipExisting: dev })
await buildBundle(outDir + '/build', 'bundle.jscadui.transform-babel.js', { globalName: 'jscadui_transform_babel', skipExisting: dev })
await buildBundle(outDir + '/build', 'bundle.sw-jscad.js', { format: 'cjs', skipExisting: dev })
await buildBundle(outDir + '/build', 'bundle.sw-jscad-ui.js', { format: 'cjs', skipExisting: dev })
await buildBundle(outDir + '/build', 'bundle.sw-jscad-families.js', { format: 'cjs', skipExisting: dev })
await buildBundle(outDir + '/build', 'bundle.sw-jscad-builders.js', { format: 'cjs', skipExisting: dev })

/**************************** BUILD JS THAT can change and watch if in dev mode *************/
await buildOne('src_bundle', outDir + '/build', 'bundle.worker.js', watch, { format: 'iife' })

await buildOne('src_bundle', outDir, 'bundle.fs-serviceworker.js', watch, { format: 'iife' })


/**************************** BUILD MAIN JS and watch if in dev mode *************/
const loader = {
  '.example.js': 'text', // parse example files as text
  '.js': 'tsx',
  '.jsx': 'tsx',
}
await buildOne('.', outDir, 'main.js', watch, { format: 'esm', loader })


/**************************** LIVE SERVER if in dev mode *************/
// docs folder is too heavy for watch
if (dev) 
  liveServer.start({ root: outDir, port, open: false, ignore: outDir+'/docs' })
else 
  if(serveBuild) serve(port)

//*/
