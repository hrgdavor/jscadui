import style from './gizmo.css?inline'

export class Gizmo extends HTMLElement {
  #root
  connectedCallback() {
    this.#root = this.attachShadow({ mode: 'open' })
    this.#root.innerHTML = `<div class="cube">
    <div class="cube__face cube__face--front" cam="front">front</div>
    <div class="cube__face cube__face--back" cam="back">back</div>
    <div class="cube__face cube__face--right" cam="right">right</div>
    <div class="cube__face cube__face--left" cam="left">left</div>
    <div class="cube__face cube__face--top" cam="top">top</div>
    <div class="cube__face cube__face--bottom" cam="bottom">bottom</div>
  </div><style>${style}</style>`
    this.#root.firstElementChild.onclick = e => {
      const cam = e.target.getAttribute('cam')
      console.log(e.target, cam)
      this.oncam?.({cam})
    }
  }
  
  setSize(size) {
    this.style.setProperty('--cube-size', size + 'px')
  }

  rotateYZ(rx,rz){
    this.style.setProperty('--cube-transform', `scale3d(0.8,0.8,0.8) rotateX(${rx}rad) rotateZ(${rz}rad)`)
  }
}
