"use strict"
const jscad = require('@jscad/modeling')
const { translate } = jscad.transforms

const swJscad = require('sw-jscad').init({ lib: jscad });
console.log(swJscad);
const {
    layout,
    arches,
    profiles,
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

    const arch1 = arches.twoPt({ arcRadius: 30, archWidth: 35, geomProfile: profile1 });
    layout.addToLayout({ name: 'arch1', desc: '...', geom: arch1, layoutOpts });

    const arch2 = arches.onePt({ arcRadius: 60, geomProfile: profile1 });
    layout.addToLayout({ name: 'arch2', desc: '...', geom: arch2, layoutOpts });

    const arch3 = arches.twoPt({ arcRadius: 30, archWidth: 35 });
    layout.addToLayout({ name: 'arch3', desc: '...', geom: arch3, layoutOpts });

    const arch4 = arches.onePt({ arcRadius: 60 });
    layout.addToLayout({ name: 'arch4', desc: '...', geom: arch4, layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
