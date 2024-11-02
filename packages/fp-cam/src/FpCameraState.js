import { vec3 } from 'gl-matrix'
import { rotateZ, rotateY, add } from 'gl-matrix/vec3'

export class FpCameraState {
    /**@type {vec3} */
    position

    /** Yaw / Pitch of the camera in rad
     * @type {[number,number]} */
    rotationYP

    /**@type {number} */
    unitsPerSecond = 20

    /** @type {vec3} */
    lookVector = [1, 0, 0]

    constructor() {
        this.position = [-100, 0, 0]
        this.rotationYP = [0, 0]
    }

    /**     
     * @param {vec3} movement 
     */
    applyMovementRotated = (movement) => {
        /**@type {vec3} */
        const rotatedMovement = [0, 0, 0]

        rotateZ(rotatedMovement, movement, [0, 0, 0], this.rotationYP[0])
        add(this.position, this.position, rotatedMovement)
    }

    /** 
     * @param {number} time 
     * @param {number} factor Can be used to move in the opposite direction
     */
    moveForward = (time, factor) => {
        this.applyMovementRotated([this.unitsPerSecond * time * factor, 0, 0])
    }

    /** 
     * @param {number} time 
     * @param {number} factor Can be used to move in the opposite direction
     */
    moveRight = (time, factor) => {
        this.applyMovementRotated([0, this.unitsPerSecond * time * factor, 0])
    }

    /** 
     * @param {number} time 
     * @param {number} factor Can be used to move in the opposite direction
     */
    moveUp = (time, factor) => {
        this.position[2] += this.unitsPerSecond * time * factor
    }


    /**
     * @param {number} ry Additional rotation around the yaw axis
     * @param {number} rp Additional rotation around the pitch axis
     */
    rotate = (ry, rp) => {
        this.rotationYP[0] += ry;
        this.rotationYP[1] = clamp(this.rotationYP[1] + rp, -Math.PI / 2, Math.PI / 2);

        /**@type {vec3} */
        const lookVector = [1, 0, 0]

        rotateY(lookVector, lookVector, [0, 0, 0], this.rotationYP[1])
        rotateZ(lookVector, lookVector, [0, 0, 0], this.rotationYP[0])

        this.lookVector = lookVector
    }

    get target() {
        return [
            this.position[0] + this.lookVector[0],
            this.position[1] + this.lookVector[1],
            this.position[2] + this.lookVector[2],
        ]
    }
}

/** 
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max)