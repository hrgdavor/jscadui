"use strict"
const jscad = require('@jscad/modeling')
const { translate } = jscad.transforms

const swJscad = require('sw-jscad').init({ lib: jscad });
console.log(swJscad);
const {
    layout,
    profiles,
    foils,
} = swJscad

const main = () => {
    const layoutOpts = {
        layoutMargin: 10,
        noFrame: true,
    }
    const profile1 = profiles.sqCornerCircNotch({ sqLength: 5 });
    layout.addToLayout({ name: 'profile1', desc: '...', geom: profile1, layoutOpts });

    const profile3 = profiles.octagonal({ sqLength: 5 });
    layout.addToLayout({ name: 'profile3', desc: '...', geom: profile3, layoutOpts });

    const foil1 = foils.trefoil({ radius: 10 });
    layout.addToLayout({ name: 'foil1', desc: '...', geom: foil1, layoutOpts });
    
    const foil2 = foils.trefoil({ radius: 10, lobeRadiusType: 'inSlice' });
    layout.addToLayout({ name: 'foil2', desc: '...', geom: foil2, layoutOpts });
    
    const foil3 = foils.trefoil({ radius: 10, lobeRadiusType: 'halfRadius' });
    layout.addToLayout({ name: 'foil3', desc: '...', geom: foil3, layoutOpts });
    
    const foil4 = foils.quatrefoil({ radius: 10 });
    layout.addToLayout({ name: 'foil4', desc: '...', geom: foil4, layoutOpts });
    
    const foil5 = foils.quatrefoil({ radius: 10, lobeRadiusType: 'inSlice' });
    layout.addToLayout({ name: 'foil5', desc: '...', geom: foil5, layoutOpts });
    
    const foil6 = foils.quatrefoil({ radius: 10, lobeRadiusType: 'halfRadius' });
    layout.addToLayout({ name: 'foil6', desc: '...', geom: foil6, layoutOpts });

    const foil7 = foils.trefoil({ radius: 15, lobeRadiusType: 'halfRadius', geomProfile: profile1, cutCentre: true });
    layout.addToLayout({ name: 'foil7', desc: '...', geom: foil7, layoutOpts });
    
    const foil8 = foils.quatrefoil({ radius: 15, lobeRadiusType: 'mean', geomProfile: profile3, cutCentre: true });
    layout.addToLayout({ name: 'foil8', desc: '...', geom: foil8, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
