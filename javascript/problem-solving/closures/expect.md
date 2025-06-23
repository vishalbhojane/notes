Create a function `expect` that takes a value and returns an assertion object.
It should:

1. Have a `toBe` method that checks if value equals target
2. Have a `notToBe` method that checks if value differs from target
3. Throw appropriate error messages for failed assertions

## Solution

```javascript
function expect(value) {
  return {
    toBe: target => {
      if (value === target) return true;
      throw new Error('Not Equal');
    },
    notToBe: target => {
      if (value !== target) return true;
      throw new Error('Equal');
    },
  };
}
```

## Usage

```javascript
// Basic equality checks
console.log(expect(5).toBe(5)); // true
console.log(expect(5).notToBe(10)); // true

// Error cases
try {
  expect(5).toBe(10);
} catch (e) {
  console.log(e.message); // "Not Equal"
}

try {
  expect(5).notToBe(5);
} catch (e) {
  console.log(e.message); // "Equal"
}

// Works with different types
console.log(expect('hello').toBe('hello')); // true
console.log(expect(null).notToBe(undefined)); // true
```
