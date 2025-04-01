Create a function `isEmpty` that takes a value.
It should:

1. Check if an array is empty (length 0)
2. Check if an object has no properties
3. Return true if empty, false otherwise

## Solution

```javascript
function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}
```

## Usage

```javascript
// Empty arrays
console.log(isEmpty([])); // true
console.log(isEmpty([1, 2])); // false

// Empty objects
console.log(isEmpty({})); // true
console.log(isEmpty({x: 1})); // false

// Primitives
console.log(isEmpty('')); // false (strings aren't considered)
console.log(isEmpty(0)); // false
console.log(isEmpty(null)); // false
console.log(isEmpty(undefined)); // false

// Nested empty structures
console.log(isEmpty([{}])); // false (array has one item)
console.log(isEmpty({x: []})); // false (object has one key)
```
