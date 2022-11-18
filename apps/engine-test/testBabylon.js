import { JscadBabylonViewerFactory } from "./src/JscadBabylonViewer.js"
import { observeResize } from "./src/observeResize.js"

export const initTestBabylon = (BABYLON, el)=>{
  const  JscadBabylonViewer = JscadBabylonViewerFactory(BABYLON)
  const viewer = JscadBabylonViewer(el)

  observeResize(el, evt=>{
    viewer.resize(evt.contentRect)
  })

  return viewer  
}