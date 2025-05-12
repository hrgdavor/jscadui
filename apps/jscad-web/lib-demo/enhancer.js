"use strict"

//-------------------
// WIP ENHANCEMENTS
//-------------------

const buttressBuilder = require('./builders-v2/buttress');
const roofBuilder = require('./builders-v2/roof');


//--------------
// COLOURS API
//--------------

const colours = {
    yellow: [0.7, 0.7, 0.1],
}

// Adding translucent colours
for (const [colour, rgbVal] of Object.entries(colours)) {
    const capColName = colour.slice(0, 1).toUpperCase() + colour.slice(1);
    colours[`translucent${capColName}1`] = [...rgbVal, 0.3];
    colours[`translucent${capColName}2`] = [...rgbVal, 0.5];
    // using 2nd one as default value
    colours[`translucent${capColName}`] = [...rgbVal, 0.5];
    colours[`translucent${capColName}3`] = [...rgbVal, 0.7];
}


//------------------
// E N H A N C E R
//------------------

const enhanceSwJscad = ({ lib, swLib }) => {
    swLib.buttress = buttressBuilder.init({ lib, swLib });
    swLib.roofs = roofBuilder.init({ lib, swLib });
    swLib.colours = colours;
}

module.exports = {
    enhanceSwJscad,
}
