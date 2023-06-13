# 3mf export MVP

This is a set of functions to generate 3mf content for exporting 3d models and optionally embeding a thumbnail.

reference: https://github.com/3MFConsortium/spec_core/blob/master/3MF%20Core%20Specification.md

Format is defined by openxmlformats.

3mf file is a zip file that you need to produce using a zip library of your choice.

# contents of said zip file

File names (with path) and metadata are hardcoded as it is not important for the purpose of exporting a model.

File names 
- `[Content_Types].xml` - static file describing content types [src/staticFiles.js]
- `_rels/.rels` -  [src/staticFiles.js]
- `/3D/3dmodel.model` - you must use this exact path to store model data
- `/Metadata/thumbnail.png` - you must use this exact path to store the optional thumbnail


