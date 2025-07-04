"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });
const swjBuilders = require('sw-jscad-builders').init({ lib: jscad, swLib: swJscad, swFamilies: swjFamilies });

const {
    arches,
    columns,
    walls,
} = swjBuilders

const {
    foils,
    moulds,
    profiles,
} = swJscad.details

const {
    aranea,
} = swjFamilies.trim

const {
    layout,
} = swjUi.ux

const main = () => {
    const layoutOpts = {
        layoutMargin: 18,
        layoutSpace: 5,
    }


    //-----------
    // Profiles

    const profile1 = profiles.sqCornerCircNotch({ sqLength: 5 });
    const profile3 = profiles.octagonal({ sqLength: 5 });

    const tFamilyBasic = aranea.buildTrimFamily({ unitHeight: 20, unitDepth: 10 });
    const dadoTrim = [
        tFamilyBasic.dado.small,
        tFamilyBasic.dado.medium,
        tFamilyBasic.dado.large,
        tFamilyBasic.dado.mediumOrn1,
    ];
    dadoTrim.forEach((trim, idx) => {
        layout.addToLayout({ name: `dado-${idx}`, desc: '...', layoutOpts }, trim);
    })


    //-----------
    // Mouldings

    const mould3 = moulds.circularMoulding({ radius: 20, height: 5 }, profile1);
    layout.addToLayout({ name: 'mould3', desc: '...', layoutOpts }, mould3);


    //-----------
    // Foils

    const foil1 = foils.trefoil({ radius: 10 });
    layout.addToLayout({ name: 'foil1', desc: '...', layoutOpts }, foil1);

    const foil5 = foils.quatrefoil({ radius: 10, lobeRadiusType: 'inSlice' });
    layout.addToLayout({ name: 'foil5', desc: '...', layoutOpts }, foil5);

    const foil7 = foils.trefoil({ radius: 15, lobeRadiusType: 'halfRadius', cutCentre: true }, profile1);
    layout.addToLayout({ name: 'foil7', desc: '...', layoutOpts }, foil7);

    const foil8 = foils.quatrefoil({ radius: 15, lobeRadiusType: 'mean', cutCentre: true }, profile3);
    layout.addToLayout({ name: 'foil8', desc: '...', layoutOpts }, foil8);


    //-----------
    // Columns

    const col2 = columns.threePtColumn({
        base: ['roundCylinder', 2, 3.5],
        shaft: ['extrude', null, profile1],
        capital: ['roundCylinder', 2, 3.5],
        height: 20,
    });
    layout.addToLayout({ name: 'col2', desc: '...', layoutOpts }, col2);


    //-----------
    // Arches

    const arch1 = arches.twoPtArch({ arcRadius: 30, archWidth: 35, profileWidth: 5 }, profile1);
    layout.addToLayout({ name: 'arch1', desc: '...', layoutOpts }, arch1);

    const arch2 = arches.twoPtArch({ arcRadius: 30, archWidth: 35 });
    layout.addToLayout({ name: 'arch2', desc: '...', layoutOpts }, arch2);


    //-----------
    // Walls

    const wall2 = walls.buildWall({
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
    layout.addToLayout({ name: 'Wall (2)', desc: '...', layoutOpts }, wall2);

    const wallDado1 = walls.buildWall({
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
    layout.addToLayout({ name: 'Dado Wall (1)', desc: '...', layoutOpts }, wallDado1) 

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
