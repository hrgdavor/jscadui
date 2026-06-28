importScripts('./bundle.jscadui.transform-babel.js')

const {transformcjs} = jscadui_transform_babel

import {currentSolids, initWorker} from '@jscadui/worker'
import {readFileWeb, require} from '@jscadui/require'

import { withTransferable } from '@jscadui/postmessage'

const exportData = ({format, options={}})=>{
  const jscad_io = require('./bundle.jscad_io.js', null, readFileWeb)

  // NOTE: This list should match the list in src/exporter.js
  const serializerMap = {
    'amf':  [jscad_io.amfSerializer,  {}],
    'dxf':  [jscad_io.dxfSerializer,  {}],
    'json': [jscad_io.jsonSerializer, {}],
    '3mf':  [jscad_io.m3fSerializer,  {}],
    'obj':  [jscad_io.objSerializer,  {}],
    'stla': [jscad_io.stlSerializer,  { binary: false }],
    'stlb': [jscad_io.stlSerializer,  { binary: true }],
    'svg':  [jscad_io.svgSerializer,  {}],
    'x3d':  [jscad_io.x3dSerializer,  {}],
  }

  const mapping = serializerMap[format]
  if (!mapping) throw new Error(`INTERNAL ERROR: missing IO format for (${format})`)

  const solids = currentSolids()
  const serializer = mapping[0]
  options = Object.assign({ version: 2.0 }, mapping[1], options)

  const data = serializer.serialize(options, solids)

  return withTransferable({ data }, data.filter(v=>typeof v !== 'string'))
}

const importData = {
  // this is used by readFileWeb to request text vs binary data
  isBinaryExt: (ext) => ext === 'stl' ? 'binary' : 'text',
  deserialize: ({url, filename, ext}, fileContent)=>{
    try {
      const jscad_io = require('./bundle.jscad_io.js', null, readFileWeb)

      const deserializer = jscad_io.deserializers[ext]
      if (!deserializer) throw new Error(`unsupported file format (${ext}) in ${url}`)

      return deserializer({output:'geometry', filename}, fileContent)
    } catch (error) {
      throw error
    }
  }
}

initWorker(transformcjs, exportData, importData)
