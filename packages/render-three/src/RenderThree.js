// cd c:\hrg\3dp_dev\three.js
// esbuild Three.jscad.js --outfile=C:/hrg/3dp_dev/OpenJSCAD.org/packages/web2/src/Three.jscad.js --bundle --watch --sourcemap --minify --format=esm
import { CSG2Three } from './CSG2Three.js'
import { ViewCubeControlsModule } from './ViewCubeControls.js'

export function RenderThree(el, { camera = {}, bg } = {}) {
  let _scene
  let _camera
  let controls
  let renderer
  let viewCube
  let renderer2
  let camera2
  let scene2
  let CAM_DISTANCE = 70
  const SHADOW = false
  const shouldRender = Date.now()
  const lastRender = true
  let renderTimer

  const entities = []
  const groups = []
  let canvas

  const csgConvert = CSG2Three(THREE)
  const ViewCubeControls = ViewCubeControlsModule(THREE)

  const startRenderer = ({ canvas, cameraPosition = [180, -180, 220], cameraTarget = [0, 0, 0], bg = [1, 1, 1] }) => {
    _camera = new THREE.PerspectiveCamera(45, 1, 1, 50000)
    _camera.up.set(0, 0, 1)
    _camera.position.set(...cameraPosition)
    _camera.lookAt(...cameraTarget)
    renderer2 = new THREE.WebGLRenderer({ alpha: 1 })
    renderer2.setSize(150, 150)
    renderer2.setClearColor( 0xffffff, 0 ); 
    const cubeDomStyle = renderer2.domElement.style
    cubeDomStyle.position = 'absolute'
    cubeDomStyle.top = '0'
    cubeDomStyle.right = '0'
    canvas.parentNode.appendChild(renderer2.domElement)

    scene2 = new THREE.Scene()
    camera2 = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera2.up.set(0, 0, 1)
    camera2.position.set(0, 0, CAM_DISTANCE)
    camera2.lookAt(0, 0, 0)
    
    viewCube = new ViewCubeControls(camera2, undefined, undefined, renderer2.domElement)
    scene2.background = null
    scene2.add(viewCube.getObject())

    renderer2.domElement.addEventListener('mouseover',e=>updateView())
    renderer2.domElement.addEventListener('mousemove',e=>updateView())
    renderer2.domElement.addEventListener('mousedown',e=>updateView())
    renderer2.domElement.addEventListener('mouseup',e=>updateView())

    viewCube.addEventListener('move-angle', ({ x,y,z }) => {
      console.log('x,y,z', x,y,z)
      updateView()
    })

    function renderAxisChange(){
      syncCameras(_camera, camera2)
    }

    function syncCameras(camera1, camera2){
      var look = new THREE.Vector3(0,0, 1);
      look.applyQuaternion(camera1.quaternion);
      const length = CAM_DISTANCE;
      camera2.position.copy( camera1.position );
      camera2.position.setLength( length );
      camera2.lookAt( look );

    }

    _scene = new THREE.Scene()

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 0, 2000)
    _scene.add(hemiLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(0, 200, 100)
    directionalLight.castShadow = SHADOW
    if (SHADOW) {
      directionalLight.shadow.camera.top = 180
      directionalLight.shadow.camera.bottom = -100
      directionalLight.shadow.camera.left = -120
      directionalLight.shadow.camera.right = 120
    }
    _scene.add(directionalLight)

    setBg(bg)

    renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    controls = new THREE.OrbitControls(_camera, canvas)
    controls.target.set(0, 0, 0)
    controls.update()
    window.camera = _camera
    window.controls = controls

    renderAxisChange()
    controls.addEventListener('change', function () {
      renderAxisChange()
      updateView()
    })
  }

  const tmFunc = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame

  function updateView(delay = 8) {
    if (renderTimer || !renderer) return
    renderTimer = tmFunc(updateAndRender, delay)
  }

  function setBg(bg = [1, 1, 1]) {
    _scene.background = new THREE.Color(...bg)
    updateView()
  }

  function updateAndRender() {
    renderTimer = null
    // console.log('updateAndRender')
//    controls.update()

    const animating = false; //viewCube.update()
    renderer2.render(scene2, camera2)

    renderer.render(_scene, _camera)
    renderer.autoClear = false // allow to render multiple scenes one over other if needed
    // https://discourse.threejs.org/t/very-low-fps-when-using-composer-with-2-viewports-and-1-renderer/18586
    // https://webgl2fundamentals.org/webgl/lessons/webgl-multiple-views.html
    // http://jyunming-chen.github.io/tutsplus/tutsplus15.html  - top view plus 3d
    // https://codepen.io/jdrew1303/pen/poyVOyG --- BEST example
    // renderer.render(scene2, camera)
    // https://github.com/fennec-hub/ThreeOrbitControlsGizmo
    renderer.autoClear = true
    if(animating){
      updateView()
      console.log('animating')
    }
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
    if (target) _camera.lookAt(...position)
    updateView()
  }

  function getCamera() {
    const target = new THREE.Vector3(0, 0, -1)
    target.applyQuaternion(_camera.quaternion)
    return {
      position: _camera.position.toArray(),
      target: target.toArray(),
    }
  }

  console.log('init Three.js viewer')
  canvas = document.createElement('CANVAS')
  el.appendChild(canvas)

  const destroy = () => {
    el.removeChild(canvas)
  }

  try {
    startRenderer({ canvas, bg, cameraPosition: camera.position, cameraTarget: camera.target })
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

  function setScene(scene) {
    groups.forEach(group => {
      _scene.remove(group)
    })
    entities.forEach(ent => {
      if (ent.geometry) ent.geometry.dispose()
    })
    entities.length = 0
    scene.items.forEach(item => {
      const group = new THREE.Group()
      groups.push(group)
      item.items.forEach(obj => {
        const obj3d = csgConvert(obj)
        if (obj3d) {
          entities.push(obj3d)
          group.add(obj3d)
        } else console.error('could not conver to obj3d ', obj)
      })
      _scene.add(group)
    })
    updateView()
  }

  return { sendCmd, resize, destroy, getCamera, setCamera, camera, setBg: setBg, setScene, getViewerEnv }
}
