Tree shaking is an optimization technique that removes unused code from the final bundle during the build process.

## Key Concepts:

1. Eliminates dead code (unused modules or functions).
2. Reduces the size of the application bundle.
3. Relies on ES6 module syntax (import/export).

## How It Works:

1. Build tools like Webpack identify unused code.
2. Minifiers (e.g., UglifyJS) remove the marked dead code.

## Example:

```javascript
// modules.js
export function drive(props) {
  return props.gas;
}

export function fly(props) {
  return props.miles;
}

// main.js
import {drive} from './modules';

const eventHandler = event => {
  event.preventDefault();
  drive({gas: event.target.value});
};
```

In this example, `fly()` is never imported and will be excluded from the bundle.

## Important Points:

- Only works with ES6 module syntax (import/export).
- Doesn't work with CommonJS (require) syntax.
- Applicable to npm dependencies (e.g., `import pick from 'lodash/pick'`).

## Best Practices:

- Use ES6 module syntax consistently.
- Import only what's necessary from libraries.
- Configure build tools to enable tree shaking.
- Use side-effect-free code for better tree shaking results.

## Limitations:

- May not work with dynamic imports or certain coding patterns.
- Requires careful configuration of build tools.
- Some libraries may not be tree-shakable due to their structure.

## Tools:

- Webpack (for marking unused code)
- UglifyJS or Terser (for removing dead code)
- Rollup (build tool with built-in tree shaking)

Remember: While tree shaking is powerful, it's important to verify that the final bundle doesn't exclude necessary code. Always test thoroughly after applying tree shaking optimizations.
