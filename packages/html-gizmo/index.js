import style from './gizmo.css?inline'

export const names = {
  T: 'TOP',
  B: 'BOTTOM',
  S: 'FRONT',
  N: 'BACK',
  W: 'LEFT',
  E: 'RIGHT',
}

const makeSide = (names, name, ...parts) => {
  const out = [`<div part="face" class="cube__face cube__face--${name}"><div class="bg" part="face-bg"></div>`]
  parts.forEach(p => p.split(',').forEach(c => out.push(`<i c="${c}">${names[c] || ''}</i>`)))
  out.push('</div>')
  return out.join('')
}

export class Gizmo extends HTMLElement {
  #root
  #first
  names
  
  constructor(_names=names){
    super()
    this.names = _names
  }

  connectedCallback() {
    this.#root = this.attachShadow({ mode: 'open' })
    this.#root.innerHTML = `<div class="cube"></div><style>${style}</style>`

    const first = this.#first = this.#root.firstElementChild

    this.setNames(this.names)

    first.onclick = e => {
      const cam = e.target.getAttribute('c')
      if (cam) this.oncam?.({ cam })
    }

    const doHoverClass = (el, over) => {
      const classList = el.classList
      if (over) classList.add('hover')
      else classList.remove('hover')
    }

    const mouseover = (el, over) => {
      const cam = el.getAttribute('c')
      if (cam) {
        // select all camera links for the same camera (higliht corners)
        const all = first.querySelectorAll(`[c="${cam}"]`)
        all.forEach(el => doHoverClass(el, over))
      }
    }

    first.onmouseover = e => mouseover(e.target, true)

    first.onmouseout = e => mouseover(e.target, false)
    first.ondragstart = e => e.preventDefault()
  }

  setNames(_names=names){
    this.#first.innerHTML =
      makeSide(_names, 'T', 'TNW,TN,TNE', 'TW,T,TE', 'TSW,TS,TSE') +
      makeSide(_names, 'B', 'BSW,BS,BSE', 'BW,B,BE', 'BNW,BN,BNE') +
      makeSide(_names, 'S', 'TSW,TS,TSE', 'SW,S,SE', 'BSW,BS,BSE') +
      makeSide(_names, 'N', 'TNE,TN,TNW', 'NE,N,NW', 'BNE,BN,BNW') +
      makeSide(_names, 'E', 'TSE,TE,TNE', 'SE,E,NE', 'BSE,BE,BNE') +
      makeSide(_names, 'W', 'TNW,TW,TSW', 'NW,W,SW', 'BNW,BW,BSW')
  }

  setSize(size) {
    this.style.setProperty('--cube-size', size + 'px')
  }

  rotateXZ(rx, rz) {
    if(typeof rx === 'number') rx = rx+'rad'
    if(typeof rz === 'number') rz = rz+'rad'
    this.style.setProperty('--cube-transform', `scale3d(0.8,0.8,0.8) rotateX(${rx}) rotateZ(${rz})`)
  }
}
