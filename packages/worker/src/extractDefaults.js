/**
 * @param {import("@jscadui/format-common").ParameterDefinition[]} def
 * @returns {import("@jscadui/format-common").UserParameters}
 */
export function extractDefaults(defs) {
/** @type {import("@jscadui/format-common").UserParameters} */
  const params = {}
  defs.forEach(({ name, initial, type, values, captions, checked }) =>{
    let val = initial
    if (type === 'checkbox' && initial === undefined) {
      val = checked
    }
    if(type === 'choice' && values.indexOf(v=>v === val) === -1){
      // it is supported for choice to use default value from captions also
      // but script will need the matching value
      if (captions) {
        for (let i = 0; i < captions.length; i++) {
          if (captions[i] === val) {
            val = values[i]
            break;
          }
        }
      }
      if (val === undefined) val = values[0]
    }
    if (name) params[name] = val
  })
  return params
}
