
const white = [1, 1, 1, 1]
export function CommonToRegl () {
  let SEQ = 0
  function _CSG2Regl (obj, scene, meshColor) {
    let { vertices, indices = [], normals, color=meshColor, colors, isTransparent = false, opacity } = obj
    const { transforms } = obj
    const objType = obj.type || 'mesh'

    const visuals = {
      show: true,
      color,
      transparent: isTransparent || (color?.length>3 && color[3] <1),
      useVertexColors: !!(colors && colors.length)
    }
    // something is messed up with regl, stupidly requires normals even for lines
    if(!normals) {
      normals = []
      const vertCount = vertices.length
      for(let i=0; i<vertCount; i++){
        normals[i] = 1
      }
    }

    const geometry = { positions: vertices, transforms }

    if (indices.length) geometry.indices = indices
    if (indices) geometry.indices = indices
    if (normals) geometry.normals = normals

    let _colors
    if (colors && colors.length) {
      // we require 4 channel vertex colors
      if (colors.length <= vertices.length) {
        _colors = new Float32Array(Math.ceil(vertices.length / 3 * 4))
        let idx = 0
        for (let i = 2; i < vertices.length; i += 3) {
          _colors[idx++] = colors[i - 2]
          _colors[idx++] = colors[i - 1]
          _colors[idx++] = colors[i]
          _colors[idx++] = 1
        }
      } else {
        _colors = colors
      }
    }
    // if (color && color[3] == 0.2) color[3] = 0.45
    // if (color && color[3] == 0.1) color[3] = 0.3

    let _opacity
    switch (objType) {
      case 'mesh':
        visuals.drawCmd = 'drawMesh'
        break
      case 'lines':
        visuals.drawCmd = 'drawLines'
        if (!indices.length) {
          const len = vertices.length / 3
          for (let i = 0; i < len; i++) {
            indices.push(i)
          }
        }
        _opacity = (color ? color[3] : 0) || opacity || 1
        // mesh = new LinesMesh('lines', scene, null, undefined, undefined, useVertexColor, useVertexAlpha || _opacity < 1, material)
        if (color) geometry.color = color
        if (_colors) {
          geometry.colors = _colors
          // geometry.color = white
        }

        break
    }
    console.log('visuals', visuals)
    //    if (transforms && !isInstanced) mesh.applyMatrix4({ elements: transforms })
    return { geometry, visuals, transparent:visuals.transparent }
  }

  return _CSG2Regl
}
