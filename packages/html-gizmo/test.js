const style =`:host {
  --cube-size: 100px;
  --cube-line-color: #fff;
  --cube-z-color: #00f;
  --cube-x-color: #f00;
  --cube-y-color: #0f0;
  --cube-bg: #ccc;
  --cube-fg: #444;
  --cube-bg-hover: #eee9;
  --cube-fg-hover: #444;
  --cube-corner-radius: 5px;

  width: var(--cube-size);
  height: var(--cube-size);
  margin: calc( var(--cube-size) / 4 );
  perspective: 400px;
  --cube-transform: scale3d(0.8,0.8,0.8);
  --cube-transform-common: translateZ(calc( var(--cube-size) / 2 ));
}
*{
  box-sizing: border-box;
}
.cube, .cube__face, .cube__face i {
  user-select: none;
}
.cube {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: var(--cube-size);
  height: var(--cube-size);
  position: relative;
  transform-style: preserve-3d;
  transform: var(--cube-transform);
}

.cube__face {
  position: absolute;
  width: var(--cube-size);
  height: var(--cube-size);
  font-size: calc( var(--cube-size) / 7 );
  text-align: center;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 20% 60% 20%;
  color: var(--cube-fg);
}
/*
  cube background element is intentionally added so we can put border and generate lines on the cube edges
  and at the same time allow the clickable elements to be responsive to mouse on top of those lines.
  At first border was on the cube__face directly, but then mouseover was flickering as the clickable elements were inside the border.
*/
.cube__face .bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border: solid 1px var(--cube-line-color);
  background-color: var(--cube-bg);
  border-radius: var(--cube-corner-radius);
}

.cube__face i{
  z-index: 1;
  font-style: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cube__face i[c]{
  cursor: pointer;
}
.cube__face i.hover{
  background-color: var(--cube-bg-hover);
  color: var(--cube-fg-hover);
}

.cube__face--T   { transform: rotateY(  0deg) var(--cube-transform-common);}
.cube__face--B   { transform: rotateY(180deg) var(--cube-transform-common) rotateZ(180deg);}
.cube__face--E   { transform: rotateY( 90deg) var(--cube-transform-common) rotateZ(-90deg);}
.cube__face--W   { transform: rotateY(-90deg) var(--cube-transform-common) rotateZ(90deg);}
.cube__face--N   { transform: rotateX( 90deg) var(--cube-transform-common) rotateZ(180deg);}
.cube__face--S   { transform: rotateX(-90deg) var(--cube-transform-common);}



.cube__face--T .bg   { border-left-color: var(--cube-y-color); border-bottom-color: var(--cube-x-color);}
.cube__face--B .bg   { border-left-color: var(--cube-y-color); border-top-color: var(--cube-x-color);}
/* .cube__face--E .bg   { } */
.cube__face--W .bg   { border-right-color: var(--cube-z-color); border-bottom-color: var(--cube-y-color); border-top-color: var(--cube-y-color);}
/* .cube__face--N .bg   { } */
.cube__face--S .bg   { border-left-color: var(--cube-z-color); border-bottom-color: var(--cube-x-color); border-top-color: var(--cube-x-color);}

`;

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
      if (cam) this.oncam?.(cam)
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
