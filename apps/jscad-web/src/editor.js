import { defaultKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { keymap } from '@codemirror/view'
import { EditorView, basicSetup } from 'codemirror'
import { readAsText } from '@jscadui/fs-provider'

import * as drawer from './drawer.js'

let view

let compileFn
let saveFn
let getFileFn

// file selector
let currentFile = '/index.js'
let editorNav
let editorFile

const compile = (code, path) => {
  if (compileFn) {
    compileFn(code, path)
  } else {
    console.log('not ready to compile')
  }
}

const save = (code, path) => {
  compileFn(code, path)
  saveFn(code, path)
}

export const runScript = ()=>compile(view.state.doc.toString(), currentFile)

export const init = (defaultCode, fn, _saveFn, _getFileFn) => {
  // by calling document.getElementById here instead outside of init we allow the flow
  // where javascript is included in the page before the tempalte is loaded into the DOM
  // it was causing issue to users trying to replicate the app in Vue, and would likely some others too
  editorNav = document.getElementById('editor-nav')
  editorFile = document.getElementById('editor-file')

  compileFn = fn
  saveFn = _saveFn
  getFileFn = _getFileFn
  // Initialize codemirror
  const editorDiv = document.getElementById('editor-container')
  view = new EditorView({
    extensions: [
      basicSetup,
      javascript(),
      keymap.of([
        {
          key: 'Shift-Enter',
          run: runScript,
          preventDefault: true,
        },
        {
          key: 'Mod-s',
          run: () => save(view.state.doc.toString(), currentFile),
          preventDefault: true,
        },
        ...defaultKeymap,
      ]),
    ],
    parent: editorDiv,
  })
  setSource(defaultCode, 'jscad.example.js')

  // Initialize drawer action
  drawer.init()

  // Make editor hint clickable
  document.getElementById('editor-hint').addEventListener('click', () => {
    compile(view.state.doc.toString(), currentFile)
  })
  document.getElementById('editor-hint2').addEventListener('click', () => {
    save(view.state.doc.toString(), currentFile)
  })

  // Setup file selector
  editorFile.addEventListener('click', () => {
    editorNav.classList.toggle('open')
  })
  // Close file selector on click outside
  document.addEventListener('click', (e) => {
    if (!editorFile.contains(e.target)) {
      editorNav.classList.remove('open')
    }
  })
}

export const getSource = () => view.state.doc.toString()

export const setSource = (source, path = '/index.js') => {
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: source } })
  currentFile = path
}

export async function filesChanged(files){
  let file
  for(let i=0; i<files.length; i++){
    let path = files[i]    
    if(path == currentFile){
      file = await getFileFn(path)
      readSource(file, currentFile)
    }else if(path.name === currentFile){
      setSource(await readAsText(path), currentFile)
    }
  }
}

async function readSource(file, currentFile){
  setSource(await readAsText(file), currentFile)
}

let editorFilesArr = []

export const getEditorFiles = ()=>editorFilesArr

export const setFiles = (files) => {
  const editorFiles = document.getElementById('editor-files')
  editorFilesArr = files
  if (files.length < 2) {
    editorNav.classList.remove('visible')
  } else {
    // Update spinner
    editorFile.innerHTML = currentFile
    editorFiles.innerHTML = ''
    files.forEach((file) => {
      const item = document.createElement('li')
      const button = document.createElement('button')
      button.innerText = file.fullPath
      button.addEventListener('click', () => {
        currentFile = file.fullPath
        editorFile.innerHTML = currentFile
        readSource(file, currentFile)
      })
      item.appendChild(button)
      editorFiles.appendChild(item)
    })
    editorNav.classList.add('visible')
  }
}
