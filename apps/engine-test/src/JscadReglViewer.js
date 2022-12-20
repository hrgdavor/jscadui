// cd C:\hrg\3dp_dev\OpenJSCAD.org\packages\utils\regl-renderer\
// esbuild src/index.js --outfile=C:/hrg/3dp_dev/OpenJSCAD.org/packages/web2/src/jscad-regl-renderer.min.js --bundle --watch --sourcemap --minify --format=iife --global-name=jscadReglRenderer
import { CommonToRegl } from '@jscadui/format-regl'

export function JscadReglViewerFactory(regl) {
  const { prepareRender, drawCommands, cameras, controls } = regl

  const rotateSpeed = 0.002
  const panSpeed = 1
  const zoomSpeed = 0.08
  let rotateDelta = [0, 0]
  let panDelta = [0, 0]
  let zoomDelta = 0
  let updateRender = true
  let meshColor = [1,1,1]
  let orbitControls, renderOptions, renderer

  const csgConvert = CommonToRegl()

  const entities = []

  function createContext(canvas, contextAttributes) {
    function get(type) {
      try {
        return { gl: canvas.getContext(type, contextAttributes), type }
      } catch (e) {
        return null
      }
    }
    return get('webgl2') || get('webgl') || get('experimental-webgl') || get('webgl-experimental')
  }

  const state = {}
  let perspectiveCamera

  const startRenderer = ({ canvas, cameraPosition = [180, -180, 220], cameraTarget = [0, 0, 0], bg = [1, 1, 1] }) => {
    // ********************
    // Renderer configuration and initiation.
    // ********************

    perspectiveCamera = cameras.perspective
    orbitControls = controls.orbit
    state.canvas = canvas
    canvas.style.background = 'black'
    // prepare the camera
    state.camera = Object.assign({}, perspectiveCamera.defaults)
    if (cameraPosition) state.camera.position = cameraPosition
    if (cameraTarget) state.camera.target = cameraTarget

    resize({ width: canvas.width, height: canvas.height })

    // prepare the controls
    state.controls = orbitControls.defaults

    const { gl, type } = createContext(canvas)
    // prepare the renderer
    const setupOptions = {
      glOptions: { gl },
    }
    if (type === 'webgl') {
      setupOptions.glOptions.optionalExtensions = ['oes_element_index_uint']
    }
    renderer = prepareRender(setupOptions)

    // assemble the options for rendering
    renderOptions = {
      camera: state.camera,
      rendering: {
        // meshColor: [0, 0.6, 1, 1],
        background: bg,
      },
      drawCommands: {
        drawAxis: drawCommands.drawAxis,
        drawGrid: drawCommands.drawGrid,
        drawLines: drawCommands.drawLines,
        drawMesh: drawCommands.drawMesh,
      },
      // define the visual content
      entities,
    }
    // the heart of rendering, as themes, controls, etc change

    updateView()
  }

  let renderTimer
  const tmFunc = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame // eslint-disable-line

  function updateView(delay = 8) {
    if (renderTimer || !renderer) return
    renderTimer = tmFunc(updateAndRender, delay)
  }

  const doRotatePanZoom = () => {
    if (rotateDelta[0] || rotateDelta[1]) {
      const updated = orbitControls.rotate(
        { controls: state.controls, camera: state.camera, speed: rotateSpeed },
        rotateDelta,
      )
      state.controls = { ...state.controls, ...updated.controls }
      rotateDelta = [0, 0]
    }

    if (panDelta[0] || panDelta[1]) {
      const updated = orbitControls.pan({ controls: state.controls, camera: state.camera, speed: panSpeed }, panDelta)
      state.controls = { ...state.controls, ...updated.controls }
      panDelta = [0, 0]
      state.camera.position = updated.camera.position
      state.camera.target = updated.camera.target
    }

    if (zoomDelta) {
      const updated = orbitControls.zoom(
        { controls: state.controls, camera: state.camera, speed: zoomSpeed },
        zoomDelta,
      )
      state.controls = { ...state.controls, ...updated.controls }
      zoomDelta = 0
    }
  }

  const updateAndRender = timestamp => {
    renderTimer = null
    doRotatePanZoom()

    const updates = orbitControls.update({ controls: state.controls, camera: state.camera })
    state.controls = { ...state.controls, ...updates.controls }
    if (state.controls.changed) updateView(16) // for elasticity in rotate / zoom

    state.camera.position = updates.camera.position
    perspectiveCamera.update(state.camera)
    renderOptions.entities = entities
    const time = Date.now()
    renderer(renderOptions)
    if (updateRender) {
      updateRender = ''
    }
  }

  function resize({ width, height }) {
    state.canvas.width = width
    state.canvas.height = height
    perspectiveCamera.setProjection(state.camera, state.camera, { width, height })
    perspectiveCamera.update(state.camera, state.camera)
    updateView()
  }

  const setBg = (bg = [1, 1, 1]) => {
    renderOptions.rendering.background = bg
    updateView()
  }

  const setMeshColor = (color = [1, 1, 1])=>{
    meshColor = color
  }
  
  const handlers = {
    pan: ({ dx, dy }) => {
      panDelta[0] += dx
      panDelta[1] += dy
      updateView()
    },
    resize,
    rotate: ({ dx, dy }) => {
      rotateDelta[0] -= dx
      rotateDelta[1] -= dy
      updateView()
    },
    zoom: ({ dy }) => {
      zoomDelta += dy
      updateView()
    },
  }

  function receiveCmd(cmd) {
    const fn = handlers[cmd.action]
    if (!fn) {
      throw new Error('no handler for type: ' + cmd.action)
    }
    fn(cmd)
  }

  function sendCmd(cmd) {
    receiveCmd(cmd)
  }

  let lastX = 0
  let lastY = 0

  let pointerDown = false
  let canvas

  const moveHandler = ev => {
    if (!pointerDown) return
    const cmd = {
      dx: lastX - ev.pageX,
      dy: ev.pageY - lastY,
    }

    const shiftKey = ev.shiftKey === true || (ev.touches && ev.touches.length > 2)
    cmd.action = shiftKey ? 'pan' : 'rotate'
    sendCmd(cmd)

    lastX = ev.pageX
    lastY = ev.pageY

    ev.preventDefault()
  }
  const downHandler = ev => {
    pointerDown = true
    lastX = ev.pageX
    lastY = ev.pageY
    canvas.setPointerCapture(ev.pointerId)
    //  ev.preventDefault()
  }

  const upHandler = ev => {
    pointerDown = false
    canvas.releasePointerCapture(ev.pointerId)
    //  ev.preventDefault()
  }

  const wheelHandler = ev => {
    sendCmd({ action: 'zoom', dy: ev.deltaY })
    ev.preventDefault()
  }

  return function JscadReglViewer(el, { camera = {}, bg = [1, 1, 1] } = {}) {
    canvas = document.createElement('CANVAS')
    el.appendChild(canvas)

    const destroy = () => {
      el.removeChild(canvas)
    }

    try {
      startRenderer({ canvas, cameraPosition: camera.position, cameraTarget: camera.target, bg })

      // DISABLED orbit controle in favor of external
      // TODO make optional
      // canvas.onpointermove = moveHandler
      // canvas.onpointerdown = downHandler
      // canvas.onpointerup = upHandler
      // canvas.onwheel = wheelHandler
    } catch (error) {
      destroy()
      throw error
    }

    function setCamera({ position, target }) {
      if (position) state.camera.position = position
      if (target) state.camera.target = target
      updateView()
    }

    function getCamera() {
      return { position: Array.from(state.camera.position), target: state.camera.target }
    }

    const getViewerEnv = () => ({
      forceColors4: false,
      forceIndex: false,
      forceNormals: true,
      useInstances: false,
    })

    function setScene(_scene) {
      entities.length = 0
      _scene.items.forEach(item => {
        // const group = new THREE.Group() no grouping in babylon
        item.items.forEach(obj => {
          const entity = csgConvert(obj, _scene, meshColor)
          entities.push(entity)
          // group.add(obj3d)
          // _scene.add(obj3d)
        })
        // _scene.add(group)
      })
      updateView()
    }
    return { sendCmd, resize, destroy, state, getCamera, setCamera, setBg, setMeshColor, getViewerEnv, setScene }
  }
}
