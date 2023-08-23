
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
      console.error('failed to load remote script', err)
      setError(err)
    }
  }
}

const fetchUrl = async (url) => {
  const res = await fetch(`/remote?url=${url}`)
  if (res.ok) {
    return await res.text()
  } else {
    throw new Error(`failed to load script from url ${url}`)
  }
}
