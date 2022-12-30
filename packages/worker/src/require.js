let baseURI=''

export const setBaseURI = u=>baseURI=u

// https://esbuild.github.io/content-types/#direct-eval
// we need regular eval to pass parameters: require, exports, module
// but to be nice to bundlers we need indirect eval to pruce such function
export const runModule = self.eval('(require, exports, module, source)=>eval(source)')

export function require(url) {
  url = require.alias[url] || url
  if (url[0] != '/' && url.substr(0, 2) != './' && url.substr(0, 4) != 'http') url = 'https://unpkg.com/' + url
  let exports = require.cache[url] // get from cache
  if (!exports) {
    // not cached
    const module = requireModule(url)
    require.cache[url] = exports = module.exports // cache obj exported by module
  }
  return exports // require returns object exported by module
}

function requireFile(url) {
  try {
    const X = new XMLHttpRequest()
    X.open('GET', new URL(url, baseURI), 0) // sync
    X.send()
    if (X.status && X.status !== 200) throw new Error(X.statusText)
    return X.responseText
  } catch (e) {
    console.log('problem loading url ', url, 'base', baseURI, ' error:', e.message)
    throw e
  }
}

export function requireModule(url, source) {
  if (!source && !url) throw new Error('You must define either a script source or urls for script download')
  try {
    const exports = {}
    if (!source) source = requireFile(url)
    const module = { id: url, uri: url, exports: exports, source } // according to node.js modules
    /* const anonFn = new Function('require', 'exports', 'module', source) // create a Fn with module code, and 3 params: require, exports & module
    damn Function constructor creates function with 2 newlines at the begining before source starts
    the prefix is: `function anonymous(a,b\n) {\n`
    it messes up the line numbers for the initial script log lines and stack traces ( they report +2 line numbers).
    that is why we use runModule eval to avoid prepending anything */
    runModule(require, exports, module, source)
    return module
  } catch (err) {
    console.error('Error loading module ' + url, err.message)
    throw err
  }
}

require.cache = {}
require.alias = {}
