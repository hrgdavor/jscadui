let showing = true

// Hide the welcome menu when anything is clicked
export const init = () => {
  document.body.addEventListener("mousedown", () => dismiss())
  document.body.addEventListener("click", () => dismiss())
}

const dismiss = () => {
  if (showing) {
    document.getElementById("welcome").style.display = "none"
    showing = false
  }
}
