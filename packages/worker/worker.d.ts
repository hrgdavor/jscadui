/**
@typedef InitOptions
@prop {String} baseURI - to resolve inital relative path
@prop {Array<Alias>} alias - 
@prop {Array<Object>} bundles - bundle alias {name:path} 

@typedef RunScriptOptions
@prop {string} script - script source
@prop {string} url - script url/name
@prop {string} base - base url 

@typedef ScriptResponse
@prop {Array<any>} entities  
@prop {number} mainTime  - script run time

@typedef JscadWorker
@prop {(options:InitOptions)=>Promise<void>} init
@prop {(options:RunScriptOptions)=>Promise<ScriptResponse>} runScript
*/

export interface InitOptions {
  /** to resolve inital relative path */
  baseURI:String,
  alias: Array<Alias>,
  /** bundle alias {name:path} */
  bundles: Array<Record<String,String>>, 
}

export interface RunScriptOptions {
  /** script source */
  script: string,
  /** script url/name */
  url: string,
  /** base url */
  base: string,
}

export interface ScriptResponse {
  entities: Array<any>,
  /** script run time */
  mainTime: number,
}

export interface JscadWorker {
  async init(options:InitOptions):void,
  async init(options:RunScriptOptions):ScriptResponse,
}
