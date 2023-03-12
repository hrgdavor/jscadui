import { RenderRegl } from '@jscadui/render-regl'

import { observeResize } from './observeResize.js'

export const initTestRegl = (regl, el) => {
  const JscadReglViewer = RenderRegl(regl)
  const viewer = JscadReglViewer(el)

  observeResize(el, evt => viewer.resize(evt.contentRect))

  return viewer
}
