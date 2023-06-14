var f=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];var x=t=>{let n="";for(let e=0;e<16;e++)e%4!=3&&(e>0&&(n+=" "),n+=t[e]||0);return n};var p=(t=0,n=f)=>`    <item objectid="${t}" transform="${x(n)}" />
`;function u(t,n,e){t.push(`<object id="${n}" type="model">
`),t.push(` <components>
`),e.forEach(o=>{C(t,o.id,o.transforms)}),t.push(` </components>
`),t.push(`</object>
`)}var C=(t,n=0,e=defMatrix)=>{t.push(`    <component objectid="${n}" transform="${matrix2str(e)}" />
`)};function l(t,n,e,o){t.push(`  <object id="${n}" type="model">
   <mesh>
    <vertices>
`);for(let a=0;a<e.length;a+=3)t.push(`     <vertex x="${e[a]}" y="${e[a+1]}" z="${e[a+2]}" />
`);t.push(`    </vertices>
    <triangles>
`);for(let a=0;a<o.length;a+=3)t.push(`     <triangle v1="${o[a]}" v2="${o[a+1]}" v3="${o[a+2]}" />
`);return t.push(`    </triangles>
   </mesh>
  </object>
`),t}var c=t=>t?t.toISOString().substring(0,10):"";var O={name:"[Content_Types].xml",content:`<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
<Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
<Default Extension="png" ContentType="image/png" />
</Types>`},U={name:"_rels/.rels",content:`<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Target="/3D/3dmodel.model" Id="rel-1" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
<Relationship Target="/Metadata/thumbnail.png" Id="rel-2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail" />
</Relationships>`};var g=[];function A({simple:t=[],meshes:n=[],components:e=[],unit:o="millimeter",title:a="jscad model",author:$="",description:T="",application:b="jscad",creationDate:d=new Date,license:y="",modificationDate:j}){let i=[`<?xml version="1.0" encoding="UTF-8"?>
<model unit="${o}" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:slic3rpe="http://schemas.slic3r.org/3mf/2017/06">
 <metadata name="slic3rpe:Version3mf">1</metadata>
 <metadata name="Title">${a}</metadata>
 <metadata name="Designer">${$}</metadata>
 <metadata name="Description">${T||a}</metadata>
 <metadata name="Copyright"></metadata>
 <metadata name="LicenseTerms">${y}</metadata>
 <metadata name="Rating"></metadata>
 <metadata name="CreationDate">${c(d)}</metadata>
 <metadata name="ModificationDate">${c(j||d)}</metadata>
 <metadata name="Application">${b}</metadata>
 <resources>
`];return t.forEach(({id:m,vertices:s,indices:r,transforms:h})=>{l(i,m,s,r),g.push(p(m,h))}),n.forEach(({id:m,vertices:s,indices:r,transforms:h})=>l(i,m,s,r)),e.forEach(({id:m,items:s,transforms:r})=>{u(m,s),s.push(p(m,r))}),i.push(` </resources>
 <build>
 `,...g,`</build>
</model>`),i.join("")}export{O as fileForContentTypes,U as fileForRelThumbnail,A as to3dmodel};
//# sourceMappingURL=index.js.map
