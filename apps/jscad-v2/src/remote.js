import * as fflate from 'fflate'

const gzipPrefix = 'data:application/gzip;base64,'

/**
 * @callback CompileFn
 * @param {string} script
 * @param {string} url
 * 
 * @callback ErrorFn
 * @param {unknown} error
 */

/**
 * @param {CompileFn} compileFn 
 * @param {ErrorFn} setError 
 * @returns {unknown}
 */
export const init = (compileFn, setError) => {
  const load = loadFromUrl(compileFn, setError)
  window.addEventListener('hashchange', load) // on change
  return load() // on load
}

/**
 * Handles a url passed in the anchor string 
 * @param {CompileFn} compileFn 
 * @param {ErrorFn} setError 
 */
export const loadFromUrl = (compileFn, setError) => async () => {
  const url = window.location.hash.substring(1)
  if (url) {
    console.log('fetching script', url)
    // load from /remote
    try {
      const script = await fetchUrl(url)
      compileFn(script, url)
      return true
    } catch (err) {
      setError(err)
    }
  }
}

/**
 * Try to fetch a url directly, but if that fails (due to CORS)
 * then fallback to fetching via server proxy.
 * @param {string} url
 */
const fetchUrl = async (url) => {
  if (url.startsWith(gzipPrefix)) {
    const bytes = base64ToArrayBuffer(url.substring(gzipPrefix.length))
    const dec = fflate.gunzipSync(new Uint8Array(bytes))
    return new TextDecoder("utf-8").decode(dec)
  }

  // Try to fetch url directly
  const res = await fetch(url).catch(() => {
    // Failed to fetch directly, try proxy
    return fetch(`/remote?url=${url}`)
  })
  if (res.ok) {
    return await res.text()
  } else {
    throw new Error(`failed to load script from url ${url}`)
  }
}

/**
 * Converts a Base64 encoded string to an ArrayBuffer.
 * @param {string} base64 - base64 encoded string
 * @returns {ArrayBuffer} output ArrayBuffer
 */
const base64ToArrayBuffer = (base64) => {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer
}
