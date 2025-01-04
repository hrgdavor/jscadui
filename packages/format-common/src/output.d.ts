import { ParameterDefinition } from './parameterDefinition'
import { Matrix4x4 } from './utils'

export interface JscadMainResult {
    /** script run time */
    mainTime: number,
    /** time converting script output to gl data */
    convertTime: number,
    entities: JscadMainEntity[],
}

export type JscadCSG = unknown //TODO

interface JscadBaseEntity {
    id: number,
    transforms: Matrix4x4,
    csg: JscadCSG,
}

export interface JscadLineEntity extends JscadBaseEntity {
    type: 'line',
    vertices: Float32Array,
}

export interface JscadLinesEntity extends JscadBaseEntity {
    type: 'lines',
    vertices: Float32Array,
}

export interface JscadMeshEntity extends JscadBaseEntity {
    type: 'mesh',
    /** length = vert count * 3 */
    vertices: Float32Array,
    /**if not provided can be assumed: [0,1,2,3....] that vertices are sequential */
    indices?: Uint16Array | Uint32Array,
    colors: unknown //TODO
    isTransparent?: boolean,
    normals?: Float32Array,
    opacity?: unknown,
}

export type JscadMainEntity = JscadLineEntity | JscadLinesEntity | JscadMeshEntity

export interface JscadMainResultWithParams extends JscadMainResult {
    params: UserParameters,
    def: ParameterDefinition[],
}

export type UserParameters = Record<string, unknown> //TODO