export function CommonToThree ({
  MeshPhongMaterial,
  LineBasicMaterial,
  BufferGeometry,
  BufferAttribute,
  Mesh,
  InstancedMesh,
  Line,
  LineSegments,
  Color
}) {

  const flatShading = true
  const materials = {
    mesh: {
      def: new MeshPhongMaterial({ color: 0x0084d1, flatShading }),
      make: params => new MeshPhongMaterial({ flatShading, ...params })
    },
    line: {
      def: new LineBasicMaterial({ color: 0x0000ff }),
      make: params =>
        new LineBasicMaterial(params)
    },
    lines: null
  }
  materials.lines = materials.line
  materials.instance = materials.mesh// todo support instances for lines

  function _CSG2Three (obj) {
    const { vertices, indices, normals, color, colors, isTransparent = false, opacity } = obj
    let { transforms } = obj
    const objType = obj.type || 'mesh'

    const materialDef = materials[objType]
    if (!materialDef) { console.error('material not found for type ', objType, obj) }
    let material = materialDef.def
    const isInstanced = obj.type === 'instance'
    if ((color || colors) && !isInstanced) {
      const c = color || colors
      const opts = {
        vertexColors: !!colors,
        opacity: c[3] === undefined ? 1 : c[3],
        transparent: (color && c[3] !== 1 && c[3] !== undefined) || isTransparent
      }
      if (opacity) opts.opacity = opacity
      if (!colors) opts.color = _CSG2Three.makeColor(color)
      material = materialDef.make(opts)
      if (opacity) {
        material.transparent = true
        material.opacity = opacity
      }
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(vertices, 3))
    if (indices) geo.setIndex(new BufferAttribute(indices, 1))
    if (normals) geo.setAttribute('normal', new BufferAttribute(normals, 3))
    if (colors) geo.setAttribute('color', new BufferAttribute(colors, isTransparent ? 4 : 3))

    let mesh
    switch (objType) {
      case 'mesh':
        mesh = new Mesh(geo, material)
        break
        case 'instance':
        const {list} = obj
        mesh = new InstancedMesh(
          geo,
          materials.mesh.make({ color: 0x0084d1 }),
          list.length
        )
        list.forEach((item, i)=>{
          copyTransformToArray(item.transforms, mesh.instanceMatrix.array,i*16)
        })
        transforms = null
        break
      case 'line':
        mesh = new Line(geo, material)
        break
      case 'lines':
        // https://threejs.org/docs/#api/en/materials/LineBasicMaterial
        mesh = new LineSegments(geo, material)
        break
    }
    if (transforms && !isInstanced) mesh.applyMatrix4({ elements: transforms })
    return mesh
  }

  // shortcut for setMatrixAt for InstancedMesh
  function copyTransformToArray( te, array = [], offset = 0 ) {

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ] = te[ 8 ];
		array[ offset + 9 ] = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	}

  _CSG2Three.makeColor = (c) => new Color(c[0], c[1], c[2])
  _CSG2Three.materials = materials
  _CSG2Three.setDefColor = (c)=>{
    materials.mesh.def = new MeshPhongMaterial({color:_CSG2Three.makeColor(c), flatShading})
  }

  return _CSG2Three
}
