"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });
const swjBuilders = require('sw-jscad-builders').init({ lib: jscad, swLib: swJscad, swFamilies: swjFamilies });

const { entryways } = swjBuilders;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 18,
        layoutSpace: 30,
    }

    const entryway1 = entryways.buildGothicEntryway({
        wallLength: 100,
        wallThickness: 10,
        wallHeight: 100,
        entryLength: 40,
        trimOpts: ['base', 'dado', 'crown'],
        crownUnits: 2,
        dadoUnits: 2,
        baseUnits: 1,
        trimUnitHeight: 4,
        trimUnitDepth: 1.25,
    });
    layout.addToLayout({ name: 'entryway1', desc: '...', layoutOpts }, entryway1);

    const entryway2 = entryways.buildGothicEntryway({
        wallLength: 100,
        wallThickness: 10,
        wallHeight: 100,
        entryLength: 40,
        dadoHeight: 50,
        trimOpts: [],
        crownUnits: 2,
        dadoUnits: 2,
        baseUnits: 1,
        trimUnitHeight: 4,
        trimUnitDepth: 1.25,
    });
    layout.addToLayout({ name: 'entryway2', desc: '...', layoutOpts }, entryway2);

    const entryway3 = entryways.buildGothicEntryway({
        wallLength: 100,
        wallThickness: 10,
        wallHeight: 100,
        entryLength: 40,
        dadoHeight: 50,
        trimOpts: ['base', 'dado', 'crown'],
        crownUnits: 2,
        dadoUnits: 2,
        baseUnits: 1,
        trimUnitHeight: 4,
        trimUnitDepth: 1.25,
        archRadFactor: 0.667,
    });
    layout.addToLayout({ name: 'entryway3', desc: '...', layoutOpts }, entryway3);

    const layoutContent = layout.gridLayout({ layoutOpts });

    return layoutContent
}

module.exports = { main }
