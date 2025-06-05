export const swLibDemo = { name: 'sw-jscad', source: './lib-demo/index.js' }

export const swLibCore = [
  // { name: 'Area Points', source: './lib-demo/area-point-examples.js' },
  // { name: 'Centroid', source: './lib-demo/centroid-examples.js' },
  { name: 'Control Points', source: './lib-demo/control-points-examples.js' },
  { name: 'Mesh Cuboid', source: './lib-demo/mesh-cuboid-examples.js' },
  { name: 'Mesh Cylinder', source: './lib-demo/mesh-cylinder-examples.js' },
  { name: 'Mesh Panel', source: './lib-demo/mesh-panel-examples.js' },
  { name: 'Rectangular Frame', source: './lib-demo/rectangular-frame-examples.js' },
  { name: 'Transforms', source: './lib-demo/transform-examples.js' },
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
  { name: 'Profiles (advanced)', source: './lib-demo/details/profile-advanced-examples.js' },
]

export const swFamilies = [
  { name: 'Dowel Couplers', source: './lib-demo/families/dowel-coupler-examples.js' },
  { name: 'Dowel Jigs', source: './lib-demo/families/dowel-jig-examples.js' },
  { name: 'Dowel Joists', source: './lib-demo/families/dowel-joist-examples.js' },
  { name: 'Standard Masonry', source: './lib-demo/families/standard-masonry-examples.js' },
  { name: 'Standard Lumber', source: './lib-demo/families/standard-lumber-examples.js' },
  { name: 'Standard Tile', source: './lib-demo/families/standard-tile-examples.js' },
  { name: 'Standard Crafts', source: './lib-demo/families/standard-crafts-examples.js' },
  { name: 'Standard Paper', source: './lib-demo/families/standard-paper-examples.js' },
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

export const swProjects = [
  { name: 'Connectors', source: './projects/connectors/index.js' },
  { name: 'Connector Parts', source: './projects/connectors/connector-parts/index.js' },
]
