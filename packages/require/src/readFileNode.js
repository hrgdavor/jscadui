import { readFileSync  } from "fs"
import { resolve  } from "node:path"

export function readFileNode(_path, {base = 'fs:/', output='text'}) {
  if(_path[0] == '/') throw new Error('/ not supported')
  if(!base.startsWith('fs:/')) throw new Error('base path must start with: fs:/')
  try {
    if(!_path.startsWith('fs:/')) _path = new URL(_path,base).toString()
    _path = _path.substring(4)
    console.log('read file', resolve(_path))
    return readFileSync(_path).toString()
  } catch (e) {
    console.error('problem reading file ', _path, resolve(_path), 'root', base, ' error:', e.message)
    throw e
  }
}
