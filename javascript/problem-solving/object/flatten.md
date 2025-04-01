Create a function `flattenObject` that takes an object.
It should:

1. Convert nested object into flat object with dot notation paths
2. Handle multiple levels of nesting
3. Return new flattened object with combined path keys

## Solution

```javascript
function flattenObject(obj, parent = '') {
  const flat = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const path = parent ? `${parent}.${key}` : key;

      if (isObject(obj[key])) {
        Object.assign(flat, flattenObject(obj[key], path));
      } else {
        flat[path] = obj[key];
      }
    }
  }

  return flat;
}

function isObject(val) {
  return typeof val === 'object' && val !== null;
}
```

## Usage

```javascript
// Simple object
console.log(
  flattenObject({
    a: 1,
    b: 2,
  })
);
// {a: 1, b: 2}

// Nested object
console.log(
  flattenObject({
    a: {
      b: {
        c: 1,
        d: 2,
      },
      e: 3,
    },
    f: 4,
  })
);
// {'a.b.c': 1, 'a.b.d': 2, 'a.e': 3, f: 4}

// Mixed values
console.log(
  flattenObject({
    name: {
      first: 'John',
      last: 'Doe',
    },
    age: 30,
    address: {
      street: {
        number: 123,
        name: 'Main St',
      },
    },
  })
);
// {
//   'name.first': 'John',
//   'name.last': 'Doe',
//   'age': 30,
//   'address.street.number': 123,
//   'address.street.name': 'Main St'
// }
```
