"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { superPrimitives } = swJscad.utils;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        noFrame: false,
        layoutSpace: 15,
    }

    layout.addToLayout(
        {
            name: 'rectFrame-1',
            desc: '..',
            layoutOpts,
        },
        superPrimitives.rectangularFrame({
            size: [40, 50],
            direction: 'in',
            frameWidth: 10,
            cornerOpts: {
                style: 'rectSixtyThirty',
                length: 5,
            },
        })
    );

    layout.addToLayout(
        {
            name: 'rectFrame-2',
            desc: '..',
            layoutOpts,
        },
        superPrimitives.rectangularFrame({
            size: [40, 50],
            direction: 'out',
            frameWidth: 10,
            outCornerOpts: {
                style: 'ellipseSilver',
                length: 5,
            },
        })
    );

    layout.addToLayout(
        {
            name: 'rectFrame-3',
            desc: '..',
            layoutOpts,
        },
        superPrimitives.rectangularFrame({
            size: [40, 50],
            direction: 'both',
            frameWidth: 10,
            cornerOpts: {
                style: 'rectSixtyThirty',
                length: 5,
            },
            outCornerOpts: {
                style: 'ellipseSilver',
                length: 5,
            },
        })
    );

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
