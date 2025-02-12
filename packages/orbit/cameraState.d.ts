export interface OrbitStateInit {
    target: [number, number, number],
    position?: [number, number, number],
    rx: number,
    rz: number,
    len: number,
}

export interface OrbitControlInit {
    position?: [number, number, number],
    target?: [number, number, number],
    rx?: number,
    rz?: number,
    len?: number,
    panRatio?: number,
    rxRatio?: number,
    rzRatio?: number,
    zoomRatio?: number,
}


export interface CameraState {
    position: [number, number, number],
    target: [number, number, number],
    rx: number,
    rz: number,
}

export interface CameraAnimationState {
    target: [number, number, number],
    rx: number,
    rz: number,
}