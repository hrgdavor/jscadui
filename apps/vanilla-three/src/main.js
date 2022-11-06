import * as THREE from '@jscadui/bundle-three'
import { RenderThree } from '@jscadui/render-three'
import { makeAxes, makeGrid } from '@jscadui/scene'
import { light } from '@jscadui/themes'

window.THREE = THREE // just so we can play with and inspect THREE in browser console
let theme = light
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
