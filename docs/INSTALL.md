# Installation

> [JSON-stat JavaScript Toolkit](https://github.com/jsonstat/toolkit/blob/master/README.md) ▸ **Installation**

<blockquote>This is the documentation of JSON-stat JavaScript Toolkit (however, note that version 0 has slightly different features and installation procedures that are documented <a href="https://github.com/badosa/JSON-stat/wiki/Installation">elsewhere</a>).</blockquote>

## Browser

### Script tag

Copy the latest version of the [jsonstat-toolkit code](https://raw.githubusercontent.com/jsonstat/toolkit/master/iife.js) to your server and use a script tag in your webpage to link to it. <strong>jsonstat-toolkit</strong> is also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script src="https://unpkg.com/jsonstat-toolkit@2.2.0"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/jsonstat-toolkit@2.2.0"></script>
```

The Toolkit works on any modern browser: it has been developed using ECMAScript 2016 (ES2016), an specification well-supported in major web browsers as of January 2020.

If you need to support older browsers like Internet Explorer 9 (or even older), use version 1.6.0 with polyfills for [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray), [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) and [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach). It is also possible to use the Toolkit connection capabilities on Internt Explorer as long as polyfills for [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) are provided:

```html
<script src="https://cdn.jsdelivr.net/combine/npm/es6-promise@4.2.8,npm/whatwg-fetch@3.0.0"></script>
<script src="https://unpkg.com/jsonstat-toolkit@1.6.0"></script>
```

### ECMAScript module

Modern browsers support ECMAScript modules. Copy the latest version of the [ECMAScript module](https://raw.githubusercontent.com/jsonstat/toolkit/master/import.mjs) to your server and import it in your webpage. The module is also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script type="module">
import JSONstat from "https://unpkg.com/jsonstat-toolkit@2.2.0/import.mjs";
</script>
```

```html
<script type="module">
import JSONstat from "https://cdn.jsdelivr.net/npm/jsonstat-toolkit@2.2.0/import.mjs";
</script>
```

The Toolkit ECMAScript module works on any browser that supports ECMAScript modules (all major browsers released after 2018).

## Node.js

```
$ npm install jsonstat-toolkit
```

The connection capabilities of the JSON-stat JavaScript Toolkit rely on native fetch support. Node.js 21 is recommended because Fetch was officially marked as stable starting with this version. If you need to stick to an older version of Node.js and still want to use the connection capabilities of the JSON-stat JavaScript Toolkit, install version 1.6.0 of the Toolkit (it comes with the [node-fetch](https://www.npmjs.com/package/node-fetch) module included):

```
$ npm install jsonstat-toolkit@1.6.0
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

To use the jsonstat-toolkit in [Observable](https://observablehq.com/) simply import it from @jsonstat/toolkit:

```js
import { JSONstat } from "@jsonstat/toolkit"
```

To import a particular version of the jsonstat-toolkit in [Observable](https://observablehq.com/):

```js
JSONstat = require("jsonstat-toolkit@2.2.0").catch(() => window["JSONstat"])
```
