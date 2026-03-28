/**
 * @param {import("@jscadui/format-common").ParameterDefinition[]} def
 * @returns {import("@jscadui/format-common").UserParameters}
 */
export function extractDefaults(definitions) {
/** @type {import("@jscadui/format-common").UserParameters} */
  const parameters = {}
  definitions.forEach((def) => {
    const { name, type, values, captions, checked } = def

    let val = def.initial !== undefined ? def.initial : def.default

    if (type === 'checkbox' && !val) {
      // set a default for checkbox parameters
      val = checked
    }

    if (type === 'choice' && values.indexOf(v=>v === val) === -1) {
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
    if (name) parameters[name] = val
  })
  return parameters
}
