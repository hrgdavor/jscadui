/* Generator that uses gl-matrix code as reference to create a single-step matrix for 2 rotations.
It is used reliably prepare code for fromXZRotation that is then cleaned manually a bit after that.
It is easy to get lost in 4x4 matrix multiplication, so it was more reliable to partialy generate it.
*/

const init = `
var zs = Math.sin(rz);
var zc = Math.cos(rz);
var xs = Math.sin(rx);
var xc = Math.cos(rx);
var out = []
`
// wrap in function to allow prettier to ignore formatting.
// prettier-ignore
const [z,x] = (()=>{
  var z = []
  var x = [];
  z[0] = 'zc'; x[0] = '1';
  z[1] = 'zs'; x[1] = 0;
  z[2] = 0;    x[2] = 0;
  z[3] = 0;    x[3] = 0;
  
  z[4] = '-zs';x[4] = 0;
  z[5] = 'zc'; x[5] = 'xc';
  z[6] = 0;    x[6] = 'xs';
  z[7] = 0;    x[7] = 0;
  
  z[8] = 0;    x[8] = 0;
  z[9] = 0;    x[9] = '-xs';
  z[10] = 1;   x[10] = 'xc';
  z[11] = 0;   x[11] = 0;
  
  z[12] = 0;   x[12] = 0;
  z[13] = 0;   x[13] = 0;
  z[14] = 0;   x[14] = 0;
  z[15] = 1;   x[15] = 1;
  return [z, x]
})()

const pos = (c, r) => c + r * 4
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 4; c++) {
    let parts = []
    for (let i = 0; i < 4; i++) {
      // parts[i] = `z[${pos(c,i)}]*x[${pos(i,r)}]`

      // generate multiplication for each cell but skip those that multiply with zero
      if (z[pos(c, i)] !== 0 && x[pos(i, r)] !== 0) parts.push(z[pos(c, i)] + '*' + x[pos(i, r)])
    }
    console.log(`out[${pos(c, r)}] = ${parts.length ? parts.join(' + ') : '0'}`)
  }
}
