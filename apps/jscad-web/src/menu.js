import { examples } from './examples.js'
import {
  swLibDemo,
  swLibCore,
  swBuilders,
  swDetails,
  swFamilies,
  swUx,
  swProjects,
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
  const swDemoDiv = /** @type {HTMLElement} */ (document.getElementById('sw-demo'))
  const firstDemos = [swLibDemo, ...swLibCore, ...swUx];
  firstDemos.forEach(({ name, source }) => {
    generateLink(name, source, swDemoDiv);
  });

  const swBuildersDiv = /** @type {HTMLElement} */ (document.getElementById('sw-demo-builders'))
  swBuilders.forEach(({ name, source }) => {
    generateLink(name, source, swBuildersDiv);
  })

  const swDetailsDiv = /** @type {HTMLElement} */ (document.getElementById('sw-demo-details'))
  swDetails.forEach(({ name, source }) => {
    generateLink(name, source, swDetailsDiv);
  })

  const swFamiliesDiv = /** @type {HTMLElement} */ (document.getElementById('sw-demo-families'))
  swFamilies.forEach(({ name, source }) => {
    generateLink(name, source, swFamiliesDiv);
  })

  const swProjectsDiv = /** @type {HTMLElement} */ (document.getElementById('sw-projects'))
  swProjects.forEach(({ name, source }) => {
    generateLink(name, source, swProjectsDiv);
  })
}

const dismiss = () => {
  menu.classList.remove('open')
}
