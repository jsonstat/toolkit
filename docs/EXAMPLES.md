# Examples

> [JSON-stat JavaScript Toolkit](https://github.com/jsonstat/toolkit/blob/master/README.md) ▸ **Examples**

<ul>
  <li><a href="#jsonstatcom-examples-repository">JSONstat.com Examples Repository</a></li>
  <li><a href="#observable-notebooks">Observable Notebooks</a></li>
  <li><a href="#differences-between-version-0-and-version0">Differences between version 0 and version&gt;0</a></li>
</ul>

## JSONstat.com Examples Repository

* [jsonstat-toolkit examples](https://jsonstat.com/examples/?lib=tlkt)

## Observable Notebooks

* [Introduction to the JSONSTAT-TOOLKIT](https://observablehq.com/@jsonstat/toolkit)
* [Fetching Official Statistics in Observable Notebooks... Worldwide](https://observablehq.com/@jsonstat/fetch)
* [Avoiding JSON-stat semantics: The JSONSTAT-TOOLKIT Transform Method](https://observablehq.com/@jsonstat/transform)
* [Bringing Data and Metadata Together: The JSONSTAT-TOOLKIT Unflatten Method](https://observablehq.com/@jsonstat/unflatten)
* [JSON-stat Empty Datasets](https://observablehq.com/@jsonstat/emptydatasets)
* [Renewable Energy in Europe](https://observablehq.com/@jsonstat/energy)

## Differences between version 0 and version>0

### Retrieving JJT's version

#### Version 0

```js
var version=JSONstat.version;
```

#### Version 1

```js
var version=JSONstat("version");
```

### Doing a GET request

#### Version 0

```js
JSONstat(url, main);

function main(){
  //"this" contains the jsonstat instance of the retrieved JSON
  var ds=this.Dataset(0);
  ...
}
```

#### Version 1

```js
JSONstat(url).then(main);

function main(j){
  var ds=j.Dataset(0);
  ...
}
```

### Doing a POST request

#### Version 0

Not supported.

#### Version 1

```js
var options={
  method: "POST",
  body: JSON.stringify(query)
};

JSONstat(url, options).then(main);

function main(j){
  var ds=j.Dataset(0);
  ...
}
```

### ECMAScript Module

#### Version 0

```html
<script type="module">
  import { JSONstat } from "https://unpkg.com/jsonstat@0.13.13/export.mjs";
  //or https://cdn.jsdelivr.net/npm/jsonstat@0.13.13/export.mjs
  ...
</script>  
```

#### Version 1

```html
<script type="module">
   import JSONstat from "https://unpkg.com/jsonstat-toolkit@1.0.8/import.mjs";
   //or https://cdn.jsdelivr.net/npm/jsonstat-toolkit@1.0.8/import.mjs
  ...
</script>  
```


### IE Support for JSONstat requests

#### Version 0

```html
<script src="https://unpkg.com/jsonstat@0.13.13"></script>
<!-- Or https://cdn.jsdelivr.net/npm/jsonstat@0.13.13 -->

<script>
  var url="...";

  JSONstat(url, main);

  function main(){
    var ds=this.Dataset(0);
    ...
  }
</script>
```

#### Version 1

```html
<!-- Using JSONstat XHR capabilities require Promises and Fetch support -->
<script src="https://cdn.jsdelivr.net/combine/npm/es6-promise@4.2.8,npm/whatwg-fetch@3.0.0"></script>
<!-- End of polyfilling -->

<script src="https://unpkg.com/jsonstat-toolkit@1.0.8"></script>
<!-- Or https://cdn.jsdelivr.net/npm/jsonstat-toolkit@1.0.8 -->

<script>
  var url="...";

  JSONstat(url).then(main);

  function main(j){
    var ds=j.Dataset(0);
    ...
  }
</script>
```
