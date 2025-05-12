"use strict"
const jscad = require('@jscad/modeling')
const swJscad = require('sw-jscad').init({ lib: jscad });
const { candleHolderCore } = require('./candle-holder-core')

const { roundedCylinder, cylinder } = jscad.primitives
const { subtract } = jscad.booleans
const { align } = jscad.transforms
const { measureBoundingBox } = jscad.measurements
const { colorize } = jscad.colors

const {
    transform,
} = swJscad

const main = () => {
    return [
        candleHolderCore()
    ];
}

module.exports = { main }
