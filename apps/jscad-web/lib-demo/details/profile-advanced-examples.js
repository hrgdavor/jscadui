"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { profiles } = swJscad.models;
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
            geom: profiles.reinforcement.cBeam({ length: 48, depth: 32, thickness: 2, flangeThickness: 1, insetWidth: 4, offsetWidth: 6 }),
        },
        {
            name: 're-tBeam',
            geom: profiles.reinforcement.tBeam({ length: 48, depth: 32, thickness: 2, flangeThickness: 1, insetWidth: 4, offsetWidth: 6 }),
        },
        {
            name: 're-doubleTBeam',
            geom: profiles.reinforcement.doubleTBeam({ length: 64, depth: 32, thickness: 4, insetWidth: 4, offsetWidth: 6 }),
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
        {
            name: 'c-pegboard-m',
            geom: profiles.connections.pegboard({ spacing: 25.4, radius: 6.35 }).male,
        },
        {
            name: 'c-pegboard-f',
            geom: profiles.connections.pegboard({ spacing: 25.4, radius: 6.35 }).female,
        },
        {
            name: 'c-polygon-m',
            geom: profiles.connections.polygon({ radius: 12.7, segments: 6 }).male,
        },
        {
            name: 'c-polygon-f',
            geom: profiles.connections.polygon({ radius: 12.7, segments: 6 }).female,
        },
        {
            name: 'c-tab-m',
            geom: profiles.connections.tab({ width: 30, depth: 10 }).male,
        },
        {
            name: 'c-tab-f',
            geom: profiles.connections.tab({ width: 30, depth: 10 }).female,
        },
        {
            name: 'c-dovetail-m',
            geom: profiles.connections.dovetail({ width: 30, depth: 10 }).male,
        },
        {
            name: 'c-dovetail-f',
            geom: profiles.connections.dovetail({ width: 30, depth: 10 }).female,
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
