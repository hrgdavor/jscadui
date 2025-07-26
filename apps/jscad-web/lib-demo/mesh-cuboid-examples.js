"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { mesh3d } = swJscad.models.prefab;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 40,
        noFrame: false,
        layoutSpace: 30,
    }

    layout.addToLayout(
        {
            name: 'mesh-cuboid-1',
            desc: '...',
            layoutOpts,
        },
        mesh3d.meshCuboid({
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
        mesh3d.meshCuboid({
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
        mesh3d.meshCuboid({
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
        mesh3d.meshCuboid({
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
        mesh3d.meshCuboid({
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
        mesh3d.meshCuboid({
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

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
