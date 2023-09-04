import { expect, it } from 'vitest'

import { resolveUrl } from '../src/resolveUrl.js'

const localBase = 'http://localhost:5120/swfs/5810d898-ed92-4d48-b22f-1b7d6353117a/'
const remoteBase = 'https://cdn.jsdelivr.net/npm/@jscad/io-utils/'
const root = 'http://localhost:5120/swfs/5810d898-ed92-4d48-b22f-1b7d6353117a/'
const fsRoot = 'fs:/'

it('local file', () => {
  const expected = 'http://localhost:5120/swfs/5810d898-ed92-4d48-b22f-1b7d6353117a/imported.js'
  expect(resolveUrl('./imported.js', '/index.js', root).url).toEqual(expected)
  expect(resolveUrl('./imported.js', localBase, root).url).toEqual(expected)
  expect(resolveUrl('./src/util.js', '/util/index.js', fsRoot).url).toEqual('fs:/util/src/util.js')
})

it('npm package', () => {
  expect(resolveUrl('@org/package', localBase, root).url).toEqual('https://cdn.jsdelivr.net/npm/@org/package')
  expect(resolveUrl('toppackage', remoteBase, root).url).toEqual('https://cdn.jsdelivr.net/npm/toppackage')
})

it('npm package internal file', () => {
  expect(resolveUrl('@jscad/io-utils/convertToBlob', localBase, root).url)
    .toEqual('https://cdn.jsdelivr.net/npm/@jscad/io-utils/convertToBlob.js')
})

it('npm package relative', () => {
  expect(resolveUrl('./convertToBlob.js', remoteBase, root).url)
    .toEqual('https://cdn.jsdelivr.net/npm/@jscad/io-utils/convertToBlob.js')
})

it('http url', () => {
  expect(resolveUrl('http://localhost:5120/build/bundle.jscad_modeling.js', localBase, root).url)
    .toEqual('http://localhost:5120/build/bundle.jscad_modeling.js')
})
