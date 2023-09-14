let isMouseDown = false
let isDragging = false
let dragStartX
let dragStartWidth
let dragStartTime

export const init = () => {
  // Initialize drawer action
  const editor = document.getElementById('editor')
  const toggle = document.getElementById('editor-toggle')

  const setEditorWidth = (w) => {
    if (w) editor.style.width = `${w}px`
  }
  setEditorWidth(localStorage.getItem('editor.width') || 400)

  toggle.addEventListener('click', () => {
    if (!isDragging) {
      editor.classList.toggle('closed')
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
        const width = dragStartWidth - delta
        // Handle open/closed state
        if (width > 0) {
          setEditorWidth(width)
          localStorage.setItem('editor.width', width)
          editor.classList.remove('closed')
        } else {
          editor.style.width = ''
          editor.classList.add('closed')
        }
      }
    }
  })

  window.addEventListener('pointerup', (e) => {
    const downTime = new Date() - dragStartTime
    // Long press, assume dragging
    if (isDragging || downTime > 200) {
      // Prevent click
      isDragging = true
    }
    editor.classList.remove('dragging')
    isMouseDown = false
  })

  // Close drawer on mobile
  if (window.innerWidth < 768) {
    // 'dragging' to prevent animation
    editor.classList.add('closed', 'dragging')
  }
}
