//This is required for the import tree shaking hack
declare module 'fast-xml-parser/src/xmlbuilder/json2xml.js' {
    import { XMLBuilder } from 'fast-xml-parser'
    export default XMLBuilder
}