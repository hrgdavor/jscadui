import { JscadMainResult } from './output'
import { ParameterDefinition } from './parameterDefinition'

export type JscadMainFunction = (params: unknown) => JscadMainResult | Promise<JscadMainResult>

export interface JscadModule {
    main?: JscadMainFunction,
    getParameterDefinitions?: () => ParameterDefinition[] | Promise<ParameterDefinition[]>
}