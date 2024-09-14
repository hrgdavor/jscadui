
// Convert Three.js BufferGeometry to Manifold Mesh
function GtoM_1(geometry) {
  const vertProperties = geometry.attributes.position.array as Float32Array;
  const triVerts = geometry.index != null ?
    geometry.index.array as Uint32Array :
    new Uint32Array(vertProperties.length / 3).map((_, idx) => idx);
  const mesh = new manifoldWasm.Mesh({numProp: 3, vertProperties, triVerts});
  mesh.merge();
  return Manifold.ofMesh(mesh);
}
function geometry2mesh(geometry,Manifold) {
  // Only using position in this sample for simplicity. Can interleave any other
  // desired attributes here such as UV, normal, etc.
  const vertProperties = geometry.attributes.position.array as Float32Array;
  // Manifold only uses indexed geometry, so generate an index if necessary.
  const triVerts = geometry.index != null ?
    geometry.index.array as Uint32Array :
    new Uint32Array(vertProperties.length / 3).map((_, idx) => idx);
  // Create a triangle run for each group (material) - akin to a draw call.
  const starts = [...Array(geometry.groups.length)].map(
    (_, idx) => geometry.groups[idx].start);
  // List the runs in sequence.
  const indices = Array.from(starts.keys())
  indices.sort((a, b) => starts[a] - starts[b])
  const runIndex = new Uint32Array(indices.map(i => starts[i]));

  const mesh =
    new Manifold.Mesh({numProp: 3, vertProperties, triVerts, runIndex});
  // Automatically merge vertices with nearly identical positions to create a
  // Manifold. This only fills in the mergeFromVert and mergeToVert vectors -
  // these are automatically filled in for any mesh returned by Manifold. These
  // are necessary because GL drivers require duplicate verts when any
  // properties change, e.g. a UV boundary or sharp corner.
  mesh.merge();
  return mesh;
}

// Convert Manifold Mesh to Three.js BufferGeometry
function mesh2geometry(mesh) {
  const geometry = new THREE.BufferGeometry();
  // Assign buffers
  geometry.setAttribute(
    'position', new THREE.BufferAttribute(mesh.vertProperties, 3));
  geometry.setIndex(new THREE.BufferAttribute(mesh.triVerts, 1));
  return geometry;
}
function MtoCSG2(m) {
  try {
    let manifoldMesh = m;
    let geom = mesh2geometry(manifoldMesh);
    return BGtoCSG(geom);
  } finally {
    //m.delete();
  }
}

//geom3 <-to-> CSGv1
function CSGtoG(csg) {
  let triangles = csg.toTriangles();
  let polygons = [];
  for (let i = 0; i < triangles.length; i++) {
    let polyVerts = [];
    for (let v = 0; v < 3; v++) {
      polyVerts.push([
        triangles[i].vertices[v].pos._x,
        triangles[i].vertices[v].pos._y,
        triangles[i].vertices[v].pos._z
      ]);
    }
    polygons.push(jscadv2.geometries.poly3.fromPoints(polyVerts));
  }
  let geom = jscadv2.geometries.geom3.create(polygons);
  return geom;
}
function GtoCSG(geom) {
  let res = new CSG();
  let CSGpolygons = [];
  let polygons = geom.polygons;
  for (let i = 0; i < polygons.length; i++) {
    let poly = polygons[i];
    let vertices = [];
    for (let j = 0; j < poly.vertices.length; j++) {
      let vert = poly.vertices[j];
      vertices.push(new CSG.Vertex(new CSG.Vector3D(vert[0], vert[1], vert[2])));
    }
    CSGpolygons.push(new CSG.Polygon(vertices));
  }
  res = res.fromPolygons(CSGpolygons);
  return res;
}
//geom3 to Manifold
function GtoM(csg) {
  const vertices = [];
  const indices = [];
  let idx = 0;
  csg.polygons.forEach((polygon) => {
    polygon.vertices.forEach((vertex) => {
      vertex.index = idx;
      vertices.push(vertex[0], vertex[1], vertex[2]);
      idx++;
    });
    const first = polygon.vertices[0].index;
    for (let i = 2; i < polygon.vertices.length; i++) {
      const second = polygon.vertices[i - 1].index;
      const third = polygon.vertices[i].index;
      indices.push(first, second, third);
    }
  });

  const mesh = new manifoldWasm.Mesh({numProp: 3, vertProperties:new Float32Array(vertices), triVerts:new Uint32Array(indices)});
  mesh.merge();
  return Manifold.ofMesh(mesh);
}
function MtoG(manifold) {
  return BGtoG(mesh2geometry(manifold));
}
//geom3 <-to-> BufferGeometry
function BGtoG(g){
  let vs = g.getAttribute('position').array;
  let vertices = [];
  for (let i = 0; i < vs.length; i+=9) {
    vertices.push([
      [vs[i],vs[i+1],vs[i+2]],
      [vs[i+3],vs[i+4],vs[i+5]],
      [vs[i+6],vs[i+7],vs[i+8]]
    ]);
  }
  let geometry = jscadv2.geometries.geom3.fromPoints(vertices);
  return geometry;//CSG.fromPolygons(polys);
}
function GtoBG(csg) {
  const vertices = [];
  const indices = [];
  let idx = 0;
  csg.polygons.forEach((polygon) => {
    polygon.vertices.forEach((vertex) => {
      vertex.index = idx;
      vertices.push(vertex[0], vertex[1], vertex[2]);
      idx++;
    });
    const first = polygon.vertices[0].index;
    for (let i = 2; i < polygon.vertices.length; i++) {
      const second = polygon.vertices[i - 1].index;
      const third = polygon.vertices[i].index;
      indices.push(first, second, third);
    }
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices), 3)
  );
  geo.setIndex(indices);
  return geo;
}
//CSGv1 <-to-> BufferGeometry
function CSGtoBG(csg) {
  let triangles = csg.toTriangles();
  const vertices = [];
  const indices = [];
  let idx = 0;
  triangles.forEach((polygon) => {
    polygon.vertices.forEach((vertex) => {
      //console.log(vertex.pos);
      vertex.index = idx;
      vertices.push(vertex.pos._x, vertex.pos._y, vertex.pos._z);
      idx++;
    });
    const first = polygon.vertices[0].index;
    for (let i = 2; i < polygon.vertices.length; i++) {
      const second = polygon.vertices[i - 1].index;
      const third = polygon.vertices[i].index;
      indices.push(first, second, third);
    }
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
  geo.setIndex(indices);
  return geo;
}
function BGtoCSG(g){
  let geom = g;
  if(g instanceof THREE.BufferGeometry || g.isBufferGeometry){
    geom = new THREE.Geometry().fromBufferGeometry(g);
  }
  let fs = geom.faces;
  let vs = geom.vertices;
  let polys = [];
  let fm = ['a', 'b', 'c'];
  for (let i = 0; i < fs.length; i++) {
    let f = fs[i];
    let vertices = [];
    for (let j = 0; j < 3; j++) {
      vertices.push(new CSG.Vertex(new CSG.Vector3D(vs[f[fm[j]]])));
    }
    polys.push(new CSG.Polygon(vertices));
  }
  return CSG.fromPolygons(polys);
}
//CSGv1 <-to-> Manifold
function CSGtoM(csg) {
  let triangles = csg.toTriangles();
  const totalVertices = triangles.length * 3;
  const totalIndices = triangles.reduce((acc, polygon) => acc + Math.max(0, (polygon.vertices.length - 2) * 3), 0);

  const vertices = new Float32Array(totalVertices * 3); // Each vertex has 3 coordinates (x, y, z).
  const indices = new Uint32Array(totalIndices);
  let vertexIdx = 0;
  let indexIdx = 0;

  for (let polygonIndex = 0; polygonIndex < triangles.length; polygonIndex++) {
    const firstVertexIndex = vertexIdx / 3; // Divide by 3 because each vertex has 3 components.
    for (let vertexIndex = 0; vertexIndex < triangles[polygonIndex].vertices.length; vertexIndex++) {
      vertices[vertexIdx++] = triangles[polygonIndex].vertices[vertexIndex].pos._x;
      vertices[vertexIdx++] = triangles[polygonIndex].vertices[vertexIndex].pos._y;
      vertices[vertexIdx++] = triangles[polygonIndex].vertices[vertexIndex].pos._z;
    }
    for (let i = 2; i < triangles[polygonIndex].vertices.length; i++) {
      indices[indexIdx++] = firstVertexIndex;
      indices[indexIdx++] = firstVertexIndex + i - 1;
      indices[indexIdx++] = firstVertexIndex + i;
    }
  }

  //const geo = new THREE.BufferGeometry();
  //geo.setAttribute(
  //  "position",
  //  new THREE.BufferAttribute(new Float32Array(vertices), 3)
  //);
  //geo.setIndex(indices);
  //return geo;

  const mesh = new manifoldWasm.Mesh({numProp: 3, vertProperties:new Float32Array(vertices), triVerts:new Uint32Array(indices)});
  mesh.merge();
  return Manifold.ofMesh(mesh);
}
function MtoCSG(m) {
  try {
    let manifoldMesh = m.getMesh();
    let polygons = [];
    let vertices = manifoldMesh.vertProperties;
    let indices = manifoldMesh.triVerts;

    for (let i = 0; i < indices.length; i += 3) {
      const polygonVertices = [];
      for (let j = 0; j < 3; j++) {
        const vertexIndex = indices[i + j] * 3; // Each vertex is represented by 3 values in the vertices array
        const vertex = [vertices[vertexIndex],vertices[vertexIndex + 1],vertices[vertexIndex + 2]]
        polygonVertices.push(vertex);
      }
      polygons.push(CSG.Polygon.createFromPoints(polygonVertices));
    }
    return CSG.fromPolygons(polygons);
    //return BGtoCSG(geom);
  } finally {
    m.delete();
  }
}
function CAGtoCS(cag){
  let ptSet = cag.getOutlinePaths();
  let ptArr = [];

  for(let j=0; j < ptSet.length; j++){
    let pathArr = [];
    for(let i=0; i < ptSet[j].points.length; i++){
      pathArr.push([ptSet[j].points[i]._x, ptSet[j].points[i]._y]);
    }
    ptArr.push(pathArr);
  }

  return new manifoldWasm.CrossSection(ptArr,'EvenOdd');
}
//makerJS
function MjstoMcs(model) {
  let ptSet:any = makerjs.exporter.toJscadCAG(CAG, model, {maxArcFacet: 0.5});
  ptSet = ptSet.getOutlinePaths();
  let ptArr = [];

  for(let j=0; j < ptSet.length; j++){
    let pathArr = [];
    for(let i=0; i < ptSet[j].points.length; i++){
      pathArr.push([ptSet[j].points[i]._x, ptSet[j].points[i]._y]);
    }
    ptArr.push(pathArr);
  }

  return new manifoldWasm.CrossSection(ptArr,'EvenOdd');
}
