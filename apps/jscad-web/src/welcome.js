let showing = true

// Hide the welcome menu when anything is clicked
export const init = () => {
  window.addEventListener("mousedown", () => dismiss())
  window.addEventListener("click", () => dismiss())
  window.addEventListener("drop", () => dismiss())
  window.addEventListener("dragstart", () => dismiss())
  window.addEventListener("dragover", () => dismiss())
}

const dismiss = () => {
  if (showing) {
    document.getElementById("welcome").style.display = "none"
    showing = false
  }
}
