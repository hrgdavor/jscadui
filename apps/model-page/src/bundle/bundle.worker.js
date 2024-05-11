try{
  importScripts('./bundle.jscadui.transform-babel.js')
}catch(e){
  console.log('running typescript and ESM modules is disabled because: ', e.message)
}

// import io from '@jscad/io'

import {currentSolids, initWorker} from '@jscadui/worker'
import {readFileWeb, require} from '@jscadui/require'

import { withTransferable } from '@jscadui/postmessage'

const serializerMap ={
  'stla': ['stlSerializer', {binary:false}],
  'stlb': ['stlSerializer', {binary:true}],
  'amf': ['amfSerializer', {}],
  'obj': ['objSerializer', {}],
  'x3d': ['x3dSerializer', {}],
  '3mf': ['m3fSerializer', {}],
  'json': ['jsonSerializer', {}],
  'svg': ['svgSerializer', {}],
}

const exportData = ({format, options={}})=>{
  const jscad_io = require('./bundle.jscad_io.js', null, readFileWeb)
  const solids = currentSolids()
  const [key, defaults] = serializerMap[format]
  const serializer = jscad_io[key]
  const data = serializer.serialize({...defaults, ...options}, solids)
  return withTransferable({ data }, data.filter(v=>typeof v !== 'string'))
}

const importData = {
  isBinaryExt: ext=>ext === 'stl',
  deserialize: ({url, filename, ext}, fileContent)=>{
    try {
      const jscad_io = require('./bundle.jscad_io.js', null, readFileWeb)
      let deserializer = jscad_io.deserializers[ext]

      if(deserializer) return deserializer({output:'geometry', filename}, fileContent)
      throw new Error('unsupportd format in '+url)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

initWorker(globalThis.jscadui_transform_babel?.transformcjs, exportData, importData)
