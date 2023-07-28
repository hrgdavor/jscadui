import { makeAxes, makeGrid } from '@jscadui/scene'

import { themes } from './themes.js'

const byId = (id) => document.getElementById(id)

export class EngineState {
  viewer = undefined

  constructor() {
    this.loadState()
    this.updateTheme()
    this.updateGrid()

    // Bind axis and grid menu options
    const darkMode = byId('dark-mode')
    const showAxis = byId('show-axis')
    const showGrid = byId('show-grid')
    darkMode.addEventListener('change', () => {
      this.themeName = darkMode.checked ? 'dark' : 'light'
      if (darkMode.checked) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
      this.setTheme(this.themeName)
    })
    showAxis.addEventListener('change', () => this.setAxes(showAxis.checked))
    showGrid.addEventListener('change', () => this.setGrid(showGrid.checked))
  }

  setAxes(visible) {
    this.showAxis = visible
    this.updateGrid()
    this.saveState()
  }

  setGrid(visible) {
    this.showGrid = visible
    this.updateGrid()
    this.saveState()
  }

  setTheme(themeName) {
    if (!themes[themeName]) throw new Error(`unknown theme ${themeName}`)
    this.themeName = themeName
    this.theme = themes[themeName]
    this.updateTheme()
    this.updateGrid()
    this.saveState()
  }

  setModel(model) {
    this.model = model
    this.updateScene()
  }

  setCamera(camera) {
    this.camera = camera
    this.viewer?.setCamera(camera)
  }

  saveCamera(camera) {
    this.camera = camera
    localStorage.setItem('camera.location', JSON.stringify(camera))
  }

  updateGrid() {
    const { showAxis, showGrid, theme } = this
    this.axes = showAxis ? [makeAxes(50)] : undefined
    this.grid = showGrid ? makeGrid({ size: 200, color1: theme.grid1, color2: theme.grid2 }) : undefined
    this.updateScene()
  }

  updateTheme() {
    if (this.viewer) {
      this.viewer.setBg(this.theme.bg)
      this.viewer.setMeshColor(this.theme.color)
    }
  }

  updateScene() {
    const { axes, grid, model } = this
    const items = []
    if (axes) items.push({ id: 'axes', items: axes })
    if (grid) items.push({ id: 'grid', items: grid })
    if (model) items.push({ id: 'model', items: model })

    this.viewer?.setScene({ items })
  }

  setEngine(viewer) {
    this.viewer = viewer
    this.updateTheme()
    this.updateGrid()
    this.updateScene()
    this.setCamera(this.camera)
  }

  loadState() {
    this.themeName = localStorage.getItem('engine.theme') || 'light'
    if (this.themeName === 'dark') {
      byId('dark-mode').setAttribute('checked', 'checked')
      document.body.classList.add('dark')
    }
    this.theme = themes[this.themeName]
    this.showAxis = localStorage.getItem('engine.showAxis') !== 'false'
    byId('show-axis').checked = this.showAxis
    this.showGrid = localStorage.getItem('engine.showGrid') !== 'false'
    byId('show-grid').checked = this.showGrid
    const cameraLocation = localStorage.getItem('camera.location')
    this.camera = cameraLocation ? JSON.parse(cameraLocation) : { position: [180, -180, 220] }
  }

  saveState() {
    localStorage.setItem('engine.theme', this.themeName)
    localStorage.setItem('engine.showAxis', this.showAxis)
    localStorage.setItem('engine.showGrid', this.showGrid)
  }
}
