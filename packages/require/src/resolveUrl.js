
export const MODULE_BASE = 'https://cdn.jsdelivr.net/npm/'

export const getExtension = (url) => {
  let arr = url.split('/')
  let file = arr[arr.length-1]
  let idx = file.lastIndexOf('.')
  return idx == -1 ? '' : file.substring(idx+1)
}

const splitModuleName = (module) => {
  let file = ''
  let idx = module.indexOf('/')
  if (module[0] === '@') idx = module.indexOf('/',idx+1)
  if (idx !== -1) {
    file = module.substring(idx+1)
    module = module.substring(0,idx)
  }
  return [module,file]
}

/**
 * Resolve a package or file name to a url.
 * JS packages will resolve to an npm package url.
 * Relative urls will resolve to a local url.
 * @param {string} url the package or file name to resolve
 * @param {string} base the url of the current module to resolve relative to
 * @param {string} root the url under which local files are served
 * @param {string} moduleBase the url for npm packages
 * @returns the resolved module url
 */
export const resolveUrl = (url, base, root, moduleBase=MODULE_BASE) => {
  let isRelativeFile = false
  let isModule = false
  let cacheUrl = url
  
  if (!/^(http:|https:|fs:|file:)/.test(url)) {
    // npm modules cannot start with . or /
    if (!/^\.?\.?\//.test(url)) {
      const [moduleName, moduleFile] = splitModuleName(url)
      const moduleUrl = new URL(moduleName, moduleBase).toString()
      if (moduleFile) {
        base = root = moduleUrl + '/'
        url = moduleFile
        isRelativeFile = true
      } else {
        isModule = true
        url = moduleUrl
      }
    } else {
      isRelativeFile = true
    }

    if (isRelativeFile && root) {
      // sanitize to avoid going below root, it will prevent / to go below cache baseUrl
      // it will prevent ../../../../ to go below cache baseUrl
      const fromRoot = root && url[0] === '/'
      if (!fromRoot) {
        // base relative path
        const relativePath = base.replace(/^\//, '').replace(root, '') // strip root
        // create url relative path
        url = new URL(url, `fs:/root/${relativePath}`).toString()
        // check if url went above root
        if (!url.startsWith('fs:/root/')) throw new Error('relative url cannot go above root')
        url = url.substring(9)
      } else {
        url = url.substring(1)
      }
      if (!getExtension(url)) url += '.js'
      cacheUrl = `/${url}`
      // now create the full url to load the file
      url = new URL(url, root).toString()
    }
  }
  return { url, isRelativeFile, isModule, cacheUrl }
}
