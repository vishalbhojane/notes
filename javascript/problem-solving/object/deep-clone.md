Create a function `deepClone` that takes a value.
It should:

1. Create a deep copy of the input value
2. Handle nested objects and arrays recursively
3. Return new instance with same structure and values

## Solution

```javascript
function deepClone(val) {
  if (!isObject(val)) {
    return val;
  }

  if (Array.isArray(val)) {
    return val.map(deepClone);
  }

  const clone = {};
  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      clone[key] = deepClone(val[key]);
    }
  }

  return clone;
}

function isObject(val) {
  return typeof val === 'object' && val !== null;
}
```

## Usage

```javascript
// Simple object
console.log(deepClone({x: 1, y: 2}));
// {x: 1, y: 2}

// Nested object
console.log(
  deepClone({
    a: 1,
    b: {x: 2, y: 3},
    c: [4, 5],
  })
);
// {a: 1, b: {x: 2, y: 3}, c: [4, 5]}

// Array with nested objects
console.log(deepClone([{id: 1, data: {x: 10}}, {id: {x: 20}}]));
// [{id: 1, data: {x: 10}}, {id:  {x: 20}}]

// Primitives
console.log(deepClone(42)); // 42
console.log(deepClone('hello')); // "hello"
console.log(deepClone(null)); // null
```
