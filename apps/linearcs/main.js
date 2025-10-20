import Two from 'two.js'
import { addZUI } from './src/ZoomPanRotate.js';


var two = new Two({
  type: Two.Types.webgl,
  fullscreen: true,
  autostart: true,
}).appendTo(document.body)

var stage = new Two.Group();
var rect = new Two.Rectangle(two.width / 2, two.height / 2, 50, 50)
stage.add(rect)

two.add(stage);
addZUI(two.renderer.domElement, stage);


two.update()

// two.bind('update', function () {
//  rect.rotation += 0.001
// })
