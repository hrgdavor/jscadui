import { expect, it } from 'vitest'

import { require } from '../src/require.js'
import { makeReadFileNode } from '../src/readFileNode.js'

import { transformcjs } from '@jscadui/transform-babel'

const base = 'fs:/'
const readFileNode = makeReadFileNode('test/solo/')

it('no_transform', () => {
  let script = require('./simple.js', null, readFileNode, base)
  expect(script.main({size:11})).toEqual('cube11')
})

it('transform esm', () => {
  let script = require('./simple.esm.js', transformcjs, readFileNode, base)
  expect(script.main({size:22})).toEqual('cube22')
})

it('transform typescript', () => {
  let script = require('./simple.ts', transformcjs, readFileNode, base)
  expect(script.main({size:33})).toEqual('cube33')
})
