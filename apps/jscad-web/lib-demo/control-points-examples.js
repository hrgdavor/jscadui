"use strict"
const jscad = require('@jscad/modeling');

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });
const swjBuilders = require('sw-jscad-builders').init({ lib: jscad, swLib: swJscad, swFamilies: swjFamilies });

const { union } = jscad.booleans
const { cuboid, sphere } = jscad.primitives

const { arches } = swjBuilders;
const { profiles } = swJscad.details;
const { geometry } = swJscad.utils;
const { layout } = swjUi.ux;

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        noFrame: false,
        layoutSpace: 0,
    }

    const box1 = cuboid({ size: [30, 40, 20] })
    const box1CtrlPts = geometry.cuboid.getCuboidCtrlPoints(box1)
    console.log(box1CtrlPts)
    const box1FramePts = [
        box1CtrlPts.c1,
        box1CtrlPts.c2,
        box1CtrlPts.c3,
        box1CtrlPts.c4,
        box1CtrlPts.c5,
        box1CtrlPts.c6,
        box1CtrlPts.c7,
        box1CtrlPts.c8,
        box1CtrlPts.i0,
        box1CtrlPts.i1,
        box1CtrlPts.i2,
        box1CtrlPts.i3,
        box1CtrlPts.i4,
        box1CtrlPts.i5,
        box1CtrlPts.i6,
        box1CtrlPts.i7,
        box1CtrlPts.i8,
    ]
    const box1FrameParts = box1FramePts.map(pt => {
        return sphere({ center: pt });
    })

    const box2 = cuboid({ size: [60, 40, 30] })
    const box2CtrlPts = geometry.cuboid.getCuboidCtrlPoints(box2)
    console.log(box2CtrlPts)
    const box2FramePts = [
        box2CtrlPts.c1,
        box2CtrlPts.c2,
        box2CtrlPts.c3,
        box2CtrlPts.c4,
        box2CtrlPts.c5,
        box2CtrlPts.c6,
        box2CtrlPts.c7,
        box2CtrlPts.c8,
        box2CtrlPts.i0,
        box2CtrlPts.i1,
        box2CtrlPts.i2,
        box2CtrlPts.i3,
        box2CtrlPts.i4,
        box2CtrlPts.i5,
        box2CtrlPts.i6,
        box2CtrlPts.i7,
        box2CtrlPts.i8,
    ]
    const box2FrameParts = box2FramePts.map(pt => {
        return sphere({ center: pt });
    })

    layout.addToLayout({ name: 'box1', desc: '...', geom: box1, layoutOpts });
    layout.addToLayout({ name: 'box2', desc: '...', geom: box2, layoutOpts });
    layout.addToLayout({ name: 'box1-parts', desc: '...', geom: union(box1FrameParts), layoutOpts });
    layout.addToLayout({ name: 'box2-parts', desc: '...', geom: union(box2FrameParts), layoutOpts });

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
