// jsonstat-toolkit v1.0.6 Copyright 2019 Xavier Badosa https://jsonstat.com
var t="1.0.6";function e(t){var n,i,r,l,s=function(t,e){var n,i=[];if("string"==typeof t&&(t=[t]),Array.isArray(t)){if(t.length===e)return t;if(1===t.length){for(n=0;n<e;n++)i.push(t[0]);return i}}for(n=0;n<e;n++){var r=void 0===t[n]?null:t[n];i.push(r)}return i};if(this.length=0,this.id=[],null!=t)switch(this.class=t.class||"bundle",this.class){case"bundle":var a=[],o=0;if(this.error=null,this.length=0,null===t||"object"!=typeof t)return void(this.class=null);if(t.hasOwnProperty("error"))return void(this.error=t.error);if("dataset"===t.class||"collection"===t.class||"dimension"===t.class)return new e(t);for(i in t)o++,a.push(i);this.__tree__=t,this.length=o,this.id=a;break;case"dataset":t.hasOwnProperty("__tree__")?this.__tree__=n=t.__tree__:this.__tree__=n=t,this.label=n.label||null,this.note=n.note||null,this.link=n.link||null,this.href=n.href||null,this.updated=n.updated||null,this.source=n.source||null,this.extension=n.extension||null;var u,h=0,f=n.size||n.dimension&&n.dimension.size;if(this.size=f,n.hasOwnProperty("value")&&Array.isArray(n.value))h=n.value.length;else{var c=1;for(u=f.length;u--;)c*=f[u];h=c}if(this.value=s(n.value,h),this.status=n.hasOwnProperty("status")?s(n.status,h):null,n.hasOwnProperty("dimension")){var d=n.dimension,v=n.role||!n.version&&d.role||null,p=n.id||d.id,y=f.length,g=function(t){v.hasOwnProperty(t)||(v[t]=null)};if(!Array.isArray(p)||!Array.isArray(f)||p.length!=y)return;if(this.length=y,this.id=p,v&&(g("time"),g("geo"),g("metric"),g("classification")),v&&null===v.classification){var _=[],b=["time","geo","metric"],m=function(t,e){for(var n=e.length;n--;)if(t===e[n])return!0;return!1};for(u=0;u<3;u++){var x=v[b[u]];null!==x&&(_=_.concat(x))}for(v.classification=[],u=0;u<y;u++)m(p[u],_)||v.classification.push(p[u]);0===v.classification.length&&(v.classification=null)}this.role=v,this.n=h;for(var w=0,A=this.length;w<A;w++)if(d[p[w]].category.hasOwnProperty("index")){if(Array.isArray(d[p[w]].category.index)){var k={},D=d[p[w]].category.index;for(r=D.length,l=0;l<r;l++)k[D[l]]=l;d[p[w]].category.index=k}}else{var O=0;for(i in d[p[w]].category.index={},d[p[w]].category.label)d[p[w]].category.index[i]=O++}}else this.length=0;break;case"dimension":if(!t.hasOwnProperty("__tree__"))return new e({version:"2.0",class:"dataset",dimension:{d:t},id:["d"],size:[function(t){var e=void 0===t.index?t.label:t.index;return Array.isArray(e)?e.length:Object.keys(e).length}(t.category)],value:[null]}).Dimension(0);var j=[],z=(n=t.__tree__).category;if(!n.hasOwnProperty("category"))return;if(!z.hasOwnProperty("label"))for(i in z.label={},z.index)z.label[i]=i;for(i in z.index)j[z.index[i]]=i;this.__tree__=n,this.label=n.label||null,this.note=n.note||null,this.link=n.link||null,this.href=n.href||null,this.id=j,this.length=j.length,this.role=t.role,this.hierarchy=z.hasOwnProperty("child"),this.extension=n.extension||null;break;case"category":var P=t.child;this.id=P,this.length=null===P?0:P.length,this.index=t.index,this.label=t.label,this.note=t.note||null,this.unit=t.unit,this.coordinates=t.coord;break;case"collection":if(this.length=0,this.label=t.label||null,this.note=t.note||null,this.link=t.link||null,this.href=t.href||null,this.updated=t.updated||null,this.source=t.source||null,this.extension=t.extension||null,null!==this.link&&t.link.item){var E=t.link.item;if(this.length=Array.isArray(E)?E.length:0,this.length)for(l=0;l<this.length;l++)this.id[l]=E[l].href}}}function n(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.json()}e.prototype.Item=function(t){if(null===this||"collection"!==this.class||!this.length)return null;if("number"==typeof t)return t>this.length||t<0?null:this.link.item[t];var e,n=[];if("object"==typeof t){if(!t.class&&!t.follow)return null;t.class&&(e="dataset"===t.class&&"boolean"==typeof t.embedded?!0===t.embedded?function(t,e,i){var r=t.link.item[e];i.class===r.class&&r.id&&r.size&&r.dimension&&n.push(r)}:function(t,e,i){var r=t.link.item[e];i.class!==r.class||r.id&&r.size&&r.dimension||n.push(r)}:function(t,e,i){i.class===t.link.item[e].class&&n.push(t.link.item[e])})}else e=function(t,e){n.push(t.link.item[e])};for(var i=0;i<this.length;i++)e(this,i,t);return n},e.prototype.Dataset=function(t){if(null===this)return null;if("dataset"===this.class)return void 0!==t?this:[this];var n,i=[],r=0;if("collection"===this.class){var l=this.Item({class:"dataset",embedded:!0});if(void 0===t){for(n=l.length;r<n;r++)i.push(new e(l[r]));return i}if("number"==typeof t&&t>=0&&t<l.length)return new e(l[t]);if("string"==typeof t)for(n=l.length;r<n;r++)if(l[r].href===t)return new e(l[r]);return null}if("bundle"!==this.class)return null;if(void 0===t){for(n=this.id.length;r<n;r++)i.push(this.Dataset(this.id[r]));return i}if("number"==typeof t){var s=this.id[t];return void 0!==s?this.Dataset(s):null}var a=this.__tree__[t];return void 0===a?null:new e({class:"dataset",__tree__:a})},e.prototype.Dimension=function(t,n){n="boolean"!=typeof n||n;var i,r=[],l=this.id.length,s=function(t,e){if(null!==t)for(var n in t)for(var i=null!==t[n]?t[n].length:0;i--;)if(t[n][i]===e)return n;return null};if(null===this||"dataset"!==this.class)return null;if(void 0===t){for(i=0;i<l;i++)r.push(this.Dimension(this.id[i]));return r}if("number"==typeof t){var a=this.id[t];return void 0!==a?this.Dimension(a,n):null}var o=this.role;if("object"==typeof t){if(t.hasOwnProperty("role")){for(i=0;i<l;i++){var u=this.id[i];s(o,u)===t.role&&r.push(this.Dimension(u,n))}return void 0===r[0]?null:r}return null}var h=this.__tree__.dimension;if(void 0===h)return null;var f=h[t];return void 0===f?null:n?new e({class:"dimension",__tree__:f,role:s(o,t)}):function(t,e){var n=[];for(var i in t)n[t[i]]=e[i];return n}(f.category.index,f.category.label)},e.prototype.Category=function(t){if(null===this||"dimension"!==this.class)return null;if(void 0===t){for(var n=[],i=0,r=this.id.length;i<r;i++)n.push(this.Category(this.id[i]));return n}if("number"==typeof t){var l=this.id[t];return void 0!==l?this.Category(l):null}var s=this.__tree__.category;if(void 0===s)return null;var a=s.index[t];if(void 0===a)return null;var o=s.unit&&s.unit[t]||null,u=s.coordinates&&s.coordinates[t]||null,h=s.child&&s.child[t]||null,f=s.note&&s.note[t]||null;return new e({class:"category",index:a,label:s.label[t],note:f,child:h,unit:o,coord:u})},e.prototype.Slice=function(t){if(null===this||"dataset"!==this.class)return null;if(void 0===t)return this;if(!Array.isArray(t)){var e,n=[];for(e in t)n.push([e,t[e]]);t=n}var i=this,r=t.length,l=i.toTable({field:"id",content:"id",status:!0}),s=i.status,a=l.shift(),o=!1,u=[],h=[],f=[],c=[];return t.forEach((function(t){var e=i.Dimension(t[0]);if(null!==e){var n=e.id.indexOf(t[1]);-1!==n?(f.push([i.id.indexOf(t[0]),n]),c.push(e.Category(n).label)):o=!0}else o=!0})),o?null:(l.forEach((function(e){var n,i={},l=0;for(n=e.length;n--;)i[a[n]]=e[n];t.forEach((function(t){i[t[0]]===t[1]&&l++})),r===l&&(u.push(i.value),h.push(i.status))})),i.n=u.length,i.value=i.__tree__.value=u,i.status=i.__tree__.status=null!==s?h:null,t.forEach((function(t,e){i.size[f[e][0]]=1,i.__tree__.dimension[t[0]].category.index={},i.__tree__.dimension[t[0]].category.index[t[1]]=0,i.__tree__.dimension[t[0]].category.label={},i.__tree__.dimension[t[0]].category.label[t[1]]=c[e]})),i)},e.prototype.Data=function(t,e){var n,i,r=[],l=function(t){for(var e in t)if(t.hasOwnProperty(e))return e};if(null===this||"dataset"!==this.class)return null;if(void 0===t){for(i=this.value.length,n=0;n<i;n++)r.push(this.Data(n));return r}if("boolean"!=typeof e&&(e=!0),"number"==typeof t){var s=this.value[t];return void 0===s?null:e?{value:s,status:this.status?this.status[t]:null}:s}var a="object",o=this.__tree__,u=o.size||o.dimension&&o.dimension.size,h=u.length;if(Array.isArray(t)){if(!Array.isArray(t[0])){if(this.length!==t.length)return null;var f=1,c=0,d=[],v=[];for(n=0;n<h;n++)if(void 0!==t[n]){if("number"!=typeof t[n]||t[n]>=u[n])return null;c+=(f*=n>0?u[h-n]:1)*t[h-n-1]}else d.push(n),v.push(u[n]);if(d.length>1)return null;if(1===d.length){for(var p=0,y=v[0];p<y;p++){var g=[];for(n=0;n<h;n++)n!==d[0]?g.push(t[n]):g.push(p);r.push(this.Data(g,e))}return r}return e?{value:this.value[c],status:this.status?this.status[c]:null}:this.value[c]}a="array"}var _=function(t,e,n){var i,r=[],s={},a=t.dimension,o=t.id||a.id,u=t.size||a&&a.size;if("array"===n){for(i=e.length;i--;)s[e[i][0]]=e[i][1];e=s}for(var h=0,f=o.length;h<f;h++){var c=o[h],d=e[c];r.push("string"==typeof d?d:1===u[h]?l(a[c].category.index):null)}return r}(o,t,a),b=[],m=o.dimension,x=o.id||m.id;for(n=0,i=_.length;n<i;n++)b.push(m[x[n]].category.index[_[n]]);return this.Data(b,e)},e.prototype.toTable=function(t,e){if(null===this||"dataset"!==this.class)return null;1==arguments.length&&"function"==typeof t&&(e=t,t=null),t=t||{field:"label",content:"label",vlabel:"Value",slabel:"Status",type:"array",status:!1,unit:!1,by:null,prefix:"",drop:[],meta:!1,comma:!1,bylabel:!1};var n,i,r,l,s,a=this.__tree__,o=!0===t.status;if("function"==typeof e){n=this.toTable(t);var u=[],h="array"!==t.type?0:1;for(s=(C="object"!==t.type?n.slice(h):n.rows.slice(0)).length,i=0;i<s;i++){var f=e.call(this,C[i],i);void 0!==f&&u.push(f)}return"object"===t.type?{cols:n.cols,rows:u}:("array"===t.type&&u.unshift(n[0]),u)}if("arrobj"===t.type){var c=[],d=(n=this.toTable({field:"id",content:t.content,status:o})).shift(),v=a.role&&a.role.metric,p=function(){},y={},g=this,_=g.id,b=t.by&&-1!==_.indexOf(t.by)?t.by:null,m=!0===t.meta,x=void 0!==t.drop&&Array.isArray(t.drop)?t.drop:[],w=!0===t.comma,A=!0===t.bylabel,k=function(e){if(m){var n={};return _.forEach((function(t){var e=g.Dimension(t);n[t]={label:e.label,role:e.role,categories:{id:e.id,label:g.Dimension(t,!1)}}})),{meta:{label:g.label,source:g.source,updated:g.updated,id:_,status:o,unit:t.unit,by:b,bylabel:A,drop:null!==b&&x.length>0?x:null,prefix:null!==b?T||"":null,comma:w,dimensions:n},data:e}}return e};if(null===b&&t.unit&&v){if("id"!==t.content)for(var D=v.length;D--;){var O=this.Dimension(v[D]);y[v[D]]={};for(var j=O.length;j--;)y[v[D]][O.Category(j).label]=O.id[j]}p=function(e,n){if(-1!==v.indexOf(e)){var i=a.dimension[e].category;i.unit?z.unit=i.unit["id"!==t.content?y[e][n]:n]:z.unit=null}},t.unit=!0}else t.unit=!1;for(s=n.length,i=0;i<s;i++){var z={};for(r=n[i].length;r--;)z[d[r]]=n[i][r],p(d[r],n[i][r]);c.push(z)}if(w&&c.forEach((function(t){null!==t.value&&(t.value=(""+t.value).replace(".",","))})),null!==b){var P,E={},C=[],S={},T=void 0!==t.prefix?t.prefix:"";x.forEach((function(t,e){(!g.Dimension(t)||g.Dimension(t).length>1)&&(x[e]="")}));var V=_.filter((function(t){return t!==b&&-1===x.indexOf(t)})),I=g.Dimension(b),q=function(t,e){var n=[];return e.forEach((function(e){n.push(t[e])})),n.join("\t")},B=function(t,e){var n={};return e.forEach((function(e){n[e]=t[e]})),n};for(var F in"id"!==t.content?A?P=function(t,e,n){t[e][T+n[b]]=n.value}:(I.Category().forEach((function(t,e){S[t.label]=I.id[e]})),P=function(t,e,n){t[e][T+S[n[b]]]=n.value}):P=function(t,e,n){t[e][T+n[b]]=n.value},c.forEach((function(t){var e=q(t,V);void 0===E[e]&&(E[e]=B(t,V)),P(E,e,t,b)})),E)C.push(E[F]);return o=!1,k(C)}return k(c)}var G,H,J,K,L="id"===t.field;if("object"===t.type){var M="number"==typeof this.value[0]||null===this.value[0]?"number":"string";G=function(t,e){var n=L&&t||e||t;et.push({id:t,label:n,type:"string"})},H=function(t,e,n){var i=(L?"value":t)||"Value",r=(L?"status":e)||"Status";n&&et.push({id:"status",label:r,type:"string"}),et.push({id:"value",label:i,type:M})},J=function(t){vt.push({v:t})},K=function(t){vt.push({v:t}),nt.push({c:vt})}}else G=function(t,e){var n=L&&t||e||t;et.push(n)},H=function(t,e,n){var i=(L?"value":t)||"Value",r=(L?"status":e)||"Status";n&&et.push(r),et.push(i),tt.push(et)},J=function(t){vt.push(t)},K=function(t){vt.push(t),tt.push(vt)};var N=a.dimension,Q=a.id||N.id,R=a.size||N.size,U=Q.length;if(U!=R.length)return!1;var W=[],X=1,Y=(D=1,[]),Z=[],$=[],tt=[],et=[],nt=[];for(i=0;i<U;i++){var it=Q[i],rt=N[it].label;G(it,rt),X*=R[i],D*=R[i];var lt=[];for(r=0;r<R[i];r++)for(var st in N[Q[i]].category.index)if(N[Q[i]].category.index[st]===r){var at="id"!==t.content&&N[Q[i]].category.label?N[Q[i]].category.label[st]:st;lt.push(at)}W.push(lt),Y.push(D)}for(H(t.vlabel,t.slabel,o),s=W.length,i=0;i<s;i++){for(var ot=[],ut=0,ht=W[i].length;ut<ht;ut++)for(var ft=0;ft<X/Y[i];ft++)ot.push(W[i][ut]);Z.push(ot)}for(s=Z.length,i=0;i<s;i++){var ct=[],dt=0;for(l=0;l<X;l++)ct.push(Z[i][dt]),++dt===Z[i].length&&(dt=0);$.push(ct)}for(l=0;l<X;l++){var vt=[];s=Z.length;for(var pt=0;pt<s;pt++)J($[pt][l]);o&&J(this.status?this.status[l]:null),K(this.value[l])}return"object"===t.type?{cols:et,rows:nt}:tt},e.prototype.node=function(){return this.__tree__},e.prototype.toString=function(){return this.class};export default function(i,r){return"object"==typeof i?new e(i):"version"===i?t:fetch?fetch(i,r).then(n).then((function(t){return new e(t)})):void 0}