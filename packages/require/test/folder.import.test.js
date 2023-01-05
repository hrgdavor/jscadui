import { expect, it } from 'vitest'

import { require } from '../src/require.js'
import { readFileNode } from '../src/readFileNode.js'

import { transformcjs } from '@jscadui/transform-babel'

it('no_transform', () => {
  let script = require('./index.js', transformcjs, readFileNode, 'fs:/test/folder/import/')
  expect(script.main({size:11})).toEqual('cube11')
})
