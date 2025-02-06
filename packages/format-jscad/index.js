/**
 * @param {Float32Array} points 
 * @param {[number,number,number?]} p 
 * @param {number} i 
 */
const setPoints = (points, p, i) => {
  points[i++] = p[0]
  points[i++] = p[1]
  points[i++] = p[2] || 0
}

/**
 * @param {import("@jscadui/format-common").CSGPolygons} csg 
 * @returns {import("@jscadui/format-common").JscadMeshEntityRaw}
 */
function CSG2Vertices (csg) {
  let vLen = 0; let iLen = 0

  let hasVertexColors// v1 colors support
  for (const poly of csg.polygons) {// v1 colors support
    if(poly.shared?.color) hasVertexColors = true
    const len = poly.vertices.length
    vLen += len * 3
    iLen += 3 * (len - 2)
  }
  
  let vertices = new Float32Array(vLen)
  let normals = new Float32Array(vLen)
  let indices = vLen > 65535 ? new Uint32Array(iLen) : new Uint16Array(iLen)
  let colors
  let color
  let vertOffset = 0
  let indOffset = 0
  let posOffset = 0
  let first = 0

  if(hasVertexColors){// v1 colors support
    let lastColor = [1,0.5,0.5,1]
    // color is fore each index
    colors = new Float32Array(iLen*4)
    for (const poly of csg.polygons) {
      color = poly.shared?.color || lastColor
      // lastColor = color
      let count = poly.vertices.length
      for(var i=0; i<count-2; i++){
        colors[vertOffset++] = color[0]
        colors[vertOffset++] = color[1]
        colors[vertOffset++] = color[2]
        colors[vertOffset++] = color[3] ?? 1

        colors[vertOffset++] = color[0]
        colors[vertOffset++] = color[1]
        colors[vertOffset++] = color[2]
        colors[vertOffset++] = color[3] ?? 1

        colors[vertOffset++] = color[0]
        colors[vertOffset++] = color[1]
        colors[vertOffset++] = color[2]
        colors[vertOffset++] = color[3] ?? 1

        // colors[vertOffset++] = color[3] || 1
      }
  	}
  }

  /**
   * @param {import("@jscadui/format-common").CSGPolygons['polygons'][0]['vertices']} vertices 
   * @returns { [number,number,number][]}
   */
  const normalizeVertexFormat = (vertices) => {
    if ('pos' in vertices[0]) {//converting v1 polygon with pos:{x,y,z} to number array      
      return (/** @type {import("@jscadui/format-common").CSGPolygonOldVertices} */ (vertices)).map(({ pos }) => {
        return [pos.x, pos.y, pos.z]
      })
    } else {
      return (/** @type {[number,number,number][]} */ (vertices))
    }
  }

  vertOffset = 0
  for (const poly of csg.polygons) {
    const arr = normalizeVertexFormat(poly.vertices)    
    const normal = calculateNormal(arr)
    const len = arr.length
    first = posOffset
    vertices.set(arr[0], vertOffset)
    normals.set(normal, vertOffset)
    vertOffset += 3
    vertices.set(arr[1], vertOffset)
    normals.set(normal, vertOffset)
    vertOffset += 3
    posOffset += 2
    for (let i = 2; i < len; i++) {
      vertices.set(arr[i], vertOffset)
      normals.set(normal, vertOffset)

      indices[indOffset++] = first
      indices[indOffset++] = first + i -1
      indices[indOffset++] = first + i
      vertOffset += 3
      posOffset += 1
    }
  }

  return { type: 'mesh', vertices, indices, normals, colors, isTransparent:hasVertexColors }
}

/**
 * @param {[number,number,number][]} vertices 
 * @returns {[number,number,number]}
 */
const calculateNormal = (vertices) => {
  const v0 = vertices[0]
  const v1 = vertices[1]
  const v2 = vertices[2]

  const Ax = v1[0] - v0[0]
  const Ay = v1[1] - v0[1]
  const Az = v1[2] - v0[2]

  const Bx = v2[0] - v0[0]
  const By = v2[1] - v0[1]
  const Bz = v2[2] - v0[2]

  const Nx = Ay * Bz - Az * By
  const Ny = Az * Bx - Ax * Bz
  const Nz = Ax * By - Ay * Bx

  const len = Math.hypot(Nx, Ny, Nz)
  return [Nx / len, Ny / len, Nz / len]
}

/**
 * @param {import("@jscadui/format-common").CSGLine} csg 
 * @returns {import("@jscadui/format-common").JscadLineEntityRaw}
 */
function CSG2LineVertices (csg) {
  let vLen = csg.points.length * 3
  if (csg.isClosed) vLen += 3

  const vertices = new Float32Array(vLen)

  csg.points.forEach((p, idx) => setPoints(vertices, p, idx * 3))

  if (csg.isClosed) {
    setPoints(vertices, csg.points[0], vertices.length - 3)
  }
  return { type: 'line', vertices }
}

/**
 * @param {import("@jscadui/format-common").CSGItem & import("@jscadui/format-common").CSGLineSegments} csg 
 * @returns {import("@jscadui/format-common").JscadLinesEntityRaw}
 */
function CSGSides2LineSegmentsVertices (csg) {
  const vLen = csg.sides.length * 6

  const vertices = new Float32Array(vLen)
  csg.sides.forEach((side, idx) => {
    const i = idx * 6
    setPoints(vertices, side[0], i)
    setPoints(vertices, side[1], i + 3)
  })
  return { type: 'lines', vertices }
}

/**
 * @param {import("@jscadui/format-common").CsgContourOrOutlineValue} values  
 * @returns {import("@jscadui/format-common").JscadLinesEntityRaw}
 */
const CSGOutlines2LineSegmentsVertices = (values) => {
  const numPoints = values.reduce((acc, outline) => acc + outline.length, 0)
  const vLen = numPoints * 6

  const vertices = new Float32Array(vLen)
  let idx = 0
  values.forEach((outline) => {
    let prev = outline[outline.length - 1]
    outline.forEach((vert) => {
      setPoints(vertices, prev, idx * 6)
      setPoints(vertices, vert, idx * 6 + 3)
      prev = vert
      idx++
    })
  })
  return { type: 'lines', vertices }
}

/**
 * @template TData
 * @template TOptions
 * @param {(data:TData,options:TOptions)=>import("@jscadui/format-common").JscadMainEntityRaw} func 
 * @param {TData} data 
 * @param {Object} cacheKey 
 * @param {import("@jscadui/format-common").JscadTransferable[]} transferable 
 * @param {Map<number,import("@jscadui/format-common").JscadMainEntity> | false | undefined} unique 
 * @param {TOptions} options 
 * @returns {import("@jscadui/format-common").JscadMainEntity}
 */
function CSGCached (func, data, cacheKey, transferable, unique, options) {
  cacheKey = cacheKey || data

  let geo = JscadToCommon.cache.get(cacheKey)
  if (!geo) {
    geo = (/** @type {import("@jscadui/format-common").JscadMainEntity} */(func(data, options)))
    geo.id = JscadToCommon.sequence++

    // fill transferable array for postMessage optimization
    if (transferable) {
      if ('vertices' in geo) transferable.push(geo.vertices)
      if ('indices' in geo && geo.indices !== undefined) transferable.push(geo.indices)
      if ('normals' in geo && geo.normals !== undefined) transferable.push(geo.normals)
    }

    JscadToCommon.cache.set(cacheKey, geo)
  }
  // fill unique map for exports that reuse stuff like 3mf
  if (unique) unique.set(geo.id, geo)

  return geo
}

/** Prepare lists of geometries grouped by type with format suitable for webgl if possible or type:unknown.
 * @param {(import("@jscadui/format-common").CSGItem | import("@jscadui/format-common").JscadMeshEntity)[] | undefined} list
 * @param {import("@jscadui/format-common").JscadTransferable[]} transferable
 * @param {boolean | undefined} useInstances
 * @returns {import("@jscadui/format-common").JscadResultsByType} object separating converted geometries by type: line,lines,mesh,instance,unknown
 */
JscadToCommon.prepare = (list, transferable, useInstances) => {
  /** @type {import("@jscadui/format-common").JscadResultsByType} */
  const map = { line: [], lines: [], mesh: [], instance: [], unknown: [], all: [], unique: new Map() }

  const instanceMap = new Map()
  /**
   * @param {import("@jscadui/format-common").JscadMainEntity} data 
   */
  const add = data => {
    map[data.type].push(data)
    map.all.push(data)
  }

  /**
   * @param {(import("@jscadui/format-common").CSGItem | import("@jscadui/format-common").JscadMeshEntity)[] } list 
   */
  const extract = list => {
    list.forEach(csg => {
      if (!csg) return
      if (csg instanceof Array) {
        extract(csg)
      } else {
        const obj = JscadToCommon(csg, transferable, map.unique)
        // transparency in instanced mesh is problematic
        // transparent objects need ordering,  and that breaks thing for rendering instances
        if (useInstances && obj.type === 'mesh' && obj.id && (!csg.color || csg.color.length === 3 || csg.color[3] === 1)) {
          let old = instanceMap.get(obj.id)
          if (!old) {
            old = { csg, ...obj, list: [] }
            instanceMap.set(obj.id, old)
          }
          old.list.push(csg)
        } else {
          add({ csg, ...obj })
        }
      }
    })
  }

  if (list) extract(list)
  instanceMap.forEach(data => {
    if (data.list.length === 1) {
      delete data.list
    } else {
      data.type = 'instance'
    }
    add(data)
  })

  return map
}

/**
 * @param {import("@jscadui/format-common").CSGItem | import("@jscadui/format-common").JscadMeshEntity} csg 
 * @param {import("@jscadui/format-common").JscadTransferable[]} transferable 
 * @param {Map<number,import("@jscadui/format-common").JscadMainEntity> | false | undefined} unique 
 * @param {unknown} [options]
 * @returns {import("@jscadui/format-common").JscadMainEntity}
 */
export function JscadToCommon (csg, transferable, unique, options) {
  if (csg instanceof Array) return csg.map(csg2 => JscadToCommon(csg2, transferable, unique, options))
  if (typeof csg !== 'object') throw new Error('invalid jscad geometry, not an object')

  /** @type {import("@jscadui/format-common").JscadMainEntity} */
  let obj

  if ('polygons' in csg) obj = CSGCached(CSG2Vertices, csg, csg.polygons, transferable, unique, options)
  if ('sides' in csg && !('points' in csg)) obj = CSGCached(CSGSides2LineSegmentsVertices, csg, csg.sides, transferable, unique, options)
  if ('outlines' in csg) obj = CSGCached(CSGOutlines2LineSegmentsVertices, csg.outlines, csg.outlines, transferable, unique, options)
  if ('contours' in csg) obj = CSGCached(CSGOutlines2LineSegmentsVertices, csg.contours, csg.contours, transferable, unique, options)
  if ('points' in csg) obj = CSGCached(CSG2LineVertices, csg, csg.points, transferable, unique, options)
  if ('vertices' in csg) { // cover a case where the object already has the format
    obj = csg
    // avoid filling transferable multiple times
    if (!JscadToCommon.cache.get(obj)) {
      JscadToCommon.cache.set(obj, obj)
      if (transferable) {
        transferable.push(obj.vertices)
        if (obj.indices) transferable.push(obj.indices)
      }
    }
  }
  if ('color' in csg || csg.transforms) obj = { ...obj }
  if(csg.color) obj.color = csg.color 
  if(csg.transforms) obj.transforms = csg.transforms

  if (!obj || !obj.type) {
    // throw new Error('invalid jscad geometry')
    console.error('invalid jscad geometry', csg)
    obj = { ...obj, csg, type: 'unknown' }
  }
  return obj
}

/**
 * @param {(import("@jscadui/format-common").CSGItem | import("@jscadui/format-common").JscadMeshEntity)[]} csg 
 * @param {import("@jscadui/format-common").JscadTransferable[]} transferable 
 * @param {Map<number,import("@jscadui/format-common").JscadMainEntity> | false |  undefined} unique 
 * @param {unknown} [options]
 * @returns {import("@jscadui/format-common").JscadMainEntity[]}
 */
JscadToCommon.ConvertMulti = (csg, transferable, unique, options) => {
  return csg.map(csg2 => JscadToCommon(csg2, transferable, unique, options))
}


/** @type {WeakMap<Object,import("@jscadui/format-common").JscadMainEntity> } */
JscadToCommon.cache = new WeakMap()
JscadToCommon.sequence = 1

JscadToCommon.clearCache = () => {
  JscadToCommon.cache = new WeakMap()
  JscadToCommon.sequence = 1
}
