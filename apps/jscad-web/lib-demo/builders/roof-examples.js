"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });
const swjBuilders = require('sw-jscad-builders').init({ lib: jscad, swLib: swJscad, swFamilies: swjFamilies });

const { roofs } = swjBuilders;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        layoutSpace: 10,
    }

    const defaultRoofOpts = {
        roofSpanSize: [50, 30],
        roofPitch: Math.PI / 5,
        wallThickness: 10,
        trimUnitSize: [1.25, 4],
    }

    const roof1 = roofs.buildShedRoof({
        ...defaultRoofOpts
    });
    layout.addToLayout({ name: 'roof1', desc: '...', layoutOpts }, roof1);

    const roof2 = roofs.buildShedRoof({
        ...defaultRoofOpts,
        roofOpts: ['solid']
    });
    layout.addToLayout({ name: 'roof2', desc: '...', layoutOpts }, roof2);

    const roof3 = roofs.buildShedRoof({
        ...defaultRoofOpts,
        roofPitch: Math.PI / 3.5,
        roofOverhangSize: [2, 4],
    });
    layout.addToLayout({ name: 'roof3', desc: '...', layoutOpts }, roof3);

    const roof4 = roofs.buildShedRoof({
        ...defaultRoofOpts,
        wallThickness: defaultRoofOpts.wallThickness * 0.6667,
        roofOpts: ['solid']
    });
    layout.addToLayout({ name: 'roof4', desc: '...', layoutOpts }, roof4);

    const roof5 = roofs.buildShedRoof({
        ...defaultRoofOpts,
        roofAxis: 'y',
        roofSpanSize: [25, 60],
        roofOverhangSize: [2, 4],
    });
    layout.addToLayout({ name: 'roof5', desc: '...', layoutOpts }, roof5);

    const roof6 = roofs.buildGableRoof({
        ...defaultRoofOpts,
        roofSpanSize: [50, 90],
        roofOverhangSize: [3, 6],
    });
    layout.addToLayout({ name: 'roof6', desc: '...', layoutOpts }, roof6);

    const roof7 = roofs.buildGableRoof({
        ...defaultRoofOpts,
        roofSpanSize: [50, 90],
        roofAxis: 'y',
        roofOverhangSize: [3, 6],
    });
    layout.addToLayout({ name: 'roof7', desc: '...', layoutOpts }, roof7);

    const roof8 = roofs.buildGableRoof({
        ...defaultRoofOpts,
        roofSpanSize: [50, 90],
        roofAxis: 'y',
        roofOverhangSize: [5, 10],
        roofOpts: ['solid']
    });
    layout.addToLayout({ name: 'roof8', desc: '...', layoutOpts }, roof8);

    const layoutContent = layout.gridLayout({ layoutOpts });

    return layoutContent
}

module.exports = { main }
