import { JscadThreeViewerFactory } from "./src/JscadThreeViewer.js"
import { observeResize } from "./src/observeResize.js"

export const initTestThree = (THREE, canvas)=>{
  const  JscadThreeViewer = JscadThreeViewerFactory(THREE)
  const viewer = JscadThreeViewer(canvas)

  observeResize(canvas, evt=>{
    viewer.resize(evt.contentRect)
  })

  return viewer  
}
