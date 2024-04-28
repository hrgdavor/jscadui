const { makeModel } = require('./util.js')

const main = ({ size = 10 }) => {
  return makeModel({ size })
}

module.exports = {main}
