Create a function `compactObject` that takes a value.
It should:

1. Remove all falsy values (false, null, 0, "", undefined, NaN)
2. Work recursively for nested objects and arrays
3. Return cleaned object/array with only truthy values

## Solution

```javascript
function compactObject(val) {
  if (!isObject(val)) {
    return val;
  }

  if (Array.isArray(val)) {
    return val.filter(Boolean).map(compactObject);
  }

  const cleaned = {};
  for (const key in val) {
    const item = compactObject(val[key]);
    if (Boolean(item)) {
      cleaned[key] = item;
    }
  }
  return cleaned;
}

function isObject(val) {
  return typeof val === 'object' && val !== null;
}
```

## Usage

```javascript
// Basic object
console.log(compactObject({a: null, b: false, c: 1}));
// {c: 1}

// Nested object
console.log(
  compactObject({
    a: null,
    b: {x: null, y: 2},
    c: 3,
  })
);
// {b: {y: 2}, c: 3}

// Array
console.log(compactObject([null, 0, false, 1]));
// [1]

// Mixed nested structure
console.log(
  compactObject({
    a: [null, 1, false],
    b: {x: null, y: 2},
    c: true,
  })
);
// {a: [1], b: {y: 2}, c: true}

// Empty cases
console.log(compactObject({})); // {}
console.log(compactObject([])); // []
```
