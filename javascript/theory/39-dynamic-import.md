Dynamic imports allow loading modules at runtime instead of during compilation.

## Basic Syntax

```javascript
import('./path-to-module.js')
  .then(module => {
    // Use the module
  })
  .catch(error => console.error('Error loading module:', error));
```

## Key Points

- Returns a Promise
- Allows conditional loading of modules
- Supports computed import paths

## Example Usage

### Module Definition (new-module.js)

```javascript
export const DEFAULT_USERNAME = 'John';
export const getUserId = user => user.id;
export default 'id';
```

### Using the Module (index.js)

```javascript
import('./new-module.js')
  .then(module => {
    console.log(module.DEFAULT_USERNAME); // 'John'
    console.log(module.getUserId({id: 123})); // 123
    console.log(module.default); // 'id'
  })
  .catch(error => console.error('Error:', error));
```

### Using Async/Await

```javascript
async function loadModule() {
  try {
    const {
      DEFAULT_USERNAME,
      getUserId,
      default: defaultExport,
    } = await import('./new-module.js');
    console.log(DEFAULT_USERNAME); // 'John'
    console.log(getUserId({id: 123})); // 123
    console.log(defaultExport); // 'id'
  } catch (error) {
    console.error('Error loading module:', error);
  }
}

loadModule();
```

## Use Cases

### Conditional Imports

```javascript
if (user.role === 'admin') {
  import('./admin-module.js')
    .then(adminModule => {
      adminModule.setupAdminPanel();
    })
    .catch(error => console.error('Error loading admin module:', error));
}
```

### Computed Import Paths

```javascript
const moduleType = 'car';
import(`./${moduleType}-module.js`)
  .then(module => {
    module.initialize();
  })
  .catch(error => console.error('Error loading module:', error));
```

## Advantages

1. **Reduced Initial Bundle Size**: Only load modules when needed.
2. **Improved Performance**: Faster initial page loads.
3. **Better Code Organization**: Separate modules for different features.
4. **Flexibility**: Load modules based on runtime conditions.

## Best Practices

1. Use error handling with try/catch or .catch().
2. Consider using with React.lazy() for component-level code splitting.
3. Use meaningful chunk names for better debugging (webpack).
4. Be cautious with computed paths to avoid security issues.
