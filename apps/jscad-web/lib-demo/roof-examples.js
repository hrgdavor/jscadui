"use strict"

const jscad = require('@jscad/modeling')
const swJscad = require('sw-jscad').init({ lib: jscad });
require('./enhancer').enhanceSwJscad({ lib: jscad, swLib: swJscad });

const { translate } = jscad.transforms;
const {
    roofs,
    layout,
} = swJscad

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        noFrame: true,
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
    layout.addToLayout({ name: 'roof1', desc: '...', geom: roof1, layoutOpts });

    const roof2 = roofs.buildShedRoof({
        ...defaultRoofOpts,
        roofSpanSize: [25, 60],
    });
    layout.addToLayout({ name: 'roof2', desc: '...', geom: roof2, layoutOpts });

    const roof3 = roofs.buildShedRoof({
        ...defaultRoofOpts,
        roofPitch: Math.PI / 3.5,
        roofOverhangSize: [2, 4],
    });
    layout.addToLayout({ name: 'roof3', desc: '...', geom: roof3, layoutOpts });

    const roof4 = roofs.buildShedRoof({
        ...defaultRoofOpts,
        wallThickness: defaultRoofOpts.wallThickness * 0.6667,
    });
    layout.addToLayout({ name: 'roof4', desc: '...', geom: roof4, layoutOpts });

    const roof5 = roofs.buildShedRoof({
        ...defaultRoofOpts,
        roofAxis: 'y',
        roofSpanSize: [25, 60],
        roofOverhangSize: [2, 4],
    });
    layout.addToLayout({ name: 'roof5', desc: '...', geom: roof5, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });

    return layoutContent
}

module.exports = { main }
