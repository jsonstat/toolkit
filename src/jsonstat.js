//{follow: true} is gone in version 1
function jsonstat(o, typedArray){
	var
		//sparse cube (value or status)
		//If only one value/status is provided it means same for all (if more than one, then missing values/statuses are nulled).
		normalize=function(s, len, ta){
			//1.5.0 [], {} (when empty, it can only be {})
			if(Object.entries(s).length===0){
				return null;
			}

			var ret=[], l;

			if(ta && !isValidTypedArrayName(ta.name)){
				ta=null;
			}

			if(typeof s==="string"){
				s=[s];
			}
			if(//Array or TypedArray
				Array.isArray(s) ||
				isTypedArray(s) //1.4.0
			){
				if(s.length===len){ //normal case
					//1.4.0 (1.4.1 don't convert to TypedArray if nulls (or empty or undefined) are present)
					return ta && -1===s.findIndex(function(d){return d===null || typeof d==="undefined";}) ? ta.from(s) : s;
				}
				if(s.length===1){ //all obs same status
					for(l=0; l<len; l++){
						ret.push(s[0]);
					}
					return ret;
				}
			}

			//It's an object (sparse cube) or an incomplete array that must be filled with nulls
			for(l=0; l<len; l++){
				var e=(typeof s[l]==="undefined") ? null: s[l];
				ret.push(e);
			}
			return ret;
		},
		//For native dimension responses
		dimSize=function(cat){
			var c=( typeof cat.index==="undefined" ) ? cat.label : cat.index;
			return ( Array.isArray(c) ) ? c.length : Object.keys(c).length;
		},
		ot, prop, ilen, i
	;

	this.length=0;
	this.id=[];
	if (o===null || typeof o==="undefined"){
		return;
	}

	this.class=o.class || "bundle";
	switch(this.class){
		case "bundle" : //Real bundle, or URL (bundle, dataset, collection, dimension), or error
			var arr=[], ds=0;
			this.error=null;
			this.length=0;

			// Wrong input object
			if(o===null || typeof o!=="object"){
				this.class=null;
				return;
			}

			// Explicit error
			if(o.hasOwnProperty("error")){
				this.error=o.error;
				return;
			}

			//When o is a URI, class won't be set before the request
			//and it will enter the bundle case: once we have a response
			//if class is dataset we redirect to case "dataset". 0.7.5
			if(o.class==="dataset" || o.class==="collection" || o.class==="dimension"){
				return new jsonstat(o);
			}

			for (prop in o){
				ds++;
				arr.push(prop);
			}
			this.__tree__=o;
			this.length=ds;
			this.id=arr;
		break;

		case "dataset" :
			//It's a native response of class "dataset"
			if(!o.hasOwnProperty("__tree__")){
				this.__tree__=ot=o;
			}else{
				this.__tree__=ot=o.__tree__;
			}

			this.label=ot.label || null;
			this.note=ot.note || null; //v.0.7.0
			this.link=ot.link || null; //v.0.7.0
			this.href=ot.href || null; //v.0.7.0
			this.updated=ot.updated || null;
			this.source=ot.source || null; //v.0.5.0
			this.extension=ot.extension || null; //v.0.7.0

			//Sparse cube (If toTable() removed, this logic can be moved inside Data()
			//which is more efficient when retrieving a single value/status.
			var
				s,
				dsize=0, //data size
				size=ot.size || (ot.dimension && ot.dimension.size) //0.9.0 (JSON-stat 2.0)
			;

			this.size=size; //0.10.0

			//1.2.7 No value, null, [] => same as {} (metadata response)
			this.value=(!ot.hasOwnProperty("value") || ot.value===null || ot.value.length===0) ? {} : ot.value;

			if(
				Array.isArray(this.value) ||
				isTypedArray(this.value) //1.4.0
			){
				dsize=this.value.length;
			}else{
				var length=1;
				for(s=size.length; s--;){
					length*=size[s];
				}
				dsize=length;
			}

			this.value=normalize(this.value, dsize, typedArray);
			this.status=(!(ot.hasOwnProperty("status"))) ? null : normalize(ot.status, dsize);

			// if dimensions are defined, id and size arrays are required and must have equal length
			if (ot.hasOwnProperty("dimension")){
				var
					otd=ot.dimension,
					otr=ot.role || (!ot.version && otd.role) || null, //0.9.0 (JSON-stat 2.0) - Added check for version 0.9.1: role only valid on dimension if no version
					otdi=ot.id || otd.id, //0.9.0 (JSON-stat 2.0)
					otdl=size.length,
					createRole=function(s){
						if(!otr.hasOwnProperty(s)){
							otr[s]=null;
						}
					}
				;

				if (
					!(Array.isArray(otdi)) ||
					!(Array.isArray(size)) ||
					otdi.length!=otdl
					){
					return;
				}

				this.length=otdl;
				this.id=otdi;

				if(otr){
					createRole("time");
					createRole("geo");
					createRole("metric");
					createRole("classification");
				}

				//If role not null, leave it as it is but add a classification role if it's null. Added in 0.7.1
				if (otr && otr.classification===null){
					var
						gmt=[],
						roles=["time","geo","metric"],
						//Replace with polyfill of Array.indefOf at some point?
						inArray=function(e, a){
							for(var i=a.length;i--;){
								if(e===a[i]){
									return true;
								}
							}
							return false;
						}
					;

					for(s=0; s<3; s++){
						var rr=otr[roles[s]];
						if(rr!==null){
							gmt=gmt.concat(rr);
						}
					}

					otr.classification=[];

					//not inverse looping to preserve dim order
					for(s=0; s<otdl; s++){
						if(!inArray(otdi[s], gmt)){
							otr.classification.push(otdi[s]);
						}
					}

					if(otr.classification.length===0){
						otr.classification=null;
					}
				}

				this.role=otr;

				this.n=dsize; //number of obs added in 0.4.2

				//If only one category, no need of index according to the spec
				//This actually will recreate an index even if there are more than one category and no index is provided
				//but because there's no guarantee that properties are retrieved in a particular order (even though it worked in Ch,FF,IE,Sa,Op)
				//(Main problem in fact is that you don't have to WRITE them in a particular order) the original order of categories could
				//theoretically be changed. That's why the procedure will only be valid when there's only one category.
				//Note: If toTable() is removed it would make more sense to move this loop inside Dimension() as it is not needed for Data().
				for(var d=0, len=this.length; d<len; d++){
					if (!(otd[otdi[d]].category.hasOwnProperty("index"))){
						var c=0;
						otd[otdi[d]].category.index={};
						for (prop in otd[otdi[d]].category.label){
							otd[otdi[d]].category.index[prop]=c++;
						}
					}else{
						// If index is array instead of object convert into object
						// That is: we normalize it (instead of defining a function depending on
						// index type to read categories -maybe in the future when indexOf can be
						// assumed for all browsers and default is array instead of object-)
						if(Array.isArray(otd[otdi[d]].category.index)){
							var oindex={}, index=otd[otdi[d]].category.index;

							ilen=index.length;
							for (i=0; i<ilen; i++){
								oindex[index[i]]=i;
							}
							otd[otdi[d]].category.index=oindex;
						}
					}
				}
			}else{
				this.length=0;
			}
		break;
		case "dimension" :
			//It's a native response of class "dimension"
			if( !o.hasOwnProperty("__tree__") ){
				return new jsonstat({
						"version": "2.0",
						"class": "dataset",
						"dimension": {
							d: o
						},
						"id": ["d"],
						"size": [ dimSize(o.category) ],
						"value": [ null ]
					}).Dimension(0)
				;
			}

			ot=o.__tree__;
			var cats=[], otc=ot.category;
			if(
				!ot.hasOwnProperty("category") //Already tested in the Dimension() / Category() ? method
				){
				return;
			}

			//If no category label, use IDs
			if(!otc.hasOwnProperty("label")){
				otc.label={};
				for (prop in otc.index){
					otc.label[prop]=prop;
				}
			}

			//Array conversion
			for (prop in otc.index){
				cats[otc.index[prop]]=prop; //0.4.3 cats.push(prop) won't do because order not in control when index was originally an array and was converted to object by the Toolkit.
			}

			this.__tree__=ot;
			//When no dimension label, undefined is returned.
			//Discarded options: null / dim
			this.label=ot.label || null;
			this.note=ot.note || null; //v.0.7.0
			this.link=ot.link || null; //v.0.7.0
			this.href=ot.href || null; //v.0.7.0
			this.id=cats;
			this.length=cats.length;
			this.role=o.role;
			this.hierarchy=otc.hasOwnProperty("child"); //0.6.0
			this.extension=ot.extension || null; //v.0.7.0
		break;
		case "category" :
			var par=o.child;

			//0.5.0 changed. It was autoreference: id. And length was 0 always
			this.id=par;
			this.length=(par===null) ? 0 : par.length;

			this.index=o.index;
			this.label=o.label;
			this.note=o.note || null; //v.0.7.0

			this.unit=o.unit; //v.0.5.0
			this.coordinates=o.coord; //v.0.5.0
		break;
		case "collection" : //0.8.0
			this.length=0;
			this.label=o.label || null;
			this.note=o.note || null;
			this.link=o.link || null;
			this.href=o.href || null;
			this.updated=o.updated || null;
			this.source=o.source || null;
			this.extension=o.extension || null;

			if(this.link!==null && o.link.item){
				var item=o.link.item;

				this.length=( Array.isArray(item) ) ? item.length : 0;
				if(this.length){
					for(i=0; i<this.length; i++){
						this.id[i]=item[i].href;
					}
				}
			}
		break;
	}
}

//1.4.0
function isTypedArray(s){
	return Object.prototype.toString.call(s.buffer) === "[object ArrayBuffer]";
}

//1.4.0
function isValidTypedArrayName(name){
	var names=[
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array",
		"BigInt64Array",
		"BigUint64Array"
	];

	return names.indexOf(name)!==-1;
}

jsonstat.prototype.Item=function(o){ //0.8.0
	if (this===null || this.class!=="collection" || !this.length){
		return null;
	}

	if(typeof o==="number"){
		if(o>this.length || o<0){
			return null;
		}
		return this.link.item[o];
	}

	var ret=[], func;

	if(typeof o==="object"){
		//Do not accept invalid objects (0.8.3)
		if(!o.class && !o.follow){
			return null;
		}
		if(o.class){
			//0.9.3 Embedded currently only valid with datasets (and JSON-stat 2.0)
			if(o.class==="dataset" && typeof o.embedded==="boolean"){
				//0.9.4 embedded===false added
				if(o.embedded===true){
					func=function(t,i,c){
						var item=t.link.item[i];
						if(
							c.class===item.class &&
							item.id && item.size && item.dimension //it seems like a full embedded dataset
						){
							ret.push(item);
						}
					};
				}else{
					func=function(t,i,c){
						var item=t.link.item[i];
						if(
							c.class===item.class &&
							(!item.id || !item.size || !item.dimension) //dataset reference only
						){
							ret.push(item);
						}
					};
				}
			}else{
				func=function(t,i,c){
					if(c.class===t.link.item[i].class){
						ret.push(t.link.item[i]);
					}
				};
			}
		}
		//{follow: true} is gone in version 1
	}else{ //not object, not number: void or string (ignore)
		func=function(t,i){
			ret.push(t.link.item[i]);
		};
	}

	for(var i=0; i<this.length; i++){
		func(this,i,o);
	}
	return ret;
};

jsonstat.prototype.Dataset=function(ds){
	if(this===null){
		return null;
	}

	//0.8.1 Dataset responses can be treated as bundle ones
	if(this.class==="dataset"){
		return (typeof ds!=="undefined") ? this : [this];
	}

	var
		len,
		ar=[],
		c=0
	;

	//0.9.3 Dataset collections can be managed as old bundles if they are embedded
	if(this.class==="collection"){
		var dscol=this.Item({"class": "dataset", "embedded": true});

		if(typeof ds==="undefined"){
			for(len=dscol.length; c<len; c++){
				ar.push(new jsonstat(dscol[c]));
			}
			return ar;
		}

		//Dataset(2) means the 3rd embedded dataset in the collection
		if(typeof ds==="number" && ds>=0 && ds<dscol.length){
			return new jsonstat(dscol[ds]);
		}

		//Dataset("http://...") selection by ID (href) for generalization's sake (probably not particularly useful) 0.9.9
		if(typeof ds==="string"){
			for(len=dscol.length; c<len; c++){
				if(dscol[c].href===ds){
					return new jsonstat(dscol[c]);
				}
			}
		}

		return null;
	}

	if(this.class!=="bundle"){
		return null;
	}

	if(typeof ds==="undefined"){
		for(len=this.id.length; c<len; c++){
			ar.push(this.Dataset(this.id[c]));
		}
		return ar;
	}
	if(typeof ds==="number"){
		var num=this.id[ds];
		return (typeof num!=="undefined") ? this.Dataset(num) : null;
	}

	var tds=this.__tree__[ds];
	if(typeof tds==="undefined"){
		return null;
	}

	return new jsonstat({"class" : "dataset", "__tree__": tds});
};

jsonstat.prototype.Dimension=function(dim, bool){
	bool=(typeof bool==="boolean") ? bool : true; //0.12.2

	var
		ar=[],
		c,
		len=this.id.length,
		role=function(otr,dim){ //0.9.0 (JSON-stat 2.0)
			if(otr!==null){
				for(var prop in otr){
					for(var p=(otr[prop]!==null ? otr[prop].length : 0); p--;){
						if(otr[prop][p]===dim){
							return prop;
						}
					}
				}
			}
			return null;
		}
	;

	if (this===null || this.class!=="dataset"){
		return null;
	}
	if(typeof dim==="undefined"){
		for(c=0; c<len; c++){
			ar.push(this.Dimension(this.id[c]));
		}
		return ar;
	}
	if(typeof dim==="number"){
		var num=this.id[dim];
		return (typeof num!=="undefined") ? this.Dimension(num, bool) : null;
	}

	var otr=this.role;

	//currently only "role" is supported as filter criterion
	if(typeof dim==="object"){
		if(dim.hasOwnProperty("role")){
			for(c=0; c<len; c++){
				var oid=this.id[c];
				if(role(otr,oid)===dim.role){
					ar.push(this.Dimension(oid, bool));
				}
			}
			return (typeof ar[0]==="undefined") ? null : ar;
		}else{
			return null;
		}
	}

	var otd=this.__tree__.dimension;
	if(typeof otd==="undefined"){
		return null;
	}

	var otdd=otd[dim];
	if(typeof otdd==="undefined"){
		return null;
	}

	if(!bool){ //0.12.2
		return (function(index, label){
			var labels=[];
			for(var prop in index){
				labels[index[prop]]=label[prop];
			}
			return labels;
		})(otdd.category.index, otdd.category.label);
	}

	return new jsonstat({"class" : "dimension", "__tree__": otdd, "role": role(otr,dim)});
};

jsonstat.prototype.Category=function(cat){
	if (this===null || this.class!=="dimension"){
		return null;
	}
	if(typeof cat==="undefined"){
		var ar=[];
		for(var c=0, len=this.id.length; c<len; c++){
			ar.push(this.Category(this.id[c]));
		}
		return ar;
	}
	if(typeof cat==="number"){
		var num=this.id[cat];
		return (typeof num!=="undefined") ? this.Category(num) : null;
	}

	var oc=this.__tree__.category;
	if(typeof oc==="undefined"){
		return null;
	}
	var index=oc.index[cat];
	if(typeof index==="undefined"){
		return null;
	}

	var
		unit=(oc.unit && oc.unit[cat]) || null,
		coord=(oc.coordinates && oc.coordinates[cat]) || null,
		child=(oc.child && oc.child[cat]) || null,
		note=(oc.note && oc.note[cat]) || null
	;
	return new jsonstat({"class" : "category", "index": index, "label": oc.label[cat], "note": note, "child" : child, "unit" : unit, "coord" : coord});
};


//Since v.1.1.0 (more powerful than Slice)
//Supports 1.1 (filters, clone, drop) Deprecated
//Supports 1.2 (filters, options)
//options={clone: false, drop: false, stringify: false, ovalue: false, ostatus: false}
jsonstat.prototype.Dice=function(filters, options, drop){
	var
		clone,
		stringify,
		ovalue,
		ostatus,
		boolize=function(opt, par){
			return opt.hasOwnProperty(par) && !!opt[par];
		},
		toTypedArray=function(value, constructor){//1.4.0
			return constructor.from(value);
		}
	;

	if(this===null || this.class!=="dataset"
		//1.5.1
		|| this.value===null
	){
		return null;
	}
	if(typeof filters!=="object"){
		return this;
	}

	if(typeof options!=="object"){
		//Old style (v.1.1)
		if(typeof options==="boolean" && options===true){
			clone=true;
		}
		if(typeof drop!=="boolean" || drop!==true){
			drop=false;
		}
	}else{ //1.2+ (options object)
		clone=boolize(options, "clone");
		drop=boolize(options, "drop");
		stringify=boolize(options, "stringify");
		ovalue=boolize(options, "ovalue");
		ostatus=boolize(options, "ostatus");
	}

  var
		originalValue=this.value,
		ds=clone ? new jsonstat(JSON.parse(JSON.stringify(this))) : this,
		statin=ds.status,
		tree,
    value=[],
    status=[],
		objectify=function(filters){
			var obj={};
			filters.forEach(function(f){
				obj[f[0]]=f[1];
			});
			return obj;
		},
		keep=function(drop){
			var obj={};
			Object.keys(drop)
				.forEach(function(d){
					obj[d]=ds.Dimension(d).id.filter(function(cat){
						return drop[d].indexOf(cat)===-1;
					})
				})
			;
			return obj;
		},
		arr2obj=function(o,p){ //o object p property
			var ret={};
			if(Array.isArray(o[p])){
				o[p].forEach(function(e,i){
					if(e!==null){
						ret[String(i)]=e;
					}
				});
				return ret;
			}
			return o[p];
		},
		modify=function(tree, attr){
			var newcont=arr2obj(tree, attr);
			delete tree[attr];
			tree[attr]=newcont;
		}
	;

	//Accept arrays [["area", ["BE","ES"]],["year", ["2010","2011"]]]
  if(Array.isArray(filters)){
    filters=objectify(filters);
  }

	//filters are not required. {} and [] accepted but also null
	if(filters===null){
		filters={};
	}

	var ids=Object.keys(filters);

	//If there are filters... (with or without filters value and status are returned as arrays)
	if(ids.length>0){
		//category values must be inside array
		ids.forEach(function(dim){
			var d=filters[dim];
			if(!Array.isArray(d)){
				filters[dim]=[d];
			}

			if(filters[dim].length===0){
				delete filters[dim];
			}
		});

		if(drop){
			filters=keep(filters);
		}

	  ds
	  .toTable({type: "arrobj", content: "id", status: true})
	  .forEach(function(item, i){
	    var or=[];

	    ids.forEach(function(dimid){
	      var
	        catids=filters[dimid],
	        filter=[]
	      ;

	      catids.forEach(function(id){
	        filter.push(item[dimid]===id);
	      });

	      or.push(filter.indexOf(true)!==-1);//OR
	    });

	    if(or.indexOf(false)===-1){//AND
	      value.push(item.value);
	      status.push(item.status);
	    }
	  });

	  ids.forEach(function(dimid){
	    var
	      ids=ds.Dimension(dimid).id,
	      ndx=0,
	      index={}
	    ;

	    ds.size[ds.id.indexOf(dimid)]=filters[dimid].length;

	    ids.forEach(function(catid){
	      if(filters[dimid].indexOf(catid)!==-1){
	        index[catid]=ndx;
	        ndx++;
	      }
	    });

	    ds.__tree__.dimension[dimid].category.index=index;
	  });

	  ds.n=value.length;

		//1.4.0 Support for TypedArrays
		ds.value=ds.__tree__.value=isTypedArray(originalValue) ? toTypedArray(value, originalValue.constructor) : value;
		ds.status=ds.__tree__.status=(statin!==null) ? status : null;
	}

	if(stringify){
		tree=ds.__tree__;

		//if v<2.0 convert to 2.0
		if(!tree.hasOwnProperty("id")){
			tree.version="2.0";
			if(!tree.hasOwnProperty("class")){
				tree.class="dataset";
			}

			tree.id=tree.dimension.id;
			tree.size=tree.dimension.size;
			delete tree.dimension.id;
			delete tree.dimension.size;

			if(tree.dimension.hasOwnProperty("role")){
				tree.role=tree.dimension.role;
				delete tree.dimension.role;
			}
		}

    if(tree.hasOwnProperty("status") && ["null", "{}", "[]"].indexOf(JSON.stringify(tree.status))!==-1){
      delete tree.status;
    }

    if(tree.hasOwnProperty("role")){
      delete tree.role.classification;

      ["geo", "time", "metric"].forEach(function(e){
        if(tree.role[e]===null){
          delete tree.role[e];
        }
      });
    }

		if(ovalue){
			modify(tree, "value");
		}
		if(ostatus && tree.hasOwnProperty("status")){
			modify(tree, "status");
		}

		return JSON.stringify(tree);
	}

	return ds;
};

//Deprecated since v.1.1
jsonstat.prototype.Slice=function(filter){
	if(this===null || this.class!=="dataset"
		//1.5.0
		|| Object.entries(this.value).length===0
	){
		return null;
	}
	if(typeof filter==="undefined"){
		return this;
	}

	//Convert {"gender": "M" } into [ ["gender", "M"] ]
	if(!Array.isArray(filter)){
		var
			p,
			arr=[]
		;
		for (p in filter) {
			arr.push([ p, filter[p] ]);
		}

		filter=arr;
	}

	return this.Dice(
		filter.map(function(e){
			return [ e[0], [e[1]] ];
		})
	);
};

jsonstat.prototype.Data=function(e, include){
	var
		i, ret=[], len,
		firstprop=function(o){
			for (var p in o) {
				if(o.hasOwnProperty(p)){
					return p;
				}
			}
		},
		dimObj2Array=function(thisds, sel, type){
			var
				a=[], i, obj={},
				dim=thisds.dimension,
				di=thisds.id || dim.id, //0.9.2 (JSON-stat 2.0)
				dsize=thisds.size || (dim && dim.size) //0.9.2 (JSON-stat 2.0)
			;

			//Convert [["gender", "T"],["birth", "T"]] into {gender: "T", birth: "T"}
			if(type==="array"){
				for(i=sel.length;i--;){
					obj[sel[i][0]]=sel[i][1];
				}
				sel=obj;
			}

			for (var d=0, len=di.length; d<len; d++){
				var id=di[d], cat=sel[id];
				//If dimension not defined and dim size=1, take first category (user not forced to specify single cat dimensions)
				a.push(typeof cat==="string" ? cat : dsize[d]===1 ? firstprop(dim[id].category.index) : null);
			}

			return a;
		}
	;

	if(this===null || this.class!=="dataset"
		//1.5.1
		|| this.value===null
	){
		return null;
	}

	if(typeof e==="undefined"){
		//Before 0.4.2
		//return {"value" : this.value, "status": this.status, "label": tree.label, "length" : this.value.length};
		//Since 0.4.2: normalized as array of objects
		len=this.value.length;
		for(i=0; i<len; i++){
			ret.push(this.Data(i));
		}
		return ret;
	}

	//Since 0.10.1 status can be excluded. Default: true (=include status)
	if(typeof include!=="boolean"){
		include=true;
	}

	//Data By Position in original array
	if(typeof e==="number"){
		var num=this.value[e];

		if(typeof num==="undefined"){
			return null;
		}

		if(include){
			return { "value" : num, "status": (this.status) ? this.status[e] : null };
		}else{
			return num;
		}
	}

	var
		type="object", //default. If e is an array of arrays, type="array"
		tree=this.__tree__,
		n=tree.size || (tree.dimension && tree.dimension.size), //0.9.2 (JSON-stat 2.0)
		dims=n.length//same as this.length
	;

	if(Array.isArray(e)){
		//DataByPosition in every dim
		//If more positions than needed are provided, they will be ignored.
		//Less positions than needed will return undefined
		if(!Array.isArray(e[0])){
			if(this.length!==e.length){
				return null;
			}
			var
				mult=1,
				res=0,
				miss=[],
				nmiss=[]
			;
			//Validate dim index
			//And loop to find missing dimensions
			for(i=0; i<dims; i++){
				if(typeof e[i]!=="undefined"){
					if(typeof e[i]!=="number" || e[i]>=n[i]){
						return null;
					}
					//Used if normal case (miss.length===0)
					mult*=(i>0) ? n[(dims-i)] : 1;
					res+=mult*e[dims-i-1]; //simplified in 0.4.3
				}else{
					//Used if missing dimensions miss.length>0
					miss.push(i); //missing dims
					nmiss.push(n[i]); //missing dims size
				}
			}

			//If all dims are specified, go ahead as usual.
			//If one non-single dimension is missing create array of results
			//If more than one non-single dimension is missing, WARNING
			if(miss.length>1){
				return null;
			}
			if(miss.length===1){
				for(var c=0, clen=nmiss[0]; c<clen; c++){
					var na=[]; //New array
					for(i=0; i<dims; i++){
						if(i!==miss[0]){
							na.push(e[i]);
						}else{
							na.push(c);
						}
					}
					ret.push(this.Data(na, include));
				}
				return ret;
			}

			if(include){
				return {"value" : this.value[res], "status": (this.status) ? this.status[res] : null};
			}else{
				return this.value[res];
			}

		}else{
			//If array but not array of numbers, array of arrays is assumed
			//[ ["gender", "M"], ["year", "2011"] ]
			type="array";
		}
	}

	//Object { gender: "M", year: "2011" }
	var
		id=dimObj2Array(tree, e, type),
		pos=[],
		otd=tree.dimension,
		otdi=tree.id || otd.id //0.9.2 (JSON-stat 2.0)
	;

	for(i=0, len=id.length; i<len; i++){
		pos.push(otd[otdi[i]].category.index[id[i]]);
	}

	//Dimension cat undefined means a loop (by position) is necessary
	return this.Data(pos, include);
};

/*
	Transformation method: output in DataTable format (array or object)
	Setup: opts={by: null, bylabel: false, meta: false, drop: [], status: false, slabel: "Status", vlabel: "Value", field: "label", content: "label", type: "array"} (type values: "array" / "object" / "arrobj" / "objarr"[1.4.0])
*/
jsonstat.prototype.toTable=function(opts, func){
	if(this===null || this.class!=="dataset"
		//1.5.1
		|| this.value===null
	){
		return null;
	}

	if(arguments.length==1 && typeof opts==="function"){
		func=opts;
		opts=null;
	}

	//default: use label for field names and content instead of "id". "by", "prefix", drop & meta added on 0.13.0 (currently only for "arrobj"/"objarr", "by" cancels "unit"). "comma" is 0.13.2
	opts=opts || {field: "label", content: "label", vlabel: "Value", slabel: "Status", type: "array", status: false, unit: false, by: null, prefix: "", drop: [], meta: false, comma: false, bylabel: false};

	//1.3.0 Backward compatibility: before arrobj had always field=id (now it's the default)
	if((opts.type==="arrobj" || opts.type==="objarr") && typeof(opts.field)==="undefined"){
		opts.field="id";
	}

	var
	 	useid=(opts.field==="id"),
		getVlabel=function(str){ return (useid && "value") || str || "Value"; },
		getSlabel=function(str){ return (useid && "status") || str || "Status"; },
		totbl,
		dataset=this.__tree__,
		i, j, x,
		len,
		status=(opts.status===true) //0.13.1: be as strict as "meta": allow only booleans
	;

	if(typeof func==="function"){
		totbl=this.toTable(opts);
		var
			ret=[],
			start=(opts.type!=="array") ? 0 : 1, //first row is header in array and object
			arr=(opts.type!=="object") ? totbl.slice(start) : totbl.rows.slice(0)
		;

		len=arr.length;
		for(i=0; i<len; i++){
			var a=func.call(
				this, //0.5.3
				arr[i], //Discarded for efficiency: (opts.type!=='object') ? arr[i] : arr[i].c,
				i
			);
			if(typeof a!=="undefined"){
				ret.push(a);
			}
		}
		if(opts.type==='object'){
			return {cols: totbl.cols, rows: ret};
		}
		if(opts.type==='array'){
			ret.unshift(totbl[0]);
		}
		return ret;
	}

	if(opts.type==="arrobj" || opts.type==="objarr"){
		var
			tbl=[],
			//0.12.3
			metric=dataset.role && dataset.role.metric,
			addUnits=function(){},
			metriclabels={},
			//0.13.0 "by" is ignored if it's not an existing dimension ID
			ds=this,
			ids=ds.id,
			by=(opts.by && ids.indexOf(opts.by)!==-1) ? opts.by : null,
			meta=(opts.meta===true),
			drop=(typeof opts.drop!=="undefined" && Array.isArray(opts.drop)) ? opts.drop : [],
			comma=(opts.comma===true),
			bylabel=(opts.bylabel===true),
			ta=ds.value.constructor,
			formatResp=function(arr){
				//1.4.0 columns arrays ("objarr") simple (vs. efficient) implementation: converted from "arrobj"
				//For example: value array in a column array is equal to the original normalized JSON-stat value array
				var
					obj={},
					vlabel=getVlabel(opts.vlabel),
					arrobj2objarr
				;

				if(opts.type==="objarr"){
					arrobj2objarr=
						(by===null && isValidTypedArrayName(ta.name))
						?
						function(e){
							if(e===vlabel){
								obj[e]=ta.from(arr, function(d){
									return d[e];
								});
							}else{
								obj[e]=arr.map(function(d){
									return d[e];
								});
							}
						}
						:
						function(e){
							obj[e]=arr.map(function(d){
								return d[e];
							})
						}
					;

				  Object.keys(arr[0]).forEach(arrobj2objarr);
					arr=obj;
				}

				if(meta){
					var obj={};

					ids.forEach(function(i){
						var d=ds.Dimension(i);

						obj[i]={
							"label": d.label,
							"role": d.role,
							"categories": { //diferent from JSON-stat on purpose: "id" is not "index" and "label" is different than JSON-stat categories' label.
								"id": d.id,
								"label": ds.Dimension(i, false)
							}
						};
					});

					return {
						"meta": {
							"label": ds.label,
							"source": ds.source,
							"updated": ds.updated,

							//0.13.1
							"id": ids,
							"status": status,
							"unit": opts.unit,
							"by": by,
							"bylabel": bylabel,
							"drop": by!==null && drop.length>0 ? drop : null,
							"prefix": by!==null ? (prefix || "") : null,
							//0.13.2
							"comma": comma,

							"dimensions": obj //different from JSON-stat on purpose: the content is different and this export format is addressed to people probably not familiar with the JSON-stat format
						},
						"data": arr
					};
				}else{
					//does nothing
					return arr;
				}
			}
		;

		//1.3.0 If by, opts.fields forced to "id"
		if(by){
			opts.field="id";
		}

		totbl=this.toTable({field: opts.field /* Before 1.3.0 was: "id" */, vlabel: opts.vlabel, slabel: opts.slabel, content: opts.content, status: status});

		var head=totbl.shift();

		//0.12.3 Include unit information if there's any (only if arrobj/objarr and 0.13.0 not "by")
		if(by===null && opts.unit && metric){
			if(opts.content!=="id"){
				for(var m=metric.length; m--;){
					var mdim=this.Dimension(metric[m]);
					metriclabels[metric[m]]={};

					for(var mm=mdim.length; mm--;){
						metriclabels[metric[m]][mdim.Category(mm).label]=mdim.id[mm];
					}
				}
			}

			addUnits=function(d, c){
				//array indexOf
				if(metric.indexOf(d)!==-1){
					var cat=dataset.dimension[d].category;
					/*0.13.9*/
					if(cat.unit){
						tblr.unit=cat.unit[opts.content!=="id" ? metriclabels[d][c] : c];
					}else{
						tblr.unit=null; /*when units requested but missing in the dataset, create "unit" property too*/
					}
				}
			};

			opts.unit=true; //normalized
		}else{
			opts.unit=false;
		}

		len=totbl.length;
		for(i=0; i<len; i++){ //Can't be done with i-- as we want to keep the original order
			var tblr={};
			for(j=totbl[i].length;j--;){
				tblr[head[j]]=totbl[i][j];
				addUnits(head[j], totbl[i][j]); //0.12.3
			}
			tbl.push(tblr);
		}

		//0.13.2
		if(comma){
			tbl.forEach(function(r){
				if(r.value!==null){
					r.value=(""+r.value).replace(".", ",");
				}
			});
		}

		//0.13.0
		//Categories' IDs of "by" dimension will be used as object properties: user can use "prefix" to avoid conflict with non-by dimensions' IDs
		if(by!==null){
			var
				save={},
				arr=[],
				labelid={},
				assignValue,
				prefix=(typeof opts.prefix!=="undefined") ? opts.prefix : ""
			;

			drop.forEach(function(id, i){
				//remove incorrect ids & ids for dimensions with size>1 from the drop array
				if( !ds.Dimension(id) || ds.Dimension(id).length>1 ){
					drop[i]="";
				}
			});

			var
				noby=ids.filter(function(i) {
					return i!==by && drop.indexOf(i)===-1;
				}),
				byDim=ds.Dimension(by),
				setId=function(row, noby){
					var a=[];

					noby.forEach(function(e){
						a.push(row[e]);
					});

					return a.join("\t");
				},
				setObj=function(row, noby){
					var obj={};

					noby.forEach(function(e){
						obj[e]=row[e];
					});

					return obj;
				}
			;

			if(opts.content!=="id"){
				//0.13.3
				if(bylabel){
					assignValue=function(save, id, row){
						save[id][ prefix+row[by] ]=row.value;
					}
				}else{
					byDim.Category().forEach(function(c, i){
						labelid[c.label]=byDim.id[i];
					});

					assignValue=function(save, id, row){
						save[id][ prefix+labelid[row[by]] ]=row.value;
					}
				}
			}else{
				assignValue=function(save, id, row){
					save[id][ prefix+row[by] ]=row.value;
				}
			}

			tbl.forEach(function(row){
				var id=setId(row, noby);

				if(typeof save[id]==="undefined"){
					save[id]=setObj(row, noby);
				}

				//We use a conditionally defined function to avoid an "if" inside the loop.
				assignValue(save, id, row, by);
			});

			for(var prop in save){
				arr.push(save[prop]);
			}

			status=false; //Incompatible with "by"
			return formatResp(arr);
		}

		return formatResp(tbl);
	}

	var
		addCol,
		addColValue,
		addRow,
		addRowValue
	;

	if(opts.type==="object"){
		//Object
		var valuetype=(typeof this.value[0]==="number" || this.value[0]===null) ? "number" : "string"; //cell type inferred from first cell. If null, number is assumed (naif)

		addCol=function(dimid, dimlabel){
			var label=(useid && dimid) || dimlabel || dimid; //if useid then id; else label; then id if not label
			cols.push({id: dimid, label: label, type: "string"}); //currently not using datetime Google type (requires a Date object)
		};

		addColValue=function(str1, str2, status){
			var
				vlabel=getVlabel(str1),
				slabel=getSlabel(str2)
			;
			if(status){
				cols.push({id: "status", label: slabel, type: "string"});
			}
			cols.push({id: "value", label: vlabel, type: valuetype});
		};

		addRow=function(r){
			row.push({v: r});
		};

		addRowValue=function(r){
			//At the moment, no support for formatted values (f: formatted)
			row.push({v: r});
			rows.push({c: row});
		};

	}else{
		//Array
		addCol=function(dimid,dimlabel){
			var colid=(useid && dimid) || dimlabel || dimid; //if useid then id; else label; then id if not label
			cols.push(colid);
		};

		addColValue=function(str1,str2,status){
			var
				vlabel=getVlabel(str1),
				slabel=getSlabel(str2)
			;
			if(status){
				cols.push(slabel);
			}
			cols.push(vlabel);
			table.push(cols);
		};

		addRow=function(r){
			row.push(r);
		};

		addRowValue=function(r){
			row.push(r);
			table.push(row);
		};
	}

	var
		dd=dataset.dimension,
		ddi=dataset.id || dd.id, //0.9.5 (JSON-stat 2.0)
		dds=dataset.size || dd.size, //0.9.5 (JSON-stat 2.0)
		ddil=ddi.length
	;

	if (ddil!=dds.length){
		return false;
	}

	var dim=[], total=1, m=1, mult=[], dimexp=[], label=[], table=[], cols=[], rows=[];

	for (i=0; i<ddil; i++){
		var
			dimid=ddi[i],
			dimlabel=dd[dimid].label
		;

		addCol(dimid,dimlabel); //Global cols

		total*=dds[i];
		m*=dds[i];
		var cat=[];
		for (j=0; j<dds[i]; j++){
			for (var catid in dd[ddi[i]].category.index){
				if (dd[ddi[i]].category.index[catid]===j){
					var rowid=(opts.content!=="id" && dd[ddi[i]].category.label) ? dd[ddi[i]].category.label[catid] : catid; //id if not label (Maybe move label normalization from "dimension" to "dataset"?)
					cat.push(rowid);
				}
			}
		}
		dim.push(cat);
		mult.push(m);
	}
	addColValue(opts.vlabel,opts.slabel,status); //Global cols and table

	//end of inversion: now use dim array
	len=dim.length;
	for (i=0; i<len; i++){
		var catexp=[];
		for (var c=0, len2=dim[i].length; c<len2; c++){
			//get the label repetitions
			for (var n=0; n<total/mult[i]; n++){
				catexp.push(dim[i][c]);
			}
		}
		dimexp.push(catexp);
	}
	len=dimexp.length;
	for (i=0; i<len; i++){
		var l=[], e=0;
		for (x=0; x<total; x++){
			l.push(dimexp[i][e]);
			e++;
			if (e===dimexp[i].length){
				e=0;
			}
		}
		label.push(l);
	}
	for (x=0; x<total; x++){
		var row=[];
		len=dimexp.length;
		for (var d=0; d<len; d++){
			addRow(label[d][x]); //Global row
		}
		if(status){
			addRow(
				(this.status) ? this.status[x] : null
			);
		}
		addRowValue(this.value[x]); //Global row, rows and table
	}

	if(opts.type==="object"){
		return {cols: cols, rows: rows};
	}else{
		return table;
	}
};

jsonstat.prototype.node=function(){
	return this.__tree__;
};

jsonstat.prototype.toString=function(){
	return this.class;
};

export default jsonstat;
