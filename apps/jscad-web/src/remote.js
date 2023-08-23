
export const init = (compileFn) => {
  load(compileFn) // on load
  window.addEventListener('hashchange', () => load(compileFn)) // on change
}

/**
 * Handles a url passed in the anchor string
 */
export const load = async (compileFn) => {
  const url = window.location.hash.substring(1)
  if (url) {
    console.log('fetching script', url)
    // load from /remote
    const res = await fetch(`/remote?url=${url}`)
    if (res.ok) {
      const script = await res.text()
      compileFn(script, url)
    } else {
      throw new Error('failed to load remote')
    }
  }
}
