const errorBar = document.getElementById('error-bar')
const errorName = document.getElementById('error-name')
const errorMessage = document.getElementById('error-message')

/**
 * @param {unknown} error
 */
export const setError = error => {
  if (error) {
    const name = (error.name || 'Error') + ': '
    errorName.innerText = name
    const message = formatStacktrace(error)
    errorMessage.innerText = message
    errorBar.classList.add('visible')
  } else {
    errorBar.classList.remove('visible')
  }
}

/**
 * Extracts the stacktrace for an error thrown from inside an eval function.
 * Returns the stacktrace as a string for just the code running inside eval.
 *
 * @param {Error} error
 * @returns {string} - stacktrace for code inside eval
 */
const formatStacktrace = (error) => {
  // error.stack is not standard but works on chrome and firefox
  const stack = error.stack
  if (!stack) return error.toString()

  // chrome stacktrace (script error, syntax error):
  //  ReferenceError: gggggg is not defined
  //  at causeErr (./jscad.model.js:51:3)
  //  at main (./jscad.model.js:46:27)
  //  at ve (http://localhost:5120/build/bundle.worker.js:28:2964)
  //  at Pt (http://localhost:5120/build/bundle.worker.js:28:3731)
  //  at async http://localhost:5120/build/bundle.worker.js:14:3218
  const cleaned = stack
    .split('\n')
    .filter(line => !line.includes('bundle.worker.js'))

  if (!stack.includes(error.message)) cleaned.unshift(error.message)
  return cleaned.join('\n')
}