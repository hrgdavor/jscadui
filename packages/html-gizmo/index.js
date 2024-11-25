// @ts-ignore
import style from './gizmo.css.txt?raw'

/**
 * @typedef {object} SideNames
 * @prop {string} T
 * @prop {string} B
 * @prop {string} N
 * @prop {string} S
 * @prop {string} E
 * @prop {string} W
 */

/** @type {SideNames} */
export const names = {
  T: 'TOP',
  B: 'BOTTOM',
  S: 'FRONT',
  N: 'BACK',
  W: 'LEFT',
  E: 'RIGHT',
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
  static define() { }

  /** @type {ShadowRoot} */
  #root

  /** @type {HTMLElement} */
  #first = document.createElement('div')

  names

  /** @type {((cam:string)=>void) | undefined} */
  oncam

  constructor(_names = names) {
    super()
    this.names = _names
  }

  connectedCallback() {
    this.#root = this.attachShadow({ mode: 'open' })
    const first = this.#first
    first.classList.add("cube")
    const styleElement = document.createElement('style')
    styleElement.innerHTML = style

    this.#root.append(this.#first, styleElement)

    this.setNames(this.names)

    first.addEventListener('dragstart', (e) => e.preventDefault())
  }

  setNames(_names = names) {
    this.#first.append(
      this.#makeSide(_names, 'T', 'TNW,TN,TNE', 'TW,T,TE', 'TSW,TS,TSE'),
      this.#makeSide(_names, 'B', 'BSW,BS,BSE', 'BW,B,BE', 'BNW,BN,BNE'),
      this.#makeSide(_names, 'S', 'TSW,TS,TSE', 'SW,S,SE', 'BSW,BS,BSE'),
      this.#makeSide(_names, 'N', 'TNE,TN,TNW', 'NE,N,NW', 'BNE,BN,BNW'),
      this.#makeSide(_names, 'E', 'TSE,TE,TNE', 'SE,E,NE', 'BSE,BE,BNE'),
      this.#makeSide(_names, 'W', 'TNW,TW,TSW', 'NW,W,SW', 'BNW,BW,BSW'),
    )
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
    if (typeof rx === 'number') rx = rx + 'rad'
    if (typeof rz === 'number') rz = rz + 'rad'
    this.style.setProperty('--cube-transform', `scale3d(0.8,0.8,0.8) rotateX(${rx}) rotateZ(${rz})`)
  }

  /**
   * @param {SideNames} names 
   * @param {string} name 
   * @param  {...string} parts 
   * @returns {HTMLDivElement}
   */
  #makeSide = (names, name, ...parts) => {
    const result = document.createElement('div')
    result.setAttribute('part', 'face')
    result.classList.add('cube__face', `cube__face--${name}`)

    const bg = document.createElement('div')
    bg.classList.add('bg')
    bg.setAttribute('part', 'face-bg')

    result.append(bg)

    result.append(
      ...parts.flatMap(part => part.split(',').map(c => {
        const i = document.createElement('i')
        i.setAttribute('c', c)
        i.textContent = names[c] ?? ''
        i.addEventListener('click', e => {
          e.preventDefault()
          e.stopPropagation()
          this.oncam?.(c)
        })
        i.addEventListener('pointerover', (e) => this.#mouseover(c, true))
        i.addEventListener('pointerout', (e) => this.#mouseover(c, false))
        return i
      }))
    )

    return result
  }

  /**
   * @param {string} cam 
   * @param {boolean} over 
   */
  #mouseover = (cam, over) => {
    // select all camera links for the same camera (highlight corners)
    const all = this.#first.querySelectorAll(`[c="${cam}"]`)
    for (const el of all) {
      el.classList.toggle('hover', over)
    }
  }
}
