"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });

const { union } = jscad.booleans;
const { translate } = jscad.transforms;
const { sphere } = jscad.primitives;
const { geometry, maths } = swJscad.utils;
const { layout } = swjUi.ux;

const generatePoints = (numPoints, offset) => {
    const min = -20
    const max = 20
    const newPoints = []

    for (let idx = 0; idx < numPoints; idx++) {
        newPoints.push([
            maths.getRandomInt(min, max) + offset[0],
            maths.getRandomInt(min, max) + offset[1],
            maths.getRandomInt(min, max) + offset[2]
        ])
    }

    return newPoints
}

const main = () => {
    const layoutOpts = {
        layoutMargin: 25,
        noFrame: false,
        layoutSpace: 20,
    }

    const numClouds = 4;
    const pointClouds = []

    for (let index = 0; index < numClouds; index++) {
        const numPointsInCloud = maths.getRandomInt(8, 11);
        const offset = [
            0,
            0,
            0,
        ]
        pointClouds.push(generatePoints(numPointsInCloud, offset));
    }

    console.log(pointClouds)

    pointClouds.forEach((ptCloud, idx) => {
        const pointGeoms = []
        const centroid = geometry.points.centroid(ptCloud)
        pointGeoms.push(translate(centroid, sphere({ radius: 3 })))
        console.log(ptCloud)
        console.log(centroid)
        ptCloud.forEach(pt => {
            pointGeoms.push(translate(pt, sphere()))
        })
        layout.addToLayout({
            name: `point-cloud-${idx}`,
            desc: '...',
            geom: union(...pointGeoms),
            layoutOpts,
        });
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
