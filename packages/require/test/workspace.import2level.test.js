import { transformcjs } from '@jscadui/transform-babel'
import { expect, it } from 'vitest'

import { makeReadFileNode } from '../src/readFileNode.js'
import { require, requireCache } from '../src/require.js'

const root = 'test/workspace/import2level/'
const base = 'fs:/'

it('no_transform', () => {
  const readFileNode = makeReadFileNode(root)
  let pack = JSON.parse(readFileNode('/package.json'))
  pack.workspaces?.forEach(w => {
    // todo move to utility
    let pack = JSON.parse(readFileNode(`/${w}/package.json`))
    let name = pack?.name || w
    let main = pack?.main || 'index.js'
    requireCache.alias[name] = new URL(`./${w}/${main}`, base).toString()
  })
  let script = require('/index.js', transformcjs, readFileNode, base, base)
  expect(script.main({ size: 33 })).toEqual('cube33')
})
