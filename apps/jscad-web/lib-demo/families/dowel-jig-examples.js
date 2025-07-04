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
        layoutMargin: 25,
        noFrame: false,
        layoutSpace: 20,
    }

    console.log(dowelFittings)

    const dowelRadius = maths.inchesToMm(1 / 8)

    const singleJigs = dowelFittings.jigs.singleJigs({ dowelRadius })
    const triangularJigs = dowelFittings.jigs.triangularJigs({ dowelRadius })
    const twoByTwoJigs = dowelFittings.jigs.twoByTwoJigs({ dowelRadius })

    Object.entries(singleJigs.jigHolders).forEach(([jigKey, jigVal], idx) => {
        layout.addToLayout({
            name: `jig-single-${idx}`,
            desc: `jigHolders.${jigKey}`,
            layoutOpts,
        }, jigVal);
    })

    Object.entries(triangularJigs.jigHolders).forEach(([jigKey, jigVal], idx) => {
        layout.addToLayout({
            name: `jig-tri-${idx}`,
            desc: `jigHolders.${jigKey}`,
            layoutOpts,
        }, jigVal);
    })

    Object.entries(twoByTwoJigs.jigHolders).forEach(([jigKey, jigVal], idx) => {
        layout.addToLayout({
            name: `jig-2x2-${idx}`,
            desc: `jigHolders.${jigKey}`,
            layoutOpts,
        }, jigVal);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
