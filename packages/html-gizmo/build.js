import * as esbuild from 'esbuild'
import { readFileSync, unlinkSync, writeFileSync } from 'fs'

esbuild.buildSync({
  entryPoints: ['gizmo.css'],
  minify: true,
  outfile: 'tmp.css',
})

let src = readFileSync('index.js').toString()
let css = readFileSync('tmp.css').toString()

src = src.replace("import style from './gizmo.css?inline'", 'const style =`' + css + '`;')
writeFileSync('_index.js', src)
const opts = {
  entryPoints: ['_index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
}
esbuild.buildSync({
  ...opts,
  format: 'cjs',
  outfile: 'dist/cjs.js',
})
esbuild.buildSync({
  ...opts,
  format: 'iife',
  globalName: 'JscadUIGizmo',
  outfile: 'dist/iife.js',
})
esbuild.buildSync({
  ...opts,
  format: 'esm',
  outfile: 'dist/esm.js',
})

unlinkSync('_index.js')
unlinkSync('tmp.css')
