Create a function `createCounter` that takes an initial value.
It should:

1. Return a function that returns the current count
2. Increment the count after each call

## Solution

```javascript
function createCounter(init) {
  let count = init;
  return function () {
    return count++;
  };
}
```

## Usage

```javascript
const counter = createCounter(5);

console.log(counter()); // 5
console.log(counter()); // 6
console.log(counter()); // 7

// New counter instance starts fresh
const counter2 = createCounter(0);
console.log(counter2()); // 0
console.log(counter2()); // 1

// Original counter continues from last value
console.log(counter()); // 8
```
