"use strict"
const jscad = require('@jscad/modeling')
const { translate } = jscad.transforms

const SwJscad = require('sw-jscad');
const swJscad = SwJscad.init({ lib: jscad });

const {
    layout,
    arches,
    columns,
    walls,
    foils,
    moulds,
    profiles,
    trimFamilyAranea,
} = swJscad

const main = () => {
    const layoutOpts = {
        layoutMargin: 5,
        noFrame: true,
    }


    //-----------
    // Profiles

    const profile1 = profiles.sqCornerCircNotch({ sqLength: 5 });
    layout.addToLayout({ name: 'profile1', desc: '...', geom: profile1, layoutOpts });

    const profile3 = profiles.octagonal({ sqLength: 5 });
    layout.addToLayout({ name: 'profile3', desc: '...', geom: profile3, layoutOpts });

    const tFamilyBasic = trimFamilyAranea.build({ unitHeight: 20, unitDepth: 10 });
    const dadoTrim = [
        tFamilyBasic.dado.small,
        tFamilyBasic.dado.medium,
        tFamilyBasic.dado.large,
        tFamilyBasic.dado.smallOrn1,
        tFamilyBasic.dado.mediumOrn1,
        tFamilyBasic.dado.largeOrn1,
    ];
    dadoTrim.forEach((trim, idx) => {
        layout.addToLayout({ name: `dado-${idx}`, desc: '...', geom: trim, layoutOpts });
    })


    //-----------
    // Mouldings

    const mould2 = moulds.cuboidEdge({ size: [10, 40, 5], geomProfile: profile1 });
    layout.addToLayout({ name: 'mould2', desc: '...', geom: mould2, layoutOpts });

    const mould3 = moulds.circularEdge({ radius: 20, height: 5, geomProfile: profile1 });
    layout.addToLayout({ name: 'mould3', desc: '...', geom: mould3, layoutOpts });

    const mould4 = moulds.circularEdge({ segments: 8, radius: 20, height: 5, geomProfile: profile1 });
    layout.addToLayout({ name: 'mould4', desc: '...', geom: mould4, layoutOpts });


    //-----------
    // Foils

    const foil1 = foils.trefoil({ radius: 10 });
    layout.addToLayout({ name: 'foil1', desc: '...', geom: foil1, layoutOpts });

    const foil5 = foils.quatrefoil({ radius: 10, lobeRadiusType: 'inSlice' });
    layout.addToLayout({ name: 'foil5', desc: '...', geom: foil5, layoutOpts });

    const foil7 = foils.trefoil({ radius: 15, lobeRadiusType: 'halfRadius', geomProfile: profile1, cutCentre: true });
    layout.addToLayout({ name: 'foil7', desc: '...', geom: foil7, layoutOpts });

    const foil8 = foils.quatrefoil({ radius: 15, lobeRadiusType: 'mean', geomProfile: profile3, cutCentre: true });
    layout.addToLayout({ name: 'foil8', desc: '...', geom: foil8, layoutOpts });


    //-----------
    // Columns

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


    //-----------
    // Arches

    const arch1 = arches.twoPt({ arcRadius: 30, archWidth: 35, profileWidth: 5, geomProfile: profile1 });
    layout.addToLayout({ name: 'arch1', desc: '...', geom: arch1, layoutOpts });

    const arch2 = arches.twoPt({ arcRadius: 30, archWidth: 35 });
    layout.addToLayout({ name: 'arch2', desc: '...', geom: arch2, layoutOpts });


    //-----------
    // Walls

    const wall2 = walls.build({
        height: 100,
        thickness: 10,
        length: 80,
        // wallOpts: 0,
        trimOpts: ['base', 'crown'],
        crownUnits: 1,
        baseUnits: 2,
        trimUnitHeight: 4,
        trimUnitDepth: 1.25,
        trimSides: 4,
    });
    layout.addToLayout({ name: 'Wall (2)', desc: 'Base + crown trim', geom: wall2, layoutOpts });

    const wallDado1 = walls.build({
        height: 100,
        thickness: 10,
        length: 70,
        // wallOpts: 0,
        trimOpts: ['base', 'dado', 'crown'],
        dadoUnits: 1,
        trimUnitHeight: 4,
        trimUnitDepth: 1.25,
        trimSides: 4,
    });
    layout.addToLayout({ name: 'Dado Wall (1)', desc: '1 trim unit thicker', geom: wallDado1, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
