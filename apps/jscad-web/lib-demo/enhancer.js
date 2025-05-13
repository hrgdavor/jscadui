"use strict"

//-------------------
// WIP ENHANCEMENTS
//-------------------

const buttressBuilder = require('./builders-v2/buttress');


//------------------
// E N H A N C E R
//------------------

const enhanceSwJscad = ({ lib, swLib }) => {
    swLib.buttress = buttressBuilder.init({ lib, swLib });
}

module.exports = {
    enhanceSwJscad,
}
