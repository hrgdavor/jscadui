const GROUP_SELECTOR = 'DIV[type="group"]'
const INPUT_SELECTOR = 'INPUT, SELECT'
const BUTTON_SELECTOR = 'BUTTON'

export const forQS = (el, selector, cb) => el.querySelectorAll(selector).forEach(cb)
export const forEachInput = (el, cb) => forQS(el, INPUT_SELECTOR, cb)
export const forEachGroup = (el, cb) => forQS(el, GROUP_SELECTOR, cb)
export const forEachButton = (el, cb) => forQS(el, BUTTON_SELECTOR, cb)

const numeric = { number: 1, float: 1, int: 1, range: 1, slider: 1 }

function applyRange(inp) {
  let info = inp.previousElementSibling
  if (info) {
    if (info.tagName === 'SPAN') { info = info.querySelector('i') }
    if (info.tagName === 'I') info.innerText = inp.value
  }
}

export const genParams = ({
  params,
  target,
  callback,
  storedValues = {},
  buttons = ['reset', 'save', 'load', 'edit', 'link'],
}) => {
  let initialValues = {}
  const funcs = {
    group: () => '',
    choice: inputChoice,
    radio: inputRadio,
    // TODO radio similar options as choice
    checkbox: function ({ name, value }) {
      const checkedStr = value === 'checked' || value === true ? 'checked' : ''
      return `<input type="checkbox" name="${name}" ${checkedStr}/>`
    }
  }

  function inputRadio({ name, type, captions, value, values }) {
    if (!captions) captions = values

    let ret = '<div type="radio">'

    for (let i = 0; i < values.length; i++) {
      const checked = value == values[i] || value == captions[i] ? 'checked' : ''
      ret += `<label><input type="radio" _type="${type}" name="${name}" numeric="${
        typeof values[0] == 'number' ? '1' : '0'
      }" value="${values[i]}" ${checked}/>${captions[i]}</label>`
    }
    return ret + '</div>'
  }

  function inputChoice({ name, type, captions, value, values }) {
    if (!captions) captions = values

    let ret = `<select _type="${type}" name="${name}" numeric="${typeof values[0] == 'number' ? '1' : '0'}">`

    for (let i = 0; i < values.length; i++) {
      const checked = value == values[i] || value == captions[i] ? 'selected' : ''
      ret += `<option value="${values[i]}" ${checked}>${captions[i]}</option>`
    }
    return ret + '</select>'
  }

  function inputDefault(def) {
    let { name, type, value, min, max, step, placeholder, live } = def
    if (value === null || value === undefined) value = numeric[type] ? 0 : ''
    let inputType = type
    if (type == 'int' || type == 'float') inputType = 'number'
    if (type == 'range' || type == 'slider') inputType = 'range'
    let str = `<input _type="${type}" type="${inputType}" name="${name}"`
    if (step !== undefined) str += ` step="${step}"`
    if (min !== undefined) str += ` min="${min}"`
    if (max !== undefined) str += ` max="${max}"`
    if (value !== undefined) str += ` value="${value}"`
    str += ` live="${live ? 1 : 0}"`
    if (placeholder !== undefined) str += ` placeholder="${placeholder}"`
    return str + '/>'
  }

  let html = ''
  let closed = false
  const missing = {}

  params.forEach(def => {
    let { type, caption, name } = def

    if (!caption) caption = name

    // Construct the initial value
    let value = def.initial
    if (def['default'] !== undefined) value = def['default']
    if (type == 'checkbox' && def.checked !== undefined) value = def.checked
    def.value = initialValues[name] = value
    if (storedValues[name] !== undefined) {
      def.value = storedValues[name]
    }

    if (type == 'group') {
      let ch = caption[0]
      closed = def.value == 'closed'
      if (ch === '>' || ch === '+') {
        caption = caption.substring(1).trim()
        closed = true
      }
    }
    def.closed = closed

    html += `<div class="form-line" type="${def.type}" closed="${closed ? 1 : 0}" `
    if (type == 'group') html += ` name="${name}"`
    html += `">`

    // label
    html += `<label`
    if (type == 'group') html += ` name="${name}"`
    html += `>${caption}</label>`

    // value
    let valHtml = `<i>${def.value}</i>`
    if (type == 'slider' || type == 'range')
      valHtml = `<span class='i-locker'>${valHtml}</span>`
    //
    //console.log(type)
    //
    html += valHtml

    const inputFunc = funcs[type] || inputDefault
    if (inputFunc) html += inputFunc(def)
    if (!inputFunc) missing[type] = 1

    html += '</div>\n'
  })

  const missingKeys = Object.keys(missing)
  if (missingKeys.length) console.log('missing param impl', missingKeys)

  function _callback(source = 'change') {
    callback(getParams(target), source)
  }

  html += '<div class="jscad-param-buttons"><div>'
  buttons.forEach(button => {
    const { id, name } = typeof button === 'string' ? { id: button, name: button } : button
    html += `<button action="${id}"><b>${name}</b></button>`
  })
  html += '</div></div>'

  target.innerHTML = html

  forEachInput(target, inp => {
    const type = inp.type
    inp.addEventListener('input', function (evt) {
      applyRange(inp)
      if (inp.getAttribute('live') === '1') _callback('live')
    })
    if (inp.getAttribute('live') !== '1')
      inp.addEventListener('change', () => _callback('change'))
  })

  function groupClick(evt) {
    let groupDiv = evt.target
    if (groupDiv.tagName === 'LABEL') groupDiv = groupDiv.parentNode
    const closed = groupDiv.getAttribute('closed') == '1' ? '0' : '1'
    do {
      groupDiv.setAttribute('closed', closed)
      groupDiv = groupDiv.nextElementSibling
    } while (groupDiv && groupDiv.getAttribute('type') != 'group')
    _callback('group')
  }

  forEachGroup(target, div => {
    div.onclick = groupClick
  })
}

export const getParams = target => {
  const params = {}
  if (!target) return params

  forEachGroup(target, elem => {
    const name = elem.getAttribute('name')
    params[name] = elem.getAttribute('closed') == '1' ? 'closed' : ''
  })

  forEachInput(target, elem => {
    const name = elem.name
    let value = elem.value
    if (elem.tagName == 'INPUT') {
      if (elem.type == 'checkbox') value = elem?.checked
      if (elem.type == 'file') value = elem.files?.[0]
      if (elem.type == 'range' || elem.type == 'color') applyRange(elem)
    }

    if (numeric[elem.getAttribute('type')] || elem.getAttribute('numeric') == '1') {
      value = parseFloat(String(value || 0))
    } else if (value && typeof value === 'string' && /^(\d+|\d+\.\d+)$/.test(value.trim())) {
      value = parseFloat(String(value || 0))
    }
    if (elem.type == 'radio' && !elem.checked) return // skip if not checked radio button

    params[name] = value
  })
  return params
}
