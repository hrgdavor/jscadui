import { expect, it } from 'vitest'

import { require } from '../src/require.js'
import { makeReadFileNode } from '../src/readFileNode.js'

const base = 'fs:/'
const readFileNode = makeReadFileNode('test/folder/require/')

it('no_transform', () => {
  let script = require('./index.js', null, readFileNode, base)
  expect(script.main({size:11})).toEqual('cube11')
})
