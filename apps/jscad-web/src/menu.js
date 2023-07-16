
const menu = document.getElementById("menu")

export const init = () => {
  const button = document.getElementById("menu-button")
  const content = document.getElementById("menu-content")

  // Menu button
  button.addEventListener("click", () => {
    menu.classList.toggle("open")
  })

  // Close menu when anything else is clicked
  window.addEventListener("click", (e) => {
    if (!button.contains(e.target) && !content.contains(e.target)) {
      dismiss()
    }
  })
  window.addEventListener("drop", () => dismiss())
  window.addEventListener("dragstart", () => dismiss())
  window.addEventListener("dragover", () => dismiss())

  // TODO: add examples to menu
}

const dismiss = () => {
  menu.classList.remove("open")
}
