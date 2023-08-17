import { CommonToThree } from '@jscadui/format-threejs'

export function RenderThreejs({
  PerspectiveCamera,
  AmbientLight,
  HemisphereLight,
  WebGLRenderer,
  DirectionalLight,
  Scene,
  Group,
  Vector3,
  Color, // used by both
  // used by CommonToThree
  MeshPhongMaterial,
  LineBasicMaterial,
  BufferGeometry,
  BufferAttribute,
  Mesh,
  InstancedMesh,
  Line,
  LineSegments,
}) {
  let _scene
  let _camera
  let controls
  let renderer
  const SHADOW = false
  const shouldRender = Date.now()
  const lastRender = true
  let renderTimer
  let meshColor = new Color(1, 1, 1)

  const entities = []
  const groups = []
  let canvas

  const csgConvert = CommonToThree({
    MeshPhongMaterial,
    LineBasicMaterial,
    BufferGeometry,
    BufferAttribute,
    Mesh,
    InstancedMesh,
    Line,
    LineSegments,
    Color,
  })

  const startRenderer = ({ canvas, cameraPosition = [180, -180, 220], cameraTarget = [0, 0, 0], bg = [1, 1, 1] }) => {
    _camera = new PerspectiveCamera(45, 1, 1, 50000)
    _camera.up.set(0, 0, 1)
    _camera.position.set(...cameraPosition)
    _camera.lookAt(...cameraTarget)

    window.camera = _camera
    window.updateView = updateView

    _scene = new Scene()

    const ambientLight = new AmbientLight(0xeeeeee, 0.2)
    _scene.add(ambientLight)

    const hemiLight = new HemisphereLight(0xeeeedd, 0x333333, 0.5)
    hemiLight.position.set(0, 0, 2000)
    _scene.add(hemiLight)

    const directionalLight = new DirectionalLight(0xeeeef4, 0.7)
    directionalLight.position.set(0, -200, 100)
    directionalLight.castShadow = SHADOW
    if (SHADOW) {
      directionalLight.shadow.camera.top = 180
      directionalLight.shadow.camera.bottom = -100
      directionalLight.shadow.camera.left = -120
      directionalLight.shadow.camera.right = 120
    }
    _scene.add(directionalLight)

    setBg(bg)

    renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
  }

  const tmFunc = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame

  function updateView(delay = 8) {
    if (renderTimer || !renderer) return
    renderTimer = tmFunc(updateAndRender, delay)
  }

  function setBg(bg = [1, 1, 1]) {
    _scene.background = new Color(...bg)
    updateView()
  }

  function setMeshColor(bg = [1, 1, 1]) {
    meshColor = new Color(...bg)
    csgConvert.setDefColor(bg)
    updateView()
  }

  function updateAndRender() {
    renderTimer = null
    controls?.update()

    renderer.render(_scene, _camera)
    renderer.autoClear = false // allow to render multiple scenes one over other if needed
    // https://discourse.threejs.org/t/very-low-fps-when-using-composer-with-2-viewports-and-1-renderer/18586
    // https://webgl2fundamentals.org/webgl/lessons/webgl-multiple-views.html
    // http://jyunming-chen.github.io/tutsplus/tutsplus15.html  - top view plus 3d
    // https://codepen.io/jdrew1303/pen/poyVOyG --- BEST example
    // renderer.render(scene2, camera)
    // https://github.com/fennec-hub/ThreeOrbitControlsGizmo
    renderer.autoClear = true
  }

  function resize({ width, height }) {
    _camera.aspect = width / height
    _camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    updateView()
  }

  const handlers = { setScene }

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

  function setCamera({ position, target }) {
    if (position) _camera.position.set(...position)
    if (target) _camera.lookAt(...target)
    updateView()
  }

  function getCamera() {
    const target = new Vector3(0, 0, -1)
    target.applyQuaternion(_camera.quaternion)
    return {
      position: _camera.position.toArray(),
      target: target.toArray(),
    }
  }

  return function JscadThreeViewer(el, { camera: _camera = {}, bg } = {}) {
    canvas = document.createElement('CANVAS')
    el.appendChild(canvas)

    const destroy = () => {
      el.removeChild(canvas)
    }

    try {
      startRenderer({ canvas, bg, cameraPosition: _camera.position, cameraTarget: _camera.target })
    } catch (error) {
      destroy()
      throw error
    }

    const getViewerEnv = () => ({
      forceColors4: false,
      forceIndex: false,
      forceNormals: false,
      useInstances: false,
    })

    return {
      sendCmd,
      resize,
      destroy,
      getCamera,
      setCamera,
      camera: _camera,
      setBg,
      setMeshColor,
      setScene,
      getViewerEnv,
    }
  }

  function setScene(scene) {
    groups.forEach(group => {
      _scene.remove(group)
    })
    entities.forEach(ent => {
      if (ent.geometry) ent.geometry.dispose()
    })
    entities.length = 0
    scene.items.forEach(item => {
      const group = new Group()
      groups.push(group)
      item.items.forEach(obj => {
        const obj3d = csgConvert(obj, scene, meshColor)
        if (obj3d) {
          entities.push(obj3d)
          group.add(obj3d)
        } else {
          console.error('could not convert to obj3d', obj)
        }
      })
      _scene.add(group)
    })
    updateView()
  }
}
