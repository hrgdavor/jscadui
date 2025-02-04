import { ParameterDefinition } from './parameterDefinition'
import { Matrix4x4 } from './utils'

export interface JscadMainResult {
    /** script run time */
    mainTime: number,
    /** time converting script output to gl data */
    convertTime: number,
    entities: JscadMainEntity[],
}

interface JscadBaseEntity {
    id: number,
    transforms?: Matrix4x4,
    color?: [number, number, number, number?],
    csg?: unknown,
}

export interface JscadLineEntityRaw {
    type: 'line',
    vertices: Float32Array,
}

export interface JscadLineEntity extends JscadBaseEntity, JscadLineEntityRaw { }

export interface JscadLinesEntityRaw {
    type: 'lines',
    vertices: Float32Array,
}

export interface JscadLinesEntity extends JscadBaseEntity, JscadLineEntityRaw { }

export interface JscadMeshEntityRaw {
    type: 'mesh',
    /** length = vert count * 3 */
    vertices: Float32Array,
    /**if not provided can be assumed: [0,1,2,3....] that vertices are sequential */
    indices: Uint16Array | Uint32Array,
    colors?: Float32Array
    isTransparent?: boolean,
    normals: Float32Array,
    opacity?: unknown, //TODO
}

export interface JscadMeshEntity extends JscadBaseEntity, JscadMeshEntityRaw { }

export interface JscadUnknownEntity extends JscadBaseEntity {
    type: 'unknown',
    id: number,
}

export type JscadMainEntity = JscadLineEntity | JscadLinesEntity | JscadMeshEntity | JscadUnknownEntity
export type JscadMainEntityRaw = JscadLineEntityRaw | JscadLinesEntityRaw | JscadMeshEntityRaw

export interface JscadScriptResultWithParams extends JscadMainResult {
    params: UserParameters,
    def: ParameterDefinition[],
}

export type UserParameters = Record<string, unknown> //TODO

export type JscadTransferable = Float32Array | Uint16Array | Uint32Array

export interface JscadResultsByType {
    line: JscadLineEntity[]
    lines: JscadLinesEntity[],
    mesh: JscadMeshEntity[],
    instance: unknown[],
    unknown: unknown[],
    all: JscadMainEntity[],
    unique: Map<number, JscadMainEntity>,
}