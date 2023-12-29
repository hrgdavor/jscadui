import * as THREE from '@jscadui/bundle-three'
import { RenderThree } from '@jscadui/render-three'
import { makeAxes, makeGrid } from '@jscadui/scene'
import { light as theme } from '@jscadui/themes'
import { observeResize } from './observeResize'
import { Gizmo } from '@jscadui/html-gizmo'

import style from "./main.css";

window.THREE = THREE // just so we can play with and inspect THREE in browser console
const defaultCamera = { position: [180, -180, 220], target: [0, 0, 0] }
const root = document.getElementById('root')
const viewer = RenderThree(root, { camera: defaultCamera, bg: theme.bg })

observeResize(root, e=>viewer.resize(e.contentRect))

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

const gizmo = new Gizmo()
document.body.appendChild(gizmo)
//gizmo.setSize(200)
