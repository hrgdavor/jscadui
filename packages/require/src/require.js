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

import { extractPathInfo } from '../../fs-provider/fs-provider'
import { MODULE_BASE, getExtension, resolveUrl } from './resolveUrl'

export { resolveUrl } from './resolveUrl'

// initially new Function was used to pass parameters: require, exports, module
// new Functions screws with sourcemaps as it adds a prefix to the source
// we need eval to do the same without prefix
// https://esbuild.github.io/content-types/#direct-eval
// to be nice to bundlers we need indirect eval
export const runModule = globalThis.eval('(require, exports, module, source)=>eval(source)')

export const require = (urlOrSource, transform, readFile, base, root, importData = null, moduleBase = MODULE_BASE) => {
  let source
  let url
  let isRelativeFile
  let cache
  let cacheUrl
  let bundleAlias
  if (typeof urlOrSource === 'string') {
    url = urlOrSource
  } else {
    source = urlOrSource.script
    url = urlOrSource.url
    isRelativeFile = true
  }
  let exports
  let resolvedUrl = url

  if (source === undefined) {
    bundleAlias = requireCache.bundleAlias[url]
    const aliasedUrl = bundleAlias || requireCache.alias[url] || url

    const resolved = resolveUrl(aliasedUrl, base, root, moduleBase)
    const resolvedStr = resolved.url.toString()
    const urlComponents = resolvedStr.split('/')
    // no file ext is usually module from CDN
    const isJs = !urlComponents[urlComponents.length - 1].includes('.') || resolvedStr.endsWith('.ts') || resolvedStr.endsWith('.js')
    if (!isJs && importData) {
      const info = extractPathInfo(resolvedStr)
      const content = readFile(resolvedStr, { output: importData.isBinaryExt(info.ext) })
      return importData.deserialize(info, content)
    }

    isRelativeFile = resolved.isRelativeFile
    resolvedUrl = resolved.url
    cacheUrl = resolved.url

    cache = requireCache[isRelativeFile ? 'local' : 'module']
    exports = cache[cacheUrl] // get from cache
    if (!exports) {
      // not cached
      try {
        source = readFile(resolvedUrl)
        if (resolvedUrl.includes('jsdelivr.net')) {
          // jsdelivr will read package.json and tell us what the main file is
          const srch = ' * Original file: '
          let idx = source.indexOf(srch)
          if (idx != -1) {
            const idx2 = source.indexOf('\n', idx + srch.length + 1)
            const realFile = new URL(source.substring(idx + srch.length, idx2), resolvedUrl).toString()
            resolvedUrl = base = realFile
          }
        }
      } catch (e) {
        if (resolvedUrl.endsWith('.js')) {
          try {
            resolvedUrl = resolvedUrl.replace(/\.js$/, '.ts')
            source = readFile(resolvedUrl)
          } catch (e2) {
            console.error('failed to load fallback .ts')
            throw new Error(`failed to load module ${url}\n  ${e}`)
          }
        } else {
          throw new Error(`failed to load module ${url}\n  ${e}`)
        }
      }
    }
  }
  if (source !== undefined) {
    const extension = getExtension(resolvedUrl)
    // https://cdn.jsdelivr.net/npm/@jscad/svg-serializer@2.3.13/index.js uses require to read package.json
    if (extension === 'json') {
      exports = JSON.parse(source)
    } else {
      // do not transform bundles that are already cjs ( requireCache.bundleAlias.*)
      if (transform && !bundleAlias) source = transform(source, resolvedUrl).code
      // construct require function relative to resolvedUrl
      const requireFunc = newUrl => require(newUrl, transform, readFile, resolvedUrl, root, importData, moduleBase)
      const module = requireModule(url, resolvedUrl, source, requireFunc)
      module.local = isRelativeFile
      exports = module.exports
      // import jscad from "@jscad/modeling"; 
      // will be effectively transformed to 
      // const jscad = require('@jscad/modeling').default
      // we need to plug-in default if missing
      if (!('default' in exports)) exports.default = exports
    }
  }

  if (cache && cacheUrl) cache[cacheUrl] = exports // cache obj exported by module

  return exports // require returns object exported by module
}

const requireModule = (id, url, source, _require) => {
  try {
    const exports = {}
    const module = { id, uri: url, exports, source } // according to node.js modules
    //module.require = _require
    source += '\n//# sourceURL=' + url
    runModule(_require, exports, module, source)
    return module
  } catch (err) {
    err.message += ` / failed loading module ${id}`
    throw err
  }
}

/**
 * Clear file cache for specific files. Used when a file has changed.
* @param {{files:Array<string>}} obj
 */
export const clearFileCache = ({ files }) => {
  const cache = requireCache.local
for (const file of   files) {
    delete cache[file]
  }
}

/**
 * Clear project-specific cache
 */
export const jscadClearTempCache = () => {
  requireCache.local = {}
  requireCache.alias = {}
}

export const requireCache = {
  local: {},
  alias: {},
  module: {},
  bundleAlias: {},
}
