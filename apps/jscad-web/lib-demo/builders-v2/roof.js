
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
        const roofHeightX = Math.tan(roofPitch) * roofSpanSize[0];
        const roofHypotX = Math.hypot(roofSpanSize[0], roofHeightX);

        const roofHeightY = Math.tan(roofPitch) * roofSpanSize[1];
        const roofHypotY = Math.hypot(roofSpanSize[1], roofHeightY);

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
        roofOverhangSize,
        roofPitch,
        roofAxis = 'x',
        roofOpts = ['solid'],
        wallThickness,
        trimFamily = 'Aranea',
        trimUnitSize,
    }) => {
        console.log(`buildShedRoof() roofSpanSize = ${JSON.stringify(roofSpanSize)}`);
        const basicSpecs = getBasicSpecs({ roofPitch, roofSpanSize })
        const otherAxis = roofAxis === 'x' ? 'y' : 'x';
        const mainAxisIdx = roofAxis === 'x' ? 0 : 1;
        const otherAxisIdx = mainAxisIdx === 0 ? 1 : 0;
        console.log(`    roofOpts = ${JSON.stringify(roofOpts)}`);
        console.log(`    basicSpecs = ${JSON.stringify(basicSpecs)}`);
        console.log(`    mainAxisIdx = ${JSON.stringify(mainAxisIdx)}, otherAxisIdx = ${JSON.stringify(otherAxisIdx)}`);
        console.log(swLib.colours);

        const roofSpan = roofSpanSize[mainAxisIdx];
        const roofHeight = basicSpecs[roofAxis].height;
        const roofHypot = basicSpecs[roofAxis].hypot;
        const roomSize = [roofSpanSize[0] - (2 * wallThickness), roofSpanSize[1] - (2 * wallThickness), roofHeight];

        const offSpan = roofSpanSize[otherAxisIdx];
        const offHeight = basicSpecs[otherAxis].height;
        const offHypot = basicSpecs[otherAxis].hypot;

        const baseTriangle = triangle({ type: 'SAS', values: [roofSpan, Math.PI / 2, roofHeight] });
        const basePrism = colorize(swLib.colors.translucentYellow, rotate(
            [Math.PI / 2, 0, 0],
            extrudeLinear({ height: roofSpanSize[otherAxisIdx] }, baseTriangle)
        ));
        const roomCutaway = translate([roomSize[0] / 2 + wallThickness, roomSize[1] / -2 - wallThickness, roomSize[2] / 2], cuboid({ size: roomSize }));
        const cutBasePrism = subtract(basePrism, roomCutaway);

        const trFamily = swLib[`trimFamily${trimFamily}`].build({ unitHeight: trimUnitSize[1], unitDepth: trimUnitSize[0] });
        const bottomTrimProfile = trFamily.crown.extraSmall;

        const bTrimRafterSpecs = [2 * trimUnitSize[0] + roofHypot, 2 * trimUnitSize[0] + offSpan];
        const bTrimRafter = rotate([0, -roofPitch, 0], translate(
            [-trimUnitSize[0], trimUnitSize[0], 0],
            align({ modes: ['min', 'max', 'min'] }, bottomTrim({
                axisLength: bTrimRafterSpecs[1],
                rafterLength: bTrimRafterSpecs[0],
                trimProfile: bottomTrimProfile,
            }))
        ));

        // return basePrism;

        return union(cutBasePrism, bTrimRafter);
    }

    return {
        buildGableRoof,
        buildHipRoof,
        buildShedRoof,
    };
}

module.exports = { init: roofBuilder }
