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

    layout.addToLayout(
        {
            name: 'mesh-cylinder-1',
            desc: '...',
            layoutOpts,
        },
        superPrimitives.meshCylinder({
            radius: 12,
            height: 40,
            thickness: 1.5,
            meshRadius: 2.5,
            meshMinWidth: 2.5,
            meshSegments: 9,
        })
    );

    layout.addToLayout(
        {
            name: 'mesh-cylinder-2',
            desc: '...',
            layoutOpts,
        },
        superPrimitives.meshCylinder({
            radius: 16,
            height: 45,
            thickness: 1.5,
            meshRadius: 5,
            meshMinWidth: 2.5,
            meshSegments: 10,
            edgeInsets: [2, 3]
        })
    );

    layout.addToLayout(
        {
            name: 'mesh-cylinder-3',
            desc: '...',
            layoutOpts,
        },
        superPrimitives.meshCylinder({
            radius: 12,
            height: 40,
            thickness: 1.5,
            meshRadius: 4,
            meshMinWidth: 2.5,
            meshSegments: 12,
            edgeOffsets: [2.5, 3.5],
        })
    );

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
