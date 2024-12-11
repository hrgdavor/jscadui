importScripts('./bundle.jscadui.transform-babel.js')

// import io from '@jscad/io'
const {transformcjs} = jscadui_transform_babel
// import {transformcjs} from '@jscadui/transform-babel'

import { Zip, ZipDeflate, ZipPassThrough } from 'fflate'
import {currentSolids, initWorker} from '@jscadui/worker'
import {readFileWeb, require} from '@jscadui/require'

import { withTransferable } from '@jscadui/postmessage'
import { to3mfZipContentSimple } from '@jscadui/3mf-export'
import { currentMeshes } from '@jscadui/worker'

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

const exportData = ({ format, thumb, options = {} }) => {
  const solids = currentSolids()
  console.log('solids', solids, 'thumb',thumb)
  let data 
  if(format == '3mf'){
    // we can use mesh data to export
    data = export3mf(currentMeshes().map((s, id) => ({ ...s, id: id + 1 })), thumb)
  }else{
    const jscad_io = require('./bundle.jscad_io.js', null, readFileWeb)
    const [key, defaults] = serializerMap[format]
    const serializer = jscad_io[key]
    data = serializer.serialize({...defaults, ...options}, solids)
  }
  console.log('data', data)
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

function export3mf(solids, thumb){
  /** @type {Uint8Array[]} */
  const zipParts = []

  const zip = new Zip((err, dat, final) => {
    if (!err) {
      // output of the streams
     zipParts.push(dat)
    }
  })

  const zipContents = to3mfZipContentSimple({
    meshes: solids,
    header: { application: 'jscad.app', title: 'jscad model' }
  }, thumb)

  for (const [fileName, fileContent, canBeCompressed] of zipContents) {
    const fileStream = canBeCompressed ? new ZipDeflate(fileName, { level: 9 }) : new ZipPassThrough(fileName)
    zip.add(fileStream)
    fileStream.push(fileContent, true)
  }

  zip.end()

  return zipParts  
}

initWorker(transformcjs, exportData, importData)
