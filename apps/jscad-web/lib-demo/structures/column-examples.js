"use strict"
const jscad = require('@jscad/modeling')
const { translate } = jscad.transforms

const swJscad = require('sw-jscad').init({ lib: jscad });
console.log(swJscad);
const {
    layout,
    columns,
    profiles,
} = swJscad

const main = () => {
    const layoutOpts = {
        layoutMargin: 10,
        noFrame: true,
    }

    const profile1 = profiles.sqCornerCircNotch({ sqLength: 5 });
    layout.addToLayout({ name: 'profile1', desc: '...', geom: profile1, layoutOpts });

    const profile3 = profiles.octagonal({ sqLength: 5 });
    layout.addToLayout({ name: 'profile3', desc: '...', geom: profile3, layoutOpts });

    const col1 = columns.threePt({
        base: ['extrude', 8, null, profile1],
        shaft: ['cuboid', 2],
        capital: ['extrude', 6, null, profile3],
        height: 40,
    })
    layout.addToLayout({ name: 'col1', desc: '...', geom: col1, layoutOpts });

    const col2 = columns.threePt({
        base: ['roundCylinder', 2, 3.5],
        shaft: ['extrude', null, profile1],
        capital: ['roundCylinder', 2, 3.5],
        height: 20,
    });
    layout.addToLayout({ name: 'col2', desc: '...', geom: col2, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent
}

module.exports = { main }
