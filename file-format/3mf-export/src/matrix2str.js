
/** transform for attribute as specifiend in 3mf format
 * 
 * When objects need to be transformed for rotation, scaling, or translation purposes, 
 * row-major affine 3D matrices (4x4) are used. The matrix SHOULD NOT be singular or nearly singular.
 * Transforms are of the form, where only the first 3 column values are specified. 
 * The last column is never provided, and has the fixed values 0.0, 0.0, 0.0, 1.0. 
 * When specified as an attribute value, 
 * matrices have the form "m00 m01 m02 m10 m11 m12 m20 m21 m22 m30 m31 m32" 
 * where each value is a decimal number of arbitrary precision.
 * 
 * @param {mat4} matrix
 * @return string tarnsform attribute value
*/
export const matrix2str = m=>{
    let str = ''
    for(let i=0; i<16; i++){
        if(i % 4 == 3) continue
        if(i>0) str += ' '
        str += m[i] || 0
    }
    return str
}