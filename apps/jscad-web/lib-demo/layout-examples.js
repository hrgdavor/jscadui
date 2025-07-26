"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });
const swjBuilders = require('sw-jscad-builders').init({ lib: jscad, swLib: swJscad, swFamilies: swjFamilies });

const { arches } = swjBuilders;
const { profiles } = swJscad.models;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        noFrame: false,
        layoutSpace: 0,
    }

    const profile1 = profiles.sqCornerCircNotch({ sqLength: 5 });

    const arch1 = arches.twoPtArch({ arcRadius: 30, archWidth: 35 }, profile1);
    layout.addToLayout({ name: 'arch1', desc: '...', layoutOpts }, arch1);

    const arch2 = arches.onePtArch({ arcRadius: 40 }, profile1);
    layout.addToLayout({ name: 'arch2', desc: '...', layoutOpts }, arch2);

    const arch3 = arches.twoPtArch({ arcRadius: 30, archWidth: 35 });
    layout.addToLayout({ name: 'arch3', desc: '...', layoutOpts }, arch3);

    const arch4 = arches.onePtArch({ arcRadius: 40 });
    layout.addToLayout({ name: 'arch4', desc: '...', layoutOpts }, arch4);

    const layoutContent = layout.gridLayout({ layoutOpts });
    // const layoutContent = layout.gridLayout({ layoutOpts: { ...layoutOpts, is2D: true } });
    return layoutContent;
}

module.exports = { main }
