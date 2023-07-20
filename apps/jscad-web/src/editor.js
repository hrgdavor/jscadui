import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { defaultKeymap } from "@codemirror/commands"
import { keymap } from "@codemirror/view"

const initialCode = `const jscad = require("@jscad/modeling")
const { intersect, subtract } = jscad.booleans
const { colorize } = jscad.colors
const { cube, sphere } = jscad.primitives

const main = () => {
  const outer = subtract(
    cube({ size: 10 }),
    sphere({ radius: 6.8 })
  )
  const inner = intersect(
    sphere({ radius: 4 }),
    cube({ size: 7 })
  )
  return [
    colorize([0.65, 0.25, 0.8], outer),
    colorize([0.7, 0.7, 0.1], inner),
  ]
}

module.exports = { main }
`

let view
let isMouseDown = false
let isDragging = false
let dragStartX
let dragStartWidth
let dragStartTime

export const init = (compileFn) => {
  // Initialize codemirror
  const editorDiv = document.getElementById("editor-container")
  view = new EditorView({
    extensions: [
      basicSetup,
      javascript(),
      keymap.of([
        {
          key: "Shift-Enter",
          run: () => compileFn(view.state.doc.toString()),
          preventDefault: true
        },
        {
          key: "Mod-s",
          run: () => compileFn(view.state.doc.toString()),
          preventDefault: true
        },
        ...defaultKeymap
      ])
    ],
    parent: editorDiv,
  })
  setSource(initialCode)

  // Initialize drawer action
  const editor = document.getElementById("editor")
  const toggle = document.getElementById("editor-toggle")
  toggle.addEventListener("click", () => {
    if (!isDragging) {
      editor.classList.toggle("closed")
    }
  })

  toggle.addEventListener('mousedown', (e) => {
    isMouseDown = true
    isDragging = false
    dragStartX = e.clientX
    dragStartWidth = editor.offsetWidth
    dragStartTime = new Date()
    e.preventDefault()
  })

  window.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
      const delta = e.clientX - dragStartX
      // Moved more than 5 pixels, assume dragging
      if (isDragging || Math.abs(delta) > 5) {
        isDragging = true
        editor.classList.add("dragging") // prevent animation
        const width = dragStartWidth - delta
        // Handle open/closed state
        if (width > 0) {
          editor.style.width = `${width}px`
          editor.classList.remove("closed")
        } else {
          editor.style.width = ''
          editor.classList.add("closed")
        }
      }
    }
  })

  window.addEventListener('mouseup', (e) => {
    const downTime = new Date() - dragStartTime
    // Long press, assume dragging
    if (isDragging || downTime > 200) {
      // Prevent click
      isDragging = true
    }
    editor.classList.remove("dragging")
    isMouseDown = false
  })

  // Close drawer on mobile
  if (window.innerWidth < 768) {
    // "dragging" to prevent animation
    editor.classList.add("closed", "dragging")
  }
}

export const setSource = (source) => {
  view.dispatch({changes: {from: 0, to: view.state.doc.length, insert: source}})
}
