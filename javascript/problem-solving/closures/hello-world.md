Create a function `createHelloWorld` that returns a new function.
It should:

1. Return a function that accepts any arguments
2. Always return the string "Hello World"

## Solution

```javascript
function createHelloWorld() {
  return function (...args) {
    return 'Hello World';
  };
}
```

## Usage

```javascript
const f = createHelloWorld();

console.log(f()); // "Hello World"
console.log(f(1)); // "Hello World"
console.log(f(1, 2, 3)); // "Hello World"
console.log(f('abc')); // "Hello World"

// Different instances return same result
const f2 = createHelloWorld();
console.log(f2()); // "Hello World"
```
