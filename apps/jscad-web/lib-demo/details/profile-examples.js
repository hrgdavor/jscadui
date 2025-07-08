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

    const profile1 = profiles.sqCornerCircNotch({ sqLength: 5 });
    layout.addToLayout({ name: 'profile1', desc: '...', layoutOpts }, profile1);

    const profile2 = profiles.octagonal({ sqLength: 5 });
    layout.addToLayout({ name: 'profile2', desc: '...', layoutOpts }, profile2);

    const profile3 = profiles.edge.circNotch({ totalThickness: 8, topThickness: 4 });
    layout.addToLayout({ name: 'profile3', desc: '...', layoutOpts }, profile3);

    const profile4 = profiles.edge.circPortrusion({ totalThickness: 8, topThickness: 4 });
    layout.addToLayout({ name: 'profile4', desc: '...', layoutOpts }, profile4);

    const profile5 = profiles.edge.circNotch({ totalThickness: 8, topThickness: 4, smallOffset: 1 });
    layout.addToLayout({ name: 'profile5', desc: '...', layoutOpts }, profile5);

    const profile6 = profiles.edge.circPortrusion({ totalThickness: 8, topThickness: 4, smallOffset: 1 });
    layout.addToLayout({ name: 'profile6', desc: '...', layoutOpts }, profile6);

    const triProfiles = [
        {
            name: 'tri-equilateral',
            geom: profiles.triangle.equilateral({ base: 25 }),
        },
        {
            name: 'tri-rt45',
            geom: profiles.triangle.right45({ base: 25 }),
        },
        {
            name: 'tri-rt30',
            geom: profiles.triangle.right30({ base: 25 }),
        },
        {
            name: 'tri-rtGolden',
            geom: profiles.triangle.rightGolden({ base: 25 }),
        },
        {
            name: 'tri-rtSilver',
            geom: profiles.triangle.rightSilver({ base: 25 }),
        },
    ]

    const rectProfiles = [
        {
            name: 'rect-golden',
            geom: profiles.rectangle.golden({ width: 25 }),
        },
        {
            name: 'rect-silver',
            geom: profiles.rectangle.silver({ width: 25 }),
        },
    ]

    const curveProfiles = [
        {
            name: 'curves-rtGolden',
            geom: profiles.curves.rightCorner.golden({ width: 25 }),
        },
        {
            name: 'curves-rtSilver',
            geom: profiles.curves.rightCorner.silver({ width: 25 }),
        },
        // {
        //     name: 'curves-smTrGolden',
        //     geom: profiles.curves.smoothTriangle.golden({ width: 25 }),
        // },
    ]

    const ellipseProfiles = [
        {
            name: 'ellipse-golden',
            geom: profiles.ellipse.golden({ width: 25 }),
        },
        {
            name: 'ellipse-silver',
            geom: profiles.ellipse.silver({ width: 25 }),
        },
    ]

    const profiles2ndGen = [...triProfiles, ...rectProfiles, ...curveProfiles, ...ellipseProfiles]
    profiles2ndGen.forEach((prof) => {
        layout.addToLayout({ name: prof.name, desc: '..', layoutOpts }, prof.geom);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
