import * as THREE from '@jscadui/bundle-three'
import { RenderThree } from '@jscadui/render-three'
import { makeAxes, makeGrid } from '@jscadui/scene'
import { light as theme } from '@jscadui/themes'

window.THREE = THREE // just so we can play with and inspect THREE in browser console
const defaultCamera = { position: [180, -180, 220], target: [0, 0, 0] }
const root = document.getElementById('root')
const viewer = RenderThree(root, { camera: defaultCamera, bg: theme.bg })

// ResizeObserver is beter than window resize as it can be used on any element
const resizeObserver = new ResizeObserver(entries => {
  const rect = entries[0].contentRect
  viewer.resize(rect)
})
resizeObserver.observe(root)

const axes = [makeAxes(50)]
const grid = makeGrid({ size: 200, color1: theme.grid1, color2: theme.grid2 })

viewer.setScene({
  items: [
    { id: 'axes', items: axes },
    { id: 'grid', items: grid },
  ],
})

const h = (tag, attr, html) => {
  const out = document.createElement(tag)
  if (attr) {
    for (let aName in attr) out.setAttribute(aName, attr[aName])
  }
  if (html) out.innerHTML = html
  return out
}

const boxDiv = h('div',{class:'scene'},`<div class="cube">
    <div class="cube__face cube__face--front">front</div>
    <div class="cube__face cube__face--back">back</div>
    <div class="cube__face cube__face--right">right</div>
    <div class="cube__face cube__face--left">left</div>
    <div class="cube__face cube__face--top">top</div>
    <div class="cube__face cube__face--bottom">bottom</div>
  </div>`)

document.body.appendChild(boxDiv)
console.log('boxDiv', boxDiv)
