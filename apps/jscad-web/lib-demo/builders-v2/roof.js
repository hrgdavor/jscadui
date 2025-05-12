
const roofBuilder = ({ lib, swLib }) => {
    const { triangle } = lib.primitives;
    const { rotate } = lib.transforms;
    const { extrudeLinear } = lib.extrusions;
    const { colorize } = lib.colors;

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
    }) => {
        console.log(`buildShedRoof() roofSpanSize = ${JSON.stringify(roofSpanSize)}`);
        const basicSpecs = getBasicSpecs({ roofPitch, roofSpanSize })
        const mainAxisIdx = roofAxis === 'x' ? 0 : 1;
        const otherAxisIdx = mainAxisIdx === 0 ? 1 : 0;
        console.log(`    roofOpts = ${JSON.stringify(roofOpts)}`);
        console.log(`    basicSpecs = ${JSON.stringify(basicSpecs)}`);
        console.log(`    mainAxisIdx = ${JSON.stringify(mainAxisIdx)}, otherAxisIdx = ${JSON.stringify(otherAxisIdx)}`);
        console.log(swLib.colours);

        const roofSpan = roofSpanSize[mainAxisIdx];
        const roofHeight = basicSpecs[roofAxis].height;
        const roofHypot = basicSpecs[roofAxis].hypot;

        const offHeight = basicSpecs[roofAxis].height;
        const offHypot = basicSpecs[roofAxis].hypot;

        const baseTriangle = triangle({ type: 'SAS', values: [roofSpan, Math.PI / 2, roofHeight] });
        const basePrism = colorize(swLib.colours.translucentYellow, rotate(
            [Math.PI / 2, 0, 0],
            extrudeLinear({ height: roofSpanSize[otherAxisIdx] }, baseTriangle)
        ));

        return basePrism;
    }

    return {
        buildGableRoof,
        buildHipRoof,
        buildShedRoof,
    };
}

module.exports = { init: roofBuilder }
