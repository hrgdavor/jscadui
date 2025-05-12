
const buttressBuilder = ({ lib, swLib }) => {
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
        build: (opts) => {
            return null;
        }
    };
}

module.exports = { init: buttressBuilder }
