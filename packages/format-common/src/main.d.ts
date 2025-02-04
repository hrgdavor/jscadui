import { CSGItem } from './csg'
import { JscadMainResult, JscadMeshEntity } from './output'
import { ParameterDefinition } from './parameterDefinition'

export type JscadMainResultRaw = CSGItem | JscadMeshEntity

export type JscadMainFunctionRaw = (params: unknown) => JscadMainResultRaw | JscadMainResultRaw[] | Promise<JscadMainResultRaw | JscadMainResultRaw[]>

export type JscadMainFunction = (params: unknown) => Promise<JscadMainResult> | Promise<JscadMainResult[]>

export interface JscadModule {
    main?: JscadMainFunctionRaw,
    getParameterDefinitions?: () => ParameterDefinition[] | Promise<ParameterDefinition[]>
}