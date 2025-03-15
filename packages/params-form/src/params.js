import {h, insert} from './jsx2dom.js'

const GROUP_SELECTOR = 'DIV[type="group"]'
const INPUT_SELECTOR = 'INPUT, SELECT'
const BUTTON_SELECTOR = 'BUTTON'

export const querySelector = (el, selector) => el.querySelector(selector)
export const forQS = (el, selector, cb) => el.querySelectorAll(selector).forEach(cb)
export const forEachInput = (el, cb) => forQS(el, INPUT_SELECTOR, cb)
export const forEachGroup = (el, cb) => forQS(el, GROUP_SELECTOR, cb)
export const forEachButton = (el, cb) => forQS(el, BUTTON_SELECTOR, cb)

const numeric = { number: 1, float: 1, int: 1, range: 1, slider: 1 }

function applyRange(inp) {
  forEachInput(inp.parentNode,inp2=>{
    if(inp != inp2) inp2.value = inp.value
  })
}

export const genParams = ({
  params,
  target,
  callback,
  startAnim,
  pauseAnim,
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
      // const checkedStr = value === 'checked' || value === true ? 'checked' : ''
      // return `<input type="checkbox" name="${name}" ${checkedStr}/>`
      return h('input',{type:'checkbox', name, checked: value})
    }
  }

  function inputRadio({ name, type, captions, value: curValue, values }) {
    if (!captions) captions = values

    //   let ret = '<div type="radio">'
    //   for (let i = 0; i < values.length; i++) {
    //     const checked = value == values[i] || value == captions[i] ? 'checked' : ''
    //     ret += `<label><input type="radio" _type="${type}" name="${name}" numeric="${
    //       typeof values[0] == 'number' ? '1' : '0'
    //     }" value="${values[i]}" ${checked}/>${captions[i]}</label>`
    //     children.push()
    //   }
    //   return ret + '</div>'
    let labels = values.map((value,i)=>{
      const checked = curValue == value || curValue == captions[i]
      const numeric = typeof values[0] == 'number' ? '1' : '0' 
      return h('label', {}, 
        h('input',{ type:'radio', _type:type, name, numeric, value, checked}),
        captions[i],
      )// /label
    })

    return h('div',{type:'radio'}, ...labels)
  }

  function inputChoice({ name, type, captions, value: curValue, values }) {
    if (!captions) captions = values

    let options = values.map((value,i)=>{
      const selected = curValue == value || curValue == captions[i]
      return h('option', {value, selected},captions[i])
    })
    return h('select',{_type:type, name, numeric:typeof values[0] == 'number'}, ...options)

    // let ret = `<select _type="${type}" name="${name}" numeric="${typeof values[0] == 'number' ? '1' : '0'}">`

    // for (let i = 0; i < values.length; i++) {
    //   const checked = curValue == values[i] || curValue == captions[i] ? 'selected' : ''
    //   ret += `<option value="${values[i]}" ${checked}>${captions[i]}</option>`
    // }
    // return ret + '</select>'

  }

  function inputDefault(def) {
    let { name, type, value, min, max, step, placeholder, live, fps } = def
    if(fps <= 0) fps = 1
    if(!step && fps) step = 1/fps

    if (value === null || value === undefined) value = numeric[type] ? 0 : ''
    let inputType = type
    if (type == 'int' || type == 'float') inputType = 'number'
    if (type == 'range' || type == 'slider') inputType = 'range'
    let attr = { _type:type, type:inputType, name,
      step, 
      min, 
      max, 
      value, 
      live:live ? '1':'0',
      placeholder, 

    }
    return h('input', attr)

    // let str = `<input _type="${type}" type="${inputType}" name="${name}"`
    // if (step !== undefined) str += ` step="${step}"`
    // if (min !== undefined) str += ` min="${min}"`
    // if (max !== undefined) str += ` max="${max}"`
    // if (value !== undefined) str += ` value="${value}"`
    // str += ` live="${live ? 1 : 0}"`
    // if (placeholder !== undefined) str += ` placeholder="${placeholder}"`
    // return str + '/>'
  }

  let html = ''
  let closed = false
  const missing = {}

  params.forEach(def => {
    let { type, caption, name, fps, live } = def

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

    html += `<div class="form-line ${fps ? 'param-anim-area':''}" type="${def.type}" closed="${closed ? 1 : 0}" `
    if (type == 'group') html += ` name="${name}"`
    html += `">`

    // label
    html += `<label`
    if (type == 'group') html += ` name="${name}"`
    html += `>${caption}</label>`

    // value
    let valHtml = ``
    if (type == 'slider' || type == 'range'){
      if(fps) valHtml += `<button action="play" code="${name}">P</button>`
      valHtml += `<input name="${name}" value="${value}" live="${live ? 1 : 0}"/>`
    }

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

  function _callback(source = 'change', inp, name) {
    if(name == 'fps' && target.anims?.length && parseFloat(inp.value) <=0){
      inp.value = inp.step || '1'
    }
    let out = getParams(target)
    if(out.fps && target.anims?.length){
      target.anims.forEach(inp=>inp.setAttribute('step', 1/out.fps))
    }
    callback(out, source)
  }

  html += '<div class="jscad-param-buttons"><div>'
  buttons.forEach(button => {
    const { id, name } = typeof button === 'string' ? { id: button, name: button } : button
    html += `<button action="${id}"><b>${name}</b></button>`
  })
  html += '</div></div>'

  target.innerHTML = html

  /** @param {"running" | ""} status */
  function animStatus(status){
    forEachInput(target, inp => {
      let p = inp.parentNode
      let button = querySelector(p,'BUTTON[action]')
      if(button){
        button.innerHTML = status == 'running' ? 'S' : 'P'
      }
      // TODO change button to play/pause depending on animation status
    })
  }

  function setSomeValues(v){
    setValue(v, true)
  }

  /**
   * @param {unknown} v 
   * @param {boolean} [skipUndefined]
   */
  function setValue(v, skipUndefined){
    forEachInput(target, inp => {
      let name = inp.getAttribute('name')
      if(name){
        if(skipUndefined && v[name] === undefined) return
        inp.value = v[name]
        applyRange(inp)
      }
    })
  }
  target.anims = []
  forEachInput(target, inp => {
    let p = inp.parentNode
    let name = inp.getAttribute('name')
    let type = inp.getAttribute('type')
    // only if there is animation and we have a fps input, and no min defined
    if(name == 'fps' && target.anims?.length && !inp.min){
      inp.min = inp.step || '1'
    }
    if(type == 'range') target.anims.push(inp)
    inp.def = params.find(def=>def.name == name)
    // live value for attribute is set to 1 regardless if config used 1 or true
    let isLiveInput = inp.getAttribute('live') === '1'
    // we lsiten to live changes to update value preview
    // an anslo then we can trigger param event if live option is chosen
    inp.addEventListener('input', function (evt) {
      applyRange(inp)
      if (isLiveInput) _callback('live', inp, name)
    })
    // regular input we only react on change
    if (!isLiveInput){
      inp.addEventListener('change', () => _callback('change', inp, name))
    }
    let button = querySelector(p,'BUTTON[action]')
    if(button && !button.clickAdded){
      button?.addEventListener?.('click',e=>{
        startAnim(inp.def, inp.value)
      })
      button.clickAdded = 1  
    } 
  })

  function groupClick(evt) {
    let groupDiv = evt.target
    if (groupDiv.tagName === 'LABEL') groupDiv = groupDiv.parentNode
    const closed = groupDiv.getAttribute('closed') == '1' ? '0' : '1'
    do {
      groupDiv.setAttribute('closed', closed)
      groupDiv = groupDiv.nextElementSibling
    } while (groupDiv && groupDiv.getAttribute('type') != 'group')
    _callback('group', groupDiv,'')
  }

  forEachGroup(target, div => {
    div.onclick = groupClick
  })

  return {animStatus, setValue, setSomeValues}
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
