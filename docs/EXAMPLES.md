# Examples

> [JSON-stat Javascript Toolkit v.1](https://github.com/jsonstat/toolkit/blob/master/README.md) ▸ **Examples**

<ul>
  <li><a href="#differences-between-version-0-and-version-1">Differences between version 0 and version 1</a>
    <ul>
      <li><a href="#retrieving-jjts-version">Retrieving JJT's version</a></li>
      <li><a href="#doing-a-get-request">Doing a GET request</a></li>
      <li><a href="#doing-a-post-request">Doing a POST request</a></li>
    </ul>
  </li>
  <li><a href="#ecmascript-module">ECMAScript Module</a></li>
  <li><a href="#ie-support-for-jsonstat-requests">IE Support for JSONstat requests</a></li>
</ul>

## Differences between version 0 and version 1

### Retrieving JJT's version

Example: [JJT v1 vs v0 "version"](https://bl.ocks.org/badosa/73097b82e22f1b06522b4437b1112878)

#### Version 0

```js
var version=JSONstat.version;
```

#### Version 1

```js
var version=JSONstat("version");
```

### Doing a GET request

Example: [JJT v1: GET request](https://bl.ocks.org/badosa/ddd1b3783800dffa9cf7426f6042cc83)

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

Example: [JJT v1: POST request](https://bl.ocks.org/badosa/9aecb97692d743eff6734e3a34fbc4e9)

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

## ECMAScript Module

Example: [JJT v1: ECMAScript module](https://bl.ocks.org/badosa/c1feb27bd8214de60f430379424e12fa)

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


## IE Support for JSONstat requests

Example: [JJT v1: GET request](https://bl.ocks.org/badosa/ddd1b3783800dffa9cf7426f6042cc83)

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
