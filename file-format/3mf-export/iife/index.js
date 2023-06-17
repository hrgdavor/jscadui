var juExport3mf=(()=>{var i=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var b=Object.prototype.hasOwnProperty;var y=(t,e)=>{for(var a in e)i(t,a,{get:e[a],enumerable:!0})},j=(t,e,a,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of T(e))!b.call(t,n)&&n!==a&&i(t,n,{get:()=>e[n],enumerable:!(o=$(e,n))||o.enumerable});return t};var C=t=>j(i({},"__esModule",{value:!0}),t);var M={};y(M,{fileForContentTypes:()=>v,fileForRelThumbnail:()=>k,to3dmodel:()=>E});var f=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];var u=t=>{let e="";for(let a=0;a<16;a++)a%4!=3&&(a>0&&(e+=" "),e+=t[a]||0);return e};var l=(t=0,e=f)=>`    <item objectid="${t}" transform="${u(e)}" />
`;var c=t=>t?t.toISOString().substring(0,10):"";function x(t,{unit:e="millimeter",title:a="jscad model",author:o="",description:n="",application:m="jscad",creationDate:s=new Date,license:r="",modificationDate:p}){t.push(`<?xml version="1.0" encoding="UTF-8"?>
<model unit="${e}" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" xmlns:slic3rpe="http://schemas.slic3r.org/3mf/2017/06">
  <metadata name="slic3rpe:Version3mf">1</metadata>
  <metadata name="Title">${a}</metadata>
  <metadata name="Designer">${o}</metadata>
  <metadata name="Description">${n||a}</metadata>
  <metadata name="Copyright"></metadata>
  <metadata name="LicenseTerms">${r}</metadata>
  <metadata name="Rating"></metadata>
  <metadata name="CreationDate">${c(s)}</metadata>
  <metadata name="ModificationDate">${c(p||s)}</metadata>
  <metadata name="Application">${m}</metadata>
   `)}function g(t,e,a){t.push(`<object id="${e}" type="model">
`),t.push(` <components>
`),a.forEach(o=>{D(t,o.id,o.transforms)}),t.push(` </components>
`),t.push(`</object>
`)}var D=(t,e=0,a=defMatrix)=>{t.push(`    <component objectid="${e}" transform="${matrix2str(a)}" />
`)};function h(t,e,a,o){t.push(`  <object id="${e}" type="model">
   <mesh>
    <vertices>
`);for(let n=0;n<a.length;n+=3)t.push(`     <vertex x="${a[n]}" y="${a[n+1]}" z="${a[n+2]}" />
`);t.push(`    </vertices>
    <triangles>
`);for(let n=0;n<o.length;n+=3)t.push(`     <triangle v1="${o[n]}" v2="${o[n+1]}" v3="${o[n+2]}" />
`);return t.push(`    </triangles>
   </mesh>
  </object>
`),t}var v={name:"[Content_Types].xml",content:`<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
<Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
<Default Extension="png" ContentType="image/png" />
</Types>`},k={name:"_rels/.rels",content:`<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Target="/3D/3dmodel.model" Id="rel-1" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
<Relationship Target="/Metadata/thumbnail.png" Id="rel-2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail" />
</Relationships>`};function E({simple:t=[],meshes:e=[],components:a=[],...o}){let n=[],m=[];return x(m,o),m.push(`  <resources>
`),t.forEach(({id:s,vertices:r,indices:p,transforms:d})=>{h(m,s,r,p),n.push(l(s,d))}),e.forEach(({id:s,vertices:r,indices:p,transforms:d})=>h(m,s,r,p)),a.forEach(({id:s,items:r,transforms:p})=>{g(s,r),r.push(l(s,p))}),m.push(`  </resources>
`),m.push(`<build>
`,...n,`</build>
`),m.push(`</model>
`),m.join("")}return C(M);})();
//# sourceMappingURL=index.js.map
