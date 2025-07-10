"use strict"
const jscad = require('@jscad/modeling')

const swJscad = require('sw-jscad').init({ lib: jscad });
const swjUi = require('sw-jscad-ui').init({ lib: jscad, swLib: swJscad });
const swjFamilies = require('sw-jscad-families').init({ lib: jscad, swLib: swJscad });

const { union } = jscad.booleans;
const { translate } = jscad.transforms;
const { sphere } = jscad.primitives;
const { geometry } = swJscad.utils;
const { maths } = swJscad.core;
const { layout } = swjUi.ux;
const { paper } = swjFamilies;

const main = () => {
    const layoutOpts = {
        layoutMargin: 15,
        noFrame: false,
        layoutSpace: 5,
    }

    console.log(paper)

    Object.entries(paper.metric).slice(-3).forEach(([key, val], idx) => {
        layout.addToLayout({
            name: `met-${key}`,
            desc: '..',
            layoutOpts,
        }, val);
    })

    Object.entries(paper.photos).slice(0, 3).forEach(([key, val], idx) => {
        layout.addToLayout({
            name: `ph-${key}`,
            desc: '..',
            layoutOpts,
        }, val);
    })

    Object.entries(paper.bookmarks).slice(0, 3).forEach(([key, val], idx) => {
        layout.addToLayout({
            name: `bm-${key}`,
            desc: '..',
            layoutOpts,
        }, val);
    })

    Object.entries(paper.cards).slice(0, 3).forEach(([key, val], idx) => {
        layout.addToLayout({
            name: `cd-${key}`,
            desc: '..',
            layoutOpts,
        }, val);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
