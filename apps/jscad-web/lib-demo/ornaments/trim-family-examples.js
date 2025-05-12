"use strict"

const jscad = require('@jscad/modeling')
const swJscad = require('sw-jscad').init({ lib: jscad });

const { translate } = jscad.transforms;
const {
    layout,
    trimFamilyAranea,
} = swJscad

const main = () => {
    const tFamilyAranea = trimFamilyAranea.build({ unitHeight: 20, unitDepth: 10 });

    const layoutOpts = {
        // column: true,
        relativeTo: [0, -75, 0],
        layoutMargin: 8,
        noFrame: true,
    }

    const baseTrim = [
        tFamilyAranea.base.small,
        tFamilyAranea.base.medium,
        tFamilyAranea.base.large,
        tFamilyAranea.base.smallOrn1,
        tFamilyAranea.base.mediumOrn1,
        tFamilyAranea.base.largeOrn1,
    ];

    const dadoTrim = [
        tFamilyAranea.dado.small,
        tFamilyAranea.dado.medium,
        tFamilyAranea.dado.large,
        tFamilyAranea.dado.smallOrn1,
        tFamilyAranea.dado.mediumOrn1,
        tFamilyAranea.dado.largeOrn1,
    ];

    const crownTrim = [
        tFamilyAranea.crown.small,
        tFamilyAranea.crown.medium,
        tFamilyAranea.crown.large,
        tFamilyAranea.crown.smallOrn1,
        tFamilyAranea.crown.mediumOrn1,
        tFamilyAranea.crown.largeOrn1,
    ];

    const allTrims = [
        ...baseTrim,
        ...dadoTrim,
        ...crownTrim,
    ];

    allTrims.forEach((trim, idx) => {
        layout.addToLayout({ name: idx, desc: 'No trim', geom: trim, layoutOpts });
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent
}

module.exports = { main }
