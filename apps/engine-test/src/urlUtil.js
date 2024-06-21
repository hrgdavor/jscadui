export const urlBool = val => {
  if (val === '' || val === '1' || val === 'true') return true
  return false
}

const main = new URL(location.toString())
const sp = main.searchParams

export const urlStr = () => main.toString()

export function urlInit(name, def, searchParams = sp) {
  if (searchParams.has(name)) {
    return searchParams.get(name)
  } else {
    searchParams.set(name, def)
    return def
  }
}

export const urlInitBool = (name, def, searchParams = sp) => urlBool(urlInit(name, def, searchParams))
export function urlSet(name, value, searchParams = sp) {
  if (!name) return
  if (value === undefined || value === null) {
    searchParams.delete(name)
  } else {
    searchParams.set(name, value)
  }
}
export const urlGet = (name, searchParams = sp) => searchParams.get(name)
export const urlGetBool = (name, searchParams = sp) => urlBool(searchParams.get(name))

/** change url parameter and replace current url in addressbar
 *
 * @param {*} name - parameter name
 * @param {*} value - parameter value
 */
export const urlReplace = (name, value) => {
  urlSet(name, value)
  window.history.replaceState(null, null, main.toString())
}

/** change url parameter and reload the page
 *
 * @param {*} name - parameter name
 * @param {*} value - parameter value
 */
export const urlReload = (name, value) => {
  if (name) urlSet(name, value)
  let loc = location.toString()
  let newLoc = main.toString()
  if (newLoc === loc) {
    location.reload()
  } else {
    document.location = newLoc
  }
}
