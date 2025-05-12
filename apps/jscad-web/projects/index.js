"use strict"
const jscad = require('@jscad/modeling')
const { translate } = jscad.transforms

const SwJscad = require('sw-jscad');
const swJscad = SwJscad.init({ lib: jscad });

const {
    layoutUtils,
    archBuilder,
    columnBuilder,
    wallBuilder,
    foilBuilder,
    mouldBuilder,
    profileBuilder,
    basicTrimFamily,
} = swJscad

const main = () => {
    const layoutOpts = {
        layoutMargin: 5,
        noFrame: true,
    }


    //-----------
    // Profiles

    const profile1 = profileBuilder.sqCornerCircNotch({ sqLength: 5 });
    layoutUtils.addToLayout({ name: 'profile1', desc: '...', geom: profile1, layoutOpts });

    const profile3 = profileBuilder.octagonal({ sqLength: 5 });
    layoutUtils.addToLayout({ name: 'profile3', desc: '...', geom: profile3, layoutOpts });

    const tFamilyBasic = basicTrimFamily.build({ unitHeight: 20, unitDepth: 10 });
    const dadoTrim = [
        tFamilyBasic.dado.small,
        tFamilyBasic.dado.medium,
        tFamilyBasic.dado.large,
        tFamilyBasic.dado.smallOrn1,
        tFamilyBasic.dado.mediumOrn1,
        tFamilyBasic.dado.largeOrn1,
    ];
    dadoTrim.forEach((trim, idx) => {
        layoutUtils.addToLayout({ name: `dado-${idx}`, desc: '...', geom: trim, layoutOpts });
    })


    //-----------
    // Mouldings

    const mould2 = mouldBuilder.cuboidEdge({ size: [10, 40, 5], geomProfile: profile1 });
    layoutUtils.addToLayout({ name: 'mould2', desc: '...', geom: mould2, layoutOpts });

    const mould3 = mouldBuilder.circularEdge({ radius: 20, height: 5, geomProfile: profile1 });
    layoutUtils.addToLayout({ name: 'mould3', desc: '...', geom: mould3, layoutOpts });

    const mould4 = mouldBuilder.circularEdge({ segments: 8, radius: 20, height: 5, geomProfile: profile1 });
    layoutUtils.addToLayout({ name: 'mould4', desc: '...', geom: mould4, layoutOpts });


    //-----------
    // Foils

    const foil1 = foilBuilder.trefoil({ radius: 10 });
    layoutUtils.addToLayout({ name: 'foil1', desc: '...', geom: foil1, layoutOpts });

    const foil5 = foilBuilder.quatrefoil({ radius: 10, lobeRadiusType: 'inSlice' });
    layoutUtils.addToLayout({ name: 'foil5', desc: '...', geom: foil5, layoutOpts });

    const foil7 = foilBuilder.trefoil({ radius: 15, lobeRadiusType: 'halfRadius', geomProfile: profile1, cutCentre: true });
    layoutUtils.addToLayout({ name: 'foil7', desc: '...', geom: foil7, layoutOpts });

    const foil8 = foilBuilder.quatrefoil({ radius: 15, lobeRadiusType: 'mean', geomProfile: profile3, cutCentre: true });
    layoutUtils.addToLayout({ name: 'foil8', desc: '...', geom: foil8, layoutOpts });


    //-----------
    // Columns

    const col1 = columnBuilder.threePt({
        base: ['extrude', 8, null, profile1],
        shaft: ['cuboid', 2],
        capital: ['extrude', 6, null, profile3],
        height: 40,
    })
    layoutUtils.addToLayout({ name: 'col1', desc: '...', geom: col1, layoutOpts });

    const col2 = columnBuilder.threePt({
        base: ['roundCylinder', 2, 3.5],
        shaft: ['extrude', null, profile1],
        capital: ['roundCylinder', 2, 3.5],
        height: 20,
    });
    layoutUtils.addToLayout({ name: 'col2', desc: '...', geom: col2, layoutOpts });


    //-----------
    // Arches

    const arch1 = archBuilder.twoPt({ arcRadius: 30, archWidth: 35, profileWidth: 5, geomProfile: profile1 });
    layoutUtils.addToLayout({ name: 'arch1', desc: '...', geom: arch1, layoutOpts });

    const arch2 = archBuilder.twoPt({ arcRadius: 30, archWidth: 35 });
    layoutUtils.addToLayout({ name: 'arch2', desc: '...', geom: arch2, layoutOpts });


    //-----------
    // Walls

    const wall2 = wallBuilder.build({
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
    layoutUtils.addToLayout({ name: 'Wall (2)', desc: 'Base + crown trim', geom: wall2, layoutOpts });

    const wallDado1 = wallBuilder.build({
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
    layoutUtils.addToLayout({ name: 'Dado Wall (1)', desc: '1 trim unit thicker', geom: wallDado1, layoutOpts });

    const layoutContent = layoutUtils.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
