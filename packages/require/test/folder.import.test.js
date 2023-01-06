import { expect, it } from 'vitest'

import { require } from '../src/require.js'
import { makeReadFileNode } from '../src/readFileNode.js'

import { transformcjs } from '@jscadui/transform-babel'

const base = 'fs:/'
const readFileNode = makeReadFileNode('test/folder/import/')

it('no_transform', () => {
  let script = require('./index.js', transformcjs, readFileNode, base)
  expect(script.main({size:11})).toEqual('cube11')
})
