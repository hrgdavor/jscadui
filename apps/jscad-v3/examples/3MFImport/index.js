"use strict"
/**
 * STL Import Demonstration
 * @category Imports
 * @skillLevel 1
 * @description Importing STL files. Drag the whole STLImport folder into JSCAD
 * @tags stl, import
 * @authors Simon Clark
 * @licence MIT License
 */

const { translate, scale, rotateZ } = require('@jscad/modeling').transforms
const { union } = require('@jscad/modeling').booleans

// Load the 3MF files using require
const rook = require('./Rook.3mf')

const main = () => {
  return rook
}

module.exports = { main }
