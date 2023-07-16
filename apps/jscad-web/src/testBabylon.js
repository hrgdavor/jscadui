import { RenderBabylon } from '@jscadui/render-babylonjs'

import { observeResize } from './observeResize.js'

export const initTestBabylon = (BABYLON, el) => {
  const JscadBabylonViewer = RenderBabylon(BABYLON)
  const viewer = JscadBabylonViewer(el)

  observeResize(el, evt => viewer.resize(evt.contentRect))

  return viewer
}
