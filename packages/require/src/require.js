/* TODO
- different urls base for local files and modules
- require localized for a specific local file
- require localized for a module url (if module calls require ./)
- use local cache for local files
- use moduleCache for modules
- inspect package.json to see if there is cjs already pre-built
- add .js to local requires (but for modules)
  - local files start with ./ or ../  and others are considered modules
- typescript import must use .js (it is a bit strange, but probably has good reasons)
*/

// initially new Function was used to pass parameters: require, exports, module
// new Functions screws with sourcemaps as it adds a prefix to the source
// we need eval to do the same without prefix
// https://esbuild.github.io/content-types/#direct-eval
// to be nice to bundlers we need indirect eval
// also self is not available in nodejs
export const runModule = (typeof self === 'undefined' ? eval : self.eval)(
  '(require, exports, module, source)=>eval(source)',
)

export const selfish = (func, context) => {
  const out = func.bind({ context })
  out.bind = newContext => selfish(func, newContext)
  out.func = func
  out.context = context
  return out
}

export function require(url, transform, _readFile, _base, readModule, moduleBase = 'https://cdn.jsdelivr.net/npm/') {
  // console.log({url, transform, _readFile, _base, readModule, moduleBase})
  let readFile = _readFile
  let base = _base
  let bundleAlias = requireCache.bundleAlias[url]
  console.log('bundleAlias', bundleAlias, url)
  url = requireCache.alias[url] || url
  if(bundleAlias){
    url = bundleAlias
  }else if (!/^(http:|https:|fs:|file:)/.test(url)) {
    if (!/(\.\/|\..\/|\/)/.test(url)) {
      console.log('read as module', url, ' moduleBase:', moduleBase)
      base = moduleBase
      readFile = readModule
    } else {
      console.log('read as file', url, ' base:', base)
      console.log('read as file', new URL(url, base).toString())
      url = new URL(url, base).toString()
    }
  } else {
    console.log('read as url', url)
  }

  let exports = requireCache.local[url] // get from cache
  if (!exports) {
    // not cached
    let source
    try {
      source = readFile(url, { base })
    } catch (e) {
      if (url.endsWith('.js')) {
        try {
          url = url.substring(0, url.length - 2) + 'ts'
          source = readFile(url, { base })
        } catch (e2) {
          console.error('failed to load fallback .ts')
          throw e
        }
      }
    }
    // do not transform bundles that are already cjs, and provided as bundles with path to load
    if (transform && !bundleAlias) source = transform(source, url).code
    //console.log('source', source)
    let requireFunc = newUrl => require(newUrl, transform, readFile, url, readModule, moduleBase)
    const module = requireModule(url, source, requireFunc)
    console.log('module', url, module)
    requireCache.local[url] = exports = module.exports // cache obj exported by module
  }
  return exports // require returns object exported by module
}

export function requireModule(url, source, _require) {
  try {
    const exports = {}
    const module = { id: url, uri: url, exports: exports, source } // according to node.js modules
    module.require = _require
    //console.log('run script', source)
    runModule(_require, exports, module, source)
    return module
  } catch (err) {
    console.error('Error loading module ' + url, err.message)
    throw err
  }
}

export const clearTempCache = async ({}) => {
  requireCache.local = {}
  requireCache.module = {}
  //  require.alias = {}
}

export const requireCache = {
  local: {},
  module: {},
  alias: {},
  bundleAlias: {},
}
