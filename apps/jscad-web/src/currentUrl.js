export class CurrentUrl{
  constructor(){
    this.url = new URL(location.toString())
  }
  initGet(name, def){
    let out = this.url.searchParams.get(name)
    if(!out && def){
      this.set(name,def)
      out = def
    }
    return out  
  }
  get(name){
    this.url.searchParams.get(name)
  }
  set(name,value){
    this.url.searchParams.set(name, value)
    window.history.replaceState(null, null, this.url.toString())  
  }
}