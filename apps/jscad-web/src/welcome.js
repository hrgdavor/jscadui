let showing = true

// Hide the welcome menu when anything is clicked
export const init = () => {
  document.body.addEventListener("mousedown", () => dismiss())
  document.body.addEventListener("click", () => dismiss())
  document.body.addEventListener("drop", () => dismiss())
  document.body.addEventListener("dragstart", () => dismiss())
  document.body.addEventListener("dragover", () => dismiss())
}

const dismiss = () => {
  if (showing) {
    document.getElementById("welcome").style.display = "none"
    showing = false
  }
}
