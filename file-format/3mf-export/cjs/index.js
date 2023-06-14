var p=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var k=Object.prototype.hasOwnProperty;var E=(t,e)=>{for(var a in e)p(t,a,{get:e[a],enumerable:!0})},M=(t,e,a,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of v(e))!k.call(t,n)&&n!==a&&p(t,n,{get:()=>e[n],enumerable:!(o=D(e,n))||o.enumerable});return t};var R=t=>M(p({},"__esModule",{value:!0}),t);var W={};E(W,{fileForContentTypes:()=>I,fileForRelThumbnail:()=>O,to3dmodel:()=>U});module.exports=R(W);var x=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];var u=t=>{let e="";for(let a=0;a<16;a++)a%4!=3&&(a>0&&(e+=" "),e+=t[a]||0);return e};var l=(t=0,e=x)=>`    <item objectid="${t}" transform="${u(e)}" />
`;function g(t,e,a){t.push(`<object id="${e}" type="model">
`),t.push(` <components>
`),a.forEach(o=>{F(t,o.id,o.transforms)}),t.push(` </components>
`),t.push(`</object>
`)}var F=(t,e=0,a=defMatrix)=>{t.push(`    <component objectid="${e}" transform="${matrix2str(a)}" />
`)};function c(t,e,a,o){t.push(`  <object id="${e}" type="model">
   <mesh>
    <vertices>
`);for(let n=0;n<a.length;n+=3)t.push(`     <vertex x="${a[n]}" y="${a[n+1]}" z="${a[n+2]}" />
`);t.push(`    </vertices>
    <triangles>
`);for(let n=0;n<o.length;n+=3)t.push(`     <triangle v1="${o[n]}" v2="${o[n+1]}" v3="${o[n+2]}" />
`);return t.push(`    </triangles>
   </mesh>
  </object>
`),t}var d=t=>t?t.toISOString().substring(0,10):"";var I={name:"[Content_Types].xml",content:`<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
<Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
<Default Extension="png" ContentType="image/png" />
</Types>`},O={name:"_rels/.rels",content:`<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Target="/3D/3dmodel.model" Id="rel-1" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
<Relationship Target="/Metadata/thumbnail.png" Id="rel-2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail" />
</Relationships>`};var $=[];function U({simple:t=[],meshes:e=[],components:a=[],unit:o="millimeter",title:n="jscad model",author:T="",description:b="",application:y="jscad",creationDate:h=new Date,license:j="",modificationDate:C}){let i=[`<?xml version="1.0" encoding="UTF-8"?>
<model unit="${o}" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:slic3rpe="http://schemas.slic3r.org/3mf/2017/06">
 <metadata name="slic3rpe:Version3mf">1</metadata>
 <metadata name="Title">${n}</metadata>
 <metadata name="Designer">${T}</metadata>
 <metadata name="Description">${b||n}</metadata>
 <metadata name="Copyright"></metadata>
 <metadata name="LicenseTerms">${j}</metadata>
 <metadata name="Rating"></metadata>
 <metadata name="CreationDate">${d(h)}</metadata>
 <metadata name="ModificationDate">${d(C||h)}</metadata>
 <metadata name="Application">${y}</metadata>
 <resources>
`];return t.forEach(({id:m,vertices:s,indices:r,transforms:f})=>{c(i,m,s,r),$.push(l(m,f))}),e.forEach(({id:m,vertices:s,indices:r,transforms:f})=>c(i,m,s,r)),a.forEach(({id:m,items:s,transforms:r})=>{g(m,s),s.push(l(m,r))}),i.push(` </resources>
 <build>
 `,...$,`</build>
</model>`),i.join("")}
//# sourceMappingURL=index.js.map
