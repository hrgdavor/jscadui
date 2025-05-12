"use strict"

//-------------------
// WIP ENHANCEMENTS
//-------------------

const buttressBuilder = require('./builders-v2/buttress');
const roofBuilder = require('./builders-v2/roof');


//------------------
// E N H A N C E R
//------------------

const enhanceSwJscad = ({ lib, swLib }) => {
    swLib.buttress = buttressBuilder.init({ lib, swLib });
    swLib.roofs = roofBuilder.init({ lib, swLib });


    //--------------
    // COLOURS API
    //--------------
    // Original color palette by
    // https://www.google.com/design/spec/style/color.html

    const { hexToRgb } = lib.colors;
    swLib.colours = {
        red: hexToRgb('#f44336'),
        pink: hexToRgb('#e91e63'),
        purple: hexToRgb('#9c27b0'),
        deepPurple: hexToRgb('#673ab7'),
        indigo: hexToRgb('#3f51b5'),
        blue: hexToRgb('#2196f3'),
        lightBlue: hexToRgb('#03a9f4'),
        cyan: hexToRgb('#00bcd4'),
        teal: hexToRgb('#009688'),
        green: hexToRgb('#4caf50'),
        lightGreen: hexToRgb('#8bc34a'),
        lime: hexToRgb('#cddc39'),
        yellow: hexToRgb('#ffeb3b'),
        amber: hexToRgb('#ffc107'),
        orange: hexToRgb('#ff9800'),
        deepOrange: hexToRgb('#ff5722'),
        brown: hexToRgb('#795548'),
        grey: hexToRgb('#9e9e9e'),
        blueGrey: hexToRgb('#607d8b'),
        white: hexToRgb('#ffffff'),
    }

    // Adding translucent colours
    for (const [colour, rgbVal] of Object.entries(swLib.colours)) {
        const capColName = colour.slice(0, 1).toUpperCase() + colour.slice(1);
        swLib.colours[`translucent${capColName}1`] = [...rgbVal, 0.3];
        swLib.colours[`translucent${capColName}2`] = [...rgbVal, 0.5];
        // using 2nd one as default value
        swLib.colours[`translucent${capColName}`] = [...rgbVal, 0.5];
        swLib.colours[`translucent${capColName}3`] = [...rgbVal, 0.7];
    }
}

module.exports = {
    enhanceSwJscad,
}
