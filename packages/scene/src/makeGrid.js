/**
  @typedef MakeGridOptions
  @type {Object}
  @property size {number} grid size
  @property color1 {Array} rgba float (0..1)
  @property color2 {Array} rgba float (0..1)


 Even though opacity in jscad theme is 1 for color1 and 0.5 for color2, the closest match to the color on the website
 is 0.2 and 0.1
 Opacity per line-segment is tricky and was added only in threejs 127. so splitting the grid into 2 separate set of lines
 allows to have different opacity for grid and subgrid via opacity attribute and keep rgb colors. Also this removes the need to use
 color per line, and the two set of lines can simply use color property
  * 
  * @param {MakeGridOptions} options 
  * @returns 
  */
export const makeGrid = ({ color1 = [0, 0, 0, 0.2], color2 = [0, 0, 0.6, 0.1], size = 200 } = {}) => {
  const lineCount = size + 1
  const mainLineCount = Math.floor(lineCount / 10)
  const lines1 = new Float32Array(mainLineCount * 12 + 12)
  const lines2 = new Float32Array((lineCount - mainLineCount) * 12)
  const half = Math.floor(size / 2)

  function makeLine4x(lines, offset, i) {
    offset = makeLine(lines, offset, i, i, half, -half)
    offset = makeLine(lines, offset, -i, -i, half, -half)
    offset = makeLine(lines, offset, half, -half, i, i)
    offset = makeLine(lines, offset, half, -half, -i, -i)
    return offset
  }
  function makeLine(lines, offset, x1, x2, y1, y2) {
    lines[offset++] = x1
    lines[offset++] = y1
    lines[offset++] = 0

    lines[offset++] = x2
    lines[offset++] = y2
    lines[offset++] = 0
    return offset
  }

  let offset1 = 0
  let offset2 = 0
  offset1 = makeLine(lines1, offset1, 0, 0, half, -half)
  offset1 = makeLine(lines1, offset1, half, -half, 0, 0)
  for (let i = 1; i <= half; i++) {
    if (i % 10 == 0) {
      offset1 = makeLine4x(lines1, offset1, i)
    } else {
      offset2 = makeLine4x(lines2, offset2, i)
    }
  }
  return [
    { vertices: lines1, color: color1, type: 'lines', isTransparent: true },
    { vertices: lines2, color: color2, type: 'lines', isTransparent: true },
  ]
}
