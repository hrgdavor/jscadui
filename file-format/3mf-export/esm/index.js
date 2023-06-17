var d=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];var f=t=>{let n="";for(let e=0;e<16;e++)e%4!=3&&(e>0&&(n+=" "),n+=t[e]||0);return n};var i=(t=0,n=d)=>`    <item objectid="${t}" transform="${f(n)}" />
`;var l=t=>t?t.toISOString().substring(0,10):"";function u(t,{unit:n="millimeter",title:e="jscad model",author:o="",description:a="",application:m="jscad",creationDate:s=new Date,license:r="",modificationDate:p}){t.push(`<?xml version="1.0" encoding="UTF-8"?>
<model unit="${n}" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:slic3rpe="http://schemas.slic3r.org/3mf/2017/06">
  <metadata name="slic3rpe:Version3mf">1</metadata>
  <metadata name="Title">${e}</metadata>
  <metadata name="Designer">${o}</metadata>
  <metadata name="Description">${a||e}</metadata>
  <metadata name="Copyright"></metadata>
  <metadata name="LicenseTerms">${r}</metadata>
  <metadata name="Rating"></metadata>
  <metadata name="CreationDate">${l(s)}</metadata>
  <metadata name="ModificationDate">${l(p||s)}</metadata>
  <metadata name="Application">${m}</metadata>
   `)}function x(t,n,e){t.push(`<object id="${n}" type="model">
`),t.push(` <components>
`),e.forEach(o=>{g(t,o.id,o.transforms)}),t.push(` </components>
`),t.push(`</object>
`)}var g=(t,n=0,e=defMatrix)=>{t.push(`    <component objectid="${n}" transform="${matrix2str(e)}" />
`)};function c(t,n,e,o){t.push(`  <object id="${n}" type="model">
   <mesh>
    <vertices>
`);for(let a=0;a<e.length;a+=3)t.push(`     <vertex x="${e[a]}" y="${e[a+1]}" z="${e[a+2]}" />
`);t.push(`    </vertices>
    <triangles>
`);for(let a=0;a<o.length;a+=3)t.push(`     <triangle v1="${o[a]}" v2="${o[a+1]}" v3="${o[a+2]}" />
`);return t.push(`    </triangles>
   </mesh>
  </object>
`),t}var M={name:"[Content_Types].xml",content:`<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
<Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
<Default Extension="png" ContentType="image/png" />
</Types>`},R={name:"_rels/.rels",content:`<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Target="/3D/3dmodel.model" Id="rel-1" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
<Relationship Target="/Metadata/thumbnail.png" Id="rel-2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail" />
</Relationships>`};function S({simple:t=[],meshes:n=[],components:e=[],...o}){let a=[],m=[];return u(m,o),m.push(`  <resources>
`),t.forEach(({id:s,vertices:r,indices:p,transforms:h})=>{c(m,s,r,p),a.push(i(s,h))}),n.forEach(({id:s,vertices:r,indices:p,transforms:h})=>c(m,s,r,p)),e.forEach(({id:s,items:r,transforms:p})=>{x(s,r),r.push(i(s,p))}),m.push(`  </resources>
`),m.push(`<build>
`,...a,`</build>
`),m.push(`</model>
`),m.join("")}export{M as fileForContentTypes,R as fileForRelThumbnail,S as to3dmodel};
//# sourceMappingURL=index.js.map
