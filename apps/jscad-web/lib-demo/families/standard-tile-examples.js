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
const { tile } = swjFamilies;

const main = () => {
    const layoutOpts = {
        layoutMargin: 30,
        noFrame: false,
        layoutSpace: 20,
    }

    console.log(tile)

    Object.entries(tile.northAmerica).forEach(([tKey, tileVal], idx) => {
        layout.addToLayout({
            name: tKey,
            desc: '...',
            layoutOpts,
        }, tileVal.geom);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
