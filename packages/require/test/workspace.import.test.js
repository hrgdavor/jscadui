import { transformcjs } from '@jscadui/transform-babel'
import { expect, it } from 'vitest'

import { readFileNode } from '../src/readFileNode.js'
import { require, requireCache } from '../src/require.js'

const base = 'fs:/test/workspace/import/'

it('no_transform', () => {
  let pack = JSON.parse(readFileNode('./package.json', { base }))
  console.log('pack', pack)
  pack.workspaces?.forEach(w => {
    requireCache.alias['util'] = new URL(`./${w}/index.js`, base).toString()
  })
  let script = require('./index.js', transformcjs, readFileNode, base)
  expect(script.main({ size: 11 })).toEqual('cube11')
})
