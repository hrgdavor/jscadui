/** @type {import('./worker.interface.d.js').WorkerRpc } */
let rpc  = {}

let d = rpc.getData('1')

let r1 = rpc.getRecord1('aa')

let r2 = rpc.getRecord2({id:"a",name:'b'})
