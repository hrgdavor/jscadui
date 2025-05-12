"use strict"

//------------------
// WIP ENHANCEMENTS
//------------------

const buttressBuilder = require('./builders-v2/buttress');
const roofBuilder = require('./builders-v2/roof');



//------------------
// E N H A N C E R
//------------------

const enhanceSwJscad = ({ lib, swLib }) => {
    swLib.buttress = buttressBuilder.init({ lib, swLib });
    swLib.roofs = roofBuilder.init({ lib, swLib });
}

module.exports = {
    enhanceSwJscad,
}
