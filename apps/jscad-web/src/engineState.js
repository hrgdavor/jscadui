import { RenderThreejs } from '@jscadui/render-threejs'
import { addScript } from "./addScript"
import { observeResize } from './observeResize.js'

export class EngineState {
  viewer = undefined

  constructor(theme, makeAxes, makeGrid) {
    this.theme = theme
    this.makeAxes = makeAxes
    this.makeGrid = makeGrid
    this.updateGrid()
  }

  updateGrid() {
    const { theme, makeAxes, makeGrid } = this
    this.axes = makeAxes ? [makeAxes(50)] : undefined
    this.grid = makeGrid ? makeGrid({ size: 200, color1: theme.grid1, color2: theme.grid2 }) : undefined
    this.updateScene()
  }

  setAxes(makeAxes) {
    this.makeAxes = makeAxes
    this.updateGrid()
  }

  setGrid(makeGrid) {
    this.makeGrid = makeGrid
    this.updateGrid()
  }

  setTheme(theme) {
    this.theme = theme
    this.updateTheme()
    this.updateGrid()
  }

  setModel(model) {
    this.model = model
    this.updateScene()
  }

  updateTheme() {
    this.viewer.setBg(this.theme.bg)
    this.viewer.setMeshColor(this.theme.color)
  }

  setCamera(camera) {
    this.viewer?.setCamera(camera)
  }

  updateScene() {
    const { axes, grid, model } = this
    const items = []
    if (axes) items.push({ id: 'axes', items: axes })
    if (grid) items.push({ id: 'grid', items: grid })
    if (model) items.push({ id: 'model', items: model })

    this.viewer?.setScene({ items })
  }

  async initEngine(el, camera) {
    await addScript('build/bundle.threejs.js')
    const JscadThreeViewer = RenderThreejs(THREE)
    this.viewer = JscadThreeViewer(el)

    observeResize(el, evt => this.viewer.resize(evt.contentRect))

    this.updateTheme()
    this.updateScene()
    this.setCamera(camera)
  }
}
