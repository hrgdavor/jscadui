import { runEsbuild } from '@jsx6/build'
// import { runEsbuild } from './runEsbuild.js'
import * as esbuild from 'esbuild'
import {existsSync, statSync} from 'fs'

export const esbDef = {
  jsxFactory: 'h',
  jsxFragment: 'null',
  format: 'esm',
  loader: {
    '.js': 'tsx',
    '.jsx': 'tsx',
  },
  bundle: true,
  minify: true,
  skipExisting: true,
  sourcemap: true,
}

const bundleDef = {
  ...esbDef,
  format: 'iife',
}

export const buildBundle = (outDir, bundle, {srcDir='src_bundle', skipExisting = true, ...options})=>{
  let file = `${srcDir}/${bundle}`
  let outfile = `${outDir}/${bundle}`
  if(skipExisting && existsSync(outfile) && lastMod(file) > lastMod(outfile)){
    skipExisting = false
  }
  return runEsbuild(esbuild,{...bundleDef, ...options, skipExisting, entryPoints:[file], outfile})
}

export const buildOneIfNeeded = (outDir, file, options={})=>{
  let outfile = options.outfile || `${outDir}/${file}`
  return runEsbuild(esbuild,{...esbDef, ...options, skipExisting: true, entryPoints:[file], outfile})
}

export const buildOne = (srcDir, outDir, path, watch, options={})=>{
  let file = `${srcDir}/${path}`
  let outfile = options.outfile || `${outDir}/${path}`
  return runEsbuild(esbuild,{...esbDef, skipExisting:false, ...options, watch, entryPoints:[file], outfile})
}

function lastMod(path){
  const stat = statSync(path)
  return stat.mtimeMs
}