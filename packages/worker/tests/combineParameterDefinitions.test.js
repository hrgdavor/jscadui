import { expect, test } from 'vitest'

import { combineParameterDefinitions } from '../src/getParameterDefinitionsFromSource.js'

test('combineParameterDefinitions()', () => {
  let a = []
  const b = undefined
  let result = combineParameterDefinitions(a, b)
  expect(result).toStrictEqual([])

  const c = []
  result = combineParameterDefinitions(a, c)
  expect(result).toStrictEqual([])

  // add d to combination
  const d = [{name: "d", value: "d"}]
  result = combineParameterDefinitions(a, d)
  expect(result).toStrictEqual(d)

  // replace e in combination
  a = [{name : "e", value: "old"}]
  const e = [{name: "e", value: "new"}]
  result = combineParameterDefinitions(a, e)
  expect(result).toStrictEqual(e)

  // replace b in middle of combinations
  a = [
    {name: "a", value: "a"},
    {name: "b", value: "old"},
    {name: "c", value: "a"},
  ]
  const f = [{name: "b", value: "new"}]
  result = combineParameterDefinitions(a, f)
  const expected = [
    {name: "a", value: "a"},
    {name: "b", value: "new"},
    {name: "c", value: "a"},
  ]
  expect(result).toStrictEqual(expected)
})
