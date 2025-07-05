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
        layoutMargin: 30,
        noFrame: false,
        layoutSpace: 20,
    }

    console.log(dowelFittings)

    const dowelRadius = maths.inchesToMm(1 / 16)

    const dowelJoists = {
        iJoist: dowelFittings.joists.iJoist({ dowelRadius, height: maths.inchesToMm(3 / 4) }),
        triJoist: dowelFittings.joists.triJoist({ dowelRadius, height: maths.inchesToMm(3 / 4) }),
        squareJoist: dowelFittings.joists.squareJoist({ dowelRadius, height: maths.inchesToMm(3 / 4) }),
        rectJoist1: dowelFittings.joists.rectJoist({ dowelRadius, size: [maths.inchesToMm(1), maths.inchesToMm(3 / 4)] }),
        rectJoist2: dowelFittings.joists.rectJoist({ dowelRadius, size: [maths.inchesToMm(3 / 2), maths.inchesToMm(3 / 4)] }),
    }

    Object.entries(dowelJoists).forEach(([dgKey, dgVal], idx) => {
        layout.addToLayout({
            name: `${dgKey}-1`,
            desc: 'joist',
            layoutOpts,
        }, dgVal.joist);

        layout.addToLayout({
            name: `${dgKey}-2`,
            desc: 'upper',
            layoutOpts,
        }, dgVal.upperJig);

        layout.addToLayout({
            name: `${dgKey}-3`,
            desc: 'lower',
            layoutOpts,
        }, dgVal.lowerJig);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
