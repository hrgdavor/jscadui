"use strict"
const jscad = require('@jscad/modeling')
const { translate } = jscad.transforms
const { cuboid, cylinder } = jscad.primitives

const swJscad = require('sw-jscad').init({ lib: jscad });

const {
    layout,
    profiles,
    moulds,
} = swJscad

const main = () => {
    const layoutOpts = {
        layoutMargin: 10,
        noFrame: true,
    }

    const circNotchprofile = profiles.edge.circNotch({ totalThickness: 8, topThickness: 4, smallOffset: 1 });
    layout.addToLayout({ name: 'circNotchprofile', desc: '...', geom: circNotchprofile, layoutOpts });

    const circProtProfile = profiles.edge.circPortrusion({ totalThickness: 8, topThickness: 4, smallOffset: 0.67 });
    layout.addToLayout({ name: 'circProtProfile', desc: '...', geom: circProtProfile, layoutOpts });

    const orig1 = cuboid({ size: [20, 40, 8] });
    layout.addToLayout({ name: 'orig1', desc: '...', geom: orig1, layoutOpts });

    const mould1 = moulds.cuboidOneEdge({ size: [20, 40, 8], geomProfile: circNotchprofile });
    layout.addToLayout({ name: 'mould1', desc: '...', geom: mould1, layoutOpts });

    const orig2 = cuboid({ size: [10, 40, 8] });
    layout.addToLayout({ name: 'orig2', desc: '...', geom: orig2, layoutOpts });

    const mould2 = moulds.cuboidEdge({ size: [10, 40, 8], geomProfile: circNotchprofile });
    layout.addToLayout({ name: 'mould2', desc: '...', geom: mould2, layoutOpts });

    const orig3 = cylinder({ radius: 20, height: 8 });
    layout.addToLayout({ name: 'orig3', desc: '...', geom: orig3, layoutOpts });

    const mould3 = moulds.circularEdge({ radius: 20, height: 8, geomProfile: circProtProfile });
    layout.addToLayout({ name: 'mould3', desc: '...', geom: mould3, layoutOpts });

    const orig4 = cylinder({ radius: 20, height: 8 });
    layout.addToLayout({ name: 'orig4', desc: '...', geom: orig4, layoutOpts });

    const mould4 = moulds.circularEdge({ segments: 8, radius: 20, height: 8, geomProfile: circProtProfile });
    layout.addToLayout({ name: 'mould4', desc: '...', geom: mould4, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
