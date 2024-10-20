
# thoughts

Lines and arcs are good candidates for having robust offsets and booleans, and are more broadly understood.

A lot can be done with them, and if limited by them user can chose compromises vased on specific need.

It is intention here to stick to this limitation as long as possible, with exploration what is available

Doing operations that are not allowed here must be postponed to next steps in modeling where curves produced here are used. For example, first conver to polygon and then apply warping.

For other curves, at the moment of inception of this library offseting and booleans are very problematic.

Cons for other curves
- Offseting a bezier does not mean offset will be a bezier.

Pros for lines/arcs
- offsetting arc produces another arc (unless collapsed)
- lines has pretty robust operations in clipper2 library
- arcs are supported in pantograph library
- information on what was aproximated by arcs can kept as metadata
- in 3d printing all curves are aproximated by lines(vertex) before exporting and slicing
- intent is keeping curve information available as long as possible
- exporting as svg or any other format that supports curces can be done
- for systems that work only with meshes, export can be done with a desired precision (num of segments)
- it is easy to have precision (segment count) consistent as only arcs are used.

## transformations

- uniform scale only (for now at least, as ellipses are not supported)
- translate

## Circle

Need to explore how circle is defined as arc, or keep it as a special case for boolean/offset.
- maybe single arc with "special" values
- two arcs for each half of circle ?

# ellipsis

Ellipsis curve is constantly changing, so it can only be aproximated with arcs, and lib
should not pretend user will get exact ellipsis, so user needs to decide aproximation precision.

- docs/ApproximateEllipse.pdf - link: https://www.geometrictools.com/Documentation/ApproximateEllipse.pdf
- https://math.stackexchange.com/questions/4935524/approximating-an-ellipse-with-circular-arcs
- https://www.geogebra.org/m/apxsz2kt


## Bezier and Fonts

Fonts use beziers all over the place. And bezier could be allowed by keeping the original
bezier info and preview (drawing them is no issue, especially if viewer is SVG based)

- warn when doing boolean/offset with beziers
- convert bezier to lines or arcs before boolean/offset
- if no boolean/offset is done extrude operation is likely done via lines/mesh or sending curves to OCCT


# ways to define arcs and lines

Taking inspiration from https://build123d.readthedocs.io/en/latest/objects.html#d-objects and later
add more if needed. From build123d link only 2d arcs and lines (no 3d, no splines, no bezier).

- [ ] - CenterArc - Arc defined by center, radius, & angles
- [ ] - RadiusArc - Arc defined by two points and a radius
- [ ] - SagittaArc - Arc defined by two points and a sagitta
- [ ] - DoubleTangentArc - Arc defined by point/tangent pair & other arc
- [ ] - ThreePointArc - Arc defined by three points
- [ ] - TangentArc - Curve defined by two points and a tangent
- [ ] - JernArc - Arc defined by start point, tangent, radius and angle
- [ ] - Line - Line defined by end points
- [ ] - IntersectingLine - Intersecting line defined by start, direction & other line
- [ ] - DoubleCircleTangentLine - line between two circles - (not part of build123d, yet)
- [ ] - Polyline - Multiple line segments defined by points
- [ ] - FilletPolyline - Polyline with filleted corners defined by pts and radius

# linearc fonts

- define subset of supported chars, and implement them with arcs and lines only.

# modeling

It is ok, sto keep rich information about origins of operations, and design intents. That info
is not much of overhead, compared to exporting curves to mesh with large precision.

# modeling: locations

Guide is a point [x,y]. `p1 = <Point loc={[10,10]}/>` and `p2 = <Point loc={[15,11]}/>`

- place a circle on p1 `<Circle loc={p1}>` 
- place a circle on p1.x,0 `<Circle loc={[p1,0]}>` - we are not just giving, location, we are allo conveying relation that can be visualised

# modeling parameters

Define one or more places where parameter values affects a contraint, which then can be used for user input.
- a parameter distance between wheels would affect a lot of things on a chasis, but we could define one or few places
  to visualise it, and allow user to change it there on the model, even by dragging control points

# modeling scenes

allow defining scenes, to allow presenting a development process, or different views of the same project.
