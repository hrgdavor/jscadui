import { CSGItem } from './csg.d.ts'
import { JscadMainResult, JscadMeshEntity } from './output.d.ts'
import { ParameterDefinition } from './parameterDefinition.d.ts'

export type JscadMainResultRaw = CSGItem | JscadMeshEntity

export type JscadMainFunctionRaw = (params: unknown) => JscadMainResultRaw | JscadMainResultRaw[] | Promise<JscadMainResultRaw | JscadMainResultRaw[]>

export type JscadMainFunction = (params: unknown) => Promise<JscadMainResult> | Promise<JscadMainResult[]>

export interface JscadModule {
    main?: JscadMainFunctionRaw,
    getParameterDefinitions?: () => ParameterDefinition[] | Promise<ParameterDefinition[]>
}