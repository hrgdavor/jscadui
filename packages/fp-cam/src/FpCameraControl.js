import { FpCameraState } from "./FpCameraState"
import { KeyManager } from "./KeyManager";

const radPerPixel = 0.3 / 180 * Math.PI

export class FpCameraControl {
    /** @type {((state:FpCameraControl)=>void) | undefined} */
    onchange
    /** @type {((state:FpCameraControl)=>void) | undefined} */
    oninput

    #state = new FpCameraState()
    #keyManager = new KeyManager()

    #lastUpdateTime = Date.now()

    /** @type {[number,number] | undefined} */
    #lastDragPosition = undefined

    /**
    * @param {Array<HTMLElement>} elements
    */
    constructor(elements) {
        for (const element of elements) {
            this.listenOnKeys(element)
        }

        const update = () => {
            this.updateMovement()
            requestAnimationFrame(update)
        }
        requestAnimationFrame(update)

    }

    updateMovement() {
        const lastTime = this.#lastUpdateTime
        this.#lastUpdateTime = Date.now()
        const delta = (this.#lastUpdateTime - lastTime) / 1000
        let hasMoved = false
        if (this.#keyManager.isPressed("w") && !this.#keyManager.isPressed("s")) {
            this.#state.moveForward(delta, 1)
            hasMoved = true
        } else if (this.#keyManager.isPressed("s") && !this.#keyManager.isPressed("w")) {
            this.#state.moveForward(delta, -1)
            hasMoved = true
        }
        if (this.#keyManager.isPressed("d") && !this.#keyManager.isPressed("a")) {
            this.#state.moveRight(delta, -1)
            hasMoved = true
        } else if (this.#keyManager.isPressed("a") && !this.#keyManager.isPressed("d")) {
            this.#state.moveRight(delta, 1)
            hasMoved = true
        }
        if (this.#keyManager.isPressed("shift") && !this.#keyManager.isPressed(" ")) {
            this.#state.moveUp(delta, -1)
            hasMoved = true
        } else if (this.#keyManager.isPressed(" ") && !this.#keyManager.isPressed("shift")) {
            this.#state.moveUp(delta, 1)
            hasMoved = true
        }
        if (hasMoved) {
            this.oninput?.(this)
            this.onchange?.(this)
        }
    }

    get position() {
        return this.#state.position
    }

    get target() {
        return this.#state.target
    }

    get rx() {
        return (Math.PI / 2) - this.#state.rotationYP[1]
    }

    get rz() {
        return this.#state.rotationYP[0] - (Math.PI / 2)
    }

    /** @param {HTMLElement} el */
    listenOnKeys = (el) => {
        el.tabIndex = 0//Make the element selectable. Necessary to receive key presses.
        el.addEventListener("keydown", e => {
            this.#keyManager.onPress(e.key)
        });
        el.addEventListener("keyup", e => {
            this.#keyManager.onRelease(e.key)
        });
        el.addEventListener("mousedown", e => {
            this.#lastDragPosition = [e.clientX, e.clientY]
        })
        window.addEventListener("mouseup", e => {
            this.#lastDragPosition = undefined
        })
        el.addEventListener("wheel", e => {
            if (e.deltaY > 0) {
                this.#state.unitsPerSecond /= 1.1
            } else if (e.deltaY < 0) {
                this.#state.unitsPerSecond *= 1.1
            }
        })
        window.addEventListener("mousemove", e => {
            if (e.button !== 0) return
            if (this.#lastDragPosition !== undefined) {
                /** @type {[number,number]} */
                const currentPosition = [e.clientX, e.clientY]
                const dx = currentPosition[0] - this.#lastDragPosition[0]
                const dy = currentPosition[1] - this.#lastDragPosition[1]
                this.#state.rotate(-dx * radPerPixel, dy * radPerPixel)
                this.#lastDragPosition = currentPosition
                this.oninput?.(this)
                this.onchange?.(this)
            }
        })
    }
}

