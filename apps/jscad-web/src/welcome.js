const welcome = document.getElementById('welcome')
let showing = true

export const init = () => {
  // hello devs
  console.log('Welcome to JSCAD! Like JavaScript and want to help? Join us at https://github.com/jscad/OpenJSCAD.org')
  if (!welcome) return
  // hide the welcome menu when anything is clicked
  window.addEventListener('mousedown', dismiss)
  window.addEventListener('click', dismiss)
  window.addEventListener('drop', dismiss)
  window.addEventListener('dragstart', dismiss)
  window.addEventListener('dragover', dismiss)
  // permanently hide the welcome menu
  document.getElementById('welcome-dismiss').addEventListener('click', () => {
    localStorage.setItem('welcome.dismissed', true)
    dismiss()
  })
}

export const dismiss = (e) => {
  if (!welcome) return
  // dismiss if click on anything other than a link
  const isClickable = ['A', 'LABEL', 'INPUT'].includes(e?.target?.nodeName)
  if (showing && (!e || !welcome.contains(e.target) || !isClickable)) {
    welcome.remove()
    showing = false
  }
}
