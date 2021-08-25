

Start with immutability as those objects can be reused and shared without fear.
scene/model/cad graph is much less data than a single simple sphere with many segments.

## Optimizations
Allow for optimizations to be specific to gain most performance. Some calculations are 
easy to implement generically, but then difficult/impossible to make as performant as 
custom functions, that produce calculated values by using knowledge of the shape.
 - `boundingBox` - for a sphere with milion points, custom function can trivially calculate
   bounding box, but generic function slows down with sphere precision.
 - `boundingSphere` - same
 - `center` - same
 - `centerOfMass` - same

Another optimization if to allow for those specific performance enhancing functions to recalculate
those values when there is a shape that uses the geometry but defiens a transform.

## Optimization: limit transforms to allow for more agressive optimizations
If transforms are limited to non deforming operations, those optimized calculations can
be done reliably for transformed objects (just transform center location instead of recalculating)
 - scale
 - mirror (scale -x)
 - translate
 - rotate

## Optimization: Loosen requirements on calculated values
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