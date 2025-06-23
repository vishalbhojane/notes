A Proxy in JavaScript wraps an object and intercepts fundamental operations on that object.

## Basic Syntax

```javascript
let proxy = new Proxy(target, handler);
```

- `target`: The object to wrap
- `handler`: An object containing traps (methods to control target's behavior)

## Simple Example

```javascript
const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

const handler = {
  get(target, property) {
    console.log(`Accessing property: ${property}`);
    return target[property];
  },
};

const proxyUser = new Proxy(user, handler);

console.log(proxyUser.firstName); // Logs: Accessing property: firstName
// Output: John
```

## Common Proxy Traps

### `get` Trap

Intercepts property access:

```javascript
const handler = {
  get(target, property) {
    if (property === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }
    return target[property];
  },
};
```

### `set` Trap

Intercepts property assignment:

```javascript
const handler = {
  set(target, property, value) {
    if (property === 'age') {
      if (typeof value !== 'number' || value < 18) {
        throw new Error('Invalid age');
      }
    }
    target[property] = value;
    return true;
  },
};
```

### `apply` Trap

Intercepts function calls:

```javascript
const getFullNameProxy = new Proxy(
  function (user) {
    return `${user.firstName} ${user.lastName}`;
  },
  {
    apply(target, thisArg, args) {
      return target(...args).toUpperCase();
    },
  }
);
```

## Other Traps

- `has`: Intercepts `in` operator
- `deleteProperty`: Intercepts `delete` operator
- `construct`: Intercepts `new` operator
- `getPrototypeOf`, `setPrototypeOf`: Intercept prototype operations
- `isExtensible`, `preventExtensions`: Intercept object extensibility operations
- `getOwnPropertyDescriptor`: Intercepts `Object.getOwnPropertyDescriptor`

## Use Cases

1. **Validation**: Enforce data constraints
2. **Logging**: Monitor property access and modifications
3. **Security**: Control access to sensitive properties
4. **Memoization**: Cache expensive function results

## Real-world Example: E-commerce Product

```javascript
const product = {
  name: 'Smartphone',
  price: 500,
  quantity: 10,
};

const securedProduct = new Proxy(product, {
  set(target, prop, value) {
    if (prop === 'quantity' && value < 0) {
      throw new Error('Invalid quantity');
    }
    target[prop] = value;
    return true;
  },
});

securedProduct.quantity = 15; // Valid
securedProduct.quantity = -5; // Throws Error: Invalid quantity
```

This example demonstrates how Proxies can enforce business rules in an e-commerce context, ensuring product quantities are never negative.
