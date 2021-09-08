

Start with immutability as those objects can be reused and shared without fear.
scene/model/cad graph is much less data than a single simple sphere with many segments.



## Debug info

Mechanism to be included that enables attaching debug info `file:line:col`, `loopindex` if part of a loop and possibly more...

- to every geometry
- to every transform
- to every call of builder method

Interpreter based on AST would probably be the best option, and could allow partial changes and apply the result of them immediately without running all of the code. A simple approach could be made that requires little code on interpreter side, but has limitations in the code side ... still could be very useful.

## Optimization 1: avoid/reduce using expensive operation in the library
This one is likely most difficult, and the aim is to reduce need scanning the mesh, even worse if not just scanning,
but also cross checking (exponential slowdown)

 - retesellate should be optional (it is not always desirable)

### Optimization 1.a: force points reuse

 - no duplicates points in a mesh 
 - shared normal (will likely give smooth shading)
 - this avoids the need for snapping polygons (expensive as cross-iterates over mesh exponenital slowdown)

## Optimization: generic calculations and shortcuts for specific optimized versions
Allow for shortcuts for optimizing calculations to gain most performance. 

Some calculations are easy to implement generically, but then difficult/impossible to make as performant as 
specialized(per-shape) functions that produce calculated values by using knowledge of the shape.

 - `boundingBox` - for a sphere with million points, custom function can trivially calculate
   bounding box, but generic function slows down with sphere precision.
 - `boundingSphere` - same
 - `center` - same
 - `centerOfMass` - same

Another level optimization here is to allow for those specific performance enhancing functions to recalculate
those values when there is a shape that uses the same parent geometry but defines a transform (basic geometries always start with identity matrix).

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

## Optimization of preview: fake booleans
just displaying parts of boolean operations is much faster.

 - care must be taken to avoid breaking code that expects to do stuff with booleans output
 - better to wrap the result in FakeBoolean object, that way when ppl run into the issue, and debug 
   the result, they will see something is wrong and then ca decide waht to do
 - needs an easy option to force boolean in the script (maybe user want to skip preview for specific part).
   That way speed ccan be for many other booleans, but one being tested can be forced to ececute.

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
 - boolean operations 

```js
{
  type: 'combined',
  creator: ['@jscad/modeling','primitives','sphere'], // function that creates the geometry
  params: [{size:3}], // parameters that created it
}
```

## sketching
have a multi-pass stepped approach,  
 - define inital variables with constraints to be used 
 - generate rough sketch with helping shapes (lines, arcs, circles) to define maybe more constraints like intersections an offsets
-  generate the shape, 
 - then add fillets and maybe some booleans if it is easier than doing sth manually

there would be many shapes and points in there that are not part of the final result, but are needed to reason about the model, and it would be a shame to not be able to visualize them.

a stepped approach like that would enable visualizing each step so it is easier to debug and inspect

an inspector similar like we have for HMTL and css in browser would also be useful where one could change few numbers on the shapes to make better fit, then later update code to get those numbers 
inspector would at first only know final calculated value, so if changed the final number for better fit, I would have to change the code to match the number I just changed (it is a pattern I often use to test css tweaks).
Inspector could be made to be smarter by inspecting AST
