"use strict"
const jscad = require('@jscad/modeling')
const { roundedCylinder, cylinder } = jscad.primitives
const { subtract } = jscad.booleans
const { align } = jscad.transforms
const { measureBoundingBox } = jscad.measurements
const { colorize } = jscad.colors

const swJscad = require('sw-jscad').init({ lib: jscad });
console.log(swJscad);
const {
    transform,
} = swJscad

const CANDLE_SPACE_HT = 16;
const CANDLE_SPACE_RAD = 22;

const TYP_THICKNESS = 5;
const TYP_RD_RAD = 2.5;

const BOTTOM_SPACE_HT = TYP_THICKNESS * 1.5;
const BOTTOM_SPACE_RAD = CANDLE_SPACE_RAD;

const CORE_HEIGHT = CANDLE_SPACE_HT + TYP_THICKNESS + BOTTOM_SPACE_HT;
const CORE_RAD = CANDLE_SPACE_RAD + TYP_THICKNESS;

const candleSpace = () => {
    const cSpaceSpecs = {
        radius: CANDLE_SPACE_RAD,
        height: CANDLE_SPACE_HT,
        segments: 64,
    }
    const cSpaceInit = roundedCylinder({ ...cSpaceSpecs, height: cSpaceSpecs.height * 2, roundRadius: TYP_RD_RAD });
    const candleSpace = transform.bisect3d({ geom: cSpaceInit, axis: '-z' });

    return colorize(
        [0.7, 0.7, 0.1, 0.5],
        align({ modes: ['center', 'center', 'center'] }, candleSpace)
    )
}

const bottomSpace = () => {
    const bSpaceSpecs = {
        radius: BOTTOM_SPACE_RAD,
        height: BOTTOM_SPACE_HT,
        segments: 64,
    };
    const cSpaceInit = roundedCylinder({ ...bSpaceSpecs, height: bSpaceSpecs.height * 2, roundRadius: TYP_RD_RAD });
    const candleSpace = transform.bisect3d({ geom: cSpaceInit, axis: 'z' });

    return colorize(
        [0.7, 0.7, 0.1, 0.5],
        align({ modes: ['center', 'center', 'center'] }, candleSpace)
    )
}

const candleHolderCore = () => {
    const baseShape = cylinder({ radius: CORE_RAD, height: CORE_HEIGHT });
    const baseBbox = measureBoundingBox(baseShape);

    const candleCavity = align({ modes: ['none', 'none', 'max'], relativeTo: baseBbox[1] }, candleSpace());
    const bottomCavity = align({ modes: ['none', 'none', 'min'], relativeTo: baseBbox[0] }, bottomSpace());

    let finalAssembly = subtract(baseShape, candleCavity);
    finalAssembly = subtract(finalAssembly, bottomCavity);

    return finalAssembly;
}

module.exports = { candleHolderCore }
