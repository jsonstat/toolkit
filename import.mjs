// jsonstat-toolkit v1.5.2 Copyright 2024 Xavier Badosa https://jsonstat.com
function t(i,r){var l,s,a,o,u=function(t,i,r){if(0===Object.entries(t).length)return null;var l,s=[];if(r&&!n(r.name)&&(r=null),"string"==typeof t&&(t=[t]),Array.isArray(t)||e(t)){if(t.length===i)return r&&-1===t.findIndex((function(t){return null==t}))?r.from(t):t;if(1===t.length){for(l=0;l<i;l++)s.push(t[0]);return s}}for(l=0;l<i;l++){var a=void 0===t[l]?null:t[l];s.push(a)}return s};if(this.length=0,this.id=[],null!=i)switch(this.class=i.class||"bundle",this.class){case"bundle":var h=[],f=0;if(this.error=null,this.length=0,null===i||"object"!=typeof i)return void(this.class=null);if(i.hasOwnProperty("error"))return void(this.error=i.error);if("dataset"===i.class||"collection"===i.class||"dimension"===i.class)return new t(i);for(s in i)f++,h.push(s);this.__tree__=i,this.length=f,this.id=h;break;case"dataset":i.hasOwnProperty("__tree__")?this.__tree__=l=i.__tree__:this.__tree__=l=i,this.label=l.label||null,this.note=l.note||null,this.link=l.link||null,this.href=l.href||null,this.updated=l.updated||null,this.source=l.source||null,this.extension=l.extension||null;var c,d=0,v=l.size||l.dimension&&l.dimension.size;if(this.size=v,this.value=l.hasOwnProperty("value")&&null!==l.value&&0!==l.value.length?l.value:{},Array.isArray(this.value)||e(this.value))d=this.value.length;else{var y=1;for(c=v.length;c--;)y*=v[c];d=y}if(this.value=u(this.value,d,r),this.status=l.hasOwnProperty("status")?u(l.status,d):null,l.hasOwnProperty("dimension")){var p=l.dimension,g=l.role||!l.version&&p.role||null,b=l.id||p.id,m=v.length,_=function(t){g.hasOwnProperty(t)||(g[t]=null)};if(!Array.isArray(b)||!Array.isArray(v)||b.length!=m)return;if(this.length=m,this.id=b,g&&(_("time"),_("geo"),_("metric"),_("classification")),g&&null===g.classification){var x=[],O=["time","geo","metric"],A=function(t,e){for(var n=e.length;n--;)if(t===e[n])return!0;return!1};for(c=0;c<3;c++){var w=g[O[c]];null!==w&&(x=x.concat(w))}for(g.classification=[],c=0;c<m;c++)A(b[c],x)||g.classification.push(b[c]);0===g.classification.length&&(g.classification=null)}this.role=g,this.n=d;for(var j=0,k=this.length;j<k;j++)if(p[b[j]].category.hasOwnProperty("index")){if(Array.isArray(p[b[j]].category.index)){var D={},P=p[b[j]].category.index;for(a=P.length,o=0;o<a;o++)D[P[o]]=o;p[b[j]].category.index=D}}else{var E=0;for(s in p[b[j]].category.index={},p[b[j]].category.label)p[b[j]].category.index[s]=E++}}else this.length=0;break;case"dimension":if(!i.hasOwnProperty("__tree__"))return new t({version:"2.0",class:"dataset",dimension:{d:i},id:["d"],size:[function(t){var e=void 0===t.index?t.label:t.index;return Array.isArray(e)?e.length:Object.keys(e).length}(i.category)],value:[null]}).Dimension(0);var z=[],S=(l=i.__tree__).category;if(!l.hasOwnProperty("category"))return;if(!S.hasOwnProperty("label"))for(s in S.label={},S.index)S.label[s]=s;for(s in S.index)z[S.index[s]]=s;this.__tree__=l,this.label=l.label||null,this.note=l.note||null,this.link=l.link||null,this.href=l.href||null,this.id=z,this.length=z.length,this.role=i.role,this.hierarchy=S.hasOwnProperty("child"),this.extension=l.extension||null;break;case"category":var I=i.child;this.id=I,this.length=null===I?0:I.length,this.index=i.index,this.label=i.label,this.note=i.note||null,this.unit=i.unit,this.coordinates=i.coord;break;case"collection":if(this.length=0,this.label=i.label||null,this.note=i.note||null,this.link=i.link||null,this.href=i.href||null,this.updated=i.updated||null,this.source=i.source||null,this.extension=i.extension||null,null!==this.link&&i.link.item){var C=i.link.item;if(this.length=Array.isArray(C)?C.length:0,this.length)for(o=0;o<this.length;o++)this.id[o]=C[o].href}}}function e(t){return"[object ArrayBuffer]"===Object.prototype.toString.call(t.buffer)}function n(t){return-1!==["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array"].indexOf(t)}function i(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.json()}function r(e,n,r){var l="object"==typeof n?n:null;return"function"!=typeof r&&(r=null),r||"function"!=typeof n||(r=n),"object"==typeof e?new t(e,r):"version"===e?"1.5.2":fetch?fetch(e,l).then(i).then((function(e){return new t(e,r)})):void 0}t.prototype.Item=function(t){if(null===this||"collection"!==this.class||!this.length)return null;if("number"==typeof t)return t>this.length||t<0?null:this.link.item[t];var e,n=[];if("object"==typeof t){if(!t.class&&!t.follow)return null;t.class&&(e="dataset"===t.class&&"boolean"==typeof t.embedded?!0===t.embedded?function(t,e,i){var r=t.link.item[e];i.class===r.class&&r.id&&r.size&&r.dimension&&n.push(r)}:function(t,e,i){var r=t.link.item[e];i.class!==r.class||r.id&&r.size&&r.dimension||n.push(r)}:function(t,e,i){i.class===t.link.item[e].class&&n.push(t.link.item[e])})}else e=function(t,e){n.push(t.link.item[e])};for(var i=0;i<this.length;i++)e(this,i,t);return n},t.prototype.Dataset=function(e){if(null===this)return null;if("dataset"===this.class)return void 0!==e?this:[this];var n,i=[],r=0;if("collection"===this.class){var l=this.Item({class:"dataset",embedded:!0});if(void 0===e){for(n=l.length;r<n;r++)i.push(new t(l[r]));return i}if("number"==typeof e&&e>=0&&e<l.length)return new t(l[e]);if("string"==typeof e)for(n=l.length;r<n;r++)if(l[r].href===e)return new t(l[r]);return null}if("bundle"!==this.class)return null;if(void 0===e){for(n=this.id.length;r<n;r++)i.push(this.Dataset(this.id[r]));return i}if("number"==typeof e){var s=this.id[e];return void 0!==s?this.Dataset(s):null}var a=this.__tree__[e];return void 0===a?null:new t({class:"dataset",__tree__:a})},t.prototype.Dimension=function(e,n){n="boolean"!=typeof n||n;var i,r=[],l=this.id.length,s=function(t,e){if(null!==t)for(var n in t)for(var i=null!==t[n]?t[n].length:0;i--;)if(t[n][i]===e)return n;return null};if(null===this||"dataset"!==this.class)return null;if(void 0===e){for(i=0;i<l;i++)r.push(this.Dimension(this.id[i]));return r}if("number"==typeof e){var a=this.id[e];return void 0!==a?this.Dimension(a,n):null}var o=this.role;if("object"==typeof e){if(e.hasOwnProperty("role")){for(i=0;i<l;i++){var u=this.id[i];s(o,u)===e.role&&r.push(this.Dimension(u,n))}return void 0===r[0]?null:r}return null}var h=this.__tree__.dimension;if(void 0===h)return null;var f=h[e];return void 0===f?null:n?new t({class:"dimension",__tree__:f,role:s(o,e)}):function(t,e){var n=[];for(var i in t)n[t[i]]=e[i];return n}(f.category.index,f.category.label)},t.prototype.Category=function(e){if(null===this||"dimension"!==this.class)return null;if(void 0===e){for(var n=[],i=0,r=this.id.length;i<r;i++)n.push(this.Category(this.id[i]));return n}if("number"==typeof e){var l=this.id[e];return void 0!==l?this.Category(l):null}var s=this.__tree__.category;if(void 0===s)return null;var a=s.index[e];if(void 0===a)return null;var o=s.unit&&s.unit[e]||null,u=s.coordinates&&s.coordinates[e]||null,h=s.child&&s.child[e]||null,f=s.note&&s.note[e]||null;return new t({class:"category",index:a,label:s.label[e],note:f,child:h,unit:o,coord:u})},t.prototype.Dice=function(n,i,r){var l,s,a,o,u=function(t,e){return t.hasOwnProperty(e)&&!!t[e]};if(null===this||"dataset"!==this.class||null===this.value)return null;if("object"!=typeof n)return this;"object"!=typeof i?("boolean"==typeof i&&!0===i&&(l=!0),"boolean"==typeof r&&!0===r||(r=!1)):(l=u(i,"clone"),r=u(i,"drop"),s=u(i,"stringify"),a=u(i,"ovalue"),o=u(i,"ostatus"));var h,f=this.value,c=l?new t(JSON.parse(JSON.stringify(this))):this,d=c.status,v=[],y=[],p=function(t,e){var n,i,r,l=(n=t,i=e,r={},Array.isArray(n[i])?(n[i].forEach((function(t,e){null!==t&&(r[String(e)]=t)})),r):n[i]);delete t[e],t[e]=l};Array.isArray(n)&&(n=function(t){var e={};return t.forEach((function(t){e[t[0]]=t[1]})),e}(n)),null===n&&(n={});var g=Object.keys(n);return g.length>0&&(g.forEach((function(t){var e=n[t];Array.isArray(e)||(n[t]=[e]),0===n[t].length&&delete n[t]})),r&&(n=function(t){var e={};return Object.keys(t).forEach((function(n){e[n]=c.Dimension(n).id.filter((function(e){return-1===t[n].indexOf(e)}))})),e}(n)),c.toTable({type:"arrobj",content:"id",status:!0}).forEach((function(t,e){var i=[];g.forEach((function(e){var r=n[e],l=[];r.forEach((function(n){l.push(t[e]===n)})),i.push(-1!==l.indexOf(!0))})),-1===i.indexOf(!1)&&(v.push(t.value),y.push(t.status))})),g.forEach((function(t){var e=c.Dimension(t).id,i=0,r={};c.size[c.id.indexOf(t)]=n[t].length,e.forEach((function(e){-1!==n[t].indexOf(e)&&(r[e]=i,i++)})),c.__tree__.dimension[t].category.index=r})),c.n=v.length,c.value=c.__tree__.value=e(f)?function(t,e){return e.from(t)}(v,f.constructor):v,c.status=c.__tree__.status=null!==d?y:null),s?((h=c.__tree__).hasOwnProperty("id")||(h.version="2.0",h.hasOwnProperty("class")||(h.class="dataset"),h.id=h.dimension.id,h.size=h.dimension.size,delete h.dimension.id,delete h.dimension.size,h.dimension.hasOwnProperty("role")&&(h.role=h.dimension.role,delete h.dimension.role)),h.hasOwnProperty("status")&&-1!==["null","{}","[]"].indexOf(JSON.stringify(h.status))&&delete h.status,h.hasOwnProperty("role")&&(delete h.role.classification,["geo","time","metric"].forEach((function(t){null===h.role[t]&&delete h.role[t]}))),a&&p(h,"value"),o&&h.hasOwnProperty("status")&&p(h,"status"),JSON.stringify(h)):c},t.prototype.Slice=function(t){if(null===this||"dataset"!==this.class||0===Object.entries(this.value).length)return null;if(void 0===t)return this;if(!Array.isArray(t)){var e,n=[];for(e in t)n.push([e,t[e]]);t=n}return this.Dice(t.map((function(t){return[t[0],[t[1]]]})))},t.prototype.Data=function(t,e){var n,i,r=[],l=function(t){for(var e in t)if(t.hasOwnProperty(e))return e};if(null===this||"dataset"!==this.class||null===this.value)return null;if(void 0===t){for(i=this.value.length,n=0;n<i;n++)r.push(this.Data(n));return r}if("boolean"!=typeof e&&(e=!0),"number"==typeof t){var s=this.value[t];return void 0===s?null:e?{value:s,status:this.status?this.status[t]:null}:s}var a="object",o=this.__tree__,u=o.size||o.dimension&&o.dimension.size,h=u.length;if(Array.isArray(t)){if(!Array.isArray(t[0])){if(this.length!==t.length)return null;var f=1,c=0,d=[],v=[];for(n=0;n<h;n++)if(void 0!==t[n]){if("number"!=typeof t[n]||t[n]>=u[n])return null;c+=(f*=n>0?u[h-n]:1)*t[h-n-1]}else d.push(n),v.push(u[n]);if(d.length>1)return null;if(1===d.length){for(var y=0,p=v[0];y<p;y++){var g=[];for(n=0;n<h;n++)n!==d[0]?g.push(t[n]):g.push(y);r.push(this.Data(g,e))}return r}return e?{value:this.value[c],status:this.status?this.status[c]:null}:this.value[c]}a="array"}var b=function(t,e,n){var i,r=[],s={},a=t.dimension,o=t.id||a.id,u=t.size||a&&a.size;if("array"===n){for(i=e.length;i--;)s[e[i][0]]=e[i][1];e=s}for(var h=0,f=o.length;h<f;h++){var c=o[h],d=e[c];r.push("string"==typeof d?d:1===u[h]?l(a[c].category.index):null)}return r}(o,t,a),m=[],_=o.dimension,x=o.id||_.id;for(n=0,i=b.length;n<i;n++)m.push(_[x[n]].category.index[b[n]]);return this.Data(m,e)},t.prototype.toTable=function(t,e){if(null===this||"dataset"!==this.class||null===this.value)return null;1==arguments.length&&"function"==typeof t&&(e=t,t=null),"arrobj"!==(t=t||{field:"label",content:"label",vlabel:"Value",slabel:"Status",type:"array",status:!1,unit:!1,by:null,prefix:"",drop:[],meta:!1,comma:!1,bylabel:!1}).type&&"objarr"!==t.type||void 0!==t.field||(t.field="id");var i,r,l,s,a,o,u,h,f,c="id"===t.field,d=function(t){return(c?"value":t)||"Value"},v=function(t){return(c?"status":t)||"Status"},y=this.__tree__,p=!0===t.status;if("function"==typeof e){i=this.toTable(t);var g=[],b="array"!==t.type?0:1;for(a=(V="object"!==t.type?i.slice(b):i.rows.slice(0)).length,r=0;r<a;r++){var m=e.call(this,V[r],r);void 0!==m&&g.push(m)}return"object"===t.type?{cols:i.cols,rows:g}:("array"===t.type&&g.unshift(i[0]),g)}if("arrobj"===t.type||"objarr"===t.type){var _=[],x=y.role&&y.role.metric,O=function(){},A={},w=this,j=w.id,k=t.by&&-1!==j.indexOf(t.by)?t.by:null,D=!0===t.meta,P=void 0!==t.drop&&Array.isArray(t.drop)?t.drop:[],E=!0===t.comma,z=!0===t.bylabel,S=w.value.constructor,I=function(e){var i,r={},l=d(t.vlabel);if("objarr"===t.type&&(i=null===k&&n(S.name)?function(t){r[t]=t===l?S.from(e,(function(e){return e[t]})):e.map((function(e){return e[t]}))}:function(t){r[t]=e.map((function(e){return e[t]}))},Object.keys(e[0]).forEach(i),e=r),D){r={};return j.forEach((function(t){var e=w.Dimension(t);r[t]={label:e.label,role:e.role,categories:{id:e.id,label:w.Dimension(t,!1)}}})),{meta:{label:w.label,source:w.source,updated:w.updated,id:j,status:p,unit:t.unit,by:k,bylabel:z,drop:null!==k&&P.length>0?P:null,prefix:null!==k?G||"":null,comma:E,dimensions:r},data:e}}return e};k&&(t.field="id");var C=(i=this.toTable({field:t.field,vlabel:t.vlabel,slabel:t.slabel,content:t.content,status:p})).shift();if(null===k&&t.unit&&x){if("id"!==t.content)for(var T=x.length;T--;){var U=this.Dimension(x[T]);A[x[T]]={};for(var J=U.length;J--;)A[x[T]][U.Category(J).label]=U.id[J]}O=function(e,n){if(-1!==x.indexOf(e)){var i=y.dimension[e].category;i.unit?N.unit=i.unit["id"!==t.content?A[e][n]:n]:N.unit=null}},t.unit=!0}else t.unit=!1;for(a=i.length,r=0;r<a;r++){var N={};for(l=i[r].length;l--;)N[C[l]]=i[r][l],O(C[l],i[r][l]);_.push(N)}if(E&&_.forEach((function(t){null!==t.value&&(t.value=(""+t.value).replace(".",","))})),null!==k){var B,F={},V=[],q={},G=void 0!==t.prefix?t.prefix:"";P.forEach((function(t,e){(!w.Dimension(t)||w.Dimension(t).length>1)&&(P[e]="")}));var H=j.filter((function(t){return t!==k&&-1===P.indexOf(t)})),K=w.Dimension(k);for(var L in"id"!==t.content?z?B=function(t,e,n){t[e][G+n[k]]=n.value}:(K.Category().forEach((function(t,e){q[t.label]=K.id[e]})),B=function(t,e,n){t[e][G+q[n[k]]]=n.value}):B=function(t,e,n){t[e][G+n[k]]=n.value},_.forEach((function(t){var e=function(t,e){var n=[];return e.forEach((function(e){n.push(t[e])})),n.join("\t")}(t,H);void 0===F[e]&&(F[e]=function(t,e){var n={};return e.forEach((function(e){n[e]=t[e]})),n}(t,H)),B(F,e,t,k)})),F)V.push(F[L]);return p=!1,I(V)}return I(_)}if("object"===t.type){var M="number"==typeof this.value[0]||null===this.value[0]?"number":"string";o=function(t,e){var n=c&&t||e||t;it.push({id:t,label:n,type:"string"})},u=function(t,e,n){var i=d(t),r=v(e);n&&it.push({id:"status",label:r,type:"string"}),it.push({id:"value",label:i,type:M})},h=function(t){yt.push({v:t})},f=function(t){yt.push({v:t}),rt.push({c:yt})}}else o=function(t,e){var n=c&&t||e||t;it.push(n)},u=function(t,e,n){var i=d(t),r=v(e);n&&it.push(r),it.push(i),nt.push(it)},h=function(t){yt.push(t)},f=function(t){yt.push(t),nt.push(yt)};var Q=y.dimension,R=y.id||Q.id,W=y.size||Q.size,X=R.length;if(X!=W.length)return!1;var Y=[],Z=1,$=(T=1,[]),tt=[],et=[],nt=[],it=[],rt=[];for(r=0;r<X;r++){var lt=R[r];o(lt,Q[lt].label),Z*=W[r],T*=W[r];var st=[];for(l=0;l<W[r];l++)for(var at in Q[R[r]].category.index)if(Q[R[r]].category.index[at]===l){var ot="id"!==t.content&&Q[R[r]].category.label?Q[R[r]].category.label[at]:at;st.push(ot)}Y.push(st),$.push(T)}for(u(t.vlabel,t.slabel,p),a=Y.length,r=0;r<a;r++){for(var ut=[],ht=0,ft=Y[r].length;ht<ft;ht++)for(var ct=0;ct<Z/$[r];ct++)ut.push(Y[r][ht]);tt.push(ut)}for(a=tt.length,r=0;r<a;r++){var dt=[],vt=0;for(s=0;s<Z;s++)dt.push(tt[r][vt]),++vt===tt[r].length&&(vt=0);et.push(dt)}for(s=0;s<Z;s++){var yt=[];a=tt.length;for(var pt=0;pt<a;pt++)h(et[pt][s]);p&&h(this.status?this.status[s]:null),f(this.value[s])}return"object"===t.type?{cols:it,rows:rt}:nt},t.prototype.node=function(){return this.__tree__},t.prototype.toString=function(){return this.class};export{r as default};
