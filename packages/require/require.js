/* TODO
- different urls base for local files and modules
- require localized for a specific local file
- require localized for a module url (if module calls require ./)
- use local cache for local files
- use moduleCache for modules
- add .js to local requires (but for modules)
  - local files start with ./ or ../  and others are consideerd modules

  */


// https://esbuild.github.io/content-types/#direct-eval
// we need regular eval to pass parameters: require, exports, module
// but to be nice to bundlers we need indirect eval to pruce such function
export const runModule = self.eval('(require, exports, module, source)=>eval(source)')

const stripTrailingSlash = path => (path?.endsWith('/') ? path.substring(0, path.length - 1) : path)

export const relativeRequire = (localRoot, moduleRoot) => {
  return url => require(url, localRoot, moduleRoot)
}

export const relativeRequireFile = localRoot => {
  return url => requireFile(url, localRoot)
}

export function require(url, localRoot='', moduleRoot='/') {
  url = require.alias[url] || url
  if (url[0] != '/' && url.substr(0, 2) != './' && url.substr(0, 4) != 'http') url = 'https://unpkg.com/' + url
  let exports = require.localCache[url] // get from cache
  if (!exports) {
    // not cached
    const module = requireModule(url)
    require.localCache[url] = exports = module.exports // cache obj exported by module
  }
  return exports // require returns object exported by module
}

function requireFile(url, localRoot='') {
  try {
    const X = new XMLHttpRequest()
    X.open('GET', new URL(url, localRoot), 0) // sync
    X.send()
    if (X.status && X.status !== 200) throw new Error(X.statusText)
    return X.responseText
  } catch (e) {
    console.log('problem loading url ', url, 'base', localRoot, ' error:', e.message)
    throw e
  }
}

export function requireModule(url, source, _require=require) {
  if (!source && !url) throw new Error('You must define either a script source or urls for script download')
  try {
    const exports = {}
    if (!source) source = requireFile(url)
    const module = { id: url, uri: url, exports: exports, source } // according to node.js modules
    module.require = _require
    /* const anonFn = new Function('require', 'exports', 'module', source) // create a Fn with module code, and 3 params: require, exports & module
    damn Function constructor creates function with 2 newlines at the begining before source starts
    the prefix is: `function anonymous(a,b\n) {\n`
    it messes up the line numbers for the initial script log lines and stack traces ( they report +2 line numbers).
    that is why we use runModule eval to avoid prepending anything */
    runModule(_require, exports, module, source)
    return module
  } catch (err) {
    console.error('Error loading module ' + url, err.message)
    throw err
  }
}

require.localCache = {}
require.moduleCahce = {}
require.alias = {}
