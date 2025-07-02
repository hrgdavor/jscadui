"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { profiles } = swJscad.details;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 20,
        layoutSpace: 8,
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

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
