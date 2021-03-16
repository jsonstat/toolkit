// jsonstat-toolkit v1.2.6 Copyright 2021 Xavier Badosa https://jsonstat.com
"use strict";var t,e=(t=require("node-fetch"))&&"object"==typeof t&&"default"in t?t.default:t;function n(t){var e,i,r,l,s=function(t,e){var n,i=[];if("string"==typeof t&&(t=[t]),Array.isArray(t)){if(t.length===e)return t;if(1===t.length){for(n=0;n<e;n++)i.push(t[0]);return i}}for(n=0;n<e;n++){var r=void 0===t[n]?null:t[n];i.push(r)}return i};if(this.length=0,this.id=[],null!=t)switch(this.class=t.class||"bundle",this.class){case"bundle":var o=[],a=0;if(this.error=null,this.length=0,null===t||"object"!=typeof t)return void(this.class=null);if(t.hasOwnProperty("error"))return void(this.error=t.error);if("dataset"===t.class||"collection"===t.class||"dimension"===t.class)return new n(t);for(i in t)a++,o.push(i);this.__tree__=t,this.length=a,this.id=o;break;case"dataset":t.hasOwnProperty("__tree__")?this.__tree__=e=t.__tree__:this.__tree__=e=t,this.label=e.label||null,this.note=e.note||null,this.link=e.link||null,this.href=e.href||null,this.updated=e.updated||null,this.source=e.source||null,this.extension=e.extension||null;var u,h=0,f=e.size||e.dimension&&e.dimension.size;if(this.size=f,e.hasOwnProperty("value")&&Array.isArray(e.value))h=e.value.length;else{var c=1;for(u=f.length;u--;)c*=f[u];h=c}if(this.value=s(e.value,h),this.status=e.hasOwnProperty("status")?s(e.status,h):null,e.hasOwnProperty("dimension")){var d=e.dimension,v=e.role||!e.version&&d.role||null,p=e.id||d.id,y=f.length,g=function(t){v.hasOwnProperty(t)||(v[t]=null)};if(!Array.isArray(p)||!Array.isArray(f)||p.length!=y)return;if(this.length=y,this.id=p,v&&(g("time"),g("geo"),g("metric"),g("classification")),v&&null===v.classification){var b=[],m=["time","geo","metric"],_=function(t,e){for(var n=e.length;n--;)if(t===e[n])return!0;return!1};for(u=0;u<3;u++){var x=v[m[u]];null!==x&&(b=b.concat(x))}for(v.classification=[],u=0;u<y;u++)_(p[u],b)||v.classification.push(p[u]);0===v.classification.length&&(v.classification=null)}this.role=v,this.n=h;for(var w=0,O=this.length;w<O;w++)if(d[p[w]].category.hasOwnProperty("index")){if(Array.isArray(d[p[w]].category.index)){var A={},k=d[p[w]].category.index;for(r=k.length,l=0;l<r;l++)A[k[l]]=l;d[p[w]].category.index=A}}else{var D=0;for(i in d[p[w]].category.index={},d[p[w]].category.label)d[p[w]].category.index[i]=D++}}else this.length=0;break;case"dimension":if(!t.hasOwnProperty("__tree__"))return new n({version:"2.0",class:"dataset",dimension:{d:t},id:["d"],size:[function(t){var e=void 0===t.index?t.label:t.index;return Array.isArray(e)?e.length:Object.keys(e).length}(t.category)],value:[null]}).Dimension(0);var j=[],P=(e=t.__tree__).category;if(!e.hasOwnProperty("category"))return;if(!P.hasOwnProperty("label"))for(i in P.label={},P.index)P.label[i]=i;for(i in P.index)j[P.index[i]]=i;this.__tree__=e,this.label=e.label||null,this.note=e.note||null,this.link=e.link||null,this.href=e.href||null,this.id=j,this.length=j.length,this.role=t.role,this.hierarchy=P.hasOwnProperty("child"),this.extension=e.extension||null;break;case"category":var E=t.child;this.id=E,this.length=null===E?0:E.length,this.index=t.index,this.label=t.label,this.note=t.note||null,this.unit=t.unit,this.coordinates=t.coord;break;case"collection":if(this.length=0,this.label=t.label||null,this.note=t.note||null,this.link=t.link||null,this.href=t.href||null,this.updated=t.updated||null,this.source=t.source||null,this.extension=t.extension||null,null!==this.link&&t.link.item){var z=t.link.item;if(this.length=Array.isArray(z)?z.length:0,this.length)for(l=0;l<this.length;l++)this.id[l]=z[l].href}}}function i(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.json()}n.prototype.Item=function(t){if(null===this||"collection"!==this.class||!this.length)return null;if("number"==typeof t)return t>this.length||t<0?null:this.link.item[t];var e,n=[];if("object"==typeof t){if(!t.class&&!t.follow)return null;t.class&&(e="dataset"===t.class&&"boolean"==typeof t.embedded?!0===t.embedded?function(t,e,i){var r=t.link.item[e];i.class===r.class&&r.id&&r.size&&r.dimension&&n.push(r)}:function(t,e,i){var r=t.link.item[e];i.class!==r.class||r.id&&r.size&&r.dimension||n.push(r)}:function(t,e,i){i.class===t.link.item[e].class&&n.push(t.link.item[e])})}else e=function(t,e){n.push(t.link.item[e])};for(var i=0;i<this.length;i++)e(this,i,t);return n},n.prototype.Dataset=function(t){if(null===this)return null;if("dataset"===this.class)return void 0!==t?this:[this];var e,i=[],r=0;if("collection"===this.class){var l=this.Item({class:"dataset",embedded:!0});if(void 0===t){for(e=l.length;r<e;r++)i.push(new n(l[r]));return i}if("number"==typeof t&&t>=0&&t<l.length)return new n(l[t]);if("string"==typeof t)for(e=l.length;r<e;r++)if(l[r].href===t)return new n(l[r]);return null}if("bundle"!==this.class)return null;if(void 0===t){for(e=this.id.length;r<e;r++)i.push(this.Dataset(this.id[r]));return i}if("number"==typeof t){var s=this.id[t];return void 0!==s?this.Dataset(s):null}var o=this.__tree__[t];return void 0===o?null:new n({class:"dataset",__tree__:o})},n.prototype.Dimension=function(t,e){e="boolean"!=typeof e||e;var i,r=[],l=this.id.length,s=function(t,e){if(null!==t)for(var n in t)for(var i=null!==t[n]?t[n].length:0;i--;)if(t[n][i]===e)return n;return null};if(null===this||"dataset"!==this.class)return null;if(void 0===t){for(i=0;i<l;i++)r.push(this.Dimension(this.id[i]));return r}if("number"==typeof t){var o=this.id[t];return void 0!==o?this.Dimension(o,e):null}var a=this.role;if("object"==typeof t){if(t.hasOwnProperty("role")){for(i=0;i<l;i++){var u=this.id[i];s(a,u)===t.role&&r.push(this.Dimension(u,e))}return void 0===r[0]?null:r}return null}var h=this.__tree__.dimension;if(void 0===h)return null;var f=h[t];return void 0===f?null:e?new n({class:"dimension",__tree__:f,role:s(a,t)}):function(t,e){var n=[];for(var i in t)n[t[i]]=e[i];return n}(f.category.index,f.category.label)},n.prototype.Category=function(t){if(null===this||"dimension"!==this.class)return null;if(void 0===t){for(var e=[],i=0,r=this.id.length;i<r;i++)e.push(this.Category(this.id[i]));return e}if("number"==typeof t){var l=this.id[t];return void 0!==l?this.Category(l):null}var s=this.__tree__.category;if(void 0===s)return null;var o=s.index[t];if(void 0===o)return null;var a=s.unit&&s.unit[t]||null,u=s.coordinates&&s.coordinates[t]||null,h=s.child&&s.child[t]||null,f=s.note&&s.note[t]||null;return new n({class:"category",index:o,label:s.label[t],note:f,child:h,unit:a,coord:u})},n.prototype.Dice=function(t,e,i){var r,l,s,o,a=function(t,e){return t.hasOwnProperty(e)&&!!t[e]};if(null===this||"dataset"!==this.class)return null;if("object"!=typeof t)return this;"object"!=typeof e?("boolean"==typeof e&&!0===e&&(r=!0),"boolean"==typeof i&&!0===i||(i=!1)):(r=a(e,"clone"),i=a(e,"drop"),l=a(e,"stringify"),s=a(e,"ovalue"),o=a(e,"ostatus"));var u,h=r?new n(JSON.parse(JSON.stringify(this))):this,f=h.status,c=[],d=[],v=function(t,e){var n,i,r,l=(n=t,i=e,r={},"[object Array]"===Object.prototype.toString.call(n[i])?(n[i].forEach((function(t,e){null!==t&&(r[String(e)]=t)})),r):n[i]);delete t[e],t[e]=l};Array.isArray(t)&&(t=function(t){var e={};return t.forEach((function(t){e[t[0]]=t[1]})),e}(t)),null===t&&(t={});var p=Object.keys(t);return p.length>0&&(p.forEach((function(e){var n=t[e];Array.isArray(n)||(t[e]=[n]),0===t[e].length&&delete t[e]})),i&&(t=function(t){var e={};return Object.keys(t).forEach(n=>e[n]=h.Dimension(n).id.filter(e=>-1===t[n].indexOf(e))),e}(t)),h.toTable({type:"arrobj",content:"id",status:!0}).forEach((function(e,n){var i=[];p.forEach((function(n){var r=t[n],l=[];r.forEach((function(t){l.push(e[n]===t)})),i.push(-1!==l.indexOf(!0))})),-1===i.indexOf(!1)&&(c.push(e.value),d.push(e.status))})),p.forEach((function(e){var n=h.Dimension(e).id,i=0,r={};h.size[h.id.indexOf(e)]=t[e].length,n.forEach((function(n){-1!==t[e].indexOf(n)&&(r[n]=i,i++)})),h.__tree__.dimension[e].category.index=r})),h.n=c.length,h.value=h.__tree__.value=c,h.status=h.__tree__.status=null!==f?d:null),l?((u=h.__tree__).hasOwnProperty("id")||(u.version="2.0",u.hasOwnProperty("class")||(u.class="dataset"),u.id=u.dimension.id,u.size=u.dimension.size,delete u.dimension.id,delete u.dimension.size,u.dimension.hasOwnProperty("role")&&(u.role=u.dimension.role,delete u.dimension.role)),u.hasOwnProperty("status")&&-1!==["null","{}","[]"].indexOf(JSON.stringify(u.status))&&delete u.status,u.hasOwnProperty("role")&&(delete u.role.classification,["geo","time","metric"].forEach((function(t){null===u.role[t]&&delete u.role[t]}))),s&&v(u,"value"),o&&u.hasOwnProperty("status")&&v(u,"status"),JSON.stringify(u)):h},n.prototype.Slice=function(t){if(null===this||"dataset"!==this.class)return null;if(void 0===t)return this;if(!Array.isArray(t)){var e,n=[];for(e in t)n.push([e,t[e]]);t=n}return this.Dice(t.map((function(t){return[t[0],[t[1]]]})))},n.prototype.Data=function(t,e){var n,i,r=[],l=function(t){for(var e in t)if(t.hasOwnProperty(e))return e};if(null===this||"dataset"!==this.class)return null;if(void 0===t){for(i=this.value.length,n=0;n<i;n++)r.push(this.Data(n));return r}if("boolean"!=typeof e&&(e=!0),"number"==typeof t){var s=this.value[t];return void 0===s?null:e?{value:s,status:this.status?this.status[t]:null}:s}var o="object",a=this.__tree__,u=a.size||a.dimension&&a.dimension.size,h=u.length;if(Array.isArray(t)){if(!Array.isArray(t[0])){if(this.length!==t.length)return null;var f=1,c=0,d=[],v=[];for(n=0;n<h;n++)if(void 0!==t[n]){if("number"!=typeof t[n]||t[n]>=u[n])return null;c+=(f*=n>0?u[h-n]:1)*t[h-n-1]}else d.push(n),v.push(u[n]);if(d.length>1)return null;if(1===d.length){for(var p=0,y=v[0];p<y;p++){var g=[];for(n=0;n<h;n++)n!==d[0]?g.push(t[n]):g.push(p);r.push(this.Data(g,e))}return r}return e?{value:this.value[c],status:this.status?this.status[c]:null}:this.value[c]}o="array"}var b=function(t,e,n){var i,r=[],s={},o=t.dimension,a=t.id||o.id,u=t.size||o&&o.size;if("array"===n){for(i=e.length;i--;)s[e[i][0]]=e[i][1];e=s}for(var h=0,f=a.length;h<f;h++){var c=a[h],d=e[c];r.push("string"==typeof d?d:1===u[h]?l(o[c].category.index):null)}return r}(a,t,o),m=[],_=a.dimension,x=a.id||_.id;for(n=0,i=b.length;n<i;n++)m.push(_[x[n]].category.index[b[n]]);return this.Data(m,e)},n.prototype.toTable=function(t,e){if(null===this||"dataset"!==this.class)return null;1==arguments.length&&"function"==typeof t&&(e=t,t=null),t=t||{field:"label",content:"label",vlabel:"Value",slabel:"Status",type:"array",status:!1,unit:!1,by:null,prefix:"",drop:[],meta:!1,comma:!1,bylabel:!1};var n,i,r,l,s,o=this.__tree__,a=!0===t.status;if("function"==typeof e){n=this.toTable(t);var u=[],h="array"!==t.type?0:1;for(s=(S="object"!==t.type?n.slice(h):n.rows.slice(0)).length,i=0;i<s;i++){var f=e.call(this,S[i],i);void 0!==f&&u.push(f)}return"object"===t.type?{cols:n.cols,rows:u}:("array"===t.type&&u.unshift(n[0]),u)}if("arrobj"===t.type){var c=[],d=(n=this.toTable({field:"id",content:t.content,status:a})).shift(),v=o.role&&o.role.metric,p=function(){},y={},g=this,b=g.id,m=t.by&&-1!==b.indexOf(t.by)?t.by:null,_=!0===t.meta,x=void 0!==t.drop&&Array.isArray(t.drop)?t.drop:[],w=!0===t.comma,O=!0===t.bylabel,A=function(e){if(_){var n={};return b.forEach((function(t){var e=g.Dimension(t);n[t]={label:e.label,role:e.role,categories:{id:e.id,label:g.Dimension(t,!1)}}})),{meta:{label:g.label,source:g.source,updated:g.updated,id:b,status:a,unit:t.unit,by:m,bylabel:O,drop:null!==m&&x.length>0?x:null,prefix:null!==m?T||"":null,comma:w,dimensions:n},data:e}}return e};if(null===m&&t.unit&&v){if("id"!==t.content)for(var k=v.length;k--;){var D=this.Dimension(v[k]);y[v[k]]={};for(var j=D.length;j--;)y[v[k]][D.Category(j).label]=D.id[j]}p=function(e,n){if(-1!==v.indexOf(e)){var i=o.dimension[e].category;i.unit?P.unit=i.unit["id"!==t.content?y[e][n]:n]:P.unit=null}},t.unit=!0}else t.unit=!1;for(s=n.length,i=0;i<s;i++){var P={};for(r=n[i].length;r--;)P[d[r]]=n[i][r],p(d[r],n[i][r]);c.push(P)}if(w&&c.forEach((function(t){null!==t.value&&(t.value=(""+t.value).replace(".",","))})),null!==m){var E,z={},S=[],C={},T=void 0!==t.prefix?t.prefix:"";x.forEach((function(t,e){(!g.Dimension(t)||g.Dimension(t).length>1)&&(x[e]="")}));var J=b.filter((function(t){return t!==m&&-1===x.indexOf(t)})),N=g.Dimension(m),V=function(t,e){var n=[];return e.forEach((function(e){n.push(t[e])})),n.join("\t")},I=function(t,e){var n={};return e.forEach((function(e){n[e]=t[e]})),n};for(var q in"id"!==t.content?O?E=function(t,e,n){t[e][T+n[m]]=n.value}:(N.Category().forEach((function(t,e){C[t.label]=N.id[e]})),E=function(t,e,n){t[e][T+C[n[m]]]=n.value}):E=function(t,e,n){t[e][T+n[m]]=n.value},c.forEach((function(t){var e=V(t,J);void 0===z[e]&&(z[e]=I(t,J)),E(z,e,t,m)})),z)S.push(z[q]);return a=!1,A(S)}return A(c)}var B,F,G,H,K="id"===t.field;if("object"===t.type){var L="number"==typeof this.value[0]||null===this.value[0]?"number":"string";B=function(t,e){var n=K&&t||e||t;et.push({id:t,label:n,type:"string"})},F=function(t,e,n){var i=(K?"value":t)||"Value",r=(K?"status":e)||"Status";n&&et.push({id:"status",label:r,type:"string"}),et.push({id:"value",label:i,type:L})},G=function(t){vt.push({v:t})},H=function(t){vt.push({v:t}),nt.push({c:vt})}}else B=function(t,e){var n=K&&t||e||t;et.push(n)},F=function(t,e,n){var i=(K?"value":t)||"Value",r=(K?"status":e)||"Status";n&&et.push(r),et.push(i),tt.push(et)},G=function(t){vt.push(t)},H=function(t){vt.push(t),tt.push(vt)};var M=o.dimension,Q=o.id||M.id,R=o.size||M.size,U=Q.length;if(U!=R.length)return!1;var W=[],X=1,Y=(k=1,[]),Z=[],$=[],tt=[],et=[],nt=[];for(i=0;i<U;i++){var it=Q[i],rt=M[it].label;B(it,rt),X*=R[i],k*=R[i];var lt=[];for(r=0;r<R[i];r++)for(var st in M[Q[i]].category.index)if(M[Q[i]].category.index[st]===r){var ot="id"!==t.content&&M[Q[i]].category.label?M[Q[i]].category.label[st]:st;lt.push(ot)}W.push(lt),Y.push(k)}for(F(t.vlabel,t.slabel,a),s=W.length,i=0;i<s;i++){for(var at=[],ut=0,ht=W[i].length;ut<ht;ut++)for(var ft=0;ft<X/Y[i];ft++)at.push(W[i][ut]);Z.push(at)}for(s=Z.length,i=0;i<s;i++){var ct=[],dt=0;for(l=0;l<X;l++)ct.push(Z[i][dt]),++dt===Z[i].length&&(dt=0);$.push(ct)}for(l=0;l<X;l++){var vt=[];s=Z.length;for(var pt=0;pt<s;pt++)G($[pt][l]);a&&G(this.status?this.status[l]:null),H(this.value[l])}return"object"===t.type?{cols:et,rows:nt}:tt},n.prototype.node=function(){return this.__tree__},n.prototype.toString=function(){return this.class},module.exports=function(t,r){return"object"==typeof t?new n(t):"version"===t?"1.2.6":e?e(t,r).then(i).then((function(t){return new n(t)})):void 0};
