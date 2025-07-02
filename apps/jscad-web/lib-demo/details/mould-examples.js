"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { cuboid, cylinder } = jscad.primitives;
const { profiles, moulds } = swJscad.details;

const {
    layout,
} = swjUi.ux

const main = () => {
    const layoutOpts = {
        layoutMargin: 18,
        layoutSpace: 10,
    }

    const circNotchprofile = profiles.edge.circNotch({ totalThickness: 8, topThickness: 4, smallOffset: 1 });
    const circProtProfile = profiles.edge.circPortrusion({ totalThickness: 8, topThickness: 4, smallOffset: 0.67 });

    const orig1 = cuboid({ size: [20, 40, 8] });
    layout.addToLayout({ name: 'orig1', desc: '...', layoutOpts }, orig1);

    const mould1 = moulds.cuboidMouldingOneEdge({ size: [20, 40, 8] }, circNotchprofile);
    layout.addToLayout({ name: 'mould1', desc: '...', layoutOpts }, mould1);

    const orig2 = cuboid({ size: [10, 40, 8] });
    layout.addToLayout({ name: 'orig2', desc: '...', layoutOpts }, orig2);

    const mould2 = moulds.cuboidMoulding({ size: [10, 40, 8] }, circNotchprofile);
    layout.addToLayout({ name: 'mould2', desc: '...', layoutOpts }, mould2);

    const orig3 = cylinder({ radius: 20, height: 8 });
    layout.addToLayout({ name: 'orig3', desc: '...', layoutOpts }, orig3);

    const mould3 = moulds.circularMoulding({ radius: 20, height: 8 }, circProtProfile);
    layout.addToLayout({ name: 'mould3', desc: '...', layoutOpts }, mould3);

    const orig4 = cylinder({ radius: 20, height: 8 });
    layout.addToLayout({ name: 'orig4', desc: '...', layoutOpts }, orig4);

    const mould4 = moulds.circularMoulding({ segments: 8, radius: 20, height: 8 }, circProtProfile);
    layout.addToLayout({ name: 'mould4', desc: '...', layoutOpts }, mould4);

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
