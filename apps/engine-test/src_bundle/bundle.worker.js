importScripts('./bundle.jscadui.transform-babel.js')

// import io from '@jscad/io'
const {transformcjs} = jscadui_transform_babel
// import {transformcjs} from '@jscadui/transform-babel'

import {currentSolids, initWorker} from '@jscadui/worker'

import { withTransferable } from '@jscadui/postmessage'

const exportData = ({format})=>{
  if(typeof jscad_io === 'undefined') importScripts('./bundle.jscad.io.js')
  const solids = currentSolids()
  console.log('exportData format', format, jscad_io)
  const data = jscad_io.stlSerializer.serialize({binary:false}, solids)
  console.log('out', data)
  return withTransferable({ data }, data.filter(v=>typeof v !== 'string'))
}

initWorker(transformcjs, exportData)
