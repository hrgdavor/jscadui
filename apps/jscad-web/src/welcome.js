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

export const dismiss = (e) => {
  // dismiss if click on anything other than a link
  if (showing && (!e || !welcome.contains(e.target) || e.target.nodeName !== "A")) {
    welcome.style.display = "none"
    showing = false
  }
}
