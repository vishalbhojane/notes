Create a function `createCounter` that takes an initial value and returns a counter object.
It should return an object with three methods:

1. `increment()`: increases count by 1
2. `decrement()`: decreases count by 1
3. `reset()`: restores count to initial value

## Solution

```javascript
function createCounter(init) {
  let count = init;

  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    reset() {
      count = init;
      return count;
    },
  };
}
```

## Usage

```javascript
const counter = createCounter(5);

console.log(counter.increment()); // 6
console.log(counter.increment()); // 7
console.log(counter.decrement()); // 6
console.log(counter.reset()); // 5

// New counter instance starts fresh
const counter2 = createCounter(0);
console.log(counter2.increment()); // 1
console.log(counter2.decrement()); // 0
console.log(counter2.reset()); // 0

// Original counter maintains separate state
console.log(counter.increment()); // 6
```
