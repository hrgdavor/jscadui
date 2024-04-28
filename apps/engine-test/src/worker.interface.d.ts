export interface Rec{
  id: string
  name:string
}

export interface WorkerRpc{
  getData(name:string, low:boolean):Rec
  getRecord1(id:string):Rec
  getRecord2(tpl:Rec):Rec
}
