"use strict"

const jscad = require('@jscad/modeling')
const swJscad = require('sw-jscad').init({ lib: jscad });
require('./enhancer').enhanceSwJscad({ lib: jscad, swLib: swJscad });

const { translate } = jscad.transforms;
const {
    buttress,
    layout,
} = swJscad

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        noFrame: true,
    }

    const buttress1 = buttress.buildSimple({
        height: 60,
        thickness: 10,
        width: 25,
    });
    layout.addToLayout({ name: 'buttress1', desc: '...', geom: buttress1, layoutOpts });

    const buttress2 = buttress.buildSimple({
        height: 60,
        thickness: 10,
        width: 25,
    });
    layout.addToLayout({ name: 'buttress2', desc: '...', geom: buttress2, layoutOpts });

    const buttress3 = buttress.buildTwoPart({
        height: 60,
        thickness: 10,
        bottomWidth: 25,
        topWidth: 15,
    });
    layout.addToLayout({ name: 'buttress3', desc: '...', geom: buttress3, layoutOpts });

    const buttress4 = buttress.buildTwoPart({
        height: 60,
        thickness: 10,
        bottomWidth: 25,
        topWidth: 15,
    });
    layout.addToLayout({ name: 'buttress4', desc: '...', geom: buttress4, layoutOpts });

    const buttress5 = buttress.buildTwoPart({
        height: 60,
        thickness: 10,
        bottomWidth: 25,
        topWidth: 15,
        midHeight: 20,
    });
    layout.addToLayout({ name: 'buttress5', desc: '...', geom: buttress5, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });

    return layoutContent
}

module.exports = { main }
