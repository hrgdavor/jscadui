"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { profiles } = swJscad.details;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        layoutSpace: 5,
    }

    const reinforcementProfiles = [
        {
            name: 're-straight',
            geom: profiles.reinforcement.straight({ length: 24, thickness: 4, offsetWidths: [4] }),
        },
    ]

    const connectionProfiles = [
        {
            name: 'conn-pegboard',
            geom: null,
        },
    ]

    const profiles2ndGen = [...reinforcementProfiles, ...connectionProfiles]
    profiles2ndGen.forEach((prof) => {
        layout.addToLayout({ name: prof.name, desc: '..', layoutOpts }, prof.geom);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
