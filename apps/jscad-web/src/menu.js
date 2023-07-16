
export const init = () => {
  const menu = document.getElementById("menu")
  const button = document.getElementById("menu-button")
  button.addEventListener("click", () => {
    menu.classList.toggle("open")
  })

  // add examples to menu
  const content = document.getElementById("menu-content")
}
