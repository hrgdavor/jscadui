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
        layoutMargin: 25,
        noFrame: false,
        layoutSpace: 20,
    }

    console.log(paper)

    Object.entries(paper.ansi).forEach(([key, val], idx) => {
        layout.addToLayout({
            name: `ansi-${key}`,
            desc: '..',
            layoutOpts,
        }, val);
    })

    Object.entries(paper.imperial).forEach(([key, val], idx) => {
        layout.addToLayout({
            name: `imperial-${key}`,
            desc: '..',
            layoutOpts,
        }, val);
    })

    Object.entries(paper.cards).forEach(([key, val], idx) => {
        layout.addToLayout({
            name: `cards-${key}`,
            desc: '..',
            layoutOpts,
        }, val);
    })

    const layoutContent = layout.gridLayout({ layoutOpts });
    return layoutContent;
}

module.exports = { main }
