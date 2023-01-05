import { expect, it } from 'vitest'

import { require } from '../src/require.js'
import { readFileNode } from '../src/readFileNode.js'

import { transformcjs } from '@jscadui/transform-babel'

it('no_transform', () => {
  let script = require('./simple.js', null, readFileNode, 'fs:/test/solo/')
  expect(script.main({size:11})).toEqual('cube11')
})

it('transform esm', () => {
  let script = require('./simple.esm.js', transformcjs, readFileNode, 'fs:/test/solo/')
  expect(script.main({size:22})).toEqual('cube22')
})

it('transform typescript', () => {
  let script = require('./simple.ts', transformcjs, readFileNode, 'fs:/test/solo/')
  expect(script.main({size:33})).toEqual('cube33')
})
