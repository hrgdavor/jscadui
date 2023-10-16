export function extractDefaults(def){
  const params = {}
  def.forEach(({ name, initial, default: def, type, values, captions }) =>{
    let val = def === undefined ? initial : def
    if(type === 'choice' && values.indexOf(v=>v === val) === -1){
      // it is supported for choice to use default value from captions also
      // but script will need the matching value
      for(let i=0; i<captions.length; i++){
        if(captions[i] === val){
          val = values[i]
          break;
        }
      }
      if(val === undefined) val = values[0]
    }
    params[name] = val
  })
  return params
}