Modules help organize code into reusable pieces, and package managers handle dependencies.

## 1. ES Modules (ES6+)

Modern standard for modules in browsers and Node.js (.mjs or "type": "module" in package.json).

### A. Exporting

```javascript
// Named exports
export const name = 'Alice';
export function greet() {
  return 'Hello!';
}

// Default export (one per module)
export default class User {
  /* ... */
}
```

### B. Importing

```javascript
// Named imports
import {name, greet} from './module.js';

// Default import
import User from './user.js';

// Renaming imports
import {greet as sayHello} from './module.js';

// Import all
import * as utils from './utils.js';
```

**Browser Usage:**

```html
<script type="module" src="app.js"></script>
```

## 2. CommonJS (Node.js Legacy)

Used in older Node.js projects (require/module.exports).

### A. Exporting

```javascript
// Named exports
exports.name = 'Alice';
exports.greet = function () {
  return 'Hello!';
};

// Default export
module.exports = class User {
  /* ... */
};
```

### B. Importing

```javascript
const {name, greet} = require('./module');
const User = require('./user');
```

## 3. npm and package.json

npm (Node Package Manager) manages dependencies.

### Key package.json Fields

| Field               | Purpose             | Example                  |
| ------------------- | ------------------- | ------------------------ |
| `"name"`            | Package name        | `"my-app"`               |
| `"version"`         | Semantic version    | `"1.0.0"`                |
| `"main"`            | Entry file          | `"index.js"`             |
| `"scripts"`         | Custom commands     | `"start": "node app.js"` |
| `"dependencies"`    | Production packages | `"lodash": "^4.17.21"`   |
| `"devDependencies"` | Development tools   | `"webpack": "^5.0.0"`    |

### Common npm Commands

```bash
npm init -y          # Creates package.json
npm install lodash   # Adds to dependencies
npm install -D webpack # Adds to devDependencies
npm update           # Updates packages
npm uninstall lodash # Removes a package
```

## 4. Dependencies Management

| Dependency Type | Description                         | Example                  |
| --------------- | ----------------------------------- | ------------------------ |
| Production      | Needed for runtime                  | `npm install express`    |
| Development     | Needed for builds/tests             | `npm install -D jest`    |
| Peer            | Expected to be provided by the host | `react in libraries`     |
| Optional        | Fail silently if missing            | `npm install --optional` |

**Versioning Syntax:**

- ^1.2.3 → Updates for minor/patch versions (1.x.x)
- ~1.2.3 → Updates for patch versions (1.2.x)
- 1.2.3 → Exact version

## 5. Bundlers (Webpack, Rollup, Vite)

Convert modules into browser-ready bundles.

### A. Webpack

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader'},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
    ],
  },
};
```

### B. Rollup

```javascript
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    /* ... */
  ],
};
```

**Why Use a Bundler?**

- Combines modules into a single file
- Supports older browsers (via Babel)
- Optimizes assets (minification, tree-shaking)

## 6. Module Patterns

### A. IIFE (Immediately Invoked Function Expression)

```javascript
const module = (function () {
  let privateVar = 0;
  return {
    increment: () => privateVar++,
    getCount: () => privateVar,
  };
})();
```

### B. Revealing Module Pattern

```javascript
const counter = (function () {
  let count = 0;
  function increment() {
    count++;
  }
  function get() {
    return count;
  }
  return {increment, get}; // Expose only these
})();
```

### C. Singleton

```javascript
class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = this;
    }
    return Database.instance;
  }
}
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true
```
