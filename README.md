# logic-core

logic-core is a lightweight TypeScript/JavaScript utility library that provides core data structures such as collections and localization support. It is framework-agnostic and designed to be used across different environments including browser, Node.js, and bundlers.

- This library provides two main collection types:

- ArrayCollection: A dynamic array with utility methods for element management.

- PropertyCollection: A key-value map-style collection with index-based access.

It also serves as a shared dependency for other logic-* modules.


## 🚀 Installation

To install this package, use one of the following package managers:


```bash
npm install logic-core
# or
yarn add logic-core
```

## 📦 Output Overview

| Target       | File                            | Format | Description                        |
|--------------|----------------------------------|--------|------------------------------------|
| Node (CJS)   | `dist/logic-core.node.cjs`       | CJS    | Node.js-only version, external modules excluded |
| Browser UMD  | `dist/logic-core.js`             | UMD    | Full-featured browser version     |
| Browser UMD  | `dist/logic-core.min.js`         | UMD    | Minified version for CDN          |
| Browser ESM  | `dist/logic-core.esm.js`         | ESM    | Browser-native `import` usage     |
| Browser ESM  | `dist/logic-core.esm.min.js`     | ESM    | Minified version for CDN      |
| Browser CJS  | `dist/logic-core.browser.cjs`    | CJS    | CJS for browser environments       |


## Bundled Output

- CommonJS (CJS): for Node.js environments

- ES Module (ESM): for modern bundlers and browsers

- UMD: for direct usage in browser environments

Example usage in browser:
```html
<script src="https://unpkg.com/logic-core/dist/logic-core.js"></script>
<script>
  const { ArrayCollection } = this._L;
  const list = new ArrayCollection();
  list.add("example");
</script>
```
UMD builds expose a global _L object.


<!-- ## ArrayColleciton 

The ArrayCollection<T> class provides an indexed array-based collection that supports element management such as adding, removing, and clearing items. This class extends the BaseCollection<T>.

### Constructor
```js
constructor(owner?: object);
``` -->
