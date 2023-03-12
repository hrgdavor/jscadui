# Three.js format converter

Converts from `@jscadui/format-common` to Three.js

The module does not declare dependency to the library through import to allow using in places
where the library is already present, and is maybe even loaded from a pre-packaged bundle.

If you ahve reference to whole THREE module as a global variable then just call
```js
  const converter = CommonToThree(THREE)

  const convertedObj = converter(commonObj)

```

If you have three js as a dependency it is quite more verbose
```js
import {
    MeshPhongMaterial,
    LineBasicMaterial,
    BufferGeometry,
    BufferAttribute,
    Mesh,
    InstancedMesh,
    Line,
    LineSegments,
    Color,
  } from 'three'

const converter = CommonToThree({
    MeshPhongMaterial,
    LineBasicMaterial,
    BufferGeometry,
    BufferAttribute,
    Mesh,
    InstancedMesh,
    Line,
    LineSegments,
    Color,
  })

  const convertedObj = converter(commonObj)
```

