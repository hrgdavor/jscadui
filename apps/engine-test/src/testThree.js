import { RenderThreejs } from '../../../packages/render-threejs'

import { observeResize } from './observeResize.js'

export const initTestThree = (THREE, canvas) => {
  const JscadThreeViewer = RenderThreejs(THREE)
  const viewer = JscadThreeViewer(canvas)

  observeResize(canvas, evt => viewer.resize(evt.contentRect))

  return viewer
}
