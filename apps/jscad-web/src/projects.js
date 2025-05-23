export const swLibDemo = { name: 'sw-jscad', source: './lib-demo/index.js' }

// Structures
export const swStructureDemos = [
  { name: 'archBuilder', source: './lib-demo/structures/arch-examples.js' },
  { name: 'columnBuilder', source: './lib-demo/structures/column-examples.js' },
  { name: 'entrywayBuilder', source: './lib-demo/structures/entryway-examples.js' },
  { name: 'roofBuilder', source: './lib-demo/re-roof-examples.js' },
  { name: 'wallBuilder', source: './lib-demo/structures/wall-examples.js' },
  { name: 'buttressBuilder', source: './lib-demo/buttress-examples.js' },
]

// Ornaments
export const swOrnamentDemos = [
  { name: 'foilBuilder', source: './lib-demo/ornaments/foil-examples.js' },
  { name: 'mouldBuilder', source: './lib-demo/ornaments/mould-examples.js' },
  { name: 'profileBuilder', source: './lib-demo/ornaments/profile-examples.js' },
  { name: 'basicTrimFamily', source: './lib-demo/ornaments/trim-family-examples.js' },
]

// Etc
export const swLibDemos = [
]

export const swLibraryDemos = [
  swLibDemo,
  ...swStructureDemos,
  ...swOrnamentDemos,
  ...swLibDemos
]

export const swModels = [
  { name: 'SW Models', source: './projects/index.js' },
  { name: 'Candle Holder v2', source: './projects/candle-holder/index.js' },
]
