"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { cuboid, sphere, cylinder, rectangle } = jscad.primitives
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        noFrame: false,
        layoutSpace: 0,
    }

    const shape1 = cuboid({ size: [15, 30, 15] })
    const shape2 = cylinder({ radius: 6, height: 15 })
    const shape3 = sphere({ radius: 10 })
    const shape4 = rectangle({ size: [15, 30] })

    const arch1 = shape1
    layout.addToLayout({ name: 'arch1', desc: '...', layoutOpts }, arch1);

    const arch2 = shape2
    layout.addToLayout({ name: 'arch2', desc: '...', layoutOpts }, arch2);

    const arch3 = shape3
    layout.addToLayout({ name: 'arch3', desc: '...', layoutOpts }, arch3);

    const arch4 = shape4;
    layout.addToLayout({ name: 'arch4', desc: '...', layoutOpts }, arch4);

    const layoutContent = layout.gridLayout({ layoutOpts });
    // const layoutContent = layout.gridLayout({ layoutOpts: { ...layoutOpts, is2D: true } });
    return layoutContent;
}

module.exports = { main }
