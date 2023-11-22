
/** 
 * @typedef {Rec}
 * @prop {string} name
 * @prop {string} id
*/  

// we are declaring classes taht will not be imported by code, but by jsdoc only to provide type

// there is no good way in jsdoc to define classes with methods, so this dummy class will do the trick
export class WorkerRpc{
  /**
   * @param {string} name 
   * @param {boolean} low 
   * @returns {Rec}
  */
 getData(name,low){}
 /**
  * @param {string} id 
  * @returns {Rec}
 */
getRecord1(id){}
/**
 * @param {Rec} tpl 
 * @returns {Rec}
*/
  getRecord2(tpl){}
}
