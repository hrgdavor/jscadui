"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });
const swjBuilders = require('sw-jscad-builders').init({ lib: jscad, swLib: swJscad, swFamilies: swjFamilies });

const { columns } = swjBuilders;
const { profiles } = swJscad.details;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        layoutSpace: 15,
    }

    const profile1 = profiles.sqCornerCircNotch({ sqLength: 5 });
    const profile3 = profiles.octagonal({ sqLength: 5 });

    const col1 = columns.threePtColumn({
        base: ['extrude', 8, null, profile1],
        shaft: ['cuboid', 2],
        capital: ['extrude', 6, null, profile3],
        height: 40,
    })
    layout.addToLayout({ name: 'col1', desc: '...', layoutOpts }, col1);

    const col2 = columns.threePtColumn({
        base: ['roundCylinder', 2, 3.5],
        shaft: ['extrude', null, profile1],
        capital: ['roundCylinder', 2, 3.5],
        height: 20,
    });
    layout.addToLayout({ name: 'col2', desc: '...', layoutOpts }, col2);

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent
}

module.exports = { main }
