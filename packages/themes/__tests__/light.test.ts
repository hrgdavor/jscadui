import * as fs from 'fs'
import path from 'path'

const FILE_PATH = path.resolve(__dirname, '..', 'themes', 'light.ts')

const theme = fs.readFileSync(FILE_PATH, {
  encoding: 'utf8',
})

it('generated index.ts matches snapshot', () => {
  expect(theme).toMatchSnapshot()
})
