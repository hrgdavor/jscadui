"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { superPrimitives } = swJscad.utils;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 25,
        noFrame: false,
        layoutSpace: 20,
    }

    layout.addToLayout({
        name: 'mesh-panel-1',
        desc: '...',
        geom: superPrimitives.meshPanel({
            size: [50, 30, 2.5],
            radius: 2.5,
            segments: 9,
        }),
        layoutOpts,
    });

    layout.addToLayout({
        name: 'mesh-panel-2',
        desc: '...',
        geom: superPrimitives.meshPanel({
            size: [40, 30, 2.5],
            radius: 2.5,
            segments: 8,
            pattern: 'square'
        }),
        layoutOpts,
    });

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
