
const roofBuilder = ({ lib, swLib }) => {
    const { union, subtract } = lib.booleans;
    const { triangle, cuboid } = lib.primitives;
    const { rotate, align, translate, mirror } = lib.transforms;
    const { extrudeLinear } = lib.extrusions;
    const { colorize } = lib.colors;
    const { measureDimensions } = lib.measurements;

    const { moulds } = swLib;

    const bottomTrim = ({ axisLength, rafterLength, trimProfile }) => {
        const profileDims = measureDimensions(trimProfile);
        return moulds.cuboidEdge({ size: [rafterLength, axisLength, profileDims[1]], geomProfile: trimProfile });
    }

    const getBasicRoofSpecs = ({ roofSpanSize, roofPitch }) => {
        const shedRoofHeightX = Math.tan(roofPitch) * roofSpanSize[1];
        const shedRoofHypotX = Math.hypot(roofSpanSize[1], shedRoofHeightX);

        const gableRoofHeightX = Math.tan(roofPitch) * roofSpanSize[1] / 2;
        const gableRoofHypotX = Math.hypot(roofSpanSize[1], gableRoofHeightX);

        const shedRoofHeightY = Math.tan(roofPitch) * roofSpanSize[0];
        const shedRoofHypotY = Math.hypot(roofSpanSize[0], shedRoofHeightY);

        const gableRoofHeightY = Math.tan(roofPitch) * roofSpanSize[0] / 2;
        const gableRoofHypotY = Math.hypot(roofSpanSize[0], gableRoofHeightY);

        return {
            x: {
                shedRoofHeight: shedRoofHeightX,
                shedRoofHypot: shedRoofHypotX,
                gableRoofHeight: gableRoofHeightX,
                gableRoofHypot: gableRoofHypotX,
            },
            y: {
                shedRoofHeight: shedRoofHeightY,
                shedRoofHypot: shedRoofHypotY,
                gableRoofHeight: gableRoofHeightY,
                gableRoofHypot: gableRoofHypotY,
            }
        }
    }

    /**
     * Builds a gable roof
     * @param {Object} opts 
     * @param {number[]} opts.roofSpanSize - [x,y] size of area to be spanned
     * @param {number[]} opts.roofOverhangSize - [x,y] size for overhangs
     * @param {number} opts.roofPitch - Roof pitch angle, expressed in radians
     * @param {string} opts.roofAxis - Main axis of roof
     * @param {string[]} opts.roofOpts - Options like 'solid', 'noWall'
     * @param {number} opts.wallThickness - Wall thickness
     * @returns gable roof
     */
    const buildGableRoof = ({
        roofSpanSize,
        roofOverhangSize = [1, 1],
        roofPitch,
        roofAxis = 'x',
        roofOpts = ['solid'],
        wallThickness,
        trimFamily = 'Aranea',
        trimUnitSize,
    }) => {
        console.log(`buildGableRoof() roofSpanSize = ${JSON.stringify(roofSpanSize)}`);
        const basicRoofSpecs = getBasicRoofSpecs({ roofPitch, roofSpanSize });
        const otherAxis = roofAxis === 'x' ? 'y' : 'x';
        const mainAxisIdx = roofAxis === 'x' ? 0 : 1;
        const otherAxisIdx = mainAxisIdx === 0 ? 1 : 0;
        let roofSpanHalfSize = [roofSpanSize[0], roofSpanSize[1] / 2];
        if (roofAxis === 'y') {
            roofSpanHalfSize = [roofSpanSize[0] / 2, roofSpanSize[1]];
        }
        console.log(`    roofAxis = ${JSON.stringify(roofAxis)}, roofOpts = ${JSON.stringify(roofOpts)}`);
        console.log(`    basicRoofSpecs = ${JSON.stringify(basicRoofSpecs)}`);
        console.log(`    roofSpanSize = ${JSON.stringify(roofSpanSize)}, roofSpanHalfSize = ${JSON.stringify(roofSpanHalfSize)}`);

        const halfOffset = roofAxis === 'x' ?
            [-roofSpanHalfSize[0] / 2, -roofSpanHalfSize[1], basicRoofSpecs[roofAxis].gableRoofHeight / -2] :
            [roofSpanHalfSize[0], roofSpanHalfSize[1] / -2, basicRoofSpecs[roofAxis].gableRoofHeight / -2];
        const halfRoof = translate(halfOffset, buildShedRoof({
            roofSpanSize: roofSpanHalfSize,
            roofOverhangSize,
            roofPitch,
            roofAxis,
            roofOpts,
            wallThickness,
            trimFamily,
            trimUnitSize,
        }));
        const mirrorNormal = roofAxis === 'x' ? [0, 1, 0] : [1, 0, 0];
        let cutBox = [
            roofAxis === 'x' ? roofSpanHalfSize[0] + 50 : roofSpanHalfSize[0] + 50,
            roofAxis === 'x' ? roofSpanHalfSize[1] + 50 : roofSpanHalfSize[1] + 50,
            basicRoofSpecs[roofAxis].gableRoofHeight + 50
        ];
        let adjCutBox = align({ modes: ['center', 'min', 'center'] }, cuboid({ size: cutBox }));
        if (roofAxis === 'y') {
            adjCutBox = align({ modes: ['max', 'center', 'center'] }, cuboid({ size: cutBox }));
        }
        const cutRoof = subtract(halfRoof, adjCutBox)
        const mirroredRoof = mirror({ normal: mirrorNormal }, cutRoof);
        const doubleRoof = union(cutRoof, mirroredRoof);

        return doubleRoof;
    }

    /**
     * Builds a hip roof
     * @param {Object} opts 
     * @param {number[]} opts.roofSpanSize - [x,y] size of area to be spanned
     * @param {number} opts.roofPitch - Roof pitch angle, expressed in radians
     * @param {string[]} opts.roofOpts - Options like 'solid', 'noWall'
     * @param {number} opts.wallThickness - Wall thickness
     * @returns hip roof
     */
    const buildHipRoof = ({
        roofSpanSize,
        roofPitch,
        roofOpts = ['solid'],
        wallThickness,
    }) => {
        return null;
    }

    /**
     * Builds a shed roof
     * @param {Object} opts 
     * @param {number[]} opts.roofSpanSize - [x,y] size of area to be spanned
     * @param {number[]} opts.roofOverhangSize - [x,y] size for overhangs
     * @param {number} opts.roofPitch - Roof pitch angle, expressed in radians
     * @param {string} opts.roofAxis - Main axis of roof
     * @param {string[]} opts.roofOpts - Options like 'solid', 'noWall'
     * @param {number} opts.wallThickness - Wall thickness
     * @returns Shed roof
     */
    const buildShedRoof = ({
        roofSpanSize,
        roofOverhangSize = [1, 1],
        roofPitch,
        roofAxis = 'x',
        roofOpts = ['solid'],
        wallThickness,
        trimFamily = 'Aranea',
        trimUnitSize,
        shingleLayerThickness,
        shingleSheathingThickness,
    }) => {
        console.log(`buildShedRoof() roofSpanSize = ${JSON.stringify(roofSpanSize)}`);
        const basicRoofSpecs = getBasicRoofSpecs({ roofPitch, roofSpanSize });
        const mainAxisIdx = roofAxis === 'x' ? 0 : 1;
        const otherAxisIdx = mainAxisIdx === 0 ? 1 : 0;
        console.log(`    roofAxis = ${JSON.stringify(roofAxis)}, roofOpts = ${JSON.stringify(roofOpts)}`);
        console.log(`    basicRoofSpecs = ${JSON.stringify(basicRoofSpecs)}`);
        console.log(`    mainAxisIdx = ${JSON.stringify(mainAxisIdx)}, otherAxisIdx = ${JSON.stringify(otherAxisIdx)}`);

        const roofSpan = roofSpanSize[otherAxisIdx];
        const axisSpan = roofSpanSize[mainAxisIdx];
        const roofHeight = basicRoofSpecs[roofAxis].shedRoofHeight;
        const roofHypot = basicRoofSpecs[roofAxis].shedRoofHypot;

        const roomSize = [roofSpanSize[mainAxisIdx] - (2 * wallThickness), roofSpanSize[otherAxisIdx] - (2 * wallThickness), roofHeight];

        const baseTriangle = triangle({ type: 'SAS', values: [roofSpan, Math.PI / 2, roofHeight] });
        const basePrism = colorize(swLib.colors.translucentYellow, align({ modes: ['center', 'center', 'min'] }, rotate(
            [Math.PI / 2, 0, Math.PI / 2],
            extrudeLinear({ height: roofSpanSize[mainAxisIdx] }, baseTriangle)
        )));
        const roomCutaway = align({ modes: ['center', 'center', 'min'] }, cuboid({ size: roomSize }));
        const cutBasePrism = align({ modes: ['min', 'min', 'min'] }, subtract(basePrism, roomCutaway));

        // Roof Assembly

        const trFamily = swLib[`trimFamily${trimFamily}`].build({ unitHeight: trimUnitSize[1], unitDepth: trimUnitSize[0] });
        const bottomTrimProfile = trFamily.crown.extraSmall;

        const bTrimRafterSpecs = [2 * trimUnitSize[0] + roofHypot, 2 * trimUnitSize[0] + axisSpan];
        const bTrimRafter = align({ modes: ['center', 'center', 'min'] }, bottomTrim({
            axisLength: bTrimRafterSpecs[0],
            rafterLength: bTrimRafterSpecs[1],
            trimProfile: bottomTrimProfile,
        }));
        const bTrimDims = measureDimensions(bottomTrimProfile);

        const sheathingThickness = bTrimDims[1] * 0.6667;
        const sheathingSize = [2 * roofOverhangSize[mainAxisIdx] + bTrimRafterSpecs[1], 2 * roofOverhangSize[otherAxisIdx] + bTrimRafterSpecs[0], sheathingThickness];
        const sheathing = translate([0, 0, bTrimDims[1] + sheathingSize[2] / 2], cuboid({ size: sheathingSize }));

        const shingThickness = shingleLayerThickness || bTrimDims[1] * 0.6667
        const shinglesSize = [3 * trimUnitSize[0] + sheathingSize[0], 3 * trimUnitSize[0] + sheathingSize[1], shingThickness];
        const shingles = translate([0, 0, bTrimDims[1] + sheathingSize[2] + shinglesSize[2] / 2], cuboid({ size: shinglesSize }));

        const roofAssembly = union(bTrimRafter, sheathing, shingles);

        const adjRoofAssembly = translate(
            [
                (shinglesSize[0] - axisSpan) / -2,
                (shinglesSize[1] - roofHypot) / -2,
                0,
                0,
            ],
            align({ modes: ['min', 'min', 'min'] }, roofAssembly)
        );
        const rotatedRoofAssembly = rotate([roofPitch, 0, 0], adjRoofAssembly);

        const axisAdj = roofAxis === 'y' ? Math.PI / 2 : 0;
        let finalShape = rotate([0, 0, axisAdj], union(cutBasePrism, rotatedRoofAssembly))

        return finalShape;
    }

    return {
        buildGableRoof,
        buildHipRoof,
        buildShedRoof,
    };
}

module.exports = { init: roofBuilder }
