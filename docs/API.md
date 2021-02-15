# API Reference

> [JSON-stat Javascript Toolkit v.1](https://github.com/jsonstat/toolkit/blob/master/README.md) ▸ **API Reference**

<blockquote>This is the documentation of JSON-stat Javascript Toolkit version 1. Version 0 has a slightly different API and is documented <a href="https://github.com/badosa/JSON-stat/wiki/API-Reference">elsewhere</a>.</blockquote>

## Methods

### By type

<ul>
	<li><strong><a href="#reading">Reading</a></strong>: <a href="#jsonstat">JSONstat()</a></li>
	<li><strong><a href="#traversing">Traversing</a></strong>: <a href="#dataset">Dataset()</a>, <a href="#dimension">Dimension()</a>, <a href="#category">Category()</a>, <a href="#data">Data()</a>, <a href="#item">Item()</a></li>
	<li><strong><a href="#transforming">Transforming</a></strong>: <a href="#totable">toTable()</a>, <a href="#dice">Dice()</a>, <a href="#slice">Slice()</a></li>
</ul>

### By hierarchy

<ul>
	<li><strong><a href="#jsonstat">JSONstat()</a></strong>:</li>
		<ul>
		<li>
			Collection responses: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a>
			<ul>
				<li>
					<strong><a href="#item">Item()</a></strong>: <a href="#class">class</a>, <a href="#href">href</a>, <a href="#label">label</a>, <a href="#extension">extension</a>
				</li>
			</ul>
		</li>
			<li>
				Bundle responses: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#error">error</a>
				<ul>
					<li><strong><a href="#dataset">Dataset()</a></strong>: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>,
					<a href="#label">label</a>, <a href="#n">n</a>, <a href="#size">size</a>, <a href="#value">value</a>, <a href="#status">status</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#role">role</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a>
						<ul>
							<li><strong><a href="#dimension">Dimension()</a></strong>: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#role">role</a>, <a href="#hierarchy">hierarchy</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a>
								<ul>
									<li><strong><a href="#category">Category()</a></strong>: <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#coordinates">coordinates</a>, <a href="#unit">unit</a>, <a href="#note">note</a></li>
								</ul>
							</li>
							<li><strong><a href="#data">Data()</a></strong>: <a href="#value">value</a>, <a href="#status">status</a></li>
							<li><strong><a href="#totable">toTable()</a></strong>
							<li><strong><a href="#dice">Dice()</a></strong>
							<li><strong><a href="#slice">Slice()</a></strong>
						</ul>
					</li>
				</ul>
			</li>
			<li>Dataset responses: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#n">n</a>, <a href="#size">size</a>, <a href="#value">value</a>, <a href="#status">status</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#role">role</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a>
				<ul>
					<li><strong><a href="#dimension">Dimension()</a></strong>: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#role">role</a>, <a href="#hierarchy">hierarchy</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a>
						<ul>
							<li><strong><a href="#category">Category()</a></strong>: <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#coordinates">coordinates</a>, <a href="#unit">unit</a>, <a href="#note">note</a></li>
						</ul>
					</li>
					<li><strong><a href="#data">Data()</a></strong>: <a href="#value">value</a>, <a href="#status">status</a></li>
					<li><strong><a href="#totable">toTable()</a></strong>
					<li><strong><a href="#dice">Dice()</a></strong>
					<li><strong><a href="#slice">Slice()</a></strong>
				</ul>
			</li>
		</ul>
	</li>
</ul>

## Public Properties

<a href="#class">class</a>, <a href="#coordinates">coordinates</a>, <a href="#error">error</a>, <a href="#extension">extension</a>, <a href="#hierarchy">hierarchy</a>, <a href="#href">href</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#length">length</a>, <a href="#link">link</a>, <a href="#n">n</a>, <a href="#size">size</a>, <a href="#note">note</a>, <a href="#role">role</a>, <a href="#size">size</a>, <a href="#source">source</a>, <a href="#status">status</a>, <a href="#unit">unit</a>, <a href="#updated">updated</a>, <a href="#value">value</a>

***

## Reading

### JSONstat()

***
<div><strong>Parent</strong>: none</div>
<div><strong>Description</strong>: Creates a <em>jsonstat</em> instance from an external input in the <a href="https://json-stat.org/format/">JSON-stat format</a></div>
<div><strong>Public Properties</strong>: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#error">error</a>, <a href="#label">label</a>, <a href="#n">n</a>, <a href="#size">size</a>, <a href="#value">value</a>, <a href="#status">status</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#role">role</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a></div>
<div><strong>Summary</strong>: <code><i>object</i> JSONstat ( <i>object</i> or <i>string</i> res [, <i>object</i> init] )</code></div>

***

#### Parameters
##### res (required)
It can be an object in the [JSON-stat format](https://json-stat.org/format/) or the string "version" or a string representing a URL.

When an object is specified, it processes it to build a *jsonstat* instance (the kind of object you need to apply the methods in this documentation).

```js
var j=JSONstat( { ... } );
if( j.length ){
  ...
}else{
  window.alert( "Wrong response!" );
}
```

When the string "version" is specified, the JSON-stat Javascript Toolkit version is returned.

```js
var version=JSONstat("version");
```

When a URL is specified, JSONstat returns a promise that in case of fulfillment will resolve to a *jsonstat* instance.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  if( j.length ){
    ...
  }else{
    window.alert( "Wrong response!" );
  }
});
```

##### init

When **res** is a URL, an options object can be specified containing the settings to apply to the request. See [fetch method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) to know the available properties of **init**.

```js
var
  url="https://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin/tym/tyti/vv/statfin_tyti_pxt_11pl.px",
  query={ "query": [ { "code": "Sukupuoli", "selection": { "filter": "item", "values": [ "SSS" ] } } ], "response": { "format": "json-stat2" } },
  options={
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(query)
  }
;

JSONstat(url, options).then(function( j ) {
  var label=j.label;
});
```

#### Return Value

It returns a string (version), *jsonstat* instance or a *jsonstat* instance promise.

The public properties of the *jsonstat* instance depend on the value of the <a href="#class">class</a> property.

**Common properties:** <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>

**Additional properties when *class* is "collection":** <a href="#label">label</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a>

**Additional properties when *class* is "bundle":** <a href="#error">error</a>

**Additional properties when *class* is "dataset":** <a href="#label">label</a>, <a href="#n">n</a>, <a href="#size">size</a>, <a href="#value">value</a>, <a href="#status">status</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#role">role</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a>

## Traversing

### Dataset()

***
<div><strong>Parent</strong>: <a href="#jsonstat">JSONstat</a></div>
<div><strong>Description</strong>: Gets dataset information from a <em>jsonstat</em> ("bundle", "collection", "dataset") instance</div>
<div><strong>Public Properties</strong>: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#n">n</a>, <a href="#size">size</a>, <a href="#value">value</a>, <a href="#status">status</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#role">role</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a></div>
<div><strong>Summary</strong>: <code><i>object</i> or <i>array</i> Dataset ( [<i>integer</i> or <i>string</i> dsid] )</code></div>

***

#### Parameters
##### dsid
It can be a positive integer (access by index in the datasets [id](#id) array) or a string (access by ID).

#### Return Value

When a valid **dsid** is specified, it returns a *jsonstat* instance. If **dsid** is not valid, a *null* is returned. If **dsid** is not specified, it will return an array of *jsonstat* instances: one for each dataset.

```js
JSONstat( "https://json-stat.org/samples/oecd-canada.json" ).then(function(j) {
  if( j.class==="bundle" ){
    var ds1=j.Dataset( 0 );
  }
});
```

The Dataset method can also be applied to *jsonstat* "collection" instances if they have some embedded dataset:

```js
JSONstat( "https://json-stat.org/samples/oecd-canada-col.json" ).then(function(j) {
  if( j.class==="collection" ){
    var ds1=j.Dataset( 0 );
  }
});
```

For generalization's sake, it can also be applied to *jsonstat* "dataset" instances:

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  if( j.class==="dataset" ){
    window.alert( j===j.Dataset( 0 ) ); //true
  }
});
```

### Dimension()

***
<div><strong>Parent</strong>: <a href="#dataset">Dataset</a></div>
<div><strong>Description</strong>: Gets dimension information from a <em>jsonstat</em> instance</div>
<div><strong>Public Properties</strong>: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#role">role</a>, <a href="#hierarchy">hierarchy</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a></div>
<div><strong>Summary</strong>: <code><i>object</i> or <i>array</i> Dimension ( [<i>integer</i>, <i>string</i> or <i>object</i> dimid] [, <i>boolean</i> instance] )</code></div>

***

#### Parameters
##### dimid
It can be a positive integer (access by index in the dimensions [id](#id) array) or a string (access by ID). If no **dimid** is specified, it will return information for every dimension.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  if( j.class==="dataset" ){
    //Label of the first dimension
    var label1=j.Dimension( 0 ).label;
  }
});
```

It can also be an object in the form <code>{ role : *string* }</code>, where *string* is "time", "geo", "metric" or "classification". This syntax is used to filter dimensions with a particular [role](#role).

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Label of the first dimension with role "geo"
  var geolabel1=j.Dimension( { role : "geo" } )[0].label;
});
```

##### instance
This boolean parameter is only available when **dimid** is specified and alters the return value. By default (*true*), the return value is a *jsonstat* instance (object), an array of *jsonstat* instances or *null*. When a valid **dimid** is specified in combination with **instance** *true*, the return value is an array of category labels for dimension **dimid** or, when **dimid** is an object, an array of arrays (one for each selected dimension) of category labels.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Array of dimension "area" category labels
  var arealabels=j.Dimension( "area", false );
  //Same as: j.Dimension( "area" ).Category().map( function( e ){ return e.label; } )
});
```

#### Return Value

When a valid **dimid** is specified, it returns a *jsonstat* instance. If **dimid** is not valid, a *null* is returned. If **dimid** is not specified, it returns an array of *jsonstat* instances: one for each dimension. If **dimid** is a valid object, it returns an array of *jsonstat* instances: one for each dimension with the selected [role](#role).

### Category()

***
<div><strong>Parent</strong>: <a href="#dimension">Dimension</a></div>
<div><strong>Description</strong>: Gets category information from a <em>jsonstat</em> instance</div>
<div><strong>Public Properties</strong>: <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#coordinates">coordinates</a>, <a href="#unit">unit</a>, <a href="#note">note</a></div>
<div><strong>Summary</strong>: <code><i>object</i> or <i>array</i> Category ( [<i>integer</i> or <i>string</i> catid] )</code></div>

***

#### Parameters
##### catid
It can be a positive integer (access by index in the categories [id](#id) array) or a string (access by ID).

#### Return Value

When a valid **catid** is specified, it returns a *jsonstat* instance. If **catid** is not valid, a *null* is returned. If **catid** is not specified, it will return an array of *jsonstat* instances: one for each category.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Label of category "AU" in dimension "area"
  var AUlabel=j.Dimension( "area" ).Category( "AU" ).label; //"Australia"
});
```

### Data()

***
<div><strong>Parent</strong>: <a href="#dataset">Dataset</a></div>
<div><strong>Description</strong>: Gets data information from a <em>jsonstat</em> instance</div>
<div><strong>Public Properties</strong>: <a href="#value">value</a>, <a href="#status">status</a></div>
<div><strong>Summary</strong>: <code><i>object</i>, <i>array</i>, <i>integer</i> or <i>string</i> Data ( [<i>integer</i>, <i>array</i> or <i>object</i> dataid, <i>boolean</i> status] )</code></div>

***

#### Parameters
##### dataid
It can be a positive integer (by index in the *value* array), an array (by dimensions indices) or an object (by dimensions IDs).

##### status
This boolean parameter determines whether status information is retrieved or not (default is *true*).

#### Return Value

If no parameter is specified, the result is an array of *value-status* objects (one object per datum in the dataset).

If **status** is not specified or is *true*, the return value can be a *value-status* object (that is, an object with two properties: *value* and *status*), an array of *value-status* objects or *null* when **dataid** is not valid.

If **dataid** is an integer, the result is a *value-status* object if **dataid** is a valid index. Otherwise, a *null* is returned.

If **dataid** is an array, the result is a *value-status* object if **dataid** has the correct size (number of dimensions) and valid category indices. Otherwise, a *null* is returned.

If **dataid** is an object, a dimension is ignored if its ID or the ID of its category is invalid. If all dimensions/categories are correctly specified, the result is a *value-status* object. Take into account that constant dimensions (that is, single category dimensions) are not required. Therefore, to get a *value-status* object, you need to validly select a category for all the non-constant dimensions. If you do not validly select a category of a non-constant dimension (from now on, the free dimension), the return value will be an array of *value-status* objects: one for each category in the free dimension (slice). Objects will be ordered in the free dimension category order. If there is more than one free dimension, a *null* will be returned.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Value of the first observation
  var data0=j.Data( 0 ).value;
  //Same as value with the first category in each dimension
  var data000=j.Data( [0, 0, 0] ).value;
  //Value with concept "UNR", area "GR" and year "2014"
  var unrGR2014=j.Data( { "concept" : "UNR", "area" : "GR", "year" : "2014" } ).value;
});
```

If **status** is *false*, *value-status* objects will be replaced by simple values (usually a number; Data() returns whatever was included in the cell by the provider: number, string, *null*...). As a consequence, the return value will be a value, an array of values or *null* when **dataid** is not valid.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Value of the first observation
  var data0=j.Data( 0, false );
  //Same as value with the first category in each dimension
  var data000=j.Data( [0, 0, 0], false );
  //Value with concept "UNR", area "GR" and year "2014"
  var unrGR2014=j.Data(
    { "concept" : "UNR", "area" : "GR", "year" : "2014" },
    false
  );
});
```

It is also possible to use an array of arrays instead of an object.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  var unrGR2014=j.Data(
    [
      ["concept", "UNR"],
      ["area", "GR"],
      ["year", "2014"]
    ]
  );
  //Same as { "concept" : "UNR", "area" : "GR", "year" : "2014" }
});
```

### Item()

***
<div><strong>Parent</strong>: <a href="#jsonstat">JSONstat</a></div>
<div><strong>Description</strong>: Gets item information from a <em>jsonstat</em> instance with class "collection"</div>
<div><strong>Public Properties</strong>: <a href="#class">class</a>, <a href="#href">href</a>, <a href="#label">label</a>, <a href="#extension">extension</a></div>
<div><strong>Summary</strong>: <code><i>object</i> or <i>array</i> Item ( [<i>integer</i> or <i>object</i> itemid] )</code></div>

***

#### Parameters
##### itemid

It can be a positive integer (access to item information by index) or an object.

When **itemid** is an object, it must have a "class" property with a valid <a href="#class">class</a> value.

When the "class" property has "dataset" as its value, the object accepts the boolean property "embedded".

#### Return Value

When a valid **itemid** is specified, it returns an item object (an object with the public properties of Item()). If **itemid** is an integer but out of range, a *null* is returned.

If **itemid** has a "class" property, it will return an array of item objects: those that meet the filter conditions; otherwise, a *null* is returned. When the "class" value is "dataset" and the boolean property "embedded" is specified, it will return an array with the items of class "dataset" that (*true*) are embedded or that (*false*) are not ("href", "label" and "extension" are included in the dataset item).

If the value of the "class" property is not a valid <a href="#class">class</a> value, an empty array is returned.

When **itemid** is not specified, it returns an array of item objects: one for each item.

```js
JSONstat( "https://json-stat.org/samples/collection.json" ).then(function(j) {
  //Get the label of the first item in the collection
  var label1=j.Item( 0 ).label;
});
```

```js
JSONstat( "https://json-stat.org/samples/collection.json" ).then(function(j) {
  //Get the number of items with class "dataset" in the collection
  var dsn=j.Item( { class : "dataset" } ).length;
});
```

```js
JSONstat( "https://json-stat.org/samples/collection.json" ).then(function(j) {
  //Get the number of embedded dataset in the collection (none)
  var dsn=j.Item( { class : "dataset" , embedded: true } ).length;
});
```

## Transforming

### toTable()

***
<div><strong>Parent</strong>: <a href="#dataset">Dataset</a></div>
<div><strong>Description</strong>: Converts information from a <em>jsonstat</em> instance into tabular form</div>
<div><strong>Public Properties</strong>: &mdash;</div>
<div><strong>Summary</strong>: <code><i>object</i> or <i>array</i> toTable ( [<i>object</i> opts, <i>function</i> callback] )</code></div>

***

#### Parameters

##### opts

It is an object with the following optional properties:

* **type**: String (<em>arrobj</em>, *object*, *array*). Default value is *array*. It determines the form of the return value.
* **status**: Boolean. Default value is *false*. It determines whether the status of each value is included in the return value.
* **content**: String (<em>id</em>, *label*). Default value is *label*. It determines whether categories are identified in the return value by label or by ID.
* **field**: String (<em>id</em>, *label*). Default value is *label*. Only available when **type** is *object* or *array*. It determines whether dimensions, value and status are identified in the return value by label or by ID.
* **vlabel**: String. Default value is *Value*. Only available when **type** is *object* or *array*. It determines the label of the value field.
* **slabel**: String. Default value is *Status*. Only available when **type** is *object* or *array* and **status** is *true*. It determines the label of the status field.
* **unit**: Boolean. Default value is *false*. Only available when **type** is *arrobj*. It determines whether unit information is included in the output. When *true*, each object in the array includes a *unit* property with all the unit information attached to a value by the provider. It is assumed that there is only a dimension with role *metric* in the dataset (or at least only one with unit information).
* **meta**: Boolean. Default value is *false*. Only available when **type** is *arrobj*. It determines the structure of the output. By default, *arrobj* returns data as an array of objects. When **meta** is *true*, metadata is included in the output, which takes the form of an object with two properties: "meta" and "data". The latter contains the same array of objects that is returned when **meta** is *false*.
* **by**: String. Only available when **type** is *arrobj*. It must be the ID of an existing dimension; otherwise, it will be ignored. When a valid **by** is specified, a property is created for each category of the **by** dimension (the "value" property is "transposed" by the *by* dimension). When a valid **by** is specified, **status**  and **unit** are ignored.
* **bylabel**: Boolean. Default is *false*. Only available when **type** is *arrobj*. When *true*, the categories of the **by** dimension are identified, once transposed, by their label instead of their ID.
* **prefix**: String. Only available when **type** is *arrobj*. When values are transposed using the **by** option, category IDs end up being used as properties, side by side with dimension IDs. To avoid collision, a prefix can be specified to be added at the beginning of each new property created by the transposition. When no valid **by** has been specified, the **prefix** property is ignored.
* **drop**: Array. Only available when **type** is *arrobj*. This property is used to provide dimension IDs not to be included in the output. Invalid dimension IDs and non  single category dimensions are ignored. When no valid **by** is specified, the **drop** property is ignored.
* **comma**: Boolean. Default value is *false*. Only available when **type** is *arrobj*. When *true*, values are represented as strings instead of numbers with comma as the decimal mark.

```js
JSONstat( "https://json-stat.org/samples/canada.json" ).then(function(j) {
  //Column names (first row)
  //["country", "year", "age group", "concepts", "sex", "Value"]
  var cols=j.toTable( { type : "array" } )[0];
  //IDs instead of labels
  //["country", "year", "age", "concept", "sex", "value"]
  cols=j.toTable( { type : "array", field : "id" } )[0];
  //Labels including status
  //["country", "year", "age group", "concepts", "sex", "Status", "Value"]
  cols=j.toTable( { type : "array", status : true } )[0];
  //Same but naming status as "Metadata" and value as "Data"
  cols=j.toTable( { type : "array", status : true, vlabel : "Data", slabel: "Metadata" } )[0];
  //First data row
  //["Canada", "2012", "total", "population", "total", 34880.5]
  var row1=j.toTable( {type: "array"} )[1];
  //Same including status
  //["Canada", "2012", "total", "population", "total", "a", 34880.5]
  row1=j.toTable( {type: "array", status: true} )[1];
  //Same but IDs instead of labels
  //["CA", "2012", "T", "POP", "T", "a", 34880.5]
  row1=j.toTable( {type: "array", status: true, content: "id"} )[1];
});
```

##### callback

It is a function used to transform the return value.

Even though toTable can expose a table using different structures depending on **type**, it always includes some sort of array for data. **callback** will be invoked for each element of the data array, passing two parameters: the element and its index. The *this* keyword in **callback** is the dataset information as a *jsonstat* instance.

```js
JSONstat( "https://json-stat.org/samples/canada.json" ).then(function(j) {
  //Discard data by age in the resulting table
  j.toTable(
    { type : "arrobj" },
    function( d, i ){
      if( d.age==="total" ){
        return d;
      }
    }
  );
});
```

Filters and transformations in the **callback** must be expressed in terms of the form of the data array, which depends on **opts**. In the previous example, age is filtered using a category label (<em>total</em>) because this is the default value of the **content** option.

```js
JSONstat( "https://json-stat.org/samples/canada.json" ).then(function(j) {
  //Discard data by age in the resulting table.
  //Using categories ID instead of labels.
  j.toTable(
    { type : "arrobj" , content : "id" },
    function( d, i ){
      if( d.age==="T" ){
        return d;
      }
    }
  );
});
```

Take into account that every **type** returns a different form of data array.

```js
JSONstat( "https://json-stat.org/samples/canada.json" ).then(function(j) {
  //As previous example but with type "array"
  //Age is the third dimension (its index is 2)
  j.toTable(
     { type : "array" , content : "id" },
     function( d, i ){
        if( d[2]==="T" ){
           return d;
        }
     }
  );
});
```

```js
JSONstat( "https://json-stat.org/samples/canada.json" ).then(function(j) {
  //As previous example but with type "object"
  //Age is the third dimension (its index is 2)
  j.toTable(
     { type : "object" , content : "id" },
     function( d, i ){
        if( d.c[2].v==="T" ){
           return d;
        }
     }
  );
});
```

The *arrobj* **type** does not return a table header, but *array* and *object* **type** do: **callback** cannot act on the header, only on the data array.

```js
JSONstat( "https://json-stat.org/samples/canada.json" ).then(function(j) {
  //This will not remove the header (row 0 in type "array") but the first data row
  j.toTable(
     { type : "array" },
     function( d, i ){
        if( i ){
           return d;
        }
     }
  );
});
```

Because *array* and *object* **type** includes a header in the result, it is not advisable to change the structure of the data array when using these types: the header will be left untouched and incoherent.

If you need to transform the output deeply use the *arrobj* **type**.

```js
JSONstat( "https://json-stat.org/samples/canada.json" ).then(function(j) {
  //Select only the female population by age group
  //Get an array of objects with only two properties (age and population)
  //Change scale of units
  j.toTable(
     { type : "arrobj", content : "id" },
     function( d ){
        if( d.sex==="F" && d.concept==="POP" ){
           return { age : d.age, population : d.value*1000 };
        }
     }
  );
});
```

#### Return Value

It depends on the **type** specified in the <strong><a href="#opts">opts</a></strong> parameter.

##### <em>arrobj</em> type

Unless **meta** is *true*, it returns an array of objects, where the key is the dimension ID, *value* or *status* (columns) and the value can be the category label or ID.

```json
[
  { "age" : "total", "concept" : "population", "country": "Canada", "sex": "total", "value" : 34880.5, "year" : "2012"},
  { "age" : "total", "concept" : "population", "country": "Canada", "sex": "male", "value" : 17309.1, "year" : "2012"},
  { "age" : "total", "concept" : "population", "country": "Canada", "sex": "female", "value" : 17571.3, "year" : "2012"},
  ...
]
```

When **meta** is *true*, it returns an object of objects:

```json
{
  "meta": {
    "label": "Population by sex and age group. Canada. 2012",
    "source": "Statistics Canada, CANSIM, table 051-0001",
    "updated": "2012-09-27",
    "id": ["country", "year", "age", "concept", "sex"],
    "status": false,
    "unit": false,
    "by": "sex",
    "bylabel": false,
    "drop": ["year", "country"],
    "prefix": "",
    "comma": false,
    "dimensions": {
      "sex": {
        "label": "sex",
        "role": "classification",
        "categories": {
          "id": [ "T", "M", "F"],
          "label": [ "total", "male", "female" ]
        }
      },
      "age": { ... },
      "concept": { ... },
      "country": { ... },
      "year": { ... }
    }
  },

  "data": [
    ...
  ]
}
```

The dimensions included in the "meta.dimensions" property are not affected by the value of the **by** and **drop** options.

##### <em>array</em> type

It returns an array of arrays. The first element in the array contains the column labels or IDs. The next elements can use category labels or IDs.

```json
[
  [ "country", "year", "age group", "concepts", "sex", "Value" ],
  [ "Canada", "2012", "total", "population", "total", 34880.5 ],
  [ "Canada", "2012", "total", "population", "male", 17309.1 ],
  ...
]
```

##### <em>object</em> type

It returns an object of arrays in the [Google DataTable](https://developers.google.com/chart/interactive/docs/reference#dataparam) format.

```json
{
  "cols" : [ ... ],
  "rows" : [ ... ]
}
```

**Warning**: DataTable declares explicitly the type of the values. JSON-stat does not, so this information must be inferred. Generally, it can safely be assumed that values are numbers. Currently, toTable only performs a very naïf test: if the first value is a number (or *null*), it will assign a type of *number*; otherwise, it will assign a type of *string*.


### Dice()

***
<div><strong>Parent</strong>: <a href="#dataset">Dataset</a></div>
<div><strong>Description</strong>: Modifies a <em>jsonstat</em> instance of class "dataset" applying a filter (creates a subset)</div>
<div><strong>Public Properties</strong>: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#n">n</a>, <a href="#size">size</a>, <a href="#value">value</a>, <a href="#status">status</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#role">role</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a></div>
<div><strong>Summary</strong>: <code><i>object</i> Dice ( <i>object</i> or <i>array</i> filter [, <i>boolean</i> clone] )</code></div>

***

#### Parameters

##### filter

This parameter is used to define a subset of the original dataset by keeping only the specified dimension categories. It does not remove any dimension from the original dataset: it only removes categories.

The filter can be specified as an object where properties are dimensions IDs and values are arrays of categories IDs (like in <a href="https://www.npmjs.com/package/jsonstat-euro#filters">JSON-stat for Eurostat</a>) or as an array of arrays (pairs of dimension ID / category IDs)).

```js
{
  "geo": ["AT"],
  "time": ["2017", "2018"]
}
```

```js
[
  ["geo", ["AT"]],
  ["time", ["2017", "2018"]]
]
```

##### clone

The subset is created by modifying the original dataset. This boolean parameter determines whether the original dataset is kept (default is *false*) or modified. To create a new dataset and keep unchanged the original one use *true*.

```js
JSONstat("https://json-stat.org/samples/oecd.json").then(function(js){
  var subset=js.Dice(
    {
      "area": ["AT","CA"],
      "year": ["2010","2011"]
    },
    true
  );
});
```

### Slice()

***
<div><strong>Parent</strong>: <a href="#dataset">Dataset</a></div>
<div><strong>Description</strong>: Modifies a <em>jsonstat</em> instance of class "dataset" applying a filter (creates a subset)</div>
<div><strong>Public Properties</strong>: <a href="#class">class</a>, <a href="#length">length</a>, <a href="#id">id</a>, <a href="#label">label</a>, <a href="#n">n</a>, <a href="#size">size</a>, <a href="#value">value</a>, <a href="#status">status</a>, <a href="#updated">updated</a>, <a href="#source">source</a>, <a href="#role">role</a>, <a href="#note">note</a>, <a href="#href">href</a>, <a href="#link">link</a>, <a href="#extension">extension</a></div>
<div><strong>Summary</strong>: <code><i>object</i> Slice ( <i>object</i> or <i>array</i> filter] )</code></div>

***

Deprecated in version 1.1 (use the more powerful <a href="#dice">Dice()</a> instead.)

#### Parameters

##### filter

This parameter is used to define a subset of the original dataset by freezing one or several dimensions by one of its categories. It does not remove any dimension of the original dataset: it only makes the selected dimensions constant (single category dimensions).

The filter can be specified as an object where properties are dimensions IDs and values are categories IDs or as an array of arrays (pairs of dimension ID / category ID)).

```js
JSONstat("https://json-stat.org/samples/galicia.json").then(function(j){
  var
    subset=j.Slice(
      //Flatten dimensions "birth", "age", "time":
      //Keep only
      //category "T" of dimension "birth"
      //category "T" of dimension "age"
      //category "2011" of dimension "time"
      { "birth": "T", "age": "T", "time": "2011" }
    )
  ;
});
```

```js
JSONstat("https://json-stat.org/samples/galicia.json").then(function(j){
  var
    subset=j.Slice(
      //Flatten dimensions "birth", "age", "time":
      //Keep only
      //category "T" of dimension "birth"
      //category "T" of dimension "age"
      //category "2011" of dimension "time"
     [
       [ "birth", "T" ],
       [ "age", "T" ],
       [ "time", "2011" ]
     ]
    )
  ;
});
```

#### Return Value

It returns a *jsonstat* instance identical to the original one but with some dimensions "flattened". When **filter** is wrong, *null* is returned.

**Warning**: Keep in mind that this is performed by actually modifying the original dataset. If you want to keep it, clone it first.

```js
JSONstat("https://json-stat.org/samples/galicia.json").then(function(j){
  var
    original=JSON.parse( JSON.stringify( j ) ),
    subset=j.Slice(
      { "birth": "T", "age": "T", "time": "2011" }
    ) //j will be modified
  ;
  //Compare original, subset and j
});
```

***

## Public Properties

#### class

Response class. String ("collection", "bundle", "dataset", "dimension").

```js
var
  j=JSONstat( { ... } ),
  datasets=[]
;
switch( j.class ){
  case "collection":
    j.Item( { class : "dataset" , embedded: false } ).forEach( function( e ){
      datasets.push( JSONstat( e.href ) ); //Async. Deprecated.
    });
  break;
  case "bundle":
    datasets=j.Dataset();
  break;
  case "dataset":
    datasets=[j]; //Same as j.Dataset()
  break;
}
```

#### coordinates

Category coordinates if the category dimension has a *geo* [role](#role). Array of two numbers (longitude, latitude). If no coordinates have been provided, a *null* is returned.

#### error

Optional error information. Object. The properties of this object depend on the provider.

#### extension

Collection, dataset, dimension or item extended information. Object. The properties of this object depend on the provider.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  var
    //This dataset contains extended properties
    ext=j.extension,
    //Get e-mail of contact
    email=ext["contact"]
  ;
});
```

#### hierarchy

*true* if there is information about the relationship between the categories in the dimension. Boolean.

```js
JSONstat( "https://json-stat.org/samples/hierarchy.json" ).then(function(j) {
  //First dimension
  var dim=j.Dimension( 0 );
  if( dim.hierarchy ){
    var
      //First category ID
      id=dim.id[0],
      //Array of children's IDs
      ids=dim.Category( 0 ).id
    ;
  }
});
```

#### href

Collection, bundle, dataset or dimension URL.

```js
JSONstat( "https://json-stat.org/samples/collection.json" ).then(function(j) {
  //Get the URL of the first item in the collection
  var href1=j.Item( 0 ).href;
});
```

#### id

Datasets, dimensions, categories, category children or items IDs. Array of strings.

In the case of category children, **id** is an array when the dimension includes hierarchical information and the selected category has children. Otherwise it is *null*.

In the case of items, **id** is an array of URLs.

```js
//This example would work also with https://json-stat.org/samples/oecd.json
JSONstat( "https://json-stat.org/samples/oecd-canada.json" ).then(function(j) {
  if( j.class==="bundle" || j.class==="dataset" ){
    var
      //"OECD" dataset (if class "bundle")
      ds=j.Dataset( "oecd" ),
      //Dimensions IDs of that dataset
      dimids=ds.id,
      //"area" dimension in that dataset
      dim=ds.Dimension( "area" ),
      //Categories IDs of that dimension
      catids=dim.id
    ;
    if( dim.hierarchy ){
      //Category IDs that belong to OECD
      var oecdids=dim.Category( "OECD" ).id;
    }
  }
});
```

#### label

Collection, dataset, dimension, category or item label. String.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Label for "AU" area (Australia)
  var label=j.Dataset( "oecd" ).Dimension( "area" ).Category( "AU" ).label;
});
```

#### length

Number of datasets, dimensions, categories, category children or items. Integer.

You should always check for length>0 before further processing.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  if( j.length ){
    ...
  }else{
    window.alert( "Wrong response!" );
  }
});
```

#### link

Collection, bundle, dataset or dimension links. Object of relation names.

```js
JSONstat( "https://json-stat.org/samples/collection.json" ).then(function(j) {
  //Get info for IANA link relation "item" in a collection http://www.iana.org/assignments/link-relations/link-relations.xhtml
  var items=j.link["item"];
  //Same as j.Item().
});
```

#### n

Number of values in the dataset. Integer. It is the number of cells in the cube, even if they are empty (missing values).

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  window.alert("This dataset has " + String( j.n ) + " observations.");
});
```

#### note

Dataset, dimension, category or collection annotations. Array of strings except category annotations, which are an object of strings.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Display general dataset annotations if available
  var note=j.note;
  if( note ){
    note.forEach( function( e ){
      window.alert( e );
    });
  }
  //Display annotations for Germany if available
  var denote=j.Dimension( "area" ).Category( "DE" ).note;
  if( denote ){
    denote.forEach( function( e ){
      window.alert( e );
    });
  }
});
```

#### role

Dimensions with [role](#role) *time*, *geo*, *metric* or with unspecified role (*classification*). *null* if role information was not included in the response; otherwise, object with four keys (*time*, *geo*, *metric* and *classification*). The value of every key is an array of dimensions IDs (or *null* if no dimension has the specified role).

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Get the name of the first dimension with a "geo" role
  var geo1=j.role.geo[0];
});
```

Dimension role. String (*time*, *geo*, *metric*; otherwise, *classification*) or *null* (when role information not included in the response).

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Role of the "concept" dimension
  var crole=j.Dimension( "concept" ).role;
});
```

#### size

Dimensions sizes. Array.

#### source

Dataset or collection source. String.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Dataset source
  var source=j.source;
});
```

#### status

As a property of a dataset, status of its values. Array or *null*.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  if( j.status ){
    //Status of the 23rd value
    var status23=j.status[22];
  }
});
```

As a property of a datum, status of its value. String or *null* if not provided.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //Status of the 23rd value
  var status23=j.Data( 22 ).status;
});
```

#### unit

Category unit information if the category dimension has a *metric* [role](#role). Object. Except "decimals", "label", "symbol" and "position", the rest of the properties of this object depend on the provider. If no unit information has been provided, a *null* is returned.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //First category in the first dimension with a "metric" role
  var metric1=j.Dimension( { role : "metric" } )[0].Category( 0 );
  if( metric1.unit && metric1.unit.hasOwnProperty( "decimals" ) ){
    //Decimals of the first category in the first dimension with a "metric" role
    var dec=metric1.unit.decimals;
  }
});
```

#### updated

It is the update date of the dataset or collection. String representing a date in an ISO 8601 format recognized by the Javascript Date.parse method.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  if( j.updated ){
    var
      upd=new Date( j.updated ),
      timelapse=Date.now()-upd,
      days=Math.floor( timelapse / ( 1000*60*60*24 ) )
    ;
    window.alert( "This dataset was updated " + String( days ) + " days ago." );
  }
});
```

#### value

As a property of a dataset, dataset values. Array.

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  if( j.value ){
    //23rd value
    var value23=j.value[22];
  }
});
```

As a property of a datum, datum value. Usually a number. Data() returns whatever was included in the cell by the provider (number, string, *null*...).

```js
JSONstat( "https://json-stat.org/samples/oecd.json" ).then(function(j) {
  //23rd value
  var value23=j.Data( 22 ).value; //Same as j.Data( 22, false )
});
```
