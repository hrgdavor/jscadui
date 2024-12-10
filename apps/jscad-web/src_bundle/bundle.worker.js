importScripts('./bundle.jscadui.transform-babel.js')

// import io from '@jscad/io'
const {transformcjs} = jscadui_transform_babel
// import {transformcjs} from '@jscadui/transform-babel'

import { Zip, ZipDeflate, ZipPassThrough, strToU8 } from 'fflate'
import {currentSolids, initWorker} from '@jscadui/worker'
import {readFileWeb, require} from '@jscadui/require'

import { withTransferable } from '@jscadui/postmessage'
import { fileForContentTypes, FileForRelThumbnail, to3dmodel, to3dmodelSimple } from '@jscadui/3mf-export'
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

const exportData = async ({format, thumb, options={}})=>{
  const solids = currentSolids()
  console.log('solids', solids, 'thumb',thumb)
  let data 
  if(format == '3mf'){
    // we can use mesh data to export
    data = await export3mf(currentMeshes().map((s,id)=>({...s,id:id+1})), thumb)
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
  // collects rels used
  const fileForRelThumbnail = new FileForRelThumbnail()

  const zipParts = []
  let resolve
  let promise =  new Promise((res)=>{
    resolve = res
  })

  const zip = new Zip((err, dat, final) => {
    if (!err) {
      // output of the streams
     zipParts.push(dat)
    }
  })
  let modelStr = to3dmodelSimple(solids, { application: 'jscad.app', title: 'jscad model' })
  console.log('modelStr', modelStr)
  addToZip(zip, '3D/3dmodel.model', modelStr)
  fileForRelThumbnail.add3dModel('3D/3dmodel.model')

  if(thumb){
    const pngPreviewFile = new ZipPassThrough('Metadata/thumbnail.png')
    zip.add(pngPreviewFile)
    pngPreviewFile.push(thumb, true)
    fileForRelThumbnail.addThumbnail('Metadata/thumbnail.png')    
  }

  let staticFiles = [fileForContentTypes, fileForRelThumbnail]
  staticFiles.forEach(({ name, content }) => addToZip(zip, name, content))
  
  function addToZip(zip, name, content) {
    const zf = new ZipDeflate(name, { level: 9 })
    zip.add(zf)
    zf.push(strToU8(content), true)
  }

  zip.end()

  return zipParts  
}

initWorker(transformcjs, exportData, importData)
