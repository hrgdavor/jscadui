importScripts('./bundle.jscadui.transform-babel.js')

// import io from '@jscad/io'
const {transformcjs} = jscadui_transform_babel
// import {transformcjs} from '@jscadui/transform-babel'

import {currentSolids, initWorker} from '@jscadui/worker'
import {readFileWeb, require} from '@jscadui/require'

import { withTransferable } from '@jscadui/postmessage'

// NOTE: This list should match the list in src/exporter.js
const serializerMap ={
  '3mf': ['m3fSerializer', {}],
  'stla': ['stlSerializer', {binary:false}],
  'stlb': ['stlSerializer', {binary:true}],
  'obj': ['objSerializer', {}],
  'x3d': ['x3dSerializer', {}],
  'dxf': ['x3dSerializer', {}],
  'json': ['jsonSerializer', {}],
  'svg': ['svgSerializer', {}],
}

const exportData = ({format, options={}})=>{
  const jscad_io = require('./bundle.jscad_io.js', null, readFileWeb)

  const supportedFormats = jscad_io.supportedFormats
  const supportedFormat = supportedFormats[format]
  if (!supportedFormat) throw new Error(`INTERNAL ERROR: missing IO format for (${format})`)

  const serializer = jscad_io.serializers[supportedFormat.mimetype]

  const defaults = format == 'stlb' ? {binary: true} : {binary: false}
  const solids = currentSolids()
  options = Object.assign({}, defaults, options)
  const data = serializer(options, solids)
  return withTransferable({ data }, data.filter(v=>typeof v !== 'string'))
}

const importData = {
  // this is used by readFileWeb to request text vs binary data
  isBinaryExt: (ext) => ext === 'stl' ? 'binary' : 'text',
  deserialize: ({url, filename, ext}, fileContent)=>{
    try {
      const jscad_io = require('./bundle.jscad_io.js', null, readFileWeb)

      const mimetype = jscad_io.getMimeType(ext)
      if (!mimetype) throw new Error(`unsupported file format (${ext}) in ${url}`)

      const deserializer = jscad_io.deserializers[mimetype]
      return deserializer({output:'geometry', filename}, fileContent)
    } catch (error) {
      throw error
    }
  }
}

initWorker(transformcjs, exportData, importData)
