"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });

const { union } = jscad.booleans;
const { translate } = jscad.transforms;
const { sphere } = jscad.primitives;
const { geometry } = swJscad.utils;
const { maths } = swJscad.core;
const { layout } = swjUi.ux;
const { dowelFittings } = swjFamilies;

const main = () => {
    const layoutOpts = {
        layoutMargin: 35,
        noFrame: false,
        layoutSpace: 20,
    }

    console.log(dowelFittings)

    const dowelRadius = maths.inchesToMm(1 / 16)

    const iJoist = dowelFittings.joists.iJoist({ dowelRadius, height: maths.inchesToMm(3 / 4) })
    const triJoist = dowelFittings.joists.triJoist({ dowelRadius, height: maths.inchesToMm(3 / 4) })
    const rectJoist = dowelFittings.joists.rectJoist({ dowelRadius, size: [maths.inchesToMm(3 / 4), maths.inchesToMm(3 / 4)] })

    layout.addToLayout({
        name: 'iJoist',
        desc: '...',
        layoutOpts,
    }, iJoist);

    layout.addToLayout({
        name: 'triJoist',
        desc: '...',
        layoutOpts,
    }, triJoist);

    layout.addToLayout({
        name: 'rectJoist',
        desc: '...',
        layoutOpts,
    }, rectJoist);

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
