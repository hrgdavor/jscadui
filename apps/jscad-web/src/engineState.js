const setCameraToAll = (viewers, ctrl) => {
  viewers.forEach(viewer => {
    viewer.setCamera(ctrl)
  })
}

export class EngineState {
  viewers = []

  constructor(availableEngines, theme, makeAxes, makeGrid) {
    this.theme = theme
    // this.makeAxes = makeAxes
    this.makeGrid = makeGrid
    this.availableEngines = availableEngines
    if (makeAxes) this.axes = [makeAxes(50)]
    this.updateGrid()
  }

  updateGrid() {
    const { theme, makeGrid } = this
    if (makeGrid) this.grid = makeGrid({ size: 200, color1: theme.grid1, color2: theme.grid2 })
    this.setSceneToAll(this.viewers)
  }

  setTheme(theme) {
    this.theme = theme
    this.setThemeToAll(this.viewers)
    this.updateGrid()
  }

  setModel(model) {
    this.model = model
    this.setSceneToAll(this.viewers)
  }

  setThemeToAll(viewers) {
    const { theme } = this
    viewers.forEach(viewer => {
      viewer.setBg(theme.bg)
      viewer.setMeshColor(theme.color)
    })
  }

  setCamera(camera) {
    this.camera = camera
    setCameraToAll(this.viewers, camera)
  }

  setSceneToAll(viewers) {
    if (!viewers.length) return

    const { axes, grid, model } = this
    const items = []
    if (axes) items.push({ id: 'axes', items: axes })
    if (grid) items.push({ id: 'grid', items: grid })
    if (model) items.push({ id: 'model', items: model })

    viewers.forEach(viewer => viewer.setScene?.({ items }))
  }

  async initEngine(el, code, camera) {
    const cfg = this.availableEngines[code]
    const viewer = await cfg.init(el, cfg)
    this.viewers.push(viewer)
    const viewers = [viewer]
    this.setThemeToAll(viewers)
    this.setSceneToAll(viewers, this.model)
    setCameraToAll(viewers, camera)
  }
}
