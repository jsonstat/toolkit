# Installation

> [JSON-stat Javascript Toolkit v.1](https://github.com/jsonstat/toolkit/blob/master/README.md) ▸ **Installation**

<blockquote>This is the documentation of JSON-stat Javascript Toolkit version 1. Version 0 has slightly different features and installation procedures that are documented <a href="https://github.com/badosa/JSON-stat/wiki/Installation">elsewhere</a>.</blockquote>

## Browser

### Script tag

Copy the latest version of the [jsonstat-toolkit code](https://raw.githubusercontent.com/jsonstat/toolkit/master/iife.js) to your server and use a script tag in your webpage to link to it. <strong>jsonstat-toolkit</strong> is also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script src="https://unpkg.com/jsonstat-toolkit@1.3.1"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/jsonstat-toolkit@1.3.1"></script>
```

The Toolkit works on any modern browser. It also supports Internet Explorer 9 or higher as long as its connection capabilities (*JSONstat(url).then(func)*) are not used (and even older Internet Explorer versions as long as an [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) polyfill is provided). It is also possible to use the Toolkit connection capabilities on Internt Explorer as long as polyfills for [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) are provided:

```html
<script src="https://cdn.jsdelivr.net/combine/npm/es6-promise@4.2.8,npm/whatwg-fetch@3.0.0"></script>
<script src="https://unpkg.com/jsonstat-toolkit@1.3.1"></script>
```

### ECMAScript module

Very modern browsers support ECMAScript modules. Copy the latest version of the [ECMAScript module](https://raw.githubusercontent.com/jsonstat/toolkit/master/import.mjs) to your server and import it in your webpage. The module is also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script type="module">
import JSONstat from "https://unpkg.com/jsonstat-toolkit@1.3.1/import.mjs";
</script>
```

```html
<script type="module">
import JSONstat from "https://cdn.jsdelivr.net/npm/jsonstat-toolkit@1.3.1/import.mjs";
</script>
```

The Toolkit ECMAScript module works on any browser that support ECMAScript modules.

## Node.js

```
$ npm install jsonstat-toolkit
```

#### CommonJS

```js
const JSONstat = require("jsonstat-toolkit");
```

#### ES Module

```js
import JSONstat from "jsonstat-toolkit";
```

## Observable

The safest way to load the jsonstat-toolkit in [Observable](https://observablehq.com/) is:

```js
JSONstat = require('jsonstat-toolkit@1.3.1').catch(() => window["JSONstat"])
```
