export const init = (compileFn, setError) => {
  const load = loadFromUrl(compileFn, setError)
  load() // on load
  window.addEventListener('hashchange', load) // on change
}

/**
 * Handles a url passed in the anchor string
 */
export const loadFromUrl = (compileFn, setError) => async () => {
  const url = window.location.hash.substring(1)
  if (url) {
    console.log('fetching script', url)
    // load from /remote
    try {
      const script = await fetchUrl(url)
      compileFn(script, url)
    } catch (err) {
      setError(err)
    }
  }
}

/**
 * Try to fetch a url directly, but if that fails (due to CORS)
 * then fallback to fetching via server proxy
 */
const fetchUrl = async (url) => {
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
