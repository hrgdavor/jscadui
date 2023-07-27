const welcome = document.getElementById("welcome")
let showing = true

// Hide the welcome menu when anything is clicked
export const init = () => {
  window.addEventListener("mousedown", (e) => dismiss(e))
  window.addEventListener("click", (e) => dismiss(e))
  window.addEventListener("drop", () => dismiss())
  window.addEventListener("dragstart", () => dismiss())
  window.addEventListener("dragover", () => dismiss())
}

const dismiss = (e) => {
  if (showing && (!e || !welcome.contains(e.target))) {
    document.getElementById("welcome").style.display = "none"
    showing = false
  }
}
