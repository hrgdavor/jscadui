import { booleans, colors, primitives, transforms } from '@jscad/modeling'
import { JscadToCommon } from '@jscadui/format-jscad'
import { Gizmo } from '@jscadui/html-gizmo'
import { OrbitControl, OrbitState, closerAngle, getCommonRotCombined } from '@jscadui/orbit'
import { genParams } from '@jscadui/params'
import { initMessaging } from '@jscadui/postmessage'
import { makeAxes, makeGrid } from '@jscadui/scene'

const themes = {
  light: {
    name: 'Light',
    color: [0, 0.6, 1, 1],
    bg: [1, 1, 1, 1],
    grid1: [0, 0, 0, 0.2],
    grid2: [0, 0, 1, 0.1],
  },
  dark: {
    name: 'Dark',
    color: [1, 0.4, 0, 1],
    bg: [0.211, 0.2, 0.207, 1],
    grid1: [1, 1, 1, 0.5],
    grid2: [0.6, 0.8, 0.8, 0.4],
  }
}

import {
  addPreLoad,
  addPreLoadAll,
  addToCache,
  clearFs,
  entryCheckPromise,
  extractEntries,
  filePromise,
  fileToFsEntry,
  findFileInRoots,
  getFile,
  readAsArrayBuffer,
  readAsText,
  readDir,
  registerServiceWorker,
} from '../../packages/fs-provider/fs-provider'
import { availableEngines, availableEnginesList } from './src/availableEngines'
import { CurrentUrl } from './src/currentUrl'
import { EngineState } from './src/engineState'

const theme = themes.light
const { subtract } = booleans
const { translate } = transforms
const { colorize } = colors

import * as editor from "./src/editor.js"
import * as menu from "./src/menu.js"
import * as welcome from "./src/welcome.js"

editor.init()
menu.init()
welcome.init()

export const byId = id => document.getElementById(id)
const currentUrl = new CurrentUrl()
customElements.define('jscadui-gizmo', Gizmo)

const engineState = new EngineState(availableEngines, theme, makeAxes, makeGrid)
const useEngines = currentUrl.initGet('engines', 'three').split(',')

// Axis and grid options
const showAxis = byId('show-axis')
const showGrid = byId('show-grid')
showAxis.addEventListener('change', () => {
  engineState.setAxes(showAxis.checked ? makeAxes : undefined)
})
showGrid.addEventListener('change', () => {
  engineState.setGrid(showGrid.checked ? makeGrid : undefined)
})

const gizmo = (window.gizmo = new Gizmo())
byId('layout').appendChild(gizmo)

const modelRadius = 30
let model = [
  subtract(
    primitives.sphere({ radius: modelRadius, segments: 16 }),
    translate([modelRadius, 0, modelRadius], primitives.sphere({ radius: modelRadius, segments: 16 })),
  ),
]

model.push(colorize([0.7, 0, 0], translate([60, 0, 0], primitives.sphere({ radius: 10 }))))
model.push(colorize([0, 0.7, 0], translate([0, 60, 0], primitives.sphere({ radius: 10 }))))
model.push(colorize([0, 0, 0.7], translate([0, 0, 60], primitives.sphere({ radius: 10 }))))
model.push(colorize([1, 0.7, 0, 0.5], translate([-20, -20, 0], primitives.cube({ size: 30 }))))

model = model.map(m => JscadToCommon(m))

const stored = localStorage.getItem('camera.location')
let initialCamera = { position: [180, -180, 220] }
try {
  if (stored) initialCamera = JSON.parse(stored)
} catch (error) {
  console.log(error)
}

const elements = []
availableEnginesList.forEach(code => {
  const cfg = availableEngines[code]
  const el = byId('box_' + code)
  el.querySelector('i').textContent = cfg.name
  elements.push(el)
})

function setViewerScene(model) {
  engineState.setModel(model)
}
const ctrl = (window.ctrl = new OrbitControl(elements, { ...initialCamera, alwaysRotate: false }))
function setViewerCamera({ position, target, rx, rz }) {
  engineState.setCamera({ position, target })
  gizmo.rotateXZ(rx, rz)
}

const updateFromCtrl = change => {
  // console.log('change', change)
  const { position, target, rx, rz, len, ...rest } = change
  setViewerCamera(change)
}

updateFromCtrl(ctrl)

const saveCamera = cam => localStorage.setItem('camera.location', JSON.stringify(cam))

ctrl.onchange = change => {
  saveCamera(change)
  stopAnim()
  updateFromCtrl(change)
}

gizmo.oncam = ({ cam }) => {
  const [rx, rz] = getCommonRotCombined(cam)
  startAnim({ rx, rz, target: [0, 0, 0] })
  saveCamera(stateEnd)
  //  ctrl.setCommonCamera(cam)
}

const startAnim = ({ target, rx, rz }) => {
  startTime = Date.now()
  // rx does not need this fix as it only operates inside one half of a rotation
  ctrl.rz = closerAngle(ctrl.rz, rz)
  stateStart = new OrbitState(ctrl, true)
  stateEnd = new OrbitState({ target: target || ctrl.target, rx, rz, len: ctrl.len })
  animTimer = requestAnimationFrame(doAnim)
}

const stopAnim = () => {
  cancelAnimationFrame(animTimer)
  animTimer = null
  startTime = 0
}

const doAnim = () => {
  let percent = Math.min(1, (Date.now() - startTime) / animDuration)
  const newState = stateStart.calcAnim(stateEnd, percent)
  ctrl.setRotate(newState.rx, newState.rz, newState.target, false)
  updateFromCtrl(ctrl)
  // update orbit control so it can continue working during or after anim
  if (percent < 1) animTimer = requestAnimationFrame(doAnim)
}

let animDuration = 200
let animTimer, stateStart, stateEnd, startTime

const darkMode = byId('dark-mode')
darkMode.addEventListener('change', () => {
  const themeName = darkMode.checked ? 'dark' : 'light'
  engineState.setTheme(themes[themeName])
  setViewerScene(model)
})

let checkChange_timer
let fileToWatch
let lastModified

function checkChange() {
  if (!fileToWatch) return

  clearTimeout(checkChange_timer)
  fileToWatch.file(f => {
    if (f.lastModified != lastModified) {
      initScript(f)
      lastModified = f.lastModified
      console.log('lastModified::', f.lastModified, f)
    }
  })
  checkChange_timer = setTimeout(checkChange, 300)
}

const dropModal = byId('dropModal')
const showDrop = show => {
  clearTimeout(showDrop.timer)
  dropModal.style.display = show ? 'initial' : 'none'
}
document.body.ondrop = ev => {
  ev.preventDefault()
  showDrop(false)
  fileDropped(ev)
}

document.body.ondragover = ev => {
  ev.preventDefault()
  showDrop(true)
}
document.body.ondragleave = document.body.ondragend = ev => {
  clearTimeout(showDrop.timer)
  showDrop.timer = setTimeout(() => {
    showDrop(false)
  }, 300)
}

const handlers = {
  entities: ({ entities }) => {
    if (!(entities instanceof Array)) entities = [entities]
    setViewerScene((model = entities))
  },
}

const link = document.createElement('a')
link.style.display = 'none'
document.body.appendChild(link)
function save(blob, filename) {
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

function exportModel(format) {
  sendCmd('exportData', { format }).then(({ data }) => {
    console.log('save', fileToRun + '.stl', data)
    save(new Blob([data], { type: 'text/plain' }), fileToRun + '.stl')
  })
}
window.exportModel = exportModel

const initScript = f => {
  var reader = new FileReader()
  reader.onload = event => {
    let script = event.target.result
    sendCmd('initScript', { script, url: f.name + '?' + f.lastModified }).then(r => {
      console.log('params def', r)
      sendCmd('runMain', {})
    })
  }
  reader.onerror = event => console.log('error', event)
  reader.readAsText(f)
}

var worker = new Worker('./build/bundle.worker.js')
const { sendCmd, sendNotify } = initMessaging(worker, handlers)

let sw
const toUrl = path => new URL(path, document.baseURI).toString()
registerServiceWorker('bundle.fs-serviceworker.js?prefix=/swfs/', async (path, sw) => {
  let arr = path.split('/').filter(p => p)
  let match = await findFileInRoots(sw.roots, arr)
  if (match) {
    fileIsRequested(path, match)
    return readAsArrayBuffer(await filePromise(match))
  }
}).then(_sw => {
  sw = _sw
  sendCmd('init', {
    bundles: {
      '@jscad/modeling': toUrl('./build/bundle.jscad_modeling.js'),
    },
    baseURI: new URL(`/swfs/${sw.id}/`, document.baseURI).toString(),
  })
})

const findByFsPath = (arr, file) => {
  const path = typeof file === 'string' ? file : file.fsPath
  return arr.find(f => f.fsPath === path)
}

const fileIsRequested = (path, file) => {
  let match
  if ((match = findByFsPath(checkPrimary, file))) return
  if ((match = findByFsPath(checkSecondary, file))) return
  checkSecondary.push(file)
}

let checkPrimary = (window.checkPrimary = [])
let checkSecondary = (window.checkSecondary = [])
let fileToRun
let lastCheck = Date.now()

const checkFiles = () => {
  const now = Date.now()
  // console.log('check', now - lastCheck > 1000, checkPrimary.length + checkSecondary.length)
  if (now - lastCheck > 300 && checkPrimary.length + checkSecondary.length != 0) {
    lastCheck = now
    let todo = checkPrimary.concat(checkSecondary).map(entryCheckPromise)
    Promise.all(todo).then(result => {
      // console.log('result', result)
      result = result.filter(([entry, file]) => entry.lastModified != entry._lastModified)
      if (result.length) {
        const todo = []
        const files = result.map(([entry, file]) => {
          todo.push(addToCache(sw.cache, entry.fsPath, file))
          return entry.fsPath
        })
        sendNotify('clearFileCache', { files })
        Promise.all(todo).then(result => {
          if (fileToRun) runFile(fileToRun)
        })
        console.log(
          'result',
          result.map(([entry, file]) => entry.fsPath + '/' + entry.lastModified),
        )
      }
    })

    // TODO clear sw cache
    // TODO sendCmd clearFileCache {files}
  }
  requestAnimationFrame(checkFiles)
}

const paramChangeCallback = params => {
  console.log('params', params)
  sendCmd('runMain', { params })
}
const runScript = (script, url) => {
  sendCmd('runScript', { script, url }).then(result => {
    console.log('result', result)
    genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
  })
}
const runFile = file => {
  sendCmd('runFile', { file }).then(result => {
    console.log('result', result)
    genParams({ target: byId('paramsDiv'), params: result.def || {}, callback: paramChangeCallback })
  })
}

checkFiles()

async function fileDropped(ev) {
  //this.worker.postMessage({action:'fileDropped', dataTransfer})
  let files = extractEntries(ev.dataTransfer)
  if (!files.length) return

  checkPrimary.length = 0
  checkSecondary.length = 0
  fileToRun = 'index.js'
  let folderName
  clearFs(sw)
  sendCmd('clearTempCache', {})
  let rootFiles = []
  if (files.length === 1) {
    const file = files[0]
    if (file.isDirectory) {
      folderName = file.name
      console.log('dropped', file.name)
      file.fsDir = '/'
      rootFiles = await readDir(file)
    } else {
      console.log("just one file dropped", file)
      file.file((contents) => {
        const reader = new FileReader()
        reader.onload = function (event) {
          // Load into editor
          editor.setSource(event.target.result)
        }
        reader.readAsText(contents)
      })

      rootFiles.push(file)
      fileToRun = file.name
    }
  } else {
    rootFiles = Array.from(files)
  }
  rootFiles = rootFiles.map(e => fileToFsEntry(e, '/'))
  sw.roots.push(rootFiles)

  let pkgFile = await findFileInRoots(sw.roots, 'package.json')
  if (pkgFile) {
    let pack = JSON.parse(await readAsText(pkgFile))
    if (pack.main) fileToRun = pack.main
    const alias = []
    if (pack.workspaces)
      for (let i = 0; i < pack.workspaces.length; i++) {
        const w = pack.workspaces[i]
        // debugger
        let pack2 = await findFileInRoots(sw.roots, `/${w}/package.json`)
        if (pack2) pack2 = JSON.parse(await readAsText(pack2))
        let name = pack2?.name || w
        let main = pack2?.main || 'index.js'
        alias.push([`/${w}/${main}`, name])
      }
    if (alias.length) {
      sendNotify('init', { alias })
    }
  }

  let time = Date.now()
  const preLoad = ['/' + fileToRun, '/package.json']
  const loaded = await addPreLoadAll(sw, preLoad, true)
  console.log(Date.now() - time, 'preload', loaded)
  // TODO make proxy for calling commands
  // worker.cmd worker.notify

  if (fileToRun) {
    fileToRun = `/${fileToRun}`
    runFile(fileToRun)
    checkPrimary.push(await findFileInRoots(sw.roots, fileToRun))
  }
}

// ************ init ui     *********************************

window.boxInfoClick = function (event, box) {
  console.log('boxInfoClick', box, event.target)
}

Promise.all(useEngines.map(engine => engineState.initEngine(byId('box_' + engine), engine, ctrl))).then(() => {
  //
  console.log('engines initialized', useEngines)
})
