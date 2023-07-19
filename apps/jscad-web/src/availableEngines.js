import { addScript } from "./addScript"
import { initTestThree } from "./testThree"

export const availableEngines = {
  three:{
    name:'Three.js',
    src:'build/bundle.threejs.js',
    init: async (el, cfg)=>{
      await addScript(cfg.src)
      return initTestThree(THREE, el)
    }
  }
}
export const availableEnginesList = Object.keys(availableEngines)