
export const init = () => {
  const menu = document.getElementById("menu")
  const button = document.getElementById("menu-button")
  button.addEventListener("click", () => {
    menu.classList.toggle("open")
  })

  window.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
      menu.classList.remove("open")
    }
  })

  // TODO: add examples to menu
  const content = document.getElementById("menu-content")
}
