
const roofBuilder = ({ lib, swLib }) => {
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
     * @param {string[]} opts.roofOpts - Options like 'solid', 'noWall'
     * @param {number} opts.wallThickness - Wall thickness
     * @returns Shed roof
     */
    const buildShedRoof = ({
        roofSpanSize,
        roofOverhangSize,
        roofPitch,
        roofOpts = ['solid'],
        wallThickness,
    }) => {
        return null;
    }

    return {
        buildGableRoof,
        buildHipRoof,
        buildShedRoof,
    };
}

module.exports = { init: roofBuilder }
