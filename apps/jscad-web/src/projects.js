export const swLibDemo = { name: 'sw-jscad', source: './lib-demo/index.js' }

export const swLibCore = [
  { name: 'Area Points', source: './lib-demo/area-point-examples.js' },
  { name: 'Centroid', source: './lib-demo/centroid-examples.js' },
  { name: 'Control Points', source: './lib-demo/control-points-examples.js' },
  { name: 'Std Construction Mats', source: './lib-demo/standard-construction-examples.js' },
  { name: 'Super Primitives', source: './lib-demo/super-primitive-examples.js' },
]

export const swBuilders = [
  { name: 'Arches', source: './lib-demo/builders/arch-examples.js' },
  { name: 'Buttress', source: './lib-demo/builders/buttress-examples.js' },
  { name: 'Columns', source: './lib-demo/builders/column-examples.js' },
  { name: 'Entryways', source: './lib-demo/builders/entryway-examples.js' },
  { name: 'Roofs', source: './lib-demo/builders/roof-examples.js' },
  { name: 'Walls', source: './lib-demo/builders/wall-examples.js' },
]

export const swDetails = [
  { name: 'Foils', source: './lib-demo/details/foil-examples.js' },
  { name: 'Moulds', source: './lib-demo/details/mould-examples.js' },
  { name: 'Profiles', source: './lib-demo/details/profile-examples.js' },
]

export const swFamilies = [
  { name: 'Trim family: Aranea', source: './lib-demo/families/trim-family-examples.js' },
]

export const swUx = [
  { name: 'Layout frames', source: './lib-demo/layout-examples.js' },
]

export const swLibraryDemos = [
  swLibDemo,
  ...swBuilders,
  ...swDetails,
  ...swFamilies,
  ...swUx,
]

export const swModels = [
  { name: 'Candle holder', source: './lib-demo/candle-holder/index.js' },
]
