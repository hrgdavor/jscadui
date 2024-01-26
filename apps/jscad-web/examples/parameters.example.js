/**
 * Demonstrate all available parameter types
 */

const jscad = require('@jscad/modeling')
const { colorize, hexToRgb } = jscad.colors
const { sphere } = jscad.primitives

const values = [3, 4, 5, 6]
const captions = ['three', 'four', 'five', 'six']

const getParameterDefinitions = () => [
  { name: 'group1', type: 'group', caption: 'Group 1: Text Entry' },
  { name: 'text', type: 'text', initial: '', size: 20, maxLength: 20, caption: 'Plain Text:', placeholder: '20 characters' },
  { name: 'int', type: 'int', initial: 20, min: 1, max: 100, step: 1, caption: 'Integer:' },
  { name: 'number', type: 'number', initial: 2.0, min: 1.0, max: 10.0, step: 0.1, caption: 'Number:' },
  { name: 'date', type: 'date', initial: '2023-01-01', min: '2020-01-01', max: '2030-12-31', caption: 'Date:', placeholder: 'YYYY-MM-DD' },
  { name: 'email', type: 'email', initial: 'me@example.com', caption: 'Email:' },
  { name: 'url', type: 'url', initial: 'www.example.com', size: 40, maxLength: 40, caption: 'Url:', placeholder: '40 characters' },
  { name: 'password', type: 'password', initial: '', caption: 'Password:' },

  { name: 'group2', type: 'group', caption: 'Group 2: Interactive Controls' },
  { name: 'checkbox', type: 'checkbox', checked: true, caption: 'Checkbox:' },
  { name: 'color', type: 'color', initial: '#8844ee', caption: 'Color:' },
  { name: 'slider', type: 'slider', initial: 5, min: 1, max: 10, step: 1, caption: 'Slider:' },
  { name: 'choice3', type: 'choice', caption: 'Choice:', values: ['No', 'Yes', 'Maybe', 'So so'], initial: 'No' },
  { name: 'choice2', type: 'radio', caption: 'Radio Buttons:', values, captions, initial: 5 },

  { name: 'group3', type: 'group', initial: 'closed', caption: 'Group 3: Initially Closed Group' },
  { name: 'checkbox2', type: 'checkbox', checked: false, caption: 'Optional Checkbox:' }
]

const main = (params) => {
  return colorize(hexToRgb(params.color), sphere({ radius: params.slider }))
}

module.exports = { main, getParameterDefinitions }
