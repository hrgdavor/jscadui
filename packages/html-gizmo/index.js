// @ts-ignore
import style from './gizmo.css.txt?raw'

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

/** 
 * If using in HTML as tag <jscadui-gizmo/> you must call the static method Gizmo.define().
 * 
 * If creating from code via new Gizmo() static initializer will be triggered automatically.
 * 
 */
export class Gizmo extends HTMLElement {
  static {
    // auto define
    customElements.define('jscadui-gizmo', this)
  }
  /** Empty method that can be called to trigger static initializer, that will then
   * trigger customElements.define('jscadui-gizmo', this)
   */
  static define() {}

  /** @type {ShadowRoot} */
  #root

  /** @type {HTMLElement} */
  #first

  names

  /** @type {((cam:string)=>void) | undefined} */
  oncam

  constructor(_names=names){
    super()
    this.names = _names
  }

  connectedCallback() {
    this.#root = this.attachShadow({ mode: 'open' })
    this.#root.innerHTML = `<div class="cube"></div><style>${style}</style>`

    const first = this.#first = /** @type {HTMLElement} */ (this.#root.firstElementChild)

    this.setNames(this.names)

    first.addEventListener('click', (e) => {
      const cam = e.target.getAttribute('c')
      if (cam) this.oncam?.(cam)
    })

    const mouseover = (el, over) => {
      const cam = el.getAttribute('c')
      if (cam) {
        // select all camera links for the same camera (highlight corners)
        const all = first.querySelectorAll(`[c="${cam}"]`)
        all.forEach((el) => {
          // toggle hover class
          if (over) el.classList.add('hover')
          else el.classList.remove('hover')
        })
      }
    }

    first.addEventListener('pointerover', (e) => mouseover(e.target, true))
    first.addEventListener('pointerout', (e) => mouseover(e.target, false))
    first.addEventListener('dragstart', (e) => e.preventDefault())
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

  /**
   * @param {number} size 
   */
  setSize(size) {
    this.style.setProperty('--cube-size', size + 'px')
  }

  /**
   * @param {number | string} rx 
   * @param {number | string} rz 
   */
  rotateXZ(rx, rz) {
    if(typeof rx === 'number') rx = rx+'rad'
    if(typeof rz === 'number') rz = rz+'rad'
    this.style.setProperty('--cube-transform', `scale3d(0.8,0.8,0.8) rotateX(${rx}) rotateZ(${rz})`)
  }
}
