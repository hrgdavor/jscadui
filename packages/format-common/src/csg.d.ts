import { Matrix4x4 } from "./utils.d.ts";

interface CSGBase {
    transforms?: Matrix4x4,
    color?: undefined
}

export interface CSGLine extends CSGBase {
    isClosed: boolean,
    points: [number, number][],
}

export interface CSGLineSegments extends CSGBase {
    sides: [number, number][][],
}

export interface CSGPolygons extends CSGBase {
    polygons: {
        vertices: (
            [number, number, number][]) | CSGPolygonOldVertices,
        shared?: {
            /**RGBA Color between 0 and 1 */
            color?: [number, number, number, number?]
        }
    }[],
}

export type CSGPolygonOldVertices = {
    pos: { x: number, y: number, z: number }
}[];

export interface CSGOutlines extends CSGBase {
    outlines: CsgContourOrOutlineValue
}

export interface CSGContours extends CSGBase {
    contours: CsgContourOrOutlineValue
}

export type CsgContourOrOutlineValue = [number, number, (number | undefined)?][][];

export type CSGItem = CSGLine | CSGLineSegments | CSGPolygons | CSGOutlines | CSGContours