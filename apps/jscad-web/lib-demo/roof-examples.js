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
        roofSpanSize: [30, 50],
        roofPitch: Math.PI / 5,
        wallThickness: 10,
    }

    const roof1 = roofs.buildShedRoof({
        ...defaultRoofOpts
    });
    layout.addToLayout({ name: 'roof1', desc: '...', geom: roof1, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });

    return layoutContent
}

module.exports = { main }
