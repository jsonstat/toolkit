// jsonstat-toolkit v1.5.3 Copyright 2024 Xavier Badosa https://jsonstat.com
import t from"node-fetch";function e(t,r){var l,s,o,a,u=function(t,e,r){if(0===Object.entries(t).length)return null;var l,s=[];if(r&&!i(r.name)&&(r=null),"string"==typeof t&&(t=[t]),Array.isArray(t)||n(t)){if(t.length===e)return r&&-1===t.findIndex((function(t){return null==t}))?r.from(t):t;if(1===t.length){for(l=0;l<e;l++)s.push(t[0]);return s}}for(l=0;l<e;l++){var o=void 0===t[l]?null:t[l];s.push(o)}return s};if(this.length=0,this.id=[],null!=t)switch(this.class=t.class||"bundle",this.class){case"bundle":var h=[],f=0;if(this.error=null,this.length=0,null===t||"object"!=typeof t)return void(this.class=null);if(t.hasOwnProperty("error"))return void(this.error=t.error);if("dataset"===t.class||"collection"===t.class||"dimension"===t.class)return new e(t);for(s in t)f++,h.push(s);this.__tree__=t,this.length=f,this.id=h;break;case"dataset":t.hasOwnProperty("__tree__")?this.__tree__=l=t.__tree__:this.__tree__=l=t,this.label=l.label||null,this.note=l.note||null,this.link=l.link||null,this.href=l.href||null,this.updated=l.updated||null,this.source=l.source||null,this.extension=l.extension||null;var c,d=0,v=l.size||l.dimension&&l.dimension.size;if(this.size=v,this.value=l.hasOwnProperty("value")&&null!==l.value&&0!==l.value.length?l.value:{},Array.isArray(this.value)||n(this.value))d=this.value.length;else{var y=1;for(c=v.length;c--;)y*=v[c];d=y}if(this.value=u(this.value,d,r),this.status=l.hasOwnProperty("status")&&null!==l.status?u(l.status,d):null,l.hasOwnProperty("dimension")){var p=l.dimension,g=l.role||!l.version&&p.role||null,b=l.id||p.id,m=v.length,_=function(t){g.hasOwnProperty(t)||(g[t]=null)};if(!Array.isArray(b)||!Array.isArray(v)||b.length!=m)return;if(this.length=m,this.id=b,g&&(_("time"),_("geo"),_("metric"),_("classification")),g&&null===g.classification){var x=[],O=["time","geo","metric"],A=function(t,e){for(var n=e.length;n--;)if(t===e[n])return!0;return!1};for(c=0;c<3;c++){var w=g[O[c]];null!==w&&(x=x.concat(w))}for(g.classification=[],c=0;c<m;c++)A(b[c],x)||g.classification.push(b[c]);0===g.classification.length&&(g.classification=null)}this.role=g,this.n=d;for(var j=0,k=this.length;j<k;j++)if(p[b[j]].category.hasOwnProperty("index")){if(Array.isArray(p[b[j]].category.index)){var D={},E=p[b[j]].category.index;for(o=E.length,a=0;a<o;a++)D[E[a]]=a;p[b[j]].category.index=D}}else{var P=0;for(s in p[b[j]].category.index={},p[b[j]].category.label)p[b[j]].category.index[s]=P++}}else this.length=0;break;case"dimension":if(!t.hasOwnProperty("__tree__"))return new e({version:"2.0",class:"dataset",dimension:{d:t},id:["d"],size:[function(t){var e=void 0===t.index?t.label:t.index;return Array.isArray(e)?e.length:Object.keys(e).length}(t.category)],value:[null]}).Dimension(0);var z=[],S=(l=t.__tree__).category;if(!l.hasOwnProperty("category"))return;if(!S.hasOwnProperty("label"))for(s in S.label={},S.index)S.label[s]=s;for(s in S.index)z[S.index[s]]=s;this.__tree__=l,this.label=l.label||null,this.note=l.note||null,this.link=l.link||null,this.href=l.href||null,this.id=z,this.length=z.length,this.role=t.role,this.hierarchy=S.hasOwnProperty("child"),this.extension=l.extension||null;break;case"category":var I=t.child;this.id=I,this.length=null===I?0:I.length,this.index=t.index,this.label=t.label,this.note=t.note||null,this.unit=t.unit,this.coordinates=t.coord;break;case"collection":if(this.length=0,this.label=t.label||null,this.note=t.note||null,this.link=t.link||null,this.href=t.href||null,this.updated=t.updated||null,this.source=t.source||null,this.extension=t.extension||null,null!==this.link&&t.link.item){var C=t.link.item;if(this.length=Array.isArray(C)?C.length:0,this.length)for(a=0;a<this.length;a++)this.id[a]=C[a].href}}}function n(t){return"[object ArrayBuffer]"===Object.prototype.toString.call(t.buffer)}function i(t){return-1!==["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"].indexOf(t)}function r(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.json()}function l(n,i,l){var s="object"==typeof i?i:{method:"GET"};return"function"!=typeof l&&(l=null),l||"function"!=typeof i||(l=i),"object"==typeof n?new e(n,l):"version"===n?"1.5.3":t?t(n,s).then(r).then((function(t){return new e(t,l)})):void 0}e.prototype.Item=function(t){if(null===this||"collection"!==this.class||!this.length)return null;if("number"==typeof t)return t>this.length||t<0?null:this.link.item[t];var e,n=[];if("object"==typeof t){if(!t.class&&!t.follow)return null;t.class&&(e="dataset"===t.class&&"boolean"==typeof t.embedded?!0===t.embedded?function(t,e,i){var r=t.link.item[e];i.class===r.class&&r.id&&r.size&&r.dimension&&n.push(r)}:function(t,e,i){var r=t.link.item[e];i.class!==r.class||r.id&&r.size&&r.dimension||n.push(r)}:function(t,e,i){i.class===t.link.item[e].class&&n.push(t.link.item[e])})}else e=function(t,e){n.push(t.link.item[e])};for(var i=0;i<this.length;i++)e(this,i,t);return n},e.prototype.Dataset=function(t){if(null===this)return null;if("dataset"===this.class)return void 0!==t?this:[this];var n,i=[],r=0;if("collection"===this.class){var l=this.Item({class:"dataset",embedded:!0});if(void 0===t){for(n=l.length;r<n;r++)i.push(new e(l[r]));return i}if("number"==typeof t&&t>=0&&t<l.length)return new e(l[t]);if("string"==typeof t)for(n=l.length;r<n;r++)if(l[r].href===t)return new e(l[r]);return null}if("bundle"!==this.class)return null;if(void 0===t){for(n=this.id.length;r<n;r++)i.push(this.Dataset(this.id[r]));return i}if("number"==typeof t){var s=this.id[t];return void 0!==s?this.Dataset(s):null}var o=this.__tree__[t];return void 0===o?null:new e({class:"dataset",__tree__:o})},e.prototype.Dimension=function(t,n){n="boolean"!=typeof n||n;var i,r=[],l=this.id.length,s=function(t,e){if(null!==t)for(var n in t)for(var i=null!==t[n]?t[n].length:0;i--;)if(t[n][i]===e)return n;return null};if(null===this||"dataset"!==this.class)return null;if(void 0===t){for(i=0;i<l;i++)r.push(this.Dimension(this.id[i]));return r}if("number"==typeof t){var o=this.id[t];return void 0!==o?this.Dimension(o,n):null}var a=this.role;if("object"==typeof t){if(t.hasOwnProperty("role")){for(i=0;i<l;i++){var u=this.id[i];s(a,u)===t.role&&r.push(this.Dimension(u,n))}return void 0===r[0]?null:r}return null}var h=this.__tree__.dimension;if(void 0===h)return null;var f=h[t];return void 0===f?null:n?new e({class:"dimension",__tree__:f,role:s(a,t)}):function(t,e){var n=[];for(var i in t)n[t[i]]=e[i];return n}(f.category.index,f.category.label)},e.prototype.Category=function(t){if(null===this||"dimension"!==this.class)return null;if(void 0===t){for(var n=[],i=0,r=this.id.length;i<r;i++)n.push(this.Category(this.id[i]));return n}if("number"==typeof t){var l=this.id[t];return void 0!==l?this.Category(l):null}var s=this.__tree__.category;if(void 0===s)return null;var o=s.index[t];if(void 0===o)return null;var a=s.unit&&s.unit[t]||null,u=s.coordinates&&s.coordinates[t]||null,h=s.child&&s.child[t]||null,f=s.note&&s.note[t]||null;return new e({class:"category",index:o,label:s.label[t],note:f,child:h,unit:a,coord:u})},e.prototype.Dice=function(t,i,r){var l,s,o,a,u=function(t,e){return t.hasOwnProperty(e)&&!!t[e]};if(null===this||"dataset"!==this.class||null===this.value)return null;if("object"!=typeof t)return this;"object"!=typeof i?("boolean"==typeof i&&!0===i&&(l=!0),"boolean"==typeof r&&!0===r||(r=!1)):(l=u(i,"clone"),r=u(i,"drop"),s=u(i,"stringify"),o=u(i,"ovalue"),a=u(i,"ostatus"));var h,f=this.value,c=l?new e(JSON.parse(JSON.stringify(this))):this,d=c.status,v=[],y=[],p=function(t,e){var n,i,r,l=(n=t,i=e,r={},Array.isArray(n[i])?(n[i].forEach((function(t,e){null!==t&&(r[String(e)]=t)})),r):n[i]);delete t[e],t[e]=l};Array.isArray(t)&&(t=function(t){var e={};return t.forEach((function(t){e[t[0]]=t[1]})),e}(t)),null===t&&(t={});var g=Object.keys(t);return g.length>0&&(g.forEach((function(e){var n=t[e];Array.isArray(n)||(t[e]=[n]),0===t[e].length&&delete t[e]})),r&&(t=function(t){var e={};return Object.keys(t).forEach((function(n){e[n]=c.Dimension(n).id.filter((function(e){return-1===t[n].indexOf(e)}))})),e}(t)),c.toTable({type:"arrobj",content:"id",status:!0}).forEach((function(e,n){var i=[];g.forEach((function(n){var r=t[n],l=[];r.forEach((function(t){l.push(e[n]===t)})),i.push(-1!==l.indexOf(!0))})),-1===i.indexOf(!1)&&(v.push(e.value),y.push(e.status))})),g.forEach((function(e){var n=c.Dimension(e).id,i=0,r={};c.size[c.id.indexOf(e)]=t[e].length,n.forEach((function(n){-1!==t[e].indexOf(n)&&(r[n]=i,i++)})),c.__tree__.dimension[e].category.index=r})),c.n=v.length,c.value=c.__tree__.value=n(f)?function(t,e){return e.from(t)}(v,f.constructor):v,c.status=c.__tree__.status=null!==d?y:null),s?((h=c.__tree__).hasOwnProperty("id")||(h.version="2.0",h.hasOwnProperty("class")||(h.class="dataset"),h.id=h.dimension.id,h.size=h.dimension.size,delete h.dimension.id,delete h.dimension.size,h.dimension.hasOwnProperty("role")&&(h.role=h.dimension.role,delete h.dimension.role)),h.hasOwnProperty("status")&&-1!==["null","{}","[]"].indexOf(JSON.stringify(h.status))&&delete h.status,h.hasOwnProperty("role")&&(delete h.role.classification,["geo","time","metric"].forEach((function(t){null===h.role[t]&&delete h.role[t]}))),o&&p(h,"value"),a&&h.hasOwnProperty("status")&&p(h,"status"),JSON.stringify(h)):c},e.prototype.Slice=function(t){if(null===this||"dataset"!==this.class||0===Object.entries(this.value).length)return null;if(void 0===t)return this;if(!Array.isArray(t)){var e,n=[];for(e in t)n.push([e,t[e]]);t=n}return this.Dice(t.map((function(t){return[t[0],[t[1]]]})))},e.prototype.Data=function(t,e){var n,i,r=[],l=function(t){for(var e in t)if(t.hasOwnProperty(e))return e};if(null===this||"dataset"!==this.class||null===this.value)return null;if(void 0===t){for(i=this.value.length,n=0;n<i;n++)r.push(this.Data(n));return r}if("boolean"!=typeof e&&(e=!0),"number"==typeof t){var s=this.value[t];return void 0===s?null:e?{value:s,status:this.status?this.status[t]:null}:s}var o="object",a=this.__tree__,u=a.size||a.dimension&&a.dimension.size,h=u.length;if(Array.isArray(t)){if(!Array.isArray(t[0])){if(this.length!==t.length)return null;var f=1,c=0,d=[],v=[];for(n=0;n<h;n++)if(void 0!==t[n]){if("number"!=typeof t[n]||t[n]>=u[n])return null;c+=(f*=n>0?u[h-n]:1)*t[h-n-1]}else d.push(n),v.push(u[n]);if(d.length>1)return null;if(1===d.length){for(var y=0,p=v[0];y<p;y++){var g=[];for(n=0;n<h;n++)n!==d[0]?g.push(t[n]):g.push(y);r.push(this.Data(g,e))}return r}return e?{value:this.value[c],status:this.status?this.status[c]:null}:this.value[c]}o="array"}var b=function(t,e,n){var i,r=[],s={},o=t.dimension,a=t.id||o.id,u=t.size||o&&o.size;if("array"===n){for(i=e.length;i--;)s[e[i][0]]=e[i][1];e=s}for(var h=0,f=a.length;h<f;h++){var c=a[h],d=e[c];r.push("string"==typeof d?d:1===u[h]?l(o[c].category.index):null)}return r}(a,t,o),m=[],_=a.dimension,x=a.id||_.id;for(n=0,i=b.length;n<i;n++)m.push(_[x[n]].category.index[b[n]]);return this.Data(m,e)},e.prototype.toTable=function(t,e){if(null===this||"dataset"!==this.class||null===this.value)return null;1==arguments.length&&"function"==typeof t&&(e=t,t=null),"arrobj"!==(t=t||{field:"label",content:"label",vlabel:"Value",slabel:"Status",type:"array",status:!1,unit:!1,by:null,prefix:"",drop:[],meta:!1,comma:!1,bylabel:!1}).type&&"objarr"!==t.type||void 0!==t.field||(t.field="id");var n,r,l,s,o,a,u,h,f,c="id"===t.field,d=function(t){return(c?"value":t)||"Value"},v=function(t){return(c?"status":t)||"Status"},y=this.__tree__,p=!0===t.status;if("function"==typeof e){n=this.toTable(t);var g=[],b="array"!==t.type?0:1;for(o=(V="object"!==t.type?n.slice(b):n.rows.slice(0)).length,r=0;r<o;r++){var m=e.call(this,V[r],r);void 0!==m&&g.push(m)}return"object"===t.type?{cols:n.cols,rows:g}:("array"===t.type&&g.unshift(n[0]),g)}if("arrobj"===t.type||"objarr"===t.type){var _=[],x=y.role&&y.role.metric,O=function(){},A={},w=this,j=w.id,k=t.by&&-1!==j.indexOf(t.by)?t.by:null,D=!0===t.meta,E=void 0!==t.drop&&Array.isArray(t.drop)?t.drop:[],P=!0===t.comma,z=!0===t.bylabel,S=w.value.constructor,I=function(e){var n,r={},l=d(t.vlabel);if("objarr"===t.type&&(n=null===k&&i(S.name)?function(t){r[t]=t===l?S.from(e,(function(e){return e[t]})):e.map((function(e){return e[t]}))}:function(t){r[t]=e.map((function(e){return e[t]}))},Object.keys(e[0]).forEach(n),e=r),D){r={};return j.forEach((function(t){var e=w.Dimension(t);r[t]={label:e.label,role:e.role,categories:{id:e.id,label:w.Dimension(t,!1)}}})),{meta:{label:w.label,source:w.source,updated:w.updated,id:j,status:p,unit:t.unit,by:k,bylabel:z,drop:null!==k&&E.length>0?E:null,prefix:null!==k?q||"":null,comma:P,dimensions:r},data:e}}return e};k&&(t.field="id");var C=(n=this.toTable({field:t.field,vlabel:t.vlabel,slabel:t.slabel,content:t.content,status:p})).shift();if(null===k&&t.unit&&x){if("id"!==t.content)for(var T=x.length;T--;){var U=this.Dimension(x[T]);A[x[T]]={};for(var J=U.length;J--;)A[x[T]][U.Category(J).label]=U.id[J]}O=function(e,n){if(-1!==x.indexOf(e)){var i=y.dimension[e].category;i.unit?N.unit=i.unit["id"!==t.content?A[e][n]:n]:N.unit=null}},t.unit=!0}else t.unit=!1;for(o=n.length,r=0;r<o;r++){var N={};for(l=n[r].length;l--;)N[C[l]]=n[r][l],O(C[l],n[r][l]);_.push(N)}if(P&&_.forEach((function(t){null!==t.value&&(t.value=(""+t.value).replace(".",","))})),null!==k){var B,F={},V=[],G={},q=void 0!==t.prefix?t.prefix:"";E.forEach((function(t,e){(!w.Dimension(t)||w.Dimension(t).length>1)&&(E[e]="")}));var H=j.filter((function(t){return t!==k&&-1===E.indexOf(t)})),K=w.Dimension(k);for(var L in"id"!==t.content?z?B=function(t,e,n){t[e][q+n[k]]=n.value}:(K.Category().forEach((function(t,e){G[t.label]=K.id[e]})),B=function(t,e,n){t[e][q+G[n[k]]]=n.value}):B=function(t,e,n){t[e][q+n[k]]=n.value},_.forEach((function(t){var e=function(t,e){var n=[];return e.forEach((function(e){n.push(t[e])})),n.join("\t")}(t,H);void 0===F[e]&&(F[e]=function(t,e){var n={};return e.forEach((function(e){n[e]=t[e]})),n}(t,H)),B(F,e,t,k)})),F)V.push(F[L]);return p=!1,I(V)}return I(_)}if("object"===t.type){var M="number"==typeof this.value[0]||null===this.value[0]?"number":"string";a=function(t,e){var n=c&&t||e||t;it.push({id:t,label:n,type:"string"})},u=function(t,e,n){var i=d(t),r=v(e);n&&it.push({id:"status",label:r,type:"string"}),it.push({id:"value",label:i,type:M})},h=function(t){yt.push({v:t})},f=function(t){yt.push({v:t}),rt.push({c:yt})}}else a=function(t,e){var n=c&&t||e||t;it.push(n)},u=function(t,e,n){var i=d(t),r=v(e);n&&it.push(r),it.push(i),nt.push(it)},h=function(t){yt.push(t)},f=function(t){yt.push(t),nt.push(yt)};var Q=y.dimension,R=y.id||Q.id,W=y.size||Q.size,X=R.length;if(X!=W.length)return!1;var Y=[],Z=1,$=(T=1,[]),tt=[],et=[],nt=[],it=[],rt=[];for(r=0;r<X;r++){var lt=R[r];a(lt,Q[lt].label),Z*=W[r],T*=W[r];var st=[];for(l=0;l<W[r];l++)for(var ot in Q[R[r]].category.index)if(Q[R[r]].category.index[ot]===l){var at="id"!==t.content&&Q[R[r]].category.label?Q[R[r]].category.label[ot]:ot;st.push(at)}Y.push(st),$.push(T)}for(u(t.vlabel,t.slabel,p),o=Y.length,r=0;r<o;r++){for(var ut=[],ht=0,ft=Y[r].length;ht<ft;ht++)for(var ct=0;ct<Z/$[r];ct++)ut.push(Y[r][ht]);tt.push(ut)}for(o=tt.length,r=0;r<o;r++){var dt=[],vt=0;for(s=0;s<Z;s++)dt.push(tt[r][vt]),++vt===tt[r].length&&(vt=0);et.push(dt)}for(s=0;s<Z;s++){var yt=[];o=tt.length;for(var pt=0;pt<o;pt++)h(et[pt][s]);p&&h(this.status?this.status[s]:null),f(this.value[s])}return"object"===t.type?{cols:it,rows:rt}:nt},e.prototype.node=function(){return this.__tree__},e.prototype.toString=function(){return this.class};export{l as default};
