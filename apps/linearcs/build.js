import { copyTask, parseArgs } from '@jsx6/build'
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import liveServer from 'live-server'
import {serve} from './serve.js'

import { buildBundle, buildOne } from './src_build/esbuildUtil.js'

// *************** read parameters **********************
const { dev, port = 5131, serve:serveBuild=false} = parseArgs()
const watch = dev
const outDir = dev ? 'build_dev' : 'build'
const docsDir = 'jscad/docs'

/******************************* SETUP  *************/
mkdirSync(outDir, { recursive: true })

/**************************** COPY STATIC ASSETS  *************/

copyTask('static', outDir, { include: [], exclude: [], watch, filters: [] })

/**************************** BUILD JS that is static *************/
// await buildBundle(outDir + '/build', 'bundle.two.js', { globalName: 'Two', skipExisting: false })


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
