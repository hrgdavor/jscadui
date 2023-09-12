const welcome = document.getElementById("welcome")
let showing = true

export const init = () => {
  if (!welcome) return
  // hide the welcome menu when anything is clicked
  window.addEventListener("mousedown", (e) => dismiss(e))
  window.addEventListener("click", (e) => dismiss(e))
  window.addEventListener("drop", () => dismiss())
  window.addEventListener("dragstart", () => dismiss())
  window.addEventListener("dragover", () => dismiss())
  document.getElementById('welcome-dismiss').addEventListener('click', () => {
    localStorage.setItem('welcome.dismissed', true)
    dismiss()
  })
  // hello devs
  console.log('Welcome to JSCAD! Like JavaScript and want to help? Join us at https://github.com/jscad/OpenJSCAD.org')
}

export const dismiss = (e) => {
  // dismiss if click on anything other than a link
  const isClickable = ['A', 'LABEL', 'INPUT'].includes(e?.target?.nodeName)
  if (showing && (!e || !welcome.contains(e.target) || !isClickable)) {
    welcome.remove()
    showing = false
  }
}
