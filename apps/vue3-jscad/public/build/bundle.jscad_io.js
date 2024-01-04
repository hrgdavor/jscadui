var G4=Object.create;var Di=Object.defineProperty;var X4=Object.getOwnPropertyDescriptor;var Y4=Object.getOwnPropertyNames;var H4=Object.getPrototypeOf,j4=Object.prototype.hasOwnProperty;var m=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Vn=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Y4(t))!j4.call(e,n)&&n!==r&&Di(e,n,{get:()=>t[n],enumerable:!(s=X4(t,n))||s.enumerable});return e},Ti=(e,t,r)=>(Vn(e,t,"default"),r&&Vn(r,t,"default")),Z4=(e,t,r)=>(r=e!=null?G4(H4(e)):{},Vn(t||!e||!e.__esModule?Di(r,"default",{value:e,enumerable:!0}):r,e)),U4=e=>Vn(Di({},"__esModule",{value:!0}),e);var Ci=m((xU,G0)=>{var Ms=class{constructor(t,r){if(r=r||{},this.size=0,this.type="",this.isClosed=!1,this.encoding="utf8",this.buffer=null,this.length=0,!t||!Array.isArray(t))return;t.forEach(o=>{typeof o=="string"?this.length+=o.length:o instanceof ArrayBuffer&&(this.length+=o.byteLength)}),r.type&&(this.type=r.type.toLowerCase()),r.endings,r.encoding&&(this.encoding=r.encoding.toLowerCase()),r.length&&(this.length=r.length);let s,n;this.buffer=Buffer.allocUnsafe(this.length);for(let o=0;o<t.length;o++)switch(typeof t[o]){case"string":s=this.buffer.write(t[o],this.size,this.encoding),this.size=this.size+s;break;case"object":if(n=t[o],n instanceof ArrayBuffer){let i=new DataView(n);for(let c=0;c<n.byteLength;c++){let a=i.getUint8(c);s=this.buffer.writeUInt8(a,this.size,!1),this.size++}}break;default:break}}asBuffer(){return this.buffer.slice(0,this.size)}arrayBuffer(){return this.buffer.slice(0,this.size)}slice(t,r,s){return t=t||0,r=r||this.size,s=s||"",new Ms}stream(){return null}text(){return""}close(){this.isClosed||(this.isClosed=!0)}toString(){return""}};G0.exports=Ms});var $i=m((vU,X0)=>{var W4=Ci(),J4=()=>typeof window<"u"?window.Blob:W4;X0.exports=J4});var H0=m((EU,Y0)=>{var K4=$i(),Q4=K4(),eS=e=>{let{data:t,mimeType:r}=e;return new Q4(t,{type:r})};Y0.exports=eS});var Z0=m((yU,j0)=>{var Ri=class{constructor(t){this._buffer=t,this._pos=0}readInt8(){return this._decodeInt(8,!0)}readUInt8(){return this._decodeInt(8,!1)}readInt16(){return this._decodeInt(16,!0)}readUInt16(){return this._decodeInt(16,!1)}readInt32(){return this._decodeInt(32,!0)}readUInt32(){return this._decodeInt(32,!1)}readFloat(){return this._decodeFloat(23,8)}readDouble(){return this._decodeFloat(52,11)}readChar(){return this.readString(1)}readString(t){this._checkSize(t*8);let r=this._buffer.substr(this._pos,t);return this._pos+=t,r}seek(t){this._pos=t,this._checkSize(0)}getPosition(){return this._pos}getSize(){return this._buffer.length}_decodeFloat(t,r){let s=t+r+1,n=s>>3;this._checkSize(s);let o=Math.pow(2,r-1)-1,i=this._readBits(t+r,1,n),c=this._readBits(t,r,n),a=0,l=2,u=0,h=0;do{let f=this._readByte(++u,n);h=t%8||8;let d=1<<h;for(;d>>=1;)f&d&&(a+=1/l),l*=2}while(t-=h);return this._pos+=n,c===(o<<1)+1?a?NaN:i?-1/0:1/0:(1+i*-2)*(c||a?c?Math.pow(2,c-o)*(1+a):Math.pow(2,-o+1)*a:0)}_decodeInt(t,r){let s=this._readBits(0,t,t/8),n=Math.pow(2,t),o=r&&s>=n/2?s-n:s;return this._pos+=t/8,o}_shl(t,r){for(++r;--r;t=((t%=2147483647+1)&1073741824)===1073741824?t*2:(t-1073741824)*2+2147483647+1);return t}_readByte(t,r){return this._buffer.charCodeAt(this._pos+r-t-1)&255}_readBits(t,r,s){let n=(t+r)%8,o=t%8,i=s-(t>>3)-1,c=s+(-(t+r)>>3),a=i-c,l=this._readByte(i,s)>>o&(1<<(a?8-o:r))-1;for(a&&n&&(l+=(this._readByte(c++,s)&(1<<n)-1)<<(a--<<3)-o);a;)l+=this._shl(this._readByte(c++,s),(a--<<3)-o);return l}_checkSize(t){this._pos+Math.ceil(t/8)<this._buffer.length}};j0.exports=Ri});var Ii=m((AU,U0)=>{U0.exports={convertToBlob:H0(),makeBlob:$i(),BinaryReader:Z0(),Blob:Ci()}});var J0=m((bU,W0)=>{"use strict";var tS=e=>e&&Object.prototype.toString.call(e)==="[object Object]";function rS(e){if(!(e>0))return r=>r;var t=" ".repeat(e);return r=>{if(typeof r!="string")return r;let s=r.split(`
`);return s.length===1?t+r:s.map(n=>n.trim()===""?n:t+n).join(`
`)}}var sS=e=>e.split(`
`).filter(t=>t.trim()!=="").join(`
`);function nS(e,t){let r=t>0?`
`:"",s=rS(t);function n(o){let i="",c=!0,a;return o.some((u,h,f)=>{if(h===0)return a="<"+u,f.length===1;if(h===1){if(tS(u)){if(Object.keys(u).map(d=>{let g=u[d];Array.isArray(g)&&(g=g.join(" ")),a+=" "+d+'="'+g+'"'}),f.length===2)return!0;a+=">";return}a+=">"}switch(typeof u){case"string":case"number":case"boolean":case"undefined":i+=u+r;return}c=!1,i+=n(u)})?a+"/>"+r:c?a+sS(i)+"</"+o[0]+">"+r:a+r+s(i)+"</"+o[0]+">"+r}return n(e)}W0.exports=nS});var B=m((wU,Q0)=>{var K0=e=>e.reduce((t,r)=>Array.isArray(r)?t.concat(K0(r)):t.concat(r),[]);Q0.exports=K0});var tu=m((qU,eu)=>{var oS=e=>Object.assign({},e);eu.exports=oS});var su=m((SU,ru)=>{var iS=(e,t,r)=>(e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e[4]=t[4]+r[4],e[5]=t[5]+r[5],e[6]=t[6]+r[6],e[7]=t[7]+r[7],e[8]=t[8]+r[8],e[9]=t[9]+r[9],e[10]=t[10]+r[10],e[11]=t[11]+r[11],e[12]=t[12]+r[12],e[13]=t[13]+r[13],e[14]=t[14]+r[14],e[15]=t[15]+r[15],e);ru.exports=iS});var Gn=m((DU,nu)=>{var cS=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];nu.exports=cS});var iu=m((TU,ou)=>{var aS=Gn(),lS=e=>{let t=aS();return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t};ou.exports=lS});var Mi=m((CU,cu)=>{var uS=(e,t)=>(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e);cu.exports=uS});var lu=m(($U,au)=>{var fS=(e,t)=>{let r=t[0],s=t[1],n=t[2],o=t[3],i=t[4],c=t[5],a=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],p=t[13],x=t[14],v=t[15],y=r*c-s*i,b=r*a-n*i,E=r*l-o*i,q=s*a-n*c,w=s*l-o*c,D=n*l-o*a,T=u*p-h*g,A=u*x-f*g,S=u*v-d*g,$=h*x-f*p,C=h*v-d*p,F=f*v-d*x,R=y*F-b*C+E*$+q*S-w*A+D*T;return R?(R=1/R,e[0]=(c*F-a*C+l*$)*R,e[1]=(n*C-s*F-o*$)*R,e[2]=(p*D-x*w+v*q)*R,e[3]=(f*w-h*D-d*q)*R,e[4]=(a*S-i*F-l*A)*R,e[5]=(r*F-n*S+o*A)*R,e[6]=(x*E-g*D-v*b)*R,e[7]=(u*D-f*E+d*b)*R,e[8]=(i*C-c*S+l*T)*R,e[9]=(s*S-r*C-o*T)*R,e[10]=(g*w-p*E+v*y)*R,e[11]=(h*E-u*w-d*y)*R,e[12]=(c*A-i*$-a*T)*R,e[13]=(r*$-s*A+n*T)*R,e[14]=(p*b-g*q-x*y)*R,e[15]=(u*q-h*b+f*y)*R,e):null};au.exports=fS});var fu=m((RU,uu)=>{var hS=(e,t)=>e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]&&e[9]===t[9]&&e[10]===t[10]&&e[11]===t[11]&&e[12]===t[12]&&e[13]===t[13]&&e[14]===t[14]&&e[15]===t[15];uu.exports=hS});var j=m((IU,hu)=>{var pS=Math.PI*2;hu.exports={EPS:1e-5,NEPS:1e-13,TAU:pS,spatialResolution:1e5}});var Re=m((MU,du)=>{var{NEPS:dS}=j(),pu=e=>Math.abs(e)<dS?0:e,gS=e=>pu(Math.sin(e)),mS=e=>pu(Math.cos(e));du.exports={sin:gS,cos:mS}});var Fi=m((FU,gu)=>{var xS=e=>(e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e);gu.exports=xS});var Ni=m((NU,mu)=>{var{EPS:vS}=j(),{sin:ES,cos:yS}=Re(),AS=Fi(),bS=(e,t,r)=>{let[s,n,o]=r,i=s*s+n*n+o*o;if(Math.abs(i)<vS)return AS(e);let c=1/Math.sqrt(i);s*=c,n*=c,o*=c;let a=ES(t),l=yS(t),u=1-l;return e[0]=s*s*u+l,e[1]=n*s*u+o*a,e[2]=o*s*u-n*a,e[3]=0,e[4]=s*n*u-o*a,e[5]=n*n*u+l,e[6]=o*n*u+s*a,e[7]=0,e[8]=s*o*u+n*a,e[9]=n*o*u-s*a,e[10]=o*o*u+l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};mu.exports=bS});var vu=m((PU,xu)=>{var wS=(e,t)=>(e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e);xu.exports=wS});var yu=m((kU,Eu)=>{var{sin:Pi,cos:ki}=Re(),qS=(e,t,r,s)=>{let n=Pi(t),o=ki(t),i=Pi(r),c=ki(r),a=Pi(s),l=ki(s);return e[0]=c*o,e[1]=c*n,e[2]=-i,e[3]=0,e[4]=a*i*o-l*n,e[5]=l*o+a*i*n,e[6]=a*c,e[7]=0,e[8]=a*n+l*i*o,e[9]=l*i*n-a*o,e[10]=l*c,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};Eu.exports=qS});var bu=m((OU,Au)=>{var SS=(e,t)=>(e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=t[0],e[13]=t[1],e[14]=t[2],e[15]=1,e);Au.exports=SS});var qu=m((LU,wu)=>{var DS=Gn(),TS=(e,t,r,s,n,o,i,c,a,l,u,h,f,d,g,p)=>{let x=DS();return x[0]=e,x[1]=t,x[2]=r,x[3]=s,x[4]=n,x[5]=o,x[6]=i,x[7]=c,x[8]=a,x[9]=l,x[10]=u,x[11]=h,x[12]=f,x[13]=d,x[14]=g,x[15]=p,x};wu.exports=TS});var Oi=m((zU,Su)=>{var CS=(e,t)=>(e[0]=Math.abs(t[0]),e[1]=Math.abs(t[1]),e[2]=Math.abs(t[2]),e);Su.exports=CS});var Li=m((_U,Du)=>{var $S=(e,t,r)=>(e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e);Du.exports=$S});var Fs=m((BU,Tu)=>{var RS=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2];Tu.exports=RS});var $u=m((VU,Cu)=>{var IS=Fs(),MS=(e,t)=>{let r=e[0],s=e[1],n=e[2],o=t[0],i=t[1],c=t[2],a=Math.sqrt(r*r+s*s+n*n),l=Math.sqrt(o*o+i*i+c*c),u=a*l,h=u&&IS(e,t)/u;return Math.acos(Math.min(Math.max(h,-1),1))};Cu.exports=MS});var Ns=m((GU,Ru)=>{var FS=()=>[0,0,0];Ru.exports=FS});var Mu=m((XU,Iu)=>{var NS=Ns(),PS=e=>{let t=NS();return t[0]=e[0],t[1]=e[1],t[2]=e[2],t};Iu.exports=PS});var zi=m((YU,Fu)=>{var kS=(e,t)=>(e[0]=t[0],e[1]=t[1],e[2]=t[2],e);Fu.exports=kS});var kr=m((HU,Nu)=>{var OS=(e,t,r)=>{let s=t[0],n=t[1],o=t[2],i=r[0],c=r[1],a=r[2];return e[0]=n*a-o*c,e[1]=o*i-s*a,e[2]=s*c-n*i,e};Nu.exports=OS});var _i=m((jU,Pu)=>{var LS=(e,t)=>{let r=t[0]-e[0],s=t[1]-e[1],n=t[2]-e[2];return Math.sqrt(r*r+s*s+n*n)};Pu.exports=LS});var Ou=m((ZU,ku)=>{var zS=(e,t,r)=>(e[0]=t[0]/r[0],e[1]=t[1]/r[1],e[2]=t[2]/r[2],e);ku.exports=zS});var zu=m((UU,Lu)=>{var _S=(e,t)=>e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2];Lu.exports=_S});var Bu=m((WU,_u)=>{var BS=(e,t)=>(e[0]=t,e[1]=t,e[2]=t,e);_u.exports=BS});var Gu=m((JU,Vu)=>{var VS=Ns(),GS=(e,t,r)=>{let s=VS();return s[0]=e,s[1]=t,s[2]=r,s};Vu.exports=GS});var Yu=m((KU,Xu)=>{var XS=(e,t,r=0)=>(e[0]=t[0],e[1]=t[1],e[2]=r,e);Xu.exports=XS});var Bi=m((QU,Hu)=>{var YS=e=>{let t=e[0],r=e[1],s=e[2];return Math.sqrt(t*t+r*r+s*s)};Hu.exports=YS});var Zu=m((eW,ju)=>{var HS=(e,t,r,s)=>(e[0]=t[0]+s*(r[0]-t[0]),e[1]=t[1]+s*(r[1]-t[1]),e[2]=t[2]+s*(r[2]-t[2]),e);ju.exports=HS});var Vi=m((tW,Uu)=>{var jS=(e,t,r)=>(e[0]=Math.max(t[0],r[0]),e[1]=Math.max(t[1],r[1]),e[2]=Math.max(t[2],r[2]),e);Uu.exports=jS});var Gi=m((rW,Wu)=>{var ZS=(e,t,r)=>(e[0]=Math.min(t[0],r[0]),e[1]=Math.min(t[1],r[1]),e[2]=Math.min(t[2],r[2]),e);Wu.exports=ZS});var Ku=m((sW,Ju)=>{var US=(e,t,r)=>(e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e);Ju.exports=US});var e1=m((nW,Qu)=>{var WS=(e,t)=>(e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e);Qu.exports=WS});var Xn=m((oW,t1)=>{var JS=(e,t)=>{let r=t[0],s=t[1],n=t[2],o=r*r+s*s+n*n;return o>0&&(o=1/Math.sqrt(o)),e[0]=r*o,e[1]=s*o,e[2]=n*o,e};t1.exports=JS});var s1=m((iW,r1)=>{var KS=Oi(),QS=Ns(),eD=kr(),tD=(e,t)=>{let r=KS(QS(),t),s=0+(r[0]<r[1]&&r[0]<r[2]),n=0+(r[1]<=r[0]&&r[1]<r[2]),o=0+(r[2]<=r[0]&&r[2]<=r[1]);return eD(e,t,[s,n,o])};r1.exports=tD});var o1=m((cW,n1)=>{var rD=(e,t,r,s)=>{let n=[],o=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],o[0]=n[0],o[1]=n[1]*Math.cos(s)-n[2]*Math.sin(s),o[2]=n[1]*Math.sin(s)+n[2]*Math.cos(s),e[0]=o[0]+r[0],e[1]=o[1]+r[1],e[2]=o[2]+r[2],e};n1.exports=rD});var c1=m((aW,i1)=>{var sD=(e,t,r,s)=>{let n=[],o=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],n[2]=t[2]-r[2],o[0]=n[2]*Math.sin(s)+n[0]*Math.cos(s),o[1]=n[1],o[2]=n[2]*Math.cos(s)-n[0]*Math.sin(s),e[0]=o[0]+r[0],e[1]=o[1]+r[1],e[2]=o[2]+r[2],e};i1.exports=sD});var l1=m((lW,a1)=>{var nD=(e,t,r,s)=>{let n=[],o=[];return n[0]=t[0]-r[0],n[1]=t[1]-r[1],o[0]=n[0]*Math.cos(s)-n[1]*Math.sin(s),o[1]=n[0]*Math.sin(s)+n[1]*Math.cos(s),e[0]=o[0]+r[0],e[1]=o[1]+r[1],e[2]=t[2],e};a1.exports=nD});var Xi=m((uW,u1)=>{var oD=(e,t,r)=>(e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e);u1.exports=oD});var h1=m((fW,f1)=>{var iD=(e,t,r)=>(e[0]=Math.round(t[0]/r)*r+0,e[1]=Math.round(t[1]/r)*r+0,e[2]=Math.round(t[2]/r)*r+0,e);f1.exports=iD});var Yi=m((hW,p1)=>{var cD=(e,t)=>{let r=t[0]-e[0],s=t[1]-e[1],n=t[2]-e[2];return r*r+s*s+n*n};p1.exports=cD});var Hi=m((pW,d1)=>{var aD=e=>{let t=e[0],r=e[1],s=e[2];return t*t+r*r+s*s};d1.exports=aD});var Ps=m((dW,g1)=>{var lD=(e,t,r)=>(e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e);g1.exports=lD});var x1=m((gW,m1)=>{var uD=e=>`[${e[0].toFixed(7)}, ${e[1].toFixed(7)}, ${e[2].toFixed(7)}]`;m1.exports=uD});var E1=m((mW,v1)=>{var fD=(e,t,r)=>{let s=t[0],n=t[1],o=t[2],i=r[3]*s+r[7]*n+r[11]*o+r[15];return i=i||1,e[0]=(r[0]*s+r[4]*n+r[8]*o+r[12])/i,e[1]=(r[1]*s+r[5]*n+r[9]*o+r[13])/i,e[2]=(r[2]*s+r[6]*n+r[10]*o+r[14])/i,e};v1.exports=fD});var k=m((xW,y1)=>{y1.exports={abs:Oi(),add:Li(),angle:$u(),clone:Mu(),copy:zi(),create:Ns(),cross:kr(),distance:_i(),divide:Ou(),dot:Fs(),equals:zu(),fromScalar:Bu(),fromValues:Gu(),fromVec2:Yu(),length:Bi(),lerp:Zu(),max:Vi(),min:Gi(),multiply:Ku(),negate:e1(),normalize:Xn(),orthogonal:s1(),rotateX:o1(),rotateY:c1(),rotateZ:l1(),scale:Xi(),snap:h1(),squaredDistance:Yi(),squaredLength:Hi(),subtract:Ps(),toString:x1(),transform:E1()}});var b1=m((vW,A1)=>{var Jt=k(),hD=Ni(),pD=(e,t,r)=>{let s=Jt.normalize(Jt.create(),t),n=Jt.normalize(Jt.create(),r),o=Jt.cross(Jt.create(),n,s),i=Jt.dot(n,s);if(i===-1)return hD(e,Math.PI,Jt.orthogonal(o,s));let c=1/(1+i);return e[0]=o[0]*o[0]*c+i,e[1]=o[1]*o[0]*c-o[2],e[2]=o[2]*o[0]*c+o[1],e[3]=0,e[4]=o[0]*o[1]*c+o[2],e[5]=o[1]*o[1]*c+i,e[6]=o[2]*o[1]*c-o[0],e[7]=0,e[8]=o[0]*o[2]*c-o[1],e[9]=o[1]*o[2]*c+o[0],e[10]=o[2]*o[2]*c+i,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};A1.exports=pD});var q1=m((EW,w1)=>{var{sin:dD,cos:gD}=Re(),mD=(e,t)=>{let r=dD(t),s=gD(t);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=r,e[7]=0,e[8]=0,e[9]=-r,e[10]=s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};w1.exports=mD});var D1=m((yW,S1)=>{var{sin:xD,cos:vD}=Re(),ED=(e,t)=>{let r=xD(t),s=vD(t);return e[0]=s,e[1]=0,e[2]=-r,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=r,e[9]=0,e[10]=s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};S1.exports=ED});var C1=m((AW,T1)=>{var{sin:yD,cos:AD}=Re(),bD=(e,t)=>{let r=yD(t),s=AD(t);return e[0]=s,e[1]=r,e[2]=0,e[3]=0,e[4]=-r,e[5]=s,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e};T1.exports=bD});var R1=m((bW,$1)=>{var wD=e=>e[0]===1&&e[1]===0&&e[2]===0&&e[3]===0&&e[4]===0&&e[5]===1&&e[6]===0&&e[7]===0&&e[8]===0&&e[9]===0&&e[10]===1&&e[11]===0&&e[12]===0&&e[13]===0&&e[14]===0&&e[15]===1;$1.exports=wD});var M1=m((wW,I1)=>{var qD=e=>Ot(e[1])&&Ot(e[2])&&Ot(e[3])&&Ot(e[4])&&Ot(e[6])&&Ot(e[7])&&Ot(e[8])&&Ot(e[9])&&Ot(e[11])&&e[15]===1,Ot=e=>Math.abs(e)<Number.EPSILON;I1.exports=qD});var N1=m((qW,F1)=>{var SD=e=>{let t=e[4]*e[9]-e[8]*e[5],r=e[8]*e[1]-e[0]*e[9],s=e[0]*e[5]-e[4]*e[1];return t*e[2]+r*e[6]+s*e[10]<0};F1.exports=SD});var k1=m((SW,P1)=>{var DD=(e,t)=>{let[r,s,n,o]=t;return e[0]=1-2*r*r,e[1]=-2*s*r,e[2]=-2*n*r,e[3]=0,e[4]=-2*r*s,e[5]=1-2*s*s,e[6]=-2*n*s,e[7]=0,e[8]=-2*r*n,e[9]=-2*s*n,e[10]=1-2*n*n,e[11]=0,e[12]=2*r*o,e[13]=2*s*o,e[14]=2*n*o,e[15]=1,e};P1.exports=DD});var L1=m((DW,O1)=>{var TD=(e,t,r)=>{let s=t[0],n=t[1],o=t[2],i=t[3],c=t[4],a=t[5],l=t[6],u=t[7],h=t[8],f=t[9],d=t[10],g=t[11],p=t[12],x=t[13],v=t[14],y=t[15],b=r[0],E=r[1],q=r[2],w=r[3];return e[0]=b*s+E*c+q*h+w*p,e[1]=b*n+E*a+q*f+w*x,e[2]=b*o+E*l+q*d+w*v,e[3]=b*i+E*u+q*g+w*y,b=r[4],E=r[5],q=r[6],w=r[7],e[4]=b*s+E*c+q*h+w*p,e[5]=b*n+E*a+q*f+w*x,e[6]=b*o+E*l+q*d+w*v,e[7]=b*i+E*u+q*g+w*y,b=r[8],E=r[9],q=r[10],w=r[11],e[8]=b*s+E*c+q*h+w*p,e[9]=b*n+E*a+q*f+w*x,e[10]=b*o+E*l+q*d+w*v,e[11]=b*i+E*u+q*g+w*y,b=r[12],E=r[13],q=r[14],w=r[15],e[12]=b*s+E*c+q*h+w*p,e[13]=b*n+E*a+q*f+w*x,e[14]=b*o+E*l+q*d+w*v,e[15]=b*i+E*u+q*g+w*y,e};O1.exports=TD});var _1=m((TW,z1)=>{var{EPS:CD}=j(),{sin:$D,cos:RD}=Re(),ID=Mi(),MD=(e,t,r,s)=>{let[n,o,i]=s,c=n*n+o*o+i*i;if(Math.abs(c)<CD)return ID(e,t);let a=1/Math.sqrt(c);n*=a,o*=a,i*=a;let l=$D(r),u=RD(r),h=1-u,f=t[0],d=t[1],g=t[2],p=t[3],x=t[4],v=t[5],y=t[6],b=t[7],E=t[8],q=t[9],w=t[10],D=t[11],T=n*n*h+u,A=o*n*h+i*l,S=i*n*h-o*l,$=n*o*h-i*l,C=o*o*h+u,F=i*o*h+n*l,R=n*i*h+o*l,P=o*i*h-n*l,I=i*i*h+u;return e[0]=f*T+x*A+E*S,e[1]=d*T+v*A+q*S,e[2]=g*T+y*A+w*S,e[3]=p*T+b*A+D*S,e[4]=f*$+x*C+E*F,e[5]=d*$+v*C+q*F,e[6]=g*$+y*C+w*F,e[7]=p*$+b*C+D*F,e[8]=f*R+x*P+E*I,e[9]=d*R+v*P+q*I,e[10]=g*R+y*P+w*I,e[11]=p*R+b*P+D*I,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e};z1.exports=MD});var V1=m((CW,B1)=>{var{sin:FD,cos:ND}=Re(),PD=(e,t,r)=>{let s=FD(r),n=ND(r),o=t[4],i=t[5],c=t[6],a=t[7],l=t[8],u=t[9],h=t[10],f=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=o*n+l*s,e[5]=i*n+u*s,e[6]=c*n+h*s,e[7]=a*n+f*s,e[8]=l*n-o*s,e[9]=u*n-i*s,e[10]=h*n-c*s,e[11]=f*n-a*s,e};B1.exports=PD});var X1=m(($W,G1)=>{var{sin:kD,cos:OD}=Re(),LD=(e,t,r)=>{let s=kD(r),n=OD(r),o=t[0],i=t[1],c=t[2],a=t[3],l=t[8],u=t[9],h=t[10],f=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=o*n-l*s,e[1]=i*n-u*s,e[2]=c*n-h*s,e[3]=a*n-f*s,e[8]=o*s+l*n,e[9]=i*s+u*n,e[10]=c*s+h*n,e[11]=a*s+f*n,e};G1.exports=LD});var H1=m((RW,Y1)=>{var{sin:zD,cos:_D}=Re(),BD=(e,t,r)=>{let s=zD(r),n=_D(r),o=t[0],i=t[1],c=t[2],a=t[3],l=t[4],u=t[5],h=t[6],f=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=o*n+l*s,e[1]=i*n+u*s,e[2]=c*n+h*s,e[3]=a*n+f*s,e[4]=l*n-o*s,e[5]=u*n-i*s,e[6]=h*n-c*s,e[7]=f*n-a*s,e};Y1.exports=BD});var Z1=m((IW,j1)=>{var VD=(e,t,r)=>{let s=r[0],n=r[1],o=r[2];return e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s,e[3]=t[3]*s,e[4]=t[4]*n,e[5]=t[5]*n,e[6]=t[6]*n,e[7]=t[7]*n,e[8]=t[8]*o,e[9]=t[9]*o,e[10]=t[10]*o,e[11]=t[11]*o,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e};j1.exports=VD});var W1=m((MW,U1)=>{var GD=(e,t,r)=>(e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e[4]=t[4]-r[4],e[5]=t[5]-r[5],e[6]=t[6]-r[6],e[7]=t[7]-r[7],e[8]=t[8]-r[8],e[9]=t[9]-r[9],e[10]=t[10]-r[10],e[11]=t[11]-r[11],e[12]=t[12]-r[12],e[13]=t[13]-r[13],e[14]=t[14]-r[14],e[15]=t[15]-r[15],e);U1.exports=GD});var K1=m((FW,J1)=>{var XD=e=>e.map(t=>t.toFixed(7)).toString();J1.exports=XD});var ef=m((NW,Q1)=>{var YD=(e,t,r)=>{let s=r[0],n=r[1],o=r[2],i,c,a,l,u,h,f,d,g,p,x,v;return t===e?(e[12]=t[0]*s+t[4]*n+t[8]*o+t[12],e[13]=t[1]*s+t[5]*n+t[9]*o+t[13],e[14]=t[2]*s+t[6]*n+t[10]*o+t[14],e[15]=t[3]*s+t[7]*n+t[11]*o+t[15]):(i=t[0],c=t[1],a=t[2],l=t[3],u=t[4],h=t[5],f=t[6],d=t[7],g=t[8],p=t[9],x=t[10],v=t[11],e[0]=i,e[1]=c,e[2]=a,e[3]=l,e[4]=u,e[5]=h,e[6]=f,e[7]=d,e[8]=g,e[9]=p,e[10]=x,e[11]=v,e[12]=i*s+u*n+g*o+t[12],e[13]=c*s+h*n+p*o+t[13],e[14]=a*s+f*n+x*o+t[14],e[15]=l*s+d*n+v*o+t[15]),e};Q1.exports=YD});var ie=m((PW,tf)=>{tf.exports={add:su(),clone:iu(),copy:Mi(),create:Gn(),invert:lu(),equals:fu(),fromRotation:Ni(),fromScaling:vu(),fromTaitBryanRotation:yu(),fromTranslation:bu(),fromValues:qu(),fromVectorRotation:b1(),fromXRotation:q1(),fromYRotation:D1(),fromZRotation:C1(),identity:Fi(),isIdentity:R1(),isOnlyTransformScale:M1(),isMirroring:N1(),mirrorByPlane:k1(),multiply:L1(),rotate:_1(),rotateX:V1(),rotateY:X1(),rotateZ:H1(),scale:Z1(),subtract:W1(),toString:K1(),translate:ef()}});var ks=m((kW,rf)=>{var HD=ie(),jD=e=>(e===void 0&&(e=[]),{sides:e,transforms:HD.create()});rf.exports=jD});var nf=m((OW,sf)=>{var ZD=(e,t)=>(e[0]=Math.abs(t[0]),e[1]=Math.abs(t[1]),e);sf.exports=ZD});var cf=m((LW,of)=>{var UD=(e,t,r)=>(e[0]=t[0]+r[0],e[1]=t[1]+r[1],e);of.exports=UD});var Yn=m((zW,af)=>{var WD=e=>Math.atan2(e[1],e[0]);af.exports=WD});var uf=m((_W,lf)=>{lf.exports=Yn()});var hf=m((BW,ff)=>{var JD=Yn(),KD=e=>JD(e)*57.29577951308232;ff.exports=KD});var Os=m((VW,pf)=>{var QD=()=>[0,0];pf.exports=QD});var gf=m((GW,df)=>{var eT=Os(),tT=e=>{let t=eT();return t[0]=e[0],t[1]=e[1],t};df.exports=tT});var xf=m((XW,mf)=>{var rT=(e,t)=>(e[0]=t[0],e[1]=t[1],e);mf.exports=rT});var Ef=m((YW,vf)=>{var sT=(e,t,r)=>(e[0]=0,e[1]=0,e[2]=t[0]*r[1]-t[1]*r[0],e);vf.exports=sT});var Af=m((HW,yf)=>{var nT=(e,t)=>{let r=t[0]-e[0],s=t[1]-e[1];return Math.sqrt(r*r+s*s)};yf.exports=nT});var wf=m((jW,bf)=>{var oT=(e,t,r)=>(e[0]=t[0]/r[0],e[1]=t[1]/r[1],e);bf.exports=oT});var Sf=m((ZW,qf)=>{var iT=(e,t)=>e[0]*t[0]+e[1]*t[1];qf.exports=iT});var Tf=m((UW,Df)=>{var cT=(e,t)=>e[0]===t[0]&&e[1]===t[1];Df.exports=cT});var ji=m((WW,Cf)=>{var{sin:aT,cos:lT}=Re(),uT=(e,t)=>(e[0]=lT(t),e[1]=aT(t),e);Cf.exports=uT});var Rf=m((JW,$f)=>{var fT=ji(),hT=(e,t)=>fT(e,t*.017453292519943295);$f.exports=hT});var Mf=m((KW,If)=>{var pT=(e,t)=>(e[0]=t,e[1]=t,e);If.exports=pT});var Nf=m((QW,Ff)=>{var dT=Os(),gT=(e,t)=>{let r=dT();return r[0]=e,r[1]=t,r};Ff.exports=gT});var kf=m((eJ,Pf)=>{var mT=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]);Pf.exports=mT});var Lf=m((tJ,Of)=>{var xT=(e,t,r,s)=>{let n=t[0],o=t[1];return e[0]=n+s*(r[0]-n),e[1]=o+s*(r[1]-o),e};Of.exports=xT});var _f=m((rJ,zf)=>{var vT=(e,t,r)=>(e[0]=Math.max(t[0],r[0]),e[1]=Math.max(t[1],r[1]),e);zf.exports=vT});var Vf=m((sJ,Bf)=>{var ET=(e,t,r)=>(e[0]=Math.min(t[0],r[0]),e[1]=Math.min(t[1],r[1]),e);Bf.exports=ET});var Xf=m((nJ,Gf)=>{var yT=(e,t,r)=>(e[0]=t[0]*r[0],e[1]=t[1]*r[1],e);Gf.exports=yT});var Hf=m((oJ,Yf)=>{var AT=(e,t)=>(e[0]=-t[0],e[1]=-t[1],e);Yf.exports=AT});var Zi=m((iJ,jf)=>{var bT=(e,t,r,s)=>{let n=t[0]-r[0],o=t[1]-r[1],i=Math.cos(s),c=Math.sin(s);return e[0]=n*i-o*c+r[0],e[1]=n*c+o*i+r[1],e};jf.exports=bT});var Uf=m((cJ,Zf)=>{var{TAU:wT}=j(),qT=Os(),ST=Zi(),DT=(e,t)=>ST(e,t,qT(),wT/4);Zf.exports=DT});var Jf=m((aJ,Wf)=>{var TT=(e,t)=>{let r=t[0],s=t[1],n=r*r+s*s;return n>0&&(n=1/Math.sqrt(n)),e[0]=r*n,e[1]=s*n,e};Wf.exports=TT});var Qf=m((lJ,Kf)=>{var CT=(e,t,r)=>(e[0]=t[0]*r,e[1]=t[1]*r,e);Kf.exports=CT});var th=m((uJ,eh)=>{var $T=(e,t,r)=>(e[0]=Math.round(t[0]/r)*r+0,e[1]=Math.round(t[1]/r)*r+0,e);eh.exports=$T});var sh=m((fJ,rh)=>{var RT=(e,t)=>{let r=t[0]-e[0],s=t[1]-e[1];return r*r+s*s};rh.exports=RT});var oh=m((hJ,nh)=>{var IT=e=>{let t=e[0],r=e[1];return t*t+r*r};nh.exports=IT});var ch=m((pJ,ih)=>{var MT=(e,t,r)=>(e[0]=t[0]-r[0],e[1]=t[1]-r[1],e);ih.exports=MT});var lh=m((dJ,ah)=>{var FT=e=>`[${e[0].toFixed(7)}, ${e[1].toFixed(7)}]`;ah.exports=FT});var fh=m((gJ,uh)=>{var NT=(e,t,r)=>{let s=t[0],n=t[1];return e[0]=r[0]*s+r[4]*n+r[12],e[1]=r[1]*s+r[5]*n+r[13],e};uh.exports=NT});var Y=m((mJ,hh)=>{hh.exports={abs:nf(),add:cf(),angle:uf(),angleDegrees:hf(),angleRadians:Yn(),clone:gf(),copy:xf(),create:Os(),cross:Ef(),distance:Af(),divide:wf(),dot:Sf(),equals:Tf(),fromAngleDegrees:Rf(),fromAngleRadians:ji(),fromScalar:Mf(),fromValues:Nf(),length:kf(),lerp:Lf(),max:_f(),min:Vf(),multiply:Xf(),negate:Hf(),normal:Uf(),normalize:Jf(),rotate:Zi(),scale:Qf(),snap:th(),squaredDistance:sh(),squaredLength:oh(),subtract:ch(),toString:lh(),transform:fh()}});var dh=m((xJ,ph)=>{var Ui=Y(),PT=ks(),kT=e=>{if(!Array.isArray(e))throw new Error("the given points must be an array");let t=e.length;if(t<3)throw new Error("the given points must define a closed geometry with three or more points");Ui.equals(e[0],e[t-1])&&--t;let r=[],s=e[t-1];for(let n=0;n<t;n++){let o=e[n];r.push([Ui.clone(s),Ui.clone(o)]),s=o}return PT(r)};ph.exports=kT});var xh=m((vJ,mh)=>{var OT=ie(),gh=Y(),LT=ks(),zT=e=>{if(e[0]!==0)throw new Error("invalid compact binary data");let t=LT();t.transforms=OT.clone(e.slice(1,17));for(let r=21;r<e.length;r+=4){let s=gh.fromValues(e[r+0],e[r+1]),n=gh.fromValues(e[r+2],e[r+3]);t.sides.push([s,n])}return e[17]>=0&&(t.color=[e[17],e[18],e[19],e[20]]),t};mh.exports=zT});var Wi=m((EJ,vh)=>{var _T=e=>!!(e&&typeof e=="object"&&"sides"in e&&"transforms"in e&&Array.isArray(e.sides)&&"length"in e.transforms);vh.exports=_T});var Ah=m((yJ,yh)=>{var Eh=ie(),Hn=Y(),BT=e=>(Eh.isIdentity(e.transforms)||(e.sides=e.sides.map(t=>{let r=Hn.transform(Hn.create(),t[0],e.transforms),s=Hn.transform(Hn.create(),t[1],e.transforms);return[r,s]}),e.transforms=Eh.create()),e);yh.exports=BT});var Or=m((AJ,bh)=>{var VT=Ah(),GT=e=>VT(e).sides;bh.exports=GT});var qh=m((bJ,wh)=>{var XT=ks(),YT=Or(),HT=e=>{let r=YT(e).map(s=>[s[1],s[0]]);return r.reverse(),XT(r)};wh.exports=HT});var Ji=m((wJ,Sh)=>{var Ls=Y(),jT=Or(),ZT=e=>{let t=new Map,r=s=>{let n=s.toString();return t.has(n)?t.get(n):(t.set(n,s),s)};return e.map(s=>s.map(r))},UT=e=>{let t=new Map;return ZT(e).forEach(s=>{t.has(s[0])?t.get(s[0]).push(s):t.set(s[0],[s])}),t},WT=e=>{let t=UT(jT(e)),r=[];for(;;){let s;for(let[i,c]of t){if(s=c.shift(),!s){t.delete(i);continue}break}if(s===void 0)break;let n=[],o=s[0];for(;;){n.push(s[0]);let i=s[1];if(i===o)break;let c=t.get(i);if(!c)throw new Error(`geometry is not closed at vertex ${i}`);let a=JT(s,c);c.length===0&&t.delete(i),s=a}n.length>0&&n.push(n.shift()),r.push(n)}return t.clear(),r},JT=(e,t)=>{if(t.length===1)return t.pop();let r=Ls.create(),s=Ls.angleDegrees(Ls.subtract(r,e[1],e[0])),n,o;t.forEach((c,a)=>{let u=Ls.angleDegrees(Ls.subtract(r,c[1],c[0]))-s;u<-180&&(u+=360),u>=180&&(u-=360),(o===void 0||u>n)&&(o=a,n=u)});let i=t[o];return t.splice(o,1),i};Sh.exports=WT});var Th=m((qJ,Dh)=>{var KT=Or(),QT=e=>{let r=KT(e).map(s=>s[0]);return r.length>0&&r.push(r.shift()),r};Dh.exports=QT});var Rh=m((SJ,$h)=>{var Ch=Y(),e7=Or(),t7=e=>{let t=e7(e),r="geom2 ("+t.length+` sides):
[
`;return t.forEach(s=>{r+="  ["+Ch.toString(s[0])+", "+Ch.toString(s[1])+`]
`}),r+=`]
`,r};$h.exports=t7});var Mh=m((DJ,Ih)=>{var r7=e=>{let t=e.sides,r=e.transforms,s=[-1,-1,-1,-1];e.color&&(s=e.color);let n=new Float32Array(1+16+4+t.length*4);n[0]=0,n[1]=r[0],n[2]=r[1],n[3]=r[2],n[4]=r[3],n[5]=r[4],n[6]=r[5],n[7]=r[6],n[8]=r[7],n[9]=r[8],n[10]=r[9],n[11]=r[10],n[12]=r[11],n[13]=r[12],n[14]=r[13],n[15]=r[14],n[16]=r[15],n[17]=s[0],n[18]=s[1],n[19]=s[2],n[20]=s[3];for(let o=0;o<t.length;o++){let i=o*4+21,c=t[o][0],a=t[o][1];n[i+0]=c[0],n[i+1]=c[1],n[i+2]=a[0],n[i+3]=a[1]}return n};Ih.exports=r7});var Ph=m((TJ,Nh)=>{var Fh=ie(),s7=(e,t)=>{let r=Fh.multiply(Fh.create(),e,t.transforms);return Object.assign({},t,{transforms:r})};Nh.exports=s7});var Oh=m((CJ,kh)=>{var n7=Y(),o7=Wi(),i7=Ji(),c7=e=>{if(!o7(e))throw new Error("invalid geom2 structure");if(i7(e),e.sides.forEach(t=>{if(n7.equals(t[0],t[1]))throw new Error(`geom2 self-edge ${t[0]}`)}),!e.transforms.every(Number.isFinite))throw new Error(`geom2 invalid transforms ${e.transforms}`)};kh.exports=c7});var G=m(($J,Lh)=>{Lh.exports={clone:tu(),create:ks(),fromPoints:dh(),fromCompactBinary:xh(),isA:Wi(),reverse:qh(),toOutlines:Ji(),toPoints:Th(),toSides:Or(),toString:Rh(),toCompactBinary:Mh(),transform:Ph(),validate:Oh()}});var _h=m((RJ,zh)=>{var a7=e=>Object.assign({},e);zh.exports=a7});var zs=m((IJ,Bh)=>{var l7=ie(),u7=e=>(e===void 0&&(e=[]),{polygons:e,transforms:l7.create()});Bh.exports=u7});var xr=m((MJ,Vh)=>{var f7=e=>((e===void 0||e.length<3)&&(e=[]),{vertices:e});Vh.exports=f7});var Xh=m((FJ,Gh)=>{var h7=xr(),p7=k(),d7=(...e)=>{let t,r;return e.length===1?(t=h7(),r=e[0]):(t=e[0],r=e[1]),t.vertices=r.vertices.map(s=>p7.clone(s)),t};Gh.exports=d7});var Hh=m((NJ,Yh)=>{var g7=k(),m7=xr(),x7=e=>{let t=e.map(r=>g7.clone(r));return m7(t)};Yh.exports=x7});var Zh=m((PJ,jh)=>{var v7=xr(),E7=(e,t)=>{let r=v7(e);return r.plane=t,r};jh.exports=E7});var _s=m((kJ,Uh)=>{var y7=()=>[0,0,0,0];Uh.exports=y7});var Ki=m((OJ,Wh)=>{var A7=_s(),b7=e=>{let t=A7();return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t};Wh.exports=b7});var Qi=m((LJ,Jh)=>{var w7=(e,t)=>(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e);Jh.exports=w7});var ec=m((zJ,Kh)=>{var q7=(e,t)=>e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3];Kh.exports=q7});var tc=m((_J,Qh)=>{var S7=(e,t)=>(e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e);Qh.exports=S7});var t2=m((BJ,e2)=>{var rc=k(),D7=(e,t,r)=>{let s=rc.normalize(rc.create(),t),n=rc.dot(r,s);return e[0]=s[0],e[1]=s[1],e[2]=s[2],e[3]=n,e};e2.exports=D7});var sc=m((VJ,r2)=>{var T7=_s(),C7=(e,t,r,s)=>{let n=T7();return n[0]=e,n[1]=t,n[2]=r,n[3]=s,n};r2.exports=C7});var nc=m((GJ,s2)=>{var bt=k(),$7=(e,...t)=>{let r=t.length,s=bt.create(),n=bt.create(),o=i=>{let c=t[i],a=t[(i+1)%r],l=t[(i+2)%r];return bt.subtract(s,a,c),bt.subtract(n,l,c),bt.cross(s,s,n),bt.normalize(s,s),s};return e[0]=0,e[1]=0,e[2]=0,r===3?bt.copy(e,o(0)):(t.forEach((i,c)=>{bt.add(e,e,o(c))}),bt.normalize(e,e)),e[3]=bt.dot(e,t[0]),e};s2.exports=$7});var o2=m((XJ,n2)=>{var{EPS:oc}=j(),Le=k(),R7=(e,t,r,s)=>{let n=Le.subtract(Le.create(),r,t),o=Le.subtract(Le.create(),s,t);Le.length(n)<oc&&(n=Le.orthogonal(n,o)),Le.length(o)<oc&&(o=Le.orthogonal(o,n));let i=Le.cross(Le.create(),n,o);Le.length(i)<oc&&(o=Le.orthogonal(o,n),i=Le.cross(i,n,o)),i=Le.normalize(i,i);let c=Le.dot(i,t);return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=c,e};n2.exports=R7});var c2=m((YJ,i2)=>{var I7=k(),M7=(e,t)=>{let r=t[0]*e[0]+t[1]*e[1]+t[2]*e[2]-e[3],s=t[0]-r*e[0],n=t[1]-r*e[1],o=t[2]-r*e[2];return I7.fromValues(s,n,o)};i2.exports=M7});var ic=m((HJ,a2)=>{var F7=k(),N7=(e,t)=>F7.dot(e,t)-e[3];a2.exports=N7});var cc=m((jJ,l2)=>{var P7=e=>`(${e[0].toFixed(9)}, ${e[1].toFixed(9)}, ${e[2].toFixed(9)}, ${e[3].toFixed(9)})`;l2.exports=P7});var f2=m((ZJ,u2)=>{var k7=ie(),ze=k(),O7=nc(),L7=tc(),z7=(e,t,r)=>{let s=k7.isMirroring(r),n=ze.orthogonal(ze.create(),t),o=ze.cross(n,t,n),i=ze.cross(ze.create(),t,o),c=ze.fromScalar(ze.create(),t[3]);ze.multiply(c,c,t);let a=ze.add(ze.create(),c,o),l=ze.add(ze.create(),c,i);return c=ze.transform(c,c,r),a=ze.transform(a,a,r),l=ze.transform(l,l,r),O7(e,c,a,l),s&&L7(e,e),e};u2.exports=z7});var ht=m((UJ,h2)=>{h2.exports={clone:Ki(),copy:Qi(),create:_s(),equals:ec(),flip:tc(),fromNormalAndPoint:t2(),fromValues:sc(),fromPoints:nc(),fromPointsRandom:o2(),projectionOfPoint:c2(),signedDistanceToPoint:ic(),toString:cc(),transform:f2()}});var g2=m((WJ,d2)=>{var p2=ht(),_7=xr(),B7=e=>{let t=e.vertices.slice().reverse(),r=_7(t);return e.plane&&(r.plane=p2.flip(p2.create(),e.plane)),r};d2.exports=B7});var ac=m((JJ,m2)=>{var V7=e=>!!(e&&typeof e=="object"&&"vertices"in e&&Array.isArray(e.vertices));m2.exports=V7});var lc=m((KJ,v2)=>{var x2=ht(),vr=k(),G7=e=>X7(e.vertices),X7=e=>{let t=e.length;if(t>2){let r=x2.fromPoints(x2.create(),...e),s=e[t-2],n=e[t-1];for(let o=0;o<t;o++){let i=e[o];if(!Y7(s,n,i,r))return!1;s=n,n=i}}return!0},Y7=(e,t,r,s)=>{let n=vr.cross(vr.create(),vr.subtract(vr.create(),t,e),vr.subtract(vr.create(),r,t));return vr.dot(n,s)>=0};v2.exports=G7});var jn=m((QJ,y2)=>{var E2=ht(),H7=e=>(e.plane||(e.plane=E2.fromPoints(E2.create(),...e.vertices)),e.plane);y2.exports=H7});var uc=m((eK,A2)=>{var j7=jn(),Z7=e=>{let t=e.vertices.length;if(t<3)return 0;let r=e.vertices,s=j7(e),n=Math.abs(s[0]),o=Math.abs(s[1]),i=Math.abs(s[2]);if(n+o+i===0)return 0;let c=3;n>o&&n>i?c=1:o>i&&(c=2);let a=0,l=0,u=1,h=2;switch(c){case 1:for(u=1;u<t;u++)l=u-1,h=(u+1)%t,a+=r[u][1]*(r[h][2]-r[l][2]);a+=r[0][1]*(r[1][2]-r[t-1][2]),a/=2*s[0];break;case 2:for(u=1;u<t;u++)l=u-1,h=(u+1)%t,a+=r[u][2]*(r[h][0]-r[l][0]);a+=r[0][2]*(r[1][0]-r[t-1][0]),a/=2*s[1];break;case 3:default:for(u=1;u<t;u++)l=u-1,h=(u+1)%t,a+=r[u][0]*(r[h][1]-r[l][1]);a+=r[0][0]*(r[1][1]-r[t-1][1]),a/=2*s[2];break}return a};A2.exports=Z7});var w2=m((tK,b2)=>{var Bs=k(),U7=e=>{let t=e.vertices,r=t.length,s=r===0?Bs.create():Bs.clone(t[0]),n=Bs.clone(s);for(let o=1;o<r;o++)Bs.min(s,s,t[o]),Bs.max(n,n,t[o]);return[s,n]};b2.exports=U7});var S2=m((rK,q2)=>{var W7=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3];q2.exports=W7});var T2=m((sK,D2)=>{var J7=(e,t)=>(e[0]=t,e[1]=t,e[2]=t,e[3]=t,e);D2.exports=J7});var $2=m((nK,C2)=>{var K7=(e,t,r)=>{let[s,n,o,i]=t;return e[0]=r[0]*s+r[4]*n+r[8]*o+r[12]*i,e[1]=r[1]*s+r[5]*n+r[9]*o+r[13]*i,e[2]=r[2]*s+r[6]*n+r[10]*o+r[14]*i,e[3]=r[3]*s+r[7]*n+r[11]*o+r[15]*i,e};C2.exports=K7});var fc=m((oK,R2)=>{R2.exports={clone:Ki(),copy:Qi(),create:_s(),dot:S2(),equals:ec(),fromScalar:T2(),fromValues:sc(),toString:cc(),transform:$2()}});var F2=m((cK,M2)=>{var iK=k(),Q7=fc(),I2=new WeakMap,e8=e=>{let t=I2.get(e);if(t)return t;let r=e.vertices,s=Q7.create();if(r.length===0)return s[0]=0,s[1]=0,s[2]=0,s[3]=0,s;let n=r[0],o=n,i=n,c=n,a=n,l=n;r.forEach(d=>{n[0]>d[0]&&(n=d),o[1]>d[1]&&(o=d),i[2]>d[2]&&(i=d),c[0]<d[0]&&(c=d),a[1]<d[1]&&(a=d),l[2]<d[2]&&(l=d)}),s[0]=(n[0]+c[0])*.5,s[1]=(o[1]+a[1])*.5,s[2]=(i[2]+l[2])*.5;let u=s[0]-c[0],h=s[1]-a[1],f=s[2]-l[2];return s[3]=Math.sqrt(u*u+h*h+f*f),I2.set(e,s),s};M2.exports=e8});var P2=m((aK,N2)=>{var hc=k(),t8=e=>{let t=0,r=e.vertices,s=hc.create();for(let n=0;n<r.length-2;n++)hc.cross(s,r[n+1],r[n+2]),t+=hc.dot(r[0],s);return t/=6,t};N2.exports=t8});var O2=m((lK,k2)=>{var r8=e=>e.vertices;k2.exports=r8});var z2=m((uK,L2)=>{var s8=k(),n8=e=>{let t="poly3: vertices: [";return e.vertices.forEach(r=>{t+=`${s8.toString(r)}, `}),t+="]",t};L2.exports=n8});var V2=m((fK,B2)=>{var o8=ie(),_2=k(),i8=xr(),c8=(e,t)=>{let r=t.vertices.map(s=>_2.transform(_2.create(),s,e));return o8.isMirroring(e)&&r.reverse(),i8(r)};B2.exports=c8});var X2=m((hK,G2)=>{var a8=ic(),{NEPS:l8}=j(),u8=k(),f8=ac(),h8=lc(),p8=uc(),d8=jn(),g8=e=>{if(!f8(e))throw new Error("invalid poly3 structure");if(e.vertices.length<3)throw new Error(`poly3 not enough vertices ${e.vertices.length}`);if(p8(e)<=0)throw new Error("poly3 area must be greater than zero");for(let t=0;t<e.vertices.length;t++)if(u8.equals(e.vertices[t],e.vertices[(t+1)%e.vertices.length]))throw new Error(`poly3 duplicate vertex ${e.vertices[t]}`);if(!h8(e))throw new Error("poly3 must be convex");if(e.vertices.forEach(t=>{if(!t.every(Number.isFinite))throw new Error(`poly3 invalid vertex ${t}`)}),e.vertices.length>3){let t=d8(e);e.vertices.forEach(r=>{let s=Math.abs(a8(t,r));if(s>l8)throw new Error(`poly3 must be coplanar: vertex ${r} distance ${s}`)})}};G2.exports=g8});var H=m((pK,Y2)=>{Y2.exports={clone:Xh(),create:xr(),fromPoints:Hh(),fromPointsAndPlane:Zh(),invert:g2(),isA:ac(),isConvex:lc(),measureArea:uc(),measureBoundingBox:w2(),measureBoundingSphere:F2(),measureSignedVolume:P2(),plane:jn(),toPoints:O2(),toString:z2(),transform:V2(),validate:X2()}});var j2=m((dK,H2)=>{var m8=H(),x8=zs(),v8=e=>{if(!Array.isArray(e))throw new Error("the given points must be an array");let t=e.map((s,n)=>m8.create(s));return x8(t)};H2.exports=v8});var U2=m((gK,Z2)=>{var E8=k(),y8=ie(),A8=H(),b8=zs(),w8=e=>{if(e[0]!==1)throw new Error("invalid compact binary data");let t=b8();t.transforms=y8.clone(e.slice(1,17));let r=e[21],s=22,n=e.length-r*3;for(;n<e.length;){let o=e[s];s++;let i=[];for(let c=0;c<o;c++)i.push(E8.fromValues(e[n],e[n+1],e[n+2])),n+=3;t.polygons.push(A8.create(i))}return e[17]>=0&&(t.color=[e[17],e[18],e[19],e[20]]),t};Z2.exports=w8});var K2=m((mK,J2)=>{var W2=ie(),q8=H(),S8=e=>(W2.isIdentity(e.transforms)||(e.polygons=e.polygons.map(t=>q8.transform(e.transforms,t)),e.transforms=W2.create()),e);J2.exports=S8});var Vs=m((xK,Q2)=>{var D8=K2(),T8=e=>D8(e).polygons;Q2.exports=T8});var tp=m((vK,ep)=>{var C8=H(),$8=zs(),R8=Vs(),I8=e=>{let r=R8(e).map(s=>C8.invert(s));return $8(r)};ep.exports=I8});var pc=m((EK,rp)=>{var M8=e=>!!(e&&typeof e=="object"&&"polygons"in e&&"transforms"in e&&Array.isArray(e.polygons)&&"length"in e.transforms);rp.exports=M8});var np=m((yK,sp)=>{var F8=H(),N8=Vs(),P8=e=>N8(e).map(s=>F8.toPoints(s));sp.exports=P8});var ip=m((AK,op)=>{var k8=H(),O8=Vs(),L8=e=>{let t=O8(e),r="geom3 ("+t.length+` polygons):
`;return t.forEach(s=>{r+="  "+k8.toString(s)+`
`}),r};op.exports=L8});var ap=m((bK,cp)=>{var z8=H(),_8=e=>{let t=e.polygons,r=e.transforms,s=t.length,n=t.reduce((l,u)=>l+u.vertices.length,0),o=[-1,-1,-1,-1];e.color&&(o=e.color);let i=new Float32Array(1+16+4+1+s+n*3);i[0]=1,i[1]=r[0],i[2]=r[1],i[3]=r[2],i[4]=r[3],i[5]=r[4],i[6]=r[5],i[7]=r[6],i[8]=r[7],i[9]=r[8],i[10]=r[9],i[11]=r[10],i[12]=r[11],i[13]=r[12],i[14]=r[13],i[15]=r[14],i[16]=r[15],i[17]=o[0],i[18]=o[1],i[19]=o[2],i[20]=o[3],i[21]=n;let c=22,a=c+s;return t.forEach(l=>{let u=z8.toPoints(l);i[c]=u.length,c++;for(let h=0;h<u.length;h++){let f=u[h];i[a+0]=f[0],i[a+1]=f[1],i[a+2]=f[2],a+=3}}),i};cp.exports=_8});var fp=m((wK,up)=>{var lp=ie(),B8=(e,t)=>{let r=lp.multiply(lp.create(),e,t.transforms);return Object.assign({},t,{transforms:r})};up.exports=B8});var pp=m((qK,hp)=>{var V8=H(),G8=pc(),X8=e=>{if(!G8(e))throw new Error("invalid geom3 structure");if(e.polygons.forEach(V8.validate),Y8(e),!e.transforms.every(Number.isFinite))throw new Error(`geom3 invalid transforms ${e.transforms}`)},Y8=e=>{let t=new Map;e.polygons.forEach(({vertices:s})=>{s.forEach((n,o)=>{let i=`${n}`,c=`${s[(o+1)%s.length]}`,a=`${i}/${c}`,l=t.has(a)?t.get(a):0;t.set(a,l+1)})});let r=[];if(t.forEach((s,n)=>{let o=n.split("/").reverse().join("/"),i=t.get(o);s!==i&&r.push(n.replace("/"," -> "))}),r.length>0)throw new Error(`non-manifold edges ${r.length}
${r.join(`
`)}`)};hp.exports=X8});var X=m((SK,dp)=>{dp.exports={clone:_h(),create:zs(),fromPoints:j2(),fromCompactBinary:U2(),invert:tp(),isA:pc(),toPoints:np(),toPolygons:Vs(),toString:ip(),toCompactBinary:ap(),transform:fp(),validate:pp()}});var Zn=m((DK,gp)=>{var H8=e=>Object.assign({},e);gp.exports=H8});var dc=m((TK,xp)=>{var{EPS:mp}=j(),j8=Y(),Z8=Zn(),U8=e=>{if(e.isClosed)return e;let t=Z8(e);if(t.isClosed=!0,t.points.length>1){let r=t.points,s=r[0],n=r[r.length-1];for(;j8.distance(s,n)<mp*mp&&(r.pop(),r.length!==1);)n=r[r.length-1]}return t};xp.exports=U8});var Gs=m((CK,vp)=>{var W8=ie(),J8=e=>(e===void 0&&(e=[]),{points:e,isClosed:!1,transforms:W8.create()});vp.exports=J8});var Un=m(($K,Ap)=>{var{EPS:Ep}=j(),yp=Y(),K8=dc(),Q8=Gs(),eC=(e,t)=>{let r={closed:!1},{closed:s}=Object.assign({},r,e),n=Q8();if(n.points=t.map(o=>yp.clone(o)),n.points.length>1){let o=n.points[0],i=n.points[n.points.length-1];yp.distance(o,i)<Ep*Ep&&(s=!0)}return s===!0&&(n=K8(n)),n};Ap.exports=eC});var Sp=m((RK,qp)=>{var bp=ie(),wp=Y(),tC=e=>(bp.isIdentity(e.transforms)||(e.points=e.points.map(t=>wp.transform(wp.create(),t,e.transforms)),e.transforms=bp.create()),e);qp.exports=tC});var Er=m((IK,Dp)=>{var rC=Sp(),sC=e=>rC(e).points;Dp.exports=sC});var Cp=m((MK,Tp)=>{var{TAU:Wn}=j(),we=Y(),nC=Un(),oC=Er(),iC=(e,t)=>{let r={radius:[0,0],xaxisrotation:0,clockwise:!1,large:!1,segments:16},{endpoint:s,radius:n,xaxisrotation:o,clockwise:i,large:c,segments:a}=Object.assign({},r,e);if(!Array.isArray(s))throw new Error("endpoint must be an array of X and Y values");if(s.length<2)throw new Error("endpoint must contain X and Y values");if(s=we.clone(s),!Array.isArray(n))throw new Error("radius must be an array of X and Y values");if(n.length<2)throw new Error("radius must contain X and Y values");if(a<4)throw new Error("segments must be four or more");let l=1e5;if(t.isClosed)throw new Error("the given path cannot be closed");let u=oC(t);if(u.length<1)throw new Error("the given path must contain one or more points (as the starting point for the arc)");let h=n[0],f=n[1],d=u[u.length-1];h=Math.round(h*l)/l,f=Math.round(f*l)/l,s=we.fromValues(Math.round(s[0]*l)/l,Math.round(s[1]*l)/l);let g=!i,p=[];if(h===0||f===0)p.push(s);else{h=Math.abs(h),f=Math.abs(f);let v=o,y=Math.cos(v),b=Math.sin(v),E=we.subtract(we.create(),d,s);we.scale(E,E,.5);let q=Math.round((y*E[0]+b*E[1])*l)/l,w=Math.round((-b*E[0]+y*E[1])*l)/l,D=we.fromValues(q,w),T=D[0]*D[0]/(h*h)+D[1]*D[1]/(f*f);if(T>1){let K=Math.sqrt(T);h*=K,f*=K,h=Math.round(h*l)/l,f=Math.round(f*l)/l}let A=Math.sqrt((h*h*f*f-h*h*D[1]*D[1]-f*f*D[0]*D[0])/(h*h*D[1]*D[1]+f*f*D[0]*D[0]));g===c&&(A=-A);let S=we.fromValues(h*D[1]/f,-f*D[0]/h);we.scale(S,S,A);let $=we.fromValues(y*S[0]-b*S[1],b*S[0]+y*S[1]);$=we.add($,$,we.scale(we.create(),we.add(we.create(),d,s),.5));let C=we.fromValues((D[0]-S[0])/h,(D[1]-S[1])/f),F=we.fromValues((-D[0]-S[0])/h,(-D[1]-S[1])/f),R=we.angleRadians(C),I=we.angleRadians(F)-R;I=I%Wn,!g&&I>0?I-=Wn:g&&I<0&&(I+=Wn);let V=Math.ceil(Math.abs(I)/Wn*a)+1;V<1&&(V=1);for(let K=1;K<V;K++){let fe=R+K/V*I,Ee=Math.cos(fe),be=Math.sin(fe),$e=we.fromValues(y*h*Ee-b*f*be,b*h*Ee+y*f*be);we.add($e,$e,$),p.push($e)}V&&p.push(e.endpoint)}return p=u.concat(p),nC({},p)};Tp.exports=iC});var gc=m((FK,$p)=>{var cC=Un(),aC=Er(),{equals:lC}=Y(),uC=(...e)=>{let t=!1,r=[];return e.forEach((s,n)=>{let o=aC(s).slice();if(r.length>0&&o.length>0&&lC(o[0],r[r.length-1])&&o.shift(),o.length>0&&t)throw new Error(`Cannot concatenate to a closed path; check the ${n}th path`);t=s.isClosed,r=r.concat(o)}),cC({closed:t},r)};$p.exports=uC});var mc=m((NK,Rp)=>{var fC=gc(),hC=Gs(),pC=(e,t)=>fC(t,hC(e));Rp.exports=pC});var Mp=m((PK,Ip)=>{var{TAU:dC}=j(),rt=Y(),gC=Y(),mC=mc(),xC=Er(),vC=(e,t)=>{let r={segments:16},{controlPoints:s,segments:n}=Object.assign({},r,e);if(!Array.isArray(s))throw new Error("controlPoints must be an array of one or more points");if(s.length<1)throw new Error("controlPoints must be an array of one or more points");if(n<4)throw new Error("segments must be four or more");if(t.isClosed)throw new Error("the given geometry cannot be closed");let o=xC(t);if(o.length<1)throw new Error("the given path must contain one or more points (as the starting point for the bezier curve)");if(s=s.slice(),s[0]===null){if(s.length<2)throw new Error("a null control point must be passed with one more control points");let w=o[o.length-2];if("lastBezierControlPoint"in t&&(w=t.lastBezierControlPoint),!Array.isArray(w))throw new Error("the given path must contain TWO or more points if given a null control point");let D=rt.scale(rt.create(),o[o.length-1],2);rt.subtract(D,D,w),s[0]=D}s.unshift(o[o.length-1]);let c=s.length-1,a=[],l=1;for(let w=0;w<=c;++w)w>0&&(l*=w),a.push(l);let u=[];for(let w=0;w<=c;++w){let D=a[c]/(a[w]*a[c-w]);u.push(D)}let h=rt.create(),f=rt.create(),d=gC.create(),g=w=>{let D=1,T=Math.pow(1-w,c),A=w!==1?1/(1-w):1,S=rt.create();for(let $=0;$<=c;++$){$===c&&(T=1);let C=u[$]*D*T,F=rt.scale(h,s[$],C);rt.add(S,S,F),D*=w,T*=A}return S},p=[],x=[],v=c+1;for(let w=0;w<v;++w){let D=w/(v-1),T=g(D);p.push(T),x.push(D)}let y=1,b=dC/n,E=Math.sin(b);for(;y<p.length-1;){let w=rt.subtract(h,p[y],p[y-1]);rt.normalize(w,w);let D=rt.subtract(f,p[y+1],p[y]);rt.normalize(D,D);let T=rt.cross(d,w,D);if(Math.abs(T[2])>E){let A=x[y-1],S=x[y+1],$=A+(S-A)*1/3,C=A+(S-A)*2/3,F=g($),R=g(C);p.splice(y,1,F,R),x.splice(y,1,$,C),y--,y<1&&(y=1)}else++y}p.shift();let q=mC(p,t);return q.lastBezierControlPoint=s[s.length-2],q};Ip.exports=vC});var Pp=m((kK,Np)=>{var EC=Y(),Fp=Er(),yC=(e,t)=>{if(e.isClosed!==t.isClosed||e.points.length!==t.points.length)return!1;let r=Fp(e),s=Fp(t),n=r.length,o=0;do{let i=!1;for(let c=0;c<n;c++)if(!EC.equals(r[c],s[(c+o)%n])){i=!0;break}if(i===!1)return!0;if(!e.isClosed)return!1}while(++o<n);return!1};Np.exports=yC});var Op=m((OK,kp)=>{var AC=ie(),bC=Y(),wC=Gs(),qC=e=>{if(e[0]!==2)throw new Error("invalid compact binary data");let t=wC();t.transforms=AC.clone(e.slice(1,17)),t.isClosed=!!e[17];for(let r=22;r<e.length;r+=2){let s=bC.fromValues(e[r],e[r+1]);t.points.push(s)}return e[18]>=0&&(t.color=[e[18],e[19],e[20],e[21]]),t};kp.exports=qC});var xc=m((LK,Lp)=>{var SC=e=>!!(e&&typeof e=="object"&&"points"in e&&"transforms"in e&&"isClosed"in e&&Array.isArray(e.points)&&"length"in e.transforms);Lp.exports=SC});var _p=m((zK,zp)=>{var DC=Zn(),TC=e=>{let t=DC(e);return t.points=e.points.slice().reverse(),t};zp.exports=TC});var Vp=m((_K,Bp)=>{var CC=Y(),$C=Er(),RC=e=>{let t=$C(e),r="path ("+t.length+" points, "+e.isClosed+`):
[
`;return t.forEach(s=>{r+="  "+CC.toString(s)+`,
`}),r+=`]
`,r};Bp.exports=RC});var Xp=m((BK,Gp)=>{var IC=e=>{let t=e.points,r=e.transforms,s=[-1,-1,-1,-1];e.color&&(s=e.color);let n=new Float32Array(1+16+1+4+t.length*2);n[0]=2,n[1]=r[0],n[2]=r[1],n[3]=r[2],n[4]=r[3],n[5]=r[4],n[6]=r[5],n[7]=r[6],n[8]=r[7],n[9]=r[8],n[10]=r[9],n[11]=r[10],n[12]=r[11],n[13]=r[12],n[14]=r[13],n[15]=r[14],n[16]=r[15],n[17]=e.isClosed?1:0,n[18]=s[0],n[19]=s[1],n[20]=s[2],n[21]=s[3];for(let o=0;o<t.length;o++){let i=o*2+22,c=t[o];n[i]=c[0],n[i+1]=c[1]}return n};Gp.exports=IC});var jp=m((VK,Hp)=>{var Yp=ie(),MC=(e,t)=>{let r=Yp.multiply(Yp.create(),e,t.transforms);return Object.assign({},t,{transforms:r})};Hp.exports=MC});var Up=m((GK,Zp)=>{var FC=Y(),NC=xc(),PC=e=>{if(!NC(e))throw new Error("invalid path2 structure");if(e.points.length>1){for(let t=0;t<e.points.length;t++)if(FC.equals(e.points[t],e.points[(t+1)%e.points.length]))throw new Error(`path2 duplicate points ${e.points[t]}`)}if(e.points.forEach(t=>{if(!t.every(Number.isFinite))throw new Error(`path2 invalid point ${t}`)}),!e.transforms.every(Number.isFinite))throw new Error(`path2 invalid transforms ${e.transforms}`)};Zp.exports=PC});var se=m((XK,Wp)=>{Wp.exports={appendArc:Cp(),appendBezier:Mp(),appendPoints:mc(),clone:Zn(),close:dc(),concat:gc(),create:Gs(),equals:Pp(),fromPoints:Un(),fromCompactBinary:Op(),isA:xc(),reverse:_p(),toPoints:Er(),toString:Vp(),toCompactBinary:Xp(),transform:jp(),validate:Up()}});var rd=m((YK,td)=>{var kC=B(),Jp=G(),Kp=X(),Qp=se(),ed=H(),OC=(e,t)=>{let r=Jp.clone(t);return r.color=e,r},LC=(e,t)=>{let r=Kp.clone(t);return r.color=e,r},zC=(e,t)=>{let r=Qp.clone(t);return r.color=e,r},_C=(e,t)=>{let r=ed.clone(t);return r.color=e,r},BC=(e,...t)=>{if(!Array.isArray(e))throw new Error("color must be an array");if(e.length<3)throw new Error("color must contain R, G and B values");if(e.length===3&&(e=[e[0],e[1],e[2],1]),t=kC(t),t.length===0)throw new Error("wrong number of arguments");let r=t.map(s=>Jp.isA(s)?OC(e,s):Kp.isA(s)?LC(e,s):Qp.isA(s)?zC(e,s):ed.isA(s)?_C(e,s):(s.color=e,s));return r.length===1?r[0]:r};td.exports=BC});var vc=m((HK,sd)=>{var VC={black:[0,0,0],silver:[.7529411764705882,.7529411764705882,.7529411764705882],gray:[.5019607843137255,.5019607843137255,.5019607843137255],white:[1,1,1],maroon:[.5019607843137255,0,0],red:[1,0,0],purple:[.5019607843137255,0,.5019607843137255],fuchsia:[1,0,1],green:[0,.5019607843137255,0],lime:[0,1,0],olive:[.5019607843137255,.5019607843137255,0],yellow:[1,1,0],navy:[0,0,.5019607843137255],blue:[0,0,1],teal:[0,.5019607843137255,.5019607843137255],aqua:[0,1,1],aliceblue:[.9411764705882353,.9725490196078431,1],antiquewhite:[.9803921568627451,.9215686274509803,.8431372549019608],aquamarine:[.4980392156862745,1,.8313725490196079],azure:[.9411764705882353,1,1],beige:[.9607843137254902,.9607843137254902,.8627450980392157],bisque:[1,.8941176470588236,.7686274509803922],blanchedalmond:[1,.9215686274509803,.803921568627451],blueviolet:[.5411764705882353,.16862745098039217,.8862745098039215],brown:[.6470588235294118,.16470588235294117,.16470588235294117],burlywood:[.8705882352941177,.7215686274509804,.5294117647058824],cadetblue:[.37254901960784315,.6196078431372549,.6274509803921569],chartreuse:[.4980392156862745,1,0],chocolate:[.8235294117647058,.4117647058823529,.11764705882352941],coral:[1,.4980392156862745,.3137254901960784],cornflowerblue:[.39215686274509803,.5843137254901961,.9294117647058824],cornsilk:[1,.9725490196078431,.8627450980392157],crimson:[.8627450980392157,.0784313725490196,.23529411764705882],cyan:[0,1,1],darkblue:[0,0,.5450980392156862],darkcyan:[0,.5450980392156862,.5450980392156862],darkgoldenrod:[.7215686274509804,.5254901960784314,.043137254901960784],darkgray:[.6627450980392157,.6627450980392157,.6627450980392157],darkgreen:[0,.39215686274509803,0],darkgrey:[.6627450980392157,.6627450980392157,.6627450980392157],darkkhaki:[.7411764705882353,.7176470588235294,.4196078431372549],darkmagenta:[.5450980392156862,0,.5450980392156862],darkolivegreen:[.3333333333333333,.4196078431372549,.1843137254901961],darkorange:[1,.5490196078431373,0],darkorchid:[.6,.19607843137254902,.8],darkred:[.5450980392156862,0,0],darksalmon:[.9137254901960784,.5882352941176471,.47843137254901963],darkseagreen:[.5607843137254902,.7372549019607844,.5607843137254902],darkslateblue:[.2823529411764706,.23921568627450981,.5450980392156862],darkslategray:[.1843137254901961,.30980392156862746,.30980392156862746],darkslategrey:[.1843137254901961,.30980392156862746,.30980392156862746],darkturquoise:[0,.807843137254902,.8196078431372549],darkviolet:[.5803921568627451,0,.8274509803921568],deeppink:[1,.0784313725490196,.5764705882352941],deepskyblue:[0,.7490196078431373,1],dimgray:[.4117647058823529,.4117647058823529,.4117647058823529],dimgrey:[.4117647058823529,.4117647058823529,.4117647058823529],dodgerblue:[.11764705882352941,.5647058823529412,1],firebrick:[.6980392156862745,.13333333333333333,.13333333333333333],floralwhite:[1,.9803921568627451,.9411764705882353],forestgreen:[.13333333333333333,.5450980392156862,.13333333333333333],gainsboro:[.8627450980392157,.8627450980392157,.8627450980392157],ghostwhite:[.9725490196078431,.9725490196078431,1],gold:[1,.8431372549019608,0],goldenrod:[.8549019607843137,.6470588235294118,.12549019607843137],greenyellow:[.6784313725490196,1,.1843137254901961],grey:[.5019607843137255,.5019607843137255,.5019607843137255],honeydew:[.9411764705882353,1,.9411764705882353],hotpink:[1,.4117647058823529,.7058823529411765],indianred:[.803921568627451,.3607843137254902,.3607843137254902],indigo:[.29411764705882354,0,.5098039215686274],ivory:[1,1,.9411764705882353],khaki:[.9411764705882353,.9019607843137255,.5490196078431373],lavender:[.9019607843137255,.9019607843137255,.9803921568627451],lavenderblush:[1,.9411764705882353,.9607843137254902],lawngreen:[.48627450980392156,.9882352941176471,0],lemonchiffon:[1,.9803921568627451,.803921568627451],lightblue:[.6784313725490196,.8470588235294118,.9019607843137255],lightcoral:[.9411764705882353,.5019607843137255,.5019607843137255],lightcyan:[.8784313725490196,1,1],lightgoldenrodyellow:[.9803921568627451,.9803921568627451,.8235294117647058],lightgray:[.8274509803921568,.8274509803921568,.8274509803921568],lightgreen:[.5647058823529412,.9333333333333333,.5647058823529412],lightgrey:[.8274509803921568,.8274509803921568,.8274509803921568],lightpink:[1,.7137254901960784,.7568627450980392],lightsalmon:[1,.6274509803921569,.47843137254901963],lightseagreen:[.12549019607843137,.6980392156862745,.6666666666666666],lightskyblue:[.5294117647058824,.807843137254902,.9803921568627451],lightslategray:[.4666666666666667,.5333333333333333,.6],lightslategrey:[.4666666666666667,.5333333333333333,.6],lightsteelblue:[.6901960784313725,.7686274509803922,.8705882352941177],lightyellow:[1,1,.8784313725490196],limegreen:[.19607843137254902,.803921568627451,.19607843137254902],linen:[.9803921568627451,.9411764705882353,.9019607843137255],magenta:[1,0,1],mediumaquamarine:[.4,.803921568627451,.6666666666666666],mediumblue:[0,0,.803921568627451],mediumorchid:[.7294117647058823,.3333333333333333,.8274509803921568],mediumpurple:[.5764705882352941,.4392156862745098,.8588235294117647],mediumseagreen:[.23529411764705882,.7019607843137254,.44313725490196076],mediumslateblue:[.4823529411764706,.40784313725490196,.9333333333333333],mediumspringgreen:[0,.9803921568627451,.6039215686274509],mediumturquoise:[.2823529411764706,.8196078431372549,.8],mediumvioletred:[.7803921568627451,.08235294117647059,.5215686274509804],midnightblue:[.09803921568627451,.09803921568627451,.4392156862745098],mintcream:[.9607843137254902,1,.9803921568627451],mistyrose:[1,.8941176470588236,.8823529411764706],moccasin:[1,.8941176470588236,.7098039215686275],navajowhite:[1,.8705882352941177,.6784313725490196],oldlace:[.9921568627450981,.9607843137254902,.9019607843137255],olivedrab:[.4196078431372549,.5568627450980392,.13725490196078433],orange:[1,.6470588235294118,0],orangered:[1,.27058823529411763,0],orchid:[.8549019607843137,.4392156862745098,.8392156862745098],palegoldenrod:[.9333333333333333,.9098039215686274,.6666666666666666],palegreen:[.596078431372549,.984313725490196,.596078431372549],paleturquoise:[.6862745098039216,.9333333333333333,.9333333333333333],palevioletred:[.8588235294117647,.4392156862745098,.5764705882352941],papayawhip:[1,.9372549019607843,.8352941176470589],peachpuff:[1,.8549019607843137,.7254901960784313],peru:[.803921568627451,.5215686274509804,.24705882352941178],pink:[1,.7529411764705882,.796078431372549],plum:[.8666666666666667,.6274509803921569,.8666666666666667],powderblue:[.6901960784313725,.8784313725490196,.9019607843137255],rosybrown:[.7372549019607844,.5607843137254902,.5607843137254902],royalblue:[.2549019607843137,.4117647058823529,.8823529411764706],saddlebrown:[.5450980392156862,.27058823529411763,.07450980392156863],salmon:[.9803921568627451,.5019607843137255,.4470588235294118],sandybrown:[.9568627450980393,.6431372549019608,.3764705882352941],seagreen:[.1803921568627451,.5450980392156862,.3411764705882353],seashell:[1,.9607843137254902,.9333333333333333],sienna:[.6274509803921569,.3215686274509804,.17647058823529413],skyblue:[.5294117647058824,.807843137254902,.9215686274509803],slateblue:[.41568627450980394,.35294117647058826,.803921568627451],slategray:[.4392156862745098,.5019607843137255,.5647058823529412],slategrey:[.4392156862745098,.5019607843137255,.5647058823529412],snow:[1,.9803921568627451,.9803921568627451],springgreen:[0,1,.4980392156862745],steelblue:[.27450980392156865,.5098039215686274,.7058823529411765],tan:[.8235294117647058,.7058823529411765,.5490196078431373],thistle:[.8470588235294118,.7490196078431373,.8470588235294118],tomato:[1,.38823529411764707,.2784313725490196],turquoise:[.25098039215686274,.8784313725490196,.8156862745098039],violet:[.9333333333333333,.5098039215686274,.9333333333333333],wheat:[.9607843137254902,.8705882352941177,.7019607843137254],whitesmoke:[.9607843137254902,.9607843137254902,.9607843137254902],yellowgreen:[.6039215686274509,.803921568627451,.19607843137254902]};sd.exports=VC});var od=m((jK,nd)=>{var GC=vc(),XC=e=>GC[e.toLowerCase()];nd.exports=XC});var cd=m((ZK,id)=>{var YC=e=>{if(e=e.replace("#",""),e.length<6)throw new Error("the given notation must contain 3 or more hex values");let t=parseInt(e.substring(0,2),16)/255,r=parseInt(e.substring(2,4),16)/255,s=parseInt(e.substring(4,6),16)/255;if(e.length>=8){let n=parseInt(e.substring(6,8),16)/255;return[t,r,s,n]}return[t,r,s]};id.exports=YC});var Ec=m((UK,ad)=>{var HC=(e,t,r)=>(r<0&&(r+=1),r>1&&(r-=1),r<.16666666666666666?e+(t-e)*6*r:r<.5?t:r<.6666666666666666?e+(t-e)*(.6666666666666666-r)*6:e);ad.exports=HC});var ud=m((WK,ld)=>{var jC=B(),yc=Ec(),ZC=(...e)=>{if(e=jC(e),e.length<3)throw new Error("values must contain H, S and L values");let t=e[0],r=e[1],s=e[2],n=s,o=s,i=s;if(r!==0){let c=s<.5?s*(1+r):s+r-s*r,a=2*s-c;n=yc(a,c,t+1/3),o=yc(a,c,t),i=yc(a,c,t-1/3)}if(e.length>3){let c=e[3];return[n,o,i,c]}return[n,o,i]};ld.exports=ZC});var hd=m((JK,fd)=>{var UC=B(),WC=(...e)=>{if(e=UC(e),e.length<3)throw new Error("values must contain H, S and V values");let t=e[0],r=e[1],s=e[2],n=0,o=0,i=0,c=Math.floor(t*6),a=t*6-c,l=s*(1-r),u=s*(1-a*r),h=s*(1-(1-a)*r);switch(c%6){case 0:n=s,o=h,i=l;break;case 1:n=u,o=s,i=l;break;case 2:n=l,o=s,i=h;break;case 3:n=l,o=u,i=s;break;case 4:n=h,o=l,i=s;break;case 5:n=s,o=l,i=u;break}if(e.length>3){let f=e[3];return[n,o,i,f]}return[n,o,i]};fd.exports=WC});var dd=m((KK,pd)=>{var JC=B(),KC=(...e)=>{if(e=JC(e),e.length<3)throw new Error("values must contain R, G and B values");let t=e[0]*255,r=e[1]*255,s=e[2]*255,n=`#${Number(16777216+t*65536+r*256+s).toString(16).substring(1,7)}`;return e.length>3&&(n=n+Number(e[3]*255).toString(16)),n};pd.exports=KC});var md=m((QK,gd)=>{var QC=B(),e6=(...e)=>{if(e=QC(e),e.length<3)throw new Error("values must contain R, G and B values");let t=e[0],r=e[1],s=e[2],n=Math.max(t,r,s),o=Math.min(t,r,s),i,c,a=(n+o)/2;if(n===o)i=c=0;else{let l=n-o;switch(c=a>.5?l/(2-n-o):l/(n+o),n){case t:i=(r-s)/l+(r<s?6:0);break;case r:i=(s-t)/l+2;break;case s:i=(t-r)/l+4;break}i/=6}if(e.length>3){let l=e[3];return[i,c,a,l]}return[i,c,a]};gd.exports=e6});var vd=m((eQ,xd)=>{var t6=B(),r6=(...e)=>{if(e=t6(e),e.length<3)throw new Error("values must contain R, G and B values");let t=e[0],r=e[1],s=e[2],n=Math.max(t,r,s),o=Math.min(t,r,s),i,c=n,a=n-o,l=n===0?0:a/n;if(n===o)i=0;else{switch(n){case t:i=(r-s)/a+(r<s?6:0);break;case r:i=(s-t)/a+2;break;case s:i=(t-r)/a+4;break}i/=6}if(e.length>3){let u=e[3];return[i,l,c,u]}return[i,l,c]};xd.exports=r6});var yd=m((tQ,Ed)=>{Ed.exports={colorize:rd(),colorNameToRgb:od(),cssColors:vc(),hexToRgb:cd(),hslToRgb:ud(),hsvToRgb:hd(),hueToColorComponent:Ec(),rgbToHex:dd(),rgbToHsl:md(),rgbToHsv:vd()}});var wd=m((rQ,bd)=>{var s6=e=>{if(!Array.isArray(e))throw new Error("Bezier points must be a valid array/");if(e.length<2)throw new Error("Bezier points must contain at least 2 values.");let t=n6(e);return{points:e,pointType:t,dimensions:t==="float_single"?0:e[0].length,permutations:Ad(e.length-1),tangentPermutations:Ad(e.length-2)}},n6=function(e){let t=null;return e.forEach(r=>{let s="";if(Number.isFinite(r))s="float_single";else if(Array.isArray(r))r.forEach(n=>{if(!Number.isFinite(n))throw new Error("Bezier point values must all be numbers.")}),s="float_"+r.length;else throw new Error("Bezier points must all be numbers or arrays of number.");if(t==null)t=s;else if(t!==s)throw new Error("Bezier points must be either all numbers or all arrays of numbers of the same size.")}),t},Ad=function(e){let t=[];for(let r=0;r<=e;r++)t.push(Ac(e)/(Ac(r)*Ac(e-r)));return t},Ac=function(e){let t=1;for(let r=2;r<=e;r++)t*=r;return t};bd.exports=s6});var Dd=m((sQ,Sd)=>{var o6=(e,t)=>{if(e<0||e>1)throw new Error("Bezier valueAt() input must be between 0 and 1");if(t.pointType==="float_single")return qd(t,t.points,e);{let r=[];for(let s=0;s<t.dimensions;s++){let n=[];for(let o=0;o<t.points.length;o++)n.push(t.points[o][s]);r.push(qd(t,n,e))}return r}},qd=function(e,t,r){let s=t.length-1,n=0;for(let o=0;o<=s;o++)n+=e.permutations[o]*Math.pow(1-r,s-o)*Math.pow(r,o)*t[o];return n};Sd.exports=o6});var $d=m((nQ,Cd)=>{var i6=(e,t)=>{if(e<0||e>1)throw new Error("Bezier tangentAt() input must be between 0 and 1");if(t.pointType==="float_single")return Td(t,t.points,e);{let r=[];for(let s=0;s<t.dimensions;s++){let n=[];for(let o=0;o<t.points.length;o++)n.push(t.points[o][s]);r.push(Td(t,n,e))}return r}},Td=function(e,t,r){let s=t.length-1,n=0;for(let o=0;o<s;o++){let i=s*(t[o+1]-t[o]);n+=e.tangentPermutations[o]*Math.pow(1-r,s-1-o)*Math.pow(r,o)*i}return n};Cd.exports=i6});var Id=m((oQ,Rd)=>{Rd.exports={create:wd(),valueAt:Dd(),tangentAt:$d()}});var Fd=m((iQ,Md)=>{Md.exports={bezier:Id()}});var Xs=m((cQ,Nd)=>{var c6=e=>{let t=0;for(let r=0;r<e.length;r++){let s=(r+1)%e.length;t+=e[r][0]*e[s][1],t-=e[s][0]*e[r][1]}return t/2};Nd.exports=c6});var bc=m((aQ,Pd)=>{var a6=Xs(),l6=e=>a6(e.vertices);Pd.exports=l6});var wc=m((lQ,kd)=>{var u6=e=>((e===void 0||e.length<3)&&(e=[]),{vertices:e});kd.exports=u6});var qc=m((uQ,Od)=>{var f6=wc(),h6=e=>{let t=e.vertices.slice().reverse();return f6(t)};Od.exports=h6});var zd=m((fQ,Ld)=>{var p6=bc(),d6=qc(),g6=(e,t)=>{if(e.length===0)return 0;let r=t.vertices;return r.length<3?0:(p6(t)<0&&(t=d6(t)),e.reduce((n,o)=>n+m6(o,r),0)===e.length?1:0)},m6=(e,t)=>{let r=t.length,s=e[0],n=e[1],o=t[r-1],i=t[0],c=o[1]>n,a=0,l=0;for(let u=r+1;--u;){let h=i[1]>n;if(c!==h){let f=o[0]>s,d=i[0]>s;(f&&d||i[0]-(i[1]-n)*(o[0]-i[0])/(o[1]-i[1])>=s)&&(a=!a)}c=h,o=i,i=t[++l]}return a};Ld.exports=g6});var Jn=m((hQ,_d)=>{_d.exports={arePointsInside:zd(),create:wc(),flip:qc(),measureArea:bc()}});var Kn=m((pQ,Bd)=>{Bd.exports={geom2:G(),geom3:X(),path2:se(),poly2:Jn(),poly3:H()}});var Qn=m((dQ,Vd)=>{var x6=()=>[0,1,0];Vd.exports=x6});var Xd=m((gQ,Gd)=>{var v6=Qn(),E6=e=>{let t=v6();return t[0]=e[0],t[1]=e[1],t[2]=e[2],t};Gd.exports=E6});var eo=m((mQ,Yd)=>{var Sc=Y(),y6=e=>{let t=Sc.normal(Sc.create(),e);return Sc.negate(t,t),t};Yd.exports=y6});var Ys=m((xQ,jd)=>{var Hd=Y(),A6=e=>Hd.scale(Hd.create(),e,e[2]);jd.exports=A6});var Ud=m((vQ,Zd)=>{var b6=Y(),w6=eo(),q6=Ys(),S6=(e,t)=>{let r=q6(e),s=w6(e),n=(s[1]-r[1])/(s[0]-r[0]),o=r[1]-n*r[0],i=-1/n,a=(t[1]-i*t[0]-o)/(n-i),l=n*a+o;return b6.fromValues(a,l)};Zd.exports=S6});var Dc=m((EQ,Wd)=>{var D6=(e,t)=>(e[0]=t[0],e[1]=t[1],e[2]=t[2],e);Wd.exports=D6});var Kd=m((yQ,Jd)=>{var T6=Y(),C6=(e,t)=>{let r=T6.dot(t,e);return r=Math.abs(r-e[2]),r};Jd.exports=C6});var e5=m((AQ,Qd)=>{var $6=(e,t)=>e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2];Qd.exports=$6});var Tc=m((bQ,t5)=>{var Hs=Y(),R6=(e,t,r)=>{let s=Hs.subtract(Hs.create(),r,t);Hs.normal(s,s),Hs.normalize(s,s);let n=Hs.dot(t,s);return e[0]=s[0],e[1]=s[1],e[2]=n,e};t5.exports=R6});var Cc=m((wQ,r5)=>{var I6=Qn(),M6=(e,t,r)=>{let s=I6();return s[0]=e,s[1]=t,s[2]=r,s};r5.exports=M6});var js=m((qQ,s5)=>{var{NEPS:$c}=j(),F6=(e,t)=>Math.abs(e[0]-t[0])<=$c&&Math.abs(e[1]-t[1])<=$c&&Math.abs(e[2]-t[2])<=$c;s5.exports=F6});var Rc=m((SQ,n5)=>{var N6=(e,t,r)=>{let s=r-e[1],n=t[1]-e[1];n<0&&(s=-s,n=-n);let o;return s<=0?o=0:s>=n?o=1:n<1e-10?o=.5:o=s/n,e[0]+o*(t[0]-e[0])};n5.exports=N6});var Ic=m((DQ,o5)=>{var P6=(e,t,r,s)=>{if(e[0]===t[0]&&e[1]===t[1]||r[0]===s[0]&&r[1]===s[1])return;let n=(s[1]-r[1])*(t[0]-e[0])-(s[0]-r[0])*(t[1]-e[1]);if(Math.abs(n)<Number.MIN_VALUE)return;let o=((s[0]-r[0])*(e[1]-r[1])-(s[1]-r[1])*(e[0]-r[0]))/n,i=((t[0]-e[0])*(e[1]-r[1])-(t[1]-e[1])*(e[0]-r[0]))/n;if(o<0||o>1||i<0||i>1)return;let c=e[0]+o*(t[0]-e[0]),a=e[1]+o*(t[1]-e[1]);return[c,a]};o5.exports=P6});var c5=m((TQ,i5)=>{var k6=(e,t,r,s,n,o)=>{let c=1/(e*s-t*r),a=n*s-t*o,l=-n*r+e*o;return a*=c,l*=c,[a,l]};i5.exports=k6});var Lr=m((CQ,a5)=>{a5.exports={aboutEqualNormals:js(),area:Xs(),cos:Re().cos,interpolateBetween2DPointsForY:Rc(),intersect:Ic(),sin:Re().sin,solve2Linear:c5()}});var u5=m(($Q,l5)=>{var O6=Y(),{solve2Linear:L6}=Lr(),z6=(e,t)=>{let r=L6(e[0],e[1],t[0],t[1],e[2],t[2]);return O6.clone(r)};l5.exports=z6});var p5=m((RQ,h5)=>{var f5=Y(),_6=Dc(),B6=Cc(),V6=(e,t)=>{let r=f5.negate(f5.create(),t),s=-t[2];return _6(e,B6(r[0],r[1],s))};h5.exports=V6});var g5=m((IQ,d5)=>{var G6=e=>`line2: (${e[0].toFixed(7)}, ${e[1].toFixed(7)}, ${e[2].toFixed(7)})`;d5.exports=G6});var v5=m((MQ,x5)=>{var m5=Y(),X6=Tc(),Y6=Ys(),H6=eo(),j6=(e,t,r)=>{let s=Y6(t),n=H6(t);return m5.transform(s,s,r),m5.transform(n,n,r),X6(e,s,n)};x5.exports=j6});var y5=m((FQ,E5)=>{var Z6=Ys(),U6=(e,t)=>{let r=(e[2]-e[1]*t)/e[0];return Number.isNaN(r)&&(r=Z6(e)[0]),r};E5.exports=U6});var to=m((NQ,A5)=>{A5.exports={clone:Xd(),closestPoint:Ud(),copy:Dc(),create:Qn(),direction:eo(),distanceToPoint:Kd(),equals:e5(),fromPoints:Tc(),fromValues:Cc(),intersectPointOfLines:u5(),origin:Ys(),reverse:p5(),toString:g5(),transform:v5(),xAtY:y5()}});var Mc=m((PQ,w5)=>{var b5=k(),W6=()=>[b5.fromValues(0,0,0),b5.fromValues(0,0,1)];w5.exports=W6});var D5=m((kQ,S5)=>{var q5=k(),J6=Mc(),K6=e=>{let t=J6();return q5.copy(t[0],e[0]),q5.copy(t[1],e[1]),t};S5.exports=K6});var Fc=m((OQ,T5)=>{var yr=k(),Q6=(e,t)=>{let r=e[0],s=e[1],n=yr.dot(yr.subtract(yr.create(),t,r),s),o=yr.dot(s,s),i=n/o,c=yr.scale(yr.create(),s,i);return yr.add(c,c,r),c};T5.exports=Q6});var R5=m((LQ,$5)=>{var C5=k(),e9=(e,t)=>(C5.copy(e[0],t[0]),C5.copy(e[1],t[1]),e);$5.exports=e9});var M5=m((zQ,I5)=>{var t9=e=>e[1];I5.exports=t9});var N5=m((_Q,F5)=>{var Nc=k(),r9=Fc(),s9=(e,t)=>{let r=r9(e,t),s=Nc.subtract(Nc.create(),t,r);return Nc.length(s)};F5.exports=s9});var O5=m((BQ,k5)=>{var P5=k(),n9=(e,t)=>!(!P5.equals(e[1],t[1])||!P5.equals(e[0],t[0]));k5.exports=n9});var zr=m((VQ,L5)=>{var ro=k(),o9=(e,t,r)=>{let s=ro.normalize(ro.create(),r);return ro.copy(e[0],t),ro.copy(e[1],s),e};L5.exports=o9});var _5=m((GQ,z5)=>{var Ar=k(),{solve2Linear:Pc}=Lr(),{EPS:i9}=j(),c9=zr(),a9=(e,t,r)=>{let s=Ar.cross(Ar.create(),t,r),n=Ar.length(s);if(n<i9)throw new Error("parallel planes do not intersect");n=1/n,s=Ar.scale(s,s,n);let o=Math.abs(s[0]),i=Math.abs(s[1]),c=Math.abs(s[2]),a,l;return o>=i&&o>=c?(l=Pc(t[1],t[2],r[1],r[2],t[3],r[3]),a=Ar.fromValues(0,l[0],l[1])):i>=o&&i>=c?(l=Pc(t[0],t[2],r[0],r[2],t[3],r[3]),a=Ar.fromValues(l[0],0,l[1])):(l=Pc(t[0],t[1],r[0],r[1],t[3],r[3]),a=Ar.fromValues(l[0],l[1],0)),c9(e,a,s)};z5.exports=a9});var G5=m((XQ,V5)=>{var B5=k(),l9=zr(),u9=(e,t,r)=>{let s=B5.subtract(B5.create(),r,t);return l9(e,t,s)};V5.exports=u9});var Y5=m((YQ,X5)=>{var _r=k(),f9=(e,t)=>{let r=t,s=t[3],n=e[0],o=e[1],i=(s-_r.dot(r,n))/_r.dot(r,o);return _r.add(_r.create(),n,_r.scale(_r.create(),o,i))};X5.exports=f9});var j5=m((HQ,H5)=>{var h9=e=>e[0];H5.exports=h9});var U5=m((jQ,Z5)=>{var kc=k(),p9=zr(),d9=(e,t)=>{let r=kc.clone(t[0]),s=kc.negate(kc.create(),t[1]);return p9(e,r,s)};Z5.exports=d9});var J5=m((ZQ,W5)=>{var g9=e=>{let t=e[0],r=e[1];return`line3: point: (${t[0].toFixed(7)}, ${t[1].toFixed(7)}, ${t[2].toFixed(7)}) direction: (${r[0].toFixed(7)}, ${r[1].toFixed(7)}, ${r[2].toFixed(7)})`};W5.exports=g9});var Q5=m((UQ,K5)=>{var Br=k(),m9=zr(),x9=(e,t,r)=>{let s=t[0],n=t[1],o=Br.add(Br.create(),s,n),i=Br.transform(Br.create(),s,r),c=Br.transform(o,o,r),a=Br.subtract(c,c,i);return m9(e,i,a)};K5.exports=x9});var tg=m((WQ,eg)=>{eg.exports={clone:D5(),closestPoint:Fc(),copy:R5(),create:Mc(),direction:M5(),distanceToPoint:N5(),equals:O5(),fromPlanes:_5(),fromPointAndDirection:zr(),fromPoints:G5(),intersectPointOfLineAndPlane:Y5(),origin:j5(),reverse:U5(),toString:J5(),transform:Q5()}});var sg=m((JQ,rg)=>{rg.exports={constants:j(),line2:to(),line3:tg(),mat4:ie(),plane:ht(),utils:Lr(),vec2:Y(),vec3:k(),vec4:fc()}});var Oc=m((KQ,ig)=>{var v9=B(),ng=G(),og=X(),E9=se(),y9=H(),so=new WeakMap,A9=()=>0,b9=e=>{let t=so.get(e);return t||(t=ng.toSides(e).reduce((s,n)=>s+(n[0][0]*n[1][1]-n[0][1]*n[1][0]),0),t*=.5,so.set(e,t),t)},w9=e=>{let t=so.get(e);return t||(t=og.toPolygons(e).reduce((s,n)=>s+y9.measureArea(n),0),so.set(e,t),t)},q9=(...e)=>{if(e=v9(e),e.length===0)throw new Error("wrong number of arguments");let t=e.map(r=>E9.isA(r)?A9(r):ng.isA(r)?b9(r):og.isA(r)?w9(r):0);return t.length===1?t[0]:t};ig.exports=q9});var ag=m((QQ,cg)=>{var S9=B(),D9=Oc(),T9=(...e)=>{if(e=S9(e),e.length===0)throw new Error("measureAggregateArea: no geometries supplied");let t=D9(e);if(e.length===1)return t;let r=0;return t.reduce((s,n)=>s+n,r)};cg.exports=T9});var Kt=m((eee,pg)=>{var C9=B(),wt=Y(),Zs=k(),ug=G(),fg=X(),hg=se(),lg=H(),Vr=new WeakMap,$9=e=>{let t=Vr.get(e);if(t)return t;let r=hg.toPoints(e),s;r.length===0?s=wt.create():s=wt.clone(r[0]);let n=wt.clone(s);return r.forEach(o=>{wt.min(s,s,o),wt.max(n,n,o)}),s=[s[0],s[1],0],n=[n[0],n[1],0],t=[s,n],Vr.set(e,t),t},R9=e=>{let t=Vr.get(e);if(t)return t;let r=ug.toPoints(e),s;r.length===0?s=wt.create():s=wt.clone(r[0]);let n=wt.clone(s);return r.forEach(o=>{wt.min(s,s,o),wt.max(n,n,o)}),s=[s[0],s[1],0],n=[n[0],n[1],0],t=[s,n],Vr.set(e,t),t},I9=e=>{let t=Vr.get(e);if(t)return t;let r=fg.toPolygons(e),s=Zs.create();if(r.length>0){let o=lg.toPoints(r[0]);Zs.copy(s,o[0])}let n=Zs.clone(s);return r.forEach(o=>{lg.toPoints(o).forEach(i=>{Zs.min(s,s,i),Zs.max(n,n,i)})}),s=[s[0],s[1],s[2]],n=[n[0],n[1],n[2]],t=[s,n],Vr.set(e,t),t},M9=(...e)=>{if(e=C9(e),e.length===0)throw new Error("wrong number of arguments");let t=e.map(r=>hg.isA(r)?$9(r):ug.isA(r)?R9(r):fg.isA(r)?I9(r):[[0,0,0],[0,0,0]]);return t.length===1?t[0]:t};pg.exports=M9});var no=m((tee,dg)=>{var F9=B(),N9=Gi(),P9=Vi(),k9=Kt(),O9=(...e)=>{if(e=F9(e),e.length===0)throw new Error("measureAggregateBoundingBox: no geometries supplied");let t=k9(e);if(e.length===1)return t;let r=[[Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE],[-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]];return t.reduce((s,n)=>(s=[N9(s[0],s[0],n[0]),P9(s[1],s[1],n[1])],s),r)};dg.exports=O9});var Lc=m((ree,gg)=>{var{EPS:L9}=j(),z9=(e,t)=>{let r=0;for(let s=0;s<t;s++)r+=e[1][s]-e[0][s];return L9*r/t};gg.exports=z9});var xg=m((see,mg)=>{var _9=B(),B9=no(),V9=Lc(),{geom2:G9,geom3:X9,path2:Y9}=Kn(),H9=(...e)=>{if(e=_9(e),e.length===0)throw new Error("measureAggregateEpsilon: no geometries supplied");let t=B9(e),r=0;return r=e.reduce((s,n)=>Y9.isA(n)||G9.isA(n)?Math.max(s,2):X9.isA(n)?Math.max(s,3):0,r),V9(t,r)};mg.exports=H9});var zc=m((nee,yg)=>{var j9=B(),Z9=G(),Eg=X(),U9=se(),W9=H(),vg=new WeakMap,J9=()=>0,K9=()=>0,Q9=e=>{let t=vg.get(e);return t||(t=Eg.toPolygons(e).reduce((s,n)=>s+W9.measureSignedVolume(n),0),vg.set(e,t),t)},e$=(...e)=>{if(e=j9(e),e.length===0)throw new Error("wrong number of arguments");let t=e.map(r=>U9.isA(r)?J9(r):Z9.isA(r)?K9(r):Eg.isA(r)?Q9(r):0);return t.length===1?t[0]:t};yg.exports=e$});var bg=m((oee,Ag)=>{var t$=B(),r$=zc(),s$=(...e)=>{if(e=t$(e),e.length===0)throw new Error("measureAggregateVolume: no geometries supplied");let t=r$(e);if(e.length===1)return t;let r=0;return t.reduce((s,n)=>s+n,r)};Ag.exports=s$});var $g=m((iee,Cg)=>{var n$=B(),qg=Y(),Ye=k(),Sg=G(),Dg=X(),Tg=se(),wg=H(),Gr=new WeakMap,o$=e=>{let t=Gr.get(e);if(t!==void 0)return t;let r=Ye.create(),s=0,n=Tg.toPoints(e);if(n.length>0){let o=0,i=Ye.create();n.forEach(c=>{Ye.add(r,r,Ye.fromVec2(i,c,0)),o++}),Ye.scale(r,r,1/o),n.forEach(c=>{s=Math.max(s,qg.squaredDistance(r,c))}),s=Math.sqrt(s)}return t=[r,s],Gr.set(e,t),t},i$=e=>{let t=Gr.get(e);if(t!==void 0)return t;let r=Ye.create(),s=0,n=Sg.toSides(e);if(n.length>0){let o=0,i=Ye.create();n.forEach(c=>{Ye.add(r,r,Ye.fromVec2(i,c[0],0)),o++}),Ye.scale(r,r,1/o),n.forEach(c=>{s=Math.max(s,qg.squaredDistance(r,c[0]))}),s=Math.sqrt(s)}return t=[r,s],Gr.set(e,t),t},c$=e=>{let t=Gr.get(e);if(t!==void 0)return t;let r=Ye.create(),s=0,n=Dg.toPolygons(e);if(n.length>0){let o=0;n.forEach(i=>{wg.toPoints(i).forEach(c=>{Ye.add(r,r,c),o++})}),Ye.scale(r,r,1/o),n.forEach(i=>{wg.toPoints(i).forEach(c=>{s=Math.max(s,Ye.squaredDistance(r,c))})}),s=Math.sqrt(s)}return t=[r,s],Gr.set(e,t),t},a$=(...e)=>{e=n$(e);let t=e.map(r=>Tg.isA(r)?o$(r):Sg.isA(r)?i$(r):Dg.isA(r)?c$(r):[[0,0,0],0]);return t.length===1?t[0]:t};Cg.exports=a$});var Ig=m((cee,Rg)=>{var l$=B(),u$=Kt(),f$=(...e)=>{e=l$(e);let t=e.map(r=>{let s=u$(r);return[s[0][0]+(s[1][0]-s[0][0])/2,s[0][1]+(s[1][1]-s[0][1])/2,s[0][2]+(s[1][2]-s[0][2])/2]});return t.length===1?t[0]:t};Rg.exports=f$});var Pg=m((aee,Ng)=>{var h$=B(),qt=k(),Mg=G(),Fg=X(),oo=new WeakMap,p$=e=>{let t=oo.get(e);if(t!==void 0)return t;let r=Mg.toSides(e),s=0,n=0,o=0;if(r.length>0){for(let c=0;c<r.length;c++){let a=r[c][0],l=r[c][1],u=a[0]*l[1]-a[1]*l[0];s+=u,n+=(a[0]+l[0])*u,o+=(a[1]+l[1])*u}s/=2;let i=1/(s*6);n*=i,o*=i}return t=qt.fromValues(n,o,0),oo.set(e,t),t},d$=e=>{let t=oo.get(e);if(t!==void 0)return t;t=qt.create();let r=Fg.toPolygons(e);if(r.length===0)return t;let s=0,n=qt.create();return r.forEach(o=>{let i=o.vertices;for(let c=0;c<i.length-2;c++){qt.cross(n,i[c+1],i[c+2]);let a=qt.dot(i[0],n)/6;s+=a,qt.add(n,i[0],i[c+1]),qt.add(n,n,i[c+2]);let l=qt.scale(n,n,1/4*a);qt.add(t,t,l)}}),qt.scale(t,t,1/s),oo.set(e,t),t},g$=(...e)=>{e=h$(e);let t=e.map(r=>Mg.isA(r)?p$(r):Fg.isA(r)?d$(r):[0,0,0]);return t.length===1?t[0]:t};Ng.exports=g$});var Og=m((lee,kg)=>{var m$=B(),x$=Kt(),v$=(...e)=>{e=m$(e);let t=e.map(r=>{let s=x$(r);return[s[1][0]-s[0][0],s[1][1]-s[0][1],s[1][2]-s[0][2]]});return t.length===1?t[0]:t};kg.exports=v$});var Lt=m((uee,Lg)=>{var E$=B(),{geom2:y$,geom3:A$,path2:b$}=Kn(),_c=Lc(),Bc=Kt(),w$=e=>_c(Bc(e),2),q$=e=>_c(Bc(e),2),S$=e=>_c(Bc(e),3),D$=(...e)=>{if(e=E$(e),e.length===0)throw new Error("wrong number of arguments");let t=e.map(r=>b$.isA(r)?w$(r):y$.isA(r)?q$(r):A$.isA(r)?S$(r):0);return t.length===1?t[0]:t};Lg.exports=D$});var _g=m((fee,zg)=>{zg.exports={measureAggregateArea:ag(),measureAggregateBoundingBox:no(),measureAggregateEpsilon:xg(),measureAggregateVolume:bg(),measureArea:Oc(),measureBoundingBox:Kt(),measureBoundingSphere:$g(),measureCenter:Ig(),measureCenterOfMass:Pg(),measureDimensions:Og(),measureEpsilon:Lt(),measureVolume:zc()}});var qe=m((hee,Bg)=>{var T$=(e,t)=>Array.isArray(e)&&e.length>=t?e.every(r=>Number.isFinite(r)):!1,C$=(e,t)=>Number.isFinite(e)&&e>t,$$=(e,t)=>Number.isFinite(e)&&e>=t;Bg.exports={isNumberArray:T$,isGT:C$,isGTE:$$}});var Xg=m((pee,Gg)=>{var{EPS:Vg,TAU:Xr}=j(),zt=Y(),R$=se(),{isGT:I$,isGTE:Vc,isNumberArray:M$}=qe(),F$=e=>{let t={center:[0,0],radius:1,startAngle:0,endAngle:Xr,makeTangent:!1,segments:32},{center:r,radius:s,startAngle:n,endAngle:o,makeTangent:i,segments:c}=Object.assign({},t,e);if(!M$(r,2))throw new Error("center must be an array of X and Y values");if(!I$(s,0))throw new Error("radius must be greater than zero");if(!Vc(n,0))throw new Error("startAngle must be positive");if(!Vc(o,0))throw new Error("endAngle must be positive");if(!Vc(c,4))throw new Error("segments must be four or more");n=n%Xr,o=o%Xr;let a=Xr;n<o&&(a=o-n),n>o&&(a=o+(Xr-n));let l=Math.acos((s*s+s*s-Vg*Vg)/(2*s*s)),u=zt.clone(r),h,f=[];if(a<l)h=zt.fromAngleRadians(zt.create(),n),zt.scale(h,h,s),zt.add(h,h,u),f.push(h);else{let d=Math.max(1,Math.floor(c*(a/Xr)))+1,g=d*.5/a;g>.25&&(g=.25);let p=i?d+2:d;for(let x=0;x<=p;x++){let v=x;i&&(v=(x-1)*(d-2*g)/d+g,v<0&&(v=0),v>d&&(v=d));let y=n+v*(a/d);h=zt.fromAngleRadians(zt.create(),y),zt.scale(h,h,s),zt.add(h,h,u),f.push(h)}}return R$.fromPoints({closed:!1},f)};Gg.exports=F$});var Yc=m((dee,jg)=>{var{EPS:Yg,TAU:Qt}=j(),Gc=Y(),N$=G(),{sin:P$,cos:k$}=Re(),{isGTE:Xc,isNumberArray:Hg}=qe(),O$=e=>{let t={center:[0,0],radius:[1,1],startAngle:0,endAngle:Qt,segments:32},{center:r,radius:s,startAngle:n,endAngle:o,segments:i}=Object.assign({},t,e);if(!Hg(r,2))throw new Error("center must be an array of X and Y values");if(!Hg(s,2))throw new Error("radius must be an array of X and Y values");if(!s.every(d=>d>0))throw new Error("radius values must be greater than zero");if(!Xc(n,0))throw new Error("startAngle must be positive");if(!Xc(o,0))throw new Error("endAngle must be positive");if(!Xc(i,3))throw new Error("segments must be three or more");n=n%Qt,o=o%Qt;let c=Qt;n<o&&(c=o-n),n>o&&(c=o+(Qt-n));let a=Math.min(s[0],s[1]),l=Math.acos((a*a+a*a-Yg*Yg)/(2*a*a));if(c<l)throw new Error("startAngle and endAngle do not define a significant rotation");i=Math.floor(i*(c/Qt));let u=Gc.clone(r),h=c/i,f=[];i=c<Qt?i+1:i;for(let d=0;d<i;d++){let g=h*d+n,p=Gc.fromValues(s[0]*k$(g),s[1]*P$(g));Gc.add(p,u,p),f.push(p)}return c<Qt&&f.push(u),N$.fromPoints(f)};jg.exports=O$});var Hc=m((gee,Zg)=>{var{TAU:L$}=j(),z$=Yc(),{isGT:_$}=qe(),B$=e=>{let t={center:[0,0],radius:1,startAngle:0,endAngle:L$,segments:32},{center:r,radius:s,startAngle:n,endAngle:o,segments:i}=Object.assign({},t,e);if(!_$(s,0))throw new Error("radius must be greater than zero");return s=[s,s],z$({center:r,radius:s,startAngle:n,endAngle:o,segments:i})};Zg.exports=B$});var jc=m((mee,Wg)=>{var V$=X(),G$=H(),{isNumberArray:Ug}=qe(),X$=e=>{let t={center:[0,0,0],size:[2,2,2]},{center:r,size:s}=Object.assign({},t,e);if(!Ug(r,3))throw new Error("center must be an array of X, Y and Z values");if(!Ug(s,3))throw new Error("size must be an array of width, depth and height values");if(!s.every(o=>o>0))throw new Error("size values must be greater than zero");return V$.create([[[0,4,6,2],[-1,0,0]],[[1,3,7,5],[1,0,0]],[[0,1,5,4],[0,-1,0]],[[2,6,7,3],[0,1,0]],[[0,2,3,1],[0,0,-1]],[[4,5,7,6],[0,0,1]]].map(o=>{let i=o[0].map(c=>[r[0]+s[0]/2*(2*!!(c&1)-1),r[1]+s[1]/2*(2*!!(c&2)-1),r[2]+s[2]/2*(2*!!(c&4)-1)]);return G$.create(i)}))};Wg.exports=X$});var Kg=m((xee,Jg)=>{var Y$=jc(),{isGT:H$}=qe(),j$=e=>{let t={center:[0,0,0],size:2},{center:r,size:s}=Object.assign({},t,e);if(!H$(s,0))throw new Error("size must be greater than zero");return s=[s,s,s],Y$({center:r,size:s})};Jg.exports=j$});var Wc=m((vee,em)=>{var{EPS:Qg,TAU:er}=j(),Ie=k(),Z$=X(),U$=H(),{sin:W$,cos:J$}=Re(),{isGT:K$,isGTE:Zc,isNumberArray:Uc}=qe(),Q$=e=>{let t={center:[0,0,0],height:2,startRadius:[1,1],startAngle:0,endRadius:[1,1],endAngle:er,segments:32},{center:r,height:s,startRadius:n,startAngle:o,endRadius:i,endAngle:c,segments:a}=Object.assign({},t,e);if(!Uc(r,3))throw new Error("center must be an array of X, Y and Z values");if(!K$(s,0))throw new Error("height must be greater then zero");if(!Uc(n,2))throw new Error("startRadius must be an array of X and Y values");if(!n.every(A=>A>=0))throw new Error("startRadius values must be positive");if(!Uc(i,2))throw new Error("endRadius must be an array of X and Y values");if(!i.every(A=>A>=0))throw new Error("endRadius values must be positive");if(i.every(A=>A===0)&&n.every(A=>A===0))throw new Error("at least one radius must be positive");if(!Zc(o,0))throw new Error("startAngle must be positive");if(!Zc(c,0))throw new Error("endAngle must be positive");if(!Zc(a,4))throw new Error("segments must be four or more");o=o%er,c=c%er;let l=er;o<c&&(l=c-o),o>c&&(l=c+(er-o));let u=Math.min(n[0],n[1],i[0],i[1]),h=Math.acos((u*u+u*u-Qg*Qg)/(2*u*u));if(l<h)throw new Error("startAngle and endAngle do not define a significant rotation");let f=Math.floor(a*(l/er)),d=Ie.fromValues(0,0,-(s/2)),g=Ie.fromValues(0,0,s/2),p=Ie.subtract(Ie.create(),g,d),x=Ie.fromValues(1,0,0),v=Ie.fromValues(0,1,0),y=Ie.create(),b=Ie.create(),E=Ie.create(),q=(A,S,$)=>{let C=S*l+o;return Ie.scale(y,x,$[0]*J$(C)),Ie.scale(b,v,$[1]*W$(C)),Ie.add(y,y,b),Ie.scale(E,p,A),Ie.add(E,E,d),Ie.add(Ie.create(),y,E)},w=(...A)=>{let S=A.map($=>Ie.add(Ie.create(),$,r));return U$.create(S)},D=[];for(let A=0;A<f;A++){let S=A/f,$=(A+1)/f;l===er&&A===f-1&&($=0),i[0]===n[0]&&i[1]===n[1]?(D.push(w(d,q(0,$,i),q(0,S,i))),D.push(w(q(0,$,i),q(1,$,i),q(1,S,i),q(0,S,i))),D.push(w(g,q(1,S,i),q(1,$,i)))):(n[0]>0&&n[1]>0&&D.push(w(d,q(0,$,n),q(0,S,n))),(n[0]>0||n[1]>0)&&D.push(w(q(0,S,n),q(0,$,n),q(1,S,i))),i[0]>0&&i[1]>0&&D.push(w(g,q(1,S,i),q(1,$,i))),(i[0]>0||i[1]>0)&&D.push(w(q(1,S,i),q(0,$,n),q(1,$,i))))}return l<er&&(D.push(w(d,q(0,0,n),g)),D.push(w(q(0,0,n),q(1,0,i),g)),D.push(w(d,g,q(0,1,n))),D.push(w(q(0,1,n),g,q(1,1,i)))),Z$.create(D)};em.exports=Q$});var rm=m((Eee,tm)=>{var eR=Wc(),{isGT:tR}=qe(),rR=e=>{let t={center:[0,0,0],height:2,radius:1,segments:32},{center:r,height:s,radius:n,segments:o}=Object.assign({},t,e);if(!tR(n,0))throw new Error("radius must be greater than zero");return eR({center:r,height:s,startRadius:[n,n],endRadius:[n,n],segments:o})};tm.exports=rR});var Jc=m((yee,am)=>{var{TAU:sm}=j(),O=k(),sR=X(),nm=H(),{sin:om,cos:im}=Re(),{isGTE:nR,isNumberArray:cm}=qe(),oR=e=>{let t={center:[0,0,0],radius:[1,1,1],segments:32,axes:[[1,0,0],[0,-1,0],[0,0,1]]},{center:r,radius:s,segments:n,axes:o}=Object.assign({},t,e);if(!cm(r,3))throw new Error("center must be an array of X, Y and Z values");if(!cm(s,3))throw new Error("radius must be an array of X, Y and Z values");if(!s.every(g=>g>0))throw new Error("radius values must be greater than zero");if(!nR(n,4))throw new Error("segments must be four or more");let i=O.scale(O.create(),O.normalize(O.create(),o[0]),s[0]),c=O.scale(O.create(),O.normalize(O.create(),o[1]),s[1]),a=O.scale(O.create(),O.normalize(O.create(),o[2]),s[2]),l=Math.round(n/4),u,h=[],f=O.create(),d=O.create();for(let g=0;g<=n;g++){let p=sm*g/n,x=O.add(O.create(),O.scale(f,i,im(p)),O.scale(d,c,om(p)));if(g>0){let v,y;for(let b=0;b<=l;b++){let E=sm/4*b/l,q=im(E),w=om(E);if(b>0){let D=[],T;T=O.subtract(O.create(),O.scale(f,u,v),O.scale(d,a,y)),D.push(O.add(T,T,r)),T=O.subtract(O.create(),O.scale(f,x,v),O.scale(d,a,y)),D.push(O.add(T,T,r)),b<l&&(T=O.subtract(O.create(),O.scale(f,x,q),O.scale(d,a,w)),D.push(O.add(T,T,r))),T=O.subtract(O.create(),O.scale(f,u,q),O.scale(d,a,w)),D.push(O.add(T,T,r)),h.push(nm.create(D)),D=[],T=O.add(O.create(),O.scale(f,u,v),O.scale(d,a,y)),D.push(O.add(O.create(),r,T)),T=O.add(T,O.scale(f,x,v),O.scale(d,a,y)),D.push(O.add(O.create(),r,T)),b<l&&(T=O.add(T,O.scale(f,x,q),O.scale(d,a,w)),D.push(O.add(O.create(),r,T))),T=O.add(T,O.scale(f,u,q),O.scale(d,a,w)),D.push(O.add(O.create(),r,T)),D.reverse(),h.push(nm.create(D))}v=q,y=w}}u=x}return sR.create(h)};am.exports=oR});var Kc=m((Aee,um)=>{var iR=X(),cR=H(),{isNumberArray:lm}=qe(),aR=e=>{let t={points:[],faces:[],colors:void 0,orientation:"outward"},{points:r,faces:s,colors:n,orientation:o}=Object.assign({},t,e);if(!(Array.isArray(r)&&Array.isArray(s)))throw new Error("points and faces must be arrays");if(r.length<3)throw new Error("three or more points are required");if(s.length<1)throw new Error("one or more faces are required");if(n){if(!Array.isArray(n))throw new Error("colors must be an array");if(n.length!==s.length)throw new Error("faces and colors must have the same length")}r.forEach((c,a)=>{if(!lm(c,3))throw new Error(`point ${a} must be an array of X, Y, Z values`)}),s.forEach((c,a)=>{if(c.length<3)throw new Error(`face ${a} must contain 3 or more indexes`);if(!lm(c,c.length))throw new Error(`face ${a} must be an array of numbers`)}),o!=="outward"&&s.forEach(c=>c.reverse());let i=s.map((c,a)=>{let l=cR.create(c.map(u=>r[u]));return n&&n[a]&&(l.color=n[a]),l});return iR.create(i)};um.exports=aR});var dm=m((bee,pm)=>{var fm=ie(),hm=k(),lR=X(),uR=Kc(),{isGT:fR,isGTE:hR}=qe(),pR=e=>{let t={radius:1,frequency:6},{radius:r,frequency:s}=Object.assign({},t,e);if(!fR(r,0))throw new Error("radius must be greater than zero");if(!hR(s,6))throw new Error("frequency must be six or more");s=Math.floor(s/6);let n=[[.850651,0,-.525731],[.850651,-0,.525731],[-.850651,-0,.525731],[-.850651,0,-.525731],[0,-.525731,.850651],[0,.525731,.850651],[0,.525731,-.850651],[0,-.525731,-.850651],[-.525731,-.850651,-0],[.525731,-.850651,-0],[.525731,.850651,0],[-.525731,.850651,0]],o=[[0,9,1],[1,10,0],[6,7,0],[10,6,0],[7,9,0],[5,1,4],[4,1,9],[5,10,1],[2,8,3],[3,11,2],[2,5,4],[4,8,2],[2,11,5],[3,7,6],[6,11,3],[8,7,3],[9,8,4],[11,10,5],[10,11,6],[8,9,7]],i=(f,d,g)=>{let p=f[0],x=f[1],v=f[2],y=g,b=[],E=[];for(let q=0;q<d;q++)for(let w=0;w<d-q;w++){let D=q/d,T=(q+1)/d,A=w/(d-q),S=(w+1)/(d-q),$=d-q-1?w/(d-q-1):1,C=[];C[0]=c(c(p,x,A),v,D),C[1]=c(c(p,x,S),v,D),C[2]=c(c(p,x,$),v,T);for(let F=0;F<3;F++){let R=hm.length(C[F]);for(let P=0;P<3;P++)C[F][P]/=R}if(b.push(C[0],C[1],C[2]),E.push([y,y+1,y+2]),y+=3,w<d-q-1){let F=d-q-1?(w+1)/(d-q-1):1;C[0]=c(c(p,x,S),v,D),C[1]=c(c(p,x,F),v,T),C[2]=c(c(p,x,$),v,T);for(let R=0;R<3;R++){let P=hm.length(C[R]);for(let I=0;I<3;I++)C[R][I]/=P}b.push(C[0],C[1],C[2]),E.push([y,y+1,y+2]),y+=3}}return{points:b,triangles:E,offset:y}},c=(f,d,g)=>{let p=1-g,x=[];for(let v=0;v<3;v++)x[v]=f[v]*p+d[v]*g;return x},a=[],l=[],u=0;for(let f=0;f<o.length;f++){let d=i([n[o[f][0]],n[o[f][1]],n[o[f][2]]],s,u);a=a.concat(d.points),l=l.concat(d.triangles),u=d.offset}let h=uR({points:a,faces:l,orientation:"inward"});return r!==1&&(h=lR.transform(fm.fromScaling(fm.create(),[r,r,r]),h)),h};pm.exports=pR});var mm=m((wee,gm)=>{var dR=se(),gR=e=>{if(!Array.isArray(e))throw new Error("points must be an array");return dR.fromPoints({},e)};gm.exports=gR});var vm=m((qee,xm)=>{var Qc=G(),mR=e=>{let t={points:[],paths:[]},{points:r,paths:s}=Object.assign({},t,e);if(!(Array.isArray(r)&&Array.isArray(s)))throw new Error("points and paths must be arrays");let n=r;Array.isArray(r[0])&&(Array.isArray(r[0][0])||(n=[r])),n.forEach((a,l)=>{if(!Array.isArray(a))throw new Error("list of points "+l+" must be an array");if(a.length<3)throw new Error("list of points "+l+" must contain three or more points");a.forEach((u,h)=>{if(!Array.isArray(u))throw new Error("list of points "+l+", point "+h+" must be an array");if(u.length<2)throw new Error("list of points "+l+", point "+h+" must contain by X and Y values")})});let o=s;if(s.length===0){let a=0;o=n.map(l=>l.map(u=>a++))}let i=[];n.forEach(a=>a.forEach(l=>i.push(l)));let c=[];return o.forEach(a=>{let l=a.map(h=>i[h]),u=Qc.fromPoints(l);c=c.concat(Qc.toSides(u))}),Qc.create(c)};xm.exports=mR});var ea=m((See,ym)=>{var tr=Y(),xR=G(),{isNumberArray:Em}=qe(),vR=e=>{let t={center:[0,0],size:[2,2]},{center:r,size:s}=Object.assign({},t,e);if(!Em(r,2))throw new Error("center must be an array of X and Y values");if(!Em(s,2))throw new Error("size must be an array of X and Y values");if(!s.every(c=>c>0))throw new Error("size values must be greater than zero");let n=[s[0]/2,s[1]/2],o=[n[0],-n[1]],i=[tr.subtract(tr.create(),r,n),tr.add(tr.create(),r,o),tr.add(tr.create(),r,n),tr.subtract(tr.create(),r,o)];return xR.fromPoints(i)};ym.exports=vR});var Dm=m((Dee,Sm)=>{var{EPS:io,TAU:Us}=j(),ta=Y(),ye=k(),ER=X(),Yr=H(),{sin:yR,cos:AR}=Re(),{isGT:bR,isGTE:wR,isNumberArray:Am}=qe(),bm=(e,t,r,s,n,o)=>{let i=Us/4*n/s,c=AR(i),a=yR(i),l=s-n,u=r*c,h=t[2]-(r-r*a);o||(h=r-r*a-t[2]),u=u>io?u:0;let f=ye.add(ye.create(),e,[t[0]-r,t[1]-r,h]),d=ye.add(ye.create(),e,[r-t[0],t[1]-r,h]),g=ye.add(ye.create(),e,[r-t[0],r-t[1],h]),p=ye.add(ye.create(),e,[t[0]-r,r-t[1],h]),x=[],v=[],y=[],b=[];for(let E=0;E<=l;E++){let q=l>0?Us/4*E/l:0,w=ta.fromAngleRadians(ta.create(),q);ta.scale(w,w,u);let D=ye.fromVec2(ye.create(),w);x.push(ye.add(ye.create(),f,D)),ye.rotateZ(D,D,[0,0,0],Us/4),v.push(ye.add(ye.create(),d,D)),ye.rotateZ(D,D,[0,0,0],Us/4),y.push(ye.add(ye.create(),g,D)),ye.rotateZ(D,D,[0,0,0],Us/4),b.push(ye.add(ye.create(),p,D))}return o?[x,v,y,b]:(x.reverse(),v.reverse(),y.reverse(),b.reverse(),[b,y,v,x])},wm=(e,t)=>{let r=[];for(let s=0;s<e.length;s++){let n=e[s],o=t[s];for(let i=0;i<n.length-1;i++)r.push(Yr.create([n[i],n[i+1],o[i]])),i<o.length-1&&r.push(Yr.create([o[i],n[i+1],o[i+1]]))}return r},qm=(e,t)=>{let r=[];for(let s=0;s<e.length;s++){let n=e[s],o=t[s],i=n[n.length-1],c=o[o.length-1],a=(s+1)%e.length;n=e[a],o=t[a];let l=n[0],u=o[0];r.push(Yr.create([i,l,u,c]))}return r},qR=(e,t)=>{e=[e[3],e[2],e[1],e[0]],e=e.map(o=>o.slice().reverse());let r=[];e.forEach(o=>{o.forEach(i=>r.push(i))});let s=[];t.forEach(o=>{o.forEach(i=>s.push(i))});let n=[];for(let o=0;o<s.length;o++){let i=(o+1)%s.length;n.push(Yr.create([r[o],r[i],s[i],s[o]]))}return n},SR=e=>{let t={center:[0,0,0],size:[2,2,2],roundRadius:.2,segments:32},{center:r,size:s,roundRadius:n,segments:o}=Object.assign({},t,e);if(!Am(r,3))throw new Error("center must be an array of X, Y and Z values");if(!Am(s,3))throw new Error("size must be an array of X, Y and Z values");if(!s.every(l=>l>0))throw new Error("size values must be greater than zero");if(!bR(n,0))throw new Error("roundRadius must be greater than zero");if(!wR(o,4))throw new Error("segments must be four or more");if(s=s.map(l=>l/2),n>s[0]-io||n>s[1]-io||n>s[2]-io)throw new Error("roundRadius must be smaller then the radius of all dimensions");o=Math.floor(o/4);let i=null,c=null,a=[];for(let l=0;l<=o;l++){let u=bm(r,s,n,o,l,!0),h=bm(r,s,n,o,l,!1);if(l===0&&(a=a.concat(qR(h,u))),i&&(a=a.concat(wm(i,u),qm(i,u))),c&&(a=a.concat(wm(c,h),qm(c,h))),l===o){let f=u.map(d=>d[0]);a.push(Yr.create(f)),f=h.map(d=>d[0]),a.push(Yr.create(f))}i=u,c=h}return ER.create(a)};Sm.exports=SR});var Mm=m((Tee,Im)=>{var{EPS:Tm,TAU:Cm}=j(),N=k(),DR=X(),TR=H(),{sin:$m,cos:Rm}=Re(),{isGT:ra,isGTE:CR,isNumberArray:$R}=qe(),RR=e=>{let t={center:[0,0,0],height:2,radius:1,roundRadius:.2,segments:32},{center:r,height:s,radius:n,roundRadius:o,segments:i}=Object.assign({},t,e);if(!$R(r,3))throw new Error("center must be an array of X, Y and Z values");if(!ra(s,0))throw new Error("height must be greater then zero");if(!ra(n,0))throw new Error("radius must be greater then zero");if(!ra(o,0))throw new Error("roundRadius must be greater then zero");if(o>n-Tm)throw new Error("roundRadius must be smaller then the radius");if(!CR(i,4))throw new Error("segments must be four or more");let c=[0,0,-(s/2)],a=[0,0,s/2],l=N.subtract(N.create(),a,c),u=N.length(l);if(2*o>u-Tm)throw new Error("height must be larger than twice roundRadius");let h;Math.abs(l[0])>Math.abs(l[1])?h=N.fromValues(0,1,0):h=N.fromValues(1,0,0);let f=N.scale(N.create(),N.normalize(N.create(),l),o),d=N.scale(N.create(),N.normalize(N.create(),N.cross(N.create(),f,h)),n),g=N.scale(N.create(),N.normalize(N.create(),N.cross(N.create(),d,f)),n);N.add(c,c,f),N.subtract(a,a,f);let p=Math.floor(.25*i),x=w=>{let D=w.map(T=>N.add(T,T,r));return TR.create(D)},v=[],y=N.create(),b=N.create(),E;for(let w=0;w<=i;w++){let D=Cm*w/i,T=N.add(N.create(),N.scale(y,d,Rm(D)),N.scale(b,g,$m(D)));if(w>0){let A=[];A.push(N.add(N.create(),c,T)),A.push(N.add(N.create(),c,E)),A.push(N.add(N.create(),a,E)),A.push(N.add(N.create(),a,T)),v.push(x(A));let S,$;for(let C=0;C<=p;C++){let F=Cm/4*C/p,R=Rm(F),P=$m(F);if(C>0){A=[];let I;I=N.add(N.create(),c,N.subtract(y,N.scale(y,E,S),N.scale(b,f,$))),A.push(I),I=N.add(N.create(),c,N.subtract(y,N.scale(y,T,S),N.scale(b,f,$))),A.push(I),C<p&&(I=N.add(N.create(),c,N.subtract(y,N.scale(y,T,R),N.scale(b,f,P))),A.push(I)),I=N.add(N.create(),c,N.subtract(y,N.scale(y,E,R),N.scale(b,f,P))),A.push(I),v.push(x(A)),A=[],I=N.add(N.create(),N.scale(y,E,S),N.scale(b,f,$)),N.add(I,I,a),A.push(I),I=N.add(N.create(),N.scale(y,T,S),N.scale(b,f,$)),N.add(I,I,a),A.push(I),C<p&&(I=N.add(N.create(),N.scale(y,T,R),N.scale(b,f,P)),N.add(I,I,a),A.push(I)),I=N.add(N.create(),N.scale(y,E,R),N.scale(b,f,P)),N.add(I,I,a),A.push(I),A.reverse(),v.push(x(A))}S=R,$=P}}E=T}return DR.create(v)};Im.exports=RR});var km=m((Cee,Pm)=>{var{EPS:Fm,TAU:co}=j(),he=Y(),IR=G(),{isGT:MR,isGTE:FR,isNumberArray:Nm}=qe(),NR=e=>{let t={center:[0,0],size:[2,2],roundRadius:.2,segments:32},{center:r,size:s,roundRadius:n,segments:o}=Object.assign({},t,e);if(!Nm(r,2))throw new Error("center must be an array of X and Y values");if(!Nm(s,2))throw new Error("size must be an array of X and Y values");if(!s.every(p=>p>0))throw new Error("size values must be greater than zero");if(!MR(n,0))throw new Error("roundRadius must be greater than zero");if(!FR(o,4))throw new Error("segments must be four or more");if(s=s.map(p=>p/2),n>s[0]-Fm||n>s[1]-Fm)throw new Error("roundRadius must be smaller then the radius of all dimensions");let i=Math.floor(o/4),c=he.add(he.create(),r,[s[0]-n,s[1]-n]),a=he.add(he.create(),r,[n-s[0],s[1]-n]),l=he.add(he.create(),r,[n-s[0],n-s[1]]),u=he.add(he.create(),r,[s[0]-n,n-s[1]]),h=[],f=[],d=[],g=[];for(let p=0;p<=i;p++){let x=co/4*p/i,v=he.fromAngleRadians(he.create(),x);he.scale(v,v,n),h.push(he.add(he.create(),c,v)),he.rotate(v,v,he.create(),co/4),f.push(he.add(he.create(),a,v)),he.rotate(v,v,he.create(),co/4),d.push(he.add(he.create(),l,v)),he.rotate(v,v,he.create(),co/4),g.push(he.add(he.create(),u,v))}return IR.fromPoints(h.concat(f,d,g))};Pm.exports=NR});var sa=m(($ee,Om)=>{var PR=Jc(),{isGT:kR}=qe(),OR=e=>{let t={center:[0,0,0],radius:1,segments:32,axes:[[1,0,0],[0,-1,0],[0,0,1]]},{center:r,radius:s,segments:n,axes:o}=Object.assign({},t,e);if(!kR(s,0))throw new Error("radius must be greater than zero");return s=[s,s,s],PR({center:r,radius:s,segments:n,axes:o})};Om.exports=OR});var zm=m((Ree,Lm)=>{var LR=ea(),{isGT:zR}=qe(),_R=e=>{let t={center:[0,0],size:2},{center:r,size:s}=Object.assign({},t,e);if(!zR(s,0))throw new Error("size must be greater than zero");return s=[s,s],LR({center:r,size:s})};Lm.exports=_R});var Gm=m((Iee,Vm)=>{var{TAU:Bm}=j(),Ws=Y(),BR=G(),{isGT:VR,isGTE:ao,isNumberArray:GR}=qe(),XR=(e,t)=>e>0&&t>1&&t<e/2?Math.cos(Math.PI*t/e)/Math.cos(Math.PI*(t-1)/e):0,_m=(e,t,r,s)=>{let n=Bm/e,o=[];for(let i=0;i<e;i++){let c=Ws.fromAngleRadians(Ws.create(),n*i+r);Ws.scale(c,c,t),Ws.add(c,s,c),o.push(c)}return o},YR=e=>{let t={center:[0,0],vertices:5,outerRadius:1,innerRadius:0,density:2,startAngle:0},{center:r,vertices:s,outerRadius:n,innerRadius:o,density:i,startAngle:c}=Object.assign({},t,e);if(!GR(r,2))throw new Error("center must be an array of X and Y values");if(!ao(s,2))throw new Error("vertices must be two or more");if(!VR(n,0))throw new Error("outerRadius must be greater than zero");if(!ao(o,0))throw new Error("innerRadius must be greater than zero");if(!ao(c,0))throw new Error("startAngle must be greater than zero");if(s=Math.floor(s),i=Math.floor(i),c=c%Bm,o===0){if(!ao(i,2))throw new Error("density must be two or more");o=n*XR(s,i)}let a=Ws.clone(r),l=_m(s,n,c,a),u=_m(s,o,c+Math.PI/s,a),h=[];for(let f=0;f<s;f++)h.push(l[f]),h.push(u[f]);return BR.fromPoints(h)};Vm.exports=YR});var Hr=m((Mee,Um)=>{var HR=B(),Xm=ie(),Ym=ht(),Hm=G(),jm=X(),Zm=se(),lo=(e,...t)=>{let r={origin:[0,0,0],normal:[0,0,1]},{origin:s,normal:n}=Object.assign({},r,e);if(t=HR(t),t.length===0)throw new Error("wrong number of arguments");let o=Ym.fromNormalAndPoint(Ym.create(),n,s);if(Number.isNaN(o[0]))throw new Error("the given origin and normal do not define a proper plane");let i=Xm.mirrorByPlane(Xm.create(),o),c=t.map(a=>Zm.isA(a)?Zm.transform(i,a):Hm.isA(a)?Hm.transform(i,a):jm.isA(a)?jm.transform(i,a):a);return c.length===1?c[0]:c},jR=(...e)=>lo({normal:[1,0,0]},e),ZR=(...e)=>lo({normal:[0,1,0]},e),UR=(...e)=>lo({normal:[0,0,1]},e);Um.exports={mirror:lo,mirrorX:jR,mirrorY:ZR,mirrorZ:UR}});var na=m((Fee,Jm)=>{var Wm=ht(),br=k(),WR=e=>{let t=e.edges;if(t.length<3)throw new Error("slices must have 3 or more edges to calculate a plane");let r=t.reduce((i,c)=>br.add(br.create(),i,c[0]),br.create());br.scale(r,r,1/t.length);let s,n=0;t.forEach(i=>{if(!br.equals(i[0],i[1])){let c=br.squaredDistance(r,i[0]);c>n&&(s=i,n=c)}});let o=t.find(i=>br.equals(i[1],s[0]));return Wm.fromPoints(Wm.create(),o[0],s[0],s[1])};Jm.exports=WR});var rr=m((Nee,Km)=>{var JR=e=>(e||(e=[]),{edges:e});Km.exports=JR});var t3=m((Pee,e3)=>{var KR=rr(),Qm=k(),QR=(...e)=>{let t,r;return e.length===1?(t=KR(),r=e[0]):(t=e[0],r=e[1]),t.edges=r.edges.map(s=>[Qm.clone(s[0]),Qm.clone(s[1])]),t};e3.exports=QR});var s3=m((kee,r3)=>{var eI=k(),tI=(e,t)=>{let r=e.edges,s=t.edges;return r.length!==s.length?!1:r.reduce((o,i,c)=>{let a=s[c],l=eI.squaredDistance(i[0],a[0]);return o&&l<Number.EPSILON},!0)};r3.exports=tI});var o3=m((Oee,n3)=>{var uo=k(),rI=rr(),sI=e=>{if(!Array.isArray(e))throw new Error("the given points must be an array");if(e.length<3)throw new Error("the given points must contain THREE or more points");let t=[],r=e[e.length-1];return e.forEach(s=>{s.length===2&&t.push([uo.fromVec2(uo.create(),r),uo.fromVec2(uo.create(),s)]),s.length===3&&t.push([r,s]),r=s}),rI(t)};n3.exports=sI});var c3=m((Lee,i3)=>{var fo=k(),nI=rr(),oI=e=>{if(!Array.isArray(e))throw new Error("the given sides must be an array");let t=[];return e.forEach(r=>{t.push([fo.fromVec2(fo.create(),r[0]),fo.fromVec2(fo.create(),r[1])])}),nI(t)};i3.exports=oI});var l3=m((zee,a3)=>{var iI=e=>!!(e&&typeof e=="object"&&"edges"in e&&Array.isArray(e.edges));a3.exports=iI});var f3=m((_ee,u3)=>{var cI=rr(),aI=(...e)=>{let t,r;return e.length===1?(t=cI(),r=e[0]):(t=e[0],r=e[1]),t.edges=r.edges.map(s=>[s[1],s[0]]),t};u3.exports=aI});var p3=m((Bee,h3)=>{var lI=e=>e.edges;h3.exports=lI});var g3=m((Vee,d3)=>{var uI=(e,t)=>{let r,s,n,o,i,c=1;do{s=e,e=null;let a=null;for(i=0;s;){i++,n=s;let l=0;for(r=0;r<c&&(l++,n=n.nextZ,!!n);r++);let u=c;for(;l>0||u>0&&n;)l!==0&&(u===0||!n||t(s)<=t(n))?(o=s,s=s.nextZ,l--):(o=n,n=n.nextZ,u--),a?a.nextZ=o:e=o,o.prevZ=a,a=o;s=n}a.nextZ=null,c*=2}while(i>1);return e};d3.exports=uI});var oa=m((Gee,m3)=>{var fI=g3(),ho=class{constructor(t,r,s){this.i=t,this.x=r,this.y=s,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}},hI=(e,t,r,s)=>{let n=new ho(e,t,r);return s?(n.next=s.next,n.prev=s,s.next.prev=n,s.next=n):(n.prev=n,n.next=n),n},pI=e=>{e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)};m3.exports={Node:ho,insertNode:hI,removeNode:pI,sortLinked:fI}});var po=m((Xee,x3)=>{var dI=(e,t,r,s,n,o,i,c)=>(n-i)*(t-c)-(e-i)*(o-c)>=0&&(e-i)*(s-c)-(r-i)*(t-c)>=0&&(r-i)*(o-c)-(n-i)*(s-c)>=0,gI=(e,t,r)=>(t.y-e.y)*(r.x-t.x)-(t.x-e.x)*(r.y-t.y);x3.exports={area:gI,pointInTriangle:dI}});var ia=m((Yee,b3)=>{var{Node:v3,insertNode:E3,removeNode:mo}=oa(),{area:He}=po(),mI=(e,t,r,s,n)=>{let o;if(n===bI(e,t,r,s)>0)for(let i=t;i<r;i+=s)o=E3(i,e[i],e[i+1],o);else for(let i=r-s;i>=t;i-=s)o=E3(i,e[i],e[i+1],o);return o&&xo(o,o.next)&&(mo(o),o=o.next),o},y3=(e,t)=>{if(!e)return e;t||(t=e);let r=e,s;do if(s=!1,!r.steiner&&(xo(r,r.next)||He(r.prev,r,r.next)===0)){if(mo(r),r=t=r.prev,r===r.next)break;s=!0}else r=r.next;while(s||r!==t);return t},xI=(e,t,r)=>{let s=e;do{let n=s.prev,o=s.next.next;!xo(n,o)&&A3(n,s,s.next,o)&&Js(n,o)&&Js(o,n)&&(t.push(n.i/r),t.push(s.i/r),t.push(o.i/r),mo(s),mo(s.next),s=e=o),s=s.next}while(s!==e);return y3(s)},vI=(e,t)=>{let r=e;do{if(r.i!==e.i&&r.next.i!==e.i&&r.i!==t.i&&r.next.i!==t.i&&A3(r,r.next,e,t))return!0;r=r.next}while(r!==e);return!1},Js=(e,t)=>He(e.prev,e,e.next)<0?He(e,t,e.next)>=0&&He(e,e.prev,t)>=0:He(e,t,e.prev)<0||He(e,e.next,t)<0,EI=(e,t)=>{let r=e,s=!1,n=(e.x+t.x)/2,o=(e.y+t.y)/2;do r.y>o!=r.next.y>o&&r.next.y!==r.y&&n<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(s=!s),r=r.next;while(r!==e);return s},yI=(e,t)=>{let r=new v3(e.i,e.x,e.y),s=new v3(t.i,t.x,t.y),n=e.next,o=t.prev;return e.next=t,t.prev=e,r.next=n,n.prev=r,s.next=r,r.prev=s,o.next=s,s.prev=o,s},AI=(e,t)=>e.next.i!==t.i&&e.prev.i!==t.i&&!vI(e,t)&&(Js(e,t)&&Js(t,e)&&EI(e,t)&&(He(e.prev,e,t.prev)||He(e,t.prev,t))||xo(e,t)&&He(e.prev,e,e.next)>0&&He(t.prev,t,t.next)>0),A3=(e,t,r,s)=>{let n=Math.sign(He(e,t,r)),o=Math.sign(He(e,t,s)),i=Math.sign(He(r,s,e)),c=Math.sign(He(r,s,t));return!!(n!==o&&i!==c||n===0&&go(e,r,t)||o===0&&go(e,s,t)||i===0&&go(r,e,s)||c===0&&go(r,t,s))},go=(e,t,r)=>t.x<=Math.max(e.x,r.x)&&t.x>=Math.min(e.x,r.x)&&t.y<=Math.max(e.y,r.y)&&t.y>=Math.min(e.y,r.y),bI=(e,t,r,s)=>{let n=0;for(let o=t,i=r-s;o<r;o+=s)n+=(e[i]-e[o])*(e[o+1]+e[i+1]),i=o;return n},xo=(e,t)=>e.x===t.x&&e.y===t.y;b3.exports={cureLocalIntersections:xI,filterPoints:y3,isValidDiagonal:AI,linkedPolygon:mI,locallyInside:Js,splitPolygon:yI}});var S3=m((Hee,q3)=>{var{filterPoints:ca,linkedPolygon:wI,locallyInside:qI,splitPolygon:SI}=ia(),{area:w3,pointInTriangle:DI}=po(),TI=(e,t,r,s)=>{let n=[];for(let o=0,i=t.length;o<i;o++){let c=t[o]*s,a=o<i-1?t[o+1]*s:e.length,l=wI(e,c,a,s,!1);l===l.next&&(l.steiner=!0),n.push(II(l))}n.sort((o,i)=>o.x-i.x);for(let o=0;o<n.length;o++)r=CI(n[o],r),r=ca(r,r.next);return r},CI=(e,t)=>{let r=$I(e,t);if(!r)return t;let s=SI(r,e),n=ca(r,r.next);return ca(s,s.next),t===r?n:t},$I=(e,t)=>{let r=t,s=e.x,n=e.y,o=-1/0,i;do{if(n<=r.y&&n>=r.next.y&&r.next.y!==r.y){let h=r.x+(n-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(h<=s&&h>o){if(o=h,h===s){if(n===r.y)return r;if(n===r.next.y)return r.next}i=r.x<r.next.x?r:r.next}}r=r.next}while(r!==t);if(!i)return null;if(s===o)return i;let c=i,a=i.x,l=i.y,u=1/0;r=i;do{if(s>=r.x&&r.x>=a&&s!==r.x&&DI(n<l?s:o,n,a,l,n<l?o:s,n,r.x,r.y)){let h=Math.abs(n-r.y)/(s-r.x);qI(r,e)&&(h<u||h===u&&(r.x>i.x||r.x===i.x&&RI(i,r)))&&(i=r,u=h)}r=r.next}while(r!==c);return i},RI=(e,t)=>w3(e.prev,e,t.prev)<0&&w3(t.next,e,e.next)<0,II=e=>{let t=e,r=e;do(t.x<r.x||t.x===r.x&&t.y<r.y)&&(r=t),t=t.next;while(t!==e);return r};q3.exports=TI});var T3=m((jee,D3)=>{var MI=S3(),{removeNode:FI,sortLinked:NI}=oa(),{cureLocalIntersections:PI,filterPoints:vo,isValidDiagonal:kI,linkedPolygon:OI,splitPolygon:LI}=ia(),{area:wr,pointInTriangle:Ks}=po(),zI=(e,t,r=2)=>{let s=t&&t.length,n=s?t[0]*r:e.length,o=OI(e,0,n,r,!0),i=[];if(!o||o.next===o.prev)return i;let c,a,l,u,h;if(s&&(o=MI(e,t,o,r)),e.length>80*r){c=l=e[0],a=u=e[1];for(let f=r;f<n;f+=r){let d=e[f],g=e[f+1];d<c&&(c=d),g<a&&(a=g),d>l&&(l=d),g>u&&(u=g)}h=Math.max(l-c,u-a),h=h!==0?1/h:0}return Qs(o,i,r,c,a,h),i},Qs=(e,t,r,s,n,o,i)=>{if(!e)return;!i&&o&&GI(e,s,n,o);let c=e,a,l;for(;e.prev!==e.next;){if(a=e.prev,l=e.next,o?BI(e,s,n,o):_I(e)){t.push(a.i/r),t.push(e.i/r),t.push(l.i/r),FI(e),e=l.next,c=l.next;continue}if(e=l,e===c){i?i===1?(e=PI(vo(e),t,r),Qs(e,t,r,s,n,o,2)):i===2&&VI(e,t,r,s,n,o):Qs(vo(e),t,r,s,n,o,1);break}}},_I=e=>{let t=e.prev,r=e,s=e.next;if(wr(t,r,s)>=0)return!1;let n=e.next.next;for(;n!==e.prev;){if(Ks(t.x,t.y,r.x,r.y,s.x,s.y,n.x,n.y)&&wr(n.prev,n,n.next)>=0)return!1;n=n.next}return!0},BI=(e,t,r,s)=>{let n=e.prev,o=e,i=e.next;if(wr(n,o,i)>=0)return!1;let c=n.x<o.x?n.x<i.x?n.x:i.x:o.x<i.x?o.x:i.x,a=n.y<o.y?n.y<i.y?n.y:i.y:o.y<i.y?o.y:i.y,l=n.x>o.x?n.x>i.x?n.x:i.x:o.x>i.x?o.x:i.x,u=n.y>o.y?n.y>i.y?n.y:i.y:o.y>i.y?o.y:i.y,h=aa(c,a,t,r,s),f=aa(l,u,t,r,s),d=e.prevZ,g=e.nextZ;for(;d&&d.z>=h&&g&&g.z<=f;){if(d!==e.prev&&d!==e.next&&Ks(n.x,n.y,o.x,o.y,i.x,i.y,d.x,d.y)&&wr(d.prev,d,d.next)>=0||(d=d.prevZ,g!==e.prev&&g!==e.next&&Ks(n.x,n.y,o.x,o.y,i.x,i.y,g.x,g.y)&&wr(g.prev,g,g.next)>=0))return!1;g=g.nextZ}for(;d&&d.z>=h;){if(d!==e.prev&&d!==e.next&&Ks(n.x,n.y,o.x,o.y,i.x,i.y,d.x,d.y)&&wr(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;g&&g.z<=f;){if(g!==e.prev&&g!==e.next&&Ks(n.x,n.y,o.x,o.y,i.x,i.y,g.x,g.y)&&wr(g.prev,g,g.next)>=0)return!1;g=g.nextZ}return!0},VI=(e,t,r,s,n,o)=>{let i=e;do{let c=i.next.next;for(;c!==i.prev;){if(i.i!==c.i&&kI(i,c)){let a=LI(i,c);i=vo(i,i.next),a=vo(a,a.next),Qs(i,t,r,s,n,o),Qs(a,t,r,s,n,o);return}c=c.next}i=i.next}while(i!==e)},GI=(e,t,r,s)=>{let n=e;do n.z===null&&(n.z=aa(n.x,n.y,t,r,s)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==e);n.prevZ.nextZ=null,n.prevZ=null,NI(n,o=>o.z)},aa=(e,t,r,s,n)=>(e=32767*(e-r)*n,t=32767*(t-s)*n,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1);D3.exports=zI});var $3=m((Zee,C3)=>{var{area:XI}=Lr(),{toOutlines:YI}=G(),{arePointsInside:HI}=Jn(),jI=e=>{let t=YI(e),r=[],s=[];t.forEach((i,c)=>{let a=XI(i);a<0?s.push(c):a>0&&r.push(c)});let n=[],o=[];return r.forEach((i,c)=>{let a=t[i];n[c]=[],s.forEach((l,u)=>{let h=t[l];HI([h[0]],{vertices:a})&&(n[c].push(l),o[u]||(o[u]=[]),o[u].push(c))})}),s.forEach((i,c)=>{if(o[c]&&o[c].length>1){let a=ZI(o[c],l=>n[l].length);o[c].forEach((l,u)=>{u!==a&&(n[l]=n[l].filter(h=>h!==i))})}}),n.map((i,c)=>({solid:t[r[c]],holes:i.map(a=>t[a])}))},ZI=(e,t)=>{let r,s;return e.forEach((n,o)=>{let i=t(n);(s===void 0||i<s)&&(r=o,s=i)}),r};C3.exports=jI});var M3=m((Uee,I3)=>{var UI=G(),R3=ht(),WI=Y(),Fe=k(),JI=na(),KI=$3(),la=class{constructor(t){this.plane=JI(t);let r=Fe.orthogonal(Fe.create(),this.plane),s=Fe.cross(Fe.create(),this.plane,r);this.v=Fe.normalize(s,s),this.u=Fe.cross(Fe.create(),this.v,this.plane),this.basisMap=new Map;let n=t.edges.map(i=>i.map(c=>this.to2D(c))),o=UI.create(n);this.roots=KI(o)}to2D(t){let r=WI.fromValues(Fe.dot(t,this.u),Fe.dot(t,this.v));return this.basisMap.set(r,t),r}to3D(t){let r=this.basisMap.get(t);if(r)return r;{console.log("Warning: point not in original slice");let s=Fe.scale(Fe.create(),this.u,t[0]),n=Fe.scale(Fe.create(),this.v,t[1]),o=Fe.scale(Fe.create(),R3,R3[3]),i=Fe.add(s,s,o);return Fe.add(n,n,i)}}};I3.exports=la});var N3=m((Wee,F3)=>{var QI=H(),eM=T3(),tM=M3(),rM=e=>{let t=new tM(e),r=[];return t.roots.forEach(({solid:s,holes:n})=>{let o=s.length,i=[];n.forEach((h,f)=>{i.push(o),o+=h.length});let c=[s,...n].flat(),a=c.flat(),l=h=>t.to3D(c[h]),u=eM(a,i);for(let h=0;h<u.length;h+=3){let f=u.slice(h,h+3).map(l);r.push(QI.fromPointsAndPlane(f,t.plane))}}),r};F3.exports=rM});var O3=m((Jee,k3)=>{var P3=k(),sM=e=>e.reduce((t,r)=>t+=`[${P3.toString(r[0])}, ${P3.toString(r[1])}], `,""),nM=e=>`[${sM(e.edges)}]`;k3.exports=nM});var z3=m((Kee,L3)=>{var Eo=k(),oM=rr(),iM=(e,t)=>{let r=t.edges.map(s=>[Eo.transform(Eo.create(),s[0],e),Eo.transform(Eo.create(),s[1],e)]);return oM(r)};L3.exports=iM});var qr=m((Qee,_3)=>{_3.exports={calculatePlane:na(),clone:t3(),create:rr(),equals:s3(),fromPoints:o3(),fromSides:c3(),isA:l3(),reverse:f3(),toEdges:p3(),toPolygons:N3(),toString:O3(),transform:z3()}});var G3=m((ete,V3)=>{var B3=k(),cM=rr(),aM=e=>{if(!e.edges)return e;let t=e.edges,r=new Map,s=new Map;t=t.filter(i=>!B3.equals(i[0],i[1])),t.forEach(i=>{let c=i[0].toString(),a=i[1].toString();r.set(c,i[0]),r.set(a,i[1]),s.set(c,(s.get(c)||0)+1),s.set(a,(s.get(a)||0)-1)});let n=[],o=[];return s.forEach((i,c)=>{i<0&&n.push(c),i>0&&o.push(c)}),n.forEach(i=>{let c=r.get(i),a=1/0,l;o.forEach(u=>{let h=r.get(u),f=B3.distance(c,h);f<a&&(a=f,l=h)}),console.warn(`slice.repair: repairing vertex gap ${c} to ${l} distance ${a}`),t=t.map(u=>u[0].toString()===i?[l,u[1]]:u[1].toString()===i?[u[0],l]:u)}),cM(t)};V3.exports=aM});var U3=m((tte,Z3)=>{var{EPS:X3}=j(),jr=k(),yo=H(),Y3=qr(),ua=(e,t)=>e===t?e:e<t?ua(t,e):t===1?1:t===0?e:ua(t,e%t),lM=(e,t)=>e*t/ua(e,t),H3=(e,t)=>{let r=e/t.length;if(r===1)return t;let s=jr.fromValues(r,r,r),n=[];return t.forEach(o=>{let i=jr.subtract(jr.create(),o[1],o[0]);jr.divide(i,i,s);let c=o[0];for(let a=1;a<=r;++a){let l=jr.add(jr.create(),c,i);n.push([c,l]),c=l}}),n},j3=X3*X3/2*Math.sin(Math.PI/3),uM=(e,t)=>{let r=Y3.toEdges(e),s=Y3.toEdges(t);if(r.length!==s.length){let o=lM(r.length,s.length);o!==r.length&&(r=H3(o,r)),o!==s.length&&(s=H3(o,s))}let n=[];return r.forEach((o,i)=>{let c=s[i],a=yo.create([o[0],o[1],c[1]]),l=yo.measureArea(a);Number.isFinite(l)&&l>j3&&n.push(a);let u=yo.create([o[0],c[1],c[0]]),h=yo.measureArea(u);Number.isFinite(h)&&h>j3&&n.push(u)}),n};Z3.exports=uM});var en=m((rte,Q3)=>{var W3=ie(),J3=G(),fM=X(),fa=H(),sr=qr(),hM=G3(),K3=U3(),pM=(e,t,r)=>{let s=null;return J3.isA(r)&&(s=sr.fromSides(J3.toSides(r))),fa.isA(r)&&(s=sr.fromPoints(fa.toPoints(r))),e===0||e===1?sr.transform(W3.fromTranslation(W3.create(),[0,0,e]),s):null},dM=(e,t)=>{let r={numberOfSlices:2,capStart:!0,capEnd:!0,close:!1,repair:!0,callback:pM},{numberOfSlices:s,capStart:n,capEnd:o,close:i,repair:c,callback:a}=Object.assign({},r,e);if(s<2)throw new Error("numberOfSlices must be 2 or more");c&&(t=hM(t));let l=s-1,u=null,h=null,f=null,d=[];for(let g=0;g<s;g++){let p=a(g/l,g,t);if(p){if(!sr.isA(p))throw new Error("the callback function must return slice objects");if(sr.toEdges(p).length===0)throw new Error("the callback function must return slices with one or more edges");f&&(d=d.concat(K3(f,p))),g===0&&(u=p),g===s-1&&(h=p),f=p}}if(o){let g=sr.toPolygons(h);d=d.concat(g)}if(n){let g=sr.toPolygons(u).map(fa.invert);d=d.concat(g)}return!n&&!o&&i&&!sr.equals(h,u)&&(d=d.concat(K3(h,u))),fM.create(d)};Q3.exports=dM});var pa=m((ste,ex)=>{var{TAU:st}=j(),tn=ie(),{mirrorX:gM}=Hr(),rn=G(),ha=qr(),mM=en(),xM=(e,t)=>{let r={segments:12,startAngle:0,angle:st,overflow:"cap"},{segments:s,startAngle:n,angle:o,overflow:i}=Object.assign({},r,e);if(s<3)throw new Error("segments must be greater then 3");n=Math.abs(n)>st?n%st:n,o=Math.abs(o)>st?o%st:o;let c=n+o;if(c=Math.abs(c)>st?c%st:c,c<n){let y=n;n=c,c=y}let a=c-n;if(a<=0&&(a=st),Math.abs(a)<st){let y=st/s;s=Math.floor(Math.abs(a)/y),Math.abs(a)>s*y&&s++}let l=rn.toSides(t);if(l.length===0)throw new Error("the given geometry cannot be empty");let u=l.filter(y=>y[0][0]<0),h=l.filter(y=>y[0][0]>=0);u.length>0&&h.length>0&&i==="cap"&&(u.length>h.length?(l=l.map(y=>{let b=y[0],E=y[1];return b=[Math.min(b[0],0),b[1]],E=[Math.min(E[0],0),E[1]],[b,E]}),t=rn.reverse(rn.create(l)),t=gM(t)):h.length>=u.length&&(l=l.map(y=>{let b=y[0],E=y[1];return b=[Math.max(b[0],0),b[1]],E=[Math.max(E[0],0),E[1]],[b,E]}),t=rn.create(l)));let d=a/s,g=Math.abs(a)<st,p=ha.fromSides(rn.toSides(t));ha.reverse(p,p);let x=tn.create(),v=(y,b,E)=>{let q=d*b+n;return a===st&&b===s&&(q=n),tn.multiply(x,tn.fromZRotation(x,q),tn.fromXRotation(tn.create(),st/4)),ha.transform(x,E)};return e={numberOfSlices:s+1,capStart:g,capEnd:g,close:!g,callback:v},mM(e,p)};ex.exports=xM});var Zr=m((nte,ox)=>{var vM=B(),tx=ie(),rx=G(),sx=X(),nx=se(),Ao=(e,...t)=>{if(!Array.isArray(e))throw new Error("angles must be an array");if(t=vM(t),t.length===0)throw new Error("wrong number of arguments");for(e=e.slice();e.length<3;)e.push(0);let r=e[2],s=e[1],n=e[0],o=tx.fromTaitBryanRotation(tx.create(),r,s,n),i=t.map(c=>nx.isA(c)?nx.transform(o,c):rx.isA(c)?rx.transform(o,c):sx.isA(c)?sx.transform(o,c):c);return i.length===1?i[0]:i},EM=(e,...t)=>Ao([e,0,0],t),yM=(e,...t)=>Ao([0,e,0],t),AM=(e,...t)=>Ao([0,0,e],t);ox.exports={rotate:Ao,rotateX:EM,rotateY:yM,rotateZ:AM}});var nr=m((ote,ux)=>{var bM=B(),ix=ie(),cx=G(),ax=X(),lx=se(),bo=(e,...t)=>{if(!Array.isArray(e))throw new Error("offset must be an array");if(t=bM(t),t.length===0)throw new Error("wrong number of arguments");for(e=e.slice();e.length<3;)e.push(0);let r=ix.fromTranslation(ix.create(),e),s=t.map(n=>lx.isA(n)?lx.transform(r,n):cx.isA(n)?cx.transform(r,n):ax.isA(n)?ax.transform(r,n):n);return s.length===1?s[0]:s},wM=(e,...t)=>bo([e,0,0],t),qM=(e,...t)=>bo([0,e,0],t),SM=(e,...t)=>bo([0,0,e],t);ux.exports={translate:bo,translateX:wM,translateY:qM,translateZ:SM}});var hx=m((ite,fx)=>{var{TAU:DM}=j(),TM=pa(),{rotate:CM}=Zr(),{translate:$M}=nr(),RM=Hc(),{isGT:da,isGTE:ga}=qe(),IM=e=>{let t={innerRadius:1,innerSegments:32,outerRadius:4,outerSegments:32,innerRotation:0,startAngle:0,outerRotation:DM},{innerRadius:r,innerSegments:s,outerRadius:n,outerSegments:o,innerRotation:i,startAngle:c,outerRotation:a}=Object.assign({},t,e);if(!da(r,0))throw new Error("innerRadius must be greater than zero");if(!ga(s,3))throw new Error("innerSegments must be three or more");if(!da(n,0))throw new Error("outerRadius must be greater than zero");if(!ga(o,3))throw new Error("outerSegments must be three or more");if(!ga(c,0))throw new Error("startAngle must be positive");if(!da(a,0))throw new Error("outerRotation must be greater than zero");if(r>=n)throw new Error("inner circle is two large to rotate about the outer circle");let l=RM({radius:r,segments:s});return i!==0&&(l=CM([0,0,i],l)),l=$M([n,0],l),TM({startAngle:c,angle:a,segments:o},l)};fx.exports=IM});var dx=m((cte,px)=>{var{NEPS:Ur}=j(),sn=Y(),MM=G(),{isNumberArray:FM}=qe(),ma=(e,t,r)=>Math.acos((e*e+t*t-r*r)/(2*e*t)),NM=(e,t,r)=>t>Ur?Math.sqrt(e*e+r*r-2*e*r*Math.cos(t)):Math.sqrt((e-r)*(e-r)+e*r*t*t*(1-t*t/12)),PM=e=>{if(Math.abs(e[0]+e[1]+e[2]-Math.PI)>Ur)throw new Error("AAA triangles require angles that sum to PI");let r=e[0],s=e[1],n=Math.PI-r-s,o=1,i=o/Math.sin(n)*Math.sin(r),c=o/Math.sin(n)*Math.sin(s);return Wr(r,s,n,i,c,o)},kM=e=>{let t=e[0],r=e[1],s=Math.PI+Ur-t-r;if(s<Ur)throw new Error("AAS triangles require angles that sum to PI");let n=e[2],o=n/Math.sin(t)*Math.sin(r),i=n/Math.sin(t)*Math.sin(s);return Wr(t,r,s,n,o,i)},OM=e=>{let t=e[0],r=e[2],s=Math.PI+Ur-t-r;if(s<Ur)throw new Error("ASA triangles require angles that sum to PI");let n=e[1],o=n/Math.sin(s)*Math.sin(t),i=n/Math.sin(s)*Math.sin(r);return Wr(t,r,s,o,i,n)},LM=e=>{let t=e[0],r=e[1],s=e[2],n=NM(t,r,s),o=ma(n,t,s),i=Math.PI-o-r;return Wr(o,r,i,s,n,t)},zM=e=>{let t=e[0],r=e[1],s=e[2],n=Math.asin(r*Math.sin(s)/t),o=Math.PI-n-s,i=t/Math.sin(s)*Math.sin(o);return Wr(n,o,s,r,i,t)},_M=e=>{let t=e[1],r=e[2],s=e[0];if(t+r<=s||r+s<=t||s+t<=r)throw new Error("SSS triangle is incorrect, as the longest side is longer than the sum of the other sides");let n=ma(r,s,t),o=ma(s,t,r),i=Math.PI-n-o;return Wr(n,o,i,t,r,s)},Wr=(e,t,r,s,n,o)=>{let i=sn.fromValues(0,0),c=sn.fromValues(o,0),a=sn.fromValues(s,0);return sn.add(a,sn.rotate(a,a,[0,0],Math.PI-t),c),MM.fromPoints([i,c,a])},BM=e=>{let t={type:"SSS",values:[1,1,1]},{type:r,values:s}=Object.assign({},t,e);if(typeof r!="string")throw new Error("triangle type must be a string");if(r=r.toUpperCase(),!((r[0]==="A"||r[0]==="S")&&(r[1]==="A"||r[1]==="S")&&(r[2]==="A"||r[2]==="S")))throw new Error("triangle type must contain three letters; A or S");if(!FM(s,3))throw new Error("triangle values must contain three values");if(!s.every(n=>n>0))throw new Error("triangle values must be greater than zero");switch(r){case"AAA":return PM(s);case"AAS":return kM(s);case"ASA":return OM(s);case"SAS":return LM(s);case"SSA":return zM(s);case"SSS":return _M(s);default:throw new Error("invalid triangle type, try again")}};px.exports=BM});var mx=m((ate,gx)=>{gx.exports={arc:Xg(),circle:Hc(),cube:Kg(),cuboid:jc(),cylinder:rm(),cylinderElliptic:Wc(),ellipse:Yc(),ellipsoid:Jc(),geodesicSphere:dm(),line:mm(),polygon:vm(),polyhedron:Kc(),rectangle:ea(),roundedCuboid:Dm(),roundedCylinder:Mm(),roundedRectangle:km(),sphere:sa(),square:zm(),star:Gm(),torus:hx(),triangle:dx()}});var vx=m((lte,xx)=>{xx.exports={height:14,32:[16],33:[10,5,21,5,7,void 0,5,2,4,1,5,0,6,1,5,2],34:[16,4,21,4,14,void 0,12,21,12,14],35:[21,11,25,4,-7,void 0,17,25,10,-7,void 0,4,12,18,12,void 0,3,6,17,6],36:[20,8,25,8,-4,void 0,12,25,12,-4,void 0,17,18,15,20,12,21,8,21,5,20,3,18,3,16,4,14,5,13,7,12,13,10,15,9,16,8,17,6,17,3,15,1,12,0,8,0,5,1,3,3],37:[24,21,21,3,0,void 0,8,21,10,19,10,17,9,15,7,14,5,14,3,16,3,18,4,20,6,21,8,21,10,20,13,19,16,19,19,20,21,21,void 0,17,7,15,6,14,4,14,2,16,0,18,0,20,1,21,3,21,5,19,7,17,7],38:[26,23,12,23,13,22,14,21,14,20,13,19,11,17,6,15,3,13,1,11,0,7,0,5,1,4,2,3,4,3,6,4,8,5,9,12,13,13,14,14,16,14,18,13,20,11,21,9,20,8,18,8,16,9,13,11,10,16,3,18,1,20,0,22,0,23,1,23,2],39:[10,5,19,4,20,5,21,6,20,6,18,5,16,4,15],40:[14,11,25,9,23,7,20,5,16,4,11,4,7,5,2,7,-2,9,-5,11,-7],41:[14,3,25,5,23,7,20,9,16,10,11,10,7,9,2,7,-2,5,-5,3,-7],42:[16,8,21,8,9,void 0,3,18,13,12,void 0,13,18,3,12],43:[26,13,18,13,0,void 0,4,9,22,9],44:[10,6,1,5,0,4,1,5,2,6,1,6,-1,5,-3,4,-4],45:[26,4,9,22,9],46:[10,5,2,4,1,5,0,6,1,5,2],47:[22,20,25,2,-7],48:[20,9,21,6,20,4,17,3,12,3,9,4,4,6,1,9,0,11,0,14,1,16,4,17,9,17,12,16,17,14,20,11,21,9,21],49:[20,6,17,8,18,11,21,11,0],50:[20,4,16,4,17,5,19,6,20,8,21,12,21,14,20,15,19,16,17,16,15,15,13,13,10,3,0,17,0],51:[20,5,21,16,21,10,13,13,13,15,12,16,11,17,8,17,6,16,3,14,1,11,0,8,0,5,1,4,2,3,4],52:[20,13,21,3,7,18,7,void 0,13,21,13,0],53:[20,15,21,5,21,4,12,5,13,8,14,11,14,14,13,16,11,17,8,17,6,16,3,14,1,11,0,8,0,5,1,4,2,3,4],54:[20,16,18,15,20,12,21,10,21,7,20,5,17,4,12,4,7,5,3,7,1,10,0,11,0,14,1,16,3,17,6,17,7,16,10,14,12,11,13,10,13,7,12,5,10,4,7],55:[20,17,21,7,0,void 0,3,21,17,21],56:[20,8,21,5,20,4,18,4,16,5,14,7,13,11,12,14,11,16,9,17,7,17,4,16,2,15,1,12,0,8,0,5,1,4,2,3,4,3,7,4,9,6,11,9,12,13,13,15,14,16,16,16,18,15,20,12,21,8,21],57:[20,16,14,15,11,13,9,10,8,9,8,6,9,4,11,3,14,3,15,4,18,6,20,9,21,10,21,13,20,15,18,16,14,16,9,15,4,13,1,10,0,8,0,5,1,4,3],58:[10,5,14,4,13,5,12,6,13,5,14,void 0,5,2,4,1,5,0,6,1,5,2],59:[10,5,14,4,13,5,12,6,13,5,14,void 0,6,1,5,0,4,1,5,2,6,1,6,-1,5,-3,4,-4],60:[24,20,18,4,9,20,0],61:[26,4,12,22,12,void 0,4,6,22,6],62:[24,4,18,20,9,4,0],63:[18,3,16,3,17,4,19,5,20,7,21,11,21,13,20,14,19,15,17,15,15,14,13,13,12,9,10,9,7,void 0,9,2,8,1,9,0,10,1,9,2],64:[27,18,13,17,15,15,16,12,16,10,15,9,14,8,11,8,8,9,6,11,5,14,5,16,6,17,8,void 0,12,16,10,14,9,11,9,8,10,6,11,5,void 0,18,16,17,8,17,6,19,5,21,5,23,7,24,10,24,12,23,15,22,17,20,19,18,20,15,21,12,21,9,20,7,19,5,17,4,15,3,12,3,9,4,6,5,4,7,2,9,1,12,0,15,0,18,1,20,2,21,3,void 0,19,16,18,8,18,6,19,5],65:[18,9,21,1,0,void 0,9,21,17,0,void 0,4,7,14,7],66:[21,4,21,4,0,void 0,4,21,13,21,16,20,17,19,18,17,18,15,17,13,16,12,13,11,void 0,4,11,13,11,16,10,17,9,18,7,18,4,17,2,16,1,13,0,4,0],67:[21,18,16,17,18,15,20,13,21,9,21,7,20,5,18,4,16,3,13,3,8,4,5,5,3,7,1,9,0,13,0,15,1,17,3,18,5],68:[21,4,21,4,0,void 0,4,21,11,21,14,20,16,18,17,16,18,13,18,8,17,5,16,3,14,1,11,0,4,0],69:[19,4,21,4,0,void 0,4,21,17,21,void 0,4,11,12,11,void 0,4,0,17,0],70:[18,4,21,4,0,void 0,4,21,17,21,void 0,4,11,12,11],71:[21,18,16,17,18,15,20,13,21,9,21,7,20,5,18,4,16,3,13,3,8,4,5,5,3,7,1,9,0,13,0,15,1,17,3,18,5,18,8,void 0,13,8,18,8],72:[22,4,21,4,0,void 0,18,21,18,0,void 0,4,11,18,11],73:[8,4,21,4,0],74:[16,12,21,12,5,11,2,10,1,8,0,6,0,4,1,3,2,2,5,2,7],75:[21,4,21,4,0,void 0,18,21,4,7,void 0,9,12,18,0],76:[17,4,21,4,0,void 0,4,0,16,0],77:[24,4,21,4,0,void 0,4,21,12,0,void 0,20,21,12,0,void 0,20,21,20,0],78:[22,4,21,4,0,void 0,4,21,18,0,void 0,18,21,18,0],79:[22,9,21,7,20,5,18,4,16,3,13,3,8,4,5,5,3,7,1,9,0,13,0,15,1,17,3,18,5,19,8,19,13,18,16,17,18,15,20,13,21,9,21],80:[21,4,21,4,0,void 0,4,21,13,21,16,20,17,19,18,17,18,14,17,12,16,11,13,10,4,10],81:[22,9,21,7,20,5,18,4,16,3,13,3,8,4,5,5,3,7,1,9,0,13,0,15,1,17,3,18,5,19,8,19,13,18,16,17,18,15,20,13,21,9,21,void 0,12,4,18,-2],82:[21,4,21,4,0,void 0,4,21,13,21,16,20,17,19,18,17,18,15,17,13,16,12,13,11,4,11,void 0,11,11,18,0],83:[20,17,18,15,20,12,21,8,21,5,20,3,18,3,16,4,14,5,13,7,12,13,10,15,9,16,8,17,6,17,3,15,1,12,0,8,0,5,1,3,3],84:[16,8,21,8,0,void 0,1,21,15,21],85:[22,4,21,4,6,5,3,7,1,10,0,12,0,15,1,17,3,18,6,18,21],86:[18,1,21,9,0,void 0,17,21,9,0],87:[24,2,21,7,0,void 0,12,21,7,0,void 0,12,21,17,0,void 0,22,21,17,0],88:[20,3,21,17,0,void 0,17,21,3,0],89:[18,1,21,9,11,9,0,void 0,17,21,9,11],90:[20,17,21,3,0,void 0,3,21,17,21,void 0,3,0,17,0],91:[14,4,25,4,-7,void 0,5,25,5,-7,void 0,4,25,11,25,void 0,4,-7,11,-7],92:[14,0,21,14,-3],93:[14,9,25,9,-7,void 0,10,25,10,-7,void 0,3,25,10,25,void 0,3,-7,10,-7],94:[16,6,15,8,18,10,15,void 0,3,12,8,17,13,12,void 0,8,17,8,0],95:[16,0,-2,16,-2],96:[10,6,21,5,20,4,18,4,16,5,15,6,16,5,17],97:[19,15,14,15,0,void 0,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3],98:[19,4,21,4,0,void 0,4,11,6,13,8,14,11,14,13,13,15,11,16,8,16,6,15,3,13,1,11,0,8,0,6,1,4,3],99:[18,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3],100:[19,15,21,15,0,void 0,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3],101:[18,3,8,15,8,15,10,14,12,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3],102:[12,10,21,8,21,6,20,5,17,5,0,void 0,2,14,9,14],103:[19,15,14,15,-2,14,-5,13,-6,11,-7,8,-7,6,-6,void 0,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3],104:[19,4,21,4,0,void 0,4,10,7,13,9,14,12,14,14,13,15,10,15,0],105:[8,3,21,4,20,5,21,4,22,3,21,void 0,4,14,4,0],106:[10,5,21,6,20,7,21,6,22,5,21,void 0,6,14,6,-3,5,-6,3,-7,1,-7],107:[17,4,21,4,0,void 0,14,14,4,4,void 0,8,8,15,0],108:[8,4,21,4,0],109:[30,4,14,4,0,void 0,4,10,7,13,9,14,12,14,14,13,15,10,15,0,void 0,15,10,18,13,20,14,23,14,25,13,26,10,26,0],110:[19,4,14,4,0,void 0,4,10,7,13,9,14,12,14,14,13,15,10,15,0],111:[19,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3,16,6,16,8,15,11,13,13,11,14,8,14],112:[19,4,14,4,-7,void 0,4,11,6,13,8,14,11,14,13,13,15,11,16,8,16,6,15,3,13,1,11,0,8,0,6,1,4,3],113:[19,15,14,15,-7,void 0,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3],114:[13,4,14,4,0,void 0,4,8,5,11,7,13,9,14,12,14],115:[17,14,11,13,13,10,14,7,14,4,13,3,11,4,9,6,8,11,7,13,6,14,4,14,3,13,1,10,0,7,0,4,1,3,3],116:[12,5,21,5,4,6,1,8,0,10,0,void 0,2,14,9,14],117:[19,4,14,4,4,5,1,7,0,10,0,12,1,15,4,void 0,15,14,15,0],118:[16,2,14,8,0,void 0,14,14,8,0],119:[22,3,14,7,0,void 0,11,14,7,0,void 0,11,14,15,0,void 0,19,14,15,0],120:[17,3,14,14,0,void 0,14,14,3,0],121:[16,2,14,8,0,void 0,14,14,8,0,6,-4,4,-6,2,-7,1,-7],122:[17,14,14,3,0,void 0,3,14,14,14,void 0,3,0,14,0],123:[14,9,25,7,24,6,23,5,21,5,19,6,17,7,16,8,14,8,12,6,10,void 0,7,24,6,22,6,20,7,18,8,17,9,15,9,13,8,11,4,9,8,7,9,5,9,3,8,1,7,0,6,-2,6,-4,7,-6,void 0,6,8,8,6,8,4,7,2,6,1,5,-1,5,-3,6,-5,7,-6,9,-7],124:[8,4,25,4,-7],125:[14,5,25,7,24,8,23,9,21,9,19,8,17,7,16,6,14,6,12,8,10,void 0,7,24,8,22,8,20,7,18,6,17,5,15,5,13,6,11,10,9,6,7,5,5,5,3,6,1,7,0,8,-2,8,-4,7,-6,void 0,8,8,6,6,6,4,7,2,8,1,9,-1,9,-3,8,-5,7,-6,5,-7],126:[24,3,6,3,8,4,11,6,12,8,12,10,11,14,8,16,7,18,7,20,8,21,10,void 0,3,8,4,10,6,11,8,11,10,10,14,7,16,6,18,6,20,7,21,10,21,12]}});var xa=m((ute,Ex)=>{var VM=vx(),GM={xOffset:0,yOffset:0,input:"?",align:"left",font:VM,height:14,lineSpacing:2.142857142857143,letterSpacing:1,extrudeOffset:0},XM=(e,t)=>{!t&&typeof e=="string"&&(e={input:e}),e=e||{};let r=Object.assign({},GM,e);return r.input=t||r.input,r};Ex.exports=XM});var va=m((fte,yx)=>{var YM=xa(),HM=(e,t)=>{let{xOffset:r,yOffset:s,input:n,font:o,height:i,extrudeOffset:c}=YM(e,t),a=n.charCodeAt(0);(!a||!o[a])&&(a=63);let l=[].concat(o[a]),u=(i-c)/o.height,h=c/2,f=l.shift()*u,d=[],g=[];for(let p=0,x=l.length;p<x;p+=2){let v=u*l[p]+r,y=u*l[p+1]+s+h;if(l[p]!==void 0){g.push([v,y]);continue}d.push(g),g=[],p--}return g.length&&d.push(g),{width:f,height:i,segments:d}};yx.exports=HM});var wx=m((hte,bx)=>{var jM=va(),ZM=xa(),Ax=(e,t)=>{let{x:r,y:s}=Object.assign({x:0,y:0},e||{}),n=t.segments,o=null,i=null;for(let c=0,a=n.length;c<a;c++){o=n[c];for(let l=0,u=o.length;l<u;l++)i=o[l],o[l]=[i[0]+r,i[1]+s]}return t},UM=(e,t)=>{let{xOffset:r,yOffset:s,input:n,font:o,height:i,align:c,extrudeOffset:a,lineSpacing:l,letterSpacing:u}=ZM(e,t),[h,f]=[r,s],d,g,p,x,v,y,b={width:0,segments:[]},E=[],q=[],w=0,D=h,T=()=>{E.push(b),w=Math.max(w,b.width),b={width:0,segments:[]}};for(d=0,g=n.length;d<g;d++){if(p=n[d],x=jM({xOffset:h,yOffset:f,font:o,height:i,extrudeOffset:a},p),p===`
`){h=D,f-=x.height*l,T();continue}v=x.width*u,b.width+=v,h+=v,p!==" "&&(b.segments=b.segments.concat(x.segments))}for(b.segments.length&&T(),d=0,g=E.length;d<g;d++)b=E[d],w>b.width&&(y=w-b.width,c==="right"?b=Ax({x:y},b):c==="center"&&(b=Ax({x:y/2},b))),q=q.concat(b.segments);return q};bx.exports=UM});var Sx=m((pte,qx)=>{qx.exports={vectorChar:va(),vectorText:wx()}});var Jr=m((dte,Dx)=>{var WM=G(),JM=X(),KM=se(),QM=e=>{let t;for(let r of e){let s=0;if(WM.isA(r)&&(s=1),JM.isA(r)&&(s=2),KM.isA(r)&&(s=3),t&&s!==t)return!1;t=s}return!0};Dx.exports=QM});var Cx=m((gte,Tx)=>{var eF=e=>e*.017453292519943295;Tx.exports=eF});var Ea=m((mte,$x)=>{var tF=(e,t)=>e-t;$x.exports=tF});var Ix=m((xte,Rx)=>{var rF=(e,t,r)=>{let s=0,n=e.length;for(;n>s;){let o=Math.floor((s+n)/2),i=e[o];r(t,i)>0?s=o+1:n=o}e.splice(s,0,t)};Rx.exports=rF});var Nx=m((vte,Fx)=>{var{TAU:Mx}=j(),sF=(e,t,r)=>{let s=t>0?e*Mx/t:0,n=r>0?Mx/r:0;return Math.ceil(Math.max(s,n,4))};Fx.exports=sF});var kx=m((Ete,Px)=>{var nF=e=>e*57.29577951308232;Px.exports=nF});var ya=m((yte,Ox)=>{Ox.exports={areAllShapesTheSameType:Jr(),degToRad:Cx(),flatten:B(),fnNumberSort:Ea(),insertSorted:Ix(),radiusToSegments:Nx(),radToDeg:kx()}});var wo=m((Ate,zx)=>{var Lx=Y(),oF=G(),iF=(e,t)=>{if(t.vertices.length<4)return null;let r=[],s=t.vertices.filter((i,c)=>i[2]>0?(r.push(c),!0):!1);if(s.length!==2)throw new Error("Assertion failed: fromFakePolygon: not enough points found");let n=s.map(i=>{let c=Math.round(i[0]/e)*e+0,a=Math.round(i[1]/e)*e+0;return Lx.fromValues(c,a)});if(Lx.equals(n[0],n[1]))return null;let o=r[1]-r[0];if(o===1||o===3)o===1&&n.reverse();else throw new Error("Assertion failed: fromFakePolygon: unknown index ordering");return n},cF=(e,t)=>{let r=t.map(s=>iF(e,s)).filter(s=>s!==null);return oF.create(r)};zx.exports=cF});var qo=m((bte,_x)=>{var or=k(),aF=G(),lF=X(),uF=H(),fF=(e,t,r)=>{let s=[or.fromVec2(or.create(),r[0],e),or.fromVec2(or.create(),r[1],e),or.fromVec2(or.create(),r[1],t),or.fromVec2(or.create(),r[0],t)];return uF.create(s)},hF=(e,t)=>{let s=aF.toSides(t).map(o=>fF(e.z0,e.z1,o));return lF.create(s)};_x.exports=hF});var Gx=m((wte,Vx)=>{var Bx=ie(),pF=Y(),Se=k(),Sr=function(e,t){arguments.length<2&&(t=Se.orthogonal(Se.create(),e)),this.v=Se.normalize(Se.create(),Se.cross(Se.create(),e,t)),this.u=Se.cross(Se.create(),this.v,e),this.plane=e,this.planeorigin=Se.scale(Se.create(),e,e[3])};Sr.GetCartesian=function(e,t){let r=e+"/"+t,s,n;if(r==="X/Y")s=[0,0,1],n=[1,0,0];else if(r==="Y/-X")s=[0,0,1],n=[0,1,0];else if(r==="-X/-Y")s=[0,0,1],n=[-1,0,0];else if(r==="-Y/X")s=[0,0,1],n=[0,-1,0];else if(r==="-X/Y")s=[0,0,-1],n=[-1,0,0];else if(r==="-Y/-X")s=[0,0,-1],n=[0,-1,0];else if(r==="X/-Y")s=[0,0,-1],n=[1,0,0];else if(r==="Y/X")s=[0,0,-1],n=[0,1,0];else if(r==="X/Z")s=[0,-1,0],n=[1,0,0];else if(r==="Z/-X")s=[0,-1,0],n=[0,0,1];else if(r==="-X/-Z")s=[0,-1,0],n=[-1,0,0];else if(r==="-Z/X")s=[0,-1,0],n=[0,0,-1];else if(r==="-X/Z")s=[0,1,0],n=[-1,0,0];else if(r==="-Z/-X")s=[0,1,0],n=[0,0,-1];else if(r==="X/-Z")s=[0,1,0],n=[1,0,0];else if(r==="Z/X")s=[0,1,0],n=[0,0,1];else if(r==="Y/Z")s=[1,0,0],n=[0,1,0];else if(r==="Z/-Y")s=[1,0,0],n=[0,0,1];else if(r==="-Y/-Z")s=[1,0,0],n=[0,-1,0];else if(r==="-Z/Y")s=[1,0,0],n=[0,0,-1];else if(r==="-Y/Z")s=[-1,0,0],n=[0,-1,0];else if(r==="-Z/-Y")s=[-1,0,0],n=[0,0,-1];else if(r==="Y/-Z")s=[-1,0,0],n=[0,1,0];else if(r==="Z/Y")s=[-1,0,0],n=[0,0,1];else throw new Error("OrthoNormalBasis.GetCartesian: invalid combination of axis identifiers. Should pass two string arguments from [X,Y,Z,-X,-Y,-Z], being two different axes.");return new Sr(new Plane(new Vector3D(s),0),new Vector3D(n))};Sr.Z0Plane=function(){let e=new Plane(new Vector3D([0,0,1]),0);return new Sr(e,new Vector3D([1,0,0]))};Sr.prototype={getProjectionMatrix:function(){return Bx.fromValues(this.u[0],this.v[0],this.plane[0],0,this.u[1],this.v[1],this.plane[1],0,this.u[2],this.v[2],this.plane[2],0,0,0,-this.plane[3],1)},getInverseProjectionMatrix:function(){let e=Se.scale(Se.create(),this.plane,this.plane[3]);return Bx.fromValues(this.u[0],this.u[1],this.u[2],0,this.v[0],this.v[1],this.v[2],0,this.plane[0],this.plane[1],this.plane[2],0,e[0],e[1],e[2],1)},to2D:function(e){return pF.fromValues(Se.dot(e,this.u),Se.dot(e,this.v))},to3D:function(e){let t=Se.scale(Se.create(),this.u,e[0]),r=Se.scale(Se.create(),this.v,e[1]),s=Se.add(t,t,this.planeorigin);return Se.add(r,r,s)},line3Dto2D:function(e){let t=e.point,r=e.direction.plus(t),s=this.to2D(t),n=this.to2D(r);return Line2D.fromPoints(s,n)},line2Dto3D:function(e){let t=e.origin(),r=e.direction().plus(t),s=this.to3D(t),n=this.to3D(r);return Line3D.fromPoints(s,n)},transform:function(e){let t=this.plane.transform(e),r=this.u.transform(e),s=new Vector3D(0,0,0).transform(e),n=r.minus(s);return new Sr(t,n)}};Vx.exports=Sr});var Hx=m((qte,Yx)=>{var{EPS:_t}=j(),ir=to(),pt=Y(),dF=Gx(),Kr=Rc(),{insertSorted:gF,fnNumberSort:mF}=ya(),Xx=H(),xF=e=>{if(e.length<2)return e;let t=[],r=e.length,s=Xx.plane(e[0]),n=new dF(s),o=[],i=[],c=new Map,a=new Map,l=new Map,u=10/_t;for(let g=0;g<r;g++){let p=e[g],x=[],v=p.vertices.length,y=-1;if(v>0){let b,E;for(let q=0;q<v;q++){let w=n.to2D(p.vertices[q]),D=Math.floor(w[1]*u),T;l.has(D)?T=l.get(D):l.has(D+1)?T=l.get(D+1):l.has(D-1)?T=l.get(D-1):(T=w[1],l.set(D,w[1])),w=pt.fromValues(w[0],T),x.push(w);let A=w[1];(q===0||A<b)&&(b=A,y=q),(q===0||A>E)&&(E=A);let S=a.get(A);S||(S={},a.set(A,S)),S[g]=!0}if(b>=E)x=[],v=0,y=-1;else{let q=c.get(b);q||(q=[],c.set(b,q)),q.push(g)}}x.reverse(),y=v-y-1,o.push(x),i.push(y)}let h=[];a.forEach((g,p)=>h.push(p)),h.sort(mF);let f=[],d=[];for(let g=0;g<h.length;g++){let p=[],x=h[g],v=a.get(x);for(let b=0;b<f.length;++b){let E=f[b],q=E.polygonindex;if(v[q]){let w=o[q],D=w.length,T=E.leftvertexindex,A=E.rightvertexindex;for(;;){let $=T+1;if($>=D&&($=0),w[$][1]!==x)break;T=$}let S=A-1;if(S<0&&(S=D-1),w[S][1]===x&&(A=S),T!==E.leftvertexindex&&T===A)f.splice(b,1),--b;else{E.leftvertexindex=T,E.rightvertexindex=A,E.topleft=w[T],E.topright=w[A];let $=T+1;$>=D&&($=0),E.bottomleft=w[$];let C=A-1;C<0&&(C=D-1),E.bottomright=w[C]}}}let y;if(g>=h.length-1)f=[],y=null;else{y=Number(h[g+1]);let b=.5*(x+y),E=c.get(x);for(let q in E){let w=E[q],D=o[w],T=D.length,A=i[w],S=A;for(;;){let P=S+1;if(P>=T&&(P=0),D[P][1]!==x||P===A)break;S=P}let $=A;for(;;){let P=$-1;if(P<0&&(P=T-1),D[P][1]!==x||P===S)break;$=P}let C=S+1;C>=T&&(C=0);let F=$-1;F<0&&(F=T-1);let R={polygonindex:w,leftvertexindex:S,rightvertexindex:$,topleft:D[S],topright:D[$],bottomleft:D[C],bottomright:D[F]};gF(f,R,(P,I)=>{let V=Kr(P.topleft,P.bottomleft,b),K=Kr(I.topleft,I.bottomleft,b);return V>K?1:V<K?-1:0})}}for(let b in f){let E=f[b],q=Kr(E.topleft,E.bottomleft,x),w=pt.fromValues(q,x);q=Kr(E.topright,E.bottomright,x);let D=pt.fromValues(q,x);q=Kr(E.topleft,E.bottomleft,y);let T=pt.fromValues(q,y);q=Kr(E.topright,E.bottomright,y);let A=pt.fromValues(q,y),S={topleft:w,topright:D,bottomleft:T,bottomright:A,leftline:ir.fromPoints(ir.create(),w,T),rightline:ir.fromPoints(ir.create(),A,D)};if(p.length>0){let $=p[p.length-1],C=pt.distance(S.topleft,$.topright),F=pt.distance(S.bottomleft,$.bottomright);C<_t&&F<_t&&(S.topleft=$.topleft,S.leftline=$.leftline,S.bottomleft=$.bottomleft,p.splice(p.length-1,1))}p.push(S)}if(g>0){let b=new Set,E=new Set;for(let q=0;q<p.length;q++){let w=p[q];for(let D=0;D<d.length;D++)if(!E.has(D)){let T=d[D];if(pt.distance(T.bottomleft,w.topleft)<_t&&pt.distance(T.bottomright,w.topright)<_t){E.add(D);let A=ir.direction(w.leftline),S=ir.direction(T.leftline),$=A[0]-S[0],C=ir.direction(w.rightline),F=ir.direction(T.rightline),R=C[0]-F[0],P=Math.abs($)<_t,I=Math.abs(R)<_t,V=P||$>=0,K=I||R>=0;V&&K&&(w.outpolygon=T.outpolygon,w.leftlinecontinues=P,w.rightlinecontinues=I,b.add(D));break}}}for(let q=0;q<d.length;q++)if(!b.has(q)){let w=d[q];w.outpolygon.rightpoints.push(w.bottomright),pt.distance(w.bottomright,w.bottomleft)>_t&&w.outpolygon.leftpoints.push(w.bottomleft),w.outpolygon.leftpoints.reverse();let T=w.outpolygon.rightpoints.concat(w.outpolygon.leftpoints).map(S=>n.to3D(S)),A=Xx.fromPointsAndPlane(T,s);A.vertices.length&&t.push(A)}}for(let b=0;b<p.length;b++){let E=p[b];E.outpolygon?(E.leftlinecontinues||E.outpolygon.leftpoints.push(E.topleft),E.rightlinecontinues||E.outpolygon.rightpoints.push(E.topright)):(E.outpolygon={leftpoints:[],rightpoints:[]},E.outpolygon.leftpoints.push(E.topleft),pt.distance(E.topleft,E.topright)>_t&&E.outpolygon.rightpoints.push(E.topright))}d=p}return t};Yx.exports=xF});var nn=m((Ste,Ux)=>{var jx=X(),Zx=H(),vF=js(),EF=Hx(),yF=(e,t)=>Math.abs(e[3]-t[3])<15e-8?vF(e,t):!1,AF=e=>{if(e.isRetesselated)return e;let t=jx.toPolygons(e),r=[];t.forEach(o=>{let i=r.find(c=>yF(c[0],Zx.plane(o)));i?i[1].push(o):r.push([Zx.plane(o),[o]])});let s=[];r.forEach(o=>{let i=o[1],c=EF(i);s=s.concat(c)});let n=jx.create(s);return n.isRetesselated=!0,n};Ux.exports=AF});var So=m((Dte,Jx)=>{var{EPS:Qr}=j(),Wx=Kt(),bF=(e,t)=>{if(e.polygons.length===0||t.polygons.length===0)return!1;let r=Wx(e),s=r[0],n=r[1],o=Wx(t),i=o[0],c=o[1];return!(i[0]-n[0]>Qr||s[0]-c[0]>Qr||i[1]-n[1]>Qr||s[1]-c[1]>Qr||i[2]-n[2]>Qr||s[2]-c[2]>Qr)};Jx.exports=bF});var ev=m((Tte,Qx)=>{var Kx=ht(),wF=H(),es=class{constructor(t){this.plane=null,this.front=null,this.back=null,this.polygontreenodes=[],this.parent=t}invert(){let t=[this],r;for(let s=0;s<t.length;s++){r=t[s],r.plane&&(r.plane=Kx.flip(Kx.create(),r.plane)),r.front&&t.push(r.front),r.back&&t.push(r.back);let n=r.front;r.front=r.back,r.back=n}}clipPolygons(t,r){let s={node:this,polygontreenodes:t},n,o=[];do{if(n=s.node,t=s.polygontreenodes,n.plane){let i=n.plane,c=[],a=[],l=r?c:a,u=t.length;for(let f=0;f<u;f++){let d=t[f];d.isRemoved()||d.splitByPlane(i,l,c,a,c)}n.front&&a.length>0&&o.push({node:n.front,polygontreenodes:a});let h=c.length;if(n.back&&h>0)o.push({node:n.back,polygontreenodes:c});else for(let f=0;f<h;f++)c[f].remove()}s=o.pop()}while(s!==void 0)}clipTo(t,r){let s=this,n=[];do s.polygontreenodes.length>0&&t.rootnode.clipPolygons(s.polygontreenodes,r),s.front&&n.push(s.front),s.back&&n.push(s.back),s=n.pop();while(s!==void 0)}addPolygonTreeNodes(t){let r={node:this,polygontreenodes:t},s=[];do{let n=r.node,o=r.polygontreenodes;if(o.length===0){r=s.pop();continue}if(!n.plane){let l=0;l=Math.floor(o.length/2);let u=o[l].getPolygon();n.plane=wF.plane(u)}let i=[],c=[],a=o.length;for(let l=0;l<a;++l)o[l].splitByPlane(n.plane,n.polygontreenodes,c,i,c);i.length>0&&(n.front||(n.front=new es(n)),a===i.length&&c.length===0?n.front.polygontreenodes=i:s.push({node:n.front,polygontreenodes:i})),c.length>0&&(n.back||(n.back=new es(n)),a===c.length&&i.length===0?n.back.polygontreenodes=c:s.push({node:n.back,polygontreenodes:c})),r=s.pop()}while(r!==void 0)}};Qx.exports=es});var rv=m((Cte,tv)=>{var ts=k(),qF=(e,t,r)=>{let s=ts.subtract(ts.create(),r,t),n=(e[3]-ts.dot(e,t))/ts.dot(e,s);return Number.isNaN(n)&&(n=0),n>1&&(n=1),n<0&&(n=0),ts.scale(s,s,n),ts.add(s,t,s),s};tv.exports=qF});var nv=m(($te,sv)=>{var{EPS:Do}=j(),SF=ht(),To=k(),Aa=H(),DF=rv(),TF=(e,t)=>{let r={type:null,front:null,back:null},s=t.vertices,n=s.length,o=Aa.plane(t);if(SF.equals(o,e))r.type=0;else{let i=!1,c=!1,a=[],l=-Do;for(let u=0;u<n;u++){let h=To.dot(e,s[u])-e[3],f=h<l;a.push(f),h>Do&&(i=!0),h<l&&(c=!0)}if(!i&&!c){let u=To.dot(e,o);r.type=u>=0?0:1}else if(!c)r.type=2;else if(!i)r.type=3;else{r.type=4;let u=[],h=[],f=a[0];for(let g=0;g<n;g++){let p=s[g],x=g+1;x>=n&&(x=0);let v=a[x];if(f===v)f?h.push(p):u.push(p);else{let y=s[x],b=DF(e,p,y);f?(h.push(p),h.push(b),u.push(b)):(u.push(p),u.push(b),h.push(b))}f=v}let d=Do*Do;if(h.length>=3){let g=h[h.length-1];for(let p=0;p<h.length;p++){let x=h[p];To.squaredDistance(x,g)<d&&(h.splice(p,1),p--),g=x}}if(u.length>=3){let g=u[u.length-1];for(let p=0;p<u.length;p++){let x=u[p];To.squaredDistance(x,g)<d&&(u.splice(p,1),p--),g=x}}u.length>=3&&(r.front=Aa.fromPointsAndPlane(u,o)),h.length>=3&&(r.back=Aa.fromPointsAndPlane(h,o))}}return r};sv.exports=TF});var cv=m((Rte,iv)=>{var{EPS:CF}=j(),$F=k(),ov=H(),RF=nv(),on=class{constructor(t,r){this.parent=t,this.children=[],this.polygon=r,this.removed=!1}addPolygons(t){if(!this.isRootNode())throw new Error("Assertion failed");let r=this;t.forEach(s=>{r.addChild(s)})}remove(){if(!this.removed){this.removed=!0,this.polygon=null;let t=this.parent.children,r=t.indexOf(this);if(r<0)throw new Error("Assertion failed");t.splice(r,1),this.parent.recursivelyInvalidatePolygon()}}isRemoved(){return this.removed}isRootNode(){return!this.parent}invert(){if(!this.isRootNode())throw new Error("Assertion failed");this.invertSub()}getPolygon(){if(!this.polygon)throw new Error("Assertion failed");return this.polygon}getPolygons(t){let r=[this],s=[r],n,o,i,c;for(n=0;n<s.length;++n)for(r=s[n],o=0,i=r.length;o<i;o++)c=r[o],c.polygon?t.push(c.polygon):c.children.length>0&&s.push(c.children)}splitByPlane(t,r,s,n,o){if(this.children.length){let i=[this.children],c,a,l,u,h;for(c=0;c<i.length;c++)for(h=i[c],a=0,l=h.length;a<l;a++)u=h[a],u.children.length>0?i.push(u.children):u._splitByPlane(t,r,s,n,o)}else this._splitByPlane(t,r,s,n,o)}_splitByPlane(t,r,s,n,o){let i=this.polygon;if(i){let c=ov.measureBoundingSphere(i),a=c[3]+CF,l=c,u=$F.dot(t,l)-t[3];if(u>a)n.push(this);else if(u<-a)o.push(this);else{let h=RF(t,i);switch(h.type){case 0:r.push(this);break;case 1:s.push(this);break;case 2:n.push(this);break;case 3:o.push(this);break;case 4:if(h.front){let f=this.addChild(h.front);n.push(f)}if(h.back){let f=this.addChild(h.back);o.push(f)}break}}}}addChild(t){let r=new on(this,t);return this.children.push(r),r}invertSub(){let t=[this],r=[t],s,n,o,i;for(s=0;s<r.length;s++)for(t=r[s],n=0,o=t.length;n<o;n++)i=t[n],i.polygon&&(i.polygon=ov.invert(i.polygon)),i.children.length>0&&r.push(i.children)}recursivelyInvalidatePolygon(){this.polygon=null,this.parent&&this.parent.recursivelyInvalidatePolygon()}clear(){let t=[this],r=[t];for(let s=0;s<r.length;++s){t=r[s];let n=t.length;for(let o=0;o<n;o++){let i=t[o];i.polygon&&(i.polygon=null),i.parent&&(i.parent=null),i.children.length>0&&r.push(i.children),i.children=[]}}}toString(){let t="",r=[this],s=[r],n,o,i,c;for(n=0;n<s.length;++n){r=s[n];let a=" ".repeat(n);for(o=0,i=r.length;o<i;o++)c=r[o],t+=`${a}PolygonTreeNode (${c.isRootNode()}): ${c.children.length}`,c.polygon?t+=`
 ${a}polygon: ${c.polygon.vertices}
`:t+=`
`,c.children.length>0&&s.push(c.children)}return t}};iv.exports=on});var lv=m((Ite,av)=>{var IF=ev(),MF=cv(),ba=class{constructor(t){this.polygonTree=new MF,this.rootnode=new IF(null),t&&this.addPolygons(t)}invert(){this.polygonTree.invert(),this.rootnode.invert()}clipTo(t,r=!1){this.rootnode.clipTo(t,r)}allPolygons(){let t=[];return this.polygonTree.getPolygons(t),t}addPolygons(t){let r=new Array(t.length);for(let s=0;s<t.length;s++)r[s]=this.polygonTree.addChild(t[s]);this.rootnode.addPolygonTreeNodes(r)}clear(){this.polygonTree.clear()}toString(){return"Tree: "+this.polygonTree.toString("")}};av.exports=ba});var Co=m((Mte,uv)=>{uv.exports={Tree:lv()}});var pv=m((Fte,hv)=>{var $o=X(),FF=So(),{Tree:fv}=Co(),NF=(e,t)=>{if(!FF(e,t))return $o.create();let r=new fv($o.toPolygons(e)),s=new fv($o.toPolygons(t));r.invert(),s.clipTo(r),s.invert(),r.clipTo(s),s.clipTo(r),r.addPolygons(s.allPolygons()),r.invert();let n=r.allPolygons();return $o.create(n)};hv.exports=NF});var wa=m((Nte,dv)=>{var PF=B(),kF=nn(),OF=pv(),LF=(...e)=>{e=PF(e);let t=e.shift();return e.forEach(r=>{t=OF(t,r)}),t=kF(t),t};dv.exports=LF});var mv=m((Pte,gv)=>{var zF=B(),_F=X(),BF=Lt(),VF=wo(),GF=qo(),XF=wa(),YF=(...e)=>{e=zF(e);let t=e.map(n=>GF({z0:-1,z1:1},n)),r=XF(t),s=BF(r);return VF(s,_F.toPolygons(r))};gv.exports=YF});var vv=m((kte,xv)=>{var HF=B(),jF=Jr(),ZF=G(),UF=X(),WF=mv(),JF=wa(),KF=(...e)=>{if(e=HF(e),e.length===0)throw new Error("wrong number of arguments");if(!jF(e))throw new Error("only intersect of the types are supported");let t=e[0];return ZF.isA(t)?WF(e):UF.isA(t)?JF(e):t};xv.exports=KF});var Av=m((Ote,yv)=>{var qa=k(),QF=Lt(),Ev=X(),eN=e=>e.sort((t,r)=>t-r).filter((t,r,s)=>!r||t!==s[r-1]),tN=(e,t,r)=>{let s=`${t}`,n=e.get(s);n===void 0?e.set(s,[r]):n.push(r)},rN=(e,t)=>{let r=`${t}`;return e.get(r)},sN=e=>{let t=QF(e),r=Ev.toPolygons(e),s=r.length,n=new Map,o=qa.create();r.forEach((u,h)=>{u.vertices.forEach(f=>{tN(n,qa.snap(o,f,t),h)})});let i=r.map(u=>{let h=[];return u.vertices.forEach(f=>{h=h.concat(rN(n,qa.snap(o,f,t)))}),{e:1,d:eN(h)}});n.clear();let c=0,a=i.length;for(let u=0;u<a;u++){let h=i[u];if(h.e>0){let f=new Array(s);f[u]=!0;do c=0,f.forEach((d,g)=>{let p=i[g];if(p.e>0){p.e=-1;for(let x=0;x<p.d.length;x++)f[p.d[x]]=!0;c++}});while(c>0);h.indexes=f}}let l=[];for(let u=0;u<a;u++)if(i[u].indexes){let h=[];i[u].indexes.forEach((f,d)=>h.push(r[d])),l.push(Ev.create(h))}return l};yv.exports=sN});var wv=m((Lte,bv)=>{var nN=B(),oN=X(),iN=Av(),cN=(...e)=>{if(e=nN(e),e.length===0)throw new Error("wrong number of arguments");let t=e.map(r=>oN.isA(r)?iN(r):r);return t.length===1?t[0]:t};bv.exports=cN});var Dv=m((zte,Sv)=>{var Ro=X(),aN=So(),{Tree:qv}=Co(),lN=(e,t)=>{if(!aN(e,t))return Ro.clone(e);let r=new qv(Ro.toPolygons(e)),s=new qv(Ro.toPolygons(t));r.invert(),r.clipTo(s),s.clipTo(r,!0),r.addPolygons(s.allPolygons()),r.invert();let n=r.allPolygons();return Ro.create(n)};Sv.exports=lN});var Sa=m((_te,Tv)=>{var uN=B(),fN=nn(),hN=Dv(),pN=(...e)=>{e=uN(e);let t=e.shift();return e.forEach(r=>{t=hN(t,r)}),t=fN(t),t};Tv.exports=pN});var $v=m((Bte,Cv)=>{var dN=B(),gN=X(),mN=Lt(),xN=wo(),vN=qo(),EN=Sa(),yN=(...e)=>{e=dN(e);let t=e.map(n=>vN({z0:-1,z1:1},n)),r=EN(t),s=mN(r);return xN(s,gN.toPolygons(r))};Cv.exports=yN});var Iv=m((Vte,Rv)=>{var AN=B(),bN=Jr(),wN=G(),qN=X(),SN=$v(),DN=Sa(),TN=(...e)=>{if(e=AN(e),e.length===0)throw new Error("wrong number of arguments");if(!bN(e))throw new Error("only subtract of the types are supported");let t=e[0];return wN.isA(t)?SN(e):qN.isA(t)?DN(e):t};Rv.exports=TN});var Da=m((Gte,Fv)=>{var rs=X(),CN=So(),{Tree:Mv}=Co(),$N=(e,t)=>{if(!CN(e,t))return RN(e,t);let r=new Mv(rs.toPolygons(e)),s=new Mv(rs.toPolygons(t));r.clipTo(s,!1),s.clipTo(r),s.invert(),s.clipTo(r),s.invert();let n=r.allPolygons().concat(s.allPolygons());return rs.create(n)},RN=(e,t)=>{let r=rs.toPolygons(e);return r=r.concat(rs.toPolygons(t)),rs.create(r)};Fv.exports=$N});var Ta=m((Xte,Nv)=>{var IN=B(),MN=nn(),FN=Da(),NN=(...e)=>{e=IN(e);let t;for(t=1;t<e.length;t+=2)e.push(FN(e[t-1],e[t]));let r=e[t-1];return r=MN(r),r};Nv.exports=NN});var Ca=m((Yte,Pv)=>{var PN=B(),kN=X(),ON=Lt(),LN=wo(),zN=qo(),_N=Ta(),BN=(...e)=>{e=PN(e);let t=e.map(n=>zN({z0:-1,z1:1},n)),r=_N(t),s=ON(r);return LN(s,kN.toPolygons(r))};Pv.exports=BN});var Io=m((Hte,kv)=>{var VN=B(),GN=Jr(),XN=G(),YN=X(),HN=Ca(),jN=Ta(),ZN=(...e)=>{if(e=VN(e),e.length===0)throw new Error("wrong number of arguments");if(!GN(e))throw new Error("only unions of the same type are supported");let t=e[0];return XN.isA(t)?HN(e):YN.isA(t)?jN(e):t};kv.exports=ZN});var Lv=m((jte,Ov)=>{Ov.exports={intersect:vv(),scission:wv(),subtract:Iv(),union:Io()}});var an=m((Zte,_v)=>{var{EPS:UN,TAU:WN}=j(),zv=Ic(),cn=to(),xe=Y(),JN=Xs(),KN=(e,t)=>{let r={delta:1,corners:"edge",closed:!1,segments:16},{delta:s,corners:n,closed:o,segments:i}=Object.assign({},r,e);if(Math.abs(s)<UN)return t;let c=e.closed?JN(t):1;c===0&&(c=1);let a=c>0&&s>=0||c<0&&s<0;s=Math.abs(s);let l=null,u=[],h=[],f=xe.create(),d=t.length;for(let g=0;g<d;g++){let p=(g+1)%d,x=t[g],v=t[p];a?xe.subtract(f,x,v):xe.subtract(f,v,x),xe.normal(f,f),xe.normalize(f,f),xe.scale(f,f,s);let y=xe.add(xe.create(),x,f),b=xe.add(xe.create(),v,f),E=[y,b];if(l!=null&&(o||!o&&p!==0)){let q=zv(l[0],l[1],E[0],E[1]);q?(u.pop(),E[0]=q):h.push({c:x,s0:l,s1:E})}l=[y,b],!(p===0&&!o)&&(u.push(E[0]),u.push(E[1]))}if(o&&l!=null){let g=u[0],p=u[1],x=zv(l[0],l[1],g,p);if(x)u[0]=x,u.pop();else{let v=t[0],y=[g,p];h.push({c:v,s0:l,s1:y})}}if(n==="edge"){let g=new Map;u.forEach((v,y)=>g.set(v,y));let p=cn.create(),x=cn.create();h.forEach(v=>{cn.fromPoints(p,v.s0[0],v.s0[1]),cn.fromPoints(x,v.s1[0],v.s1[1]);let y=cn.intersectPointOfLines(p,x);if(Number.isFinite(y[0])&&Number.isFinite(y[1])){let b=v.s0[1],E=g.get(b);u[E]=y,u[(E+1)%u.length]=void 0}else{let b=v.s1[0],E=g.get(b);u[E]=void 0}}),u=u.filter(v=>v!==void 0)}if(n==="round"){let g=Math.floor(i/4),p=xe.create();h.forEach(x=>{let v=xe.angle(xe.subtract(p,x.s1[0],x.c));if(v-=xe.angle(xe.subtract(p,x.s0[1],x.c)),a&&v<0&&(v=v+Math.PI,v<0&&(v=v+Math.PI)),!a&&v>0&&(v=v-Math.PI,v>0&&(v=v-Math.PI)),v!==0){g=Math.floor(i*(Math.abs(v)/WN));let y=v/g,b=xe.angle(xe.subtract(p,x.s0[1],x.c)),E=[];for(let q=1;q<g;q++){let w=b+y*q,D=xe.fromAngleRadians(xe.create(),w);xe.scale(D,D,s),xe.add(D,D,x.c),E.push(D)}if(E.length>0){let q=x.s0[1],w=u.findIndex(D=>xe.equals(q,D));w=(w+1)%u.length,u.splice(w,0,...E)}}else{let y=x.s1[0],b=u.findIndex(E=>xe.equals(y,E));u.splice(b,1)}})}return u};_v.exports=KN});var Vv=m((Ute,Bv)=>{var Mo=G(),QN=an(),eP=(e,t)=>{let r={delta:1,corners:"edge",segments:16},{delta:s,corners:n,segments:o}=Object.assign({},r,e);if(!(n==="edge"||n==="chamfer"||n==="round"))throw new Error('corners must be "edge", "chamfer", or "round"');let a=Mo.toOutlines(t).map(l=>(e={delta:s,corners:n,closed:!0,segments:o},QN(e,l))).reduce((l,u)=>l.concat(Mo.toSides(Mo.fromPoints(u))),[]);return Mo.create(a)};Bv.exports=eP});var Yv=m((Wte,Xv)=>{var Gv=ie(),tP=k(),rP=X(),ln=H(),sP=(e,t)=>{tP.dot(ln.plane(t),e)>0&&(t=ln.invert(t));let s=[t],n=ln.transform(Gv.fromTranslation(Gv.create(),e),t),o=t.vertices.length;for(let i=0;i<o;i++){let c=i<o-1?i+1:0,a=ln.create([t.vertices[i],n.vertices[i],n.vertices[c],t.vertices[c]]);s.push(a)}return s.push(ln.invert(n)),rP.create(s)};Xv.exports=sP});var Zv=m((Jte,jv)=>{var{EPS:nP,TAU:$a}=j(),Hv=ie(),le=k(),oP=Ea(),Ra=X(),Dr=H(),iP=sa(),cP=nn(),Ia=Da(),aP=Yv(),lP=(e,t,r)=>{let s=t.toString();if(e.has(s))e.get(s)[1].push(r);else{let n=[t,[r]];e.set(s,n)}},uP=(e,t,r)=>{let s=t[0].toString(),n=t[1].toString(),o=s<n?`${s},${n}`:`${n},${s}`;if(e.has(o))e.get(o)[1].push(r);else{let i=[t,[r]];e.set(o,i)}},Ma=(e,t)=>{e.findIndex(s=>s===t)<0&&e.push(t)},fP=(e,t)=>{let r={delta:1,segments:12},{delta:s,segments:n}=Object.assign({},r,e),o=Ra.create(),i=new Map,c=new Map,a=le.create(),l=le.create();return Ra.toPolygons(t).forEach((h,f)=>{let d=le.scale(le.create(),Dr.plane(h),2*s),g=Dr.transform(Hv.fromTranslation(Hv.create(),le.scale(le.create(),d,-.5)),h),p=aP(d,g);o=Ia(o,p);let x=h.vertices;for(let v=0;v<x.length;v++){lP(i,x[v],Dr.plane(h));let y=(v+1)%x.length,b=[x[v],x[y]];uP(c,b,Dr.plane(h))}}),c.forEach(h=>{let f=h[0],d=h[1],g=f[0],p=f[1],x=le.subtract(le.create(),p,g);le.normalize(x,x);let v=d[0],y=le.cross(le.create(),v,x),b=[];for(let $=0;$<n;$++)Ma(b,$*$a/n);for(let $=0,C=d.length;$<C;$++){let F=d[$],R=le.dot(y,F),P=le.dot(v,F),I=Math.atan2(R,P);I<0&&(I+=$a),Ma(b,I),I=Math.atan2(-R,-P),I<0&&(I+=$a),Ma(b,I)}b=b.sort(oP);let E=b.length,q,w,D=[],T=[],A=[];for(let $=-1;$<E;$++){let C=b[$<0?$+E:$],F=Math.sin(C),R=Math.cos(C);le.scale(a,v,R*s),le.scale(l,y,F*s),le.add(a,a,l);let P=le.add(le.create(),g,a),I=le.add(le.create(),p,a),V=!1;if($>=0&&le.distance(P,q)<nP&&(V=!0),!V){if($>=0){D.push(P),T.push(I);let K=[w,I,P,q],fe=Dr.create(K);A.push(fe)}q=P,w=I}}T.reverse(),A.push(Dr.create(D)),A.push(Dr.create(T));let S=Ra.create(A);o=Ia(o,S)}),i.forEach(h=>{let f=h[0],d=h[1],g=d[0],p=null,x=0;for(let E=1;E<d.length;E++){let q=d[E],w=le.cross(a,g,q),D=le.length(w);D>.05&&D>x&&(x=D,p=q)}p||(p=le.orthogonal(a,g));let v=le.cross(a,g,p);le.normalize(v,v);let y=le.cross(l,v,g),b=iP({center:[f[0],f[1],f[2]],radius:s,segments:n,axes:[g,v,y]});o=Ia(o,b)}),cP(o)};jv.exports=fP});var Wv=m((Kte,Uv)=>{var hP=X(),pP=Io(),dP=Zv(),gP=(e,t)=>{let r={delta:1,corners:"round",segments:12},{delta:s,corners:n,segments:o}=Object.assign({},r,e);if(n!=="round")throw new Error('corners must be "round" for 3D geometries');if(hP.toPolygons(t).length===0)throw new Error("the given geometry cannot be empty");e={delta:s,corners:n,segments:o};let c=dP(e,t);return pP(t,c)};Uv.exports=gP});var Qv=m((Qte,Kv)=>{var mP=Xs(),je=Y(),ss=G(),un=se(),Jv=an(),xP=e=>{let{external:t,internal:r}=e;mP(t)<0?t=t.reverse():r=r.reverse();let s=un.fromPoints({closed:!0},t),n=un.fromPoints({closed:!0},r),o=ss.toSides(ss.fromPoints(un.toPoints(s))),i=ss.toSides(ss.fromPoints(un.toPoints(n)));return o.push(...i),ss.create(o)},vP=(e,t,r,s)=>{let{points:n,external:o,internal:i}=e,c=Math.floor(t/2),a=[],l=[];if(r==="round"&&c>0){let h=Math.PI/c,f=n[n.length-1],d=je.angle(je.subtract(je.create(),o[o.length-1],f)),g=n[0],p=je.angle(je.subtract(je.create(),i[0],g));for(let x=1;x<c;x++){let v=d+h*x,y=je.fromAngleRadians(je.create(),v);je.scale(y,y,s),je.add(y,y,f),a.push(y),v=p+h*x,y=je.fromAngleRadians(je.create(),v),je.scale(y,y,s),je.add(y,y,g),l.push(y)}}let u=[];return u.push(...o,...a,...i.reverse(),...l),ss.fromPoints(u)},EP=(e,t)=>{e=Object.assign({},{delta:1,corners:"edge",segments:16},e);let{delta:s,corners:n,segments:o}=e;if(s<=0)throw new Error("the given delta must be positive for paths");if(!(n==="edge"||n==="chamfer"||n==="round"))throw new Error('corners must be "edge", "chamfer", or "round"');let i=t.isClosed,c=un.toPoints(t);if(c.length===0)throw new Error("the given geometry cannot be empty");let a={points:c,external:Jv({delta:s,corners:n,segments:o,closed:i},c),internal:Jv({delta:-s,corners:n,segments:o,closed:i},c)};return t.isClosed?xP(a):vP(a,o,n,s)};Kv.exports=EP});var Fo=m((ere,eE)=>{var yP=B(),AP=G(),bP=X(),wP=se(),qP=Vv(),SP=Wv(),DP=Qv(),TP=(e,...t)=>{if(t=yP(t),t.length===0)throw new Error("wrong number of arguments");let r=t.map(s=>wP.isA(s)?DP(e,s):AP.isA(s)?qP(e,s):bP.isA(s)?SP(e,s):s);return r.length===1?r[0]:r};eE.exports=TP});var sE=m((tre,rE)=>{var No=G(),tE=Jn(),CP=an(),$P=(e,t)=>{let r={delta:1,corners:"edge",segments:0},{delta:s,corners:n,segments:o}=Object.assign({},r,e);if(!(n==="edge"||n==="chamfer"||n==="round"))throw new Error('corners must be "edge", "chamfer", or "round"');let i=No.toOutlines(t),a=i.map(l=>(e={delta:i.reduce((f,d)=>f+tE.arePointsInside(l,tE.create(d)),0)%2===0?s:-s,corners:n,closed:!0,segments:o},CP(e,l))).reduce((l,u)=>l.concat(No.toSides(No.fromPoints(u))),[]);return No.create(a)};rE.exports=$P});var iE=m((rre,oE)=>{var nE=se(),RP=an(),IP=(e,t)=>{let r={delta:1,corners:"edge",closed:t.isClosed,segments:16},{delta:s,corners:n,closed:o,segments:i}=Object.assign({},r,e);if(!(n==="edge"||n==="chamfer"||n==="round"))throw new Error('corners must be "edge", "chamfer", or "round"');e={delta:s,corners:n,closed:o,segments:i};let c=RP(e,nE.toPoints(t));return nE.fromPoints({closed:o},c)};oE.exports=IP});var aE=m((sre,cE)=>{var MP=B(),FP=G(),NP=se(),PP=sE(),kP=iE(),OP=(e,...t)=>{if(t=MP(t),t.length===0)throw new Error("wrong number of arguments");let r=t.map(s=>NP.isA(s)?kP(e,s):FP.isA(s)?PP(e,s):s);return r.length===1?r[0]:r};cE.exports=OP});var uE=m((nre,lE)=>{lE.exports={expand:Fo(),offset:aE()}});var hn=m((ore,fE)=>{var fn=ie(),Fa=k(),LP=G(),Na=qr(),zP=en(),_P=(e,t)=>{let r={offset:[0,0,1],twistAngle:0,twistSteps:12,repair:!0},{offset:s,twistAngle:n,twistSteps:o,repair:i}=Object.assign({},r,e);if(o<1)throw new Error("twistSteps must be 1 or more");n===0&&(o=1);let c=Fa.clone(s),a=LP.toSides(t);if(a.length===0)throw new Error("the given geometry cannot be empty");let l=Na.fromSides(a);c[2]<0&&Na.reverse(l,l);let u=fn.create(),h=(f,d,g)=>{let p=d/o*n,x=Fa.scale(Fa.create(),c,d/o);return fn.multiply(u,fn.fromZRotation(u,p),fn.fromTranslation(fn.create(),x)),Na.transform(u,g)};return e={numberOfSlices:o+1,capStart:!0,capEnd:!0,repair:i,callback:h},zP(e,l)};fE.exports=_P});var pE=m((ire,hE)=>{var BP=G(),VP=se(),GP=hn(),XP=(e,t)=>{if(!t.isClosed)throw new Error("extruded path must be closed");let r=VP.toPoints(t),s=BP.fromPoints(r);return GP(e,s)};hE.exports=XP});var gE=m((cre,dE)=>{var YP=B(),HP=G(),jP=se(),ZP=hn(),UP=pE(),WP=(e,...t)=>{let r={height:1,twistAngle:0,twistSteps:1,repair:!0},{height:s,twistAngle:n,twistSteps:o,repair:i}=Object.assign({},r,e);if(t=YP(t),t.length===0)throw new Error("wrong number of arguments");e={offset:[0,0,s],twistAngle:n,twistSteps:o,repair:i};let c=t.map(a=>jP.isA(a)?UP(e,a):HP.isA(a)?ZP(e,a):a);return c.length===1?c[0]:c};dE.exports=WP});var xE=m((are,mE)=>{var JP=se(),KP=Fo(),QP=hn(),ek=(e,t)=>{let r={size:1,height:1},{size:s,height:n}=Object.assign({},r,e);if(e.delta=s,e.offset=[0,0,n],JP.toPoints(t).length===0)throw new Error("the given geometry cannot be empty");let i=KP(e,t);return QP(e,i)};mE.exports=ek});var EE=m((lre,vE)=>{var{area:tk}=Lr(),Pa=G(),rk=se(),sk=Fo(),nk=hn(),ok=(e,t)=>{let r={size:1,height:1},{size:s,height:n}=Object.assign({},r,e);e.delta=s,e.offset=[0,0,n];let o=Pa.toOutlines(t);if(o.length===0)throw new Error("the given geometry cannot be empty");let c=o.map(l=>(tk(l)<0&&l.reverse(),sk(e,rk.fromPoints({closed:!0},l)))).reduce((l,u)=>l.concat(Pa.toSides(u)),[]),a=Pa.create(c);return nk(e,a)};vE.exports=ok});var AE=m((ure,yE)=>{var ik=B(),ck=G(),ak=se(),lk=xE(),uk=EE(),fk=(e,...t)=>{let r={size:1,height:1},{size:s,height:n}=Object.assign({},r,e);if(t=ik(t),t.length===0)throw new Error("wrong number of arguments");if(s<=0)throw new Error("size must be positive");if(n<=0)throw new Error("height must be positive");let o=t.map(i=>ak.isA(i)?lk(e,i):ck.isA(i)?uk(e,i):i);return o.length===1?o[0]:o};yE.exports=fk});var wE=m((fre,bE)=>{var{TAU:pn}=j(),ka=qr(),St=ie(),hk=en(),pk=G(),dk=(e,t)=>{let r={angle:pn,startAngle:0,pitch:10,endOffset:0,segmentsPerRotation:32},{angle:s,endOffset:n,segmentsPerRotation:o,startAngle:i}=Object.assign({},r,e),c;if(!e.pitch&&e.height?c=e.height/(s/pn):c=e.pitch?e.pitch:r.pitch,o<3)throw new Error("The number of segments per rotation needs to be at least 3.");let l=pk.toSides(t);if(l.length===0)throw new Error("the given geometry cannot be empty");let u=l.filter(v=>v[0][0]>=0),h=ka.fromSides(l);u.length===0&&(h=ka.reverse(h));let f=Math.round(o/pn*Math.abs(s)),d=f>=2?f:2,g=St.create(),p,x=(v,y,b)=>{let E=i+s/d*y,q=n/d*y,w=(E-i)/pn*c;return St.multiply(g,St.fromTranslation(St.create(),[q,0,w*Math.sign(s)]),St.fromXRotation(St.create(),-pn/4*Math.sign(s))),p=St.create(),St.multiply(p,St.fromZRotation(St.create(),E),g),ka.transform(p,b)};return hk({numberOfSlices:d+1,callback:x},h)};bE.exports=dk});var $E=m((hre,CE)=>{var gk=B(),qE=js(),Oa=ht(),SE=ie(),DE=G(),TE=X(),ns=H(),mk=Lt(),xk=Ca(),vk=(e,t)=>{let r=Oa.fromNormalAndPoint(Oa.create(),e.axis,e.origin);if(Number.isNaN(r[0])||Number.isNaN(r[1])||Number.isNaN(r[2])||Number.isNaN(r[3]))throw new Error("project: invalid axis or origin");let s=mk(t),n=s*s*Math.sqrt(3)/4;if(s===0)return DE.create();let o=TE.toPolygons(t),i=[];for(let a=0;a<o.length;a++){let l=o[a].vertices.map(f=>Oa.projectionOfPoint(r,f)),u=ns.create(l),h=ns.plane(u);qE(r,h)&&(ns.measureArea(u)<n||i.push(u))}if(!qE(r,[0,0,1])){let a=SE.fromVectorRotation(SE.create(),r,[0,0,1]);i=i.map(l=>ns.transform(a,l))}i=i.sort((a,l)=>ns.measureArea(l)-ns.measureArea(a));let c=i.map(a=>DE.fromPoints(a.vertices));return xk(c)},Ek=(e,...t)=>{let r={axis:[0,0,1],origin:[0,0,0]},{axis:s,origin:n}=Object.assign({},r,e);if(t=gk(t),t.length===0)throw new Error("wrong number of arguments");e={axis:s,origin:n};let o=t.map(i=>TE.isA(i)?vk(e,i):i);return o.length===1?o[0]:o};CE.exports=Ek});var IE=m((pre,RE)=>{RE.exports={extrudeFromSlices:en(),extrudeLinear:gE(),extrudeRectangular:AE(),extrudeRotate:pa(),extrudeHelical:wE(),project:$E(),slice:qr()}});var La=m((dre,FE)=>{var ME=Y(),yk=e=>{let t=ME.fromValues(1/0,1/0);e.forEach(n=>{(n[1]<t[1]||n[1]===t[1]&&n[0]<t[0])&&(t=n)});let r=[];e.forEach(n=>{let o=bk(n[1]-t[1],n[0]-t[0]),i=ME.squaredDistance(n,t);r.push({point:n,angle:o,distSq:i})}),r.sort((n,o)=>n.angle<o.angle?-1:n.angle>o.angle?1:n.distSq<o.distSq?-1:n.distSq>o.distSq?1:0);let s=[];return r.forEach(n=>{let o=s.length;for(;o>1&&Ak(s[o-2],s[o-1],n.point)<=Number.EPSILON;)s.pop(),o=s.length;s.push(n.point)}),s},Ak=(e,t,r)=>(t[0]-e[0])*(r[1]-e[1])-(t[1]-e[1])*(r[0]-e[0]),bk=(e,t)=>e===0&&t===0?-1/0:-t/e;FE.exports=yk});var Po=m((gre,OE)=>{var NE=G(),PE=X(),kE=se(),wk=e=>{let t=new Set,r=[],s=n=>{let o=n.toString();t.has(o)||(r.push(n),t.add(o))};return e.forEach(n=>{NE.isA(n)?NE.toPoints(n).forEach(s):PE.isA(n)?PE.toPoints(n).forEach(o=>o.forEach(s)):kE.isA(n)&&kE.toPoints(n).forEach(s)}),r};OE.exports=wk});var zE=m((mre,LE)=>{var qk=B(),Sk=se(),Dk=La(),Tk=Po(),Ck=(...e)=>{e=qk(e);let t=Tk(e),r=Dk(t);return Sk.fromPoints({closed:!0},r)};LE.exports=Ck});var VE=m((xre,BE)=>{var $k=B(),_E=G(),Rk=La(),Ik=Po(),Mk=(...e)=>{e=$k(e);let t=Ik(e),r=Rk(t);return r.length<3?_E.create():_E.fromPoints(r)};BE.exports=Mk});var HE=m((vre,YE)=>{var Fk=kr(),GE=Ps(),XE=Hi(),Nk=(e,t,r)=>{let s=[],n=[],o=[];GE(s,r,t),GE(n,e,t);let i=XE(Fk(o,n,s)),c=XE(s);if(c===0)throw Error("a and b are the same point");return i/c},Pk=(e,t,r)=>Math.sqrt(Nk(e,t,r));YE.exports=Pk});var UE=m((Ere,ZE)=>{var kk=kr(),Ok=Xn(),jE=Ps(),Lk=(e,t,r,s)=>{let n=[0,0,0];return jE(e,t,r),jE(n,r,s),kk(e,e,n),Ok(e,e)};ZE.exports=Lk});var JE=m((yre,WE)=>{var za=class{constructor(){this.head=null,this.tail=null}clear(){this.head=this.tail=null}insertBefore(t,r){r.prev=t.prev,r.next=t,r.prev?r.prev.next=r:this.head=r,t.prev=r}insertAfter(t,r){r.prev=t,r.next=t.next,r.next?r.next.prev=r:this.tail=r,t.next=r}add(t){this.head?this.tail.next=t:this.head=t,t.prev=this.tail,t.next=null,this.tail=t}addAll(t){for(this.head?this.tail.next=t:this.head=t,t.prev=this.tail;t.next;)t=t.next;this.tail=t}remove(t){t.prev?t.prev.next=t.next:this.head=t.next,t.next?t.next.prev=t.prev:this.tail=t.prev}removeChain(t,r){t.prev?t.prev.next=r.next:this.head=r.next,r.next?r.next.prev=t.prev:this.tail=t.prev}first(){return this.head}isEmpty(){return!this.head}};WE.exports=za});var QE=m((Are,KE)=>{var _a=class{constructor(t,r){this.point=t,this.index=r,this.next=null,this.prev=null,this.face=null}};KE.exports=_a});var ty=m((bre,ey)=>{var zk=_i(),_k=Yi(),Ba=class{constructor(t,r){this.vertex=t,this.face=r,this.next=null,this.prev=null,this.opposite=null}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){return this.tail()?zk(this.tail().point,this.head().point):-1}lengthSquared(){return this.tail()?_k(this.tail().point,this.head().point):-1}setOpposite(t){this.opposite=t,t.opposite=this}};ey.exports=Ba});var ny=m((wre,sy)=>{var Va=Li(),Bk=zi(),Vk=kr(),Ga=Fs(),Gk=Bi(),Xk=Xn(),ko=Xi(),Xa=Ps(),Ya=ty(),ry=0,Yk=1,Ha=2,dn=class{constructor(){this.normal=[],this.centroid=[],this.offset=0,this.outside=null,this.mark=ry,this.edge=null,this.nVertices=0}getEdge(t){if(typeof t!="number")throw Error("requires a number");let r=this.edge;for(;t>0;)r=r.next,t-=1;for(;t<0;)r=r.prev,t+=1;return r}computeNormal(){let t=this.edge,r=t.next,s=r.next,n=Xa([],r.head().point,t.head().point),o=[],i=[];for(this.nVertices=2,this.normal=[0,0,0];s!==t;)Bk(i,n),Xa(n,s.head().point,t.head().point),Va(this.normal,this.normal,Vk(o,i,n)),s=s.next,this.nVertices+=1;this.area=Gk(this.normal),this.normal=ko(this.normal,this.normal,1/this.area)}computeNormalMinArea(t){if(this.computeNormal(),this.area<t){let r,s=0,n=this.edge;do{let u=n.lengthSquared();u>s&&(r=n,s=u),n=n.next}while(n!==this.edge);let o=r.tail().point,i=r.head().point,c=Xa([],i,o),a=Math.sqrt(s);ko(c,c,1/a);let l=Ga(this.normal,c);ko(c,c,-l),Va(this.normal,this.normal,c),Xk(this.normal,this.normal)}}computeCentroid(){this.centroid=[0,0,0];let t=this.edge;do Va(this.centroid,this.centroid,t.head().point),t=t.next;while(t!==this.edge);ko(this.centroid,this.centroid,1/this.nVertices)}computeNormalAndCentroid(t){typeof t<"u"?this.computeNormalMinArea(t):this.computeNormal(),this.computeCentroid(),this.offset=Ga(this.normal,this.centroid)}distanceToPlane(t){return Ga(this.normal,t)-this.offset}connectHalfEdges(t,r){let s;if(t.opposite.face===r.opposite.face){let n=r.opposite.face,o;t===this.edge&&(this.edge=r),n.nVertices===3?(o=r.opposite.prev.opposite,n.mark=Ha,s=n):(o=r.opposite.next,n.edge===o.prev&&(n.edge=o),o.prev=o.prev.prev,o.prev.next=o),r.prev=t.prev,r.prev.next=r,r.setOpposite(o),n.computeNormalAndCentroid()}else t.next=r,r.prev=t;return s}mergeAdjacentFaces(t,r){let s=t.opposite,n=s.face;r.push(n),n.mark=Ha;let o=t.prev,i=t.next,c=s.prev,a=s.next;for(;o.opposite.face===n;)o=o.prev,a=a.next;for(;i.opposite.face===n;)i=i.next,c=c.prev;let l;for(l=a;l!==c.next;l=l.next)l.face=this;this.edge=i;let u;return u=this.connectHalfEdges(c,i),u&&r.push(u),u=this.connectHalfEdges(o,a),u&&r.push(u),this.computeNormalAndCentroid(),r}collectIndices(){let t=[],r=this.edge;do t.push(r.head().index),r=r.next;while(r!==this.edge);return t}static createTriangle(t,r,s,n=0){let o=new dn,i=new Ya(t,o),c=new Ya(r,o),a=new Ya(s,o);return i.next=a.prev=c,c.next=i.prev=a,a.next=c.prev=i,o.edge=i,o.computeNormalAndCentroid(n),o}};sy.exports={VISIBLE:ry,NON_CONVEX:Yk,DELETED:Ha,Face:dn}});var ly=m((qre,ay)=>{var ja=Fs(),Hk=HE(),jk=UE(),oy=JE(),Zk=QE(),{Face:Bt,VISIBLE:os,NON_CONVEX:iy,DELETED:Uk}=ny(),Wk=1,cy=2,Za=class{constructor(t){if(!Array.isArray(t))throw TypeError("input is not a valid array");if(t.length<4)throw Error("cannot build a simplex out of <4 points");this.tolerance=-1,this.nFaces=0,this.nPoints=t.length,this.faces=[],this.newFaces=[],this.claimed=new oy,this.unclaimed=new oy,this.vertices=[];for(let r=0;r<t.length;r+=1)this.vertices.push(new Zk(t[r],r));this.discardedFaces=[],this.vertexPointIndices=[]}addVertexToFace(t,r){t.face=r,r.outside?this.claimed.insertBefore(r.outside,t):this.claimed.add(t),r.outside=t}removeVertexFromFace(t,r){t===r.outside&&(t.next&&t.next.face===r?r.outside=t.next:r.outside=null),this.claimed.remove(t)}removeAllVerticesFromFace(t){if(t.outside){let r=t.outside;for(;r.next&&r.next.face===t;)r=r.next;return this.claimed.removeChain(t.outside,r),r.next=null,t.outside}}deleteFaceVertices(t,r){let s=this.removeAllVerticesFromFace(t);if(s)if(!r)this.unclaimed.addAll(s);else{let n;for(let o=s;o;o=n)n=o.next,r.distanceToPlane(o.point)>this.tolerance?this.addVertexToFace(o,r):this.unclaimed.add(o)}}resolveUnclaimedPoints(t){let r=this.unclaimed.first();for(let s=r;s;s=r){r=s.next;let n=this.tolerance,o;for(let i=0;i<t.length;i+=1){let c=t[i];if(c.mark===os){let a=c.distanceToPlane(s.point);if(a>n&&(n=a,o=c),n>1e3*this.tolerance)break}}o&&this.addVertexToFace(s,o)}}computeExtremes(){let t=[],r=[],s=[],n=[],o,i;for(o=0;o<3;o+=1)s[o]=n[o]=this.vertices[0];for(o=0;o<3;o+=1)t[o]=r[o]=this.vertices[0].point[o];for(o=1;o<this.vertices.length;o+=1){let c=this.vertices[o],a=c.point;for(i=0;i<3;i+=1)a[i]<t[i]&&(t[i]=a[i],s[i]=c);for(i=0;i<3;i+=1)a[i]>r[i]&&(r[i]=a[i],n[i]=c)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t[0]),Math.abs(r[0]))+Math.max(Math.abs(t[1]),Math.abs(r[1]))+Math.max(Math.abs(t[2]),Math.abs(r[2]))),[s,n]}createInitialSimplex(){let t=this.vertices,[r,s]=this.computeExtremes(),n,o,i,c,a=0,l=0;for(i=0;i<3;i+=1){let p=s[i].point[i]-r[i].point[i];p>a&&(a=p,l=i)}let u=r[l],h=s[l];for(a=0,i=0;i<this.vertices.length;i+=1){let p=this.vertices[i];if(p!==u&&p!==h){let x=Hk(p.point,u.point,h.point);x>a&&(a=x,n=p)}}let f=jk([],u.point,h.point,n.point),d=ja(u.point,f);for(a=-1,i=0;i<this.vertices.length;i+=1){let p=this.vertices[i];if(p!==u&&p!==h&&p!==n){let x=Math.abs(ja(f,p.point)-d);x>a&&(a=x,o=p)}}let g=[];if(ja(o.point,f)-d<0)for(g.push(Bt.createTriangle(u,h,n),Bt.createTriangle(o,h,u),Bt.createTriangle(o,n,h),Bt.createTriangle(o,u,n)),i=0;i<3;i+=1){let p=(i+1)%3;g[i+1].getEdge(2).setOpposite(g[0].getEdge(p)),g[i+1].getEdge(1).setOpposite(g[p+1].getEdge(0))}else for(g.push(Bt.createTriangle(u,n,h),Bt.createTriangle(o,u,h),Bt.createTriangle(o,h,n),Bt.createTriangle(o,n,u)),i=0;i<3;i+=1){let p=(i+1)%3;g[i+1].getEdge(2).setOpposite(g[0].getEdge((3-i)%3)),g[i+1].getEdge(0).setOpposite(g[p+1].getEdge(1))}for(i=0;i<4;i+=1)this.faces.push(g[i]);for(i=0;i<t.length;i+=1){let p=t[i];if(p!==u&&p!==h&&p!==n&&p!==o){a=this.tolerance;let x;for(c=0;c<4;c+=1){let v=g[c].distanceToPlane(p.point);v>a&&(a=v,x=g[c])}x&&this.addVertexToFace(p,x)}}}reindexFaceAndVertices(){let t=[];for(let r=0;r<this.faces.length;r+=1){let s=this.faces[r];s.mark===os&&t.push(s)}this.faces=t}collectFaces(t){let r=[];for(let s=0;s<this.faces.length;s+=1){if(this.faces[s].mark!==os)throw Error("attempt to include a destroyed face in the hull");let n=this.faces[s].collectIndices();if(t)r.push(n);else for(let o=0;o<n.length-2;o+=1)r.push([n[0],n[o+1],n[o+2]])}return r}nextVertexToAdd(){if(!this.claimed.isEmpty()){let t,r,s=0,n=this.claimed.first().face;for(r=n.outside;r&&r.face===n;r=r.next){let o=n.distanceToPlane(r.point);o>s&&(s=o,t=r)}return t}}computeHorizon(t,r,s,n){this.deleteFaceVertices(s),s.mark=Uk;let o;r?o=r.next:o=r=s.getEdge(0);do{let i=o.opposite,c=i.face;c.mark===os&&(c.distanceToPlane(t)>this.tolerance?this.computeHorizon(t,i,c,n):n.push(o)),o=o.next}while(o!==r)}addAdjoiningFace(t,r){let s=Bt.createTriangle(t,r.tail(),r.head());return this.faces.push(s),s.getEdge(-1).setOpposite(r.opposite),s.getEdge(0)}addNewFaces(t,r){this.newFaces=[];let s,n;for(let o=0;o<r.length;o+=1){let i=r[o],c=this.addAdjoiningFace(t,i);s?c.next.setOpposite(n):s=c,this.newFaces.push(c.face),n=c}s.next.setOpposite(n)}oppositeFaceDistance(t){return t.face.distanceToPlane(t.opposite.face.centroid)}doAdjacentMerge(t,r){let s=t.edge,n=!0,o=0;do{if(o>=t.nVertices)throw Error("merge recursion limit exceeded");let i=s.opposite.face,c=!1;if(r===cy?(this.oppositeFaceDistance(s)>-this.tolerance||this.oppositeFaceDistance(s.opposite)>-this.tolerance)&&(c=!0):t.area>i.area?this.oppositeFaceDistance(s)>-this.tolerance?c=!0:this.oppositeFaceDistance(s.opposite)>-this.tolerance&&(n=!1):this.oppositeFaceDistance(s.opposite)>-this.tolerance?c=!0:this.oppositeFaceDistance(s)>-this.tolerance&&(n=!1),c){let a=t.mergeAdjacentFaces(s,[]);for(let l=0;l<a.length;l+=1)this.deleteFaceVertices(a[l],t);return!0}s=s.next,o+=1}while(s!==t.edge);return n||(t.mark=iy),!1}addVertexToHull(t){let r=[];this.unclaimed.clear(),this.removeVertexFromFace(t,t.face),this.computeHorizon(t.point,null,t.face,r),this.addNewFaces(t,r);for(let s=0;s<this.newFaces.length;s+=1){let n=this.newFaces[s];if(n.mark===os)for(;this.doAdjacentMerge(n,Wk););}for(let s=0;s<this.newFaces.length;s+=1){let n=this.newFaces[s];if(n.mark===iy)for(n.mark=os;this.doAdjacentMerge(n,cy););}this.resolveUnclaimedPoints(this.newFaces)}build(){let t;for(this.createInitialSimplex();t=this.nextVertexToAdd();)this.addVertexToHull(t);this.reindexFaceAndVertices()}};ay.exports=Za});var fy=m((Sre,uy)=>{var Jk=ly(),Kk=(e,t={})=>{let r=new Jk(e);return r.build(),r.collectFaces(t.skipTriangulation)};uy.exports=Kk});var py=m((Dre,hy)=>{var Qk=B(),eO=X(),tO=H(),rO=fy(),sO=Po(),nO=(...e)=>{if(e=Qk(e),e.length===1)return e[0];let t=sO(e),s=rO(t,{skipTriangulation:!0}).map(n=>{let o=n.map(i=>t[i]);return tO.create(o)});return eO.create(s)};hy.exports=nO});var Ua=m((Tre,dy)=>{var oO=B(),iO=Jr(),cO=G(),aO=X(),lO=se(),uO=zE(),fO=VE(),hO=py(),pO=(...e)=>{if(e=oO(e),e.length===0)throw new Error("wrong number of arguments");if(!iO(e))throw new Error("only hulls of the same type are supported");let t=e[0];return lO.isA(t)?uO(e):cO.isA(t)?fO(e):aO.isA(t)?hO(e):t};dy.exports=pO});var my=m((Cre,gy)=>{var dO=B(),gO=Io(),mO=Ua(),xO=(...e)=>{if(e=dO(e),e.length<2)throw new Error("wrong number of arguments");let t=[];for(let r=1;r<e.length;r++)t.push(mO(e[r-1],e[r]));return gO(t)};gy.exports=xO});var vy=m(($re,xy)=>{xy.exports={hull:Ua(),hullChain:my()}});var Ja=m((Rre,yy)=>{var Wa=k(),Ey=H(),vO=(e,t)=>{let r=Math.abs(Ey.measureArea(t));return Number.isFinite(r)&&r>e},EO=(e,t)=>{let r=t.map(n=>{let o=n.vertices.map(a=>Wa.snap(Wa.create(),a,e)),i=[];for(let a=0;a<o.length;a++){let l=(a+1)%o.length;Wa.equals(o[a],o[l])||i.push(o[a])}let c=Ey.create(i);return n.color&&(c.color=n.color),c}),s=e*e*Math.sqrt(3)/4;return r=r.filter(n=>vO(s,n)),r};yy.exports=EO});var wy=m((Ire,by)=>{var yO=js(),is=k(),Oo=H(),AO=e=>{let t=Oo.toPoints(e),r=[];for(let s=0;s<t.length;s++){let n=(s+1)%t.length,o={v1:t[s],v2:t[n]};r.push(o)}for(let s=0;s<r.length;s++){let n=(s+1)%t.length;r[s].next=r[n],r[n].prev=r[s]}return r},bO=(e,t)=>{let r=`${t.v1}:${t.v2}`;e.set(r,t)},Ka=(e,t)=>{let r=`${t.v1}:${t.v2}`;e.delete(r)},wO=(e,t)=>{let r=`${t.v2}:${t.v1}`;return e.get(r)},qO=(e,t,r)=>{let s=e.prev.v1,n=e.prev.v2,o=t.next.v2,i=Ay(s,n,o,r);s=t.prev.v1,n=t.prev.v2,o=e.next.v2;let c=Ay(s,n,o,r);return[i,c]},SO=is.create(),DO=is.create(),Ay=(e,t,r,s)=>{let n=is.subtract(SO,t,e),o=is.subtract(DO,r,t);return is.cross(n,n,o),is.dot(n,s)},TO=e=>{let t,r=[];for(;e.next;){let s=e.next;r.push(e.v1),e.v1=null,e.v2=null,e.next=null,e.prev=null,e=s}return r.length>0&&(t=Oo.create(r)),t},CO=e=>{if(e.length<2)return e;let t=e[0].plane,r=e.slice(),s=new Map;for(;r.length>0;){let o=r.shift(),i=AO(o);for(let c=0;c<i.length;c++){let a=i[c],l=wO(s,a);if(l){let u=qO(a,l,t);if(u[0]>=0&&u[1]>=0){let h=l.next,f=a.next;a.prev.next=l.next,a.next.prev=l.prev,l.prev.next=a.next,l.next.prev=a.prev,a.v1=null,a.v2=null,a.next=null,a.prev=null,Ka(s,l),l.v1=null,l.v2=null,l.next=null,l.prev=null;let d=(g,p,x)=>{let v={v1:x.v1,v2:p.v2,next:p.next,prev:x.prev};x.prev.next=v,p.next.prev=v,Ka(g,p),p.v1=null,p.v2=null,p.next=null,p.prev=null,Ka(g,x),x.v1=null,x.v2=null,x.next=null,x.prev=null};u[0]===0&&d(s,h,h.prev),u[1]===0&&d(s,f,f.prev)}}else a.next&&bO(s,a)}}let n=[];return s.forEach(o=>{let i=TO(o);i&&n.push(i)}),s.clear(),n},$O=(e,t)=>Math.abs(e[3]-t[3])<15e-8?yO(e,t):!1,RO=(e,t)=>{let r=[];t.forEach(n=>{let o=r.find(i=>$O(i[0],Oo.plane(n)));o?o[1].push(n):r.push([Oo.plane(n),[n]])});let s=[];return r.forEach(n=>{let o=n[1],i=CO(o);s=s.concat(i)}),s};by.exports=RO});var Ty=m((Mre,Dy)=>{var qy=j(),Dt=k(),IO=H(),cr=!1,ke=e=>`${e}`,Sy=(e,t,r,s,n,o)=>{let i=ke(s),c=ke(n);if(cr&&i===c)throw new Error("assert failed");let a=`${i}/${c}`,l=`${c}/${i}`;if(e.has(l))return Lo(e,t,r,n,s,null),null;let u={vertex0:s,vertex1:n,polygonindex:o};return e.has(a)?e.get(a).push(u):e.set(a,[u]),t.has(i)?t.get(i).push(a):t.set(i,[a]),r.has(c)?r.get(c).push(a):r.set(c,[a]),a},Lo=(e,t,r,s,n,o)=>{let i=ke(s),c=ke(n),a=`${i}/${c}`;if(cr&&!e.has(a))throw new Error("assert failed");let l=-1,u=e.get(a);for(let h=0;h<u.length;h++){let f=u[h],d=ke(f.vertex0);if(d===i&&(d=ke(f.vertex1),d===c&&!(o!==null&&f.polygonindex!==o))){l=h;break}}if(cr&&l<0)throw new Error("assert failed");if(u.splice(l,1),u.length===0&&e.delete(a),l=t.get(i).indexOf(a),cr&&l<0)throw new Error("assert failed");if(t.get(i).splice(l,1),t.get(i).length===0&&t.delete(i),l=r.get(c).indexOf(a),cr&&l<0)throw new Error("assert failed");r.get(c).splice(l,1),r.get(c).length===0&&r.delete(c)},MO=e=>{let t=new Map;for(let r=0;r<e.length;r++){let s=e[r],n=s.vertices.length;if(n>=3){let o=s.vertices[0],i=ke(o);for(let c=0;c<n;c++){let a=c+1;a===n&&(a=0);let l=s.vertices[a],u=ke(l),h=`${i}/${u}`,f=`${u}/${i}`;if(t.has(f)){let d=t.get(f);d.splice(-1,1),d.length===0&&t.delete(f)}else{let d={vertex0:o,vertex1:l,polygonindex:r};t.has(h)?t.get(h).push(d):t.set(h,[d])}o=l,i=u}}else console.warn("warning: invalid polygon found during insertTjunctions")}if(t.size>0){let r=new Map,s=new Map,n=new Map;for(let[i,c]of t)n.set(i,!0),c.forEach(a=>{let l=ke(a.vertex0),u=ke(a.vertex1);r.has(l)?r.get(l).push(i):r.set(l,[i]),s.has(u)?s.get(u).push(i):s.set(u,[i])});let o=e.slice(0);for(;t.size!==0;){for(let c of t.keys())n.set(c,!0);let i=!1;for(;;){let c=Array.from(n.keys());if(c.length===0)break;let a=c[0],l=!0;if(t.has(a)){let u=t.get(a);if(cr&&u.length===0)throw new Error("assert failed");let h=u[0];for(let f=0;f<2;f++){let d=f===0?h.vertex0:h.vertex1,g=f===0?h.vertex1:h.vertex0,p=ke(d),x=ke(g),v=[];f===0?s.has(p)&&(v=s.get(p)):r.has(p)&&(v=r.get(p));for(let y=0;y<v.length;y++){let b=v[y],E=t.get(b)[0],q=f===0?E.vertex0:E.vertex1,w=f===0?E.vertex1:E.vertex0,D=ke(q),T=ke(w);if(cr&&T!==p)throw new Error("assert failed");if(D===x){Lo(t,r,s,d,g,null),Lo(t,r,s,g,d,null),l=!1,f=2,i=!0;break}else{let A=d,S=g,$=q,C=Dt.subtract(Dt.create(),$,A),F=Dt.dot(Dt.subtract(Dt.create(),S,A),C)/Dt.dot(C,C);if(F>0&&F<1){let R=Dt.scale(Dt.create(),C,F);if(Dt.add(R,R,A),Dt.squaredDistance(R,S)<qy.EPS*qy.EPS){let I=E.polygonindex,V=o[I],K=ke(E.vertex1),fe=-1;for(let Te=0;Te<V.vertices.length;Te++)if(ke(V.vertices[Te])===K){fe=Te;break}if(cr&&fe<0)throw new Error("assert failed");let Ee=V.vertices.slice(0);Ee.splice(fe,0,g);let be=IO.create(Ee);o[I]=be,Lo(t,r,s,E.vertex0,E.vertex1,I);let $e=Sy(t,r,s,E.vertex0,g,I),tt=Sy(t,r,s,g,E.vertex1,I);$e!==null&&n.set($e,!0),tt!==null&&n.set(tt,!0),l=!1,f=2,i=!0;break}}}}}}l&&n.delete(a)}if(!i)break}e=o}return t.clear(),e};Dy.exports=MO});var $y=m((Fre,Cy)=>{var Qa=k(),el=H(),FO=(e,t,r)=>{let s=t.vertices.length;if(s>3){if(s>4){let i=[0,0,0];t.vertices.forEach(c=>Qa.add(i,i,c)),Qa.snap(i,Qa.divide(i,i,[s,s,s]),e);for(let c=0;c<s;c++){let a=el.create([i,t.vertices[c],t.vertices[(c+1)%s]]);t.color&&(a.color=t.color),r.push(a)}return}let n=el.create([t.vertices[0],t.vertices[1],t.vertices[2]]),o=el.create([t.vertices[0],t.vertices[2],t.vertices[3]]);t.color&&(n.color=t.color,o.color=t.color),r.push(n,o);return}r.push(t)},NO=(e,t)=>{let r=[];return t.forEach(s=>{FO(e,s,r)}),r};Cy.exports=NO});var My=m((Nre,Iy)=>{var PO=B(),kO=Lt(),OO=G(),Ry=X(),LO=se(),zO=Ja(),_O=wy(),BO=Ty(),VO=$y(),GO=(e,t)=>t,XO=(e,t)=>t,YO=(e,t)=>{let r={snap:!1,simplify:!1,triangulate:!1},{snap:s,simplify:n,triangulate:o}=Object.assign({},r,e),i=kO(t),c=Ry.toPolygons(t);s&&(c=zO(i,c)),n&&(c=_O(i,c)),o&&(c=BO(c),c=VO(i,c));let a=Object.assign({},t);return a.polygons=c,a},HO=(e,...t)=>{if(t=PO(t),t.length===0)throw new Error("wrong number of arguments");let r=t.map(s=>{if(LO.isA(s))return GO(e,s);if(OO.isA(s))return XO(e,s);if(Ry.isA(s))return YO(e,s);throw new Error("invalid geometry")});return r.length===1?r[0]:r};Iy.exports=HO});var Ny=m((Pre,Fy)=>{var jO=B(),Tr=Y(),tl=G(),rl=X(),sl=se(),nl=Lt(),ZO=Ja(),UO=e=>{let t=nl(e),s=sl.toPoints(e).map(n=>Tr.snap(Tr.create(),n,t));return sl.create(s)},WO=e=>{let t=nl(e),s=tl.toSides(e).map(n=>[Tr.snap(Tr.create(),n[0],t),Tr.snap(Tr.create(),n[1],t)]);return s=s.filter(n=>!Tr.equals(n[0],n[1])),tl.create(s)},JO=e=>{let t=nl(e),r=rl.toPolygons(e),s=ZO(t,r);return rl.create(s)},KO=(...e)=>{if(e=jO(e),e.length===0)throw new Error("wrong number of arguments");let t=e.map(r=>sl.isA(r)?UO(r):tl.isA(r)?WO(r):rl.isA(r)?JO(r):r);return t.length===1?t[0]:t};Fy.exports=KO});var ky=m((kre,Py)=>{Py.exports={generalize:My(),snap:Ny()}});var Ly=m((Ore,Oy)=>{var QO=(e,t,r)=>{for(e=e.slice();e.length<r;)e.push(t);return e};Oy.exports=QO});var Gy=m((Lre,Vy)=>{var eL=B(),zy=Ly(),By=no(),{translate:tL}=nr(),rL=e=>{if(!Array.isArray(e.modes)||e.modes.length>3)throw new Error("align(): modes must be an array of length <= 3");if(e.modes=zy(e.modes,"none",3),e.modes.filter(t=>["center","max","min","none"].includes(t)).length!==3)throw new Error('align(): all modes must be one of "center", "max" or "min"');if(!Array.isArray(e.relativeTo)||e.relativeTo.length>3)throw new Error("align(): relativeTo must be an array of length <= 3");if(e.relativeTo=zy(e.relativeTo,0,3),e.relativeTo.filter(t=>Number.isFinite(t)||t==null).length!==3)throw new Error("align(): all relativeTo values must be a number, or null.");if(typeof e.grouped!="boolean")throw new Error("align(): grouped must be a boolean value.");return e},sL=(e,t,r)=>{for(let s=0;s<3;s++)e[s]==null&&(t[s]==="center"?e[s]=(r[0][s]+r[1][s])/2:t[s]==="max"?e[s]=r[1][s]:t[s]==="min"&&(e[s]=r[0][s]));return e},_y=(e,t,r)=>{let s=By(e),n=[0,0,0];for(let o=0;o<3;o++)t[o]==="center"?n[o]=r[o]-(s[0][o]+s[1][o])/2:t[o]==="max"?n[o]=r[o]-s[1][o]:t[o]==="min"&&(n[o]=r[o]-s[0][o]);return tL(n,e)},nL=(e,...t)=>{e=Object.assign({},{modes:["center","center","min"],relativeTo:[0,0,0],grouped:!1},e),e=rL(e);let{modes:s,relativeTo:n,grouped:o}=e;if(t=eL(t),t.length===0)throw new Error("align(): No geometries were provided to act upon");if(n.filter(i=>i==null).length){let i=By(t);n=sL(n,s,i)}return o?t=_y(t,s,n):t=t.map(i=>_y(i,s,n)),t.length===1?t[0]:t};Vy.exports=nL});var gn=m((zre,Xy)=>{var oL=B(),iL=G(),cL=X(),aL=se(),lL=Kt(),{translate:uL}=nr(),ol=(e,t)=>{let r={axes:[!0,!0,!0],relativeTo:[0,0,0]},{axes:s,relativeTo:n}=Object.assign({},r,e),o=lL(t),i=[0,0,0];return s[0]&&(i[0]=n[0]-(o[0][0]+(o[1][0]-o[0][0])/2)),s[1]&&(i[1]=n[1]-(o[0][1]+(o[1][1]-o[0][1])/2)),s[2]&&(i[2]=n[2]-(o[0][2]+(o[1][2]-o[0][2])/2)),uL(i,t)},zo=(e,...t)=>{let r={axes:[!0,!0,!0],relativeTo:[0,0,0]},{axes:s,relativeTo:n}=Object.assign({},r,e);if(t=oL(t),t.length===0)throw new Error("wrong number of arguments");if(n.length!==3)throw new Error("relativeTo must be an array of length 3");e={axes:s,relativeTo:n};let o=t.map(i=>aL.isA(i)||iL.isA(i)||cL.isA(i)?ol(e,i):i);return o.length===1?o[0]:o},fL=(...e)=>zo({axes:[!0,!1,!1]},e),hL=(...e)=>zo({axes:[!1,!0,!1]},e),pL=(...e)=>zo({axes:[!1,!1,!0]},e);Xy.exports={center:zo,centerX:fL,centerY:hL,centerZ:pL}});var mn=m((_re,Uy)=>{var dL=B(),Yy=ie(),Hy=G(),jy=X(),Zy=se(),_o=(e,...t)=>{if(!Array.isArray(e))throw new Error("factors must be an array");if(t=dL(t),t.length===0)throw new Error("wrong number of arguments");for(e=e.slice();e.length<3;)e.push(1);if(e[0]<=0||e[1]<=0||e[2]<=0)throw new Error("factors must be positive");let r=Yy.fromScaling(Yy.create(),e),s=t.map(n=>Zy.isA(n)?Zy.transform(r,n):Hy.isA(n)?Hy.transform(r,n):jy.isA(n)?jy.transform(r,n):n);return s.length===1?s[0]:s},gL=(e,...t)=>_o([e,1,1],t),mL=(e,...t)=>_o([1,e,1],t),xL=(e,...t)=>_o([1,1,e],t);Uy.exports={scale:_o,scaleX:gL,scaleY:mL,scaleZ:xL}});var eA=m((Bre,Qy)=>{var vL=B(),Wy=G(),Jy=X(),Ky=se(),EL=(e,...t)=>{if(t=vL(t),t.length===0)throw new Error("wrong number of arguments");let r=t.map(s=>Ky.isA(s)?Ky.transform(e,s):Wy.isA(s)?Wy.transform(e,s):Jy.isA(s)?Jy.transform(e,s):s);return r.length===1?r[0]:r};Qy.exports=EL});var rA=m((Vre,tA)=>{tA.exports={align:Gy(),center:gn().center,centerX:gn().centerX,centerY:gn().centerY,centerZ:gn().centerZ,mirror:Hr().mirror,mirrorX:Hr().mirrorX,mirrorY:Hr().mirrorY,mirrorZ:Hr().mirrorZ,rotate:Zr().rotate,rotateX:Zr().rotateX,rotateY:Zr().rotateY,rotateZ:Zr().rotateZ,scale:mn().scale,scaleX:mn().scaleX,scaleY:mn().scaleY,scaleZ:mn().scaleZ,transform:eA(),translate:nr().translate,translateX:nr().translateX,translateY:nr().translateY,translateZ:nr().translateZ}});var ue=m((Gre,sA)=>{sA.exports={colors:yd(),curves:Fd(),geometries:Kn(),maths:sg(),measurements:_g(),primitives:mx(),text:Sx(),utils:ya(),booleans:Lv(),expansions:uE(),extrusions:IE(),hulls:vy(),modifiers:ky(),transforms:rA()}});var iA=m((Xre,oA)=>{var nA=e=>e.reduce((t,r)=>Array.isArray(r)?t.concat(nA(r)):t.concat(r),[]);oA.exports=nA});var aA=m((Yre,cA)=>{var yL=(e,t)=>e-t;cA.exports=yL});var uA=m((Hre,lA)=>{var AL=e=>{if(!(!Array.isArray(e)||e.length===0))return e[0]};lA.exports=AL});var hA=m((jre,fA)=>{var bL=(e,t,r)=>{let s=0,n=e.length;for(;n>s;){let o=Math.floor((s+n)/2),i=e[o];r(t,i)>0?s=o+1:n=o}return e.splice(s,0,t),e};fA.exports=bL});var dA=m((Zre,pA)=>{var wL=(e,t)=>{if(!(!Array.isArray(e)||e.length<t))return e[t]};pA.exports=wL});var mA=m((Ure,gA)=>{var qL=(e,t,r)=>{for(e=e.slice();e.length<r;)e.push(t);return e};gA.exports=qL});var vA=m((Wre,xA)=>{var SL=e=>Array.isArray(e)?e:e==null?[]:[e];xA.exports=SL});var dt=m((Jre,EA)=>{EA.exports={flatten:iA(),fnNumberSort:aA(),head:uA(),insertSorted:hA(),nth:dA(),padToLength:mA(),toArray:vA()}});var il=m((Kre,AA)=>{var DL=J0(),{geometries:Bo,modifiers:TL}=ue(),{flatten:CL,toArray:$L}=dt(),RL="application/amf+xml",IL=(e,...t)=>{e=Object.assign({},{statusCallback:null,unit:"millimeter"},e),t=CL(t);let s=t.filter(i=>Bo.geom3.isA(i));if(s.length===0)throw new Error("only 3D geometries can be serialized to AMF");t.length!==s.length&&console.warn("some objects could not be serialized to AMF"),s=$L(TL.generalize({snap:!0,triangulate:!0},s)),e.statusCallback&&e.statusCallback({progress:0});let n=["amf",{unit:e.unit,version:"1.1"},["metadata",{type:"author"},"Created by JSCAD"]];n=n.concat(ML(s,e));let o=`<?xml version="1.0" encoding="UTF-8"?>
${DL(n,2)}`;return e&&e.statusCallback&&e.statusCallback({progress:100}),[o]},ML=(e,t)=>{let r=[];return e.forEach((s,n)=>{Bo.geom3.toPolygons(s).length>0&&(t.id=n,r.push(FL(s,t)))}),r},FL=(e,t)=>["object",{id:t.id},NL(e,t)],NL=(e,t)=>{let r=["mesh",{},PL(e,t)];return r=r.concat(LL(e,t)),r},PL=(e,t)=>{let r=["vertices",{}],s=[];return Bo.geom3.toPolygons(e).forEach(o=>{for(let i=0;i<o.vertices.length;i++)s.push(kL(o.vertices[i],t))}),r.concat(s)},kL=(e,t)=>["vertex",{},OL(e,t)],OL=(e,t)=>["coordinates",{},["x",{},e[0]],["y",{},e[1]],["z",{},e[2]]],LL=(e,t)=>{let r=yA(e.color),s=Bo.geom3.toPolygons(e),n=[],o=["volume",{}];r&&o.push(r);let i=0;return s.forEach(c=>{if(c.vertices.length<3)return;let a=_L(c,i,t);o=o.concat(a),i+=c.vertices.length}),n.push(o),n},yA=e=>e?(e.length<4&&e.push(1),["color",{},["r",{},e[0]],["g",{},e[1]],["b",{},e[2]],["a",{},e[3]]]):null,zL=(e,t)=>{let r=e.color;return yA(r)},_L=(e,t,r)=>{let s=zL(e,r),n=[];for(let o=0;o<e.vertices.length-2;o++)s?n.push(["triangle",{},s,["v1",{},t],["v2",{},t+o+1],["v3",{},t+o+2]]):n.push(["triangle",{},["v1",{},t],["v2",{},t+o+1],["v3",{},t+o+2]]);return n};AA.exports={serialize:IL,mimeType:RL}});var wA=m((Qre,bA)=>{var BL=function(){return`  0
SECTION
  2
HEADER
  9
$ACADVER
  1
AC1027
  9
$ACADMAINTVER
 70
8
  9
$DWGCODEPAGE
  3
ANSI_1252
  9
$LASTSAVEDBY
  1
unknown
  9
$REQUIREDVERSIONS
160
0
  9
$INSBASE
 10
0.0
 20
0.0
 30
0.0
  9
$EXTMIN
 10
1e+20
 20
1e+20
 30
1e+20
  9
$EXTMAX
 10
-1e+20
 20
-1e+20
 30
-1e+20
  9
$LIMMIN
 10
0.0
 20
0.0
  9
$LIMMAX
 10
12.0
 20
9.0
  9
$ORTHOMODE
 70
0
  9
$REGENMODE
 70
1
  9
$FILLMODE
 70
1
  9
$QTEXTMODE
 70
0
  9
$MIRRTEXT
 70
0
  9
$LTSCALE
 40
1.0
  9
$ATTMODE
 70
1
  9
$TEXTSIZE
 40
0.2
  9
$TRACEWID
 40
0.05
  9
$TEXTSTYLE
  7
Notes
  9
$CLAYER
  8
0
  9
$CELTYPE
  6
ByLayer
  9
$CECOLOR
 62
256
  9
$CELTSCALE
 40
1.0
  9
$DISPSILH
 70
0
  9
$DIMSCALE
 40
1.0
  9
$DIMASZ
 40
3.0
  9
$DIMEXO
 40
1.5
  9
$DIMDLI
 40
6.0
  9
$DIMRND
 40
0.0
  9
$DIMDLE
 40
0.0
  9
$DIMEXE
 40
3.0
  9
$DIMTP
 40
0.0
  9
$DIMTM
 40
0.0
  9
$DIMTXT
 40
3.0
  9
$DIMCEN
 40
3.0
  9
$DIMTSZ
 40
0.0
  9
$DIMTOL
 70
0
  9
$DIMLIM
 70
0
  9
$DIMTIH
 70
0
  9
$DIMTOH
 70
0
  9
$DIMSE1
 70
0
  9
$DIMSE2
 70
0
  9
$DIMTAD
 70
1
  9
$DIMZIN
 70
3
  9
$DIMBLK
  1

  9
$DIMASO
 70
1
  9
$DIMSHO
 70
1
  9
$DIMPOST
  1

  9
$DIMAPOST
  1

  9
$DIMALT
 70
0
  9
$DIMALTD
 70
2
  9
$DIMALTF
 40
25.4
  9
$DIMLFAC
 40
1.0
  9
$DIMTOFL
 70
0
  9
$DIMTVP
 40
0.0
  9
$DIMTIX
 70
0
  9
$DIMSOXD
 70
0
  9
$DIMSAH
 70
0
  9
$DIMBLK1
  1

  9
$DIMBLK2
  1

  9
$DIMSTYLE
  2
Civil-Metric
  9
$DIMCLRD
 70
0
  9
$DIMCLRE
 70
0
  9
$DIMCLRT
 70
0
  9
$DIMTFAC
 40
1.0
  9
$DIMGAP
 40
2.0
  9
$DIMJUST
 70
0
  9
$DIMSD1
 70
0
  9
$DIMSD2
 70
0
  9
$DIMTOLJ
 70
1
  9
$DIMTZIN
 70
0
  9
$DIMALTZ
 70
0
  9
$DIMALTTZ
 70
0
  9
$DIMUPT
 70
0
  9
$DIMDEC
 70
2
  9
$DIMTDEC
 70
2
  9
$DIMALTU
 70
2
  9
$DIMALTTD
 70
2
  9
$DIMTXSTY
  7
Standard
  9
$DIMAUNIT
 70
0
  9
$DIMADEC
 70
2
  9
$DIMALTRND
 40
0.0
  9
$DIMAZIN
 70
2
  9
$DIMDSEP
 70
46
  9
$DIMATFIT
 70
3
  9
$DIMFRAC
 70
1
  9
$DIMLDRBLK
  1

  9
$DIMLUNIT
 70
2
  9
$DIMLWD
 70
-2
  9
$DIMLWE
 70
-2
  9
$DIMTMOVE
 70
0
  9
$DIMFXL
 40
1.0
  9
$DIMFXLON
 70
0
  9
$DIMJOGANG
 40
0.785398163397
  9
$DIMTFILL
 70
0
  9
$DIMTFILLCLR
 70
0
  9
$DIMARCSYM
 70
0
  9
$DIMLTYPE
  6

  9
$DIMLTEX1
  6

  9
$DIMLTEX2
  6

  9
$DIMTXTDIRECTION
 70
0
  9
$LUNITS
 70
2
  9
$LUPREC
 70
4
  9
$SKETCHINC
 40
0.1
  9
$FILLETRAD
 40
0.0
  9
$AUNITS
 70
4
  9
$AUPREC
 70
5
  9
$MENU
  1
.
  9
$ELEVATION
 40
0.0
  9
$PELEVATION
 40
0.0
  9
$THICKNESS
 40
0.0
  9
$LIMCHECK
 70
0
  9
$CHAMFERA
 40
0.0
  9
$CHAMFERB
 40
0.0
  9
$CHAMFERC
 40
0.0
  9
$CHAMFERD
 40
0.0
  9
$SKPOLY
 70
0
  9
$TDCREATE
 40
2457986.69756
  9
$TDUCREATE
 40
2455631.2632
  9
$TDUPDATE
 40
2457986.69756
  9
$TDUUPDATE
 40
2456436.43179
  9
$TDINDWG
 40
0.0003490741
  9
$TDUSRTIMER
 40
0.0003487153
  9
$USRTIMER
 70
1
  9
$ANGBASE
 50
0.0
  9
$ANGDIR
 70
0
  9
$PDMODE
 70
0
  9
$PDSIZE
 40
0.0
  9
$PLINEWID
 40
0.0
  9
$SPLFRAME
 70
0
  9
$SPLINETYPE
 70
6
  9
$SPLINESEGS
 70
8
  9
$HANDSEED
  5
5C7
  9
$SURFTAB1
 70
6
  9
$SURFTAB2
 70
6
  9
$SURFTYPE
 70
6
  9
$SURFU
 70
6
  9
$SURFV
 70
6
  9
$UCSBASE
  2

  9
$UCSNAME
  2

  9
$UCSORG
 10
0.0
 20
0.0
 30
0.0
  9
$UCSXDIR
 10
1.0
 20
0.0
 30
0.0
  9
$UCSYDIR
 10
0.0
 20
1.0
 30
0.0
  9
$UCSORTHOREF
  2

  9
$UCSORTHOVIEW
 70
0
  9
$UCSORGTOP
 10
0.0
 20
0.0
 30
0.0
  9
$UCSORGBOTTOM
 10
0.0
 20
0.0
 30
0.0
  9
$UCSORGLEFT
 10
0.0
 20
0.0
 30
0.0
  9
$UCSORGRIGHT
 10
0.0
 20
0.0
 30
0.0
  9
$UCSORGFRONT
 10
0.0
 20
0.0
 30
0.0
  9
$UCSORGBACK
 10
0.0
 20
0.0
 30
0.0
  9
$PUCSBASE
  2

  9
$PUCSNAME
  2

  9
$PUCSORG
 10
0.0
 20
0.0
 30
0.0
  9
$PUCSXDIR
 10
1.0
 20
0.0
 30
0.0
  9
$PUCSYDIR
 10
0.0
 20
1.0
 30
0.0
  9
$PUCSORTHOREF
  2

  9
$PUCSORTHOVIEW
 70
0
  9
$PUCSORGTOP
 10
0.0
 20
0.0
 30
0.0
  9
$PUCSORGBOTTOM
 10
0.0
 20
0.0
 30
0.0
  9
$PUCSORGLEFT
 10
0.0
 20
0.0
 30
0.0
  9
$PUCSORGRIGHT
 10
0.0
 20
0.0
 30
0.0
  9
$PUCSORGFRONT
 10
0.0
 20
0.0
 30
0.0
  9
$PUCSORGBACK
 10
0.0
 20
0.0
 30
0.0
  9
$USERI1
 70
0
  9
$USERI2
 70
0
  9
$USERI3
 70
0
  9
$USERI4
 70
0
  9
$USERI5
 70
0
  9
$USERR1
 40
0.0
  9
$USERR2
 40
0.0
  9
$USERR3
 40
0.0
  9
$USERR4
 40
0.0
  9
$USERR5
 40
0.0
  9
$WORLDVIEW
 70
1
  9
$SHADEDGE
 70
3
  9
$SHADEDIF
 70
70
  9
$TILEMODE
 70
1
  9
$MAXACTVP
 70
64
  9
$PINSBASE
 10
0.0
 20
0.0
 30
0.0
  9
$PLIMCHECK
 70
0
  9
$PEXTMIN
 10
0.628866766397
 20
0.799999952316
 30
0.0
  9
$PEXTMAX
 10
9.02886638493
 20
7.19999957085
 30
0.0
  9
$PLIMMIN
 10
-0.700541819174
 20
-0.228100386192
  9
$PLIMMAX
 10
10.2994579405
 20
8.27189937351
  9
$UNITMODE
 70
0
  9
$VISRETAIN
 70
1
  9
$PLINEGEN
 70
0
  9
$PSLTSCALE
 70
1
  9
$TREEDEPTH
 70
3020
  9
$CMLSTYLE
  2
Standard
  9
$CMLJUST
 70
0
  9
$CMLSCALE
 40
1.0
  9
$PROXYGRAPHICS
 70
1
  9
$MEASUREMENT
 70
1
  9
$CELWEIGHT
370
-1
  9
$ENDCAPS
280
0
  9
$JOINSTYLE
280
0
  9
$LWDISPLAY
290
0
  9
$INSUNITS
 70
4
  9
$HYPERLINKBASE
  1

  9
$STYLESHEET
  1

  9
$XEDIT
290
1
  9
$CEPSNTYPE
380
0
  9
$PSTYLEMODE
290
1
  9
$FINGERPRINTGUID
  2
{39DB1BDD-BC6C-46D3-A333-DFCC0DC4782D}
  9
$VERSIONGUID
  2
{69EEBB2D-7039-498F-9366-3F994E4A07E7}
  9
$EXTNAMES
290
1
  9
$PSVPSCALE
 40
0.0
  9
$OLESTARTUP
290
0
  9
$SORTENTS
280
127
  9
$INDEXCTL
280
0
  9
$HIDETEXT
280
1
  9
$XCLIPFRAME
280
0
  9
$HALOGAP
280
0
  9
$OBSCOLOR
 70
257
  9
$OBSLTYPE
280
0
  9
$INTERSECTIONDISPLAY
280
0
  9
$INTERSECTIONCOLOR
 70
257
  9
$DIMASSOC
280
2
  9
$PROJECTNAME
  1

  9
$CAMERADISPLAY
290
0
  9
$LENSLENGTH
 40
50.0
  9
$CAMERAHEIGHT
 40
0.0
  9
$STEPSPERSEC
 40
2.0
  9
$STEPSIZE
 40
6.0
  9
$3DDWFPREC
 40
2.0
  9
$PSOLWIDTH
 40
0.25
  9
$PSOLHEIGHT
 40
4.0
  9
$LOFTANG1
 40
1.57079632679
  9
$LOFTANG2
 40
1.57079632679
  9
$LOFTMAG1
 40
0.0
  9
$LOFTMAG2
 40
0.0
  9
$LOFTPARAM
 70
7
  9
$LOFTNORMALS
280
1
  9
$LATITUDE
 40
37.795
  9
$LONGITUDE
 40
-122.394
  9
$NORTHDIRECTION
 40
0.0
  9
$TIMEZONE
 70
-8000
  9
$LIGHTGLYPHDISPLAY
280
1
  9
$TILEMODELIGHTSYNCH
280
1
  9
$CMATERIAL
347
96
  9
$SOLIDHIST
280
1
  9
$SHOWHIST
280
1
  9
$DWFFRAME
280
2
  9
$DGNFRAME
280
0
  9
$REALWORLDSCALE
290
1
  9
$INTERFERECOLOR
 62
1
  9
$INTERFEREOBJVS
345
A3
  9
$INTERFEREVPVS
346
A0
  9
$CSHADOW
280
0
  9
$SHADOWPLANELOCATION
 40
0.0
  0
ENDSEC`},VL=function(){return`  0
SECTION
  2
CLASSES
  0
CLASS
  1
ACDBDICTIONARYWDFLT
  2
AcDbDictionaryWithDefault
  3
ObjectDBX Classes
 90
0
 91
1
280
0
281
0
  0
CLASS
  1
DICTIONARYVAR
  2
AcDbDictionaryVar
  3
ObjectDBX Classes
 90
0
 91
15
280
0
281
0
  0
CLASS
  1
TABLESTYLE
  2
AcDbTableStyle
  3
ObjectDBX Classes
 90
4095
 91
1
280
0
281
0
  0
CLASS
  1
MATERIAL
  2
AcDbMaterial
  3
ObjectDBX Classes
 90
1153
 91
3
280
0
281
0
  0
CLASS
  1
VISUALSTYLE
  2
AcDbVisualStyle
  3
ObjectDBX Classes
 90
4095
 91
26
280
0
281
0
  0
CLASS
  1
SCALE
  2
AcDbScale
  3
ObjectDBX Classes
 90
1153
 91
17
280
0
281
0
  0
CLASS
  1
MLEADERSTYLE
  2
AcDbMLeaderStyle
  3
ACDB_MLEADERSTYLE_CLASS
 90
4095
 91
3
280
0
281
0
  0
CLASS
  1
CELLSTYLEMAP
  2
AcDbCellStyleMap
  3
ObjectDBX Classes
 90
1152
 91
2
280
0
281
0
  0
CLASS
  1
EXACXREFPANELOBJECT
  2
ExAcXREFPanelObject
  3
EXAC_ESW
 90
1025
 91
0
280
0
281
0
  0
CLASS
  1
NPOCOLLECTION
  2
AcDbImpNonPersistentObjectsCollection
  3
ObjectDBX Classes
 90
1153
 91
0
280
0
281
0
  0
CLASS
  1
LAYER_INDEX
  2
AcDbLayerIndex
  3
ObjectDBX Classes
 90
0
 91
0
280
0
281
0
  0
CLASS
  1
SPATIAL_INDEX
  2
AcDbSpatialIndex
  3
ObjectDBX Classes
 90
0
 91
0
280
0
281
0
  0
CLASS
  1
IDBUFFER
  2
AcDbIdBuffer
  3
ObjectDBX Classes
 90
0
 91
0
280
0
281
0
  0
CLASS
  1
DIMASSOC
  2
AcDbDimAssoc
  3
"AcDbDimAssoc|Product Desc:     AcDim ARX App For Dimension|Company:          Autodesk, Inc.|WEB Address:      www.autodesk.com"
 90
0
 91
0
280
0
281
0
  0
CLASS
  1
ACDBSECTIONVIEWSTYLE
  2
AcDbSectionViewStyle
  3
ObjectDBX Classes
 90
1025
 91
1
280
0
281
0
  0
CLASS
  1
ACDBDETAILVIEWSTYLE
  2
AcDbDetailViewStyle
  3
ObjectDBX Classes
 90
1025
 91
1
280
0
281
0
  0
CLASS
  1
IMAGEDEF
  2
AcDbRasterImageDef
  3
ISM
 90
0
 91
1
280
0
281
0
  0
CLASS
  1
RASTERVARIABLES
  2
AcDbRasterVariables
  3
ISM
 90
0
 91
1
280
0
281
0
  0
CLASS
  1
IMAGEDEF_REACTOR
  2
AcDbRasterImageDefReactor
  3
ISM
 90
1
 91
1
280
0
281
0
  0
CLASS
  1
IMAGE
  2
AcDbRasterImage
  3
ISM
 90
2175
 91
1
280
0
281
1
  0
CLASS
  1
PDFDEFINITION
  2
AcDbPdfDefinition
  3
ObjectDBX Classes
 90
1153
 91
1
280
0
281
0
  0
CLASS
  1
PDFUNDERLAY
  2
AcDbPdfReference
  3
ObjectDBX Classes
 90
4095
 91
1
280
0
281
1
  0
CLASS
  1
DWFDEFINITION
  2
AcDbDwfDefinition
  3
ObjectDBX Classes
 90
1153
 91
2
280
0
281
0
  0
CLASS
  1
DWFUNDERLAY
  2
AcDbDwfReference
  3
ObjectDBX Classes
 90
1153
 91
1
280
0
281
1
  0
CLASS
  1
DGNDEFINITION
  2
AcDbDgnDefinition
  3
ObjectDBX Classes
 90
1153
 91
2
280
0
281
0
  0
CLASS
  1
DGNUNDERLAY
  2
AcDbDgnReference
  3
ObjectDBX Classes
 90
1153
 91
1
280
0
281
1
  0
ENDSEC`},GL=function(){return`  0
SECTION
  2
TABLES
  0
TABLE
  2
VPORT
  5
8
330
0
100
AcDbSymbolTable
 70
0
  0
ENDTAB
  0
TABLE
  2
LTYPE
  5
5F
330
0
100
AcDbSymbolTable
 70
7
  0
LTYPE
  5
14
330
5F
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
ByBlock
 70
0
  3

 72
65
 73
0
 40
0.0
  0
LTYPE
  5
15
330
5F
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
ByLayer
 70
0
  3

 72
65
 73
0
 40
0.0
  0
LTYPE
  5
16
330
5F
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
Continuous
 70
0
  3
Solid line
 72
65
 73
0
 40
0.0
  0
LTYPE
  5
1B1
330
5F
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
CENTER
 70
0
  3
Center ____ _ ____ _ ____ _ ____ _ ____ _ ____
 72
65
 73
4
 40
2.0
 49
1.25
 74
0
 49
-0.25
 74
0
 49
0.25
 74
0
 49
-0.25
 74
0
  0
LTYPE
  5
1B2
330
5F
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
DASHED
 70
0
  3
Dashed __ __ __ __ __ __ __ __ __ __ __ __ __ _
 72
65
 73
2
 40
0.75
 49
0.5
 74
0
 49
-0.25
 74
0
  0
LTYPE
  5
1B3
330
5F
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
PHANTOM
 70
0
  3
Phantom ______  __  __  ______  __  __  ______
 72
65
 73
6
 40
2.5
 49
1.25
 74
0
 49
-0.25
 74
0
 49
0.25
 74
0
 49
-0.25
 74
0
 49
0.25
 74
0
 49
-0.25
 74
0
  0
LTYPE
  5
39E
330
5F
100
AcDbSymbolTableRecord
100
AcDbLinetypeTableRecord
  2
HIDDEN
 70
0
  3
Hidden __ __ __ __ __ __ __ __ __ __ __ __ __ __
 72
65
 73
2
 40
9.525
 49
6.35
 74
0
 49
-3.175
 74
0
  0
ENDTAB
  0
TABLE
  2
LAYER
  5
2
330
0
100
AcDbSymbolTable
 70
3
  0
LAYER
  5
10
330
2
100
AcDbSymbolTableRecord
100
AcDbLayerTableRecord
  2
0
 70
0
  6
Continuous
370
-3
390
F
347
98
348
0
  0
LAYER
  5
1B4
330
2
100
AcDbSymbolTableRecord
100
AcDbLayerTableRecord
  2
View Port
 70
0
  6
Continuous
290
0
370
-3
390
F
347
98
348
0
  0
LAYER
  5
21D
330
2
100
AcDbSymbolTableRecord
100
AcDbLayerTableRecord
  2
Defpoints
 70
0
  6
Continuous
290
0
370
-3
390
F
347
98
348
0
  0
ENDTAB
  0
TABLE
  2
STYLE
  5
3
330
0
100
AcDbSymbolTable
 70
3
  0
STYLE
  5
11
330
3
100
AcDbSymbolTableRecord
100
AcDbTextStyleTableRecord
  2
Standard
 70
0
 40
0.0
 41
1.0
 50
0.0
 71
0
 42
0.2
  3
arial.ttf
  4

  0
STYLE
  5
DC
330
3
100
AcDbSymbolTableRecord
100
AcDbTextStyleTableRecord
  2
Annotative
 70
0
 40
0.0
 41
1.0
 50
0.0
 71
0
 42
0.2
  3
arial.ttf
  4

  0
STYLE
  5
178
330
3
100
AcDbSymbolTableRecord
100
AcDbTextStyleTableRecord
  2
Notes
 70
0
 40
3.0
 41
1.0
 50
0.0
 71
0
 42
0.2
  3
arial.ttf
  4

  0
ENDTAB
  0
TABLE
  2
VIEW
  5
6
330
0
100
AcDbSymbolTable
 70
0
  0
ENDTAB
  0
TABLE
  2
UCS
  5
7
330
0
100
AcDbSymbolTable
 70
0
  0
ENDTAB
  0
TABLE
  2
APPID
  5
9
330
0
100
AcDbSymbolTable
 70
12
  0
APPID
  5
12
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
ACAD
 70
0
  0
APPID
  5
DD
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
AcadAnnoPO
 70
0
  0
APPID
  5
DE
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
AcadAnnotative
 70
0
  0
APPID
  5
DF
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
ACAD_DSTYLE_DIMJAG
 70
0
  0
APPID
  5
E0
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
ACAD_DSTYLE_DIMTALN
 70
0
  0
APPID
  5
107
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
ACAD_MLEADERVER
 70
0
  0
APPID
  5
1B5
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
AcAecLayerStandard
 70
0
  0
APPID
  5
1BA
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
ACAD_EXEMPT_FROM_CAD_STANDARDS
 70
0
  0
APPID
  5
237
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
ACAD_DSTYLE_DIMBREAK
 70
0
  0
APPID
  5
28E
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
ACAD_PSEXT
 70
0
  0
APPID
  5
4B0
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
ACAD_NAV_VCDISPLAY
 70
0
  0
APPID
  5
4E3
330
9
100
AcDbSymbolTableRecord
100
AcDbRegAppTableRecord
  2
HATCHBACKGROUNDCOLOR
 70
0
  0
ENDTAB
  0
TABLE
  2
DIMSTYLE
  5
A
330
0
100
AcDbSymbolTable
 70
3
100
AcDbDimStyleTable
 71
3
340
242
340
27
340
E1
  0
DIMSTYLE
105
27
330
A
100
AcDbSymbolTableRecord
100
AcDbDimStyleTableRecord
  2
Standard
 70
0
 41
3.0
 42
2.0
 43
9.0
 44
5.0
140
3.0
141
2.0
147
2.0
340
11
1001
ACAD_DSTYLE_DIMJAG
1070
388
1040
38.0
1001
ACAD_DSTYLE_DIMBREAK
1070
391
1040
90.0
1001
ACAD_DSTYLE_DIMTALN
1070
392
1070
0
  0
DIMSTYLE
105
E1
330
A
100
AcDbSymbolTableRecord
100
AcDbDimStyleTableRecord
  2
Annotative
 70
0
 40
0.0
 41
3.0
 42
2.5
 43
10.0
 44
5.0
140
3.0
141
2.0
147
2.0
340
11
1001
AcadAnnotative
1000
AnnotativeData
1002
{
1070
1
1070
1
1002
}
1001
ACAD_DSTYLE_DIMJAG
1070
388
1040
38.0
1001
ACAD_DSTYLE_DIMBREAK
1070
391
1040
90.0
1001
ACAD_DSTYLE_DIMTALN
1070
392
1070
0
  0
DIMSTYLE
105
242
330
A
100
AcDbSymbolTableRecord
100
AcDbDimStyleTableRecord
  2
Civil-Metric
 70
0
 41
3.0
 42
1.5
 43
6.0
 44
3.0
 73
0
 74
0
 77
1
 78
3
 79
2
140
3.0
141
3.0
147
2.0
179
2
271
2
272
2
276
1
340
11
1001
ACAD_DSTYLE_DIMBREAK
1070
391
1040
3.0
1001
ACAD_DSTYLE_DIMJAG
1070
388
1040
38.0
1001
ACAD_DSTYLE_DIMTALN
1070
392
1070
0
  0
ENDTAB
  0
TABLE
  2
BLOCK_RECORD
  5
1
330
0
100
AcDbSymbolTable
 70
4
  0
BLOCK_RECORD
  5
1F
330
1
100
AcDbSymbolTableRecord
100
AcDbBlockTableRecord
  2
*Model_Space
340
530
 70
0
280
1
281
0
  0
BLOCK_RECORD
  5
58
330
1
100
AcDbSymbolTableRecord
100
AcDbBlockTableRecord
  2
*Paper_Space
340
531
 70
0
280
1
281
0
  0
BLOCK_RECORD
  5
238
330
1
100
AcDbSymbolTableRecord
100
AcDbBlockTableRecord
  2
_ArchTick
340
0
 70
0
280
1
281
0
  0
BLOCK_RECORD
  5
23C
330
1
100
AcDbSymbolTableRecord
100
AcDbBlockTableRecord
  2
_Open30
340
0
 70
0
280
1
281
0
  0
ENDTAB
  0
ENDSEC`},XL=function(){return`  0
SECTION
  2
BLOCKS
  0
BLOCK
  5
23A
330
238
100
AcDbEntity
  8
0
100
AcDbBlockBegin
  2
_ArchTick
 70
0
 10
0.0
 20
0.0
 30
0.0
  3
_ArchTick
  1

  0
ENDBLK
  5
23B
330
238
100
AcDbEntity
  8
0
100
AcDbBlockEnd
  0
BLOCK
  5
20
330
1F
100
AcDbEntity
  8
0
100
AcDbBlockBegin
  2
*Model_Space
 70
0
 10
0.0
 20
0.0
 30
0.0
  3
*Model_Space
  1

  0
ENDBLK
  5
21
330
1F
100
AcDbEntity
  8
0
100
AcDbBlockEnd
  0
BLOCK
  5
5A
330
58
100
AcDbEntity
 67
1
  8
0
100
AcDbBlockBegin
  2
*Paper_Space
 70
0
 10
0.0
 20
0.0
 30
0.0
  3
*Paper_Space
  1

  0
ENDBLK
  5
5B
330
58
100
AcDbEntity
 67
1
  8
0
100
AcDbBlockEnd
  0
BLOCK
  5
240
330
23C
100
AcDbEntity
  8
0
100
AcDbBlockBegin
  2
_Open30
 70
0
 10
0.0
 20
0.0
 30
0.0
  3
_Open30
  1

  0
ENDBLK
  5
241
330
23C
100
AcDbEntity
  8
0
100
AcDbBlockEnd
  0
ENDSEC`},YL=function(){return`  0
SECTION
  2
OBJECTS
  0
DICTIONARY
  5
C
330
0
100
AcDbDictionary
281
1
  3
ACAD_COLOR
350
524
  3
ACAD_GROUP
350
525
  3
ACAD_LAYOUT
350
526
  3
ACAD_MATERIAL
350
527
  3
ACAD_MLEADERSTYLE
350
528
  3
ACAD_MLINESTYLE
350
529
  3
ACAD_PLOTSETTINGS
350
52A
  3
ACAD_PLOTSTYLENAME
350
52C
  3
ACAD_SCALELIST
350
52D
  3
ACAD_TABLESTYLE
350
52E
  3
ACAD_VISUALSTYLE
350
52F
  0
DICTIONARY
  5
524
330
C
100
AcDbDictionary
281
1
  0
DICTIONARY
  5
525
330
C
100
AcDbDictionary
281
1
  0
DICTIONARY
  5
526
330
C
100
AcDbDictionary
281
1
  3
Model
350
530
  3
Layout1
350
531
  0
DICTIONARY
  5
527
330
C
100
AcDbDictionary
281
1
  0
DICTIONARY
  5
528
330
C
100
AcDbDictionary
281
1
  0
DICTIONARY
  5
529
330
C
100
AcDbDictionary
281
1
  0
DICTIONARY
  5
52A
330
C
100
AcDbDictionary
281
1
  0
ACDBPLACEHOLDER
  5
52B
330
52C
  0
ACDBDICTIONARYWDFLT
  5
52C
330
C
100
AcDbDictionary
281
1
  3
Normal
350
52B
100
AcDbDictionaryWithDefault
340
52B
  0
DICTIONARY
  5
52D
330
C
100
AcDbDictionary
281
1
  0
DICTIONARY
  5
52E
330
C
100
AcDbDictionary
281
1
  0
DICTIONARY
  5
52F
330
C
100
AcDbDictionary
281
1
  0
LAYOUT
  5
530
330
526
100
AcDbPlotSettings
  1

  2
DWFx ePlot (XPS Compatible).pc3
  4
ANSI_A_(8.50_x_11.00_Inches)
  6

 40
5.8
 41
17.8
 42
5.8
 43
17.8
 44
215.9
 45
279.4
 46
0.0
 47
0.0
 48
0.0
 49
0.0
140
0.0
141
0.0
142
1.0
143
14.53
 70
11952
 72
0
 73
1
 74
0
  7

 75
0
147
0.069
148
114.98
149
300.29
100
AcDbLayout
  1
Model
 70
1
 71
0
 10
0.0
 20
0.0
 11
12.0
 21
9.0
 12
0.0
 22
0.0
 32
0.0
 14
0.0
 24
0.0
 34
0.0
 15
0.0
 25
0.0
 35
0.0
146
0.0
 13
0.0
 23
0.0
 33
0.0
 16
1.0
 26
0.0
 36
0.0
 17
0.0
 27
1.0
 37
0.0
 76
0
330
1F
  0
LAYOUT
  5
531
330
526
100
AcDbPlotSettings
  1

  2
DWFx ePlot (XPS Compatible).pc3
  4
ANSI_A_(8.50_x_11.00_Inches)
  6

 40
5.8
 41
17.8
 42
5.8
 43
17.8
 44
215.9
 45
279.4
 46
0.0
 47
0.0
 48
0.0
 49
0.0
140
0.0
141
0.0
142
1.0
143
1.0
 70
688
 72
0
 73
1
 74
5
  7
acad.ctb
 75
16
147
1.0
148
0.0
149
0.0
100
AcDbLayout
  1
Layout1
 70
1
 71
1
 10
-0.7
 20
-0.23
 11
10.3
 21
8.27
 12
0.0
 22
0.0
 32
0.0
 14
0.63
 24
0.8
 34
0.0
 15
9.0
 25
7.2
 35
0.0
146
0.0
 13
0.0
 23
0.0
 33
0.0
 16
1.0
 26
0.0
 36
0.0
 17
0.0
 27
1.0
 37
0.0
 76
0
330
58
  0
ENDSEC`};bA.exports={dxfHeaders:BL,dxfClasses:VL,dxfTables:GL,dxfBlocks:XL,dxfObjects:YL}});var SA=m((ese,qA)=>{var HL=[[0,0,0,255],[255,0,0,255],[255,255,0,255],[0,255,0,255],[0,255,255,255],[0,0,255,255],[255,0,255,255],[255,255,255,255],[128,128,128,255],[192,192,192,255],[255,0,0,255],[255,127,127,255],[165,0,0,255],[165,82,82,255],[127,0,0,255],[127,63,63,255],[76,0,0,255],[76,38,38,255],[38,0,0,255],[38,19,19,255],[255,63,0,255],[255,159,127,255],[165,41,0,255],[165,103,82,255],[127,31,0,255],[127,79,63,255],[76,19,0,255],[76,47,38,255],[38,9,0,255],[38,28,19,255],[255,127,0,255],[255,191,127,255],[165,82,0,255],[165,124,82,255],[127,63,0,255],[127,95,63,255],[76,38,0,255],[76,57,38,255],[38,19,0,255],[38,28,19,255],[255,191,0,255],[255,223,127,255],[165,124,0,255],[165,145,82,255],[127,95,0,255],[127,111,63,255],[76,57,0,255],[76,66,38,255],[38,28,0,255],[38,33,19,255],[255,255,0,255],[255,255,127,255],[165,165,0,255],[165,165,82,255],[127,127,0,255],[127,127,63,255],[76,76,0,255],[76,76,38,255],[38,38,0,255],[38,38,19,255],[191,255,0,255],[223,255,127,255],[124,165,0,255],[145,165,82,255],[95,127,0,255],[111,127,63,255],[57,76,0,255],[66,76,38,255],[28,38,0,255],[33,38,19,255],[127,255,0,255],[191,255,127,255],[82,165,0,255],[124,165,82,255],[63,127,0,255],[95,127,63,255],[38,76,0,255],[57,76,38,255],[19,38,0,255],[28,38,19,255],[63,255,0,255],[159,255,127,255],[41,165,0,255],[103,165,82,255],[31,127,0,255],[79,127,63,255],[19,76,0,255],[47,76,38,255],[9,38,0,255],[23,38,19,255],[0,255,0,255],[125,255,127,255],[0,165,0,255],[82,165,82,255],[0,127,0,255],[63,127,63,255],[0,76,0,255],[38,76,38,255],[0,38,0,255],[19,38,19,255],[0,255,63,255],[127,255,159,255],[0,165,41,255],[82,165,103,255],[0,127,31,255],[63,127,79,255],[0,76,19,255],[38,76,47,255],[0,38,9,255],[19,88,23,255],[0,255,127,255],[127,255,191,255],[0,165,82,255],[82,165,124,255],[0,127,63,255],[63,127,95,255],[0,76,38,255],[38,76,57,255],[0,38,19,255],[19,88,28,255],[0,255,191,255],[127,255,223,255],[0,165,124,255],[82,165,145,255],[0,127,95,255],[63,127,111,255],[0,76,57,255],[38,76,66,255],[0,38,28,255],[19,88,88,255],[0,255,255,255],[127,255,255,255],[0,165,165,255],[82,165,165,255],[0,127,127,255],[63,127,127,255],[0,76,76,255],[38,76,76,255],[0,38,38,255],[19,88,88,255],[0,191,255,255],[127,223,255,255],[0,124,165,255],[82,145,165,255],[0,95,127,255],[63,111,217,255],[0,57,76,255],[38,66,126,255],[0,28,38,255],[19,88,88,255],[0,127,255,255],[127,191,255,255],[0,82,165,255],[82,124,165,255],[0,63,127,255],[63,95,127,255],[0,38,76,255],[38,57,126,255],[0,19,38,255],[19,28,88,255],[0,63,255,255],[127,159,255,255],[0,41,165,255],[82,103,165,255],[0,31,127,255],[63,79,127,255],[0,19,76,255],[38,47,126,255],[0,9,38,255],[19,23,88,255],[0,0,255,255],[127,127,255,255],[0,0,165,255],[82,82,165,255],[0,0,127,255],[63,63,127,255],[0,0,76,255],[38,38,126,255],[0,0,38,255],[19,19,88,255],[63,0,255,255],[159,127,255,255],[41,0,165,255],[103,82,165,255],[31,0,127,255],[79,63,127,255],[19,0,76,255],[47,38,126,255],[9,0,38,255],[23,19,88,255],[127,0,255,255],[191,127,255,255],[165,0,82,255],[124,82,165,255],[63,0,127,255],[95,63,127,255],[38,0,76,255],[57,38,126,255],[19,0,38,255],[28,19,88,255],[191,0,255,255],[223,127,255,255],[124,0,165,255],[142,82,165,255],[95,0,127,255],[111,63,127,255],[57,0,76,255],[66,38,76,255],[28,0,38,255],[88,19,88,255],[255,0,255,255],[255,127,255,255],[165,0,165,255],[165,82,165,255],[127,0,127,255],[127,63,127,255],[76,0,76,255],[76,38,76,255],[38,0,38,255],[88,19,88,255],[255,0,191,255],[255,127,223,255],[165,0,124,255],[165,82,145,255],[127,0,95,255],[127,63,111,255],[76,0,57,255],[76,38,66,255],[38,0,28,255],[88,19,88,255],[255,0,127,255],[255,127,191,255],[165,0,82,255],[165,82,124,255],[127,0,63,255],[127,63,95,255],[76,0,38,255],[76,38,57,255],[38,0,19,255],[88,19,28,255],[255,0,63,255],[255,127,159,255],[165,0,41,255],[165,82,103,255],[127,0,31,255],[127,63,79,255],[76,0,19,255],[76,38,47,255],[38,0,9,255],[88,19,23,255],[0,0,0,255],[101,101,101,255],[102,102,102,255],[153,153,153,255],[204,204,204,255],[255,255,255,255]];qA.exports=HL});var ul=m((tse,TA)=>{var{geometries:jL,modifiers:ZL}=ue(),{geom3:Vo,geom2:cl,path2:al}=jL,{flatten:UL,toArray:WL}=dt(),{dxfHeaders:JL,dxfClasses:KL,dxfTables:QL,dxfBlocks:ez,dxfObjects:tz}=wA(),rz=SA(),sz="application/dxf",nz=(e,...t)=>{if(e=Object.assign({},{geom2To:"lwpolyline",geom3To:"3dface",pathTo:"lwpolyline",statusCallback:null,colorIndex:rz},e),e.entityId=0,t=UL(t),t=t.filter(n=>Vo.isA(n)||cl.isA(n)||al.isA(n)),t.length===0)throw new Error("only JSCAD geometries can be serialized to DXF");return t=WL(ZL.generalize({snap:!0,triangulate:!0},t)),[`999
Created by JSCAD
${JL(e)}
${KL(e)}
${QL(e)}
${ez(e)}
${oz(t,e)}
${tz(e)}
  0
EOF
`]},oz=(e,t)=>{let r=e.map((n,o)=>{if(cl.isA(n)){let i=n.color,c=n.name,l=cl.toOutlines(n).map(u=>({closed:!0,points:u,color:i,name:c}));return t.geom2To==="polyline"?iz(l,t):DA(l,t)}if(Vo.isA(n))return t.geom3To==="polyline"?uz(n,t):cz(n,t);if(al.isA(n)){let i=n.color,c=n.name,a={closed:n.isClosed,points:al.toPoints(n),color:i,name:c};return DA([a],t)}return""}),s=`  0
SECTION
  2
ENTITIES
`;return r.forEach(n=>{n&&(s+=n)}),s+=`  0
ENDSEC`,s},DA=(e,t)=>{t.statusCallback&&t.statusCallback({progress:0});let r="";return e.forEach((s,n)=>{if(s.points.length<1)return;let o=s.points.length+(s.closed?1:0);r+=`  0
LWPOLYLINE
  5
${ar(t)}
  100
AcDbEntity
  3
${ll(s,t)}
  8
0
  67
0
  62
${xn(s,t)}
  100
AcDbPolyline
  90
${o}
  70
${s.closed?1:0}
`;for(let i=0;i<o;i++){let c=i;c>=s.points.length&&(c-=s.points.length);let a=s.points[c];r+=`  10
${a[0]}
  20
${a[1]}
`}t.statusCallback&&t.statusCallback({progress:100*n/e.length})}),t.statusCallback&&t.statusCallback({progress:100}),[r]},iz=(e,t)=>{t.statusCallback&&t.statusCallback({progress:0});let r="";return e.forEach((s,n)=>{let o=s.points.length+(s.closed?1:0);r+=`  0
POLYLINE
  5
${ar(t)}
  100
AcDbEntity
  3
${ll(s,t)}
  8
0
  62
${xn(s,t)}
  100
AcDb2dPolyline
`;for(let i=0;i<o;i++){let c=i;c>=s.points.length&&(c-=s.points.length);let a=s.points[c];r+=`  0
VERTEX
  5
${ar(t)}
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb2dVertex
 10
${a[0]}
 20
${a[1]}
`}r+=`  0
SEQEND
  5
${ar(t)}
  100
AcDbEntity
`,t.statusCallback&&t.statusCallback({progress:100*n/e.length})}),t.statusCallback&&t.statusCallback({progress:100}),[r]},cz=(e,t)=>{t.statusCallback&&t.statusCallback({progress:0});let r="",s=Vo.toPolygons(e),n=xn(e,t);return s.forEach((o,i)=>{let c=o.color?xn(o,t):n;az(o).forEach((l,u)=>{r+=lz(l,t,c)})}),t.statusCallback&&t.statusCallback({progress:100}),[r]},az=e=>{let t=e.vertices.length-2;if(t<1)return[];let r=e.vertices[0],s=[];for(let n=0;n<t;n++)s.push([r,e.vertices[n+1],e.vertices[n+2]]);return s},lz=(e,t,r)=>{let s=e[0],n=e[1],o=e[2],i=e[2];return`  0
3DFACE
  5
${ar(t)}
  100
AcDbEntity
  8
0
  62
${r}
  100
AcDbFace
  70
0
  10
${s[0]}
  20
${s[1]}
  30
${s[2]}
  11
${n[0]}
  21
${n[1]}
  31
${n[2]}
  12
${o[0]}
  22
${o[1]}
  32
${o[2]}
  13
${i[0]}
  23
${i[1]}
  33
${i[2]}
`},uz=(e,t)=>{let r="",s=fz(Vo.toPolygons(e));return s.faces.length>0&&(r+=`  0
POLYLINE
  5
${ar(t)}
  100
AcDbEntity
  3
${ll(e,t)}
  8
0
  62
${xn(e,t)}
  100
AcDb3dPolyline
  70
64
  71
${s.vertices.length}
  72
${s.faces.length}
`,s.vertices.forEach(n=>{r+=`  0
VERTEX
  5
${ar(t)}
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
${n[0]}
  20
${n[1]}
  30
${n[2]}
  70
192
`}),s.faces.forEach(n=>{r+=`  0
VERTEX
  5
${ar(t)}
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
${n[0]}
  72
${n[1]}
  73
${n[2]}
  74
${n[3]}
`})),[r]},fz=e=>{let t=[],r=[];for(let s=0;s<e.length;++s){let n=e[s],o=[];for(let i=0;i<n.vertices.length;++i){let c=n.vertices[i];r.push([c[0],c[1],c[2]]),o.push(r.length)}for(;o.length<4;)o.push(0);t.push(o)}return{faces:t,vertices:r}},ar=e=>{e.entityId++;let t="00000"+e.entityId.toString(16).toUpperCase();return"CAD"+t.substr(t.length-5)},ll=(e,t)=>{if(e.name)return e.name;let r="00000"+t.entityId.toString(16).toUpperCase();return"CAD"+r.substr(r.length-5)},xn=(e,t)=>{let r=256;if(e.color){let s=Math.floor(e.color[0]*255),n=Math.floor(e.color[1]*255),o=Math.floor(e.color[2]*255),i=t.colorIndex,c=255+255+255;for(let a=1;a<i.length;a++){let l=i[a],u=Math.abs(s-l[0])+Math.abs(n-l[1])+Math.abs(o-l[2]);if(u<c){if(r=a,u===0)break;c=u}}}return r};TA.exports={serialize:nz,mimeType:sz}});var fl=m((rse,CA)=>{var{utils:hz}=ue(),pz=(e,t)=>{switch(e){case"transforms":case"plane":return Array.from(t);case"points":case"vertices":return t.map(r=>Array.from(r));case"sides":return t.map(r=>[Array.from(r[0]),Array.from(r[1])]);default:break}return t},dz=(e,...t)=>{e=Object.assign({},{statusCallback:null},e),t=hz.flatten(t),e.statusCallback&&e.statusCallback({progress:0});let s=JSON.stringify(t,pz);return e.statusCallback&&e.statusCallback({progress:100}),[s]},gz="application/json";CA.exports={serialize:dz,mimeType:gz}});var hl=m((sse,FA)=>{var{colors:$A,geometries:RA,modifiers:mz}=ue(),{flatten:xz,toArray:vz}=dt(),Ez="application/object",yz=(e,...t)=>{e=Object.assign({},{statusCallback:null,triangulate:!0},e),t=xz(t);let s=t.filter(c=>RA.geom3.isA(c));if(s.length===0)throw new Error("only 3D geometries can be serialized to OBJ");t.length!==s.length&&console.warn("some objects could not be serialized to OBJ"),s=vz(mz.generalize({snap:!0,triangulate:e.triangulate},s)),e.statusCallback&&e.statusCallback({progress:0});let n=`# Wavefront OBJ file generated by JSCAD
`,o=[],i="default";return s.forEach((c,a)=>{e.statusCallback&&e.statusCallback({progress:100*a/s.length}),n+=`
`;let l=MA(c),u=RA.geom3.toPolygons(c).filter(h=>h.vertices.length>=3);u.forEach(h=>{h.vertices.forEach(f=>{let d=IA(f);o.indexOf(d)<0&&(o.push(d),n+=`${d}
`)})}),n+=`
`,u.forEach(h=>{let f=h.vertices.map(g=>o.indexOf(IA(g))+1),d=MA(h)||l||"default";d!==i&&(n+=`usemtl ${d}
`,i=d),n+=`f ${f.join(" ")}
`})}),e.statusCallback&&e.statusCallback({progress:100}),[n]},IA=e=>`v ${e[0]} ${e[1]} ${e[2]}`,MA=e=>{let t;if(e.color){let r=e.color[0],s=e.color[1],n=e.color[2],o=255+255+255;for(let i in $A.cssColors){let c=$A.cssColors[i],a=Math.abs(r-c[0])+Math.abs(s-c[1])+Math.abs(n-c[2]);if(a<o){if(t=i,a===0)break;o=a}}}return t};FA.exports={serialize:yz,mimeType:Ez}});var PA=m((nse,NA)=>{var{geometries:pl}=ue(),Az=(e,t)=>{t.statusCallback&&t.statusCallback({progress:0});let r=new ArrayBuffer(4),s=new Int32Array(r,0,1),n=new Int8Array(r,0,4);if(s[0]=287454020,n[0]!==68)throw new Error("Binary STL output is currently only supported on little-endian (Intel) processors");let o=0,i=0;e.forEach((x,v)=>{pl.geom3.toPolygons(x).forEach(b=>{let E=b.vertices.length,q=E>=3?E-2:0;o+=q,i+=1})});let c=new Uint8Array(80);for(let x=0;x<80;x++)c[x]=65;let a=new Uint32Array(1);a[0]=o;let l=new ArrayBuffer(50*o),u=new Int8Array(l),h=new ArrayBuffer(50),f=new Int8Array(h),d=new Float32Array(h,0,12),g=new Uint16Array(h,48,1),p=0;return e.forEach(x=>{pl.geom3.toPolygons(x).forEach((y,b)=>{let E=y.vertices,q=E.length,w=pl.poly3.plane(y);for(let D=0;D<q-2;D++){d[0]=w[0],d[1]=w[1],d[2]=w[2];let T=3;for(let A=0;A<3;A++){let S=A+(A>0?D:0),$=E[S];d[T++]=$[0],d[T++]=$[1],d[T++]=$[2]}g[0]=0,u.set(f,p),p+=50}t.statusCallback&&t.statusCallback({progress:100*b/i})})}),t.statusCallback&&t.statusCallback({progress:100}),[c.buffer,a.buffer,l]};NA.exports={serializeBinary:Az}});var zA=m((ose,LA)=>{var{geometries:kA}=ue(),bz=(e,t)=>{t.statusCallback&&t.statusCallback({progress:0});let r=`solid JSCAD
${wz(e,t)}
endsolid JSCAD
`;return t.statusCallback&&t.statusCallback({progress:100}),[r]},wz=(e,t)=>{let r=[];return e.forEach((s,n)=>{r.push(qz(s,t)),t.statusCallback&&t.statusCallback({progress:100*n/e.length})}),r.join(`
`)},qz=(e,t)=>{let r=[];return kA.geom3.toPolygons(e).forEach((n,o)=>{r.push(Sz(n))}),r.join(`
`)},OA=e=>`${e[0]} ${e[1]} ${e[2]}`,dl=e=>`vertex ${OA(e)}`,Sz=e=>{let t=[];if(e.vertices.length>=3){let r=dl(e.vertices[0]);for(let s=0;s<e.vertices.length-2;s++){let n=`facet normal ${OA(kA.poly3.plane(e))}
outer loop
${r}
${dl(e.vertices[s+1])}
${dl(e.vertices[s+2])}
endloop
endfacet`;t.push(n)}}return t.join(`
`)};LA.exports={serializeText:bz}});var gl=m((ise,_A)=>{var{geometries:Dz,modifiers:Tz}=ue(),{flatten:Cz,toArray:$z}=dt(),{serializeBinary:Rz}=PA(),{serializeText:Iz}=zA(),Mz="application/sla",Fz=(e,...t)=>{e=Object.assign({},{binary:!0,statusCallback:null},e),t=Cz(t);let s=t.filter(n=>Dz.geom3.isA(n));if(s.length===0)throw new Error("only 3D geometries can be serialized to STL");return t.length!==s.length&&console.warn("some objects could not be serialized to STL"),s=$z(Tz.generalize({snap:!0,triangulate:!0},s)),e.binary?Rz(s,e):Iz(s,e)};_A.exports={mimeType:Mz,serialize:Fz}});var VA=m((cse,BA)=>{"use strict";var Nz=e=>e&&Object.prototype.toString.call(e)==="[object Object]";function Pz(e){if(!(e>0))return r=>r;var t=" ".repeat(e);return r=>{if(typeof r!="string")return r;let s=r.split(`
`);return s.length===1?t+r:s.map(n=>n.trim()===""?n:t+n).join(`
`)}}var kz=e=>e.split(`
`).filter(t=>t.trim()!=="").join(`
`);function Oz(e,t){let r=t>0?`
`:"",s=Pz(t);function n(o){let i="",c=!0,a;return o.some((u,h,f)=>{if(h===0)return a="<"+u,f.length===1;if(h===1){if(Nz(u)){if(Object.keys(u).map(d=>{let g=u[d];Array.isArray(g)&&(g=g.join(" ")),a+=" "+d+'="'+g+'"'}),f.length===2)return!0;a+=">";return}a+=">"}switch(typeof u){case"string":case"number":case"boolean":case"undefined":i+=u+r;return}c=!1,i+=n(u)})?a+"/>"+r:c?a+kz(i)+"</"+o[0]+">"+r:a+r+s(i)+"</"+o[0]+">"+r}return n(e)}BA.exports=Oz});var GA=m((ase,Lz)=>{Lz.exports={name:"@jscad/svg-serializer",version:"2.3.11",description:"SVG Serializer for JSCAD",homepage:"https://openjscad.xyz/",repository:"https://github.com/jscad/OpenJSCAD.org",main:"index.js",scripts:{coverage:"nyc --all --reporter=html --reporter=text npm test",test:"ava --verbose --timeout 2m './tests/*.test.js'"},contributors:[{name:"Rene K. Mueller",url:"http://renekmueller.com"},{name:"z3dev",url:"http://www.z3d.jp"},{name:"Mark 'kaosat-dev' Moissette",url:"http://kaosat.net"}],keywords:["openjscad","jscad","export","serializer","svg"],license:"MIT",dependencies:{"@jscad/modeling":"2.11.0",onml:"1.3.0"},devDependencies:{ava:"3.15.0",nyc:"15.1.0"},gitHead:"5899622c5ffc640001da7261d7c06a1223064ccc"}});var ml=m((lse,jA)=>{var{geometries:cs,maths:XA,measurements:zz,utils:_z}=ue(),Bz=VA(),Vz=GA().version,Gz="image/svg+xml",Xz=(e,...t)=>{e=Object.assign({},{unit:"mm",decimals:1e4,version:Vz,statusCallback:null},e),t=_z.flatten(t);let s=t.filter(l=>cs.geom2.isA(l)||cs.path2.isA(l));if(s.length===0)throw new Error("only 2D geometries can be serialized to SVG");t.length!==s.length&&console.warn("some objects could not be serialized to SVG"),e.statusCallback&&e.statusCallback({progress:0});let n=Yz(s),o=0,i=0;n&&(o=Math.round((n[1][0]-n[0][0])*e.decimals)/e.decimals,i=Math.round((n[1][1]-n[0][1])*e.decimals)/e.decimals);let c=["svg",{width:o+e.unit,height:i+e.unit,viewBox:"0 0 "+o+" "+i,fill:"none","fill-rule":"evenodd","stroke-width":"0.1px",version:"1.1",baseProfile:"tiny",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}];n&&(c=c.concat(Hz(s,n,e)));let a=`<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by JSCAD SVG Serializer -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
${Bz(c,2)}`;return e.statusCallback&&e.statusCallback({progress:100}),[a]},Yz=e=>{let t=zz.measureBoundingBox(e);return e.length===1?t:t.reduce((s,n)=>(XA.vec3.min(s[0],s[0],n[0]),XA.vec3.max(s[1],s[1],n[1]),s),[[0,0,0],[0,0,0]])},Hz=(e,t,r)=>{let s=0-t[0][0],n=0-t[1][1],o=[];return e.forEach((i,c)=>{r.statusCallback&&r.statusCallback({progress:100*c/e.length}),cs.geom2.isA(i)&&o.push(Zz(i,[s,n],r)),cs.path2.isA(i)&&o.push(Wz([i],[s,n],r))}),o},jz=(e,t,r,s)=>{let n=e-r,o=t-s;return e===r&&t===r?[e,t]:e===r?[e,s-o]:t===s?[r- -n,t]:[r- -n,s-o]},Zz=(e,t,r)=>{let n=cs.geom2.toOutlines(e).map(o=>cs.path2.fromPoints({closed:!0},o));return r.color="black",e.color&&(r.color=HA(e.color)),r.id=null,e.id&&(r.id=e.id),r.class=null,e.class&&(r.class=e.class),Uz(n,t,r)},Uz=(e,t,r)=>{let s="";e.forEach(o=>s+=YA(o,t,r));let n={fill:r.color,d:s};return r.id&&(n.id=r.id),r.class&&(n.class=r.class),["g",["path",n]]},Wz=(e,t,r)=>e.reduce((s,n,o)=>{let i={d:YA(n,t,r)};return n.color&&(i.stroke=HA(n.color)),n.id&&(i.id=n.id),n.class&&(i.class=n.class),s.concat([["path",i]])},["g"]),YA=(e,t,r)=>{let s="",n=e.points.length+(e.isClosed?1:0);for(let o=0;o<n;o++){let i=o;i>=e.points.length&&(i-=e.points.length);let c=e.points[i],a=[c[0]+t[0],c[1]+t[1]],l=jz(a[0],a[1],0,0),u=Math.round(l[0]*r.decimals)/r.decimals,h=Math.round(l[1]*r.decimals)/r.decimals;o>0?s+=`L${u} ${h}`:s+=`M${u} ${h}`}return s},HA=e=>`rgb(${e[0]*255},${e[1]*255},${e[2]*255},${e[3]*255})`;jA.exports={serialize:Xz,mimeType:Gz}});var UA=m((use,ZA)=>{"use strict";var Jz=e=>e&&Object.prototype.toString.call(e)==="[object Object]";function Kz(e){if(!(e>0))return r=>r;var t=" ".repeat(e);return r=>{if(typeof r!="string")return r;let s=r.split(`
`);return s.length===1?t+r:s.map(n=>n.trim()===""?n:t+n).join(`
`)}}var Qz=e=>e.split(`
`).filter(t=>t.trim()!=="").join(`
`);function e_(e,t){let r=t>0?`
`:"",s=Kz(t);function n(o){let i="",c=!0,a;return o.some((u,h,f)=>{if(h===0)return a="<"+u,f.length===1;if(h===1){if(Jz(u)){if(Object.keys(u).map(d=>{let g=u[d];Array.isArray(g)&&(g=g.join(" ")),a+=" "+d+'="'+g+'"'}),f.length===2)return!0;a+=">";return}a+=">"}switch(typeof u){case"string":case"number":case"boolean":case"undefined":i+=u+r;return}c=!1,i+=n(u)})?a+"/>"+r:c?a+Qz(i)+"</"+o[0]+">"+r:a+r+s(i)+"</"+o[0]+">"+r}return n(e)}ZA.exports=e_});var yl=m((hse,KA)=>{var{geometries:t_,modifiers:r_}=ue(),{geom2:xl,geom3:Go,path2:vl,poly2:WA,poly3:s_}=t_,{flatten:n_,toArray:fse}=dt(),o_=UA(),i_="model/x3d+xml",c_=(e,...t)=>{if(e=Object.assign({},{color:[0,0,1,1],decimals:1e3,metadata:!0,unit:"millimeter",statusCallback:null},e),t=n_(t),t=t.filter(o=>Go.isA(o)||xl.isA(o)||vl.isA(o)),t.length===0)throw new Error("expected one or more geom3/geom2/path2 objects");e.statusCallback&&e.statusCallback({progress:0});let s=["X3D",{profile:"Interchange",version:"4.0","xmlns:xsd":"http://www.w3.org/2001/XMLSchema-instance","xsd:noNamespaceSchemaLocation":"http://www.web3d.org/specifications/x3d-4.0.xsd"}];e.metadata?s.push(["head",{},["meta",{name:"creator",content:"Created by JSCAD"}],["meta",{name:"reference",content:"https://www.openjscad.xyz"}],["meta",{name:"created",content:new Date().toISOString()}]]):s.push(["head",{},["meta",{name:"creator",content:"Created by JSCAD"}]]),s=s.concat(a_(t,e));let n=`<?xml version="1.0" encoding="UTF-8"?>
${o_(s,2)}`;return e&&e.statusCallback&&e.statusCallback({progress:100}),[n]},a_=(e,t)=>{let r=["Scene",{}],s=[];return e.forEach((n,o)=>{t.statusCallback&&t.statusCallback({progress:100*o/e.length}),Go.isA(n)&&(n=r_.generalize({snap:!0,triangulate:!0},n),Go.toPolygons(n).length>0&&s.push(f_(n,t))),xl.isA(n)&&s.push(u_(n,t)),vl.isA(n)&&s.push(l_(n,t))}),r=r.concat(s),[r]},l_=(e,t)=>{let r=vl.toPoints(e).slice();return r.length>1&&e.isClosed&&r.push(r[0]),shape=["Shape",{},JA(WA.create(r),t)],e.color&&shape.push(El(e,t)),shape},u_=(e,t)=>{let r=xl.toOutlines(e),s=["Group",{}];return r.forEach(n=>{n.length>1&&n.push(n[0]);let o=["Shape",{},JA(WA.create(n),t)];e.color&&o.push(El(e,t)),s.push(o)}),s},JA=(e,t)=>["Polyline2D",{lineSegments:e.vertices.map(s=>`${s[0]} ${s[1]}`).join(" ")}],El=(e,t)=>{let r=e.color.join(" "),s=e.color.join(" ");return["Appearance",["Material",{diffuseColor:r,emissiveColor:s}]]},f_=(e,t)=>{let r=["Shape",{},h_(e,t)];return e.color&&r.push(El(e,t)),r},h_=(e,t)=>{let r=p_(e,t),s=g_(r,t),n=s[0].join(" "),o=s[1].join(" "),i=s[2].join(" "),c=["IndexedTriangleSet",{ccw:"true",colorPerVertex:"false",solid:"false",index:n},["Coordinate",{point:o}]];return e.color||c.push(["Color",{color:i}]),c},p_=(e,t)=>{let r=[];return Go.toPolygons(e).forEach(n=>{let o=n.vertices[0];for(let i=n.vertices.length-3;i>=0;i--){let c=s_.fromPoints([o,n.vertices[i+1],n.vertices[i+2]]),a=t.color;e.color&&(a=e.color),n.color&&(a=n.color),c.color=a,r.push(c)}}),r},d_=(e,t)=>{let r=t.color;return e.color&&(r=e.color),`${r[0]} ${r[1]} ${r[2]}`},g_=(e,t)=>{let r=[],s=[],n=[],o=new Map;return e.forEach(i=>{let c=[],a=i.vertices.length;for(let l=0;l<a;l++){let u=i.vertices[l],h=`${u[0]},${u[1]},${u[2]}`;if(!o.has(h)){let f=Math.round(u[0]*t.decimals)/t.decimals,d=Math.round(u[1]*t.decimals)/t.decimals,g=Math.round(u[2]*t.decimals)/t.decimals;s.push(`${f} ${d} ${g}`),o.set(h,s.length-1)}c.push(o.get(h))}r.push(c.join(" ")),n.push(d_(i,t))}),o.clear(),[r,s,n]};KA.exports={serialize:c_,mimeType:i_}});var tb=m(eb=>{"use strict";var QA={};eb.default=function(e,t,r,s,n){var o=new Worker(QA[t]||(QA[t]=URL.createObjectURL(new Blob([e+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return o.onmessage=function(i){var c=i.data,a=c.$e$;if(a){var l=new Error(a[0]);l.code=a[1],l.stack=a[2],n(l,null)}else n(null,c)},o.postMessage(r,s),o}});var Bl=m(_=>{"use strict";var m_=tb(),W=Uint8Array,Oe=Uint16Array,hs=Uint32Array,ps=new W([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ds=new W([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),vn=new W([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),nb=function(e,t){for(var r=new Oe(31),s=0;s<31;++s)r[s]=t+=1<<e[s-1];for(var n=new hs(r[30]),s=1;s<30;++s)for(var o=r[s];o<r[s+1];++o)n[o]=o-r[s]<<5|s;return[r,n]},ob=nb(ps,2),Cl=ob[0],Zo=ob[1];Cl[28]=258,Zo[258]=28;var ib=nb(ds,0),cb=ib[0],bl=ib[1],En=new Oe(32768);for(te=0;te<32768;++te)Vt=(te&43690)>>>1|(te&21845)<<1,Vt=(Vt&52428)>>>2|(Vt&13107)<<2,Vt=(Vt&61680)>>>4|(Vt&3855)<<4,En[te]=((Vt&65280)>>>8|(Vt&255)<<8)>>>1;var Vt,te,ot=function(e,t,r){for(var s=e.length,n=0,o=new Oe(t);n<s;++n)e[n]&&++o[e[n]-1];var i=new Oe(t);for(n=0;n<t;++n)i[n]=i[n-1]+o[n-1]<<1;var c;if(r){c=new Oe(1<<t);var a=15-t;for(n=0;n<s;++n)if(e[n])for(var l=n<<4|e[n],u=t-e[n],h=i[e[n]-1]++<<u,f=h|(1<<u)-1;h<=f;++h)c[En[h]>>>a]=l}else for(c=new Oe(s),n=0;n<s;++n)e[n]&&(c[n]=En[i[e[n]-1]++]>>>15-e[n]);return c},Xt=new W(288);for(te=0;te<144;++te)Xt[te]=8;var te;for(te=144;te<256;++te)Xt[te]=9;var te;for(te=256;te<280;++te)Xt[te]=7;var te;for(te=280;te<288;++te)Xt[te]=8;var te,us=new W(32);for(te=0;te<32;++te)us[te]=5;var te,ab=ot(Xt,9,0),lb=ot(Xt,9,1),ub=ot(us,5,0),fb=ot(us,5,1),Yo=function(e){for(var t=e[0],r=1;r<e.length;++r)e[r]>t&&(t=e[r]);return t},nt=function(e,t,r){var s=t/8|0;return(e[s]|e[s+1]<<8)>>(t&7)&r},Ho=function(e,t){var r=t/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(t&7)},An=function(e){return(e+7)/8|0},it=function(e,t,r){(t==null||t<0)&&(t=0),(r==null||r>e.length)&&(r=e.length);var s=new(e.BYTES_PER_ELEMENT==2?Oe:e.BYTES_PER_ELEMENT==4?hs:W)(r-t);return s.set(e.subarray(t,r)),s};_.FlateErrorCode={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14};var hb=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],L=function(e,t,r){var s=new Error(t||hb[e]);if(s.code=e,Error.captureStackTrace&&Error.captureStackTrace(s,L),!r)throw s;return s},bn=function(e,t,r){var s=e.length;if(!s||r&&r.f&&!r.l)return t||new W(0);var n=!t||r,o=!r||r.i;r||(r={}),t||(t=new W(s*3));var i=function(Bn){var Is=t.length;if(Bn>Is){var Pr=new W(Math.max(Is*2,Bn));Pr.set(t),t=Pr}},c=r.f||0,a=r.p||0,l=r.b||0,u=r.l,h=r.d,f=r.m,d=r.n,g=s*8;do{if(!u){c=nt(e,a,1);var p=nt(e,a+1,3);if(a+=3,p)if(p==1)u=lb,h=fb,f=9,d=5;else if(p==2){var b=nt(e,a,31)+257,E=nt(e,a+10,15)+4,q=b+nt(e,a+5,31)+1;a+=14;for(var w=new W(q),D=new W(19),T=0;T<E;++T)D[vn[T]]=nt(e,a+T*3,7);a+=E*3;for(var A=Yo(D),S=(1<<A)-1,$=ot(D,A,1),T=0;T<q;){var C=$[nt(e,a,S)];a+=C&15;var x=C>>>4;if(x<16)w[T++]=x;else{var F=0,R=0;for(x==16?(R=3+nt(e,a,3),a+=2,F=w[T-1]):x==17?(R=3+nt(e,a,7),a+=3):x==18&&(R=11+nt(e,a,127),a+=7);R--;)w[T++]=F}}var P=w.subarray(0,b),I=w.subarray(b);f=Yo(P),d=Yo(I),u=ot(P,f,1),h=ot(I,d,1)}else L(1);else{var x=An(a)+4,v=e[x-4]|e[x-3]<<8,y=x+v;if(y>s){o&&L(0);break}n&&i(l+v),t.set(e.subarray(x,y),l),r.b=l+=v,r.p=a=y*8,r.f=c;continue}if(a>g){o&&L(0);break}}n&&i(l+131072);for(var V=(1<<f)-1,K=(1<<d)-1,fe=a;;fe=a){var F=u[Ho(e,a)&V],Ee=F>>>4;if(a+=F&15,a>g){o&&L(0);break}if(F||L(2),Ee<256)t[l++]=Ee;else if(Ee==256){fe=a,u=null;break}else{var be=Ee-254;if(Ee>264){var T=Ee-257,$e=ps[T];be=nt(e,a,(1<<$e)-1)+Cl[T],a+=$e}var tt=h[Ho(e,a)&K],Te=tt>>>4;tt||L(3),a+=tt&15;var I=cb[Te];if(Te>3){var $e=ds[Te];I+=Ho(e,a)&(1<<$e)-1,a+=$e}if(a>g){o&&L(0);break}n&&i(l+131072);for(var Pe=l+be;l<Pe;l+=4)t[l]=t[l-I],t[l+1]=t[l+1-I],t[l+2]=t[l+2-I],t[l+3]=t[l+3-I];l=Pe}}r.l=u,r.p=fe,r.b=l,r.f=c,u&&(c=1,r.m=f,r.d=h,r.n=d)}while(!c);return l==t.length?t:it(t,0,l)},Tt=function(e,t,r){r<<=t&7;var s=t/8|0;e[s]|=r,e[s+1]|=r>>>8},as=function(e,t,r){r<<=t&7;var s=t/8|0;e[s]|=r,e[s+1]|=r>>>8,e[s+2]|=r>>>16},jo=function(e,t){for(var r=[],s=0;s<e.length;++s)e[s]&&r.push({s,f:e[s]});var n=r.length,o=r.slice();if(!n)return[Gt,0];if(n==1){var i=new W(r[0].s+1);return i[r[0].s]=1,[i,1]}r.sort(function(q,w){return q.f-w.f}),r.push({s:-1,f:25001});var c=r[0],a=r[1],l=0,u=1,h=2;for(r[0]={s:-1,f:c.f+a.f,l:c,r:a};u!=n-1;)c=r[r[l].f<r[h].f?l++:h++],a=r[l!=u&&r[l].f<r[h].f?l++:h++],r[u++]={s:-1,f:c.f+a.f,l:c,r:a};for(var f=o[0].s,s=1;s<n;++s)o[s].s>f&&(f=o[s].s);var d=new Oe(f+1),g=Uo(r[u-1],d,0);if(g>t){var s=0,p=0,x=g-t,v=1<<x;for(o.sort(function(w,D){return d[D.s]-d[w.s]||w.f-D.f});s<n;++s){var y=o[s].s;if(d[y]>t)p+=v-(1<<g-d[y]),d[y]=t;else break}for(p>>>=x;p>0;){var b=o[s].s;d[b]<t?p-=1<<t-d[b]++-1:++s}for(;s>=0&&p;--s){var E=o[s].s;d[E]==t&&(--d[E],++p)}g=t}return[new W(d),g]},Uo=function(e,t,r){return e.s==-1?Math.max(Uo(e.l,t,r+1),Uo(e.r,t,r+1)):t[e.s]=r},wl=function(e){for(var t=e.length;t&&!e[--t];);for(var r=new Oe(++t),s=0,n=e[0],o=1,i=function(a){r[s++]=a},c=1;c<=t;++c)if(e[c]==n&&c!=t)++o;else{if(!n&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(n),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(n);o=1,n=e[c]}return[r.subarray(0,s),t]},ls=function(e,t){for(var r=0,s=0;s<t.length;++s)r+=e[s]*t[s];return r},Wo=function(e,t,r){var s=r.length,n=An(t+2);e[n]=s&255,e[n+1]=s>>>8,e[n+2]=e[n]^255,e[n+3]=e[n+1]^255;for(var o=0;o<s;++o)e[n+o+4]=r[o];return(n+4+s)*8},ql=function(e,t,r,s,n,o,i,c,a,l,u){Tt(t,u++,r),++n[256];for(var h=jo(n,15),f=h[0],d=h[1],g=jo(o,15),p=g[0],x=g[1],v=wl(f),y=v[0],b=v[1],E=wl(p),q=E[0],w=E[1],D=new Oe(19),T=0;T<y.length;++T)D[y[T]&31]++;for(var T=0;T<q.length;++T)D[q[T]&31]++;for(var A=jo(D,7),S=A[0],$=A[1],C=19;C>4&&!S[vn[C-1]];--C);var F=l+5<<3,R=ls(n,Xt)+ls(o,us)+i,P=ls(n,f)+ls(o,p)+i+14+3*C+ls(D,S)+(2*D[16]+3*D[17]+7*D[18]);if(F<=R&&F<=P)return Wo(t,u,e.subarray(a,a+l));var I,V,K,fe;if(Tt(t,u,1+(P<R)),u+=2,P<R){I=ot(f,d,0),V=f,K=ot(p,x,0),fe=p;var Ee=ot(S,$,0);Tt(t,u,b-257),Tt(t,u+5,w-1),Tt(t,u+10,C-4),u+=14;for(var T=0;T<C;++T)Tt(t,u+3*T,S[vn[T]]);u+=3*C;for(var be=[y,q],$e=0;$e<2;++$e)for(var tt=be[$e],T=0;T<tt.length;++T){var Te=tt[T]&31;Tt(t,u,Ee[Te]),u+=S[Te],Te>15&&(Tt(t,u,tt[T]>>>5&127),u+=tt[T]>>>12)}}else I=ab,V=Xt,K=ub,fe=us;for(var T=0;T<c;++T)if(s[T]>255){var Te=s[T]>>>18&31;as(t,u,I[Te+257]),u+=V[Te+257],Te>7&&(Tt(t,u,s[T]>>>23&31),u+=ps[Te]);var Pe=s[T]&31;as(t,u,K[Pe]),u+=fe[Pe],Pe>3&&(as(t,u,s[T]>>>5&8191),u+=ds[Pe])}else as(t,u,I[s[T]]),u+=V[s[T]];return as(t,u,I[256]),u+V[256]},pb=new hs([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Gt=new W(0),db=function(e,t,r,s,n,o){var i=e.length,c=new W(s+i+5*(1+Math.ceil(i/7e3))+n),a=c.subarray(s,c.length-n),l=0;if(!t||i<8)for(var u=0;u<=i;u+=65535){var h=u+65535;h>=i&&(a[l>>3]=o),l=Wo(a,l+1,e.subarray(u,h))}else{for(var f=pb[t-1],d=f>>>13,g=f&8191,p=(1<<r)-1,x=new Oe(32768),v=new Oe(p+1),y=Math.ceil(r/3),b=2*y,E=function(Si){return(e[Si]^e[Si+1]<<y^e[Si+2]<<b)&p},q=new hs(25e3),w=new Oe(288),D=new Oe(32),T=0,A=0,u=0,S=0,$=0,C=0;u<i;++u){var F=E(u),R=u&32767,P=v[F];if(x[R]=P,v[F]=R,$<=u){var I=i-u;if((T>7e3||S>24576)&&I>423){l=ql(e,a,0,q,w,D,A,S,C,u-C,l),S=T=A=0,C=u;for(var V=0;V<286;++V)w[V]=0;for(var V=0;V<30;++V)D[V]=0}var K=2,fe=0,Ee=g,be=R-P&32767;if(I>2&&F==E(u-be))for(var $e=Math.min(d,I)-1,tt=Math.min(32767,u),Te=Math.min(258,I);be<=tt&&--Ee&&R!=P;){if(e[u+K]==e[u+K-be]){for(var Pe=0;Pe<Te&&e[u+Pe]==e[u+Pe-be];++Pe);if(Pe>K){if(K=Pe,fe=be,Pe>$e)break;for(var Bn=Math.min(be,Pe-2),Is=0,V=0;V<Bn;++V){var Pr=u-be+V+32768&32767,V4=x[Pr],_0=Pr-V4+32768&32767;_0>Is&&(Is=_0,P=Pr)}}}R=P,P=x[R],be+=R-P+32768&32767}if(fe){q[S++]=268435456|Zo[K]<<18|bl[fe];var B0=Zo[K]&31,V0=bl[fe]&31;A+=ps[B0]+ds[V0],++w[257+B0],++D[V0],$=u+K,++T}else q[S++]=e[u],++w[e[u]]}}l=ql(e,a,o,q,w,D,A,S,C,u-C,l),!o&&l&7&&(l=Wo(a,l+1,Gt))}return it(c,0,s+An(l)+n)},gb=function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var r=t,s=9;--s;)r=(r&1&&-306674912)^r>>>1;e[t]=r}return e}(),gs=function(){var e=-1;return{p:function(t){for(var r=e,s=0;s<t.length;++s)r=gb[r&255^t[s]]^r>>>8;e=r},d:function(){return~e}}},$l=function(){var e=1,t=0;return{p:function(r){for(var s=e,n=t,o=r.length|0,i=0;i!=o;){for(var c=Math.min(i+2655,o);i<c;++i)n+=s+=r[i];s=(s&65535)+15*(s>>16),n=(n&65535)+15*(n>>16)}e=s,t=n},d:function(){return e%=65521,t%=65521,(e&255)<<24|e>>>8<<16|(t&255)<<8|t>>>8}}},Cr=function(e,t,r,s,n){return db(e,t.level==null?6:t.level,t.mem==null?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):12+t.mem,r,s,!n)},wn=function(e,t){var r={};for(var s in e)r[s]=e[s];for(var s in t)r[s]=t[s];return r},rb=function(e,t,r){for(var s=e(),n=e.toString(),o=n.slice(n.indexOf("[")+1,n.lastIndexOf("]")).replace(/\s+/g,"").split(","),i=0;i<s.length;++i){var c=s[i],a=o[i];if(typeof c=="function"){t+=";"+a+"=";var l=c.toString();if(c.prototype)if(l.indexOf("[native code]")!=-1){var u=l.indexOf(" ",8)+1;t+=l.slice(u,l.indexOf("(",u))}else{t+=l;for(var h in c.prototype)t+=";"+a+".prototype."+h+"="+c.prototype[h].toString()}else t+=l}else r[a]=c}return[t,r]},Xo=[],x_=function(e){var t=[];for(var r in e)e[r].buffer&&t.push((e[r]=new e[r].constructor(e[r])).buffer);return t},mb=function(e,t,r,s){var n;if(!Xo[r]){for(var o="",i={},c=e.length-1,a=0;a<c;++a)n=rb(e[a],o,i),o=n[0],i=n[1];Xo[r]=rb(e[c],o,i)}var l=wn({},Xo[r][1]);return m_.default(Xo[r][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+t.toString()+"}",r,l,x_(l),s)},ms=function(){return[W,Oe,hs,ps,ds,vn,Cl,cb,lb,fb,En,hb,ot,Yo,nt,Ho,An,it,L,bn,ys,fr,Rl]},xs=function(){return[W,Oe,hs,ps,ds,vn,Zo,bl,ab,Xt,ub,us,En,pb,Gt,ot,Tt,as,jo,Uo,wl,ls,Wo,ql,An,it,db,Cr,qn,fr]},xb=function(){return[Il,Fl,ne,gs,gb]},vb=function(){return[Ml,Ab]},Eb=function(){return[Nl,ne,$l]},yb=function(){return[bb]},fr=function(e){return postMessage(e,[e.buffer])},Rl=function(e){return e&&e.size&&new W(e.size)},vs=function(e,t,r,s,n,o){var i=mb(r,s,n,function(c,a){i.terminate(),o(c,a)});return i.postMessage([e,t],t.consume?[e.buffer]:[]),function(){i.terminate()}},ct=function(e){return e.ondata=function(t,r){return postMessage([t,r],[t.buffer])},function(t){return e.push(t.data[0],t.data[1])}},Es=function(e,t,r,s,n){var o,i=mb(e,s,n,function(c,a){c?(i.terminate(),t.ondata.call(t,c)):(a[1]&&i.terminate(),t.ondata.call(t,c,a[0],a[1]))});i.postMessage(r),t.push=function(c,a){t.ondata||L(5),o&&t.ondata(L(4,0,1),null,!!a),i.postMessage([c,o=a],[c.buffer])},t.terminate=function(){i.terminate()}},_e=function(e,t){return e[t]|e[t+1]<<8},Ae=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Al=function(e,t){return Ae(e,t)+Ae(e,t+4)*4294967296},ne=function(e,t,r){for(;r;++t)e[t]=r,r>>>=8},Il=function(e,t){var r=t.filename;if(e[0]=31,e[1]=139,e[2]=8,e[8]=t.level<2?4:t.level==9?2:0,e[9]=3,t.mtime!=0&&ne(e,4,Math.floor(new Date(t.mtime||Date.now())/1e3)),r){e[3]=8;for(var s=0;s<=r.length;++s)e[s+10]=r.charCodeAt(s)}},Ml=function(e){(e[0]!=31||e[1]!=139||e[2]!=8)&&L(6,"invalid gzip data");var t=e[3],r=10;t&4&&(r+=e[10]|(e[11]<<8)+2);for(var s=(t>>3&1)+(t>>4&1);s>0;s-=!e[r++]);return r+(t&2)},Ab=function(e){var t=e.length;return(e[t-4]|e[t-3]<<8|e[t-2]<<16|e[t-1]<<24)>>>0},Fl=function(e){return 10+(e.filename&&e.filename.length+1||0)},Nl=function(e,t){var r=t.level,s=r==0?0:r<6?1:r==9?3:2;e[0]=120,e[1]=s<<6|(s?32-2*s:1)},bb=function(e){((e[0]&15)!=8||e[0]>>>4>7||(e[0]<<8|e[1])%31)&&L(6,"invalid zlib data"),e[1]&32&&L(6,"invalid zlib data: preset dictionaries not supported")};function Pl(e,t){return!t&&typeof e=="function"&&(t=e,e={}),this.ondata=t,e}var Ct=function(){function e(t,r){!r&&typeof t=="function"&&(r=t,t={}),this.ondata=r,this.o=t||{}}return e.prototype.p=function(t,r){this.ondata(Cr(t,this.o,0,0,!r),r)},e.prototype.push=function(t,r){this.ondata||L(5),this.d&&L(4),this.d=r,this.p(t,r||!1)},e}();_.Deflate=Ct;var wb=function(){function e(t,r){Es([xs,function(){return[ct,Ct]}],this,Pl.call(this,t,r),function(s){var n=new Ct(s.data);onmessage=ct(n)},6)}return e}();_.AsyncDeflate=wb;function qb(e,t,r){return r||(r=t,t={}),typeof r!="function"&&L(7),vs(e,t,[xs],function(s){return fr(qn(s.data[0],s.data[1]))},0,r)}_.deflate=qb;function qn(e,t){return Cr(e,t||{},0,0)}_.deflateSync=qn;var Ze=function(){function e(t){this.s={},this.p=new W(0),this.ondata=t}return e.prototype.e=function(t){this.ondata||L(5),this.d&&L(4);var r=this.p.length,s=new W(r+t.length);s.set(this.p),s.set(t,r),this.p=s},e.prototype.c=function(t){this.d=this.s.i=t||!1;var r=this.s.b,s=bn(this.p,this.o,this.s);this.ondata(it(s,r,this.s.b),this.d),this.o=it(s,this.s.b-32768),this.s.b=this.o.length,this.p=it(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(t,r){this.e(t),this.c(r)},e}();_.Inflate=Ze;var kl=function(){function e(t){this.ondata=t,Es([ms,function(){return[ct,Ze]}],this,0,function(){var r=new Ze;onmessage=ct(r)},7)}return e}();_.AsyncInflate=kl;function Ol(e,t,r){return r||(r=t,t={}),typeof r!="function"&&L(7),vs(e,t,[ms],function(s){return fr(ys(s.data[0],Rl(s.data[1])))},1,r)}_.inflate=Ol;function ys(e,t){return bn(e,t)}_.inflateSync=ys;var Jo=function(){function e(t,r){this.c=gs(),this.l=0,this.v=1,Ct.call(this,t,r)}return e.prototype.push=function(t,r){Ct.prototype.push.call(this,t,r)},e.prototype.p=function(t,r){this.c.p(t),this.l+=t.length;var s=Cr(t,this.o,this.v&&Fl(this.o),r&&8,!r);this.v&&(Il(s,this.o),this.v=0),r&&(ne(s,s.length-8,this.c.d()),ne(s,s.length-4,this.l)),this.ondata(s,r)},e}();_.Gzip=Jo;_.Compress=Jo;var Sb=function(){function e(t,r){Es([xs,xb,function(){return[ct,Ct,Jo]}],this,Pl.call(this,t,r),function(s){var n=new Jo(s.data);onmessage=ct(n)},8)}return e}();_.AsyncGzip=Sb;_.AsyncCompress=Sb;function Db(e,t,r){return r||(r=t,t={}),typeof r!="function"&&L(7),vs(e,t,[xs,xb,function(){return[Ko]}],function(s){return fr(Ko(s.data[0],s.data[1]))},2,r)}_.gzip=Db;_.compress=Db;function Ko(e,t){t||(t={});var r=gs(),s=e.length;r.p(e);var n=Cr(e,t,Fl(t),8),o=n.length;return Il(n,t),ne(n,o-8,r.d()),ne(n,o-4,s),n}_.gzipSync=Ko;_.compressSync=Ko;var Qo=function(){function e(t){this.v=1,Ze.call(this,t)}return e.prototype.push=function(t,r){if(Ze.prototype.e.call(this,t),this.v){var s=this.p.length>3?Ml(this.p):4;if(s>=this.p.length&&!r)return;this.p=this.p.subarray(s),this.v=0}r&&(this.p.length<8&&L(6,"invalid gzip data"),this.p=this.p.subarray(0,-8)),Ze.prototype.c.call(this,r)},e}();_.Gunzip=Qo;var Tb=function(){function e(t){this.ondata=t,Es([ms,vb,function(){return[ct,Ze,Qo]}],this,0,function(){var r=new Qo;onmessage=ct(r)},9)}return e}();_.AsyncGunzip=Tb;function Cb(e,t,r){return r||(r=t,t={}),typeof r!="function"&&L(7),vs(e,t,[ms,vb,function(){return[ei]}],function(s){return fr(ei(s.data[0]))},3,r)}_.gunzip=Cb;function ei(e,t){return bn(e.subarray(Ml(e),-8),t||new W(Ab(e)))}_.gunzipSync=ei;var Sl=function(){function e(t,r){this.c=$l(),this.v=1,Ct.call(this,t,r)}return e.prototype.push=function(t,r){Ct.prototype.push.call(this,t,r)},e.prototype.p=function(t,r){this.c.p(t);var s=Cr(t,this.o,this.v&&2,r&&4,!r);this.v&&(Nl(s,this.o),this.v=0),r&&ne(s,s.length-4,this.c.d()),this.ondata(s,r)},e}();_.Zlib=Sl;var v_=function(){function e(t,r){Es([xs,Eb,function(){return[ct,Ct,Sl]}],this,Pl.call(this,t,r),function(s){var n=new Sl(s.data);onmessage=ct(n)},10)}return e}();_.AsyncZlib=v_;function E_(e,t,r){return r||(r=t,t={}),typeof r!="function"&&L(7),vs(e,t,[xs,Eb,function(){return[Dl]}],function(s){return fr(Dl(s.data[0],s.data[1]))},4,r)}_.zlib=E_;function Dl(e,t){t||(t={});var r=$l();r.p(e);var s=Cr(e,t,2,4);return Nl(s,t),ne(s,s.length-4,r.d()),s}_.zlibSync=Dl;var ti=function(){function e(t){this.v=1,Ze.call(this,t)}return e.prototype.push=function(t,r){if(Ze.prototype.e.call(this,t),this.v){if(this.p.length<2&&!r)return;this.p=this.p.subarray(2),this.v=0}r&&(this.p.length<4&&L(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),Ze.prototype.c.call(this,r)},e}();_.Unzlib=ti;var $b=function(){function e(t){this.ondata=t,Es([ms,yb,function(){return[ct,Ze,ti]}],this,0,function(){var r=new ti;onmessage=ct(r)},11)}return e}();_.AsyncUnzlib=$b;function Rb(e,t,r){return r||(r=t,t={}),typeof r!="function"&&L(7),vs(e,t,[ms,yb,function(){return[ri]}],function(s){return fr(ri(s.data[0],Rl(s.data[1])))},5,r)}_.unzlib=Rb;function ri(e,t){return bn((bb(e),e.subarray(2,-4)),t)}_.unzlibSync=ri;var Ib=function(){function e(t){this.G=Qo,this.I=Ze,this.Z=ti,this.ondata=t}return e.prototype.push=function(t,r){if(this.ondata||L(5),this.s)this.s.push(t,r);else{if(this.p&&this.p.length){var s=new W(this.p.length+t.length);s.set(this.p),s.set(t,this.p.length)}else this.p=t;if(this.p.length>2){var n=this,o=function(){n.ondata.apply(n,arguments)};this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(o):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(o):new this.Z(o),this.s.push(this.p,r),this.p=null}}},e}();_.Decompress=Ib;var y_=function(){function e(t){this.G=Tb,this.I=kl,this.Z=$b,this.ondata=t}return e.prototype.push=function(t,r){Ib.prototype.push.call(this,t,r)},e}();_.AsyncDecompress=y_;function A_(e,t,r){return r||(r=t,t={}),typeof r!="function"&&L(7),e[0]==31&&e[1]==139&&e[2]==8?Cb(e,t,r):(e[0]&15)!=8||e[0]>>4>7||(e[0]<<8|e[1])%31?Ol(e,t,r):Rb(e,t,r)}_.decompress=A_;function b_(e,t){return e[0]==31&&e[1]==139&&e[2]==8?ei(e,t):(e[0]&15)!=8||e[0]>>4>7||(e[0]<<8|e[1])%31?ys(e,t):ri(e,t)}_.decompressSync=b_;var Ll=function(e,t,r,s){for(var n in e){var o=e[n],i=t+n,c=s;Array.isArray(o)&&(c=wn(s,o[1]),o=o[0]),o instanceof W?r[i]=[o,c]:(r[i+="/"]=[new W(0),c],Ll(o,i,r,s))}},sb=typeof TextEncoder<"u"&&new TextEncoder,Tl=typeof TextDecoder<"u"&&new TextDecoder,Mb=0;try{Tl.decode(Gt,{stream:!0}),Mb=1}catch{}var Fb=function(e){for(var t="",r=0;;){var s=e[r++],n=(s>127)+(s>223)+(s>239);if(r+n>e.length)return[t,it(e,r-1)];n?n==3?(s=((s&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,t+=String.fromCharCode(55296|s>>10,56320|s&1023)):n&1?t+=String.fromCharCode((s&31)<<6|e[r++]&63):t+=String.fromCharCode((s&15)<<12|(e[r++]&63)<<6|e[r++]&63):t+=String.fromCharCode(s)}},w_=function(){function e(t){this.ondata=t,Mb?this.t=new TextDecoder:this.p=Gt}return e.prototype.push=function(t,r){if(this.ondata||L(5),r=!!r,this.t){this.ondata(this.t.decode(t,{stream:!0}),r),r&&(this.t.decode().length&&L(8),this.t=null);return}this.p||L(4);var s=new W(this.p.length+t.length);s.set(this.p),s.set(t,this.p.length);var n=Fb(s),o=n[0],i=n[1];r?(i.length&&L(8),this.p=null):this.p=i,this.ondata(o,r)},e}();_.DecodeUTF8=w_;var q_=function(){function e(t){this.ondata=t}return e.prototype.push=function(t,r){this.ondata||L(5),this.d&&L(4),this.ondata(ur(t),this.d=r||!1)},e}();_.EncodeUTF8=q_;function ur(e,t){if(t){for(var r=new W(e.length),s=0;s<e.length;++s)r[s]=e.charCodeAt(s);return r}if(sb)return sb.encode(e);for(var n=e.length,o=new W(e.length+(e.length>>1)),i=0,c=function(u){o[i++]=u},s=0;s<n;++s){if(i+5>o.length){var a=new W(i+8+(n-s<<1));a.set(o),o=a}var l=e.charCodeAt(s);l<128||t?c(l):l<2048?(c(192|l>>6),c(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|e.charCodeAt(++s)&1023,c(240|l>>18),c(128|l>>12&63),c(128|l>>6&63),c(128|l&63)):(c(224|l>>12),c(128|l>>6&63),c(128|l&63))}return it(o,0,i)}_.strToU8=ur;function zl(e,t){if(t){for(var r="",s=0;s<e.length;s+=16384)r+=String.fromCharCode.apply(null,e.subarray(s,s+16384));return r}else{if(Tl)return Tl.decode(e);var n=Fb(e),o=n[0],i=n[1];return i.length&&L(8),o}}_.strFromU8=zl;var Nb=function(e){return e==1?3:e<6?2:e==9?1:0},Pb=function(e,t){return t+30+_e(e,t+26)+_e(e,t+28)},kb=function(e,t,r){var s=_e(e,t+28),n=zl(e.subarray(t+46,t+46+s),!(_e(e,t+8)&2048)),o=t+46+s,i=Ae(e,t+20),c=r&&i==4294967295?Ob(e,o):[i,Ae(e,t+24),Ae(e,t+42)],a=c[0],l=c[1],u=c[2];return[_e(e,t+10),a,l,n,o+_e(e,t+30)+_e(e,t+32),u]},Ob=function(e,t){for(;_e(e,t)!=1;t+=4+_e(e,t+2));return[Al(e,t+12),Al(e,t+4),Al(e,t+20)]},lr=function(e){var t=0;if(e)for(var r in e){var s=e[r].length;s>65535&&L(9),t+=s+4}return t},fs=function(e,t,r,s,n,o,i,c){var a=s.length,l=r.extra,u=c&&c.length,h=lr(l);ne(e,t,i!=null?33639248:67324752),t+=4,i!=null&&(e[t++]=20,e[t++]=r.os),e[t]=20,t+=2,e[t++]=r.flag<<1|(o==null&&8),e[t++]=n&&8,e[t++]=r.compression&255,e[t++]=r.compression>>8;var f=new Date(r.mtime==null?Date.now():r.mtime),d=f.getFullYear()-1980;if((d<0||d>119)&&L(10),ne(e,t,d<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>>1),t+=4,o!=null&&(ne(e,t,r.crc),ne(e,t+4,o),ne(e,t+8,r.size)),ne(e,t+12,a),ne(e,t+14,h),t+=16,i!=null&&(ne(e,t,u),ne(e,t+6,r.attrs),ne(e,t+10,i),t+=14),e.set(s,t),t+=a,h)for(var g in l){var p=l[g],x=p.length;ne(e,t,+g),ne(e,t+2,x),e.set(p,t+4),t+=4+x}return u&&(e.set(c,t),t+=u),t},_l=function(e,t,r,s,n){ne(e,t,101010256),ne(e,t+8,r),ne(e,t+10,r),ne(e,t+12,s),ne(e,t+16,n)},yn=function(){function e(t){this.filename=t,this.c=gs(),this.size=0,this.compression=0}return e.prototype.process=function(t,r){this.ondata(null,t,r)},e.prototype.push=function(t,r){this.ondata||L(5),this.c.p(t),this.size+=t.length,r&&(this.crc=this.c.d()),this.process(t,r||!1)},e}();_.ZipPassThrough=yn;var S_=function(){function e(t,r){var s=this;r||(r={}),yn.call(this,t),this.d=new Ct(r,function(n,o){s.ondata(null,n,o)}),this.compression=8,this.flag=Nb(r.level)}return e.prototype.process=function(t,r){try{this.d.push(t,r)}catch(s){this.ondata(s,null,r)}},e.prototype.push=function(t,r){yn.prototype.push.call(this,t,r)},e}();_.ZipDeflate=S_;var D_=function(){function e(t,r){var s=this;r||(r={}),yn.call(this,t),this.d=new wb(r,function(n,o,i){s.ondata(n,o,i)}),this.compression=8,this.flag=Nb(r.level),this.terminate=this.d.terminate}return e.prototype.process=function(t,r){this.d.push(t,r)},e.prototype.push=function(t,r){yn.prototype.push.call(this,t,r)},e}();_.AsyncZipDeflate=D_;var T_=function(){function e(t){this.ondata=t,this.u=[],this.d=1}return e.prototype.add=function(t){var r=this;if(this.ondata||L(5),this.d&2)this.ondata(L(4+(this.d&1)*8,0,1),null,!1);else{var s=ur(t.filename),n=s.length,o=t.comment,i=o&&ur(o),c=n!=t.filename.length||i&&o.length!=i.length,a=n+lr(t.extra)+30;n>65535&&this.ondata(L(11,0,1),null,!1);var l=new W(a);fs(l,0,t,s,c);var u=[l],h=function(){for(var x=0,v=u;x<v.length;x++){var y=v[x];r.ondata(null,y,!1)}u=[]},f=this.d;this.d=0;var d=this.u.length,g=wn(t,{f:s,u:c,o:i,t:function(){t.terminate&&t.terminate()},r:function(){if(h(),f){var x=r.u[d+1];x?x.r():r.d=1}f=1}}),p=0;t.ondata=function(x,v,y){if(x)r.ondata(x,v,y),r.terminate();else if(p+=v.length,u.push(v),y){var b=new W(16);ne(b,0,134695760),ne(b,4,t.crc),ne(b,8,p),ne(b,12,t.size),u.push(b),g.c=p,g.b=a+p+16,g.crc=t.crc,g.size=t.size,f&&g.r(),f=1}else f&&h()},this.u.push(g)}},e.prototype.end=function(){var t=this;if(this.d&2){this.ondata(L(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){t.d&1&&(t.u.splice(-1,1),t.e())},t:function(){}}),this.d=3},e.prototype.e=function(){for(var t=0,r=0,s=0,n=0,o=this.u;n<o.length;n++){var i=o[n];s+=46+i.f.length+lr(i.extra)+(i.o?i.o.length:0)}for(var c=new W(s+22),a=0,l=this.u;a<l.length;a++){var i=l[a];fs(c,t,i,i.f,i.u,i.c,r,i.o),t+=46+i.f.length+lr(i.extra)+(i.o?i.o.length:0),r+=i.b}_l(c,t,this.u.length,s,r),this.ondata(null,c,!0),this.d=2},e.prototype.terminate=function(){for(var t=0,r=this.u;t<r.length;t++){var s=r[t];s.t()}this.d=2},e}();_.Zip=T_;function C_(e,t,r){r||(r=t,t={}),typeof r!="function"&&L(7);var s={};Ll(e,"",s,t);var n=Object.keys(s),o=n.length,i=0,c=0,a=o,l=new Array(o),u=[],h=function(){for(var x=0;x<u.length;++x)u[x]()},f=function(x,v){si(function(){r(x,v)})};si(function(){f=r});var d=function(){var x=new W(c+22),v=i,y=c-i;c=0;for(var b=0;b<a;++b){var E=l[b];try{var q=E.c.length;fs(x,c,E,E.f,E.u,q);var w=30+E.f.length+lr(E.extra),D=c+w;x.set(E.c,D),fs(x,i,E,E.f,E.u,q,c,E.m),i+=16+w+(E.m?E.m.length:0),c=D+q}catch(T){return f(T,null)}}_l(x,i,l.length,y,v),f(null,x)};o||d();for(var g=function(x){var v=n[x],y=s[v],b=y[0],E=y[1],q=gs(),w=b.length;q.p(b);var D=ur(v),T=D.length,A=E.comment,S=A&&ur(A),$=S&&S.length,C=lr(E.extra),F=E.level==0?0:8,R=function(P,I){if(P)h(),f(P,null);else{var V=I.length;l[x]=wn(E,{size:w,crc:q.d(),c:I,f:D,m:S,u:T!=v.length||S&&A.length!=$,compression:F}),i+=30+T+C+V,c+=76+2*(T+C)+($||0)+V,--o||d()}};if(T>65535&&R(L(11,0,1),null),!F)R(null,b);else if(w<16e4)try{R(null,qn(b,E))}catch(P){R(P,null)}else u.push(qb(b,E,R))},p=0;p<a;++p)g(p);return h}_.zip=C_;function $_(e,t){t||(t={});var r={},s=[];Ll(e,"",r,t);var n=0,o=0;for(var i in r){var c=r[i],a=c[0],l=c[1],u=l.level==0?0:8,h=ur(i),f=h.length,d=l.comment,g=d&&ur(d),p=g&&g.length,x=lr(l.extra);f>65535&&L(11);var v=u?qn(a,l):a,y=v.length,b=gs();b.p(a),s.push(wn(l,{size:a.length,crc:b.d(),c:v,f:h,m:g,u:f!=i.length||g&&d.length!=p,o:n,compression:u})),n+=30+f+x+y,o+=76+2*(f+x)+(p||0)+y}for(var E=new W(o+22),q=n,w=o-n,D=0;D<s.length;++D){var h=s[D];fs(E,h.o,h,h.f,h.u,h.c.length);var T=30+h.f.length+lr(h.extra);E.set(h.c,h.o+T),fs(E,n,h,h.f,h.u,h.c.length,h.o,h.m),n+=16+T+(h.m?h.m.length:0)}return _l(E,n,s.length,w,q),E}_.zipSync=$_;var Lb=function(){function e(){}return e.prototype.push=function(t,r){this.ondata(null,t,r)},e.compression=0,e}();_.UnzipPassThrough=Lb;var R_=function(){function e(){var t=this;this.i=new Ze(function(r,s){t.ondata(null,r,s)})}return e.prototype.push=function(t,r){try{this.i.push(t,r)}catch(s){this.ondata(s,null,r)}},e.compression=8,e}();_.UnzipInflate=R_;var I_=function(){function e(t,r){var s=this;r<32e4?this.i=new Ze(function(n,o){s.ondata(null,n,o)}):(this.i=new kl(function(n,o,i){s.ondata(n,o,i)}),this.terminate=this.i.terminate)}return e.prototype.push=function(t,r){this.i.terminate&&(t=it(t,0)),this.i.push(t,r)},e.compression=8,e}();_.AsyncUnzipInflate=I_;var M_=function(){function e(t){this.onfile=t,this.k=[],this.o={0:Lb},this.p=Gt}return e.prototype.push=function(t,r){var s=this;if(this.onfile||L(5),this.p||L(4),this.c>0){var n=Math.min(this.c,t.length),o=t.subarray(0,n);if(this.c-=n,this.d?this.d.push(o,!this.c):this.k[0].push(o),t=t.subarray(n),t.length)return this.push(t,r)}else{var i=0,c=0,a=void 0,l=void 0;this.p.length?t.length?(l=new W(this.p.length+t.length),l.set(this.p),l.set(t,this.p.length)):l=this.p:l=t;for(var u=l.length,h=this.c,f=h&&this.d,d=function(){var v,y=Ae(l,c);if(y==67324752){i=1,a=c,g.d=null,g.c=0;var b=_e(l,c+6),E=_e(l,c+8),q=b&2048,w=b&8,D=_e(l,c+26),T=_e(l,c+28);if(u>c+30+D+T){var A=[];g.k.unshift(A),i=2;var S=Ae(l,c+18),$=Ae(l,c+22),C=zl(l.subarray(c+30,c+=30+D),!q);S==4294967295?(v=w?[-2]:Ob(l,c),S=v[0],$=v[1]):w&&(S=-1),c+=T,g.c=S;var F,R={name:C,compression:E,start:function(){if(R.ondata||L(5),!S)R.ondata(null,Gt,!0);else{var P=s.o[E];P||R.ondata(L(14,"unknown compression type "+E,1),null,!1),F=S<0?new P(C):new P(C,S,$),F.ondata=function(fe,Ee,be){R.ondata(fe,Ee,be)};for(var I=0,V=A;I<V.length;I++){var K=V[I];F.push(K,!1)}s.k[0]==A&&s.c?s.d=F:F.push(Gt,!0)}},terminate:function(){F&&F.terminate&&F.terminate()}};S>=0&&(R.size=S,R.originalSize=$),g.onfile(R)}return"break"}else if(h){if(y==134695760)return a=c+=12+(h==-2&&8),i=3,g.c=0,"break";if(y==33639248)return a=c-=4,i=3,g.c=0,"break"}},g=this;c<u-4;++c){var p=d();if(p==="break")break}if(this.p=Gt,h<0){var x=i?l.subarray(0,a-12-(h==-2&&8)-(Ae(l,a-16)==134695760&&4)):l.subarray(0,c);f?f.push(x,!!i):this.k[+(i==2)].push(x)}if(i&2)return this.push(l.subarray(c),r);this.p=l.subarray(c)}r&&(this.c&&L(13),this.p=null)},e.prototype.register=function(t){this.o[t.compression]=t},e}();_.Unzip=M_;var si=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(e){e()};function F_(e,t,r){r||(r=t,t={}),typeof r!="function"&&L(7);var s=[],n=function(){for(var p=0;p<s.length;++p)s[p]()},o={},i=function(p,x){si(function(){r(p,x)})};si(function(){i=r});for(var c=e.length-22;Ae(e,c)!=101010256;--c)if(!c||e.length-c>65558)return i(L(13,0,1),null),n;var a=_e(e,c+8);if(a){var l=a,u=Ae(e,c+16),h=u==4294967295;if(h){if(c=Ae(e,c-12),Ae(e,c)!=101075792)return i(L(13,0,1),null),n;l=a=Ae(e,c+32),u=Ae(e,c+48)}for(var f=t&&t.filter,d=function(p){var x=kb(e,u,h),v=x[0],y=x[1],b=x[2],E=x[3],q=x[4],w=x[5],D=Pb(e,w);u=q;var T=function(S,$){S?(n(),i(S,null)):($&&(o[E]=$),--a||i(null,o))};if(!f||f({name:E,size:y,originalSize:b,compression:v}))if(!v)T(null,it(e,D,D+y));else if(v==8){var A=e.subarray(D,D+y);if(y<32e4)try{T(null,ys(A,new W(b)))}catch(S){T(S,null)}else s.push(Ol(A,{size:b},T))}else T(L(14,"unknown compression type "+v,1),null);else T(null,null)},g=0;g<l;++g)d(g)}else i(null,{});return n}_.unzip=F_;function N_(e,t){for(var r={},s=e.length-22;Ae(e,s)!=101010256;--s)(!s||e.length-s>65558)&&L(13);var n=_e(e,s+8);if(!n)return{};var o=Ae(e,s+16),i=o==4294967295;i&&(s=Ae(e,s-12),Ae(e,s)!=101075792&&L(13),n=Ae(e,s+32),o=Ae(e,s+48));for(var c=t&&t.filter,a=0;a<n;++a){var l=kb(e,o,i),u=l[0],h=l[1],f=l[2],d=l[3],g=l[4],p=l[5],x=Pb(e,p);o=g,(!c||c({name:d,size:h,originalSize:f,compression:u}))&&(u?u==8?r[d]=ys(e.subarray(x,x+h),new W(f)):L(14,"unknown compression type "+u):r[d]=it(e,x,x+h))}return r}_.unzipSync=N_});var _b=m((gse,zb)=>{"use strict";function P_(e){return e&&Object.prototype.toString.call(e)==="[object Object]"}function k_(e){var t=" ".repeat(e);return function(r){var s,n=[];return typeof r!="string"?r:(s=r.split(`
`),s.length===1?t+r:(s.forEach(function(o){if(o.trim()===""){n.push(o);return}n.push(t+o)}),n.join(`
`)))}}function O_(e){var t=e.split(`
`),r=[];return t.forEach(function(s){s.trim()!==""&&r.push(s)}),r.join(`
`)}function L_(e,t){var r="",s=function(o){return o};t>0&&(r=`
`,s=k_(t));function n(o){var i,c,a,l;return c="",l=!0,a=o.some(function(u,h,f){if(h===0)return i="<"+u,f.length===1?!0:void 0;if(h===1)if(P_(u)){if(Object.keys(u).forEach(function(d){i+=" "+d+'="'+u[d]+'"'}),f.length===2)return!0;i+=">";return}else i+=">";switch(typeof u){case"string":case"number":case"boolean":case"undefined":c+=u+r;return}l=!1,c+=n(u)}),a?i+"/>"+r:l?i+O_(c)+"</"+o[0]+">"+r:i+r+s(c)+"</"+o[0]+">"+r}return n(e)}zb.exports=L_});var Gl=m((mse,Vb)=>{var z_=Bl().zipSync,Vl=Bl().strToU8,__=_b(),{colors:Bb,geometries:Sn,modifiers:B_}=ue(),{flatten:V_,toArray:G_}=dt(),X_="model/3mf",Y_="3mf",H_=(e,...t)=>{e=Object.assign({},{unit:"millimeter",metadata:!0,defaultcolor:[1,.6274509803921569,0,1],compress:!0},e),t=V_(t);let s=t.filter(i=>Sn.geom3.isA(i));if(s.length===0)throw new Error("only 3D geometries can be serialized to 3MF");t.length!==s.length&&console.warn("some objects could not be serialized to 3MF"),t=G_(B_.generalize({snap:!0,triangulate:!0},s));let n=["model",{unit:e.unit,"xml:lang":"und"},["metadata",{name:"Application"},"JSCAD"]];e.metadata&&n.push(["metadata",{name:"CreationDate"},new Date().toISOString()]),n.push(U_(t,e)),n.push(K_(t,e));let o=`<?xml version="1.0" encoding="UTF-8"?>
${__(n,2)}`;if(e.compress){let i={"3D":{"3dmodel.model":Vl(o)},_rels:{".rels":Vl(Z_)},"[Content_Types].xml":Vl(j_)};return[z_(i,{comment:"created by JSCAD"}).buffer]}return[o]},j_=`<?xml version="1.0" encoding="UTF-8" ?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml">
  </Default>
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml">
  </Default>
</Types>`,Z_=`<?xml version="1.0" encoding="UTF-8" ?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel">
  </Relationship>
</Relationships>`,U_=(e,t)=>{let r=["resources",{},W_(e,t)];return r=r.concat(J_(e,t)),r},W_=(e,t)=>{let r=["basematerials",{id:"0"}],s=[];return e.forEach((n,o)=>{let i=Bb.rgbToHex(t.defaultcolor).toUpperCase();n.color&&(i=Bb.rgbToHex(n.color).toUpperCase()),s.push(["base",{name:`mat${o}`,displaycolor:i}])}),r=r.concat(s),r},J_=(e,t)=>{let r=[];return e.forEach((s,n)=>{Sn.geom3.isA(s)&&Sn.geom3.toPolygons(s).length>0&&(t.id=n,r.push(Q_(s,t)))}),r},K_=(e,t)=>{let r=["build",{}],s=[];return e.forEach((n,o)=>{s.push(["item",{objectid:`${o+1}`}])}),r=r.concat(s),r},Q_=(e,t)=>{let r=e.name?e.name:`Part ${t.id}`;return["object",{id:`${t.id+1}`,type:"model",pid:"0",pindex:`${t.id}`,name:r},eB(e,t)]},eB=(e,t)=>["mesh",{},tB(e,t),sB(e,t)],tB=(e,t)=>{let r=["vertices",{}],s=[];return Sn.geom3.toPolygons(e).forEach(o=>{for(let i=0;i<o.vertices.length;i++)s.push(rB(o.vertices[i],t))}),r.concat(s)},rB=(e,t)=>["vertex",{x:e[0],y:e[1],z:e[2]}],sB=(e,t)=>{let r=0,s=Sn.geom3.toPolygons(e),n=["triangles",{}];return s.forEach(o=>{if(o.vertices.length<3)return;let i=nB(o,r);n=n.concat(i),r+=o.vertices.length}),n},nB=(e,t)=>{let r=[];for(let s=0;s<e.vertices.length-2;s++){let n=["triangle",{v1:t,v2:t+s+1,v3:t+s+2}];r.push(n)}return r};Vb.exports={serialize:H_,mimeType:X_,fileExtension:Y_}});var Xb=m((xse,Gb)=>{var{geometries:Xl}=ue(),Be={stl:{displayName:"STL (Binary)",description:"STereoLithography, Binary",extension:"stl",mimetype:"application/sla",deserializable:!0,convertGeom3:!1,convertGeom2:!1},stla:{displayName:"STL (ASCII)",description:"STereoLithography, ASCII",extension:"stl",mimetype:"application/sla",deserializable:!1,convertGeom3:!0,convertGeom2:!1},stlb:{displayName:"STL (Binary)",description:"STereoLithography, Binary",extension:"stl",mimetype:"application/sla",deserializable:!1,convertGeom3:!0,convertGeom2:!1},amf:{displayName:"AMF (experimental)",description:"Additive Manufacturing File Format",extension:"amf",mimetype:"application/amf+xml",deserializable:!0,convertGeom3:!0,convertGeom2:!1},dxf:{displayName:"DXF (ASCII)",description:"AutoCAD Drawing Exchange Format",extension:"dxf",mimetype:"application/dxf",deserializable:!0,convertGeom3:!0,convertGeom2:!0},jscad:{displayName:"JSCAD",description:"JSCAD Design Source",extension:"jscad",mimetype:"application/javascript",deserializable:!0,convertGeom3:!0,convertGeom2:!0},json:{displayName:"json",description:"JavaScript Object Notation Format",extension:"json",mimetype:"application/json",deserializable:!0,convertGeom3:!0,convertGeom2:!0},js:{displayName:"js",description:"JavaScript Source",extension:"js",mimetype:"application/javascript",deserializable:!0,convertGeom3:!0,convertGeom2:!0},obj:{displayName:"OBJ",description:"Wavefront OBJ File",extension:"obj",mimetype:"text/plain",deserializable:!0,convertGeom3:!0,convertGeom2:!1},svg:{displayName:"SVG",description:"Scalable Vector Graphics Format",extension:"svg",mimetype:"image/svg+xml",deserializable:!0,convertGeom3:!1,convertGeom2:!0},x3d:{displayName:"X3D",description:"X3D File Format",extension:"x3d",mimetype:"model/x3d+xml",deserializable:!0,convertGeom3:!0,convertGeom2:!0},"3mf":{displayName:"3MF",description:"3D Manufacturing Format",extension:"3mf",mimetype:"model/3mf",deserializable:!1,convertGeom3:!0,convertGeom2:!1}},oB=["amf","js","jscad","obj","scad","stl","dxf","svg","ttf","woff"],iB=e=>{let t=[],r=!1,s=!1;for(let n=0;n<e.length;n++)Xl.geom3.isA(e[n])&&(r=!0),(Xl.geom2.isA(e[n])||Xl.path2.isA(e[n]))&&(s=!0);for(let n in Be){if(r&&Be[n].convertGeom3===!0){t[t.length]=n;continue}s&&Be[n].convertGeom2===!0&&(t[t.length]=n)}return t},cB=()=>{let e=[];for(let t in Be)(Be[t].convertGeom3===!0||Be[t].convertGeom2===!0)&&e.indexOf(Be[t].extension)<0&&e.push(Be[t].extension);return e},aB=()=>{let e=[];for(let t in Be)(Be[t].convertGeom3===!0||Be[t].convertGeom2===!0)&&e.push(t);return e},lB=()=>{let e=[];for(let t in Be)Be[t].deserializable===!0&&e.push(Be[t].extension);return e};Gb.exports={formats:Be,conversionFormats:oB,supportedInputExtensions:lB,supportedOutputExtensions:cB,supportedOutputFormats:aB,supportedFormatsForObjects:iB}});var Zb=m((vse,jb)=>{var{toArray:Yb}=dt(),{formats:Hb}=Xb(),uB=il(),fB=ul(),hB=fl(),pB=hl(),ni=gl(),dB=ml(),gB=yl(),mB=Gl(),xB=(e,t)=>{let r={format:void 0,version:"0.0.0"},{format:s,version:n}=Object.assign({},r,t),o={producer:"JSCAD "+n,date:new Date,version:n},i={amf:uB,stl:ni,stla:{mimeType:ni.mimeType,serialize:(u,h)=>ni.serialize(Object.assign({},{binary:!1},u),h)},stlb:ni,dxf:fB,obj:pB,svg:dB,x3d:gB,"3mf":mB,json:hB,js:{mimeType:Hb.js.mimetype,serialize:(u,h)=>Yb(h)},jscad:{mimeType:Hb.jscad.mimetype,serialize:(u,h)=>Yb(h)},undefined:()=>{throw new Error("Not supported : only jscad, stl, amf, dxf, svg or json as output format")}},c=Object.assign({},o,t),a=i[s].serialize(c,e),l=i[s].mimeType;return{data:a,mimeType:l}};jb.exports=xB});var Ub=m((Ese,vB)=>{vB.exports={name:"@jscad/amf-deserializer",version:"2.3.3",description:"AMF Deserializer for JSCAD",repository:"https://github.com/jscad/OpenJSCAD.org/",main:"src/index.js",scripts:{coverage:"nyc --all --reporter=html --reporter=text npm test",test:"ava --verbose --timeout 2m 'tests/**/*.test.js'"},contributors:[{name:"Rene K. Mueller",url:"http://renekmueller.com"},{name:"z3dev",url:"http://www.z3d.jp"},{name:"Mark 'kaosat-dev' Moissette",url:"http://kaosat.net"}],keywords:["openjscad","jscad","import","deserializer","amf"],license:"MIT",dependencies:{"@jscad/modeling":"2.11.0",saxes:"5.0.1"},devDependencies:{ava:"3.15.0",nyc:"15.1.0"},gitHead:"5899622c5ffc640001da7261d7c06a1223064ccc"}});var Yl=m((yse,Kb)=>{var{maths:Wb,geometries:Jb}=ue(),Dn,EB=(e,t)=>{if(Dn&&Dn.id===t)return Dn;for(let r=0;r<e.length;r++)if(e[r].id&&e[r].id===t)return Dn=e[r],Dn;return null},$t=(e,t)=>{for(let r=0;r<e.length;r++)if(e[r].type===t)return e[r].value;return null},Tn=e=>{for(let t=0;t<e.length;t++){let r=e[t];if(r.type==="color"){let s=parseFloat($t(r.objects,"r")),n=parseFloat($t(r.objects,"g")),o=parseFloat($t(r.objects,"b")),i=parseFloat($t(r.objects,"a"));return Number.isNaN(s)&&(s=1),Number.isNaN(n)&&(n=1),Number.isNaN(o)&&(o=1),Number.isNaN(i)&&(i=1),[s,n,o,i]}}return null},yB=(e,t)=>{let r=EB(e,t);return r?Tn(r.objects):null},AB=(e,t,r,s)=>{let n=[],o=[],i=[],c=r.amfMaterials,a=(p,x)=>{if(p.type==="coordinates"){let v=parseFloat($t(p.objects,"x")),y=parseFloat($t(p.objects,"y")),b=parseFloat($t(p.objects,"z"));n.push([v,y,b])}},l=(p,x)=>{p.type==="vertex"&&p.objects.forEach(a)},u=(p,x)=>{if(p.type==="triangle"){let v=parseInt($t(p.objects,"v1")),y=parseInt($t(p.objects,"v2")),b=parseInt($t(p.objects,"v3"));o.push([v,y,b]);let E=Tn(p.objects);E?i.push(E):i.push(h)}},h=null,f=(p,x)=>{switch(p.type){case"vertices":p.objects.forEach(l);break;case"volume":h=Tn(p.objects),p.materialid&&(h=yB(c,p.materialid)),p.objects.forEach(u);break;default:break}},d=(p,x)=>{p.type==="mesh"&&p.objects.forEach(f)};if(s.instantiate===!0){let p=s.amf.scale,x=p!==1?([w,D,T])=>Wb.vec3.fromValues(w*p,D*p,T*p):w=>Wb.vec3.clone(w);e.objects.forEach(d);let v=Tn(e.objects),y=o.length,b=n.length,E=[];for(let w=0;w<y;w++){let D=[];for(let S=0;S<o[w].length;S++)o[w][S]<0||o[w][S]>=b||D.push(x(n[o[w][S]]));let T=Jb.poly3.fromPoints(D),A=i[w]?i[w]:void 0;A&&(T.color=A),E.push(T)}let q=Jb.geom3.create(E);return v&&(q=q.color=v),q}let g="";if(e.objects.length>0){e.objects.forEach(d);let p=Tn(e.objects),x=o.length,v=n.length;g+=`
// Object ${e.id}
//  faces   : ${x}
//  vertices: ${v}
const createObject${e.id} = () => {
  let polygons = []
  let polygon
`;for(let b=0;b<x;b++){g+=`  polygon = geometries.poly3.fromPoints([
`;for(let q=0;q<o[b].length;q++)o[b][q]<0||o[b][q]>=v||(g+=`      [${n[o[b][q]]}],
`);g+=`  ])
`;let E=i[b];E&&(g+=`  polygon.color = [${E}]
`),g+=`  polygons.push(polygon)
`}g+=`  let shape = geometries.geom3.create(polygons)
`;let y=s.scale?s.scale:1;y!==1&&(g+=`  shape = transforms.scale([${y},${y},${y}], shape)
`),p&&(g+=`  shape = colors.colorize([${p}], shape)
`),g+=`  return shape
}
`}return g};Kb.exports=AB});var ew=m(pe=>{"use strict";Object.defineProperty(pe,"__esModule",{value:!0});pe.CHAR=`	
\r -\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}`;pe.S=` 	\r
`;pe.NAME_START_CHAR=":A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}";pe.NAME_CHAR="-"+pe.NAME_START_CHAR+".0-9\xB7\u0300-\u036F\u203F-\u2040";pe.CHAR_RE=new RegExp("^["+pe.CHAR+"]$","u");pe.S_RE=new RegExp("^["+pe.S+"]+$","u");pe.NAME_START_CHAR_RE=new RegExp("^["+pe.NAME_START_CHAR+"]$","u");pe.NAME_CHAR_RE=new RegExp("^["+pe.NAME_CHAR+"]$","u");pe.NAME_RE=new RegExp("^["+pe.NAME_START_CHAR+"]["+pe.NAME_CHAR+"]*$","u");pe.NMTOKEN_RE=new RegExp("^["+pe.NAME_CHAR+"]+$","u");var Hl=9,jl=10,Zl=13,Ul=32;pe.S_LIST=[Ul,jl,Zl,Hl];function bB(e){return e>=Ul&&e<=55295||e===jl||e===Zl||e===Hl||e>=57344&&e<=65533||e>=65536&&e<=1114111}pe.isChar=bB;function wB(e){return e===Ul||e===jl||e===Zl||e===Hl}pe.isS=wB;function Qb(e){return e>=65&&e<=90||e>=97&&e<=122||e===58||e===95||e===8204||e===8205||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=767||e>=880&&e<=893||e>=895&&e<=8191||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}pe.isNameStartChar=Qb;function qB(e){return Qb(e)||e>=48&&e<=57||e===45||e===46||e===183||e>=768&&e<=879||e>=8255&&e<=8256}pe.isNameChar=qB});var iw=m(oe=>{"use strict";Object.defineProperty(oe,"__esModule",{value:!0});oe.CHAR="-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}";oe.RESTRICTED_CHAR="-\b\v\f-\x7F-\x84\x86-\x9F";oe.S=` 	\r
`;oe.NAME_START_CHAR=":A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}";oe.NAME_CHAR="-"+oe.NAME_START_CHAR+".0-9\xB7\u0300-\u036F\u203F-\u2040";oe.CHAR_RE=new RegExp("^["+oe.CHAR+"]$","u");oe.RESTRICTED_CHAR_RE=new RegExp("^["+oe.RESTRICTED_CHAR+"]$","u");oe.S_RE=new RegExp("^["+oe.S+"]+$","u");oe.NAME_START_CHAR_RE=new RegExp("^["+oe.NAME_START_CHAR+"]$","u");oe.NAME_CHAR_RE=new RegExp("^["+oe.NAME_CHAR+"]$","u");oe.NAME_RE=new RegExp("^["+oe.NAME_START_CHAR+"]["+oe.NAME_CHAR+"]*$","u");oe.NMTOKEN_RE=new RegExp("^["+oe.NAME_CHAR+"]+$","u");var tw=9,rw=10,sw=13,nw=32;oe.S_LIST=[nw,rw,sw,tw];function SB(e){return e>=1&&e<=55295||e>=57344&&e<=65533||e>=65536&&e<=1114111}oe.isChar=SB;function DB(e){return e>=1&&e<=8||e===11||e===12||e>=14&&e<=31||e>=127&&e<=132||e>=134&&e<=159}oe.isRestrictedChar=DB;function TB(e){return e===9||e===10||e===13||e>31&&e<127||e===133||e>159&&e<=55295||e>=57344&&e<=65533||e>=65536&&e<=1114111}oe.isCharAndNotRestricted=TB;function CB(e){return e===nw||e===rw||e===sw||e===tw}oe.isS=CB;function ow(e){return e>=65&&e<=90||e>=97&&e<=122||e===58||e===95||e===8204||e===8205||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=767||e>=880&&e<=893||e>=895&&e<=8191||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}oe.isNameStartChar=ow;function $B(e){return ow(e)||e>=48&&e<=57||e===45||e===46||e===183||e>=768&&e<=879||e>=8255&&e<=8256}oe.isNameChar=$B});var aw=m(Ue=>{"use strict";Object.defineProperty(Ue,"__esModule",{value:!0});Ue.NC_NAME_START_CHAR="A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}";Ue.NC_NAME_CHAR="-"+Ue.NC_NAME_START_CHAR+".0-9\xB7\u0300-\u036F\u203F-\u2040";Ue.NC_NAME_START_CHAR_RE=new RegExp("^["+Ue.NC_NAME_START_CHAR+"]$","u");Ue.NC_NAME_CHAR_RE=new RegExp("^["+Ue.NC_NAME_CHAR+"]$","u");Ue.NC_NAME_RE=new RegExp("^["+Ue.NC_NAME_START_CHAR+"]["+Ue.NC_NAME_CHAR+"]*$","u");function cw(e){return e>=65&&e<=90||e===95||e>=97&&e<=122||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=767||e>=880&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}Ue.isNCNameStartChar=cw;function RB(e){return cw(e)||e===45||e===46||e>=48&&e<=57||e===183||e>=768&&e<=879||e>=8255&&e<=8256}Ue.isNCNameChar=RB});var hi=m(fi=>{"use strict";Object.defineProperty(fi,"__esModule",{value:!0});var Ss=ew(),IB=iw(),l0=aw(),We=Ss.isS,MB=Ss.isChar,Cn=Ss.isNameStartChar,lw=Ss.isNameChar,ww=Ss.S_LIST,FB=Ss.NAME_RE,NB=IB.isChar,PB=l0.isNCNameStartChar,kB=l0.isNCNameChar,OB=l0.NC_NAME_RE,ui="http://www.w3.org/XML/1998/namespace",qs="http://www.w3.org/2000/xmlns/",LB={__proto__:null,xml:ui,xmlns:qs},zB={__proto__:null,amp:"&",gt:">",lt:"<",quot:'"',apos:"'"},de=-1,Rt=-2,uw=0,_B=1,Wl=2,BB=3,As=4,VB=5,GB=6,XB=7,Jl=8,YB=9,HB=10,jB=11,ZB=12,Ve=13,oi=14,Kl=15,UB=16,Ql=17,WB=18,JB=19,e0=20,KB=21,QB=22,eV=23,fw=24,t0=25,ii=26,hw=27,tV=28,rV=29,pw=30,sV=31,nV=32,$r=33,oV=34,r0=35,$n=36,s0=37,iV=38,dw=39,gw=40,cV=41,mw=42,aV=43,lV=44,n0=9,gt=10,o0=13,xw=32,vw=33,qw=34,Rn=38,Sw=39,ci=45,ai=47,uV=59,hr=60,bs=61,Ce=62,Ne=63,Dw=91,ws=93,Ew=133,yw=8232,li=e=>e===qw||e===Sw,Tw=[qw,Sw],fV=[...Tw,Dw,Ce],hV=[...Tw,hr,ws],pV=[bs,Ne,...ww],dV=[...ww,Ce,Rn,hr];function c0(e,t,r){switch(t){case"xml":r!==ui&&e.fail(`xml prefix must be bound to ${ui}.`);break;case"xmlns":r!==qs&&e.fail(`xmlns prefix must be bound to ${qs}.`);break;default:}switch(r){case qs:e.fail(t===""?`the default namespace may not be set to ${r}.`:`may not assign a prefix (even "xmlns") to the URI ${qs}.`);break;case ui:switch(t){case"xml":break;case"":e.fail(`the default namespace may not be set to ${r}.`);break;default:e.fail("may not assign the xml namespace to another prefix.")}break;default:}}function gV(e,t){for(let r of Object.keys(t))c0(e,r,t[r])}var mV=e=>OB.test(e),xV=e=>FB.test(e),Rr=0,Aw=1,i0=2;fi.EVENTS=["xmldecl","text","processinginstruction","doctype","comment","opentagstart","attribute","opentag","closetag","cdata","error","end","ready"];var bw={xmldecl:"xmldeclHandler",text:"textHandler",processinginstruction:"piHandler",doctype:"doctypeHandler",comment:"commentHandler",opentagstart:"openTagStartHandler",attribute:"attributeHandler",opentag:"openTagHandler",closetag:"closeTagHandler",cdata:"cdataHandler",error:"errorHandler",end:"endHandler",ready:"readyHandler"},a0=class{constructor(t){this.opt=t??{},this.fragmentOpt=!!this.opt.fragment;let r=this.xmlnsOpt=!!this.opt.xmlns;if(this.trackPosition=this.opt.position!==!1,this.fileName=this.opt.fileName,r){this.nameStartCheck=PB,this.nameCheck=kB,this.isName=mV,this.processAttribs=this.processAttribsNS,this.pushAttrib=this.pushAttribNS,this.ns=Object.assign({__proto__:null},LB);let s=this.opt.additionalNamespaces;s!=null&&(gV(this,s),Object.assign(this.ns,s))}else this.nameStartCheck=Cn,this.nameCheck=lw,this.isName=xV,this.processAttribs=this.processAttribsPlain,this.pushAttrib=this.pushAttribPlain;this.stateTable=[this.sBegin,this.sBeginWhitespace,this.sDoctype,this.sDoctypeQuote,this.sDTD,this.sDTDQuoted,this.sDTDOpenWaka,this.sDTDOpenWakaBang,this.sDTDComment,this.sDTDCommentEnding,this.sDTDCommentEnded,this.sDTDPI,this.sDTDPIEnding,this.sText,this.sEntity,this.sOpenWaka,this.sOpenWakaBang,this.sComment,this.sCommentEnding,this.sCommentEnded,this.sCData,this.sCDataEnding,this.sCDataEnding2,this.sPIFirstChar,this.sPIRest,this.sPIBody,this.sPIEnding,this.sXMLDeclNameStart,this.sXMLDeclName,this.sXMLDeclEq,this.sXMLDeclValueStart,this.sXMLDeclValue,this.sXMLDeclSeparator,this.sXMLDeclEnding,this.sOpenTag,this.sOpenTagSlash,this.sAttrib,this.sAttribName,this.sAttribNameSawWhite,this.sAttribValue,this.sAttribValueQuoted,this.sAttribValueClosed,this.sAttribValueUnquoted,this.sCloseTag,this.sCloseTagSawWhite],this._init()}get closed(){return this._closed}_init(){var t;this.openWakaBang="",this.text="",this.name="",this.piTarget="",this.entity="",this.q=null,this.tags=[],this.tag=null,this.topNS=null,this.chunk="",this.chunkPosition=0,this.i=0,this.prevI=0,this.carriedFromPrevious=void 0,this.forbiddenState=Rr,this.attribList=[];let{fragmentOpt:r}=this;this.state=r?Ve:uw,this.reportedTextBeforeRoot=this.reportedTextAfterRoot=this.closedRoot=this.sawRoot=r,this.xmlDeclPossible=!r,this.xmlDeclExpects=["version"],this.entityReturnState=void 0;let{defaultXMLVersion:s}=this.opt;if(s===void 0){if(this.opt.forceXMLVersion===!0)throw new Error("forceXMLVersion set but defaultXMLVersion is not set");s="1.0"}this.setXMLVersion(s),this.positionAtNewLine=0,this.doctype=!1,this._closed=!1,this.xmlDecl={version:void 0,encoding:void 0,standalone:void 0},this.line=1,this.column=0,this.ENTITIES=Object.create(zB),(t=this.readyHandler)===null||t===void 0||t.call(this)}get position(){return this.chunkPosition+this.i}get columnIndex(){return this.position-this.positionAtNewLine}on(t,r){this[bw[t]]=r}off(t){this[bw[t]]=void 0}makeError(t){var r;let s=(r=this.fileName)!==null&&r!==void 0?r:"";return this.trackPosition&&(s.length>0&&(s+=":"),s+=`${this.line}:${this.column}`),s.length>0&&(s+=": "),new Error(s+t)}fail(t){let r=this.makeError(t),s=this.errorHandler;if(s===void 0)throw r;return s(r),this}write(t){if(this.closed)return this.fail("cannot write after close; assign an onready handler.");let r=!1;t===null?(r=!0,t=""):typeof t=="object"&&(t=t.toString()),this.carriedFromPrevious!==void 0&&(t=`${this.carriedFromPrevious}${t}`,this.carriedFromPrevious=void 0);let s=t.length,n=t.charCodeAt(s-1);!r&&(n===o0||n>=55296&&n<=56319)&&(this.carriedFromPrevious=t[s-1],s--,t=t.slice(0,s));let{stateTable:o}=this;for(this.chunk=t,this.i=0;this.i<s;)o[this.state].call(this);return this.chunkPosition+=s,r?this.end():this}close(){return this.write(null)}getCode10(){let{chunk:t,i:r}=this;if(this.prevI=r,this.i=r+1,r>=t.length)return de;let s=t.charCodeAt(r);if(this.column++,s<55296){if(s>=xw||s===n0)return s;switch(s){case gt:return this.line++,this.column=0,this.positionAtNewLine=this.position,gt;case o0:return t.charCodeAt(r+1)===gt&&(this.i=r+2),this.line++,this.column=0,this.positionAtNewLine=this.position,Rt;default:return this.fail("disallowed character."),s}}if(s>56319)return s>=57344&&s<=65533||this.fail("disallowed character."),s;let n=65536+(s-55296)*1024+(t.charCodeAt(r+1)-56320);return this.i=r+2,n>1114111&&this.fail("disallowed character."),n}getCode11(){let{chunk:t,i:r}=this;if(this.prevI=r,this.i=r+1,r>=t.length)return de;let s=t.charCodeAt(r);if(this.column++,s<55296){if(s>31&&s<127||s>159&&s!==yw||s===n0)return s;switch(s){case gt:return this.line++,this.column=0,this.positionAtNewLine=this.position,gt;case o0:{let o=t.charCodeAt(r+1);(o===gt||o===Ew)&&(this.i=r+2)}case Ew:case yw:return this.line++,this.column=0,this.positionAtNewLine=this.position,Rt;default:return this.fail("disallowed character."),s}}if(s>56319)return s>=57344&&s<=65533||this.fail("disallowed character."),s;let n=65536+(s-55296)*1024+(t.charCodeAt(r+1)-56320);return this.i=r+2,n>1114111&&this.fail("disallowed character."),n}getCodeNorm(){let t=this.getCode();return t===Rt?gt:t}unget(){this.i=this.prevI,this.column--}captureTo(t){let{i:r}=this,{chunk:s}=this;for(;;){let n=this.getCode(),o=n===Rt,i=o?gt:n;if(i===de||t.includes(i))return this.text+=s.slice(r,this.prevI),i;o&&(this.text+=`${s.slice(r,this.prevI)}
`,r=this.i)}}captureToChar(t){let{i:r}=this,{chunk:s}=this;for(;;){let n=this.getCode();switch(n){case Rt:this.text+=`${s.slice(r,this.prevI)}
`,r=this.i,n=gt;break;case de:return this.text+=s.slice(r),!1;default:}if(n===t)return this.text+=s.slice(r,this.prevI),!0}}captureNameChars(){let{chunk:t,i:r}=this;for(;;){let s=this.getCode();if(s===de)return this.name+=t.slice(r),de;if(!lw(s))return this.name+=t.slice(r,this.prevI),s===Rt?gt:s}}skipSpaces(){for(;;){let t=this.getCodeNorm();if(t===de||!We(t))return t}}setXMLVersion(t){this.currentXMLVersion=t,t==="1.0"?(this.isChar=MB,this.getCode=this.getCode10):(this.isChar=NB,this.getCode=this.getCode11)}sBegin(){this.chunk.charCodeAt(0)===65279&&(this.i++,this.column++),this.state=_B}sBeginWhitespace(){let t=this.i,r=this.skipSpaces();switch(this.prevI!==t&&(this.xmlDeclPossible=!1),r){case hr:if(this.state=Kl,this.text.length!==0)throw new Error("no-empty text at start");break;case de:break;default:this.unget(),this.state=Ve,this.xmlDeclPossible=!1}}sDoctype(){var t;let r=this.captureTo(fV);switch(r){case Ce:{(t=this.doctypeHandler)===null||t===void 0||t.call(this,this.text),this.text="",this.state=Ve,this.doctype=!0;break}case de:break;default:this.text+=String.fromCodePoint(r),r===Dw?this.state=As:li(r)&&(this.state=BB,this.q=r)}}sDoctypeQuote(){let t=this.q;this.captureToChar(t)&&(this.text+=String.fromCodePoint(t),this.q=null,this.state=Wl)}sDTD(){let t=this.captureTo(hV);t!==de&&(this.text+=String.fromCodePoint(t),t===ws?this.state=Wl:t===hr?this.state=GB:li(t)&&(this.state=VB,this.q=t))}sDTDQuoted(){let t=this.q;this.captureToChar(t)&&(this.text+=String.fromCodePoint(t),this.state=As,this.q=null)}sDTDOpenWaka(){let t=this.getCodeNorm();switch(this.text+=String.fromCodePoint(t),t){case vw:this.state=XB,this.openWakaBang="";break;case Ne:this.state=jB;break;default:this.state=As}}sDTDOpenWakaBang(){let t=String.fromCodePoint(this.getCodeNorm()),r=this.openWakaBang+=t;this.text+=t,r!=="-"&&(this.state=r==="--"?Jl:As,this.openWakaBang="")}sDTDComment(){this.captureToChar(ci)&&(this.text+="-",this.state=YB)}sDTDCommentEnding(){let t=this.getCodeNorm();this.text+=String.fromCodePoint(t),this.state=t===ci?HB:Jl}sDTDCommentEnded(){let t=this.getCodeNorm();this.text+=String.fromCodePoint(t),t===Ce?this.state=As:(this.fail("malformed comment."),this.state=Jl)}sDTDPI(){this.captureToChar(Ne)&&(this.text+="?",this.state=ZB)}sDTDPIEnding(){let t=this.getCodeNorm();this.text+=String.fromCodePoint(t),t===Ce&&(this.state=As)}sText(){this.tags.length!==0?this.handleTextInRoot():this.handleTextOutsideRoot()}sEntity(){let{i:t}=this,{chunk:r}=this;e:for(;;)switch(this.getCode()){case Rt:this.entity+=`${r.slice(t,this.prevI)}
`,t=this.i;break;case uV:{let{entityReturnState:s}=this,n=this.entity+r.slice(t,this.prevI);this.state=s;let o;n===""?(this.fail("empty entity name."),o="&;"):(o=this.parseEntity(n),this.entity=""),(s!==Ve||this.textHandler!==void 0)&&(this.text+=o);break e}case de:this.entity+=r.slice(t);break e;default:}}sOpenWaka(){let t=this.getCode();if(Cn(t))this.state=oV,this.unget(),this.xmlDeclPossible=!1;else switch(t){case ai:this.state=aV,this.xmlDeclPossible=!1;break;case vw:this.state=UB,this.openWakaBang="",this.xmlDeclPossible=!1;break;case Ne:this.state=eV;break;default:this.fail("disallowed character in tag name"),this.state=Ve,this.xmlDeclPossible=!1}}sOpenWakaBang(){switch(this.openWakaBang+=String.fromCodePoint(this.getCodeNorm()),this.openWakaBang){case"[CDATA[":!this.sawRoot&&!this.reportedTextBeforeRoot&&(this.fail("text data outside of root node."),this.reportedTextBeforeRoot=!0),this.closedRoot&&!this.reportedTextAfterRoot&&(this.fail("text data outside of root node."),this.reportedTextAfterRoot=!0),this.state=e0,this.openWakaBang="";break;case"--":this.state=Ql,this.openWakaBang="";break;case"DOCTYPE":this.state=Wl,(this.doctype||this.sawRoot)&&this.fail("inappropriately located doctype declaration."),this.openWakaBang="";break;default:this.openWakaBang.length>=7&&this.fail("incorrect syntax.")}}sComment(){this.captureToChar(ci)&&(this.state=WB)}sCommentEnding(){var t;let r=this.getCodeNorm();r===ci?(this.state=JB,(t=this.commentHandler)===null||t===void 0||t.call(this,this.text),this.text=""):(this.text+=`-${String.fromCodePoint(r)}`,this.state=Ql)}sCommentEnded(){let t=this.getCodeNorm();t!==Ce?(this.fail("malformed comment."),this.text+=`--${String.fromCodePoint(t)}`,this.state=Ql):this.state=Ve}sCData(){this.captureToChar(ws)&&(this.state=KB)}sCDataEnding(){let t=this.getCodeNorm();t===ws?this.state=QB:(this.text+=`]${String.fromCodePoint(t)}`,this.state=e0)}sCDataEnding2(){var t;let r=this.getCodeNorm();switch(r){case Ce:{(t=this.cdataHandler)===null||t===void 0||t.call(this,this.text),this.text="",this.state=Ve;break}case ws:this.text+="]";break;default:this.text+=`]]${String.fromCodePoint(r)}`,this.state=e0}}sPIFirstChar(){let t=this.getCodeNorm();this.nameStartCheck(t)?(this.piTarget+=String.fromCodePoint(t),this.state=fw):t===Ne||We(t)?(this.fail("processing instruction without a target."),this.state=t===Ne?ii:t0):(this.fail("disallowed character in processing instruction name."),this.piTarget+=String.fromCodePoint(t),this.state=fw)}sPIRest(){let{chunk:t,i:r}=this;for(;;){let s=this.getCodeNorm();if(s===de){this.piTarget+=t.slice(r);return}if(!this.nameCheck(s)){this.piTarget+=t.slice(r,this.prevI);let n=s===Ne;n||We(s)?this.piTarget==="xml"?(this.xmlDeclPossible||this.fail("an XML declaration must be at the start of the document."),this.state=n?$r:hw):this.state=n?ii:t0:(this.fail("disallowed character in processing instruction name."),this.piTarget+=String.fromCodePoint(s));break}}}sPIBody(){if(this.text.length===0){let t=this.getCodeNorm();t===Ne?this.state=ii:We(t)||(this.text=String.fromCodePoint(t))}else this.captureToChar(Ne)&&(this.state=ii)}sPIEnding(){var t;let r=this.getCodeNorm();if(r===Ce){let{piTarget:s}=this;s.toLowerCase()==="xml"&&this.fail("the XML declaration must appear at the start of the document."),(t=this.piHandler)===null||t===void 0||t.call(this,{target:s,body:this.text}),this.piTarget=this.text="",this.state=Ve}else r===Ne?this.text+="?":(this.text+=`?${String.fromCodePoint(r)}`,this.state=t0);this.xmlDeclPossible=!1}sXMLDeclNameStart(){let t=this.skipSpaces();if(t===Ne){this.state=$r;return}t!==de&&(this.state=tV,this.name=String.fromCodePoint(t))}sXMLDeclName(){let t=this.captureTo(pV);if(t===Ne){this.state=$r,this.name+=this.text,this.text="",this.fail("XML declaration is incomplete.");return}if(We(t)||t===bs){if(this.name+=this.text,this.text="",!this.xmlDeclExpects.includes(this.name))switch(this.name.length){case 0:this.fail("did not expect any more name/value pairs.");break;case 1:this.fail(`expected the name ${this.xmlDeclExpects[0]}.`);break;default:this.fail(`expected one of ${this.xmlDeclExpects.join(", ")}`)}this.state=t===bs?pw:rV}}sXMLDeclEq(){let t=this.getCodeNorm();if(t===Ne){this.state=$r,this.fail("XML declaration is incomplete.");return}We(t)||(t!==bs&&this.fail("value required."),this.state=pw)}sXMLDeclValueStart(){let t=this.getCodeNorm();if(t===Ne){this.state=$r,this.fail("XML declaration is incomplete.");return}We(t)||(li(t)?this.q=t:(this.fail("value must be quoted."),this.q=xw),this.state=sV)}sXMLDeclValue(){let t=this.captureTo([this.q,Ne]);if(t===Ne){this.state=$r,this.text="",this.fail("XML declaration is incomplete.");return}if(t===de)return;let r=this.text;switch(this.text="",this.name){case"version":{this.xmlDeclExpects=["encoding","standalone"];let s=r;this.xmlDecl.version=s,/^1\.[0-9]+$/.test(s)?this.opt.forceXMLVersion||this.setXMLVersion(s):this.fail("version number must match /^1\\.[0-9]+$/.");break}case"encoding":/^[A-Za-z][A-Za-z0-9._-]*$/.test(r)||this.fail("encoding value must match /^[A-Za-z0-9][A-Za-z0-9._-]*$/."),this.xmlDeclExpects=["standalone"],this.xmlDecl.encoding=r;break;case"standalone":r!=="yes"&&r!=="no"&&this.fail('standalone value must match "yes" or "no".'),this.xmlDeclExpects=[],this.xmlDecl.standalone=r;break;default:}this.name="",this.state=nV}sXMLDeclSeparator(){let t=this.getCodeNorm();if(t===Ne){this.state=$r;return}We(t)||(this.fail("whitespace required."),this.unget()),this.state=hw}sXMLDeclEnding(){var t;this.getCodeNorm()===Ce?(this.piTarget!=="xml"?this.fail("processing instructions are not allowed before root."):this.name!=="version"&&this.xmlDeclExpects.includes("version")&&this.fail("XML declaration must contain a version."),(t=this.xmldeclHandler)===null||t===void 0||t.call(this,this.xmlDecl),this.name="",this.piTarget=this.text="",this.state=Ve):this.fail("The character ? is disallowed anywhere in XML declarations."),this.xmlDeclPossible=!1}sOpenTag(){var t;let r=this.captureNameChars();if(r===de)return;let s=this.tag={name:this.name,attributes:Object.create(null)};switch(this.name="",this.xmlnsOpt&&(this.topNS=s.ns=Object.create(null)),(t=this.openTagStartHandler)===null||t===void 0||t.call(this,s),this.sawRoot=!0,!this.fragmentOpt&&this.closedRoot&&this.fail("documents may contain only one root."),r){case Ce:this.openTag();break;case ai:this.state=r0;break;default:We(r)||this.fail("disallowed character in tag name."),this.state=$n}}sOpenTagSlash(){this.getCode()===Ce?this.openSelfClosingTag():(this.fail("forward-slash in opening tag not followed by >."),this.state=$n)}sAttrib(){let t=this.skipSpaces();t!==de&&(Cn(t)?(this.unget(),this.state=s0):t===Ce?this.openTag():t===ai?this.state=r0:this.fail("disallowed character in attribute name."))}sAttribName(){let t=this.captureNameChars();t===bs?this.state=dw:We(t)?this.state=iV:t===Ce?(this.fail("attribute without value."),this.pushAttrib(this.name,this.name),this.name=this.text="",this.openTag()):t!==de&&this.fail("disallowed character in attribute name.")}sAttribNameSawWhite(){let t=this.skipSpaces();switch(t){case de:return;case bs:this.state=dw;break;default:this.fail("attribute without value."),this.text="",this.name="",t===Ce?this.openTag():Cn(t)?(this.unget(),this.state=s0):(this.fail("disallowed character in attribute name."),this.state=$n)}}sAttribValue(){let t=this.getCodeNorm();li(t)?(this.q=t,this.state=gw):We(t)||(this.fail("unquoted attribute value."),this.state=mw,this.unget())}sAttribValueQuoted(){let{q:t,chunk:r}=this,{i:s}=this;for(;;)switch(this.getCode()){case t:this.pushAttrib(this.name,this.text+r.slice(s,this.prevI)),this.name=this.text="",this.q=null,this.state=cV;return;case Rn:this.text+=r.slice(s,this.prevI),this.state=oi,this.entityReturnState=gw;return;case gt:case Rt:case n0:this.text+=`${r.slice(s,this.prevI)} `,s=this.i;break;case hr:this.text+=r.slice(s,this.prevI),this.fail("disallowed character.");return;case de:this.text+=r.slice(s);return;default:}}sAttribValueClosed(){let t=this.getCodeNorm();We(t)?this.state=$n:t===Ce?this.openTag():t===ai?this.state=r0:Cn(t)?(this.fail("no whitespace between attributes."),this.unget(),this.state=s0):this.fail("disallowed character in attribute name.")}sAttribValueUnquoted(){let t=this.captureTo(dV);switch(t){case Rn:this.state=oi,this.entityReturnState=mw;break;case hr:this.fail("disallowed character.");break;case de:break;default:this.text.includes("]]>")&&this.fail('the string "]]>" is disallowed in char data.'),this.pushAttrib(this.name,this.text),this.name=this.text="",t===Ce?this.openTag():this.state=$n}}sCloseTag(){let t=this.captureNameChars();t===Ce?this.closeTag():We(t)?this.state=lV:t!==de&&this.fail("disallowed character in closing tag.")}sCloseTagSawWhite(){switch(this.skipSpaces()){case Ce:this.closeTag();break;case de:break;default:this.fail("disallowed character in closing tag.")}}handleTextInRoot(){let{i:t,forbiddenState:r}=this,{chunk:s,textHandler:n}=this;e:for(;;)switch(this.getCode()){case hr:{if(this.state=Kl,n!==void 0){let{text:o}=this,i=s.slice(t,this.prevI);o.length!==0?(n(o+i),this.text=""):i.length!==0&&n(i)}r=Rr;break e}case Rn:this.state=oi,this.entityReturnState=Ve,n!==void 0&&(this.text+=s.slice(t,this.prevI)),r=Rr;break e;case ws:switch(r){case Rr:r=Aw;break;case Aw:r=i0;break;case i0:break;default:throw new Error("impossible state")}break;case Ce:r===i0&&this.fail('the string "]]>" is disallowed in char data.'),r=Rr;break;case Rt:n!==void 0&&(this.text+=`${s.slice(t,this.prevI)}
`),t=this.i,r=Rr;break;case de:n!==void 0&&(this.text+=s.slice(t));break e;default:r=Rr}this.forbiddenState=r}handleTextOutsideRoot(){let{i:t}=this,{chunk:r,textHandler:s}=this,n=!1;e:for(;;){let o=this.getCode();switch(o){case hr:{if(this.state=Kl,s!==void 0){let{text:i}=this,c=r.slice(t,this.prevI);i.length!==0?(s(i+c),this.text=""):c.length!==0&&s(c)}break e}case Rn:this.state=oi,this.entityReturnState=Ve,s!==void 0&&(this.text+=r.slice(t,this.prevI)),n=!0;break e;case Rt:s!==void 0&&(this.text+=`${r.slice(t,this.prevI)}
`),t=this.i;break;case de:s!==void 0&&(this.text+=r.slice(t));break e;default:We(o)||(n=!0)}}n&&(!this.sawRoot&&!this.reportedTextBeforeRoot&&(this.fail("text data outside of root node."),this.reportedTextBeforeRoot=!0),this.closedRoot&&!this.reportedTextAfterRoot&&(this.fail("text data outside of root node."),this.reportedTextAfterRoot=!0))}pushAttribNS(t,r){var s;let{prefix:n,local:o}=this.qname(t),i={name:t,prefix:n,local:o,value:r};if(this.attribList.push(i),(s=this.attributeHandler)===null||s===void 0||s.call(this,i),n==="xmlns"){let c=r.trim();this.currentXMLVersion==="1.0"&&c===""&&this.fail("invalid attempt to undefine prefix in XML 1.0"),this.topNS[o]=c,c0(this,o,c)}else if(t==="xmlns"){let c=r.trim();this.topNS[""]=c,c0(this,"",c)}}pushAttribPlain(t,r){var s;let n={name:t,value:r};this.attribList.push(n),(s=this.attributeHandler)===null||s===void 0||s.call(this,n)}end(){var t,r;this.sawRoot||this.fail("document must contain a root element.");let{tags:s}=this;for(;s.length>0;){let o=s.pop();this.fail(`unclosed tag: ${o.name}`)}this.state!==uw&&this.state!==Ve&&this.fail("unexpected end.");let{text:n}=this;return n.length!==0&&((t=this.textHandler)===null||t===void 0||t.call(this,n),this.text=""),this._closed=!0,(r=this.endHandler)===null||r===void 0||r.call(this),this._init(),this}resolve(t){var r,s;let n=this.topNS[t];if(n!==void 0)return n;let{tags:o}=this;for(let i=o.length-1;i>=0;i--)if(n=o[i].ns[t],n!==void 0)return n;return n=this.ns[t],n!==void 0?n:(s=(r=this.opt).resolvePrefix)===null||s===void 0?void 0:s.call(r,t)}qname(t){let r=t.indexOf(":");if(r===-1)return{prefix:"",local:t};let s=t.slice(r+1),n=t.slice(0,r);return(n===""||s===""||s.includes(":"))&&this.fail(`malformed name: ${t}.`),{prefix:n,local:s}}processAttribsNS(){var t;let{attribList:r}=this,s=this.tag;{let{prefix:i,local:c}=this.qname(s.name);s.prefix=i,s.local=c;let a=s.uri=(t=this.resolve(i))!==null&&t!==void 0?t:"";i!==""&&(i==="xmlns"&&this.fail('tags may not have "xmlns" as prefix.'),a===""&&(this.fail(`unbound namespace prefix: ${JSON.stringify(i)}.`),s.uri=i))}if(r.length===0)return;let{attributes:n}=s,o=new Set;for(let i of r){let{name:c,prefix:a,local:l}=i,u,h;a===""?(u=c==="xmlns"?qs:"",h=c):(u=this.resolve(a),u===void 0&&(this.fail(`unbound namespace prefix: ${JSON.stringify(a)}.`),u=a),h=`{${u}}${l}`),o.has(h)&&this.fail(`duplicate attribute: ${h}.`),o.add(h),i.uri=u,n[c]=i}this.attribList=[]}processAttribsPlain(){let{attribList:t}=this,r=this.tag.attributes;for(let{name:s,value:n}of t)r[s]!==void 0&&this.fail(`duplicate attribute: ${s}.`),r[s]=n;this.attribList=[]}openTag(){var t;this.processAttribs();let{tags:r}=this,s=this.tag;s.isSelfClosing=!1,(t=this.openTagHandler)===null||t===void 0||t.call(this,s),r.push(s),this.state=Ve,this.name=""}openSelfClosingTag(){var t,r,s;this.processAttribs();let{tags:n}=this,o=this.tag;o.isSelfClosing=!0,(t=this.openTagHandler)===null||t===void 0||t.call(this,o),(r=this.closeTagHandler)===null||r===void 0||r.call(this,o),(this.tag=(s=n[n.length-1])!==null&&s!==void 0?s:null)===null&&(this.closedRoot=!0),this.state=Ve,this.name=""}closeTag(){let{tags:t,name:r}=this;if(this.state=Ve,this.name="",r===""){this.fail("weird empty close tag."),this.text+="</>";return}let s=this.closeTagHandler,n=t.length;for(;n-- >0;){let o=this.tag=t.pop();if(this.topNS=o.ns,s?.(o),o.name===r)break;this.fail("unexpected close tag.")}n===0?this.closedRoot=!0:n<0&&(this.fail(`unmatched closing tag: ${r}.`),this.text+=`</${r}>`)}parseEntity(t){if(t[0]!=="#"){let s=this.ENTITIES[t];return s!==void 0?s:(this.fail(this.isName(t)?"undefined entity.":"disallowed character in entity name."),`&${t};`)}let r=NaN;return t[1]==="x"&&/^#x[0-9a-f]+$/i.test(t)?r=parseInt(t.slice(2),16):/^#[0-9]+$/.test(t)&&(r=parseInt(t.slice(1),10)),this.isChar(r)?String.fromCodePoint(r):(this.fail("malformed character entity."),`&${t};`)}};fi.SaxesParser=a0});var $w=m((Sse,Cw)=>{var vV=e=>{let t={type:"mesh"};return t.objects=[],t},EV=e=>{let t={type:"vertices"};return t.objects=[],t},yV=e=>{let t={type:"coordinates"};return t.objects=[],t},AV=e=>{let t={type:"normal"};return t.objects=[],t},bV=e=>({type:"x",value:"0"}),wV=e=>({type:"y",value:"0"}),qV=e=>({type:"z",value:"0"}),SV=e=>{let t={type:"volume"};return e.materialid&&(t.materialid=e.materialid),t.objects=[],t},DV=e=>{let t={type:"triangle"};return t.objects=[],t},TV=e=>({type:"v1",value:"0"}),CV=e=>({type:"v2",value:"0"}),$V=e=>({type:"v3",value:"0"}),RV=e=>{let t={type:"vertex"};return t.objects=[],t},IV=e=>{let t={type:"edge"};return t.objects=[],t},MV=e=>{let t={type:"metadata"};return e.type&&(t.mtype=e.type),e.id&&(t.id=e.id),t},FV=e=>{let t={type:"material"};return e.id&&(t.id=e.id),t.objects=[],t},NV=e=>{let t={type:"color"};return t.objects=[],t},PV=e=>({type:"r",value:"1"}),kV=e=>({type:"g",value:"1"}),OV=e=>({type:"b",value:"1"}),LV=e=>({type:"a",value:"1"}),zV=e=>{let t={type:"map"};return e.gtexid&&(t.gtexid=e.gtexid),e.btexid&&(t.btexid=e.btexid),e.rtexid&&(t.rtexid=e.rtexid),t.objects=[],t},_V=e=>({type:"u1",value:"0"}),BV=e=>({type:"u2",value:"0"}),VV=e=>({type:"u3",value:"0"});Cw.exports={amfMesh:vV,amfVertices:EV,amfCoordinates:yV,amfX:bV,amfY:wV,amfZ:qV,amfNormal:AV,amfVolume:SV,amfTriangle:DV,amfV1:TV,amfV2:CV,amfV3:$V,amfVertex:RV,amfEdge:IV,amfMetadata:MV,amfMaterial:FV,amfColor:NV,amfR:PV,amfG:kV,amfB:OV,amfA:LV,amfMap:zV,amfU1:_V,amfU2:BV,amfU3:VV}});var pi=m((Dse,Rw)=>{var GV=25.4000508001016;Rw.exports={inchMM:GV}});var p0=m((Tse,_w)=>{var XV=hi(),{amfMesh:YV,amfVertices:HV,amfCoordinates:jV,amfX:Iw,amfY:Mw,amfZ:Fw,amfNormal:ZV,amfVolume:UV,amfTriangle:WV,amfV1:Nw,amfV2:Pw,amfV3:kw,amfVertex:JV,amfEdge:KV,amfMetadata:QV,amfMaterial:eG,amfColor:tG,amfR:rG,amfG:sG,amfB:nG,amfA:oG,amfMap:Ow,amfU1:u0,amfU2:f0,amfU3:h0}=$w(),{inchMM:Lw}=pi(),di=null,ge=0,It=[],Yt=[],iG=[],cG=[],zw=null,aG=e=>{let t={type:"amf",unit:"mm",scale:1};switch(e.unit&&(t.unit=e.unit.toLowerCase()),t.unit.toLowerCase()){case"inch":t.scale=Lw;break;case"foot":t.scale=Lw*12;break;case"meter":t.scale=1e3;break;case"micron":t.scale=.001;break;case"millimeter":default:break}return t.objects=[],t},lG=e=>{let t={type:"object",id:`JSCAD${It.length}`};return e.id&&(t.id=e.id),t.objects=[],t},uG=(e,t)=>{let r=new XV.SaxesParser;r.on("error",s=>{console.log(`ERROR: AMF file line ${s.line}, column ${s.column}, bad character [${s.c}]`)}),r.on("opentag",s=>{let n={AMF:aG,OBJECT:c=>{let a=lG(c);return ge===0&&(ge=1),a},MESH:YV,VERTICES:HV,VERTEX:JV,EDGE:KV,VOLUME:UV,MATERIAL:c=>{let a=eG(c);return ge===0&&(ge=2),a},TEXTURE:c=>{ge===0&&(ge=3)},CONSTELLATION:c=>{ge===0&&(ge=4)},METADATA:c=>{let a=QV(c);return ge===0&&(ge=5),a},COORDINATES:jV,NORMAL:ZV,NX:Iw,X:Iw,NY:Mw,Y:Mw,NZ:Fw,Z:Fw,TRIANGLE:WV,V1:Nw,VTEX1:Nw,V2:Pw,VTEX2:Pw,V3:kw,VTEX3:kw,COLOR:tG,R:rG,G:sG,B:nG,A:oG,MAP:Ow,TEXMAP:Ow,U1:u0,UTEX1:u0,WTEX1:u0,U2:f0,UTEX2:f0,WTEX2:f0,U3:h0,UTEX3:h0,WTEX3:h0,COMPOSITE:()=>{},undefined:()=>console.log(`WARNING: unsupported AMF element: ${s.name}`)},o=s.name.toUpperCase(),i=n[o]?n[o](s.attributes,{amfObjects:It}):null;if(i){switch(ge){case 0:"objects"in i&&It.push(i);break;case 1:if(It.length>0){let c=It.pop();"objects"in c&&c.objects.push(i),It.push(c),"objects"in i&&It.push(i)}break;case 2:if(i.type==="material")Yt.push(i);else if(Yt.length>0){let c=Yt.pop();"objects"in c&&c.objects.push(i),Yt.push(c),"objects"in i&&Yt.push(i)}break;case 3:break;case 4:break;case 5:break;default:console.log("WARNING: invalid AMF definition");break}di=i}}),r.on("closetag",s=>{switch(s.name.toUpperCase()){case"AMF":case"OBJECT":case"MESH":case"VERTICES":case"VERTEX":case"EDGE":case"COORDINATES":case"NORMAL":case"VOLUME":case"TRIANGLE":case"MATERIAL":case"COLOR":case"MAP":case"TEXMAP":break;case"TEXTURE":ge===3&&(ge=0);return;case"CONSTELLATION":ge===4&&(ge=0);return;case"METADATA":ge===5&&(ge=0);return;default:return}let o=null;switch(ge){case 0:case 1:It.length>0&&(o=It.pop(),o.type==="object"&&(ge=0)),It.length===0&&(zw=o);break;case 2:Yt.length>0&&(o=Yt.pop(),o.type==="material"&&(Yt.push(o),ge=0));break;case 3:ge=0;break;case 4:ge=0;break;case 5:ge=0;break;default:break}}),r.on("text",s=>{s!==null&&(s=s.trim(),s.length>0&&di&&ge!==0&&(di.value=s,di=null))}),r.on("end",()=>{}),r.write(e).close()},fG=(e,t)=>(uG(e,t),{amfObj:zw,amfMaterials:Yt,amfTextures:iG,amfConstels:cG});_w.exports=fG});var Vw=m((Cse,Bw)=>{var hG=Yl(),pG=p0(),dG=(e,t)=>{let r={pxPmm:pi().pxPmm};e=Object.assign({},r,e);let{version:s,pxPmm:n,addMetaData:o,filename:i}=e;e&&e.statusCallback&&e.statusCallback({progress:0});let{amfObj:c,amfMaterials:a,amfTextures:l,amfConstels:u}=pG(t,n),h=o?`//
// Produced by JSCAD IO Library : AMF Deserializer (${s})
// date: ${new Date}
// source: ${i}
//
`:"";if(!c)throw new Error("AMF parsing failed, no valid AMF data retrieved");return e&&e.statusCallback&&e.statusCallback({progress:50}),h+=gG(c,{amfMaterials:a,amfTextures:l,amfConstels:u}),e&&e.statusCallback&&e.statusCallback({progress:100}),h},gG=(e,t)=>{if(e.type!=="amf"||!e.objects)throw new Error("AMF parsing failed, malformed");let r="",s=e.objects,n=t.amfMaterials,o=(i,c)=>{switch(i.type){case"object":r+=hG(i,c,t,{instantiate:!1,scale:e.scale});break;case"metadata":break;case"material":break;default:console.log("WARNING: unknown object type: "+i.type);break}};r=`// Objects  : ${s.length}
// Materials: ${n.length}
// Scale    : ${e.scale} from Units (${e.unit})

const {colors, geometries, transforms} = require('@jscad/modeling')

const main = () => {
  let objects = []
`;for(let i=0;i<s.length;i++){let c=s[i];c.type==="object"&&(r+=`  objects.push(createObject${c.id}())
`)}return r+=`  return objects
}
`,s.forEach(o),r+=`module.exports = {main}
`,r};Bw.exports=dG});var Xw=m(($se,Gw)=>{var mG=Yl(),xG=p0(),vG=(e,t)=>{let r={pxPmm:pi().pxPmm};e=Object.assign({},r,e);let{pxPmm:s}=e,{amfObj:n,amfMaterials:o,amfTextures:i,amfConstels:c}=xG(t,s);if(!n)throw new Error("AMF parsing failed, no valid AMF data retrieved");return EG(n,{amfMaterials:o,amfTextures:i,amfConstels:c})},EG=(e,t)=>e.objects.filter(s=>s.type==="object").map((s,n)=>mG(s,n,t,{amf:e,instantiate:!0}));Gw.exports=vG});var Hw=m((Rse,Yw)=>{var yG=Ub().version,AG=Vw(),bG=Xw(),wG=(e,t)=>(e=Object.assign({},{filename:"amf",output:"script",version:yG,addMetaData:!0},e),e.output==="script"?AG(e,t):bG(e,t)),qG="amf";Yw.exports={deserialize:wG,extension:qG}});var jw=m((Ise,SG)=>{SG.exports={name:"@jscad/dxf-deserializer",version:"2.3.20",description:"DXF Deserializer for JSCAD",homepage:"https://openjscad.xyz/",repository:"https://github.com/jscad/OpenJSCAD.org",main:"index.js",scripts:{coverage:"nyc --all --reporter=html --reporter=text npm test",test:"ava --verbose --timeout 2m './tests/test*.js'"},contributors:[{name:"z3dev",url:"http://www.z3d.jp"},{name:"Mark 'kaosat-dev' Moissette",url:"http://kaosat.net"}],keywords:["openjscad","jscad","import","deserializer","dxf"],license:"MIT",dependencies:{"@jscad/modeling":"2.11.0"},devDependencies:{ava:"3.15.0",nyc:"15.1.0"},gitHead:"5899622c5ffc640001da7261d7c06a1223064ccc"}});var d0=m((Mse,Zw)=>{var DG=[[0,"etyp"],[1,"text"],[2,"name"],[3,"nam1"],[5,"hdle"],[6,"ltyp"],[7,"lsty"],[8,"lnam"],[9,"vari"],[10,"pptx"],[11,"sptx"],[12,"tptx"],[13,"fptx"],[20,"ppty"],[21,"spty"],[22,"tpty"],[23,"fpty"],[30,"pptz"],[31,"sptz"],[32,"tptz"],[33,"fptz"],[38,"elev"],[39,"lthk"],[40,"swid"],[41,"ewid"],[42,"bulg"],[43,"cwid"],[48,"lscl"],[50,"ang0"],[51,"ang1"],[60,"visb"],[62,"cnmb"],[67,"spac"],[70,"lflg"],[71,"fvia"],[72,"fvib"],[73,"fvic"],[74,"fvid"],[75,"cflg"],[90,"vlen"],[91,"slen"],[92,"plen"],[93,"flen"],[94,"elen"],[95,"clen"],[100,"sbnm"],[210,"etrx"],[220,"etry"],[230,"etrz"]],TG=new Map(DG),CG=e=>TG.get(e),$G=[[0,"none"],[1,"inches"],[2,"feet"],[3,"miles"],[4,"millimeters"],[5,"centimeters"],[6,"meters"],[7,"kilometers"],[8,"microinches"],[9,"mils"],[10,"yards"],[11,"angstroms"],[12,"nanometers"],[13,"microns"],[14,"decimeters"],[15,"dekameters"],[16,"hectometers"],[17,"gigameters"],[18,"astrounits"],[19,"lightyears"],[20,"parsecs"]],RG=0,IG=256;Zw.exports={drawingUnits:$G,BYBLOCK:RG,BYLAYER:IG,getTLA:CG}});var Ww=m((Fse,Uw)=>{var MG=[[0,0,0,255],[255,0,0,255],[255,255,0,255],[0,255,0,255],[0,255,255,255],[0,0,255,255],[255,0,255,255],[255,255,255,255],[128,128,128,255],[192,192,192,255],[255,0,0,255],[255,127,127,255],[165,0,0,255],[165,82,82,255],[127,0,0,255],[127,63,63,255],[76,0,0,255],[76,38,38,255],[38,0,0,255],[38,19,19,255],[255,63,0,255],[255,159,127,255],[165,41,0,255],[165,103,82,255],[127,31,0,255],[127,79,63,255],[76,19,0,255],[76,47,38,255],[38,9,0,255],[38,28,19,255],[255,127,0,255],[255,191,127,255],[165,82,0,255],[165,124,82,255],[127,63,0,255],[127,95,63,255],[76,38,0,255],[76,57,38,255],[38,19,0,255],[38,28,19,255],[255,191,0,255],[255,223,127,255],[165,124,0,255],[165,145,82,255],[127,95,0,255],[127,111,63,255],[76,57,0,255],[76,66,38,255],[38,28,0,255],[38,33,19,255],[255,255,0,255],[255,255,127,255],[165,165,0,255],[165,165,82,255],[127,127,0,255],[127,127,63,255],[76,76,0,255],[76,76,38,255],[38,38,0,255],[38,38,19,255],[191,255,0,255],[223,255,127,255],[124,165,0,255],[145,165,82,255],[95,127,0,255],[111,127,63,255],[57,76,0,255],[66,76,38,255],[28,38,0,255],[33,38,19,255],[127,255,0,255],[191,255,127,255],[82,165,0,255],[124,165,82,255],[63,127,0,255],[95,127,63,255],[38,76,0,255],[57,76,38,255],[19,38,0,255],[28,38,19,255],[63,255,0,255],[159,255,127,255],[41,165,0,255],[103,165,82,255],[31,127,0,255],[79,127,63,255],[19,76,0,255],[47,76,38,255],[9,38,0,255],[23,38,19,255],[0,255,0,255],[125,255,127,255],[0,165,0,255],[82,165,82,255],[0,127,0,255],[63,127,63,255],[0,76,0,255],[38,76,38,255],[0,38,0,255],[19,38,19,255],[0,255,63,255],[127,255,159,255],[0,165,41,255],[82,165,103,255],[0,127,31,255],[63,127,79,255],[0,76,19,255],[38,76,47,255],[0,38,9,255],[19,88,23,255],[0,255,127,255],[127,255,191,255],[0,165,82,255],[82,165,124,255],[0,127,63,255],[63,127,95,255],[0,76,38,255],[38,76,57,255],[0,38,19,255],[19,88,28,255],[0,255,191,255],[127,255,223,255],[0,165,124,255],[82,165,145,255],[0,127,95,255],[63,127,111,255],[0,76,57,255],[38,76,66,255],[0,38,28,255],[19,88,88,255],[0,255,255,255],[127,255,255,255],[0,165,165,255],[82,165,165,255],[0,127,127,255],[63,127,127,255],[0,76,76,255],[38,76,76,255],[0,38,38,255],[19,88,88,255],[0,191,255,255],[127,223,255,255],[0,124,165,255],[82,145,165,255],[0,95,127,255],[63,111,217,255],[0,57,76,255],[38,66,126,255],[0,28,38,255],[19,88,88,255],[0,127,255,255],[127,191,255,255],[0,82,165,255],[82,124,165,255],[0,63,127,255],[63,95,127,255],[0,38,76,255],[38,57,126,255],[0,19,38,255],[19,28,88,255],[0,63,255,255],[127,159,255,255],[0,41,165,255],[82,103,165,255],[0,31,127,255],[63,79,127,255],[0,19,76,255],[38,47,126,255],[0,9,38,255],[19,23,88,255],[0,0,255,255],[127,127,255,255],[0,0,165,255],[82,82,165,255],[0,0,127,255],[63,63,127,255],[0,0,76,255],[38,38,126,255],[0,0,38,255],[19,19,88,255],[63,0,255,255],[159,127,255,255],[41,0,165,255],[103,82,165,255],[31,0,127,255],[79,63,127,255],[19,0,76,255],[47,38,126,255],[9,0,38,255],[23,19,88,255],[127,0,255,255],[191,127,255,255],[165,0,82,255],[124,82,165,255],[63,0,127,255],[95,63,127,255],[38,0,76,255],[57,38,126,255],[19,0,38,255],[28,19,88,255],[191,0,255,255],[223,127,255,255],[124,0,165,255],[142,82,165,255],[95,0,127,255],[111,63,127,255],[57,0,76,255],[66,38,76,255],[28,0,38,255],[88,19,88,255],[255,0,255,255],[255,127,255,255],[165,0,165,255],[165,82,165,255],[127,0,127,255],[127,63,127,255],[76,0,76,255],[76,38,76,255],[38,0,38,255],[88,19,88,255],[255,0,191,255],[255,127,223,255],[165,0,124,255],[165,82,145,255],[127,0,95,255],[127,63,111,255],[76,0,57,255],[76,38,66,255],[38,0,28,255],[88,19,88,255],[255,0,127,255],[255,127,191,255],[165,0,82,255],[165,82,124,255],[127,0,63,255],[127,63,95,255],[76,0,38,255],[76,38,57,255],[38,0,19,255],[88,19,28,255],[255,0,63,255],[255,127,159,255],[165,0,41,255],[165,82,103,255],[127,0,31,255],[127,63,79,255],[76,0,19,255],[76,38,47,255],[38,0,9,255],[88,19,23,255],[0,0,0,255],[101,101,101,255],[102,102,102,255],[153,153,153,255],[204,204,204,255],[255,255,255,255]];Uw.exports=MG});var Jw=m(gi=>{(function(e){e.reader=function(f){return new t(f)},e.STATES=["start","end","error"];function t(f){let d=this;d.options=f||{},d.trackPosition=d.options.track!==!1,d.trackPosition&&(d.line=d.column=d.c=0)}t.prototype={on:function(f,d){let g=this;g["on"+f]=d},absorb:function(f,d){this.absorbers===void 0&&(this.absorbers=new Map),this.absorbers.set(f,d)},write:function(f){let d=this;return c(d,f),d},close:function(){let f=this;return f.isclosed=!0,f}};let r=f=>i(f,"onstart",f.data),s=(f,d,g)=>{if(f.absorbers!==void 0){let p=f.absorbers.get(d);p!==void 0&&p(f,d,g)}},n=(f,d)=>(f.trackPosition&&(d+=`
Line: ${f.line}
Column: ${f.column}
Char: ${f.c}`),d=new Error(d),f.error=d,i(f,"onerror",d)),o=f=>i(f,"onend",f.data),i=(f,d,g)=>{let p=d.toString();return f[p]&&f[p](f,g),f},c=(f,d)=>{if(f.error)throw f.error;if(f.isclosed)return n(f,"Cannot write after close");if(r(f),d===null)return o(f);f.group=null,f.value=null,f.error=null,f.position=0,f.line=0,f.column=0;let g=0,p="",x="";for(;f.error===null&&(p=h(d,g++),!!p);)f.trackPosition&&(f.position++,p===`
`?(f.line++,f.column=0):f.column++),p===`
`?(a(f,x),x=""):x+=p;return o(f),f},a=(f,d)=>{d=d.trim(),f.group===null?(l(f,d),f.value=null):u(f,d),f.group!==null&&f.value!==null&&(s(f,f.group,f.value),f.group=null,f.value=null)},l=(f,d)=>{let g=parseInt(d);isNaN(g)?(n(f,"Invalid group (int)"),f.group=null):f.group=g},u=(f,d)=>{f.options.strict,f.value=d},h=(f,d)=>f&&f.length>d?f.charAt(d):""})(typeof gi>"u"?gi.dxf={}:gi)});var g0=m((Pse,Qw)=>{var{BYBLOCK:FG,BYLAYER:NG}=d0(),Kw=(e,t)=>{let r=e.lnam||"0";for(let s of t)if(s.name===r)return s;return null},PG=(e,t)=>{let r=e.cnmb||-1;if(r===NG){r=-1;let s=Kw(e,t);s!==null&&(r=s.cnmb||-1)}return r},kG=(e,t)=>{let r=e%t;return Math.floor(r>=0?r:r+t)},OG=(e,t)=>{if(e<1)return null;e=kG(e,t.length);let r=t[e];return[r[0]/255,r[1]/255,r[2]/255,r[3]/255]};Qw.exports={findLayer:Kw,getColor:OG,getColorNumber:PG}});var v0=m((kse,sq)=>{var{geometries:Me,maths:ve,primitives:Ir}=ue(),LG=1e-5,{getColor:m0,getColorNumber:x0}=g0(),tq=(e,t,r)=>{let s=[];if(s.push(ve.vec3.fromValues(e.pptx,e.ppty,e.pptz)),s.push(ve.vec3.fromValues(e.sptx,e.spty,e.sptz)),s.push(ve.vec3.fromValues(e.tptx,e.tpty,e.tptz)),e.fptx){let c=!1;e.tptx!==e.fptx&&(c=!0),e.tpty!==e.fpty&&(c=!0),e.tptz!==e.fptz&&(c=!0),c&&s.push(ve.vec3.fromValues(e.fptx,e.fpty,e.fptz))}let n=x0(e,t),o=m0(n,r.colorindex),i=Me.poly3.create(s);return o&&(i.color=o),i},zG=(e,t,r)=>{if(e.pptz===e.sptz&&e.pptz===0){let o=ve.vec2.fromValues(e.pptx,e.ppty),i=ve.vec2.fromValues(e.sptx,e.spty);return Ir.line([o,i])}let s=ve.vec3.fromValues(e.pptx,e.ppty,e.pptz),n=ve.vec3.fromValues(e.sptx,e.spty,e.sptz);return Ir.line([s,n])},rq=e=>{let t=parseInt("00000000000100000",2),r=parseInt("00000000001000000",2),s=parseInt("00000000010000000",2),n=e.lflg,o={};return(n&t)===t||(n&r)===r?o.vec=ve.vec3.fromValues(e.pptx,e.ppty,e.pptz):(n&s)===s?(o.vec=ve.vec3.fromValues(e.pptx,e.ppty,e.pptz),o.fvia=e.fvia,o.fvib=e.fvib,o.fvic=e.fvic,o.fvid=e.fvid):(o.vec=ve.vec2.fromValues(e.pptx,e.ppty),o.bulg=e.bulg),o},eq=(e,t,r,s)=>{if(s===0)e=Me.path2.appendPoints([[t,r]],e);else{let n=Me.path2.toPoints(e),o=n[n.length-1],i=ve.vec2.fromValues(t,r),a=ve.vec2.distance(o,i)*((1+Math.pow(s,2))/(4*s)),l=s<0,u=!1,h=Math.atan(s)*4,f=16;e=Me.path2.appendArc({endpoint:[t,r],radius:[a,a],xaxisrotation:h,clockwise:l,large:u,segments:f},e)}return e},_G=(e,t,r)=>{let s=parseInt("00000000000000001",2),n=e.vlen,o=e.pptxs,i=e.pptys,c=e.bulgs,a=e.lflg,l=Me.path2.create(),u=(a&s)===s;if(n===o.length&&n===i.length&&n===c.length)o.forEach((h,f,d)=>{let g=0;f>0&&(g=c[f-1]),l=eq(l,o[f],i[f],g)});else return l;return u&&!l.isClosed&&(l=eq(l,o[0],i[0],c[n-1]),l=Me.path2.close(l)),l},BG=(e,t,r)=>{let s=e.lthk,n=e.pptx,o=e.ppty,i=e.swid,c=e.ang0;c=c*.017453292519943295;let a=e.ang1;a=a*.017453292519943295;let l=16;return s===0?Ir.arc({center:[n,o],radius:i,startAngle:c,endAngle:a,segments:l}):Ir.arc({center:[n,o],radius:i,startAngle:c,endAngle:a,segments:l})},VG=(e,t,r)=>{let s=e.lthk,n=e.pptx,o=e.ppty,i=e.swid,c=x0(e,t),a=m0(c,r.colorindex),l=16;if(s===0){let f=Ir.circle({center:[n,o],radius:i,segments:l});return a&&(f.color=a),f}let h=Ir.circle({center:[n,o],radius:i,segments:l}).extrude({offset:[0,0,s]});return a&&(h.color=a),h},GG=(e,t,r)=>{let s=e.pptx,n=e.ppty,o=e.pptz,i=e.sptx,c=e.spty,a=e.sptz,l=e.swid,u=16;if(o===0&&a===0){let h=ve.vec2.fromValues(0,0),f=ve.vec2.fromValues(i,c),d=ve.vec2.distance(h,f),g=d*l,p=Math.atan2(c,i)*180/Math.PI;p<LG&&(p=0),p=p*.017453292519943295;let x=Ir.ellipse({center:[0,0],radius:[d,g],segments:u}),v=ve.mat4.fromZRotation(ve.mat4.create(),p);return ve.mat4.multiply(v,v,ve.mat4.fromTranslation(ve.mat4.create(),[s,n,0])),Me.geom2.transform(v,x)}},XG=e=>{let t=[],r=0;for(;r<e.length;){let s=e[r++],n=[];for(;s>0;)n.push(e[r++]),s--;t.push(n)}return t},YG=(e,t,r)=>{let s=[],n=0;for(;n<e.length;){let o=e[n],i=t[n],c=r[n];s.push([o,i,c]),n++}return s},HG=(e,t,r)=>{let s=e.vlen,n=e.pptxs,o=e.pptys,i=e.pptzs,c=e.flen,a=e.fvals,l=x0(e,t),u=m0(l,r.colorindex),h=[];if(s===n.length&&s===o.length&&s===i.length&&c===a.length){let f=XG(a),d=YG(n,o,i),g=0;for(;g<f.length;){let p=f[g],x=[],v=0;for(;v<p.length;){let b=p[v],E=ve.vec3.clone(d[b]);x.push(E),v++}r.dxf.angdir===1&&(x=x.reverse());let y=Me.poly3.create(x);u&&(y.color=u),h.push(y),g++}}return Me.geom3.create(h)},jG=e=>{let t=parseInt("00000000000000001",2),r=parseInt("00000000000001000",2),s=parseInt("00000000000010000",2),n=parseInt("00000000000100000",2),o=parseInt("00000000001000000",2),i=e.lflg,c=null;return(i&r)===r?c=null:(i&s)===s||(i&o)===o?(c=Me.geom3.create(),c.closedM=(i&t)===t,c.closedN=(i&n)===n):(c=Me.path2.create(),c.closedM=(i&t)===t),"cnmb"in e&&(c.cnmb=e.cnmb),c},mt=(e,t,r,s,n)=>{if(Me.path2.isA(t)){let o=s.map(i=>i.vec);e.push(Me.path2.fromPoints({closed:t.closed},o))}return Me.geom3.isA(t)&&e.push(Me.geom3.create(r)),null},ZG=(e,t)=>{let r=[],s=null,n=[],o=[],i=[],c=null;for(let a of e.objstack)if(c=null,"type"in a){switch(a.type){case"dxf":break;case"layer":s=mt(o,s,n,i,t),r.push(a);break;case"variable":s=mt(o,s,n,i,t);break;case"3dface":c=tq(a,r,t),s===null&&(s=Me.geom3.create());break;case"mesh":s=mt(o,s,n,i,t),o.push(HG(a,r,t));break;case"arc":s=mt(o,s,n,i,t),o.push(BG(a,r,t));break;case"circle":s=mt(o,s,n,i,t),o.push(VG(a,r,t));break;case"ellipse":s=mt(o,s,n,i,t),o.push(GG(a,r,t));break;case"line":s=mt(o,s,n,i,t),o.push(zG(a,r,t));break;case"polyline":s=mt(o,s,n,i,t),s===null&&(s=jG(a));break;case"vertex":c=rq(a);break;case"seqend":s=mt(o,s,n,i,t);break;case"lwpolyline":s=mt(o,s,n,i,t),o.push(_G(a,r,t));break;default:break}Me.poly3.isA(c)&&n.push(c),c&&"vec"in c&&c.vec.length===3&&i.push(c),c&&"vec"in c&&c.vec.length===2&&i.push(c)}return s=mt(o,s,n,i,t),o};sq.exports={instantiatePolygon:tq,instantiateVector:rq,instantiateAsciiDxf:ZG}});var lq=m((Ose,aq)=>{var{maths:vt,geometries:Ds}=ue(),{instantiatePolygon:UG,instantiateVector:WG}=v0(),{findLayer:JG,getColor:Mr,getColorNumber:Fr}=g0(),nq=e=>`${e[0]},${e[1]}`,E0=e=>`${e[0]},${e[1]},${e[2]}`,iq=e=>{let t=Ds.poly3.toPoints(e),r="createPolygon([";return t.forEach(s=>{r+=`[${E0(s)}],`}),r+=`],${KG(e)})`,r},KG=e=>{let t="null";if("color"in e){let r=e.color;t=`[${r[0]},${r[1]},${r[2]},${r[3]}]`}return t},QG=(e,t,r)=>{let s=e.name,n=Fr(e,t),o=Mr(n,r.colorindex),i="";if(!e.pptz||e.pptz===e.sptz&&e.pptz===0){let c=vt.vec2.fromValues(e.pptx,e.ppty),a=vt.vec2.fromValues(e.sptx,e.spty);i=`  let ${s} = primitives.line([[${nq(c)}],[${nq(a)}]])
`}else{let c=vt.vec3.fromValues(e.pptx,e.ppty,e.pptz),a=vt.vec3.fromValues(e.sptx,e.spty,e.sptz);i=`  let ${s} = primitives.line([[${E0(c)}],[${E0(a)}]])
`}o&&(i+=`  ${s} = colors.colorize([${o[0]}, ${o[1]}, ${o[2]}, 1], ${s})
`),e.script=i,Ht(e,t)},oq=(e,t,r,s,n,o)=>{if(s===0)return`geometries.path2.appendPoints([[${t},${r}]], ${e})
`;let i=vt.vec2.fromValues(n,o),c=vt.vec2.fromValues(t,r),l=vt.vec2.distance(i,c)*((1+Math.pow(s,2))/(4*s)),u=s<0,h=!1,f=Math.atan(s)*4;return`geometries.path2.appendArc({endpoint: [${t},${r}],radius: [${l},${l}],xaxisrotation: ${f},clockwise: ${u},large: ${h},segments: 16}, ${e})
`},cq=(e,t,r)=>{let s=parseInt("00000000000000001",2),n=e.vlen,o=e.pptxs,i=e.pptys,c=e.bulgs,a=e.lflg,l=e.name,u=Fr(e,t),h=Mr(u,r.colorindex),f=`  let ${l} = geometries.path2.create()
`,d=(a&s)===s;if(n===o.length&&n===i.length&&n===c.length){f+=`  ${l} = geometries.path2.appendPoints([[${o[0]}, ${i[0]}]], ${l})
`;for(let g=0;g<o.length;g++){let p=(g+1)%o.length,x=o[p],v=i[p],y=o[g],b=i[g],E=c[g];p!==0?f+=`  ${l} = ${oq(l,x,v,E,y,b)}`:E!==0&&(f+=`  ${l} = ${oq(l,x,v,E,y,b)}`)}}else return;d?f+=`  ${l} = geometries.path2.close(${l})
`:f+=`
`,h&&(f+=`  ${l} = colors.colorize([${h[0]}, ${h[1]}, ${h[2]}, 1], ${l})
`),e.script=f,Ht(e,t)},eX=(e,t,r)=>{let s=e.lthk,n=e.pptx,o=e.ppty,i=e.swid,c=e.ang0,a=e.ang1,l=e.name,u=Fr(e,t),h=Mr(u,r.colorindex);c*=.017453292519943295,a*=.017453292519943295;let f=16;if(s===0){let g=`  let ${l} = primitives.arc({center: [${n}, ${o}], radius: ${i}, startAngle: ${c}, endAngle: ${a}, segements: ${f}})
`;h&&(g+=`  ${l} = colors.colorize([${h[0]}, ${h[1]}, ${h[2]}, 1], ${l})
`),e.script=g,Ht(e,t);return}let d=`  let ${l} = primitives.arc({center: [${n}, ${o}], radius: ${i}, startAngle: ${c}, endAngle: ${a}, segements: ${f}})
`;h&&(d+=`  ${l} = colors.colorize([${h[0]}, ${h[1]}, ${h[2]}, 1], ${l})
`),e.script=d,Ht(e,t)},tX=(e,t,r)=>{let s=e.lthk,n=e.pptx,o=e.ppty,i=e.swid,c=e.name,a=Fr(e,t),l=Mr(a,r.colorindex),u=16;if(s===0){let f=`  let ${c} = primitives.circle({center: [${n}, ${o}], radius: ${i}, segments: ${u}})
`;l&&(f+=`  ${c} = colors.colorize([${l[0]}, ${l[1]}, ${l[2]}, 1], ${c})
`),e.script=f,Ht(e,t);return}let h=`  let ${c} = primitives.circle({center: [${n}, ${o}], radius: ${i}, segments: ${u}}).extrude({offset: [0,0,${s}]}))
`;l&&(h+=`  ${c} = colors.colorize([${l[0]}, ${l[1]}, ${l[2]}, 1], ${c})
`),e.script=h,Ht(e,t)},rX=(e,t,r)=>{let s=e.pptx,n=e.ppty,o=e.pptz,i=e.sptx,c=e.spty,a=e.sptz,l=e.swid,u=e.name,h=Fr(e,t),f=Mr(h,r.colorindex),d=16;if(o===0&&a===0){let g=vt.vec2.fromValues(0,0),p=vt.vec2.fromValues(i,c),x=vt.vec2.distance(g,p),v=x*l,y=Math.atan2(c,i),b=`  let ${u} = primitives.ellipse({center: [0, 0, 0], radius: [${x}, ${v}], segments: ${d}})
  let ${u}matrix = maths.mat4.multiply(maths.mat4.create(), maths.mat4.fromTranslation(maths.mat4.create(), [${s}, ${n}, 0]), maths.mat4.fromZRotation(maths.mat4.create(), ${y}))
  ${u} = geometries.geom2.transform(${u}matrix, ${u})
`;f&&(b+=`  ${u} = colors.colorize([${f[0]}, ${f[1]}, ${f[2]}, 1], ${u})
`),e.script=b,Ht(e,t)}},sX=e=>{let t=[],r=0;for(;r<e.length;){let s=e[r++],n=[];for(;s>0;)n.push(e[r++]),s--;t.push(n)}return t},nX=(e,t,r)=>{let s=[],n=0;for(;n<e.length;){let o=e[n],i=t[n],c=r[n];s.push([o,i,c]),n++}return s},oX=(e,t,r)=>{let s=e.vlen,n=e.pptxs,o=e.pptys,i=e.pptzs,c=e.flen,a=e.fvals,l=Fr(e,t),u=Mr(l,r.colorindex),h=[];if(s===n.length&&s===o.length&&s===i.length)if(c===a.length){let g=sX(a),p=nX(n,o,i),x=0;for(;x<g.length;){let v=g[x],y=[],b=0;for(;b<v.length;){let q=v[b],w=vt.vec3.clone(p[q]);y.push(w),b++}r.dxf.angdir===1&&(y=y.reverse());let E=Ds.poly3.create(y);u&&(E.color=u),h.push(E),x++}}else console.warn("invalid mesh: faces");else console.warn("invalid mesh: vertices");let f=e.name,d=`  const ${f}_polygons = [
`;for(let g of h)d+="    "+iq(g)+`,
`;return d+=`  ]
  let ${f} = geometries.geom3.create(${f}_polygons)
`,e.script=d,Ht(e,t),null},iX=e=>{for(let r of e)if(r.name==="0")return r;let t={type:"layer"};return t.lnam="layer0",t.name="0",t.lscl=1,t.visb=0,t.spac=0,t.objects=[],e.push(t),t},Ht=(e,t)=>{let r=JG(e,t);r===null&&(r=iX(t)),"objects"in r||(r.objects=[]),r.objects.push(e)},cX=e=>{let t=parseInt("00000000000000001",2),r=parseInt("00000000000001000",2),s=parseInt("00000000000010000",2),n=parseInt("00000000000100000",2),o=parseInt("00000000001000000",2),i=e.lflg,c=null;return(i&r)===r?c={type:"3dline",isclosed:(i&t)===t}:(i&s)===s?(c={type:"3dpolymesh"},c.fvia=e.fvia,c.fvib=e.fvib,c.closedM=(i&t)===t,c.closedN=(i&n)===n):(i&o)===o?(c={type:"3dpolyfaces"},c.fvia=e.fvia,c.fvib=e.fvib):c={type:"2dline",isclosed:(i&t)===t},"cnmb"in e&&(c.cnmb=e.cnmb),"lnam"in e&&(c.lnam=e.lnam),c},aX=(e,t,r,s,n)=>{let o=(l,u)=>{let h=(l-1)*t+(u-1);return r[h].vec},i=[];if(e*t!==r.length||e<2|t<2)return i;let a=1;for(;a<e;){let l=1;for(;l<t;){let u=o(a,l),h=o(a+1,l),f=o(a+1,l+1),d=o(a,l+1),g=[u,h,f,d];n.dxf.angdir===1&&(g=g.reverse());let p=Ds.poly3.create(g),x=Ds.poly3.plane(p);Number.isFinite(x[3])&&(s&&(p.color=s),i.push(p)),l++}a++}return i},lX=(e,t,r,s,n)=>{let o=[];if(e+t!==r.length)return o;let i=e;for(;i<r.length;){let c=r[i],a=[Math.abs(c.fvia),Math.abs(c.fvib),Math.abs(c.fvic),Math.abs(c.fvid)],l=[];if(a[0]>0&&(c=r[a[0]-1],l.push(c.vec),a[1]>0&&(c=r[a[1]-1],l.push(c.vec),a[2]>0&&(c=r[a[2]-1],l.push(c.vec),a[3]>0&&(c=r[a[3]-1],l.push(c.vec))))),l.length>2){n.dxf.angdir===1&&(l=l.reverse());let u=Ds.poly3.create(l);o.push(u)}i++}return o},uX=(e,t,r,s)=>{e.vlen=r.length,e.pptxs=[],e.pptys=[],e.bulgs=[];for(let n of r)e.pptxs.push(n.vec[0]),e.pptys.push(n.vec[1]),e.bulgs.push(n.bulg);return e.isclosed?e.lflg=parseInt("00000000000000001",2):e.lflg=0,cq(e,t,s),null},xt=(e,t,r,s)=>{if(e===null)return null;let n=e.type,o=Fr(e,t),i=Mr(o,s.colorindex);if(n==="2dline")return uX(e,t,r,s);if(n==="3dline")return null;if(n==="3dpolymesh"){let l=e.fvia,u=e.fvib;r=aX(l,u,r,i,s)}if(n==="3dpolyfaces"&&"fvia"in e){let l=e.fvia,u=e.fvib;r=lX(l,u,r,i,s)}let c=e.name,a=`  const ${c}_polygons = [
`;for(let l of r)a+="    "+iq(l)+`,
`;return a+=`  ]
  let ${c} = geometries.geom3.create(${c}_polygons)
`,i&&(a+=`  ${c}.color = [${i}]
`),e.script=a,Ht(e,t),null},fX=e=>{let r=`function ${e.lnam||"Unknown"}() {
`;for(let s of e.objects)r+=s.script;r+="  return [";for(let s of e.objects)r+=s.name+",";return r+=`]
}
`,r},hX=(e,t)=>{switch(e.name||"Unknown"){case"$ANGDIR":"lflg"in e&&(t.dxf.angdir=e.lflg);break;default:break}},pX=(e,t)=>{let r=[],s=null,n=[],o=0,i=null;for(let a of e.objstack)if(i=null,"type"in a){if(!("name"in a))a.name="jscad"+o,o=o+1;else{let l=a.name;l=l.replace(/ /g,"_"),l=l.replace(/-/g,"_"),l=l.replace(/\./g,"_"),a.name=l}switch(a.type){case"dxf":break;case"layer":s=xt(s,r,n,t),n=[],a.objects=[],a.lnam="layer"+r.length,r.push(a);break;case"variable":s=xt(s,r,n,t),n=[],hX(a,t);break;case"3dface":i=UG(a,r,t),s===null&&(s={type:"3dfaces"},s.name="jscad"+o,o=o+1);break;case"mesh":s=xt(s,r,n,t),n=[],oX(a,r,t);break;case"arc":s=xt(s,r,n,t),n=[],eX(a,r,t);break;case"circle":s=xt(s,r,n,t),n=[],tX(a,r,t);break;case"ellipse":s=xt(s,r,n,t),n=[],rX(a,r,t);break;case"line":s=xt(s,r,n,t),n=[],QG(a,r,t);break;case"polyline":s=xt(s,r,n,t),n=[],s===null&&(s=cX(a),s.name="jscad"+o,o=o+1);break;case"vertex":i=WG(a);break;case"seqend":s=xt(s,r,n,t),n=[];break;case"lwpolyline":s=xt(s,r,n,t),n=[],cq(a,r,t);break;default:break}Ds.poly3.isA(i)&&n.push(i),i&&"vec"in i&&i.vec.length===3&&n.push(i),i&&"vec"in i&&i.vec.length===2&&n.push(i)}s=xt(s,r,n,t);let c=`const {colors, geometries, maths, primitives, transforms} = require('@jscad/modeling')

const main = () => {
  let layers = []
  return layers.concat(`;return r.forEach(a=>{let l=a.lnam||"Unknown";c+=`${l}(),`}),c+=`[])
}
`,c+=`
function createPolygon(listofpoints, color) {
  let polygon = geometries.poly3.fromPoints(listofpoints)
  if (color) polygon.color = color
  return polygon
}
`,r.forEach(a=>{c+=fX(a)}),c+=`module.exports = {main}
`,c};aq.exports=pX});var pq=m((Lse,hq)=>{var dX=jw().version,{BYLAYER:jt,getTLA:M}=d0(),gX=Ww(),mX=Jw(),{instantiateAsciiDxf:xX}=v0(),vX=lq(),EX=(e,t)=>{if(e.options.strict===!0)throw t;console.log(`error: line ${t.line}, column ${t.column}, bad character [${t.c}]`)},yX=(e,t)=>{},AX=(e,t)=>{},bX=(e,t,r)=>{let s=null;switch(r){case"LAYER":s={type:"layer"},s[M(48)]=1,s[M(60)]=0,s[M(67)]=0,e.objstack.push(s);break;case"LINE":s={type:"line"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(210)]=0,s[M(220)]=0,s[M(230)]=0,e.objstack.push(s);break;case"LWPOLYLINE":s={type:"lwpolyline"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(38)]=0,s[M(39)]=0,s[M(43)]=0,s[M(70)]=0,s[M(90)]=0,s[M(210)]=0,s[M(220)]=0,s[M(230)]=1,e.objstack.push(s);break;case"MESH":s={type:"mesh"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(91)]=0,s[M(92)]=0,s[M(93)]=0,s[M(94)]=0,s[M(95)]=0,s.state=0,e.objstack.push(s);break;case"POLYLINE":s={type:"polyline"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(10)]=0,s[M(20)]=0,s[M(30)]=0,s[M(39)]=0,s[M(40)]=0,s[M(41)]=0,s[M(70)]=0,s[M(71)]=0,s[M(72)]=0,s[M(73)]=0,s[M(74)]=0,s[M(75)]=0,s[M(210)]=0,s[M(220)]=0,s[M(230)]=1,e.objstack.push(s);break;case"ARC":s={type:"arc"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(39)]=0,s[M(210)]=0,s[M(220)]=0,s[M(230)]=1,e.objstack.push(s);break;case"CIRCLE":s={type:"circle"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(39)]=0,s[M(210)]=0,s[M(220)]=0,s[M(230)]=1,e.objstack.push(s);break;case"ELLIPSE":s={type:"ellipse"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(210)]=0,s[M(220)]=0,s[M(230)]=1,e.objstack.push(s);break;case"VERTEX":s={type:"vertex"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(10)]=0,s[M(20)]=0,s[M(30)]=0,s[M(40)]=0,s[M(41)]=0,s[M(42)]=0,s[M(70)]=0,s[M(71)]=0,s[M(72)]=0,s[M(73)]=0,s[M(74)]=0,e.objstack.push(s);break;case"3DFACE":s={type:"3dface"},s[M(48)]=1,s[M(60)]=0,s[M(62)]=jt,s[M(67)]=0,s[M(70)]=0,e.objstack.push(s);break;case"SEQEND":s={type:"seqend"},e.objstack.push(s);break;default:s={},e.objstack.push(s);break}},wX=(e,t,r)=>{let s={type:"variable",name:r};e.objstack.push(s)},Mt=(e,t,r)=>{let s=e.objstack.pop();"type"in s&&(s[M(t)]=parseFloat(r)),e.objstack.push(s)},Je=(e,t,r)=>{let s=e.objstack.pop();"type"in s&&(s[M(t)]=parseFloat(r)),e.objstack.push(s)},qX=(e,t,r)=>{let s=e.objstack.pop();"type"in s&&(s.type==="lwpolyline"?(s.pptxs===void 0&&(s.pptxs=[],s.bulgs=[]),s.pptxs.push(parseFloat(r)),s.bulgs.push(0)):s.type==="mesh"?(s.pptxs===void 0&&(s.pptxs=[]),s.pptxs.push(parseFloat(r))):s[M(t)]=parseFloat(r)),e.objstack.push(s)},SX=(e,t,r)=>{let s=e.objstack.pop();"type"in s&&(s.type==="lwpolyline"||s.type==="mesh"?(s.pptys===void 0&&(s.pptys=[]),s.pptys.push(parseFloat(r))):s[M(t)]=parseFloat(r)),e.objstack.push(s)},DX=(e,t,r)=>{let s=e.objstack.pop();"type"in s&&(s.type==="mesh"?(s.pptzs===void 0&&(s.pptzs=[]),s.pptzs.push(parseFloat(r))):s[M(t)]=parseFloat(r)),e.objstack.push(s)},TX=(e,t,r)=>{let s=e.objstack.pop();if("type"in s)if(s.type==="lwpolyline"){let n=s.bulgs;n!==void 0&&s.pptxs.length===n.length&&(n[n.length-1]=parseFloat(r))}else s[M(t)]=parseFloat(r);e.objstack.push(s)},In=(e,t,r)=>{let s=e.objstack.pop();if("type"in s)if(s.type==="mesh"){let n=s.state;switch(t){case 91:s[M(t)]=parseFloat(r),s.state=1;break;case 92:n===1?(s.vlen=parseFloat(r),s.state=2):(s.plen=parseFloat(r),s.state=6);break;case 93:s[M(t)]=parseFloat(r),s.state=3;break;case 94:s[M(t)]=parseFloat(r),s.state=4;break;case 95:s[M(t)]=parseFloat(r),s.state=5;break;default:s.state=7;break}}else s[M(t)]=parseFloat(r);e.objstack.push(s)},CX=(e,t,r)=>{let s=e.objstack.pop();if("type"in s)if(s.type==="mesh")switch(s.state){case 3:s.fvals===void 0&&(s.fvals=[]),s.fvals.push(parseFloat(r));break;case 4:s.evals===void 0&&(s.evals=[]),s.evals.push(parseFloat(r));break;default:break}else s[M(t)]=parseFloat(r);e.objstack.push(s)},mi=(e,t,r)=>{let s=e.objstack.pop();"type"in s&&(s[M(t)]=r),e.objstack.push(s)},uq=(e,t,r)=>{let s=e.objstack.pop();"type"in s&&s[M(t)]===void 0&&(s[M(t)]=r),e.objstack.push(s)},fq=(e,t)=>{let r=mX.reader(t);return r.on("error",EX),r.on("start",yX),r.on("end",AX),r.absorb(0,bX),r.absorb(1,mi),r.absorb(2,uq),r.absorb(3,uq),r.absorb(6,mi),r.absorb(7,mi),r.absorb(8,mi),r.absorb(9,wX),r.absorb(10,qX),r.absorb(11,Je),r.absorb(12,Je),r.absorb(13,Je),r.absorb(20,SX),r.absorb(21,Je),r.absorb(22,Je),r.absorb(23,Je),r.absorb(30,DX),r.absorb(31,Je),r.absorb(32,Je),r.absorb(33,Je),r.absorb(39,Je),r.absorb(40,Je),r.absorb(41,Je),r.absorb(42,TX),r.absorb(50,Je),r.absorb(51,Je),r.absorb(62,Mt),r.absorb(70,Mt),r.absorb(71,Mt),r.absorb(72,Mt),r.absorb(73,Mt),r.absorb(74,Mt),r.absorb(75,Mt),r.absorb(90,CX),r.absorb(91,In),r.absorb(92,In),r.absorb(93,In),r.absorb(94,In),r.absorb(95,In),r.absorb(210,Mt),r.absorb(220,Mt),r.absorb(230,Mt),r.objstack=[],r.objstack.push({type:"dxf"}),r.write(e).close(),r},$X=(e,t)=>{let r=fq(e,t);return xX(r,t)},RX=(e,t)=>{let r=fq(e,t),s=`// Produced by JSCAD IO Library : DXF Deserializer (${t.version})

`;return s+=vX(r,t),s},IX=(e,t)=>(e=Object.assign({},{filename:"dxf",version:dX,output:"script",strict:!0,colorindex:gX,dxf:{angdir:0,insunits:4,pfacevmax:4}},e),e.output==="script"?RX(t,e):$X(t,e)),MX="dxf";hq.exports={deserialize:IX,extension:MX}});var dq=m((zse,FX)=>{FX.exports={name:"@jscad/json-deserializer",version:"2.0.24",description:"JSON Deserializer for JSCAD",homepage:"https://openjscad.xyz/",repository:"https://github.com/jscad/OpenJSCAD.org",main:"index.js",scripts:{coverage:"nyc --all --reporter=html --reporter=text npm test",test:"ava 'tests/*.test.js' --verbose --timeout 2m"},contributors:[{name:"z3dev",url:"http://www.z3d.jp"},{name:"Mark 'kaosat-dev' Moissette",url:"http://kaosat.net"}],keywords:["openjscad","jscad","import","deserializer","json"],license:"MIT",dependencies:{"@jscad/array-utils":"2.1.4"},devDependencies:{"@jscad/modeling":"2.11.0",ava:"3.15.0",nyc:"15.1.0"},gitHead:"5899622c5ffc640001da7261d7c06a1223064ccc"}});var mq=m((_se,gq)=>{var{flatten:NX,toArray:PX}=dt(),kX=dq().version,OX=(e,t)=>{e=Object.assign({},{filename:"json",output:"script",version:kX,addMetaData:!0},e);let s=JSON.parse(t);return s=NX(PX(s)),e.output==="script"?LX(e,s):s},LX=(e,t)=>{let{addMetaData:r,filename:s,version:n}=e,o=r?`//
// Produced by JSCAD IO Library : JSON Deserializer (${n})
// date: ${new Date}
// source: ${s}
//
`:"";return o+=`
const { geometries } = require('@jscad/modeling')

const main = () => {
  const objects = [${zX(t)} ]
  return objects
}

${_X(t)}

module.exports = { main }
`,o},zX=e=>e.reduce((t,r,s)=>t+` json${s},`,""),_X=e=>e.reduce((t,r,s)=>t+BX(r,s),""),BX=(e,t)=>`const json${t} = ${JSON.stringify(e)}
`,VX="json";gq.exports={deserialize:OX,extension:VX}});var xq=m((Bse,GX)=>{GX.exports={name:"@jscad/obj-deserializer",version:"2.0.23",description:"OBJ Deserializer for JSCAD",homepage:"https://openjscad.xyz/",repository:"https://github.com/jscad/OpenJSCAD.org",main:"index.js",scripts:{coverage:"nyc --all --reporter=html --reporter=text npm test",test:"ava --verbose --timeout 2m './tests/*.test.js'"},contributors:[{name:"Rene K. Mueller",url:"http://renekmueller.com"},{name:"z3dev",url:"http://www.z3d.jp"},{name:"Mark 'kaosat-dev' Moissette",url:"http://kaosat.net"}],keywords:["openjscad","jscad","import","deserializer","obj"],license:"MIT",dependencies:{"@jscad/modeling":"2.11.0"},devDependencies:{ava:"3.15.0",nyc:"15.1.0"},gitHead:"5899622c5ffc640001da7261d7c06a1223064ccc"}});var Eq=m((Vse,vq)=>{var{colors:XX,primitives:YX}=ue(),HX=xq().version,jX=(e,t)=>{e=Object.assign({},{filename:"obj",output:"script",orientation:"outward",version:HX,addMetaData:!0},e);let{output:s}=e;e&&e.statusCallback&&e.statusCallback({progress:0});let{positions:n,groups:o}=ZX(t,e),i=s==="script"?tY(n,o,e):UX(n,o,e);return e&&e.statusCallback&&e.statusCallback({progress:100}),i},ZX=(e,t)=>{let r=[],s=[],n=null;r.push({faces:[],colors:[],name:"default",line:0});let o=(u,h)=>{let f={faces:[],colors:[],name:""};h&&h.length>0&&(f.name=h.join(" ")),r.push(f)},i=(u,h)=>{let f=parseFloat(h[0]),d=parseFloat(h[1]),g=parseFloat(h[2]);s.push([f,d,g])},c=(u,h)=>{let f=h.map(g=>{let p=g.match(/[0-9+\-eE]+/g),x=parseInt(p[0]);return x<0?x=s.length+x:x--,x}),d=r.pop();d.faces.push(f),d.colors.push(n),r.push(d)},a=(u,h)=>{if(n=null,h&&h.length>0){let f=XX.colorNameToRgb(h[0]);f&&(n=[f[0],f[1],f[2],1])}},l=e.split(/\n/);for(let u=0;u<l.length;u++){let h=l[u].trim();if(h&&h.length>0){let f=h.match(/\S+/g);if(f){let d=f[0];switch(f=f.slice(1),d){case"g":o(d,f);break;case"v":i(d,f);break;case"f":c(d,f);break;case"usemtl":a(d,f);break}}}}return r=r.filter(u=>u.faces.length>0),{positions:s,groups:r}},UX=(e,t,r)=>t.map(n=>YX.polyhedron({orientation:r.orientation,points:e,faces:n.faces,colors:n.colors})),WX=e=>{let t=`  let points = [
`;return e.forEach(r=>t+=`    [${r}],
`),t+="  ]",t},JX=e=>{let t=`  let faces = [
`;return e.forEach(r=>t+=`    [${r}],
`),t+="  ]",t},KX=e=>{let t=`  let colors = [
`;return e.forEach(r=>{r?t+=`    [${r}],
`:t+=`    null,
`}),t+="  ]",t},QX=e=>{let t="";return e.forEach((r,s)=>t+=`    group${s}(points), // ${r.name}
`),t},eY=(e,t)=>{let r="";return e.forEach((s,n)=>{let o=s.faces,i=s.colors;r+=`
// group : ${s.name}
// faces: ${o.length}
`,r+=`const group${n} = (points) => {
${JX(o)}
${KX(i)}
  return primitives.polyhedron({ orientation: '${t.orientation}', points, faces, colors })
}
`}),r},tY=(e,t,r)=>{let{filename:s,addMetaData:n,version:o}=r,i=n?`//
// Produced by JSCAD IO Library : OBJ Deserializer (${o})
// date: ${new Date}
// source: ${s}
//
  `:"";return i+=`const {primitives} = require('@jscad/modeling')

// groups: ${t.length}
// points: ${e.length}
const main = () => {
  // points are common to all geometries
${WX(e)}

  let geometries = [
${QX(t)}  ]
  return geometries
}

${eY(t,r)}
module.exports = {main}
`,i},rY="obj";vq.exports={deserialize:jX,extension:rY}});var yq=m((Gse,sY)=>{sY.exports={name:"@jscad/stl-deserializer",version:"2.1.20",description:"STL Deserializer for JSCAD",homepage:"https://openjscad.xyz/",repository:"https://github.com/jscad/OpenJSCAD.org",main:"index.js",scripts:{coverage:"nyc --all --reporter=html --reporter=text npm test",test:"ava --verbose --timeout 2m './tests/*.test.js'"},contributors:[{name:"Rene K. Mueller",url:"http://renekmueller.com"},{name:"z3dev",url:"http://www.z3d.jp"},{name:"Mark 'kaosat-dev' Moissette",url:"http://kaosat.net"}],keywords:["openjscad","jscad","import","deserializer","stl"],license:"MIT",dependencies:{"@jscad/io-utils":"2.0.23","@jscad/modeling":"2.11.0"},devDependencies:{ava:"3.15.0",nyc:"15.1.0"},gitHead:"5899622c5ffc640001da7261d7c06a1223064ccc"}});var bq=m((Xse,Aq)=>{var{maths:Ke,primitives:nY}=ue(),{BinaryReader:oY}=Ii(),iY=yq().version,cY=(e,t)=>{e=Object.assign({},{filename:"stl",version:iY,addMetaData:!0,output:"script"},e),e&&e.statusCallback&&e.statusCallback({progress:0});let{filename:s,version:n,output:o,addMetaData:i}=e;t=lY(t)?aY(t):t;let c=fY(t);e&&e.statusCallback&&e.statusCallback({progress:33});let a=({vertices:g,triangles:p,normals:x,colors:v,index:y})=>xY(g,p,null,v,y),l=({vertices:g,triangles:p,normals:x,colors:v})=>mY(g,p,null,v);e&&e.statusCallback&&e.statusCallback({progress:66});let d=(o==="script"?hY:pY)((c?dY:gY)(t,s,n,o==="script"?a:l),i,n,s);return e&&e.statusCallback&&e.statusCallback({progress:100}),d},aY=e=>{let t="",r=new Uint8Array(e),s=r.byteLength;for(let n=0;n<s;n++)t+=String.fromCharCode(r[n]);return t},lY=e=>e.byteLength!==void 0&&typeof e.slice=="function",uY=e=>{if(typeof e!="string"){let t=new Uint8Array(e),r="";for(let s=0;s<e.byteLength;s++)r+=String.fromCharCode(t[s]);return r}return e},fY=e=>{let t=/vertex[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g,r=uY(e);return t.exec(r)===null},hY=(e,t,r,s)=>{let n="";return t&&(n=`
  //
  // producer: JSCAD STL Deserializer ${r}
  // date: ${new Date}
  // source: ${s}
  // objects: ${e.length}
  //
  `),n+=`const {primitives} = require('@jscad/modeling')
`,n+=e.join(`
`),n+=`
const main = () => {
 return [${e.map((o,i)=>`solid${i+1}()`)}]
}

module.exports = {main}
`,n},pY=e=>e,dY=(e,t,r,s)=>{let n=[],o=[],i=[],c=[],a=0,l=0,u=null,h=parseInt("01000000000000000",2),f=parseInt("00000000000011111",2),d=parseInt("00000001111100000",2),g=parseInt("00111110000000000",2),p=new oY(e),x=0,v=0,y=0,b=0,E=0,q=0;for(let D=0;D<80;D++)switch(x){case 6:y=p.readUInt8(),x+=1;continue;case 7:b=p.readUInt8(),x+=1;continue;case 8:E=p.readUInt8(),x+=1;continue;case 9:q=p.readUInt8(),x+=1;continue;default:switch(v=p.readChar(),v){case"C":case"O":case"L":case"R":case"=":x+=1;break;default:break}break}x===10&&(u=[y/255,b/255,E/255,q/255]);let w=p.readUInt32();for(let D=0;D<w;D++){let T=[];T.push(p.readFloat()),T.push(p.readFloat()),T.push(p.readFloat());let A=[];A.push(p.readFloat()),A.push(p.readFloat()),A.push(p.readFloat());let S=[];S.push(p.readFloat()),S.push(p.readFloat()),S.push(p.readFloat());let $=[];$.push(p.readFloat()),$.push(p.readFloat()),$.push(p.readFloat());let C=0;for(let I=0;I<3;I++)isNaN(A[I])&&C++,isNaN(S[I])&&C++,isNaN($[I])&&C++,isNaN(T[I])&&C++;C>0&&console.log("bad triangle vertice coords/normal: ",C),l+=C;let F=[];F.push(a++),F.push(a++),F.push(a++);let R=p.readUInt16(),P=null;if(x===10){let I=R&h,V=(R&f)/31,K=((R&d)>>>5)/31,fe=((R&g)>>>10)/31;I===0?P=[V,K,fe,255]:P=u,c.push(P)}if(C===0){let I=Ke.vec3.subtract(Ke.vec3.create(),S,A),V=Ke.vec3.subtract(Ke.vec3.create(),$,A),K=Ke.vec3.cross(Ke.vec3.create(),I,V);if(Ke.vec3.dot(T,K)>0){let Ee=$;$=A,A=Ee}}n.push(A),n.push(S),n.push($),o.push(F),i.push(T)}return l&&console.warn(`WARNING: import errors: ${l} (some triangles might be misaligned or missing)`),[s({vertices:n,triangles:o,normals:i,colors:c,index:1})]},gY=(e,t,r,s)=>{let n=0,o=e.split("endsolid"),i=[];for(let c=1;c<o.length;c++){let a=/\bfacet[\s\S]*?endloop/mgi,l=[],u=[],h=[],f=[],d=0,g=0,p=e.match(a);if(p!=null){for(let x=0;x<p.length;x++){let y=/\bfacet\s+normal\s+(\S+)\s+(\S+)\s+(\S+)\s+outer\s+loop\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s*/mgi.exec(p[x]);if(y==null)continue;if(y.length!==13){console.log("Failed to parse "+p[x]);break}let b=0;for(let S=0;S<y.length;S++)y[S]==="NaN"&&(console.log("bad normal or triangle vertice #"+n+" "+S+": '"+y[S]+"', skipped"),b++);if(g+=b,b)continue;let E=1,q=[];q.push(parseFloat(y[E++])),q.push(parseFloat(y[E++])),q.push(parseFloat(y[E++]));let w=[];w.push(parseFloat(y[E++])),w.push(parseFloat(y[E++])),w.push(parseFloat(y[E++]));let D=[];D.push(parseFloat(y[E++])),D.push(parseFloat(y[E++])),D.push(parseFloat(y[E++]));let T=[];T.push(parseFloat(y[E++])),T.push(parseFloat(y[E++])),T.push(parseFloat(y[E++]));let A=[];if(A.push(d++),A.push(d++),A.push(d++),b===0){let S=Ke.vec3.subtract(Ke.vec3.create(),D,w),$=Ke.vec3.subtract(Ke.vec3.create(),T,w),C=Ke.vec3.cross(Ke.vec3.create(),S,$);if(Ke.vec3.dot(q,C)>0){let R=T;T=w,w=R}}l.push(w),l.push(D),l.push(T),h.push(q),u.push(A),n++}g&&console.warn(`WARNING: import errors: ${g} (some triangles might be misaligned or missing)`),i.push(s({vertices:l,triangles:u,colors:f,index:c}))}}return i},mY=(e,t,r,s)=>{s&&t.length!==s.length&&(s=void 0);let n={orientation:"inward",points:e,faces:t,colors:s};return nY.polyhedron(n)},xY=(e,t,r,s,n)=>{let o=`
//
// solid ${n} : ${e.length} points, ${t.length} faces, ${s.length} colors
//
const solid${n} = () => {
`;o+=`  const points = [
`;for(let i=0;i<e.length;i++)o+=`    [${e[i]}],
`;o+=`  ]
`,o+=`  const faces = [
`;for(let i=0;i<t.length;i++)o+=`    [${t[i]}],
`;if(o+=`  ]
`,s&&t.length===s.length){o+=`  const colors = [
`;for(let i=0;i<s.length;i++)o+=`    [${s[i]}],
`;o+=`  ]
`}else o+=`  const colors = null
`;return o+=`  return primitives.polyhedron({points, faces, colors, orientation: 'inside'})
}
`,o},vY="stl";Aq.exports={deserialize:cY,extension:vY}});var wq=m((Yse,EY)=>{EY.exports={name:"@jscad/svg-deserializer",version:"2.5.4",description:"SVG Deserializer for JSCAD",homepage:"https://openjscad.xyz/",repository:"https://github.com/jscad/OpenJSCAD.org",main:"src/index.js",scripts:{coverage:"nyc --all --reporter=html --reporter=text npm test",test:"ava --verbose --timeout 2m './tests/*.test.js'"},contributors:[{name:"Rene K. Mueller",url:"http://renekmueller.com"},{name:"z3dev",url:"http://www.z3d.jp"},{name:"Mark 'kaosat-dev' Moissette",url:"http://kaosat.net"}],keywords:["openjscad","jscad","import","deserializer","svg"],license:"MIT",dependencies:{"@jscad/array-utils":"2.1.4","@jscad/modeling":"2.11.0",saxes:"5.0.1"},devDependencies:{ava:"3.15.0",nyc:"15.1.0"},gitHead:"5899622c5ffc640001da7261d7c06a1223064ccc"}});var xi=m((Hse,qq)=>{var yY=3.5433073656147536,AY=1/(1/.03937),bY=1/(1/.03937/72),wY=1/(1/.03937/72*12),qY=.2822222,SY={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],grey:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};qq.exports={pxPmm:yY,inchMM:AY,ptMM:bY,pcMM:wY,cssPxUnit:qY,svgColors:SY}});var Mn=m((jse,Dq)=>{var{inchMM:DY,ptMM:TY,pcMM:CY,svgColors:Sq}=xi(),$Y=(e,t)=>e/t[0],RY=(e,t)=>0-e/t[1],IY=(e,t,r)=>{if(e.indexOf("%")<0)return vi(e,t[0]);let s=parseFloat(e);return isNaN(s)?0:s===0?s:(s=s/100*r,s=s/t[0],Math.round(s*1e5)/1e5)},MY=(e,t,r)=>{if(e.indexOf("%")<0)return vi(e,t[1]);let s=parseFloat(e);return isNaN(s)?0:s===0?s:(s=s/100*r,s=s/t[1],Math.round(s*1e5)/1e5)},FY=(e,t,r)=>{if(e.indexOf("%")<0)return vi(e,t[1]);let s=parseFloat(e);return isNaN(s)?0:(s===0||(s=s/100*r,s=s/t[0]),s)},vi=(e,t)=>{let r=parseFloat(e);return isNaN(r)?0:(r===0||e.search(/EM/i)>0||e.search(/EX/i)>0||e.search(/MM/i)>0||(e.search(/CM/i)>0?r=r*10:e.search(/IN/i)>0?r=r/DY:e.search(/PT/i)>0?r=r/TY:e.search(/PC/i)>0?r=r/CY:r=r/t),r)},NY=e=>{let t;if(e=e.toLowerCase(),e in Sq)t=Sq[e],t=[t[0]/255,t[1]/255,t[2]/255];else if(e[0]==="#")e.length===4&&(e="#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),e.length===7&&(t=[parseInt("0x"+e.slice(1,3))/255,parseInt("0x"+e.slice(3,5))/255,parseInt("0x"+e.slice(5,7))/255]);else{let s=/rgb\(.+,.+,.+\)/.exec(e);s!==null&&(s=s[0],s=s.slice(s.indexOf("(")+1,s.indexOf(")")),t=s.split(","),s.indexOf("%")>0?(t=[parseInt(t[0]),parseInt(t[1]),parseInt(t[2])],t=[t[0]/100,t[1]/100,t[2]/100]):(t=[parseInt(t[0]),parseInt(t[1]),parseInt(t[2])],t=[t[0]/255,t[1]/255,t[2]/255]))}return t},PY=(e,t)=>{if("style"in e){let r=e.style+";",s=t+"\\s*:\\s*(\\S+);",o=new RegExp(s,"i").exec(r);if(o!==null){o=o[0];let i=o.indexOf(":")+1;for(;o[i]===" ";)i++;return o=o.slice(i,o.indexOf(";")),o}}},kY=(e,t,r,s)=>{let n=e-r,o=t-s;return e===r&&t===r?[e,t]:e===r?[e,s+-o]:t===s?[r+-n,t]:[r+-n,s+-o]},OY=(e,t)=>{let r=e.length;for(;r>0;){let s=e[r-1];if(t in s)return s[t];r--}},LY=(e,t)=>{let r=null;return e==="path"?t.stroke?r=[t.stroke[0],t.stroke[1],t.stroke[2],1]:t.fill&&(r=[t.fill[0],t.fill[1],t.fill[2],1]):t.fill?r=[t.fill[0],t.fill[1],t.fill[2],1]:t.stroke&&(r=[t.stroke[0],t.stroke[1],t.stroke[2],1]),r};Dq.exports={svg2cagX:$Y,svg2cagY:RY,cagLengthX:IY,cagLengthY:MY,cagLengthP:FY,css2cag:vi,cagColor:NY,cssStyle:PY,reflect:kY,groupValue:OY,svgColorForTarget:LY}});var Rq=m((Zse,$q)=>{var{cagColor:Fn,cssStyle:Ei,css2cag:Tq}=Mn(),{pxPmm:y0}=xi(),Et=(e,t)=>{"id"in t&&(e.id=t.id),"position"in t&&(e.position=t.position)},yt=(e,t)=>{if("display"in t&&(e.visible=t.display),"color"in t&&(e.fill=Fn(t.color),e.stroke=e.fill),"opacity"in t&&(e.opacity=t.opacity),"fill"in t)e.fill=Fn(t.fill);else{let r=Ei(t,"fill");r&&(e.fill=Fn(r))}if("fill-opacity"in t&&(e.opacity=t["fill-opacity"]),"stroke-width"in t)e.strokeWidth=t["stroke-width"];else{let r=Ei(t,"stroke-width");r&&(e.strokeWidth=r)}if("stroke"in t)e.stroke=Fn(t.stroke);else{let r=Ei(t,"stroke");r&&(e.stroke=Fn(r))}"stroke-opacity"in t&&(e.strokeOpacity=t["stroke-opacity"])},A0=/\w+\(.+\)/i,Zt=(e,t)=>{let r=null;if("transform"in t)r=t.transform;else{let s=Ei(t,"transform");s&&(r=s)}if(r!==null){e.transforms=[];let s=A0.exec(r);for(;s!==null;){let n=A0.lastIndex,o=r.indexOf(")")+1,i=r.slice(n,o);i=i.trim();let c=i.slice(0,i.indexOf("(")),a=i.slice(i.indexOf("(")+1,i.indexOf(")")).trim();a.indexOf(",")>0?a=a.split(","):a=a.split(" ");let l;switch(c){case"translate":a.length===1&&a.push(0),l={translate:[a[0],a[1]]},e.transforms.push(l);break;case"scale":a.length===1&&a.push(a[0]),l={scale:[a[0],a[1]]},e.transforms.push(l);break;case"rotate":l={rotate:a},e.transforms.push(l);break;default:break}r=r.slice(o,r.length),s=A0.exec(r)}}},zY=/([\d.-]+)[\s,]+([\d.-]+)[\s,]+([\d.-]+)[\s,]+([\d.-]+)/i,_Y=(e,{customPxPmm:t})=>{let r={type:"svg",x:0,y:0,width:"100%",height:"100%",strokeWidth:"1"};if(r.unitsPmm=[y0,y0],"pxpmm"in e&&(r.pxPmm=e.pxpmm,r.unitsPmm=[r.pxPmm,r.pxPmm]),"width"in e&&(r.width=e.width),"height"in e&&(r.height=e.height),"viewBox"in e){let s=e.viewBox.trim(),n=zY.exec(s);if(n!==null&&(r.viewX=parseFloat(n[1]),r.viewY=parseFloat(n[2]),r.viewW=parseFloat(n[3]),r.viewH=parseFloat(n[4])),r.width.indexOf("%")<0){let o=Tq(r.width,t);o=r.viewW/o,r.unitsPmm[0]=o}else{let o=r.unitsPmm[0]*(parseFloat(r.width)/100);r.unitsPmm[0]=o}if(r.height.indexOf("%")<0){let o=Tq(r.height,y0);o=r.viewH/o,r.unitsPmm[1]=o}else{let o=r.unitsPmm[1]*(parseFloat(r.height)/100);r.unitsPmm[1]=o}}else r.viewX=0,r.viewY=0,r.viewW=1920/r.unitsPmm[0],r.viewH=1080/r.unitsPmm[1];return r.viewP=Math.sqrt(r.viewW*r.viewW+r.viewH*r.viewH)/Math.SQRT2,Et(r,e),yt(r,e),r.objects=[],r},BY=e=>{let t={type:"ellipse",cx:"0",cy:"0",rx:"0",ry:"0"};return"cx"in e&&(t.cx=e.cx),"cy"in e&&(t.cy=e.cy),"rx"in e&&(t.rx=e.rx),"ry"in e&&(t.ry=e.ry),Zt(t,e),Et(t,e),yt(t,e),t},VY=e=>{let t={type:"line",x1:"0",y1:"0",x2:"0",y2:"0"};return"x1"in e&&(t.x1=e.x1),"y1"in e&&(t.y1=e.y1),"x2"in e&&(t.x2=e.x2),"y2"in e&&(t.y2=e.y2),Zt(t,e),Et(t,e),yt(t,e),t},Cq=e=>{let t=[],r=/([\d\-+.]+)[\s,]+([\d\-+.]+)[\s,]*/i;e=e.trim();let s=r.exec(e);for(;s!==null;){let n=s[0],o=r.lastIndex+n.length;n={x:s[1],y:s[2]},t.push(n),e=e.slice(o,e.length),s=r.exec(e)}return t},GY=e=>{let t={type:"polyline"};return Zt(t,e),Et(t,e),yt(t,e),"points"in e&&(t.points=Cq(e.points)),t},XY=e=>{let t={type:"polygon"};return Zt(t,e),Et(t,e),yt(t,e),"points"in e&&(t.points=Cq(e.points)),t},YY=e=>{let t={type:"rect",x:"0",y:"0",rx:"0",ry:"0",width:"0",height:"0"};return"x"in e&&(t.x=e.x),"y"in e&&(t.y=e.y),"rx"in e&&(t.rx=e.rx,"ry"in e||(t.ry=t.rx)),"ry"in e&&(t.ry=e.ry,"rx"in e||(t.rx=t.ry)),t.rx!==t.ry&&console.log("Warning: Unsupported RECT with rx and ry radius"),"width"in e&&(t.width=e.width),"height"in e&&(t.height=e.height),Zt(t,e),Et(t,e),yt(t,e),t},HY=e=>{let t={type:"circle",x:"0",y:"0",radius:"0"};return"cx"in e&&(t.x=e.cx),"cy"in e&&(t.y=e.cy),"r"in e&&(t.radius=e.r),Zt(t,e),Et(t,e),yt(t,e),t},jY=e=>{let t={type:"group"};if(Zt(t,e),Et(t,e),yt(t,e),"x"in e||"y"in e){let r="0",s="0";"x"in e&&(r=e.x),"y"in e&&(s=e.y),"transforms"in t||(t.transforms=[]);let n={translate:[r,s]};t.transforms.push(n)}return t.objects=[],t},ZY=e=>{let t={type:"path"};if(Zt(t,e),Et(t,e),yt(t,e),t.commands=[],"d"in e){let r=null,s="",n=0,o=e.d.length,i=e.position[1]-o-2;for(;n<o;){let c=e.d[n];switch(c){case"-":s.length>0&&(r.p.push(s),s=""),s+=c;break;case".":s.length>0&&s.indexOf(".")>=0&&(r.p.push(s),s=""),s+=c;break;case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":s+=c;break;case"a":case"A":case"c":case"C":case"h":case"H":case"l":case"L":case"v":case"V":case"m":case"M":case"q":case"Q":case"s":case"S":case"t":case"T":case"z":case"Z":r!==null&&(s.length>0&&(r.p.push(s),s=""),t.commands.push(r)),r={c,p:[],pos:n+i};break;case",":case" ":case`
`:r!==null&&s.length>0&&(r.p.push(s),s="");break;default:break}n++}n===o&&r!==null&&(s.length>0&&r.p.push(s),t.commands.push(r))}return t},UY=(e,{svgObjects:t})=>{let r={type:"group"};if(Zt(r,e),Et(r,e),yt(r,e),"x"in e||"y"in e){let s="0",n="0";"x"in e&&(s=e.x),"y"in e&&(n=e.y),"transforms"in r||(r.transforms=[]);let o={translate:[s,n]};r.transforms.push(o)}if(r.objects=[],"xlink:href"in e){let s=e["xlink:href"];s[0]==="#"&&(s=s.slice(1,s.length)),t[s]!==void 0&&(s=t[s],s=JSON.parse(JSON.stringify(s)),r.objects.push(s))}return r};$q.exports={svgCore:Et,svgPresentation:yt,svgSvg:_Y,svgRect:YY,svgCircle:HY,svgEllipse:BY,svgLine:VY,svgPolyline:GY,svgPolygon:XY,svgGroup:jY,svgPath:ZY,svgUse:UY}});var Mq=m((Use,Iq)=>{var{geometries:me,primitives:Ts}=ue(),{svg2cagX:Z,svg2cagY:U,cagLengthX:Ft,cagLengthY:Ut,cagLengthP:WY,reflect:pr}=Mn(),JY=(e,t,r)=>{let{svgUnitsPmm:s,svgUnitsX:n,svgUnitsY:o,svgUnitsV:i,svgGroups:c,target:a,segments:l,pathSelfClosed:u}=r;return{group:f=>t({target:a,segments:l},f),rect:(f,d,g,p,x,v,y)=>{let b=Ft(f.x,d,g),E=0-Ut(f.y,d,p),q=Ft(f.width,d,g),w=Ut(f.height,d,p),D=Ft(f.rx,d,g),T;return q>0&&w>0&&(b=b+q/2,E=E-w/2,D===0?T=Ts.rectangle({center:[b,E],size:[q,w]}):T=Ts.roundedRectangle({center:[b,E],segments:y,size:[q,w],roundRadius:D}),a==="path"&&(T=me.path2.fromPoints({closed:!0},me.geom2.toPoints(T)))),T},circle:(f,d,g,p,x,v,y)=>{let b=Ft(f.x,d,g),E=0-Ut(f.y,d,p),q=WY(f.radius,d,x),w;return q>0&&(w=Ts.circle({center:[b,E],segments:y,radius:q}),a==="path"&&(w=me.path2.fromPoints({closed:!0},me.geom2.toPoints(w)))),w},ellipse:(f,d,g,p,x,v,y)=>{let b=Ft(f.rx,d,g),E=Ut(f.ry,d,p),q=Ft(f.cx,d,g),w=0-Ut(f.cy,d,p),D;return b>0&&E>0&&(D=Ts.ellipse({center:[q,w],segments:y,radius:[b,E]}),a==="path"&&(D=me.path2.fromPoints({closed:!0},me.geom2.toPoints(D)))),D},line:(f,d,g,p,x)=>{let v=Ft(f.x1,d,g),y=0-Ut(f.y1,d,p),b=Ft(f.x2,d,g),E=0-Ut(f.y2,d,p);return Ts.line([[v,y],[b,E]])},polygon:(f,d,g,p)=>{let x=[];for(let v=0;v<f.points.length;v++){let y=f.points[v];if("x"in y&&"y"in y){let b=Ft(y.x,d,g),E=0-Ut(y.y,d,p);x.push([b,E])}}return a==="geom2"?me.geom2.fromPoints(x):me.path2.fromPoints({},x)},polyline:(f,d,g,p,x)=>{let v=[];for(let b=0;b<f.points.length;b++){let E=f.points[b];if("x"in E&&"y"in E){let q=Ft(E.x,d,g),w=0-Ut(E.y,d,p);v.push([q,w])}}return Ts.line(v)},path:(f,d,g,p,x,v,y)=>{let b=KY(f,d,g,p,x,v,y,u);return Object.entries(b).sort((w,D)=>w[0].localeCompare(D[0])).map(w=>{let D=w[1];if(a==="geom2"&&D.isClosed){let T=me.path2.toPoints(D).slice();return T.push(T[0]),me.geom2.fromPoints(T)}return D})}}[e.type](e,s,n,o,i,c,l)};Iq.exports=JY;var Nt=(e,t)=>t?me.path2.appendPoints(e,t):me.path2.fromPoints({},e),KY=(e,t,r,s,n,o,i,c)=>{let a={},l="path",u=0,h=0,f=0,d=0,g=0,p=l+g,x=!1,v=0,y=0,b=0,E=0,q=()=>{g++,p=l+g,x=!1},w=()=>{a[p]||(a[p]=me.path2.fromPoints({},[]))};for(let D=0;D<e.commands.length;D++){let T=e.commands[D],A=T.p,S=0;switch(T.c){case"m":for(D===0&&(f=0,d=0),g>0,A.length>=S+2&&(f=f+parseFloat(A[S++]),d=d+parseFloat(A[S++]),q(),a[p]=Nt([[Z(f,t),U(d,t)]]),u=f,h=d);A.length>=S+2;)f=f+parseFloat(A[S++]),d=d+parseFloat(A[S++]),a[p]=Nt([[Z(f,t),U(d,t)]],a[p]);break;case"M":for(g>0,A.length>=S+2&&(f=parseFloat(A[S++]),d=parseFloat(A[S++]),q(),a[p]=Nt([[Z(f,t),U(d,t)]]),u=f,h=d);A.length>=S+2;)f=parseFloat(A[S++]),d=parseFloat(A[S++]),a[p]=Nt([[Z(f,t),U(d,t)]],a[p]);break;case"a":for(;A.length>=S+7;){let C=parseFloat(A[S++]),F=parseFloat(A[S++]),R=0-parseFloat(A[S++])*.017453292519943295,P=A[S++]==="1",I=A[S++]==="1";f=f+parseFloat(A[S++]),d=d+parseFloat(A[S++]),w(),a[p]=me.path2.appendArc({segments:i,endpoint:[Z(f,t),U(d,t)],radius:[Z(C,t),U(F,t)],xaxisrotation:R,clockwise:I,large:P},a[p])}break;case"A":for(;A.length>=S+7;){let C=parseFloat(A[S++]),F=parseFloat(A[S++]),R=0-parseFloat(A[S++])*.017453292519943295,P=A[S++]==="1",I=A[S++]==="1";f=parseFloat(A[S++]),d=parseFloat(A[S++]),w(),a[p]=me.path2.appendArc({segments:i,endpoint:[Z(f,t),U(d,t)],radius:[Z(C,t),U(F,t)],xaxisrotation:R,clockwise:I,large:P},a[p])}break;case"c":for(;A.length>=S+6;){let C=f+parseFloat(A[S++]),F=d+parseFloat(A[S++]);v=f+parseFloat(A[S++]),y=d+parseFloat(A[S++]),f=f+parseFloat(A[S++]),d=d+parseFloat(A[S++]),w(),a[p]=me.path2.appendBezier({segments:i,controlPoints:[[Z(C,t),U(F,t)],[Z(v,t),U(y,t)],[Z(f,t),U(d,t)]]},a[p]);let R=pr(v,y,f,d);v=R[0],y=R[1]}break;case"C":for(;A.length>=S+6;){let C=parseFloat(A[S++]),F=parseFloat(A[S++]);v=parseFloat(A[S++]),y=parseFloat(A[S++]),f=parseFloat(A[S++]),d=parseFloat(A[S++]),w(),a[p]=me.path2.appendBezier({segments:i,controlPoints:[[Z(C,t),U(F,t)],[Z(v,t),U(y,t)],[Z(f,t),U(d,t)]]},a[p]);let R=pr(v,y,f,d);v=R[0],y=R[1]}break;case"q":for(;A.length>=S+4;){b=f+parseFloat(A[S++]),E=d+parseFloat(A[S++]),f=f+parseFloat(A[S++]),d=d+parseFloat(A[S++]),w(),a[p]=me.path2.appendBezier({segments:i,controlPoints:[[Z(b,t),U(E,t)],[Z(b,t),U(E,t)],[Z(f,t),U(d,t)]]},a[p]);let C=pr(b,E,f,d);b=C[0],E=C[1]}break;case"Q":for(;A.length>=S+4;){b=parseFloat(A[S++]),E=parseFloat(A[S++]),f=parseFloat(A[S++]),d=parseFloat(A[S++]),w(),a[p]=me.path2.appendBezier({segments:i,controlPoints:[[Z(b,t),U(E,t)],[Z(b,t),U(E,t)],[Z(f,t),U(d,t)]]},a[p]);let C=pr(b,E,f,d);b=C[0],E=C[1]}break;case"t":for(;A.length>=S+2;){f=f+parseFloat(A[S++]),d=d+parseFloat(A[S++]),w(),a[p]=me.path2.appendBezier({segments:i,controlPoints:[[Z(b,t),U(E,t)],[Z(b,t),U(E,t)],[f,d]]},a[p]);let C=pr(b,E,f,d);b=C[0],E=C[1]}break;case"T":for(;A.length>=S+2;){f=parseFloat(A[S++]),d=parseFloat(A[S++]),w(),a[p]=me.path2.appendBezier({segments:i,controlPoints:[[Z(b,t),U(E,t)],[Z(b,t),U(E,t)],[Z(f,t),U(d,t)]]},a[p]);let C=pr(b,E,f,d);b=C[0],E=C[1]}break;case"s":for(;A.length>=S+4;){let C=v,F=y;v=f+parseFloat(A[S++]),y=d+parseFloat(A[S++]),f=f+parseFloat(A[S++]),d=d+parseFloat(A[S++]),w(),a[p]=me.path2.appendBezier({segments:i,controlPoints:[[Z(C,t),U(F,t)],[Z(v,t),U(y,t)],[Z(f,t),U(d,t)]]},a[p]);let R=pr(v,y,f,d);v=R[0],y=R[1]}break;case"S":for(;A.length>=S+4;){let C=v,F=y;v=parseFloat(A[S++]),y=parseFloat(A[S++]),f=parseFloat(A[S++]),d=parseFloat(A[S++]),w(),a[p]=me.path2.appendBezier({segments:i,controlPoints:[[Z(C,t),U(F,t)],[Z(v,t),U(y,t)],[Z(f,t),U(d,t)]]},a[p]);let R=pr(v,y,f,d);v=R[0],y=R[1]}break;case"h":for(;A.length>=S+1;)f=f+parseFloat(A[S++]),a[p]=Nt([[Z(f,t),U(d,t)]],a[p]);break;case"H":for(;A.length>=S+1;)f=parseFloat(A[S++]),a[p]=Nt([[Z(f,t),U(d,t)]],a[p]);break;case"l":for(;A.length>=S+2;)f=f+parseFloat(A[S++]),d=d+parseFloat(A[S++]),a[p]=Nt([[Z(f,t),U(d,t)]],a[p]);break;case"L":for(;A.length>=S+2;)f=parseFloat(A[S++]),d=parseFloat(A[S++]),a[p]=Nt([[Z(f,t),U(d,t)]],a[p]);break;case"v":for(;A.length>=S+1;)d=d+parseFloat(A[S++]),a[p]=Nt([[Z(f,t),U(d,t)]],a[p]);break;case"V":for(;A.length>=S+1;)d=parseFloat(A[S++]),a[p]=Nt([[Z(f,t),U(d,t)]],a[p]);break;case"z":case"Z":a[p]=me.path2.close(a[p]),f=u,d=h,x=!0;break;default:console.log("Warning: Unknow PATH command ["+T.c+"]");break}let $=C=>C==="z"||C==="Z";if(x!==!0&&a[p]&&a[p].isClosed){let C=e.commands[D+1];if(C&&!$(C.c))if(c==="trim")for(;C&&!$(C.c);)D++,C=e.commands[D+1];else if(c==="split")q();else throw new Error(`Malformed svg path at ${e.position[0]}:${T.pos}. Path closed itself with command #${D} ${T.c}${A.join(" ")}`)}}return a}});var Nq=m((Wse,Fq)=>{var{svg2cagX:Q,svg2cagY:ee,cagLengthX:Pt,cagLengthY:Wt,cagLengthP:QY,reflect:dr}=Mn(),eH=(e,t,r)=>{let{level:s,indent:n,on:o,svgUnitsPmm:i,svgUnitsX:c,svgUnitsY:a,svgUnitsV:l,svgGroups:u,target:h,segments:f}=r;return{group:g=>{let p=t({target:h,segments:f},g);return p+=`${n}${o} = levels.l${s+1}
`,p},rect:(g,p,x,v,y,b,E,q)=>{let w=Pt(g.x,p,x),D=0-Wt(g.y,p,v),T=Pt(g.width,p,x),A=Wt(g.height,p,v),S=Pt(g.rx,p,x),$;return T>0&&A>0&&(w=(w+T/2).toFixed(4),D=(D-A/2).toFixed(4),S===0?$=`${n}${o} = primitives.rectangle({center: [${w}, ${D}], size: [${T}, ${A}]}) // line ${g.position}
`:$=`${n}${o} = primitives.roundedRectangle({center: [${w}, ${D}], segments: ${q}, size: [${T}, ${A}], roundRadius: ${S}}) // line ${g.position}
`,h==="path"&&($+=`${n}${o} = geometries.path2.fromPoints({closed: true}, geometries.geom2.toPoints(${o}))
`)),$},circle:(g,p,x,v,y,b,E,q)=>{let w=Pt(g.x,p,x),D=0-Wt(g.y,p,v),T=QY(g.radius,p,y),A;return T>0&&(A=`${n}${o} = primitives.circle({center: [${w}, ${D}], segments: ${q}, radius: ${T}}) // line ${g.position}
`,h==="path"&&(A+=`${n}${o} = geometries.path2.fromPoints({closed: true}, geometries.geom2.toPoints(${o}))
`)),A},ellipse:(g,p,x,v,y,b,E,q)=>{let w=Pt(g.rx,p,x),D=Wt(g.ry,p,v),T=Pt(g.cx,p,x),A=0-Wt(g.cy,p,v),S;return w>0&&D>0&&(S=`${n}${o} = primitives.ellipse({center: [${T}, ${A}], segments: ${q}, radius: [${w}, ${D}]}) // line ${g.position}
`,h==="path"&&(S+=`${n}${o} = geometries.path2.fromPoints({closed: true}, geometries.geom2.toPoints(${o}))
`)),S},line:(g,p,x,v,y)=>{let b=Pt(g.x1,p,x),E=0-Wt(g.y1,p,v),q=Pt(g.x2,p,x),w=0-Wt(g.y2,p,v);return`${n}${o} = primitives.line([[${b}, ${E}], [${q}, ${w}]]) // line ${g.position}
`},polygon:(g,p,x,v)=>{let y=`${n}${o} = primitives.polygon({points: [
`;for(let b=0;b<g.points.length;b++){let E=g.points[b];if("x"in E&&"y"in E){let q=Pt(E.x,p,x),w=0-Wt(E.y,p,v);y+=`${n}  [${q}, ${w}],
`}}return y+=`${n}]}) // line ${g.position}
`,h==="path"&&(y+=`${n}${o} = geometries.path2.fromPoints({closed: true}, geometries.geom2.toPoints(${o}))
`),y},polyline:(g,p,x,v,y)=>{let b=`${n}${o} = geometries.path2.fromPoints({}, [
`;for(let E=0;E<g.points.length;E++){let q=g.points[E];if("x"in q&&"y"in q){let w=Pt(q.x,p,x),D=0-Wt(q.y,p,v);b+=`${n}  [${w}, ${D}],
`}}return b+=`${n}]) // line ${g.position}
`,b},path:tH}[e.type](e,i,c,a,l,r,u,f)};Fq.exports=eH;var tH=(e,t,r,s,n,o,i,c)=>{let{indent:a,on:l,target:u}=o,h=`${a}parts = [] // line ${e.position}
`,f=0,d=0,g=0,p=0,x=0,v=l+x,y=!1,b=0,E=0,q=0,w=0;for(let D=0;D<e.commands.length;D++){let T=e.commands[D],A=T.p;switch(T.c){case"m":for(D===0&&(g=0,p=0),x>0&&y===!1&&(h+=`${a}parts.push(${v})
`),A.length>=2&&(g=g+parseFloat(A.shift()),p=p+parseFloat(A.shift()),x++,y=!1,v=l+x,h+=`${a}${v} = geometries.path2.fromPoints({}, [[${Q(g,t)}, ${ee(p,t)}]])
`,f=g,d=p);A.length>=2;)g=g+parseFloat(A.shift()),p=p+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendPoints([${Q(g,t)}, ${ee(p,t)}], ${v})
`;break;case"M":for(x>0&&y===!1&&(h+=`${a}parts.push(${v})
`),A.length>=2&&(g=parseFloat(A.shift()),p=parseFloat(A.shift()),x++,y=!1,v=l+x,h+=`${a}${v} = geometries.path2.fromPoints({}, [[${Q(g,t)}, ${ee(p,t)}]])
`,f=g,d=p);A.length>=2;)g=parseFloat(A.shift()),p=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendPoints([${Q(g,t)}, ${ee(p,t)}], ${v})
`;break;case"a":for(;A.length>=7;){let S=parseFloat(A.shift()),$=parseFloat(A.shift()),C=0-parseFloat(A.shift())*.017453292519943295,F=A.shift()==="1",R=A.shift()==="1";g=g+parseFloat(A.shift()),p=p+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendArc({segments: ${c}, endpoint: [${Q(g,t)}, ${ee(p,t)}], radius: [${Q(S,t)}, ${ee($,t)}], xaxisrotation: ${C}, clockwise: ${R}, large: ${F}}, ${v})
`}break;case"A":for(;A.length>=7;){let S=parseFloat(A.shift()),$=parseFloat(A.shift()),C=0-parseFloat(A.shift())*.017453292519943295,F=A.shift()==="1",R=A.shift()==="1";g=parseFloat(A.shift()),p=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendArc({segments: ${c}, endpoint: [${Q(g,t)}, ${ee(p,t)}], radius: [${Q(S,t)}, ${ee($,t)}], xaxisrotation: ${C}, clockwise: ${R}, large: ${F}}, ${v})
`}break;case"c":for(;A.length>=6;){let S=g+parseFloat(A.shift()),$=p+parseFloat(A.shift());b=g+parseFloat(A.shift()),E=p+parseFloat(A.shift()),g=g+parseFloat(A.shift()),p=p+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendBezier({segments: ${c}, controlPoints: [[${Q(S,t)}, ${ee($,t)}], [${Q(b,t)}, ${ee(E,t)}], [${Q(g,t)}, ${ee(p,t)}]]}, ${v})
`;let C=dr(b,E,g,p);b=C[0],E=C[1]}break;case"C":for(;A.length>=6;){let S=parseFloat(A.shift()),$=parseFloat(A.shift());b=parseFloat(A.shift()),E=parseFloat(A.shift()),g=parseFloat(A.shift()),p=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendBezier({segments: ${c}, controlPoints: [[${Q(S,t)}, ${ee($,t)}], [${Q(b,t)}, ${ee(E,t)}], [${Q(g,t)}, ${ee(p,t)}]]}, ${v})
`;let C=dr(b,E,g,p);b=C[0],E=C[1]}break;case"q":for(;A.length>=4;){q=g+parseFloat(A.shift()),w=p+parseFloat(A.shift()),g=g+parseFloat(A.shift()),p=p+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendBezier({segments: ${c}, controlPoints: [[${Q(q,t)}, ${ee(w,t)}], [${Q(g,t)}, ${ee(p,t)}]]}, ${v})
`;let S=dr(q,w,g,p);q=S[0],w=S[1]}break;case"Q":for(;A.length>=4;){q=parseFloat(A.shift()),w=parseFloat(A.shift()),g=parseFloat(A.shift()),p=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendBezier({segments: ${c}, controlPoints: [[${Q(q,t)}, ${ee(w,t)}], [${Q(g,t)}, ${ee(p,t)}]]}, ${v})
`;let S=dr(q,w,g,p);q=S[0],w=S[1]}break;case"t":for(;A.length>=2;){g=g+parseFloat(A.shift()),p=p+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendBezier({segments: ${c}, controlPoints: [[${Q(q,t)}, ${ee(w,t)}], [${Q(g,t)}, ${ee(p,t)}]]}, ${v})
`;let S=dr(q,w,g,p);q=S[0],w=S[1]}break;case"T":for(;A.length>=2;){g=parseFloat(A.shift()),p=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendBezier({segments: ${c}, controlPoints: [[${Q(q,t)}, ${ee(w,t)}], [${Q(g,t)}, ${ee(p,t)}]]}, ${v})
`;let S=dr(q,w,g,p);q=S[0],w=S[1]}break;case"s":for(;A.length>=4;){let S=b,$=E;b=g+parseFloat(A.shift()),E=p+parseFloat(A.shift()),g=g+parseFloat(A.shift()),p=p+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendBezier({segments: ${c}, controlPoints: [[${Q(S,t)}, ${ee($,t)}], [${Q(b,t)}, ${ee(E,t)}], [${Q(g,t)}, ${ee(p,t)}]]}, ${v})
`;let C=dr(b,E,g,p);b=C[0],E=C[1]}break;case"S":for(;A.length>=4;){let S=b,$=E;b=parseFloat(A.shift()),E=parseFloat(A.shift()),g=parseFloat(A.shift()),p=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendBezier({segments: ${c}, controlPoints: [[${Q(S,t)}, ${ee($,t)}], [${Q(b,t)}, ${ee(E,t)}], [${Q(g,t)}, ${ee(p,t)}]]}, ${v})
`;let C=dr(b,E,g,p);b=C[0],E=C[1]}break;case"h":for(;A.length>=1;)g=g+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendPoints([[${Q(g,t)}, ${ee(p,t)}]], ${v})
`;break;case"H":for(;A.length>=1;)g=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendPoints([[${Q(g,t)}, ${ee(p,t)}]], ${v})
`;break;case"l":for(;A.length>=2;)g=g+parseFloat(A.shift()),p=p+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendPoints([[${Q(g,t)}, ${ee(p,t)}]], ${v})
`;break;case"L":for(;A.length>=2;)g=parseFloat(A.shift()),p=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendPoints([[${Q(g,t)}, ${ee(p,t)}]], ${v})
`;break;case"v":for(;A.length>=1;)p=p+parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendPoints([[${Q(g,t)}, ${ee(p,t)}]], ${v})
`;break;case"V":for(;A.length>=1;)p=parseFloat(A.shift()),h+=`${a}${v} = geometries.path2.appendPoints([[${Q(g,t)}, ${ee(p,t)}]], ${v})
`;break;case"z":case"Z":h+=`${a}${v} = geometries.path2.close(${v})
`,u==="geom2"&&(h+=`${a}${v} = geometries.geom2.fromPoints(geometries.path2.toPoints(${v}))
`),h+=`${a}parts.push(${v})
`,g=f,p=d,y=!0;break;default:console.log("Warning: Unknow PATH command ["+T.c+"]");break}}return x>0&&y===!1&&(h+=`${a}parts.push(${v})
`),h+=`${a}${l} = parts
`,h}});var Gq=m((Jse,Vq)=>{var rH=hi(),{colors:sH,transforms:Nn}=ue(),{toArray:nH}=dt(),oH=wq().version,{cagLengthX:kq,cagLengthY:Oq,svgColorForTarget:Lq}=Mn(),{svgSvg:iH,svgRect:cH,svgCircle:aH,svgGroup:lH,svgLine:uH,svgPath:fH,svgEllipse:hH,svgPolygon:pH,svgPolyline:dH,svgUse:gH}=Rq(),mH=Mq(),xH=Nq(),vH=(e,t)=>{let r={addMetaData:!0,filename:"svg",output:"script",pxPmm:xi().pxPmm,segments:32,target:"path",pathSelfClosed:"error",version:oH};return e=Object.assign({},r,e),e.output==="script"?yH(t,e):EH(t,e)},EH=(e,t)=>{let{pxPmm:r}=t;if(t&&t.statusCallback&&t.statusCallback({progress:0}),Bq(e,r),!Ln)throw new Error("SVG parsing failed, no valid SVG data retrieved");t&&t.statusCallback&&t.statusCallback({progress:50});let s=zq(t,Ln);return t&&t.statusCallback&&t.statusCallback({progress:100}),s},yH=(e,t)=>{let{filename:r,version:s,pxPmm:n,addMetaData:o}=t;if(t&&t.statusCallback&&t.statusCallback({progress:0}),Bq(e,n),!Ln)throw new Error("SVG parsing failed, no valid SVG data retrieved");let i=o?`//
  // producer: JSCAD SVG Deserializer ${s}
  // date: ${new Date}
  // source: ${r}
  //
`:"";i+=`const { colors, geometries, primitives, transforms } = require('@jscad/modeling')

`,t&&t.statusCallback&&t.statusCallback({progress:50});let c=_q(t,Ln);return i+=c,i+=`
module.exports = { main }`,t&&t.statusCallback&&t.statusCallback({progress:100}),i},kn,On,b0,Pq=[],Ge=[],Pn=[],yi=!1,Ln,Nr=[1,1],zq=(e,t)=>{let{target:r,segments:s,pathSelfClosed:n}=e,o=Ge.length;Ge.push(t);let i=o;for(;i>0;)i--;let c=[],a={svgUnitsPmm:Nr,svgUnitsX:kn,svgUnitsY:On,svgUnitsV:b0,level:o,target:r,svgGroups:Ge,segments:s,pathSelfClosed:n};for(i=0;i<t.objects.length;i++){let l=t.objects[i],u=nH(mH(l,zq,a));u=u.map(h=>{if("transforms"in l){let d=null,g=null,p=null;for(let x=0;x<l.transforms.length;x++){let v=l.transforms[x];"rotate"in v&&(d=v),"scale"in v&&(g=v),"translate"in v&&(p=v)}if(g!==null){let x=Math.abs(g.scale[0]),v=Math.abs(g.scale[1]);h=Nn.scale([x,v,1],h),x=g.scale[0],v=g.scale[1],x<0&&(h=Nn.mirrorX(h)),v<0&&(h=Nn.mirrorY(h))}if(d!==null){let x=0-d.rotate*.017453292519943295;h=Nn.rotateZ(x,h)}if(p!==null){let x=kq(p.translate[0],Nr,kn),v=0-Oq(p.translate[1],Nr,On);h=Nn.translate([x,v,0],h)}}let f=Lq(r,l);return f&&(h=sH.colorize(f,h)),h}),c=c.concat(u)}return Ge.pop(),c},_q=(e,t)=>{let{target:r,segments:s}=e,n=Ge.length;Ge.push(t);let o="  ",i=n;for(;i>0;)o+="  ",i--;let c="";n===0&&(c+=`function main(params) {
  let levels = {}
  let paths = {}
  let parts
`);let a="levels.l"+n;for(c+=`${o}${a} = []
`,i=0;i<t.objects.length;i++){let l=t.objects[i],u="paths.p"+i,f=xH(l,_q,{level:n,indent:o,ln:a,on:u,svgUnitsPmm:Nr,svgUnitsX:kn,svgUnitsY:On,svgUnitsV:b0,svgGroups:Ge,target:r,segments:s});if(c+=f,"transforms"in l){let g=null,p=null,x=null;for(let v=0;v<l.transforms.length;v++){let y=l.transforms[v];"rotate"in y&&(g=y),"scale"in y&&(p=y),"translate"in y&&(x=y)}if(p!==null){let v=Math.abs(p.scale[0]),y=Math.abs(p.scale[1]);c+=`${o}${u} = transforms.scale([${v}, ${y}, 1], ${u})
`,v=p.scale[0],y=p.scale[1],v<0&&(c+=`${o}${u} = transforms.mirrorX(${u})
`),y<0&&(c+=`${o}${u} = transforms.mirrorY(${u})
`)}if(g!==null){let v=0-g.rotate*.017453292519943295;c+=`${o}${u} = transforms.rotateZ(${v}, ${u})
`}if(x!==null){let v=kq(x.translate[0],Nr,kn),y=0-Oq(x.translate[1],Nr,On);c+=`${o}${u} = transforms.translate([${v}, ${y}, 0], ${u})
`}}let d=Lq(r,l);d&&(c+=`${o}${u} = colors.colorize([${d}], ${u})
`),c+=`${o}${a} = ${a}.concat(${u})

`}return n===0&&(c+=o+"return "+a+`
`,c+=`}
`),Ge.pop(),c},Bq=(e,t)=>{let r=new rH.SaxesParser;return t!==void 0&&t>r.pxPmm&&(r.pxPmm=t),r.on("error",s=>{console.log(`ERROR: SVG file, line ${r.line}, column ${r.column}`),console.log(s)}),r.on("opentag",s=>{let n={SVG:iH,G:lH,RECT:cH,CIRCLE:aH,ELLIPSE:hH,LINE:uH,POLYLINE:dH,POLYGON:pH,PATH:fH,USE:gH,DEFS:()=>{yi=!0},DESC:()=>{},TITLE:()=>{},STYLE:()=>{},undefined:()=>console.log("WARNING: unsupported SVG element: "+s.name)};s.attributes.position=[r.line+1,r.column+1];let o=s.name.toUpperCase(),i=n[o]?n[o](s.attributes,{svgObjects:Pq,customPxPmm:t}):void 0;if(i)if("id"in i&&(Pq[i.id]=i),i.type==="svg")Ge.push(i),Nr=i.unitsPmm,kn=i.viewW,On=i.viewH,b0=i.viewP;else if(yi===!0){if(Pn.length>0){let c=Pn.pop();"objects"in c&&c.objects.push(i),Pn.push(c)}i.type==="group"&&Pn.push(i)}else{if(Ge.length>0){let c=Ge.pop();"objects"in c&&c.objects.push(i),Ge.push(c)}i.type==="group"&&Ge.push(i)}}),r.on("closetag",s=>{let n=()=>yi===!0?Pn.pop():Ge.pop(),o={SVG:n,DEFS:()=>{yi=!1},USE:n,G:n,undefined:()=>{}},i=s.name.toUpperCase(),c=o[i]?o[i]():void 0;Ge.length===0&&(Ln=c)}),r.on("end",()=>{}),r.write(e).close(),r},AH="svg";Vq.exports={deserialize:vH,extension:AH}});var Xq=m((Kse,bH)=>{bH.exports={name:"@jscad/x3d-deserializer",version:"2.2.3",description:"X3D Deserializer for JSCAD",repository:"https://github.com/jscad/OpenJSCAD.org/",main:"src/index.js",scripts:{coverage:"nyc --all --reporter=html --reporter=text npm test",test:"ava --verbose --timeout 2m 'tests/**/*.test.js'"},contributors:[{name:"z3dev",url:"https://github.com/z3dev"}],keywords:["openjscad","jscad","import","deserializer","x3d"],license:"MIT",publishConfig:{access:"public"},dependencies:{"@jscad/array-utils":"2.1.4","@jscad/modeling":"2.11.0",saxes:"5.0.1"},devDependencies:{ava:"3.15.0",nyc:"15.1.0"},gitHead:"5899622c5ffc640001da7261d7c06a1223064ccc"}});var w0=m((Qse,Yq)=>{var{maths:De}=ue(),wH=(e,t,r,s,n)=>{let o=De.mat4.create(),i=De.mat4.create();return De.mat4.multiply(o,o,De.mat4.fromTranslation(i,n)),De.mat4.multiply(o,o,De.mat4.fromTranslation(i,e)),De.mat4.multiply(o,o,De.mat4.fromRotation(i,t[3],t)),De.mat4.multiply(o,o,De.mat4.fromRotation(i,s[3],s)),De.mat4.multiply(o,o,De.mat4.fromScaling(i,r)),De.mat4.multiply(o,o,De.mat4.fromRotation(i,s[3],De.vec3.negate(De.vec3.create(),s))),De.mat4.multiply(o,o,De.mat4.fromTranslation(i,De.vec3.negate(De.vec3.create(),e))),o};Yq.exports=wH});var At=m((ene,Hq)=>{var{maths:qH}=ue(),J={X3D:0,UNIT:1,META:2,SCENE:3,TRANSFORM:4,SHAPE:5,GROUP:6,APPEARANCE:7,TRIANGLESET:10,TRIANGLEFANSET:11,TRIANGLESTRIPSET:12,QUADSET:13,INDEXEDTRIANGLESET:14,INDEXEDTRIANGLEFANSET:15,INDEXEDTRIANGLESTRIPSET:16,INDEXEDQUADSET:17,ELEVATIONGRID:18,INDEXEDFACESET:19,LINESET:20,INDEXEDLINESET:21,BOX:50,CONE:51,CYLINDER:52,SPHERE:53,EXTRUSION:54,ARC2D:61,ARCCLOSE2D:62,CIRCLE2D:63,DISK2D:64,POLYLINE2D:65,RECTANGLE2D:66,TRIANGLESET2D:67,COLOR:91,COORDINATE:92,MATERIAL:93},SH=e=>{let t={definition:J.X3D};return t.objects=[],t},DH=e=>{let t={definition:J.UNIT,category:"",name:"",conversionFactor:1};return e.category&&(t.category=e.category),e.name&&(t.name=e.name),e.conversionfactor&&(t.conversionFactor=e.conversionfactor),t},TH=e=>{let t={definition:J.META,content:"",name:""};return e.content&&(t.content=e.content),e.name&&(t.name=e.name),t},CH=e=>{let t={definition:J.SCENE};return t.objects=[],t},$H=e=>{let t={definition:J.TRANSFORM,center:[0,0,0],rotation:[0,0,1,0],scale:[1,1,1],scaleOrientation:[0,0,1,0],translation:[0,0,0]};if(e.center){let r=e.center.trim().split(/ +/).map(s=>parseFloat(s));r.length>2&&(t.center=r)}if(e.rotation){let r=e.rotation.trim().split(/ +/).map(s=>parseFloat(s));r.length>3&&(t.rotation=r)}if(e.scale){let r=e.scale.trim().split(/ +/).map(s=>parseFloat(s));r.length>2&&(t.scale=r)}if(e.scaleorientation){let r=e.scaleorientation.trim().split(/ +/).map(s=>parseFloat(s));r.length>3&&(t.scaleOrientation=r)}if(e.translation){let r=e.translation.trim().split(/ +/).map(s=>parseFloat(s));r.length>2&&(t.translation=r)}return t.objects=[],t},RH=e=>{let t={definition:J.SHAPE};return t.objects=[],t},IH=e=>{let t={definition:J.BOX,size:[2,2,2]};if(e.size){let r=e.size.trim().split(/ +/).map(s=>parseFloat(s));r.length>2&&(t.size=r)}return t},MH=e=>{let r={definition:J.CONE,bottomRadius:1,height:2,subdivision:32,topRadius:1e-5};return e.bottomRadius&&(r.bottomRadius=Math.max(parseFloat(e.bottomRadius),1e-5)),e.height&&(r.height=parseFloat(e.height)),e.subdivision&&(r.subdivision=parseFloat(e.subdivision)),e.topRadius&&(r.topRadius=Math.max(parseFloat(e.topRadius),1e-5)),r},FH=e=>{let t={definition:J.CYLINDER,height:2,radius:1,subdivision:32};return e.height&&(t.height=parseFloat(e.height)),e.radius&&(t.radius=parseFloat(e.radius)),e.subdivision&&(t.subdivision=parseFloat(e.subdivision)),t},NH=e=>{let t={definition:J.SPHERE,radius:1,subdivision:24};if(e.radius&&(t.radius=parseFloat(e.radius)),e.subdivision){let r=e.subdivision.trim().split(/ +/).map(s=>parseFloat(s));r.length>1&&(t.subdivision=Math.max(...r))}return t},PH=e=>{let t={definition:J.EXTRUSION,ccw:!0,beginCap:!0,endCap:!0,crossSection:[[1,1],[1,-1],[-1,-1],[-1,1],[1,1]],orientations:[[0,0,1,0]],scales:[[1,1]],spine:[[0,0,0],[0,1,0]]};if(e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.beginCap&&(t.beginCap=e.beginCap.includes("TRUE")||e.beginCap.includes("true")),e.endCap&&(t.endCap=e.endCap.includes("TRUE")||e.endCap.includes("true")),e.crossSection){let r=e.crossSection.trim().split(/ +/).map(o=>parseFloat(o)),s=Math.trunc(r.length/2),n=[];for(let o=0;o<s;o++){let i=o*2;n.push([r[i],r[i+1]])}t.ccw=qH.utils.area(n)<0,t.crossSection=n}if(e.orientation){let r=e.orientation.trim().split(/ +/).map(o=>parseFloat(o)),s=Math.trunc(r.length/4),n=[];for(let o=0;o<s;o++){let i=o*4;n.push([r[i],r[i+1],r[i+2],r[i+3]])}t.orientations=n}if(e.scale){let r=e.scale.trim().split(/ +/).map(o=>parseFloat(o)),s=Math.trunc(r.length/2),n=[];for(let o=0;o<s;o++){let i=o*2;r[i]===0&&(r[i]=1e-6),r[i+1]===0&&(r[i+1]=1e-6),n.push([r[i],r[i+1]])}t.scales=n}if(e.spine){let r=e.spine.trim().split(/ +/).map(o=>parseFloat(o)),s=Math.trunc(r.length/3),n=[];for(let o=0;o<s;o++){let i=o*3;n.push([r[i],r[i+1],r[i+2]])}t.spine=n}return t},kH=e=>{let t={definition:J.ARC2D,endAngle:Math.PI/2,radius:1,startAngle:0,subdivision:32};return e.endAngle&&(t.endAngle=parseFloat(e.endAngle)),e.radius&&(t.radius=parseFloat(e.radius)),e.startAngle&&(t.startAngle=parseFloat(e.startAngle)),e.subdivision&&(t.subdivision=parseFloat(e.subdivision)),t},OH=e=>{let t={definition:J.ARCCLOSE2D,closureType:"PIE",endAngle:Math.PI/2,radius:1,startAngle:0,subdivision:32};return e.closureType&&(t.closureType=e.closureType),e.endAngle&&(t.endAngle=parseFloat(e.endAngle)),e.radius&&(t.radius=parseFloat(e.radius)),e.startAngle&&(t.startAngle=parseFloat(e.startAngle)),e.subdivision&&(t.subdivision=parseFloat(e.subdivision)),t},LH=e=>{let t={definition:J.CIRCLE2D,radius:1,subdivision:32};return e.radius&&(t.radius=parseFloat(e.radius)),e.subdivision&&(t.subdivision=parseFloat(e.subdivision)),t},zH=e=>{let t={definition:J.DISK2D,innerRadius:0,outerRadius:1,subdivision:32};return e.innerRadius&&(t.innerRadius=parseFloat(e.innerRadius)),e.outerRadius&&(t.outerRadius=parseFloat(e.outerRadius)),e.subdivision&&(t.subdivision=parseFloat(e.subdivision)),t},_H=e=>{let t={definition:J.POLYLINE2D,lineSegments:[]};if(e.lineSegments){let r=e.lineSegments.trim().split(/ +/).map(s=>parseFloat(s));for(let s=0;s<r.length;s=s+2){let n=[r[s],r[s+1]];t.lineSegments.push(n)}}return t},BH=e=>{let t={definition:J.RECTANGLE2D,size:[2,2]};if(e.size){let r=e.size.trim().split(/ +/).map(s=>parseFloat(s));r.length>1&&(t.size=r)}return t},VH=e=>{let t={definition:J.TRIANGLESET2D,vertices:[]};if(e.vertices){let r=e.vertices.trim().split(/ +/).map(s=>parseFloat(s));for(let s=0;s<r.length;s=s+2){let n=[r[s],r[s+1]];t.vertices.push(n)}}return t},GH=e=>{let t={definition:J.LINESET,vertexCount:[],colorPerVertex:!0};return e.vertexCount&&(t.vertexCount=e.vertexCount.trim().split(/ +/).map(r=>parseFloat(r))),e.colorPerVertex&&(t.colorPerVertex=e.colorPerVertex.includes("TRUE")||e.colorPerVertex.includes("true")),t.objects=[],t},XH=e=>{let t={definition:J.INDEXEDLINESET,indexes:[],colorPerVertex:!0};if(e.coordIndex){let r=e.coordIndex.trim().split(/ -1/);t.indexes=r.map(s=>s.trim().split(/ +/).map(n=>parseFloat(n))),t.indexes=t.indexes.filter(s=>s.length>1)}return e.colorPerVertex&&(t.colorPerVertex=e.colorPerVertex.includes("TRUE")||e.colorPerVertex.includes("true")),t.objects=[],t},YH=e=>{let t={definition:J.COLOR,colors:[]};if(e.color){let r=e.color.trim().split(/ +/).map(o=>parseFloat(o)),s=r.length,n=Math.trunc(s/3);for(let o=0;o<n;o++){let i=o*3;t.colors.push([r[i],r[i+1],r[i+2]])}}return t},HH=e=>{let t={definition:J.COORDINATE,points:[]};if(e.point){let r=e.point.trim().split(/ +/).map(o=>parseFloat(o)),s=r.length,n=Math.trunc(s/3);for(let o=0;o<n;o++){let i=o*3;t.points.push([r[i],r[i+1],r[i+2]])}}return t},jH=e=>{let t={definition:J.TRIANGLESET,ccw:!0,colorPerVertex:!0};return e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),t.objects=[],t},ZH=e=>{let t={definition:J.TRIANGLEFANSET,ccw:!0,fanCount:[],colorPerVertex:!0};return e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.fanCount&&(t.fanCount=e.fanCount.trim().split(/ +/).map(r=>parseFloat(r))),t.objects=[],t},UH=e=>{let t={definition:J.TRIANGLESTRIPSET,ccw:!0,stripCount:[],colorPerVertex:!0};return e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.stripCount&&(t.stripCount=e.stripCount.trim().split(/ +/).map(r=>parseFloat(r))),t.objects=[],t},WH=e=>{let t={definition:J.QUADSET,ccw:!0,colorPerVertex:!0};return e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),t.objects=[],t},JH=e=>{let t={definition:J.INDEXEDTRIANGLESET,ccw:!0,index:[],colorPerVertex:!0};return e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.index&&(t.index=e.index.trim().split(/ +/).map(r=>parseFloat(r))),t.objects=[],t},KH=e=>{let t={definition:J.INDEXEDTRIANGLEFANSET,ccw:!0,fans:[],colorPerVertex:!0};if(e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.index){let r=e.index.trim().split(/ -1/);t.fans=r.map(s=>s.trim().split(/ +/).map(n=>parseFloat(n))).filter(s=>s.length>2)}return t.objects=[],t},QH=e=>{let t={definition:J.INDEXEDTRIANGLESTRIPSET,ccw:!0,strips:[],colorPerVertex:!0};if(t.objects=[],e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.index){let r=e.index.trim().split(/ -1/);t.strips=r.map(s=>s.trim().split(/ +/).map(n=>parseFloat(n))).filter(s=>s.length>2)}return t},ej=e=>{let t={definition:J.INDEXEDQUADSET,ccw:!0,index:[],colorPerVertex:!0};return e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.index&&(t.index=e.index.trim().split(/ +/).map(r=>parseFloat(r))),t.objects=[],t},tj=e=>{let t={definition:J.INDEXEDFACESET,ccw:!0,convex:!0,faces:[],colorPerVertex:!0,colorIndex:null};if(e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.convex&&(t.convex=e.convex.includes("TRUE")||e.convex.includes("true")),e.coordIndex){let r=e.coordIndex.trim().split(/ -1/);t.faces=r.map(s=>s.trim().split(/ +/).map(n=>parseFloat(n))).filter(s=>s.length>2)}if(e.colorPerVertex&&(t.colorPerVertex=e.colorPerVertex.includes("TRUE")||e.colorPerVertex.includes("true")),e.colorIndex)if(t.colorPerVertex){let r=e.colorIndex.trim().split(/ -1/);t.colorIndex=r.map(s=>s.trim().split(/ +/).map(n=>parseFloat(n))).filter(s=>s.length>2)}else t.colorIndex=e.colorIndex.trim().split(/ +/).map(r=>parseFloat(r));else t.colorIndex=t.faces;return t.objects=[],t},rj=e=>{let t={definition:J.ELEVATIONGRID,xDimension:2,zDimension:2,xSpacing:1,zSpacing:1,height:[0,0,0,0],ccw:!0,solid:!1,colorPerVertex:!0};return e.xDimension&&(t.xDimension=parseFloat(e.xDimension)),e.zDimension&&(t.zDimension=parseFloat(e.zDimension)),e.xSpacing&&(t.xSpacing=parseFloat(e.xSpacing)),e.zSpacing&&(t.zSpacing=parseFloat(e.zSpacing)),e.height&&(t.height=e.height.trim().split(/ +/).map(r=>parseFloat(r))),e.ccw&&(t.ccw=e.ccw.includes("TRUE")||e.ccw.includes("true")),e.solid&&(t.solid=e.solid.includes("TRUE")||e.solid.includes("true")),e.colorPerVertex&&(t.colorPerVertex=e.colorPerVertex.includes("TRUE")||e.colorPerVertex.includes("true")),t.objects=[],t},sj=e=>{let t={definition:J.APPEARANCE};return t.objects=[],t},nj=e=>{let t={definition:J.MATERIAL,color:[.8,.8,.8,1]},r=1;if(e.transparency&&(r=1-e.transparency),e.diffuseColor){let s=e.diffuseColor.trim().split(/ +/).map(n=>parseFloat(n));s.length>2&&(s.length<4&&s.push(r),t.color=s)}if(e.emissiveColor){let s=e.emissiveColor.trim().split(/ +/).map(n=>parseFloat(n));s.length>2&&(s.length<4&&s.push(r),t.color=s)}return t},oj=e=>{let t={definition:J.GROUP};return t.objects=[],t};Hq.exports={x3dTypes:J,x3dX3D:SH,x3dUnit:DH,x3dMeta:TH,x3dScene:CH,x3dTransform:$H,x3dShape:RH,x3dGroup:oj,x3dBox:IH,x3dCone:MH,x3dCylinder:FH,x3dSphere:NH,x3dExtrusion:PH,x3dArc2D:kH,x3dArcClose2D:OH,x3dCircle2D:LH,x3dDisk2D:zH,x3dPolyline2D:_H,x3dRectangle2D:BH,x3dTriangleSet2D:VH,x3dColor:YH,x3dCoordinate:HH,x3dTriangleSet:jH,x3dTriangleFanSet:ZH,x3dTriangleStripSet:UH,x3dQuadSet:WH,x3dIndexedTriangleSet:JH,x3dIndexedTriangleFanSet:KH,x3dIndexedTriangleStripSet:QH,x3dIndexedQuadSet:ej,x3dIndexedFaceSet:tj,x3dElevationGrid:rj,x3dLineSet:GH,x3dIndexedLineSet:XH,x3dAppearance:sj,x3dMaterial:nj}});var S0=m((tne,Zq)=>{var{extrusions:ij,geometries:jq,maths:cj}=ue(),{mat4:Xe,vec3:re,utils:aj}=cj,{extrudeFromSlices:lj,slice:q0}=ij,uj=e=>{let t=e.length,r=re.equals(e[0],e[t-1]),s=[];for(let n=0;n<t;n++){let o=re.create();n===0?r?re.normalize(o,re.subtract(o,e[1],e[t-2])):re.normalize(o,re.subtract(o,e[1],e[0])):n===t-1?r?re.normalize(o,re.subtract(o,e[1],e[t-2])):re.normalize(o,re.subtract(o,e[t-1],e[t-2])):re.normalize(o,re.subtract(o,e[n+1],e[n-1])),s.push(o)}return s},_n=e=>e[0]+0===0&&e[1]+0===0&&e[2]+0===0,zn=(e,t,r,s)=>{let n=re.subtract(re.create(),s,r),o=re.subtract(re.create(),t,r);return re.normalize(e,re.cross(e,n,o))},fj=e=>{let t=e.length,r=re.equals(e[0],e[t-1]),s=[],n;for(let o=0;o<t;o++){let i=re.create();o===0?r?zn(i,e[t-2],e[0],e[1]):t>2&&zn(i,e[0],e[1],e[2]):o===t-1?r?zn(i,e[t-2],e[0],e[1]):t>2&&zn(i,e[t-3],e[t-2],e[t-1]):zn(i,e[o-1],e[o],e[o+1]),n&&re.dot(n,i)<0&&re.negate(i,i),s.push(i),n=i}if(_n(s[0])){for(let o=1;o<s.length;o++)if(!_n(s[o])){s[0]=s[o];break}}for(let o=1;o<s.length;o++)_n(s[o])&&!_n(s[o-1])&&re.clone(s[o],s[o-1]);return s},hj=(e,t)=>{let r=[];for(let s=0;s<e.length;s++){let n=re.create();r.push(re.normalize(n,re.cross(n,e[s],t[s])))}return r},pj=(e,t,r,s)=>(e[0]=t[0],e[1]=r[0],e[2]=s[0],e[3]=0,e[4]=t[1],e[5]=r[1],e[6]=s[1],e[7]=0,e[8]=t[2],e[9]=r[2],e[10]=s[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e),dj=e=>{let{beginCap:t,endCap:r,crossSection:s,orientations:n,scales:o,spine:i}=Object.assign({},e);if(aj.area(s)<0&&s.reverse(),o.length===1&&(o=i.map(p=>o[0])),n.length===1&&(n=i.map(p=>n[0])),i.length!==o.length||i.length!==n.length)throw new Error(`invalid X3D specification; spine scale orientaion length must be the same; ${i.length}`);let c=jq.geom2.fromPoints(s),a=q0.fromSides(jq.geom2.toSides(c)),l=uj(i),u=fj(i),h=hj(l,u),f=[0,1,0],d=Xe.fromVectorRotation(Xe.create(),re.fromValues(0,0,1),f);return u.reduce((p,x)=>p&&_n(x),!0)&&(re.subtract(f,i[1],i[0]),Xe.fromVectorRotation(d,re.fromValues(0,0,1),f),h=h.map(p=>[1,0,0]),l=l.map(p=>[0,1,0]),u=u.map(p=>[0,0,1])),lj({numberOfSlices:i.length,capStart:t,capEnd:r,callback:function(p,x,v){let y=i[x],b=re.fromVec2(re.create(),o[x],1),E=n[x],q=h[x],w=l[x],D=u[x],T=Xe.fromTranslation(Xe.create(),y),A=Xe.fromScaling(Xe.create(),b),S=pj(Xe.create(),q,w,D),$=Xe.fromRotation(Xe.create(),E[3],E),C=Xe.create();Xe.multiply(C,d,C),Xe.multiply(C,S,C),Xe.multiply(C,$,C),Xe.multiply(C,T,C);let F=v;return F=q0.transform(A,F),F=q0.transform(C,F),F}},a)};Zq.exports=dj});var gr=m((rne,Wq)=>{var{x3dTypes:D0}=At(),Ai=(e,t)=>t.find(r=>r.definition===e),gj=(e,t)=>{let r=Ai(D0.APPEARANCE,e),s;return(r&&(s=Ai(D0.MATERIAL,r.objects),s)||(s=Ai(D0.MATERIAL,e),s))&&s.color?s.color:null},Uq=e=>`[${e}]`,mj=e=>`[
    ${e.map(r=>Uq(r)).join(`,
    `)}
  ]`,xj=(e,t)=>{if(!(Array.isArray(e)&&Array.isArray(t)))return null;if(e.length<0||!Array.isArray(e[0]))return console.log("ERROR: WRONG FORMAT FOR VERTEXCOLORS"),null;let r=[];for(let s=0;s<e.length;s++){let n=e[s],o=0,i=0,c=0,a=1;for(let u=0;u<n.length;u++){let h=t[n[u]];h&&(o+=h[0],i+=h[1],c+=h[2])}let l=[o/n.length,i/n.length,c/n.length,a];r.push(l)}return r},vj=(e,t)=>Array.isArray(e)&&Array.isArray(t)?e.map(s=>t[s]?t[s]:null):null,Ej=(e,t)=>{if(!t||!Array.isArray(e.colorIndex))return null;let r=null;return e.colorPerVertex===!0?r=xj(e.colorIndex,t.colors):r=vj(e.colorIndex,t.colors),r};Wq.exports={findNode:Ai,findColor:gj,createColors:Ej,pointToString:Uq,pointsToString:mj}});var C0=m((sne,Qq)=>{var T0=ue(),{createColors:Jq,findNode:Cs}=gr(),{x3dTypes:$s}=At(),Kq=(e,t)=>{let r=Cs($s.INDEXEDLINESET,t);if(r){let s=Cs($s.COORDINATE,r.objects),n=r.indexes,o=Cs($s.COLOR,r.objects);if(s&&n){let i=n.map(a=>{let l=a.map(h=>s.points[h]);return l.findIndex(h=>h[2]!==0)>=0&&(console.warn("WARNING: unsupported 3D indexed line set was ignored"),l=[]),l});r.colorPerVertex===!0?r.colorIndex=n:r.colorIndex=n.map((a,l)=>l);let c=Jq(r,o);return{pointsSet:i,colors:c}}}if(r=Cs($s.LINESET,t),r){let s=Cs($s.COORDINATE,r.objects),n=Cs($s.COLOR,r.objects),o=r.vertexCount;if(s&&o){let i=0,c=o.map(l=>{let u=[];for(let f=0;f<l;f++)u.push(s.points[i]),i++;return u.findIndex(f=>f[2]!==0)>=0&&(console.warn("WARNING: unsupported 3D line set was ignored"),u=[]),u});if(r.colorPerVertex===!0){let l=0;r.colorIndex=o.map(u=>{let h=[];for(let f=0;f<u;f++)h.push(l),l++;return h})}else r.colorIndex=c.map((l,u)=>u);let a=Jq(r,n);return{pointsSet:c,colors:a}}}return null},yj=(e,t)=>{let r,s=Kq(e,t);if(s){let{pointsSet:n,colors:o}=s;r=n.map((i,c)=>{let a;return o?a=T0.colors.colorize(o[c],T0.primitives.line(i)):a=T0.primitives.line(i),a})}return r};Qq.exports={convertLine:Kq,instantiateLine:yj}});var r4=m((nne,t4)=>{var{pointsToString:e4}=gr(),{convertLine:Aj}=C0(),bj=(e,t)=>{let r=Aj(e,t);if(r){let{pointsSet:s,colors:n}=r,o=`  let lines = []
`;return s.forEach((c,a)=>{if(n){let l=n[a];o+=`  const line${a} = colorize([${l}], primitives.line(${e4(c)}))
  lines.push(line${a})
`}else o+=`  const line${a} = primitives.line(${e4(c)})
  lines.push(line${a})
`}),{primitive:"...lines",code:o}}return null};t4.exports=bj});var $0=m((one,n4)=>{var{primitives:wj}=ue(),{x3dTypes:ce}=At(),{findNode:ae,createColors:kt}=gr(),s4=(e,t)=>{let r=ae(ce.TRIANGLESET,t);if(r){let s=ae(ce.COORDINATE,r.objects),n=ae(ce.COLOR,r.objects);if(s){let o=s.points,i=o.length,c=Math.trunc(i/3),a=[];for(let f=0;f<c;f++){let d=f*3;a.push([d,d+1,d+2])}let l=r.ccw?"outward":"inward";r.colorIndex=a;let u=kt(r,n);return{type:"triangles",points:o,faces:a,colors:u,orientation:l}}}if(r=ae(ce.TRIANGLEFANSET,t),r){let s=r.fanCount,n=ae(ce.COORDINATE,r.objects),o=ae(ce.COLOR,r.objects);if(n){let i=n.points,c=s.length,a=[],l=0;for(let d=0;d<c;d++){let g=Math.trunc(s[d]);for(let p=1;p<g-1;p++)a.push([l,l+p,l+p+1]);l+=g}let u=r.ccw?"outward":"inward";r.colorIndex=a;let h=kt(r,o);return{type:`triangle fans (${c})`,points:i,faces:a,colors:h,orientation:u}}}if(r=ae(ce.TRIANGLESTRIPSET,t),r){let s=r.stripCount,n=ae(ce.COORDINATE,r.objects),o=ae(ce.COLOR,r.objects);if(n){let i=n.points,c=s.length,a=[],l=0;for(let d=0;d<c;d++){let g=Math.trunc(s[d]);for(let p=0;p<g-2;p++){let x=[l+p,l+p+1,l+p+2];p%2===1&&x.reverse(),a.push(x)}l+=g}r.colorIndex=a;let u=kt(r,o),h=r.ccw?"outward":"inward";return{type:`triangle strip (${c})`,points:i,faces:a,colors:u,orientation:h}}}if(r=ae(ce.QUADSET,t),r){let s=ae(ce.COORDINATE,r.objects),n=ae(ce.COLOR,r.objects);if(s){let o=s.points,i=o.length,c=Math.trunc(i/4),a=[];for(let f=0;f<c;f++){let d=f*4;a.push([d,d+1,d+2,d+3])}r.colorIndex=a;let l=kt(r,n),u=r.ccw?"outward":"inward";return{type:`quad (${c})`,points:o,faces:a,colors:l,orientation:u}}}if(r=ae(ce.INDEXEDTRIANGLESET,t),r){let s=ae(ce.COORDINATE,r.objects),n=ae(ce.COLOR,r.objects),o=r.index;if(s&&o&&o.length>2){let i=s.points,c=Math.trunc(o.length/3),a=[];for(let f=0;f<c;f++){let d=f*3;a.push([o[d],o[d+1],o[d+2]])}r.colorIndex=a;let l=kt(r,n),u=r.ccw?"outward":"inward";return{type:"indexed triangle",points:i,faces:a,colors:l,orientation:u}}}if(r=ae(ce.INDEXEDTRIANGLEFANSET,t),r){let s=ae(ce.COORDINATE,r.objects),n=ae(ce.COLOR,r.objects),o=r.fans;if(s&&o&&o.length>0){let i=s.points,c=o.length,a=[];for(let f=0;f<c;f++){let d=o[f],g=d.length;for(let p=1;p<g-1;p++)a.push([d[0],d[p],d[p+1]])}r.colorIndex=a;let l=kt(r,n),u=r.ccw?"outward":"inward";return{type:`indexed triangle fan (${c})`,points:i,faces:a,colors:l,orientation:u}}}if(r=ae(ce.INDEXEDTRIANGLESTRIPSET,t),r){let s=ae(ce.COORDINATE,r.objects),n=ae(ce.COLOR,r.objects),o=r.strips;if(s&&o&&o.length>0){let i=s.points,c=o.length,a=[];for(let f=0;f<c;f++){let d=o[f],g=d.length;for(let p=0;p<g-2;p++){let x=[d[p],d[p+1],d[p+2]];p%2===1&&x.reverse(),a.push(x)}}r.colorIndex=a;let l=kt(r,n),u=r.ccw?"outward":"inward";return{type:`indexed triangle strip (${c})`,points:i,faces:a,colors:l,orientation:u}}}if(r=ae(ce.INDEXEDQUADSET,t),r){let s=ae(ce.COORDINATE,r.objects),n=ae(ce.COLOR,r.objects),o=r.index;if(s&&o&&o.length>3){let i=s.points,c=Math.trunc(o.length/4),a=[];for(let f=0;f<c;f++){let d=f*4;a.push([o[d],o[d+1],o[d+2],o[d+3]])}r.colorIndex=a;let l=kt(r,n),u=r.ccw?"outward":"inward";return{type:`indexed quad (${c})`,points:i,faces:a,colors:l,orientation:u}}}if(r=ae(ce.INDEXEDFACESET,t),r){let s=ae(ce.COORDINATE,r.objects),n=r.faces,o=ae(ce.COLOR,r.objects);if(s&&n&&n.length>0){let i=s.points,c=n.length,a=kt(r,o),l=r.ccw?"outward":"inward";return{type:`indexed faces (${c})`,points:i,faces:n,colors:a,orientation:l}}}if(r=ae(ce.ELEVATIONGRID,t),r){let s=r.height,n=ae(ce.COLOR,r.objects);if(s&&s.length>0){let o=r.xDimension,i=r.xSpacing,c=r.zDimension,a=r.zSpacing,l=[],u=0;for(let p=0;p<c;++p)for(let x=0;x<o;++x){let v=x*i,y=p*a,b=s[u];u++,l.push([v,b,y])}let h=[];for(let p=0;p<c-1;++p)for(let x=0;x<o-1;++x){let v=x+p*o,y=x+1+p*o,b=x+(p+1)*o,E=x+1+(p+1)*o,q=[Math.abs(s[v]),Math.abs(s[y]),Math.abs(s[b]),Math.abs(s[E])],w=0;q[1]>=q[0]&&q[1]>=q[2]&&q[1]>=q[3]&&(w=1),q[2]>=q[0]&&q[2]>=q[1]&&q[2]>=q[3]&&(w=2),q[3]>=q[0]&&q[3]>=q[1]&&q[3]>=q[2]&&(w=3),w===0&&h.push([v,E,y],[v,b,E]),w===1&&h.push([y,b,E],[y,v,b]),w===2&&h.push([b,y,v],[b,E,y]),w===3&&h.push([E,v,b],[E,y,v])}let f=r.ccw?"outward":"inward";r.colorPerVertex===!0&&(r.colorIndex=h);let d=kt(r,n);return{type:`elevation grid (${o} X ${c})`,points:l,faces:h,colors:d,orientation:f}}}return null},qj=(e,t)=>{let r,s=s4(e,t);return s&&(r=wj.polyhedron(s)),r};n4.exports={convertMesh:s4,instantiateMesh:qj}});var i4=m((ine,o4)=>{var{pointsToString:R0}=gr(),{convertMesh:Sj}=$0(),Dj=(e,t,r,s,n)=>{let o=Array.isArray(s)?R0(s):"null",i="primitives.polyhedron({points, faces, colors, orientation})",c=`
  // 3D ${e} set: ${t.length} points, ${r.length} faces
  const points = ${R0(t)}
  const faces = ${R0(r)}
  const colors = ${o}
  const orientation = '${n}'
`;return{primitive:i,code:c}},Tj=(e,t)=>{let r=Sj(e,t);if(r){let{type:s,points:n,faces:o,colors:i,orientation:c}=r;return Dj(s,n,o,i,c)}return null};o4.exports=Tj});var l4=m((cne,a4)=>{var{geometries:Cj}=ue(),{geom3:$j,poly3:Rj}=Cj,Ij=S0(),{x3dTypes:at}=At(),{findNode:lt,findColor:Mj,pointsToString:c4}=gr(),Fj=r4(),Nj=i4(),Pj=(e,t)=>{let r=`
// shape
const createObjects${t.id} = (options) => {
  let objects = []
`,s=t.objects,n=Mj(s,e),o,i=lt(at.BOX,s);if(i)o=`primitives.cuboid({size: [${i.size}]})`;else if(i=lt(at.CONE,s),i)r+=`  const shape = transforms.rotateX(-Math.PI/2, primitives.cylinderElliptic({startRadius: [${i.bottomRadius},${i.bottomRadius}], height: ${i.height}, segments: ${i.subdivision}, endRadius: [${i.topRadius}, ${i.topRadius}]}))
`,o="shape";else if(i=lt(at.CYLINDER,s),i)r+=`  const shape = transforms.rotateX(-Math.PI/2, primitives.cylinder({radius: ${i.radius}, height: ${i.height}, segments: ${i.subdivision}}))
`,o="shape";else if(i=lt(at.SPHERE,s),i)o=`primitives.sphere({radius: ${i.radius}, segments: ${i.subdivision}})`;else if(i=lt(at.EXTRUSION,s),i){let a=Ij(i),u=$j.toPolygons(a).map(h=>c4(Rj.toPoints(h)));r+=`  const polygons = [
  ${u.join(`,
  `)}
]
`,o="geometries.geom3.fromPoints(polygons)"}if(!o){if(i=lt(at.ARC2D,s),i)o=`primitives.arc({radius: ${i.radius}, startAngle: ${i.startAngle}, endAngle: ${i.endAngle}, segments: ${i.subdivision}})`;else if(i=lt(at.ARCCLOSE2D,s),i)i.closureType==="PIE"?o=`primitives.circle({radius: ${i.radius}, startAngle: ${i.startAngle}, endAngle: ${i.endAngle}, segments: ${i.subdivision}})`:o=`geometries.geom2.fromPoints(geometries.path2.toPoints(geometries.path2.close(primitives.arc({radius: ${i.radius}, startAngle: ${i.startAngle}, endAngle: ${i.endAngle}, segments: ${i.subdivision}}))))`;else if(i=lt(at.CIRCLE2D,s),i)o=`primitives.arc({radius: ${i.radius}, segments: ${i.subdivision}})`;else if(i=lt(at.DISK2D,s),i)i.innerRadius===i.outerRadius?o=`primitives.arc({radius: ${i.outerRadius}, segments: ${i.subdivision}})`:i.innerRadius===0?o=`primitives.circle({radius: ${i.outerRadius}, segments: ${i.subdivision}})`:o=`booleans.subtract(primitives.circle({radius: ${i.outerRadius}, segments: ${i.subdivision}}), primitives.circle({radius: ${i.innerRadius}, segments: ${i.subdivision}}))`;else if(i=lt(at.POLYLINE2D,s),i)o=`primitives.line([[${i.lineSegments.join("], [")}]])`;else if(i=lt(at.RECTANGLE2D,s),i)o=`primitives.rectangle({size: [${i.size}]})`;else if(i=lt(at.TRIANGLESET2D,s),i){let a=i.vertices.length,l=Math.trunc(a/3);r+=`
  // 2D triangle set: ${a} points, ${l} faces
  const vertices = ${c4(i.vertices)}
  const triangles = []
  for (let i = 0; i < ${l}; i = i + 3) {
    triangles.push(geometries.geom2.fromPoints([vertices[i], vertices[i + 1], vertices[i + 2]]))
  }
`,o="triangles"}}let c=Nj(e,s);return c&&(o=c.primitive,r+=c.code),c=Fj(e,s),c&&(o=c.primitive,r+=c.code),o&&(n?r+=`  objects.push(colorize([${n}], ${o}))`:r+=`  objects.push(${o})`),r+=`
  return objects
}
`,r};a4.exports=Pj});var h4=m((ane,f4)=>{var kj=w0(),{x3dTypes:I0}=At(),Oj=l4(),Lj=(e,t)=>{let r=`
// transform
const createObjects${t.id} = (options) => {
  let objects = []
`,s=t.objects;for(let o=0;o<s.length;o++){let i=s[o];r+=`  objects.push(...createObjects${i.id}(options))
`}let n=kj(t.center,t.rotation,t.scale,t.scaleOrientation,t.translation);return r+=`
  const matrix = [${n}]
  return applyTransform(matrix, objects)
}
`,r+=M0(e,s),r},zj=(e,t)=>{let r=`
// group
const createObjects${t.id} = (options) => {
  let objects = []
`,s=t.objects;for(let n=0;n<s.length;n++){let o=s[n];r+=`  objects.push(...createObjects${o.id}(options))
`}return r+=`
  return objects
}
`,r+=M0(e,s),r},u4=[],_j=(e,t)=>{if(u4.includes(t.id))return"";u4.push(t.id);let r="";switch(t.definition){case I0.TRANSFORM:r+=Lj(e,t);break;case I0.SHAPE:r+=Oj(e,t);break;case I0.GROUP:r+=zj(e,t);break;default:console.log("WARNING: unknown definition: "+t.definition);break}return r},M0=(e,t)=>t.reduce((r,s,n)=>r+=_j(e,s),"");f4.exports=M0});var k0=m((lne,m4)=>{var Bj=hi(),{x3dTypes:z,x3dX3D:Vj,x3dUnit:Gj,x3dMeta:Xj,x3dScene:Yj,x3dTransform:Hj,x3dShape:jj,x3dGroup:p4,x3dBox:Zj,x3dCone:Uj,x3dCylinder:Wj,x3dSphere:Jj,x3dExtrusion:Kj,x3dArc2D:Qj,x3dArcClose2D:eZ,x3dCircle2D:tZ,x3dDisk2D:rZ,x3dPolyline2D:sZ,x3dRectangle2D:nZ,x3dTriangleSet2D:oZ,x3dColor:iZ,x3dCoordinate:cZ,x3dTriangleSet:aZ,x3dTriangleFanSet:lZ,x3dTriangleStripSet:uZ,x3dQuadSet:fZ,x3dIndexedTriangleSet:hZ,x3dIndexedTriangleFanSet:pZ,x3dIndexedTriangleStripSet:dZ,x3dIndexedQuadSet:gZ,x3dIndexedFaceSet:mZ,x3dElevationGrid:xZ,x3dLineSet:vZ,x3dIndexedLineSet:EZ,x3dAppearance:yZ,x3dMaterial:AZ}=At(),F0=null,Rs=z.X3D,Qe=[],bi=new Map,bZ=[],wZ=[],N0={factor:1,name:"meters"},P0={factor:1,name:"radians"},g4=null,d4={X3D:Vj,UNIT:Gj,META:Xj,SCENE:Yj,TRANSFORM:Hj,SHAPE:jj,GROUP:p4,STATICGROUP:p4,BOX:Zj,CONE:Uj,CYLINDER:Wj,SPHERE:Jj,EXTRUSION:Kj,ARC2D:Qj,ARCCLOSE2D:eZ,CIRCLE2D:tZ,DISK2D:rZ,POLYLINE2D:sZ,RECTANGLE2D:nZ,TRIANGLESET2D:oZ,COLOR:iZ,COORDINATE:cZ,TRIANGLESET:aZ,TRIANGLEFANSET:lZ,TRIANGLESTRIPSET:uZ,QUADSET:fZ,INDEXEDTRIANGLESET:hZ,INDEXEDTRIANGLEFANSET:pZ,INDEXEDTRIANGLESTRIPSET:dZ,INDEXEDQUADSET:gZ,INDEXEDFACESET:mZ,ELEVATIONGRID:xZ,LINESET:vZ,INDEXEDLINESET:EZ,APPEARANCE:yZ,MATERIAL:AZ},qZ=1,SZ=()=>("0000"+qZ++).slice(-4),DZ=(e,t)=>{let r=new Bj.SaxesParser;r.on("error",s=>{console.log(`error: line ${s.line}, column ${s.column}, bad character [${s.c}]`)}),r.on("opentag",s=>{let n=s.name.toUpperCase(),o=d4[n]?d4[n](s.attributes,{x3dObjects:Qe}):null;if(o){if(o.id=SZ(),s.attributes.USE){let i=s.attributes.USE;if(bi.has(i)){let c=bi.get(i);c.definition!==o.definition&&console.log(`WARNING: using a definition "${i}" of a different type; ${o.definition} vs ${c.definition}`),o=c}else console.log(`WARNING: definition "${i}" does not exist, using default for ${o.definition}`)}else if(s.attributes.DEF){let i=s.attributes.DEF;bi.has(i)?console.log(`WARNING: redefintion of ${i} has been ignored`):bi.set(i,o)}switch(o.definition){case z.SCENE:case z.TRANSFORM:case z.SHAPE:case z.APPEARANCE:case z.TRIANGLESET:case z.TRIANGLEFANSET:case z.TRIANGLESTRIPSET:case z.QUADSET:case z.INDEXEDTRIANGLESET:case z.INDEXEDTRIANGLEFANSET:case z.INDEXEDTRIANGLESTRIPSET:case z.INDEXEDQUADSET:case z.INDEXEDFACESET:case z.ELEVATIONGRID:case z.LINESET:case z.INDEXEDLINESET:case z.GROUP:Rs=o.definition;break;default:break}switch(Rs){case z.X3D:"objects"in o&&Qe.push(o),o.definition===z.UNIT&&(o.category==="length"&&(N0.factor=o.conversionFactor,N0.name=o.name),o.category==="angle"&&(P0.factor=o.conversionFactor,P0.name=o.name));break;case z.SCENE:case z.TRANSFORM:case z.SHAPE:case z.GROUP:case z.APPEARANCE:case z.TRIANGLESET:case z.TRIANGLEFANSET:case z.TRIANGLESTRIPSET:case z.QUADSET:case z.INDEXEDTRIANGLESET:case z.INDEXEDTRIANGLEFANSET:case z.INDEXEDTRIANGLESTRIPSET:case z.INDEXEDQUADSET:case z.INDEXEDFACESET:case z.ELEVATIONGRID:case z.LINESET:case z.INDEXEDLINESET:if(Qe.length>0){let i=Qe.pop();"objects"in i&&i.objects.push(o),Qe.push(i),"objects"in o&&Qe.push(o)}break;default:console.log("WARNING: invalid X3D definition");break}F0=o}}),r.on("closetag",s=>{switch(s.name.toUpperCase()){case"X3D":case"SCENE":case"TRANSFORM":case"SHAPE":case"GROUP":case"STATICGROUP":case"APPEARANCE":case"TRIANGLESET":case"TRIANGLEFANSET":case"TRIANGLESTRIPSET":case"QUADSET":case"INDEXEDTRIANGLESET":case"INDEXEDTRIANGLEFANSET":case"INDEXEDTRIANGLESTRIPSET":case"INDEXEDQUADSET":case"INDEXEDFACESET":case"ELEVATIONGRID":case"LINESET":case"INDEXEDLINESET":break;default:return}let o=()=>{Qe.length>0&&(Rs=Qe[Qe.length-1].definition)},i=null;switch(Rs){case z.X3D:Qe.length>0&&(i=Qe.pop(),o()),Qe.length===0&&(i.length=N0,i.angle=P0,g4=i);break;case z.SCENE:case z.TRANSFORM:case z.SHAPE:case z.GROUP:case z.APPEARANCE:case z.TRIANGLESET:case z.TRIANGLEFANSET:case z.TRIANGLESTRIPSET:case z.QUADSET:case z.INDEXEDTRIANGLESET:case z.INDEXEDTRIANGLEFANSET:case z.INDEXEDTRIANGLESTRIPSET:case z.INDEXEDQUADSET:case z.INDEXEDFACESET:case z.ELEVATIONGRID:case z.LINESET:case z.INDEXEDLINESET:Qe.length>0&&(i=Qe.pop(),o());break;default:console.log("WARNING: unhandled definition",Rs);break}}),r.on("text",s=>{s!==null&&(s=s.trim(),s.length>0&&F0&&Rs!==0&&(F0.value=s))}),r.on("end",()=>{}),r.write(e).close()},TZ=(e,t)=>(DZ(e,t),{x3dObj:g4,x3dMaterials:bZ,x3dTextures:wZ});m4.exports=TZ});var O0=m((une,x4)=>{var CZ=25.4000508001016;x4.exports={inchMM:CZ}});var y4=m((fne,E4)=>{var $Z=h4(),{x3dTypes:v4}=At(),RZ=k0(),IZ=(e,t)=>{let r={pxPmm:O0().pxPmm};e=Object.assign({},r,e);let{version:s,pxPmm:n,addMetaData:o,filename:i}=e;e&&e.statusCallback&&e.statusCallback({progress:0});let{x3dObj:c,x3dMaterials:a,x3dTextures:l}=RZ(t,n),u=o?`//
// Produced by JSCAD IO Library : X3D Deserializer (${s})
// date: ${new Date}
// source: ${i}
//
`:"";if(!c)throw new Error("X3D parsing failed, no valid X3D data retrieved");return e&&e.statusCallback&&e.statusCallback({progress:50}),u+=MZ(c,{x3dMaterials:a,x3dTextures:l}),e&&e.statusCallback&&e.statusCallback({progress:100}),u},MZ=(e,t)=>{if(e.definition!==v4.X3D||!e.objects)throw new Error("X3D malformed");if(e.objects.length<1||e.objects[0].definition!==v4.SCENE)throw new Error("X3D did not define a SCENE");let s=e.objects[0].objects,n=e.length,o=e.angle,i="";i=`// Objects  : ${s.length}
// Units : ${n.name} (${n.factor})
// Angles : ${o.name} (${o.factor})

const {booleans, extrusions, geometries, maths, primitives, transforms, utils} = require('@jscad/modeling')
const { colorize } =  require('@jscad/modeling').colors

const applyTransform = (matrix, ...objects) => {
  objects = utils.flatten(objects)
  if (objects.length === 0) return objects

  return objects.map((object) => {
    const color = object.color
    object = transforms.transform(matrix, object)
    if (color) object.color = color
    return object
  })
}

const main = () => {
  let options = {}
  let objects = []
`;for(let c=0;c<s.length;c++){let a=s[c];i+=`  objects.push(...createObjects${a.id}(options))
`}return i+=`  return objects
}
`,i+=$Z({},s),i+=`module.exports = {main}
`,i};E4.exports=IZ});var w4=m((hne,b4)=>{var{booleans:FZ,geometries:wi,primitives:et,transforms:A4}=ue(),{x3dTypes:ut}=At(),{findNode:ft}=gr(),NZ=S0(),PZ=(e,t)=>{let r,s=ft(ut.BOX,t);if(s)return r=et.cuboid({size:s.size}),r;if(s=ft(ut.CONE,t),s)return r=A4.rotateX(-Math.PI/2,et.cylinderElliptic({startRadius:[s.bottomRadius,s.bottomRadius],height:s.height,segments:s.subdivision,endRadius:[s.topRadius,s.topRadius]})),r;if(s=ft(ut.CYLINDER,t),s)return r=A4.rotateX(-Math.PI/2,et.cylinder({radius:s.radius,height:s.height,segments:s.subdivision})),r;if(s=ft(ut.SPHERE,t),s)return r=et.sphere({radius:s.radius,segments:s.subdivision}),r;if(s=ft(ut.EXTRUSION,t),s)return r=NZ(s),r;if(s=ft(ut.ARC2D,t),s)return r=et.arc({radius:s.radius,startAngle:s.startAngle,endAngle:s.endAngle,segments:s.subdivision}),r;if(s=ft(ut.ARCCLOSE2D,t),s)return s.closureType==="PIE"?r=et.circle({radius:s.radius,startAngle:s.startAngle,endAngle:s.endAngle,segments:s.subdivision}):r=wi.geom2.fromPoints(wi.path2.toPoints(wi.path2.close(et.arc({radius:s.radius,startAngle:s.startAngle,endAngle:s.endAngle,segments:s.subdivision})))),r;if(s=ft(ut.CIRCLE2D,t),s)return r=et.arc({radius:s.radius,segments:s.subdivision}),r;if(s=ft(ut.DISK2D,t),s)return s.innerRadius===s.outerRadius?r=et.arc({radius:s.outerRadius,segments:s.subdivision}):s.innerRadius===0?r=et.circle({radius:s.outerRadius,segments:s.subdivision}):r=FZ.subtract(et.circle({radius:s.outerRadius,segments:s.subdivision}),et.circle({radius:s.innerRadius,segments:s.subdivision})),r;if(s=ft(ut.POLYLINE2D,t),s)return r=et.line([s.lineSegments]),r;if(s=ft(ut.RECTANGLE2D,t),s)return r=et.rectangle({size:s.size}),r;if(s=ft(ut.TRIANGLESET2D,t),s){let n=s.vertices,o=n.length,i=Math.trunc(o/3);r=[];for(let c=0;c<i;c=c+3)r.push(wi.geom2.fromPoints([n[c],n[c+1],n[c+2]]));return r}return r};b4.exports=PZ});var S4=m((pne,q4)=>{var{colors:kZ,transforms:OZ}=ue(),LZ=w0(),{x3dTypes:L0}=At(),{findColor:zZ}=gr(),_Z=w4(),{instantiateLine:BZ}=C0(),{instantiateMesh:VZ}=$0(),GZ=new Map,XZ=(e,t)=>{let r=t.objects.map(n=>z0(e,n)).filter(n=>n!=null);if(r.length===0)return null;let s=LZ(t.center,t.rotation,t.scale,t.scaleOrientation,t.translation);return r.map(n=>{let o=n.color;return n=OZ.transform(s,n),o&&(n.color=o),n})},YZ=(e,t)=>{let r=t.objects,s=zZ(r,e),n=_Z(e,r);return n||(n=VZ(e,r)),n||(n=BZ(e,r)),n||(n=null),n&&s&&(n=kZ.colorize(s,n)),n},HZ=(e,t)=>{let r=t.objects.map(s=>z0(e,s)).filter(s=>s!=null);return r.length===0?null:r},z0=(e,t)=>{let r;switch(t.definition){case L0.TRANSFORM:r=XZ(e,t);break;case L0.SHAPE:r=YZ(e,t);break;case L0.GROUP:r=HZ(e,t);break;default:console.log("WARNING: unknown definition: "+t.definition);break}return r},jZ=(e,t)=>{let r=t.map(s=>z0(e,s)).filter(s=>s!=null);return GZ.clear(),r};q4.exports=jZ});var C4=m((dne,T4)=>{var{flatten:ZZ}=dt(),UZ=k0(),WZ=S4(),{x3dTypes:D4}=At(),JZ=(e,t)=>{let r={pxPmm:O0().pxPmm};e=Object.assign({},r,e);let{pxPmm:s}=e;e&&e.statusCallback&&e.statusCallback({progress:0});let{x3dObj:n}=UZ(t,s);if(n.definition!==D4.X3D||!n.objects)throw new Error("X3D malformed");if(n.objects.length<1||n.objects[0].definition!==D4.SCENE)throw new Error("X3D did not define a SCENE");e&&e.statusCallback&&e.statusCallback({progress:50});let i=n.objects[0].objects,c=WZ(e,i);return e.flatten&&(c=ZZ(c)),e&&e.statusCallback&&e.statusCallback({progress:100}),c};T4.exports=JZ});var R4=m((gne,$4)=>{var KZ=Xq().version,QZ=y4(),eU=C4(),tU=(e,t)=>(e=Object.assign({},{filename:"x3d",output:"script",version:KZ,flatten:!0,addMetaData:!0},e),e.output==="script"?QZ(e,t):eU(e,t)),rU="x3d";$4.exports={deserialize:tU,extension:rU}});var z4=m((mne,L4)=>{var I4=Hw(),M4=pq(),F4=mq(),N4=Eq(),P4=bq(),k4=Gq(),O4=R4(),mr={};mr[I4.extension]=I4.deserialize;mr[M4.extension]=M4.deserialize;mr[F4.extension]=F4.deserialize;mr[N4.extension]=N4.deserialize;mr[P4.extension]=P4.deserialize;mr[k4.extension]=k4.deserialize;mr[O4.extension]=O4.deserialize;L4.exports=mr});var B4=m((xne,_4)=>{var{makeBlob:sU,convertToBlob:nU}=Ii(),oU=il(),iU=ul(),cU=fl(),aU=hl(),lU=gl(),uU=ml(),fU=yl(),hU=Gl(),pU=Zb(),dU=z4(),gU=(e,t)=>nU(pU(e,t));_4.exports={makeBlob:sU,solidsAsBlob:gU,amfSerializer:oU,dxfSerializer:iU,jsonSerializer:cU,objSerializer:aU,stlSerializer:lU,svgSerializer:uU,x3dSerializer:fU,m3fSerializer:hU,deserializers:dU}});var qi={};module.exports=U4(qi);Ti(qi,Z4(B4(),1),module.exports);
/*! Bundled license information:

xmlchars/xml/1.0/ed5.js:
  (**
   * Character classes and associated utilities for the 5th edition of XML 1.0.
   *
   * @author Louis-Dominique Dubeau
   * @license MIT
   * @copyright Louis-Dominique Dubeau
   *)

xmlchars/xml/1.1/ed2.js:
  (**
   * Character classes and associated utilities for the 2nd edition of XML 1.1.
   *
   * @author Louis-Dominique Dubeau
   * @license MIT
   * @copyright Louis-Dominique Dubeau
   *)

xmlchars/xmlns/1.0/ed3.js:
  (**
   * Character class utilities for XML NS 1.0 edition 3.
   *
   * @author Louis-Dominique Dubeau
   * @license MIT
   * @copyright Louis-Dominique Dubeau
   *)
*/
//# sourceMappingURL=bundle.jscad_io.js.map
