# Examples

> [JSON-stat Javascript Toolkit v.1](https://github.com/jsonstat/toolkit/blob/master/README.md) ▸ **Examples**

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

## IE Support for JSONstat requests

Example: [JJT v1: GET request](https://bl.ocks.org/badosa/ddd1b3783800dffa9cf7426f6042cc83)

