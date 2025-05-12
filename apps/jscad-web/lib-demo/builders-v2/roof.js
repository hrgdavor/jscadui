
const roofBuilder = ({ lib, swLib }) => {
    const { union, subtract } = lib.booleans;
    const { triangle, cuboid } = lib.primitives;
    const { rotate, align, translate } = lib.transforms;
    const { extrudeLinear } = lib.extrusions;
    const { colorize } = lib.colors;
    const { measureDimensions } = lib.measurements;

    const { moulds } = swLib;

    const bottomTrim = ({ axisLength, rafterLength, trimProfile }) => {
        const profileDims = measureDimensions(trimProfile);
        return moulds.cuboidEdge({ size: [rafterLength, axisLength, profileDims[1]], geomProfile: trimProfile });
    }

    const getBasicSpecs = ({ roofSpanSize, roofPitch }) => {
        const roofHeightX = Math.tan(roofPitch) * roofSpanSize[1];
        const roofHypotX = Math.hypot(roofSpanSize[1], roofHeightX);

        const roofHeightY = Math.tan(roofPitch) * roofSpanSize[0];
        const roofHypotY = Math.hypot(roofSpanSize[0], roofHeightY);

        return {
            x: {
                height: roofHeightX,
                hypot: roofHypotX,
            },
            y: {
                height: roofHeightY,
                hypot: roofHypotY,
            }
        }
    }

    /**
     * Builds a gable roof
     * @param {Object} opts 
     * @param {number[]} opts.roofSpanSize - [x,y] size of area to be spanned
     * @param {number[]} opts.roofOverhangSize - [x,y] size for overhangs
     * @param {number} opts.roofPitch - Roof pitch angle, expressed in radians
     * @param {string[]} opts.roofOpts - Options like 'solid', 'noWall'
     * @param {number} opts.wallThickness - Wall thickness
     * @returns gable roof
     */
    const buildGableRoof = ({
        roofSpanSize,
        roofOverhangSize,
        roofPitch,
        roofOpts = ['solid'],
        wallThickness,
    }) => {
        return null;
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
    }) => {
        console.log(`buildShedRoof() roofSpanSize = ${JSON.stringify(roofSpanSize)}`);
        const basicSpecs = getBasicSpecs({ roofPitch, roofSpanSize });
        const mainAxisIdx = roofAxis === 'x' ? 0 : 1;
        const otherAxisIdx = mainAxisIdx === 0 ? 1 : 0;
        console.log(`    roofAxis = ${JSON.stringify(roofAxis)}, roofOpts = ${JSON.stringify(roofOpts)}`);
        console.log(`    basicSpecs = ${JSON.stringify(basicSpecs)}`);
        console.log(`    mainAxisIdx = ${JSON.stringify(mainAxisIdx)}, otherAxisIdx = ${JSON.stringify(otherAxisIdx)}`);
        console.log(swLib.colours);

        const roofSpan = roofSpanSize[otherAxisIdx];
        const axisSpan = roofSpanSize[mainAxisIdx];
        const roofHeight = basicSpecs[roofAxis].height;
        const roofHypot = basicSpecs[roofAxis].hypot;

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

        const sheathingSize = [2 * roofOverhangSize[mainAxisIdx] + bTrimRafterSpecs[1], 2 * roofOverhangSize[otherAxisIdx] + bTrimRafterSpecs[0], trimUnitSize[1]];
        const sheathing = translate([0, 0, trimUnitSize[1]], cuboid({ size: sheathingSize }));
        const roofAssembly = union(bTrimRafter, sheathing);

        const adjRoofAssembly = translate(
            [-trimUnitSize[0] - roofOverhangSize[mainAxisIdx], -trimUnitSize[0] - roofOverhangSize[otherAxisIdx], 0],
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
