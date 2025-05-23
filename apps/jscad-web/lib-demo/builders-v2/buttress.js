
const buttressBuilder = ({ lib, swLib }) => {
    const { union, subtract } = lib.booleans;
    const { cuboid } = lib.primitives;
    const { align, translate } = lib.transforms;
    const { measureBoundingBox } = lib.measurements;

    const { roofs, constants } = swLib;

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
         * Builds a two-part buttress/pilaster.
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
        buildTwoPart: ({
            height,
            thickness,
            bottomWidth,
            topWidth,
            midHeight,
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
            const midHt = midHeight || height * constants.PHI_INV;
            const baseShape = align(
                { modes: ['min', 'min', 'min'], relativeTo: [0, 0, -midHt] },
                cuboid({ size: [thickness, bottomWidth, height] })
            );

            const midRoofletBase = [thickness, bottomWidth - topWidth];
            const topRoofletBase = [thickness, topWidth];
            const cutaway = align(
                { modes: ['min', 'min', 'min'] },
                cuboid({ size: [...midRoofletBase, height - midHt] })
            );
            const baseButtress = subtract(baseShape, cutaway);

            const midRooflet = roofs.buildShedRoof({
                roofSpanSize: midRoofletBase,
                roofPitch: Math.PI / 8,
                wallThickness: 3,
                trimUnitSize: [1.25, 4],
                roofOpts: ['solid']
            });

            const topRooflet = translate(
                [0, midRoofletBase[1], height - midHt],
                roofs.buildShedRoof({
                    roofSpanSize: topRoofletBase,
                    roofPitch: Math.PI / 8,
                    wallThickness: 3,
                    trimUnitSize: [1.25, 4],
                    roofOpts: ['solid']
                })
            );

            return union(baseButtress, midRooflet, topRooflet);
        }
    };
}

module.exports = { init: buttressBuilder }
