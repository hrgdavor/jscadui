/**
 * Extracts the stacktrace for an error thrown from inside an eval function.
 * Returns the stacktrace as a string for just the code running inside eval.
 *
 * @param {Error} error
 * @returns {string} - stacktrace for code inside eval
 */
export const formatStacktrace = (error) => {
  // error.stack is not standard but works on chrome and firefox
  if (!error.stack) return error.toString()

  // chrome stacktrace (script error, syntax error):
  // at main (eval at <anonymous> (eval at <anonymous> (require.js:24:69)), <anonymous>:13:3)
  // at eval (eval at <anonymous> (require.js:24:69), <anonymous>:3:12)
  // firefox stacktrace:
  // main@http://localhost:5120/build/bundle.worker.js line 14 > eval line 1 > eval:13:3
  // @http://localhost:5120/build/bundle.worker.js line 14 > eval:1:37
  const cleaned = error.stack.split('\n')
    .filter((line) => line.includes('eval'))
    .map((line) => line.replace(/eval at <anonymous> \(.*?\), /, '')) // chrome
    .map((line) => line.replace(/^@/, '<anonymous>@')) // firefox
    .map((line) => line.replace(/@http.*?bundle.worker.js.* > eval:/, ' ')) // firefox
    .map((line) => line.replace(/^\s*(at )?/, '  at ')) // indent

  return [error.toString(), ...cleaned].join('\n')
}
