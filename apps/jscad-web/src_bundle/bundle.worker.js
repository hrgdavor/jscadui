importScripts('./bundle.jscadui.transform-babel.js')

// import io from '@jscad/io'
const {transformcjs} = jscadui_transform_babel
// import {transformcjs} from '@jscadui/transform-babel'

import {currentSolids, initWorker} from '@jscadui/worker'

import { withTransferable } from '@jscadui/postmessage'

const serializerMap ={
  'stla': ['stlSerializer', {binary:false}],
  'stlb': ['stlSerializer', {binary:true}],
  'amf': ['amfSerializer', {}],
  'obj': ['objSerializer', {}],
  'x3d': ['x3dSerializer', {}],
  '3mf': ['m3fSerializer', {}],
  'json': ['jsonSerializer', {}],
}

const exportData = ({format, options={}})=>{
  if(typeof jscad_io === 'undefined') importScripts('./bundle.jscad.io.js')
  const solids = currentSolids()
  const [key, defaults] = serializerMap[format]
  const serializer = jscad_io[key]
  console.log('exportData format', format, serializer, jscad_io)
  const data = serializer.serialize({...defaults, ...options}, solids)
  console.log('out', data)
  return withTransferable({ data }, data.filter(v=>typeof v !== 'string'))
}

initWorker(transformcjs, exportData)
