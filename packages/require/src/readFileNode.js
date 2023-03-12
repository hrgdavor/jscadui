import { readFileSync } from 'fs'
import { resolve } from 'node:path'

/** Create a fs that is limited to specific folder so "/path" leads to the folder and can not escape outside.
 * 
 * @param {*} root - root below which paths can not go
 * @returns 
 */
export function makeReadFileNode(root) {

  return function readFileNode(_path, { base = 'fs:/', output = 'text' }={}) {
    if (!base.startsWith('fs:/')) throw new Error('base path must start with: fs:/')
    try {
      if (!_path.startsWith('fs:/')) _path = new URL(_path, base).toString()
      _path = root+_path.substring(4)
      console.log('read', resolve(_path))
      return readFileSync(_path).toString()
    } catch (e) {
      console.error('problem reading file ', _path, resolve(_path), 'root', base, ' error:', e.message)
      throw e
    }
  }
}
