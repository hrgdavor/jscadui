
Babel 7 adds this shim to scripts `_interopRequireDefault` and then assigns what is needs to replacement code derived from import statements

source:

```js
import jscad from "@jscad/modeling";
const { sphere, cube } = jscad.primitives;
```

```js
var _modeling = _interopRequireDefault(require("@jscad/modeling"));
function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
const { sphere, cube } = _modeling.default.primitives;
```

for some reason exports have `__esModule=true` for even transformed esmodules and that confuses the shim. The shim then tries to provide exports from obj.default. To avid this issue for now both `obj` and `obj.default` have all the module exports.

