export function CommonToThree({
  MeshPhongMaterial,
  LineBasicMaterial,
  BufferGeometry,
  BufferAttribute,
  Mesh,
  InstancedMesh,
  Line,
  LineSegments,
  Color,
  Vector3,
}) {
  const flatShading = false
  const materials = {
    mesh: {
      def: new MeshPhongMaterial({ color: 0x0084d1, flatShading }),
      make: params => new MeshPhongMaterial({ flatShading, ...params }),
    },
    line: {
      def: new LineBasicMaterial({ color: 0x0000ff }),
      make: params => new LineBasicMaterial(params),
    },
    lines: null,
  }
  materials.lines = materials.line
  materials.instance = materials.mesh // todo support instances for lines

  function _CSG2Three(obj, { smooth = false }) {
    const { vertices, indices, normals, color, colors, isTransparent = false, opacity } = obj
    let { transforms } = obj
    const objType = obj.type || 'mesh'

    const materialDef = materials[objType]
    if (!materialDef) {
      console.error(`material not found for type ${objType}`, obj)
      return
    }
    let material = materialDef.def
    const isInstanced = obj.type === 'instance'
    if ((color || colors) && !isInstanced) {
      const c = color || colors
      const opts = {
        vertexColors: !!colors,
        opacity: c[3] === undefined ? 1 : c[3],
        transparent: (color && c[3] !== 1 && c[3] !== undefined) || isTransparent,
      }
      if (opacity) opts.opacity = opacity
      if (!colors) opts.color = _CSG2Three.makeColor(color)
      material = materialDef.make(opts)
      if (opacity) {
        material.transparent = true
        material.opacity = opacity
      }
    }

    let geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(vertices, 3))
    if (indices) geo.setIndex(new BufferAttribute(indices, 1))
    if (normals) geo.setAttribute('normal', new BufferAttribute(normals, 3))
    if(smooth) geo = toCreasedNormals({ Vector3, BufferAttribute }, geo, Math.PI / 10)
    if (colors) geo.setAttribute('color', new BufferAttribute(colors, isTransparent ? 4 : 3))

    let mesh
    switch (objType) {
      case 'mesh':
        mesh = new Mesh(geo, material)
        break
      case 'instance':
        const { list } = obj
        mesh = new InstancedMesh(geo, materials.mesh.make({ color: 0x0084d1 }), list.length)
        list.forEach((item, i) => {
          copyTransformToArray(item.transforms, mesh.instanceMatrix.array, i * 16)
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
  function copyTransformToArray(te, array = [], offset = 0) {
    array[offset] = te[0]
    array[offset + 1] = te[1]
    array[offset + 2] = te[2]
    array[offset + 3] = te[3]

    array[offset + 4] = te[4]
    array[offset + 5] = te[5]
    array[offset + 6] = te[6]
    array[offset + 7] = te[7]

    array[offset + 8] = te[8]
    array[offset + 9] = te[9]
    array[offset + 10] = te[10]
    array[offset + 11] = te[11]

    array[offset + 12] = te[12]
    array[offset + 13] = te[13]
    array[offset + 14] = te[14]
    array[offset + 15] = te[15]

    return array
  }

  _CSG2Three.makeColor = c => new Color(c[0], c[1], c[2])
  _CSG2Three.materials = materials
  _CSG2Three.setDefColor = c => {
    materials.mesh.def = new MeshPhongMaterial({ color: _CSG2Three.makeColor(c), flatShading })
  }

  return _CSG2Three
}

/** from threejs examples BufferGeometryUtils
 * @param {BufferGeometry} geometry
 * @param {number} tolerance
 * @return {BufferGeometry>}
 */

/**
 * Modifies the supplied geometry if it is non-indexed, otherwise creates a new,
 * non-indexed geometry. Returns the geometry with smooth normals everywhere except
 * faces that meet at an angle greater than the crease angle.
 *
 * @param {BufferGeometry} geometry
 * @param {number} [creaseAngle]
 * @return {BufferGeometry}
 */
function toCreasedNormals({ Vector3, BufferAttribute }, geometry, creaseAngle = Math.PI / 3 /* 60 degrees */) {
  const creaseDot = Math.cos(creaseAngle)
  const hashMultiplier = (1 + 1e-10) * 1e2

  // reusable vectors
  const verts = [new Vector3(), new Vector3(), new Vector3()]
  const tempVec1 = new Vector3()
  const tempVec2 = new Vector3()
  const tempNorm = new Vector3()
  const tempNorm2 = new Vector3()

  // hashes a vector
  function hashVertex(v) {
    const x = ~~(v.x * hashMultiplier)
    const y = ~~(v.y * hashMultiplier)
    const z = ~~(v.z * hashMultiplier)
    return `${x},${y},${z}`
  }

  // BufferGeometry.toNonIndexed() warns if the geometry is non-indexed
  // and returns the original geometry
  const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry
  const posAttr = resultGeometry.attributes.position
  const vertexMap = {}

  // find all the normals shared by commonly located vertices
  for (let i = 0, l = posAttr.count / 3; i < l; i++) {
    const i3 = 3 * i
    const a = verts[0].fromBufferAttribute(posAttr, i3 + 0)
    const b = verts[1].fromBufferAttribute(posAttr, i3 + 1)
    const c = verts[2].fromBufferAttribute(posAttr, i3 + 2)

    tempVec1.subVectors(c, b)
    tempVec2.subVectors(a, b)

    // add the normal to the map for all vertices
    const normal = new Vector3().crossVectors(tempVec1, tempVec2).normalize()
    for (let n = 0; n < 3; n++) {
      const vert = verts[n]
      const hash = hashVertex(vert)
      if (!(hash in vertexMap)) {
        vertexMap[hash] = []
      }

      vertexMap[hash].push(normal)
    }
  }

  // average normals from all vertices that share a common location if they are within the
  // provided crease threshold
  const normalArray = new Float32Array(posAttr.count * 3)
  const normAttr = new BufferAttribute(normalArray, 3, false)
  for (let i = 0, l = posAttr.count / 3; i < l; i++) {
    // get the face normal for this vertex
    const i3 = 3 * i
    const a = verts[0].fromBufferAttribute(posAttr, i3 + 0)
    const b = verts[1].fromBufferAttribute(posAttr, i3 + 1)
    const c = verts[2].fromBufferAttribute(posAttr, i3 + 2)

    tempVec1.subVectors(c, b)
    tempVec2.subVectors(a, b)

    tempNorm.crossVectors(tempVec1, tempVec2).normalize()

    // average all normals that meet the threshold and set the normal value
    for (let n = 0; n < 3; n++) {
      const vert = verts[n]
      const hash = hashVertex(vert)
      const otherNormals = vertexMap[hash]
      tempNorm2.set(0, 0, 0)

      for (let k = 0, lk = otherNormals.length; k < lk; k++) {
        const otherNorm = otherNormals[k]
        if (tempNorm.dot(otherNorm) > creaseDot) {
          tempNorm2.add(otherNorm)
        }
      }

      tempNorm2.normalize()
      normAttr.setXYZ(i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z)
    }
  }

  resultGeometry.setAttribute('normal', normAttr)
  return resultGeometry
}
