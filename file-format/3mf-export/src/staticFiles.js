
/** File that describes content types inside a 3mf  */
export const fileForContentTypes = {
  name:'[Content_Types].xml',
  content: `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
<Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
<Default Extension="png" ContentType="image/png" />
</Types>`
}

/** File that describes content types inside a 3mf  */
export const fileForRelThumbnail = {
  name:'_rels/.rels',
  content: `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Target="/3D/3dmodel.model" Id="rel-1" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
<Relationship Target="/Metadata/thumbnail.png" Id="rel-2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail" />
</Relationships>`
}
