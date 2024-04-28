# JSCAD renderer using Three.js

The module does not declare dependency to the library through import to allow using in places
where the library is loaded from a pre-packaged bundle.

If you have reference to whole THREE module as a global variable then just call
```js
  const renderer = RenderThreejs(THREE)(options)
```

If you just import whole THREE module also is simple nad short
```js
import * as THREE from 'three'
const renderer = RenderThreejs(THREE)(options)
```

If you have three.js as a dependency and you want to optimize the bundle it is quite more verbose

```javascript
import { PerspectiveCamera, HemisphereLight, WebGLRenderer, DirectionalLight, Scene, Group, Vector3, Color,  MeshPhongMaterial, LineBasicMaterial, BufferGeometry, BufferAttribute, Mesh, InstancedMesh, Line, LineSegments 
} from 'three'

const renderer = RenderThreejs({PerspectiveCamera, HemisphereLight, WebGLRenderer, DirectionalLight, Scene, Group, Vector3, Color,  MeshPhongMaterial, LineBasicMaterial, BufferGeometry, BufferAttribute, Mesh, InstancedMesh, Line, LineSegments 
})(options)
```

## Creating a smaller Three.js bundle

Use `bundle.example.js` as an example to build your own smaller bundle, it has all needed dependencies. It is smaller than full build, but may not be the smallest possible.

Three.js bundle that is minimised but usable in jscad renderer At version `0.146.0` it is about 430 KB.

If you need few more things, add them too ofc.. 




