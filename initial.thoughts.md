

Start with immutability as those objects can be reused and shared without fear.
scene/model/cad graph is much less data than a single simple sphere with many segments.



## Debug info

Mechanism to be included that enables attaching debug info `file:line:col`, `loopindex` if part of a loop and possibly more...

- to every geometry
- to every transform
- to every call of builder method

Interpreter based on AST would probably be the best option, and could allow partial changes and apply the result of them immediately without running all of the code. A simple approach could be made that requires little code on interpreter side, but has limitations in the code side ... still could be very useful.

## Optimizations
Allow for optimizations to be specific to gain most performance. Some calculations are 
easy to implement generically, but then difficult/impossible to make as performant as 
custom functions, that produce calculated values by using knowledge of the shape.

 - `boundingBox` - for a sphere with million points, custom function can trivially calculate
   bounding box, but generic function slows down with sphere precision.
 - `boundingSphere` - same
 - `center` - same
 - `centerOfMass` - same

Another optimization if to allow for those specific performance enhancing functions to recalculate
those values when there is a shape that uses the geometry but defines a transform.

## Optimization: reuse primitives

Currently jscad generates whole new geometry for each call to `sphere`,`cube`,`cylinder`, ...etc but those could be reused (example based on cube)

- cube[1,1,1] could be reused for all other sizes
- to cerate a cube:[3,4,5] use the base cube[1,1,1] with transform: scale:[3,4,5]

This optimization may have less benefit for cuboids as they have small number of vertices, but for sphere or cylinder depending on the precision it can be a huge difference.

## Optimization: limit transforms to allow for more agressive optimizations
If transforms are limited to non deforming operations, those optimized calculations can
be done reliably for transformed objects (just transform center location instead of recalculating)

 - scale
 - mirror (scale -x)
 - translate
 - rotate

## Optimization: loosen requirements on calculated values
Loosen requirements on calculated values `boundingBox`, `boundingSphere`,... or define loose
equivalents: `incBoundingBox`, `incBoundingSphere` that guarantee geometry is inside but not 
necessarily tight.

## Geometry 

**Reusable**  basic geometry that can be converted to buffers for rendering or exported.
 - It has no transforms and has it's own origin (usually in the center)
 - it defines parameters needed to create outputs from it
 - when output is calculated it should be ceched on the geometry level if it can be reused
```js
{
  id: 1, // for caching or other mapping operations
  type: 'geometry',
  is3d: true,
  subtype: '',
  creator: ['@jscad/modeling','primitives','sphere'], // function that creates the geometry
  params: [{size:3}], // parameters that created it
}
```

## Combined Geometry
A combination of shapes
 - booelan operations 

```js
{
  type: 'combined',
  creator: ['@jscad/modeling','primitives','sphere'], // function that creates the geometry
  params: [{size:3}], // parameters that created it
}
```

## Shape