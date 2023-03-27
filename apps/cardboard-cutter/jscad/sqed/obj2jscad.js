/**************************
 * convertit OBJ en JSCAD *
 **************************/

const fs = require('fs');

const args = process.argv.slice(2)
let largs = args.length
let nomFichierEntree

const ext_obj = '.obj'
const ext_jscad = '.jscad'

if(largs < 1){
  console.log("ERREUR : Fichier OBJ manquant")
  process.exit()
}

nomFichierEntree = args[0]
if(nomFichierEntree.slice(-4).toLowerCase() != ext_obj){
  nomFichierSortie = nomFichierEntree + ext_jscad
  nomFichierEntree = nomFichierEntree + ext_obj
} else {
	nomFichierSortie = 'modele_obj.jscad';
}

try { // charge le fichier
  var data = fs.readFileSync(nomFichierEntree, 'utf8');
}
catch(e) {
  console.log('Erreur:', e.stack);
}

let d = data.toString().split(/\n/);

// 1°) Lit les vertices ( v x y z)
let lv = d.filter(l => l.startsWith('v '));
let pts = lv.map(x => {
  var tmp = x.split(/\s/);
  tmp.shift();
  var v = tmp.filter(d => d.trim()).map(Number);
  return v;
});
// 2°) Lit les faces (g puis [f v1// v2// v3//]... )
let lf = d.filter(l => l.startsWith('g ') || l.startsWith('f '));
let faces = [], groupes = [], nfg = 0;
for(let i = 0; i < lf.length; i++){
  if(lf[i].startsWith('g ')){
    nfg++;
  } else {
    var tmp = lf[i].split(/\s/);
    tmp.shift();
    f = tmp.map(x => Number(x.replace(/\//g,''))-1);
    f.pop();
    faces.push(f);
    groupes.push(nfg);
  }
}

let sortie = [];
sortie.push('volume = function () {' );
sortie.push('  const faces =' + JSON.stringify(faces) );
sortie.push('  const vertices = ' + JSON.stringify(pts) );
sortie.push('  const groups = ' + JSON.stringify(groupes) );
sortie.push('return {faces:faces, vertices:vertices, groups:groups}' );
sortie.push('}' );

try {
  const data = fs.writeFileSync(nomFichierSortie, sortie.join('\n'))
} catch (err) {
  console.error('ERREUR: ECRITURE FICHIER', err)
}
