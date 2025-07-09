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
const { crafts } = swjFamilies;

const main = () => {
    const layoutOpts = {
        layoutMargin: 25,
        noFrame: false,
        layoutSpace: 20,
    }

    console.log(crafts)

    Object.entries(crafts).forEach(([craftKey, craftFunc], idx) => {
        layout.addToLayout({
            name: `${craftKey}-2d`,
            desc: '..',
            layoutOpts,
        }, craftFunc({}).geom2);
        layout.addToLayout({
            name: `${craftKey}-3d`,
            desc: '..',
            layoutOpts,
        }, craftFunc({}).geom3);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
