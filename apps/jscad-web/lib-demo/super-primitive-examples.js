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
            name: 'mesh-panel-1',
            desc: '...',
            layoutOpts,
        },
        superPrimitives.meshPanel({
            size: [50, 30, 2.5],
            radius: 2.5,
            segments: 9,
        })
    );

    layout.addToLayout(
        {
            name: 'mesh-panel-2',
            desc: '...',
            layoutOpts,
        },
        superPrimitives.meshPanel({
            size: [40, 30, 2.5],
            radius: 2.5,
            segments: 8,
            pattern: 'square'
        })
    );

    layout.addToLayout(
        {
            name: 'mesh-panel-3',
            desc: '...',
            layoutOpts,
        },
        superPrimitives.meshPanel({
            size: [45, 35, 2],
            radius: 3,
            segments: 8,
            edgeMargin: 2,
            patternMode: 'fill'
        })
    );

    layout.addToLayout(
        {
            name: 'mesh-cuboid-1',
            desc: '...',
            layoutOpts,
        },
        superPrimitives.meshCuboid({
            size: [40, 30, 20],
            meshPanelThickness: 2,
            radius: 2.5,
            segments: 9
        })
    );

    layout.addToLayout(
        {
            name: 'mesh-cuboid-2.0',
            desc: '...',
            layoutOpts,
        },
        superPrimitives.meshCuboid({
            size: [40, 30, 20],
            meshPanelThickness: 2,
            radius: 2.5,
            segments: 9,
            openTop: true,
        })
    );

    layout.addToLayout(
        {
            name: 'mesh-cuboid-2.1',
            desc: 'tube-like',
            layoutOpts,
        },
        superPrimitives.meshCuboid({
            size: [40, 30, 20],
            meshPanelThickness: 2,
            radius: 2.5,
            segments: 9,
            openTop: true,
            openBottom: true,
        })
    );
    layout.addToLayout(
        {
            name: 'mesh-cuboid-2.2',
            desc: 'offsets',
            layoutOpts,
        },
        superPrimitives.meshCuboid({
            size: [40, 30, 20],
            meshPanelThickness: 2,
            radius: 2.5,
            segments: 9,
            openTop: true,
            openBottom: true,
            edgeOffsets: [2, 2]
        })
    );
    layout.addToLayout(
        {
            name: 'mesh-cuboid-2.3',
            desc: 'insets',
            layoutOpts,
        },
        superPrimitives.meshCuboid({
            size: [40, 30, 20],
            meshPanelThickness: 2,
            radius: 2.5,
            segments: 9,
            openTop: true,
            openBottom: true,
            edgeInsets: [2, 2]
        })
    );
    layout.addToLayout(
        {
            name: 'mesh-cuboid-2.4',
            desc: 'both',
            layoutOpts,
        },
        superPrimitives.meshCuboid({
            size: [40, 30, 20],
            meshPanelThickness: 2,
            radius: 2.5,
            segments: 9,
            openTop: true,
            openBottom: true,
            edgeInsets: [2, 2],
            edgeOffsets: [2, 2]
        })
    );

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
