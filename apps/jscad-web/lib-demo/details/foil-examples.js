"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { profiles, foils } = swJscad.details;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 18,
        layoutSpace: 5,
    }
    const profile1 = profiles.sqCornerCircNotch({ sqLength: 5 });
    const profile3 = profiles.octagonal({ sqLength: 5 });

    const foil1 = foils.trefoil({ radius: 10 });
    layout.addToLayout({ name: 'foil1', desc: '...', layoutOpts }, foil1);

    const foil2 = foils.trefoil({ radius: 10, lobeRadiusType: 'inSlice' });
    layout.addToLayout({ name: 'foil2', desc: '...', layoutOpts }, foil2);

    const foil3 = foils.trefoil({ radius: 10, lobeRadiusType: 'halfRadius' });
    layout.addToLayout({ name: 'foil3', desc: '...', layoutOpts }, foil3);

    const foil4 = foils.quatrefoil({ radius: 10 });
    layout.addToLayout({ name: 'foil4', desc: '...', layoutOpts }, foil4);

    const foil5 = foils.quatrefoil({ radius: 10, lobeRadiusType: 'inSlice' });
    layout.addToLayout({ name: 'foil5', desc: '...', layoutOpts }, foil5);

    const foil6 = foils.quatrefoil({ radius: 10, lobeRadiusType: 'halfRadius' });
    layout.addToLayout({ name: 'foil6', desc: '...', layoutOpts }, foil6);

    const foil7 = foils.trefoil({ radius: 15, lobeRadiusType: 'halfRadius', cutCentre: true }, profile1);
    layout.addToLayout({ name: 'foil7', desc: '...', layoutOpts }, foil7);

    const foil8 = foils.quatrefoil({ radius: 15, lobeRadiusType: 'mean', cutCentre: true }, profile3);
    layout.addToLayout({ name: 'foil8', desc: '...', layoutOpts }, foil8);

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
