import { toDate3mf } from './toDate3mf.js'

/**
 * @typedef Header
 * @prop {'micron'|'millimeter'|'centimeter'|'inch'|'foot'|'meter'} unit
 * @prop {string} [title]
 * @prop {string} [author]
 * @prop {string} [description]
 * @prop {string} [application]
 * @prop {string} [creationDate]
 * @prop {string} [license]
 * @prop {string} [modificationDate] 
 * 
 * 
 * @param {Array<string>} out 
 * @param {Header} param1 
 */
export function pushHeader(out,{
  unit = 'millimeter',
  title = 'jscad model',
  author = '',
  description = '',
  application = 'jscad',
  creationDate = new Date(),
  license = '',
  modificationDate,
}={}) {
  out.push(
    `<?xml version="1.0" encoding="UTF-8"?>
<model unit="${unit}" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:slic3rpe="http://schemas.slic3r.org/3mf/2017/06">
  <metadata name="slic3rpe:Version3mf">1</metadata>
  <metadata name="Title">${title}</metadata>
  <metadata name="Designer">${author}</metadata>
  <metadata name="Description">${description || title}</metadata>
  <metadata name="Copyright"></metadata>
  <metadata name="LicenseTerms">${license}</metadata>
  <metadata name="Rating"></metadata>
  <metadata name="CreationDate">${toDate3mf(creationDate)}</metadata>
  <metadata name="ModificationDate">${toDate3mf(modificationDate || creationDate)}</metadata>
  <metadata name="Application">${application}</metadata>
   `,
  )
}
