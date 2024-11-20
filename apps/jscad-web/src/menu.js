import { examples } from './examples.js'

const menu = /** @type {HTMLElement} */ (document.getElementById('menu'))

export const init = () => {
  const button = /** @type {HTMLElement} */ (document.getElementById('menu-button'))
  const content = /** @type {HTMLElement} */ (document.getElementById('menu-content'))

  // Menu button
  button.addEventListener('click', () => {
    menu.classList.toggle('open')
  })

  // Close menu when anything else is clicked
  window.addEventListener('click', e => {
    if (!button.contains(e.target) && !content.contains(e.target)) {
      dismiss()
    }
  })
  window.addEventListener('drop', () => dismiss())
  window.addEventListener('dragstart', () => dismiss())
  window.addEventListener('dragover', () => dismiss())

  // Add examples to menu
  const exampleDiv = /** @type {HTMLElement} */ (document.getElementById('examples'))
  examples.forEach(({ name, source }) => {
    const a = document.createElement('a')
    a.innerText = name
    a.addEventListener('click', async () => {
      console.log(`load example ${name} from ${source}`)
      document.location.hash = '#' + source
    })
    const li = document.createElement('li')
    li.appendChild(a)
    exampleDiv.appendChild(li)
  })
}

const dismiss = () => {
  menu.classList.remove('open')
}
