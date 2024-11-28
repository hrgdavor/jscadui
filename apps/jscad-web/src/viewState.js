import { makeAxes, makeGrid } from '@jscadui/scene'

import { themes } from './themes.js'

/** 
 * @param {string} id
 * @returns {HTMLElement}
 */
export const byId = id => /** @type {HTMLElement} */(document.getElementById(id))


/**
 * @typedef {object} ViewStateCamera
 * @param {[number,number,number]} position
 * @param {[number,number,number]} [target]
 */


export class ViewState {
  viewer = undefined

  /**
   * @type {ViewStateCamera}
   */
  camera = {}

  smoothRender
  showAxis
  showGrid

  themeName

  theme

  darkModeInput = /** @type {HTMLInputElement} */ (byId('dark-mode'))
  showAxisInput = /** @type {HTMLInputElement} */ (byId('show-axis'))
  showGridInput = /** @type {HTMLInputElement} */ (byId('show-grid'))
  smoothRenderInput = /** @type {HTMLInputElement} */ (byId('smooth-render'))

  constructor() {
    this.themeName = localStorage.getItem('engine.theme') || 'light'
    if (this.themeName === 'dark') {
      this.darkModeInput.checked = true;
      document.body.classList.add('dark')
    }
    this.theme = themes[this.themeName]
    this.showAxis = localStorage.getItem('engine.showAxis') !== 'false'
    this.showAxisInput.checked = this.showAxis
    this.showGrid = localStorage.getItem('engine.showGrid') !== 'false'
    this.showGridInput.checked = this.showGrid
    this.smoothRender = localStorage.getItem('engine.smoothRender') === 'true'
    this.smoothRenderInput.checked = this.smoothRender
    const cameraLocation = localStorage.getItem('camera.location')
    this.camera = cameraLocation ? JSON.parse(cameraLocation) : { position: [180, -180, 220] }

    this.updateTheme()
    this.updateGrid()

    // Bind axis and grid menu options
    this.darkModeInput.addEventListener('change', () => {
      this.themeName = this.darkModeInput.checked ? 'dark' : 'light'
      document.body.classList.toggle('dark', this.darkModeInput.checked)      
      this.setTheme(this.themeName)
    })
    this.smoothRenderInput.addEventListener('change', () => {
      this.setSmoothRender(this.smoothRenderInput.checked)
    })
    this.showAxisInput.addEventListener('change', () => this.setAxes(this.showAxisInput.checked))
    this.showGridInput.addEventListener('change', () => this.setGrid(this.showGridInput.checked))
  }

  /**
   * @param {boolean} visible
   */
  setAxes(visible) {
    this.showAxis = visible
    this.updateGrid()
    this.saveState()
  }

  /**
   * @param {boolean} visible
   */
  setGrid(visible) {
    this.showGrid = visible
    this.updateGrid()
    this.saveState()
  }

  /**
   * @param {boolean} smoothRender 
   * @param {boolean} [fireEvent]
   */
  setSmoothRender(smoothRender, fireEvent = true) {
    this.smoothRender = smoothRender
    this.saveState()
    if (fireEvent) this.onRequireReRender()
  }

  /**
   * @param {string} themeName
   */
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

  /**
   * @param {ViewStateCamera} camera
   */
  setCamera(camera) {
    this.camera = camera
    this.viewer?.setCamera(camera)
  }

  /**
   * @param {ViewStateCamera} camera
   */
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
    if (axes) items.push({ id: 'axes', items: axes, ignoreBB:true })
    if (grid) items.push({ id: 'grid', items: grid, ignoreBB:true })
    if (model) items.push({ id: 'model', items: model, ignoreBB:false })

    this.viewer?.setScene({ items }, { smooth: this.smoothRender })
  }

  setEngine(viewer) {
    this.viewer = viewer
    this.updateTheme()
    this.updateGrid()
    this.updateScene()
    this.setCamera(this.camera)
  }  

  saveState() {
    localStorage.setItem('engine.theme', this.themeName)
    localStorage.setItem('engine.showAxis', String(this.showAxis))
    localStorage.setItem('engine.showGrid', String(this.showGrid))
    localStorage.setItem('engine.smoothRender', String(this.smoothRender))
  }

  onRequireReRender() { }
}
