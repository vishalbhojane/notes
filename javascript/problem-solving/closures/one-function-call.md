Create a function `once` that takes a function as an argument.
It should:

1. Return a new function that executes the input function only once
2. Ignore subsequent calls and return undefined after first execution

## Solution

```javascript
function once(func) {
  let hasRun = false;

  return function (...params) {
    if (!hasRun) {
      hasRun = true;
      let output = func(...params);
      return output;
    }
  };
}
```

## Usage

```javascript
// Example function to be called once
const add = (a, b) => a + b;
const onceAdd = once(add);

console.log(onceAdd(2, 3)); // 5
console.log(onceAdd(5, 7)); // undefined
console.log(onceAdd(1, 1)); // undefined

// With different function
const log = (msg) => `Logged: ${msg}`;
const onceLog = once(log);

console.log(onceLog('first')); // "Logged: first"
console.log(onceLog('second')); // undefined

// New instance resets the "once" behavior
const anotherOnceAdd = once(add);
console.log(anotherOnceAdd(1, 1)); // 2
```
