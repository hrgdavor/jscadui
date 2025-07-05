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

    const xsCoupler = dowelFittings.couplers.extraSmallDowelCoupler({ dowelRadius })
    const smCoupler = dowelFittings.couplers.smallDowelCoupler({ dowelRadius })
    const mdCoupler = dowelFittings.couplers.mediumDowelCoupler({ dowelRadius })
    const lgCoupler = dowelFittings.couplers.largeDowelCoupler({ dowelRadius })

    layout.addToLayout({
        name: 'xsCoupler',
        desc: '...',
        layoutOpts,
    }, xsCoupler);

    layout.addToLayout({
        name: 'smCoupler',
        desc: '...',
        layoutOpts,
    }, smCoupler);

    layout.addToLayout({
        name: 'mdCoupler',
        desc: '...',
        layoutOpts,
    }, mdCoupler);

    layout.addToLayout({
        name: 'lgCoupler',
        desc: '...',
        layoutOpts,
    }, lgCoupler);

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
