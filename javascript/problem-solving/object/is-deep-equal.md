Create a function `isDeepEqual` that takes two values.
It should:

1. Compare values deeply for equality
2. Check nested objects and arrays recursively
3. Return true if values are identical in structure and content

## Solution

```javascript
function isDeepEqual(left, right) {
  if (left === right) {
    return true;
  }

  if (!isObject(left) || !isObject(right)) {
    return false;
  }

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (const key of leftKeys) {
    if (!rightKeys.includes(key) || !isDeepEqual(left[key], right[key])) {
      return false;
    }
  }

  return true;
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}
```

## Usage

```javascript
// Simple objects
console.log(isDeepEqual({a: 1, b: 2}, {a: 1, b: 2})); // true

console.log(isDeepEqual({a: 1, b: 2}, {b: 2, a: 1})); // true (order doesn't matter)

// Nested objects
console.log(isDeepEqual({a: {x: 1}, b: {y: 2}}, {a: {x: 1}, b: {y: 2}})); // true

// Arrays
console.log(isDeepEqual([1, {x: 2}], [1, {x: 2}])); // true

// Different values
console.log(isDeepEqual({a: 1, b: 2}, {a: 1, b: 3})); // false

// Different structure
console.log(isDeepEqual({a: {x: 1}}, {a: 1})); // false

// Primitives
console.log(isDeepEqual(42, 42)); // true
console.log(isDeepEqual('hello', 'hello')); // true
console.log(isDeepEqual(null, null)); // true
```
