import { examples } from './examples.js'
import {
  swLibDemo,
  swStructureDemos,
  swOrnamentDemos,
  swLibDemos,
  swModels,
} from './projects.js'

const menu = /** @type {HTMLElement} */ (document.getElementById('menu'))

export const init = () => {
  const button = /** @type {HTMLElement} */ (document.getElementById('menu-button'))
  const content = /** @type {HTMLElement} */ (document.getElementById('menu-content'))

  const getMenuClick = (name, source) => {
    return async () => {
      console.log(`load project ${name} from ${source}`)
      document.location.hash = '#' + source
    }
  };

  const generateLink = (name, source, parent) => {
    const a = document.createElement('a')
    a.innerText = name
    a.addEventListener('click', getMenuClick(name, source))
    const li = document.createElement('li')
    li.appendChild(a)
    parent.appendChild(li)
  }

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
    a.addEventListener('click', getMenuClick(name, source))
    const li = document.createElement('li')
    li.appendChild(a)
    exampleDiv.appendChild(li)
  })

  // Add SW projects to menu
  const swLibDemosDiv = /** @type {HTMLElement} */ (document.getElementById('sw-projects-1'))
  generateLink(swLibDemo.name, swLibDemo.source, swLibDemosDiv);

  const swStructuresDiv = /** @type {HTMLElement} */ (document.getElementById('sw-projects-2'))
  swStructureDemos.forEach(({ name, source }) => {
    generateLink(name, source, swStructuresDiv);
  })
  const swOrnamentsDiv = /** @type {HTMLElement} */ (document.getElementById('sw-projects-3'))
  swOrnamentDemos.forEach(({ name, source }) => {
    generateLink(name, source, swOrnamentsDiv);
  })

  const swModelsDiv = /** @type {HTMLElement} */ (document.getElementById('sw-projects-4'))
  swModels.forEach(({ name, source }) => {
    generateLink(name, source, swModelsDiv);
  })
}

const dismiss = () => {
  menu.classList.remove('open')
}
