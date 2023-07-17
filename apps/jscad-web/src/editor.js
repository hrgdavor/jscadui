import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { defaultKeymap } from "@codemirror/commands"
import { keymap } from "@codemirror/view"

const initialCode = `import * as jscad = from "@jscad/modeling"
const { cylinder } = jscad.primitives

export const main = () => {
  return cylinder({})
}
`

let view

export const init = (compileFn) => {
  // Initialize codemirror
  const editorDiv = document.getElementById("editor-container")
  view = new EditorView({
    extensions: [
      basicSetup,
      javascript(),
      keymap.of([
        { key: "Shift-Enter", run: () => compileFn(view.state.doc.toString()) },
        ...defaultKeymap
      ])
    ],
    parent: editorDiv,
  })
  setSource(initialCode)

  // Initialize drawer action
  const editor = document.getElementById("editor")
  document.getElementById("editor-toggle").addEventListener("click", () => {
    editor.classList.toggle("open")
  })

  // Close drawer on mobile
  if (window.innerWidth < 768) {
    editor.classList.remove("open")
  }
}

export const setSource = (source) => {
  view.dispatch({changes: {from: 0, to: view.state.doc.length, insert: source}})
}
