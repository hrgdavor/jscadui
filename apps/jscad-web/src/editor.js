import { defaultKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { keymap } from '@codemirror/view'
import { EditorView, basicSetup } from 'codemirror'

import * as drawer from './drawer.js'

let view

let compileFn

// file selector
let currentFile = '/index.js'
const editorNav = document.getElementById('editor-nav')
const editorFile = document.getElementById('editor-file')

const compile = (code, path) => {
  if (compileFn) {
    compileFn(code, path)
  } else {
    console.log('not ready to compile')
  }
}

export const init = (defaultCode, fn) => {
  compileFn = fn
  // Initialize codemirror
  const editorDiv = document.getElementById('editor-container')
  view = new EditorView({
    extensions: [
      basicSetup,
      javascript(),
      keymap.of([
        {
          key: 'Shift-Enter',
          run: () => compile(view.state.doc.toString(), currentFile),
          preventDefault: true,
        },
        {
          key: 'Mod-s',
          run: () => compile(view.state.doc.toString(), currentFile),
          preventDefault: true,
        },
        ...defaultKeymap,
      ]),
    ],
    parent: editorDiv,
  })
  setSource(defaultCode)

  // Initialize drawer action
  drawer.init()

  // Make editor hint clickable
  document.getElementById('editor-hint').addEventListener('click', () => {
    compile(view.state.doc.toString(), currentFile)
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

export const setSource = (source, path = '/index.js') => {
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: source } })
  currentFile = path
}

export const setFiles = (files) => {
  const editorFiles = document.getElementById('editor-files')
  if (files.length === 1) {
    editorNav.classList.remove('visible')
  } else {
    // Update spinner
    editorFile.innerHTML = currentFile
    editorFiles.innerHTML = ''
    files.forEach((file) => {
      const item = document.createElement('li')
      const button = document.createElement('button')
      button.innerText = file.fsPath
      button.addEventListener('click', () => {
        currentFile = file.fsPath
        editorFile.innerHTML = currentFile
        // Read FileEntry
        file.file((file) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            setSource(reader.result, currentFile)
          }
          reader.readAsText(file)
        })
      })
      item.appendChild(button)
      editorFiles.appendChild(item)
    })
    editorNav.classList.add('visible')
  }
}
