// TODO support loading .cjs, .mjs

//import pantograph from "pantograph2d/dist/pantograph.js"
import pantograph from "pantograph2d"
import jscad from '@jscad/modeling'
const { draw, cut, fuseAll, exportSVG } = pantograph;

const { intersect, subtract } = jscad.booleans
const { colorize } = jscad.colors
const { cube, sphere } = jscad.primitives

function main() {
  const outer = subtract(
    cube({ size: 10 }),
    sphere({ radius: 6.8 })
  )
  const inner = intersect(
    sphere({ radius: 4 }),
    cube({ size: 7 })
  )
  console.log('pantograph',pantograph)
  const shape = drawStrokedPolygon(50, 6, 5).rotate(45);
  const output = fuseAll(polarCopy(shape, 60, 12));
  console.log('output',output)
  console.log(exportSVG(output))
  return [
    colorize([0.65, 0.25, 0.8], outer),
    colorize([0.7, 0.7, 0.1], inner),
  ]
}

const drawPolygon = (radius, sides) => {
    const angle = 360 / sides;
    const pen = draw([radius, 0]);
    for (let i = 1; i < sides; i++) {
        pen.polarLineTo([radius, angle * i]);
    }
    return pen.close().rotate(90);
};

const drawStrokedPolygon = (radius, sides, strokeWidth) => {
    const outerPolygon = drawPolygon(radius + strokeWidth / 2, sides);
    const innerPolygon = drawPolygon(radius - strokeWidth / 2, sides);
    return cut(outerPolygon, innerPolygon);
};

const polarCopy = (drawing, radius, count) => {
    const angle = 360 / count;

    const copies = [];
    for (let i = 0; i < count; i++) {
        copies.push(drawing.translateY(radius).rotate(angle * i));
    }
    return copies;
};




module.exports = { main }

