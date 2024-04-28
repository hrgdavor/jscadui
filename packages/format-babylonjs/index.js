export const invertIndices = indices => {
  const li = indices.length
  const out = new Float32Array(li)
  for (let i = 0; i < li; i += 3) {
    out[i] = indices[i + 2]
    out[i + 1] = indices[i + 1]
    out[i + 2] = indices[i]
  }
  return out
}

export const invertNormals = indices => {
  // return indices
  const li = indices.length
  const out = new Float32Array(li)
  for (let i = 0; i < li; i ++) {
    out[i] = -indices[i]
  }
  return out
}

export function CommonToBabylon(Babylon) {
  const { Mesh, VertexData, LinesMesh, MeshBuilder, Vector3, Color4, Color3, VertexBuffer, Matrix, StandardMaterial } = Babylon
  let SEQ = 0
  function CSG2Babylon(obj, scene, meshColor) {
    const { vertices, indices = [], normals, color, colors, isTransparent = false, opacity } = obj
    const { transforms } = obj
    const objType = obj.type || 'mesh'

    // TODO sideOrientation = BACKSIDE //causes babylon code to invert  normals and change order of indices links

    /*
          // indices
          for (i = 0; i < li; i += 3) {
              const tmp = indices[i];
              indices[i] = indices[i + 2];
              indices[i + 2] = tmp;
          }
          // normals
          for (n = 0; n < ln; n++) {
              normals[n] = -normals[n];
          }
          break;
    */

    // const materialDef = materials[objType]
    // if (!materialDef) { console.error('material not found for type ', objType, obj) }
    // let material = materialDef.def
    // const isInstanced = obj.type === 'instances'
    // if ((color || colors) && !isInstanced) {
    //   const c = color || colors
    //   const opts = {
    // 		vertexColors: !!colors,
    //     opacity: c[3] === undefined ? 1 : c[3],
    //     transparent: (color && c[3] !== 1 && c[3] !== undefined) || isTransparent
    //   }
    //   if (opacity) opts.opacity = opacity
    //   if (!colors) opts.color = _CSG2Babylonjs.makeColor(color)
    //   material = materialDef.make(opts)
    //   if (opacity) {
    // 		console.log('opacity',opacity)
    //     material.transparent = true
    //     material.opacity = opacity
    //   }
    // }

    const geo = new VertexData()
    let _colors
    geo.positions = vertices
    if (indices) geo.indices = indices
    if (normals) geo.normals = invertNormals(normals)
    if (colors && colors.length) {
      // we require 4 channel vertex colors
      if (colors.length <= vertices.length) {
        _colors = new Float32Array(Math.ceil((vertices.length / 3) * 4))
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

    const useVertexColor = false
    const useVertexAlpha = false
    const material = new StandardMaterial("blue",scene);
    if(color){
      material.diffuseColor = new Color3(...color)
      if(color.length === 4) material.alpha = color[3]
    }else{
      material.diffuseColor = meshColor;
    }

    let myArray
    let myColors
    let mesh
    let _opacity
    switch (objType) {
      case 'mesh':
        geo.indices = invertIndices(geo.indices)
        mesh = new Mesh(geo, scene)
        geo.applyToMesh(mesh)
        if(material) mesh.material = material
        break
      // case 'instances':
      //   mesh = new InstancedMesh(
      //     geo,
      //     materials.mesh.make({ color: 0x0084d1 })
      //   )
      //   transforms = null
      //   break
      // case 'line':
      //   mesh = new Line(geo, material)
      //   break
      case 'lines':
        if (!indices.length) {
          const len = vertices.length / 3
          for (let i = 0; i < len; i++) {
            indices.push(i)
          }
        }
        _opacity = (color ? color[3] : 0) || opacity || 1
        mesh = new LinesMesh(
          'lines',
          scene,
          null,
          undefined,
          undefined,
          useVertexColor,
          useVertexAlpha || _opacity < 1,
        )
        geo.applyToMesh(mesh)
        if (color) mesh.color = new Color3(color[0], color[1], color[2])
        if (_colors) mesh.setVerticesData(VertexBuffer.ColorKind, _colors)
        mesh.alpha = _opacity

        // myArray = []
        // myColors = []
        // for (let i = 5; i < vertices.length; i += 6) {
        //   myArray.push([
        //     new Vector3(vertices[i - 5], vertices[i - 4], vertices[i - 3]),
        //   	new Vector3(vertices[i - 2], vertices[i - 1], vertices[i])
        //   ])
        //   if (colors) {
        //     myColors.push([
        //       new Color4(colors[i - 5], colors[i - 4], colors[i - 3], 1),
        //       new Color4(colors[i - 2], colors[i - 1], colors[i], 1)
        //     ])
        //   }
        // }
        // const opts = { lines: myArray, useVertexAlpha: isTransparent ? true: false }
        // if (colors) opts.colors = myColors
        // mesh = MeshBuilder.CreateLineSystem('lineSystem', opts, scene)
        // mesh.alpha = (color ? color[3] : 0) || opacity || 1
        // if (color) mesh.color = new Color3(color[0], color[1], color[2])

        break
    }
    if (transforms) mesh.getWorldMatrix().copyFrom(Matrix.FromValues(...transforms))
    // console.log('mesh' + (++SEQ), mesh, window['mesh' + SEQ] = mesh)
    return mesh
  }

  return CSG2Babylon
}
