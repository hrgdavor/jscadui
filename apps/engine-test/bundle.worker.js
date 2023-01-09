import {currentSolids, initWorker} from '@jscadui/worker'
import {transformcjs} from '@jscadui/transform-babel'

import io from '@jscad/io'
import { withTransferable } from '@jscadui/postmessage'


const exportData = ({format})=>{
  const solids = currentSolids()
  console.log('exportData format', format, io)
  const data = io.stlSerializer.serialize({binary:false}, solids)
  console.log('out', data)
  return withTransferable({ data }, data.filter(v=>typeof v !== 'string'))
}

initWorker(transformcjs, exportData)