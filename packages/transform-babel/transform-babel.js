import { availablePlugins, transform } from '@babel/standalone'

import { preventInfiniteLoops } from './src/preventInfiniteLoops'

import * as pluginTransformTypescript from '@babel/plugin-transform-typescript'

availablePlugins['preventInfiniteLoops'] = preventInfiniteLoops
availablePlugins['@babel/plugin-transform-typescript'] = pluginTransformTypescript

export const transformDefaults = {
  retainLines: true,
  // plugins: ['syntax-object-rest-spread', 'preventInfiniteLoops'],
  plugins: ['syntax-object-rest-spread'],
  presets: [],
}

function combineAppend(options = {}, append = {}) {
  for (let p in append) {
    if (options[p]) {
      if (append[p] instanceof Array) options[p] = [...options[p], ...append[p]]
      else options[p] = { ...options[p], ...append[p] }
    } else {
      options[p] = append[p]
    }
  }
}

function _transform(code, options = {}, append = {}) {
  const op = {
    ...transformDefaults,
    ...options,
  }
  combineAppend(op, append)
  return transform(code, op)
}

export const transformcjs = (code, options = {}, append = {}) => {
  options = { sourceMaps: 'inline', ...options }
  combineAppend(append, { plugins: ['transform-modules-commonjs', '@babel/plugin-transform-typescript'] })
  return _transform(code, options, append)
}
