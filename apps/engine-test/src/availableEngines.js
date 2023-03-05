import { addScript } from "./addScript"
import { initTestBabylon } from "./testBabylon"
import { initTestRegl } from "./testRegl"
import { initTestThree } from "./testThree"

export const availableEngines = {
  three:{
    name:'Three.js',
    src:'build/bundle.threejs.js',
    init: async (el, cfg)=>{
      await addScript(cfg.src)
      return initTestThree(THREE, el)
    }
  },
  babylon:{
    name:'Babylon.js',
    src:'build/bundle.babylonjs.js',
    init: async (el,cfg)=>{
      await addScript(cfg.src)
      return initTestBabylon(BABYLON, el)
    }
  },
  regl:{
    name:'regl',
    src:'build/bundle.regl.js',
    init: async (el,cfg)=>{
      await addScript(cfg.src)
      window.REGL = window.REGL || window.jscadReglRenderer
      return initTestRegl(REGL, el)
    }
  },
  twgl:{
    name:'TWGL',
    src:'',
    init: async (el,cfg)=>{
      
    }
  }
}
export const availableEnginesList = Object.keys(availableEngines)