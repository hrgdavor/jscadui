
const buttressBuilder = ({ lib, swLib }) => {
    const { union } = lib.booleans;
    const { cuboid } = lib.primitives;
    const { align } = lib.transforms;

    const { roofs } = swLib;

    return {
        /**
         * Builds a simple buttress/pilaster.
         * @param {Object} opts 
         * @param {number} opts.height
         * @param {number} opts.thickness
         * @param {number} opts.width
         * @param {string[]} opts.buttressOpts 
         * @param {string[]} opts.trimOpts - ['base', 'dado', 'crown']
         * @param {number} opts.trimSides - sides where trim is present. Expects an integer between 1-4
         * @returns Buttress geometry
         */
        buildSimple: ({
            height,
            thickness,
            width,
            buttressOpts,
            trimOpts,
            trimSides,
        }) => {
            console.log(height,
                thickness,
                width,
                buttressOpts,
                trimOpts,
                trimSides,);

            const baseShape = align({ modes: ['min', 'min', 'max'] }, cuboid({ size: [thickness, width, height] }));

            const rooflet = roofs.buildShedRoof({
                roofSpanSize: [thickness, width],
                roofPitch: Math.PI / 8,
                trimUnitSize: [1.25, 4],
                roofOpts: ['solid']
            });

            return union(baseShape, rooflet);
        },
        /**
         * Builds a simple buttress/pilaster.
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
            console.log(height,
                thickness,
                bottomWidth,
                topWidth,
                buttressOpts,
                trimOpts,
                trimSides,);
            const baseShape = cuboid({ size: [thickness, bottomWidth, height] });
            const roofletBase = [thickness, bottomWidth - topWidth]
            console.log(roofletBase)

            const rooflet = roofs.buildShedRoof({
                roofSpanSize: roofletBase,
                roofPitch: Math.PI / 4,
                wallThickness: 3,
                trimUnitSize: [1.25, 4],
                roofOpts: ['solid']
            });

            return union(baseShape, rooflet);
        }
    };
}

module.exports = { init: buttressBuilder }
