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
  //  ReferenceError: gggggg is not defined
  //  at causeErr (./jscad.model.js:51:3)
  //  at main (./jscad.model.js:46:27)
  //  at ve (http://localhost:5120/build/bundle.worker.js:28:2964)
  //  at Pt (http://localhost:5120/build/bundle.worker.js:28:3731)
  //  at async http://localhost:5120/build/bundle.worker.js:14:3218
  const cleaned = error.stack
    .split('\n')
    .filter(line => !line.includes('bundle.worker.js'))

  return [error.message, ...cleaned].join('\n')
}
