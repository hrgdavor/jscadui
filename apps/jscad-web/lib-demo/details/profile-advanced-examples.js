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
            geom: profiles.reinforcement.straight({ length: 32, thickness: 4, insetWidth: 4, offsetWidth: 6 }),
        },
        {
            name: 're-corner',
            geom: profiles.reinforcement.corner({ length: 48, depth: 32, thickness: 4, flangeThickness: 1, insetWidth: 4, offsetWidth: 6 }),
        },
        {
            name: 're-cBeam',
            geom: profiles.reinforcement.cBeam({ length: 48, depth: 32, thickness: 4, flangeThickness: 1, insetWidth: 4, offsetWidth: 6 }),
        },
        {
            name: 're-tBeam',
            geom: profiles.reinforcement.tBeam({ length: 48, depth: 32, thickness: 4, flangeThickness: 1, insetWidth: 4, offsetWidth: 6 }),
        },
        {
            name: 're-doubleTBeam',
            geom: profiles.reinforcement.doubleTBeam({ length: 48, depth: 32, thickness: 4, insetWidth: 4, offsetWidth: 6 }),
        },
        {
            name: 're-triBeam',
            geom: profiles.reinforcement.triBeam({ radius: 48, thickness: 3, insetWidth: 3, offsetWidth: 6 }),
        },
        {
            name: 're-crossBeam',
            geom: profiles.reinforcement.crossBeam({ radius: 48, thickness: 3, insetWidth: 3, offsetWidth: 6 }),
        },
        {
            name: 're-hexBeam',
            geom: profiles.reinforcement.hexBeam({ radius: 48, thickness: 3, insetWidth: 3, offsetWidth: 6 }),
        },
    ]

    const connectionProfiles = [
        // {
        //     name: 'conn-pegboard',
        //     geom: null,
        // },
    ]

    const profiles2ndGen = [...reinforcementProfiles, ...connectionProfiles]
    profiles2ndGen.forEach((prof) => {
        layout.addToLayout({ name: prof.name, desc: '..', layoutOpts }, prof.geom);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
