import { observeResize } from "./src/observeResize.js"

import { JscadReglViewerFactory } from "./src/JscadReglViewer.js" 

export const initTestRegl = (regl, el)=>{
  const  JscadReglViewer = JscadReglViewerFactory(regl)
  const viewer = JscadReglViewer(el)

  observeResize(el, evt=>{
    viewer.resize(evt.contentRect)
  })

  return viewer  

}