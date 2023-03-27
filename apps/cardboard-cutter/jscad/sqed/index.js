const jscad = require('@jscad/modeling')
const { curves, maths, extrusions, primitives, transforms, booleans, 
  colors, geometries, measurements, utils } = jscad
const { bezier } = curves
const { slice, extrudeLinear } = extrusions
const { cuboid, polygon, polyhedron, rectangle } = primitives
const { intersect, subtract,union } = booleans
const { center, scale, translateX, translateY, translateZ, translate
    ,rotateX, rotateY, rotateZ, rotate } = transforms
const { colorize } = colors
const { geom3, poly3 } = geometries
const { vec3 } = maths
const { measureBoundingBox, measureArea } = measurements
const { degToRad } = utils

// checkout https://jsfiddle.net/prisoner849/8uxw667m/ for possible more ideas on performance


const getParameterDefinitions = () => {
  let params = [
    {name: 'g1', caption: 'Lignes', type: 'group'},
  ]
  for(let i=0; i<10; i++) {
  	params.push({name: 'lH_'+i, caption: `#${i+1}:`, type: 'slider', min:"0", max:"100", step:"1", initial:i?"0":"50", live:1})
  }
  params.push({name: 'g2', caption: 'Colonnes', type: 'group'})
  for(let i=0; i<10; i++) {
  	params.push({name: 'lV_'+i, caption: `#${i+1}:`, type: 'slider', min:"0", max:"100", step:"1", initial:i?"0":"50", live:1})
  }

  params.push(
    {name: 'g3', caption: 'Parametres', type: 'group'},
    {name: 'v', type:'text', caption: 'volume:', initial: '0001'},
    {name: 'ep', type:'float', caption: 'ep (mm):', initial: 6.0},    

    {name: 'g4', caption: 'PREVIEW', type: 'group'},
    {name: 'modelPreview', type:'checkbox', caption: 'Model preview', checked:true},    
  )

   return params
}

const volume = ()=> {
  const faces =[[0,3,2],[0,4,1],[0,15,6],[0,25,12],[1,3,0],[1,4,3],[2,5,7],[2,25,0],[3,4,5],[3,5,2],[4,0,9],[4,11,5],[6,9,0],[6,27,7],[7,8,6],[7,11,10],[7,13,2],[7,27,14],[8,9,6],[8,11,9],[10,8,7],[10,11,8],[11,4,9],[11,7,5],[12,15,0],[12,25,16],[13,22,24],[13,24,2],[14,13,7],[14,27,18],[15,20,26],[15,26,6],[16,15,12],[16,20,17],[16,25,23],[17,15,16],[18,13,14],[18,22,19],[18,27,21],[19,13,18],[20,15,17],[20,25,26],[21,22,18],[22,13,19],[22,27,24],[23,20,16],[23,25,20],[24,27,25],[25,2,24],[26,25,27],[27,6,26],[27,22,21]]
  const vertices = [[-223.79780761,-201.50782252,423.34127485],[-10.93686036,-200.40275798,636.61818713],[-223.06900078,199.59724202,424.48604671],[-10.93686036,199.59724202,636.61818713],[201.19528006,-200.40275798,424.48604671],[201.19528006,199.59724202,424.48604671],[-223.79780761,-201.50782252,-425.18665044],[-223.06900078,199.59724202,-424.04187858],[-10.93686036,-200.40275798,-636.174019],[201.19528006,-200.40275798,-424.04187858],[-10.93686036,199.59724202,-636.174019],[201.19528006,199.59724202,-424.04187858],[-223.70680727,-151.42500853,373.68334528],[-223.16000112,149.51442816,374.40323278],[-223.16000112,149.51442816,-373.95906466],[-223.70680727,-151.42500852,-374.6758061],[169.60792047,-152.13965904,373.68343549],[169.60792047,-152.13965904,-374.67571589],[170.15472663,148.79977764,-373.95897444],[170.15472663,148.79977764,374.403323],[170.24546868,-23.48175966,-373.95889177],[170.24559782,21.03371592,-373.95889177],[170.24585611,21.17586707,374.40324033],[170.24598525,-23.19745735,374.40324033],[-223.06887164,21.89051759,374.40315011],[-223.06874249,-22.48280683,374.40315011],[-223.06925907,-22.76710914,-373.95898198],[-223.06912992,21.74836644,-373.95898198]]
  const groups = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
return {faces:faces, vertices:vertices, groups:groups}
}

const cache = {slices:{lH:{},lV:{}}}

const main = (params) => {
  console.log('params', params)
  const sc = 1
  const {ep = 2} = params
  const vd = volume()
  const vv = polyhedron({points: vd.vertices, faces: vd.faces})
  // const vv = require('./' + params.v + '.obj')
  // const vv = require('./' + (params.v || '0001') + '.obj')

  // cache per loaded model
  if(cache.__key != params.v) cache.slices = {lH:{},lV:{}}
  cache.__key = params.v

  //let vol = center({}, rotateY(degToRad(180), rotateX(degToRad(90), vv)))
  let vol = center({}, scale([sc,sc,sc], rotateX(degToRad(90), vv)))
  
  let r = [], rH = [], rV = []
  let bV = measureBoundingBox(vol)

  // Recup parametres
  const pv = Object.keys(params)
  const lH = pv.filter(p=>p.startsWith('lH_')).map(p=>params[p]).filter(Number).map(x => (x-50)/100)
  const lV = pv.filter(p=>p.startsWith('lV_')).map(p=>params[p]).filter(Number).map(x => (x-50)/100)

  // 1°) Traverses en X (H)
  fH = bV[1][0] - bV[0][0]
  mH = (bV[1][0] + bV[0][0]) / 2
  var trH = cuboid( { size: [ ep, 1+bV[1][1]- bV[0][1], 1+bV[1][2] - bV[0][2] ]} )

  let sliceCache = cache.slices.lH
  for (let i = 0; i < lH.length; i++){
    var t = sliceCache[lH[i]]
    if(!t) t = sliceCache[lH[i]] = intersect(vol, translateX(fH * lH[i], trH))
    if (t.polygons.length > 0) {
    	rH.push(t)
    	if(params.modelPreview) r.push(t)
    }
  }

  // 2°) Traverses en Y (V)
  fV = bV[1][1] - bV[0][1]
  mV = (bV[1][1] + bV[0][1]) / 2
  var trV = cuboid( { size: [ 1+ bV[1][0] - bV[0][0], ep, 1+ bV[1][2] - bV[0][2] ]} )  
  sliceCache = cache.slices.lV
  for (let i = 0; i < lV.length; i++){
    var t = sliceCache[lV[i]]
    if(!t) t = sliceCache[lV[i]] = intersect(vol, translateY(fV * lV[i], trV))
    if (t.polygons.length > 0){
    	rV.push(t)
    	if(params.modelPreview) r.push(t)    	
    } 
  }

  if(params.modelPreview){
  	r.push(colorize([0.3,0.3,0.3,0.7],vol))
  }else{
	  
	  // 3°) Entrecroisement
	  var ur = union(intersect(union(rH), union(rV)));
	  var tmp = scission3d(ur)  
	  //r.push(tmp)
	  var eS = [], eH = [], eV = [];
	  for(let i=0; i< tmp.length; i++){
      try{
  	    let p = tmp[i];
  	    let b = measureBoundingBox(p), 
  	        d = vec3.subtract(b[1], b[0]);
  	    let c1 = translate([b[0][0], b[0][1] + ep/2, b[0][2]], 
  	          cuboid({size: [d[0], d[1]*2, d[2]]}));
  	    let c2 = translate([b[0][0] + ep/2, b[0][1], b[1][2]], 
  	          cuboid({size: [d[0]*2, d[1], d[2]]}));
  	    //r.push(c2,c1)
  	    eH.push(intersect(tmp[i], c2));
  	    eV.push(intersect(tmp[i], c1));
      }catch(e){
       setTimeout(()=>{throw e},0)
      }
	  }
	  
    try{
  	  rH = rH.map(x=> subtract(x, eV));
  	  rV = rV.map(x=> subtract(x, eH));
    }catch(e){
     setTimeout(()=>{throw e},0)
    }

	  // 3d
	  //r.push(colorize([0,1,0], translateX(-70, vol)));
	  //r.push(colorize([1,0,0], translateX(32-70, rH)));
	  //r.push(colorize([0,0,1], translateX(-32-70, rV)));
	  
	  // 2d
	  
	  var dk = Math.max(fV, fH) +1
	  for(let ih = 0; ih < rH.length; ih++){
	    let b = measureBoundingBox(rH[ih]);
	    r.push(translate([dk *ih, dk/2], union(vol2surf(rH[ih], 'x', b[0][0]))))
	    //r.push(translateX(dk *ih, vol2surf(rH[ih], 'x', b[0][0])))
	  }
	  for(let iv = 0; iv < rV.length; iv++){
	    let b = measureBoundingBox(rV[iv]);
	    r.push(translate([dk *iv, -dk], union(vol2surf(rV[iv], 'y', b[0][1]))))
	    //r.push(translate([dk *iv, -dk], vol2surf(rV[iv], 'y', b[0][1])))
	  }
  }
    
  return r;
}
function rndColors(){return [Math.random(), Math.random(), Math.random()];}
function sortNb  (E){ // returns E numerically sorted and deduplicated
  return E.sort(function(a, b) {return a-b}).filter(
      function(item, pos, ary) {return !pos || item != ary[pos - 1]});
}
function scission3d  (geom){
  let i, Pl, j, i1, j1, ok, ti, tj, z, 
  zz = [], P, RScission, til, tjl, tii1, zzl, zzdl;
// construit table de correspondance entre Polygones (P)
// build polygons lookup table
  //P = geom.toPolygons();
  P = geom.polygons;
  
  RScission = [];
  Pl = P.length;
  for (i = 0; i < Pl; i++){
  ti = P[i].vertices;
  z = [];
  for (j = 0; j < Pl; j++){
      tj = P[j].vertices;
    ok = false;
    for (i1 = 0; i1 < ti.length; i1++){
      tii1 = ti[i1];
    for(j1 = 0; j1 < tj.length; j1++)
      if (!ok)ok = vec3.distance(tii1, tj[j1]) < 0.01;
    }
    if (ok)z.push(parseInt(j));
  }
  z = sortNb(z);
  zz.push({e:0, d:z});
  }

// regroupe les correspondances des polygones se touchant
// boucle ne s'arrêtant que quand deux passages retournent le même nb de polygones
// merge lookup data from linked polygons as long as possible
  ok = false;
  nElOk = 0;
  do {
    lnElOk = nElOk;
  nElOk = 0;
  for (i = 0; i < zz.length; i++){
    if (zz[i].e >= 0) {
      nElOk++;
    for (j = 0; j < zz[i].d.length; j++){
      a = zz[i].d[j];
      if (zz[a].e >= 0)
        if (i != a) {
        zz[i].d = sortNb(zz[i].d.concat(zz[a].d));
        zz[a].e = -1;
      }
    }
    }
  }
  ok = lnElOk == nElOk;
  }while (!ok);

// construit le tableau des CSG à retourner
// build array of CSG to return
  for (i = 0, zzl = zz.length; i < zzl; i++) {
    if (zz[i].e >= 0) {
      z = [];
      for (j = 0, zzdl = zz[i].d.length; j < zzdl; j++){
        z.push(P[zz[i].d[j]]);
      }
      if(z.length > 0) {
      RScission.push(geom3.create(z));
      }
    }
  }

  return RScission;
}
function vol2surf(vol, axe, orig = 0){ // axe = 'x' | 'y' | 'z'
// retourne la surface formee par le volume avec l'axe z (à 0)
let S = [];
let X, Y, Z;

for(let n = 0; n < vol.polygons.length; n++){
  let pts = [];
  let P = vol.polygons[n];
  let ok = true;
  switch(axe){
    case 'x':
      X = 1; Y = 2; Z = 0;
      break;
    case 'y':
      X = 0; Y = 2; Z = 1;
      break;
    case 'z':
      X = 0; Y = 1; Z = 2;
      break;
  }
  for(let i=0; (i < P.vertices.length) && ok; i++){
    let pt = P.vertices[i];
    if(Math.abs(pt[Z] - orig)< 0.05){
      pts.push([pt[X], pt[Y]]);
    } else {
      ok = false;
    }
  }
  if (ok){
    if(axe == 'x'){
      S.push(polygon({points:pts.reverse()}));
    } else {
      S.push(polygon({points:pts}));
    }
  }
}

return S;
}

module.exports = { main, getParameterDefinitions }
