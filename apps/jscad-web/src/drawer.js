let isMouseDown = false
let isDragging = false
let dragStartX = 0
let dragStartWidth = 0
let dragStartTime = 0

// Initialize drawer action
// Initial open/closed state is in index.html to prevent flash of content
export const init = () => {
  const editor = /** @type {HTMLElement} */ (document.getElementById('editor'))
  const toggle = /** @type {HTMLElement} */ (document.getElementById('editor-toggle'))

  /**
   * Set editor width and handle open/closed state
   * @param {number} w 
   */
  const setEditorWidth = (w) => {
    if (w > 0) {
      editor.style.width = `${w}px`
      editor.classList.remove('closed')
    } else {
      editor.classList.add('closed')
    }
  }

  toggle.addEventListener('click', () => {
    if (!isDragging) {
      editor.classList.add('transition') // animate
      const isClosed = editor.classList.contains('closed')
      localStorage.setItem('editor.closed', String(!isClosed))
      if (isClosed) {
        setEditorWidth(parseInt(localStorage.getItem('editor.width') ?? "400"))
      } else {
        setEditorWidth(0)
      }
    }
  })

  toggle.addEventListener('pointerdown', (e) => {
    isMouseDown = true
    isDragging = false
    dragStartX = e.clientX
    dragStartWidth = editor.offsetWidth
    dragStartTime = e.timeStamp
    e.preventDefault()
  })

  window.addEventListener('pointermove', (e) => {
    if (isMouseDown) {
      const delta = e.clientX - dragStartX
      // Moved more than 5 pixels, assume dragging
      if (isDragging || Math.abs(delta) > 5) {
        isDragging = true
        editor.classList.remove('transition') // no animation when dragging
        const width = Math.max(0, dragStartWidth - delta)
        setEditorWidth(width)
      }
    }
  })

  window.addEventListener('pointerup', (e) => {
    const downTime = e.timeStamp - dragStartTime
    // Long press, assume dragging
    if (isDragging || downTime > 200) {
      // Prevent click
      isDragging = true
      // Save width
      const width = editor.offsetWidth
      // Minimum width, otherwise snap to closed
      if (width > 50) {
        localStorage.setItem('editor.width', String(width))
        localStorage.setItem('editor.closed', "false")
      } else {
        localStorage.setItem('editor.closed', "true")
        editor.classList.add('transition') // snap closed
        setEditorWidth(0)
      }
    }
    isMouseDown = false
  })
}
