"use strict"
const jscad = require('@jscad/modeling');

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });
const swjBuilders = require('sw-jscad-builders').init({ lib: jscad, swLib: swJscad, swFamilies: swjFamilies });

const { union } = jscad.booleans
const { cuboid, rectangle, sphere, circle } = jscad.primitives

const { arches } = swjBuilders;
const { profiles } = swJscad.models;
const { geometry } = swJscad.core;
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
        box1CtrlPts.e1,
        box1CtrlPts.e2,
        box1CtrlPts.e3,
        box1CtrlPts.e4,
        box1CtrlPts.e5,
        box1CtrlPts.e6,
        box1CtrlPts.e7,
        box1CtrlPts.e8,
        box1CtrlPts.e9,
        box1CtrlPts.e10,
        box1CtrlPts.e11,
        box1CtrlPts.e12,
        box1CtrlPts.f1,
        box1CtrlPts.f2,
        box1CtrlPts.f3,
        box1CtrlPts.f4,
        box1CtrlPts.f5,
        box1CtrlPts.f6,
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
        box2CtrlPts.e1,
        box2CtrlPts.e2,
        box2CtrlPts.e3,
        box2CtrlPts.e4,
        box2CtrlPts.e5,
        box2CtrlPts.e6,
        box2CtrlPts.e7,
        box2CtrlPts.e8,
        box2CtrlPts.e9,
        box2CtrlPts.e10,
        box2CtrlPts.e11,
        box2CtrlPts.e12,
        box2CtrlPts.f1,
        box2CtrlPts.f2,
        box2CtrlPts.f3,
        box2CtrlPts.f4,
        box2CtrlPts.f5,
        box2CtrlPts.f6,
    ]
    const box2FrameParts = box2FramePts.map(pt => {
        return sphere({ center: pt });
    })

    const box3 = rectangle({ size: [30, 20] })
    const box3CtrlPts = geometry.rectangle.getRectangleCtrlPoints(box3)
    console.log(box3CtrlPts)
    const box3FramePts = [
        box3CtrlPts.c1,
        box3CtrlPts.c2,
        box3CtrlPts.c3,
        box3CtrlPts.c4,
        box3CtrlPts.i0,
        box3CtrlPts.i1,
        box3CtrlPts.i2,
        box3CtrlPts.i3,
        box3CtrlPts.i4,
        box3CtrlPts.e1,
        box3CtrlPts.e2,
        box3CtrlPts.e3,
        box3CtrlPts.e4,
    ]
    const box3FrameParts = box3FramePts.map(pt => {
        return circle({ center: pt });
    })

    layout.addToLayout({ name: 'box1', desc: '...', layoutOpts }, box1);
    layout.addToLayout({ name: 'box2', desc: '...', layoutOpts }, box2);
    layout.addToLayout({ name: 'box3', desc: '...', layoutOpts }, box3);
    layout.addToLayout({ name: 'box1-parts', desc: '...', layoutOpts }, union(box1FrameParts));
    layout.addToLayout({ name: 'box2-parts', desc: '...', layoutOpts }, union(box2FrameParts));
    layout.addToLayout({ name: 'box3-parts', desc: '...', layoutOpts }, union(box3FrameParts));

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
