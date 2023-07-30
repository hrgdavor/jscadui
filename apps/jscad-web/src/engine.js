import { RenderThreejs } from '@jscadui/render-threejs'
// import * as THREE from 'three'

export const init = async () => {
  await addScript('build/bundle.threejs.js')
  const JscadThreeViewer = RenderThreejs(THREE)
  const el = document.getElementById('viewer')
  const viewer = JscadThreeViewer(el)

  observeResize(el, evt => viewer.resize(evt.contentRect))

  return viewer
}

const observeResize = (el, listener) => {
  // ResizeObserver is better than window resize as it can be used on any element
  // this is a short/compact/simple implementation that uses a new ResizeObserver each time.
  // which is fine probably up-to 50 of them. There is a performance hit if too many are created.
  // for an implementation that can handle more take a look at https://github.com/hrgdavor/jsx6/tree/main/libs/dom-observer
  const resizeObserver = new ResizeObserver(entries => {
    listener(entries[0])
  })
  resizeObserver.observe(el)
}

const addScript = async (source, module = false) => {
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script')
    tag.type = module ? 'module' : 'text/javascript'
    tag.src = source
    tag.onload = ()=>resolve()
    tag.onerror = err => reject(err)
    document.head.append(tag)
  })
}
