# Common format

Placeholder package for documenting common format that is used by jscadui. 
The format is aimed at being close to what is usual for webgl libraries, and they
at least internally use TypedArrays because that is necessary to provide data to webgl.

# fields

Object needs to minimally have `type` and `vertices`.

- type - [mesh|line|lines]
- vertices - Float32Array (length = vert count * 3)
- indices - Iunit16Array|Uint32Array 
  - Uint32Array should be used if number of indices > 65536
  - if not provided can be assumed: [0,1,2,3....] that vertices are sequential
- normals - Float32Array not required as they can be calculated
- color - color of the whole object
- colors - Float32Array colors per vertex
- isTransparent - this info must be provided if alpha transparency is is used in color or colors
- opacity - questionable, probably will not be used

# types

## type: line
Single continuous line

## type: lines
set of line segments , that can both be used for sinle line, but is more flexible as it enables
to represent more comples line based objects.

## type: mesh
A 3d mesh





