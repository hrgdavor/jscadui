"use strict"

const jscad = require('@jscad/modeling')
const swJscad = require('sw-jscad').init({ lib: jscad });

const { translate } = jscad.transforms;
const {
    entryways,
    layout,
} = swJscad

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        noFrame: true,
    }

    // const entryway1 = entryways.buildGothic({
    //     wallLength: 100,
    //     wallThickness: 10,
    //     wallHeight: 100,
    //     entryLength: 40,
    //     trimOpts: ['base', 'dado', 'crown'],
    //     crownUnits: 2,
    //     dadoUnits: 2,
    //     baseUnits: 1,
    //     trimUnitHeight: 4,
    //     trimUnitDepth: 1.25,
    // });
    // layout.addToLayout({ name: 'entryway1', desc: '...', geom: entryway1, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });

    // return layoutContent

    return []
}

module.exports = { main }
