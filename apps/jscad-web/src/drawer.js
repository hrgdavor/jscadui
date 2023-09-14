let isMouseDown = false
let isDragging = false
let dragStartX
let dragStartWidth
let dragStartTime

// Initialize drawer action
// Initial open/closed state is in index.html to prevent flash of content
export const init = () => {
  const editor = document.getElementById('editor')
  const toggle = document.getElementById('editor-toggle')

  // Set editor width and handle open/closed state
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
      const isClosed = editor.classList.contains('closed')
      localStorage.setItem('editor.closed', !isClosed)
      if (isClosed) {
        setEditorWidth(localStorage.getItem('editor.width') || 400)
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
    dragStartTime = new Date()
    e.preventDefault()
  })

  window.addEventListener('pointermove', (e) => {
    if (isMouseDown) {
      const delta = e.clientX - dragStartX
      // Moved more than 5 pixels, assume dragging
      if (isDragging || Math.abs(delta) > 5) {
        isDragging = true
        editor.classList.add('dragging') // prevent animation
        const width = Math.max(0, dragStartWidth - delta)
        setEditorWidth(width)
      }
    }
  })

  window.addEventListener('pointerup', (e) => {
    editor.classList.remove('dragging')
    const downTime = new Date() - dragStartTime
    // Long press, assume dragging
    if (isDragging || downTime > 200) {
      // Prevent click
      isDragging = true
      // Save width
      const width = editor.offsetWidth
      // Minimum width, otherwise snap to closed
      if (width > 10) {
        localStorage.setItem('editor.width', width)
        localStorage.setItem('editor.closed', false)
      } else {
        localStorage.setItem('editor.closed', true)
        setEditorWidth(0)
      }
    }
    isMouseDown = false
  })

  // Close drawer on mobile
  if (window.innerWidth < 768) {
    // 'dragging' to prevent animation
    editor.classList.add('closed', 'dragging')
  }
}
