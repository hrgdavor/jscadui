// cd c:\hrg\3dp_dev\Babylon.js; esbuild src/index.ts --outfile=C:/hrg/3dp_dev/OpenJSCAD.org/packages/web2/src/babylon.js --bundle --watch --sourcemap=external --minify --format=esm

import { CSG2BabylonFactory } from './CSG2Babylon.js'

export function JscadBabylonViewerFactory(BABYLON){
const { GridMaterial, Engine, Scene, HemisphericLight, ArcRotateCamera, Vector3, AxesViewer, MeshBuilder, Mesh, Plane, Color3 } = BABYLON
const csgConvert = CSG2BabylonFactory(BABYLON)

const entities = []
let canvas
let engine
let _scene
let camera

const startRenderer = ({
  canvas,
  cameraPosition = [180, -180, 220],
  cameraTarget = [0, 0, 0],
  axis: _axis = {},
  grid: _grid = {},
  bg = [1, 1, 1]
}) => {
  engine = new Engine(canvas, true)
  _scene = new Scene(engine)
  _scene.clearColor = new Color3(1, 1, 1)
  // COMPAT another thing to be compatible with threejs and regl
  _scene.useRightHandedSystem = true // https://forum.babylonjs.com/t/unexpected-behavior-for-z-up-right-handed-coordinate-system/1090/7

  camera = new ArcRotateCamera('camera', 0, 0, 50, new Vector3(...cameraTarget))
  camera.upVector = new Vector3(0, 0, 1)
  camera.setPosition(new Vector3(...cameraPosition))
  // COMPAT this almost matches what seems as default in threejs and regl
  camera.fov = Math.PI / 4

  camera.attachControl(canvas, true)
  const light = new HemisphericLight('light', new Vector3(1, 1, 0))
  _scene.addLight(light)

  handlers.setBg(bg)

  engine.runRenderLoop(function () {
    _scene.render()
  })
}

function resize ({ width, height }) {
  canvas.width = width
  canvas.height = height
  engine.resize()
}

const handlers = {
  entities: ({ entities }) => {
    entities.push()
  },
  setBg: (bg = [1, 1, 1]) => {
    _scene.clearColor = new Color3(...bg)
  }
}

function receiveCmd (cmd) {
  const fn = handlers[cmd.action]
  if (!fn) {
    throw new Error('no handler for type: ' + cmd.action)
  }
  fn(cmd)
}

function sendCmd (cmd) {
  receiveCmd(cmd)
}

return function JscadBabylonViewer (el, { camera: _camera = {}, bg } = {}) {
  console.log('init Babylon.js viewer')
  canvas = document.createElement('CANVAS')
  canvas.setAttribute('touch-action', 'none')
  el.appendChild(canvas)

  const destroy = () => {
    el.removeChild(canvas)
  }

  try {
    startRenderer({ canvas, cameraPosition: _camera.position, cameraTarget: _camera.target, bg })
    canvas.addEventListener('wheel', e => {
      e.preventDefault()
    })
  } catch (error) {
    destroy()
    throw error
  }
  function setCamera ({ position, target }) {
    if (position) camera.setPosition(new Vector3(...position))
    if (target) camera.setTarget(new Vector3(...target))
  }

  function getCamera () {
    return { position: camera.position.asArray(), target: camera.getTarget().asArray() }
  }

  const getViewerEnv = () => ({
    forceColors4: true,
    forceIndex: true,
    letfHanded: true,
    forceNormals: false,
    useInstances: false
  })

  return { sendCmd, resize, destroy, getCamera, setCamera, setBg: handlers.setBg, setScene, getViewerEnv }
}

function setScene (scene) {
  // const myLines = [
  // 	[ 	new BABYLON.Vector3(0, 0, 10),
  // 		new BABYLON.Vector3(10, 0, 10)
  // 	],
  // 	[	new BABYLON.Vector3(10, 0, 0),
  // 		new BABYLON.Vector3(10, 10, 0),
  // 		new BABYLON.Vector3(0, 10, 0)
  // 	]
  // ];

  //   //Array one color per point in the lines system
  //   const myColors = [
  //       [   new BABYLON.Color4(0, 1, 1, 1),
  //           new BABYLON.Color4(1, 0, 0, 1)
  //       ],
  //       [   new BABYLON.Color4(0, 1, 0, 1),
  //           new BABYLON.Color4(0, 0, 1, 1),
  //           new BABYLON.Color4(1, 1, 0, 1)
  //       ]
  //   ]

  // //Create linesystem
  // const linesystem = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {lines: myLines, colors: myColors});
  // console.log(window.linesystem = linesystem)
  // window.BABYLON = BABYLON

  // return

  // https://doc.babylonjs.com/divingDeeper/importers/assetContainers
  // _scene.dispose();//here I would have to restart but there is no such method.
  // _scene = new Scene(engine);//here I would have to restart but there is no such method.

  entities.forEach(ent => ent.dispose())
  entities.length = 0
  scene.items.forEach(item => {
    // const group = new THREE.Group() no grouping in babylon
    item.items.forEach(obj => {
      const obj3d = csgConvert(obj, _scene)
      entities.push(obj3d)
      console.log('obj3d.babylon', obj3d, obj)
      // group.add(obj3d)
      // _scene.add(obj3d)
    })
    // _scene.add(group)
  })
  _scene.render()
}

}