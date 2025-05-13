
const buttressBuilder = ({ lib, swLib }) => {
    const { cuboid } = lib.primitives;

    return {
        /**
         * Builds a buttress/pilaster.
         * @param {Object} opts 
         * @param {number} opts.height
         * @param {number} opts.thickness
         * @param {number} opts.bottomWidth
         * @param {number} opts.topWidth
         * @param {string[]} opts.buttressOpts 
         * @param {string[]} opts.trimOpts - ['base', 'dado', 'crown']
         * @param {number} opts.trimSides - sides where trim is present. Expects an integer between 1-4
         * @returns Buttress geometry
         */
        build: ({
            height,
            thickness,
            bottomWidth,
            topWidth,
            buttressOpts,
            trimOpts,
            trimSides,
        }) => {
            return cuboid({ size: [thickness, bottomWidth, height] });
        }
    };
}

module.exports = { init: buttressBuilder }
