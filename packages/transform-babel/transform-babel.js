import { availablePlugins, transform } from '@babel/standalone'

import { preventInfiniteLoops } from './src/preventInfiniteLoops'

availablePlugins['preventInfiniteLoops'] = preventInfiniteLoops

export const transformDefaults = {
  retainLines: true,
  // plugins: ['syntax-object-rest-spread', 'preventInfiniteLoops'],
  plugins: ['syntax-object-rest-spread'],
  presets: ["typescript"],
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

function _transform(code, filename, options = {}, append = {}) {
  const op = {
    ...transformDefaults,
    ...options,
    filename
  }
  combineAppend(op, append)
  return transform(code, op)
}

export const transformcjs = (code, filename, options = {}, append = {}) => {
  options = { sourceMaps: 'inline', ...options }
  combineAppend(append, { plugins: ['transform-modules-commonjs'] })
  return _transform(code, filename, options, append)
}
