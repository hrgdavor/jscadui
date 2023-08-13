import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { defaultKeymap } from "@codemirror/commands"
import { keymap } from "@codemirror/view"
import * as drawer from './drawer.js'

let view

let compileFn

const compile = (code) => {
  if (compileFn) {
    compileFn(code)
  } else {
    console.log("not ready to compile")
  }
}

export const init = (defaultCode, fn) => {
  compileFn = fn
  // Initialize codemirror
  const editorDiv = document.getElementById("editor-container")
  view = new EditorView({
    extensions: [
      basicSetup,
      javascript(),
      keymap.of([
        {
          key: "Shift-Enter",
          run: () => compile(view.state.doc.toString()),
          preventDefault: true
        },
        {
          key: "Mod-s",
          run: () => compile(view.state.doc.toString()),
          preventDefault: true
        },
        ...defaultKeymap
      ])
    ],
    parent: editorDiv,
  })
  setSource(defaultCode)

  // Initialize drawer action
  drawer.init()
}

export const setSource = (source) => {
  view.dispatch({changes: {from: 0, to: view.state.doc.length, insert: source}})
}
