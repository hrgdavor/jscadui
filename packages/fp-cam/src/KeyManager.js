export class KeyManager {
    /** @type {Set<string>} */
    #pressedKeys = new Set()

    /**
     * @param {string} key 
     */
    onPress = (key) => {
        this.#pressedKeys.add(key.toLowerCase())
    }

    /**
     * @param {string} key 
     */
    onRelease = (key) => {
        this.#pressedKeys.delete(key.toLowerCase())
    }

    /**
     * @param {string} key 
     * @returns {boolean}
     */
    isPressed = (key) => this.#pressedKeys.has(key)
}