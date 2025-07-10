"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { frameRect } = swJscad.details;
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
        frameRect.rectangularFrame({
            size: [40, 50],
            direction: 'in',
            frameWidth: 10,
            cornerOpts: {
                style: 'ellipseSixtyThirty',
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
        frameRect.rectangularFrame({
            size: [50, 40],
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
        frameRect.rectangularFrame({
            size: [40, 50],
            direction: 'both',
            frameWidth: 10,
            cornerOpts: {
                style: 'round',
                radius: 2.5,
            },
            outCornerOpts: {
                style: 'ellipseBronze',
                length: 5,
            },
        })
    );

    layout.addToLayout(
        {
            name: 'rectFrame-4',
            desc: '..',
            layoutOpts,
        },
        frameRect.rectangularFrame({
            size: [40, 50],
            direction: 'both',
            frameWidth: 10,
            cornerOpts: {
                style: 'triGolden',
                base: 5,
                height: 8,
            },
            outCornerOpts: {
                style: 'cornerBezSilver',
                length: 10,
            },
        })
    );

    layout.addToLayout(
        {
            name: 'rectFrame-5',
            desc: '..',
            layoutOpts,
        },
        frameRect.rectangularFrame({
            size: [60, 45],
            direction: 'both',
            frameWidth: 10,
            cornerOpts: {
                style: 'triGolden',
                base: 5,
                height: 8,
            },
            outCornerOpts: {
                style: 'cornerBezBronze',
                length: 10,
            },
        })
    );

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
