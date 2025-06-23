The Event Loop coordinates the Call Stack, Callback Queue, and Web APIs in JavaScript's runtime environment, managing both synchronous and asynchronous operations in a single-threaded context.

## Event Loop Process:

1. Execute code in the Call Stack
2. Check Callback Queue and Microtask Queue
3. Push callbacks to the Call Stack when it's empty

## Example 1: Basic Asynchronous Operations

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
});

console.log('End');

// Output:
// Start
// End
// Promise 1
// Timeout 1
```

Explanation:

1. Synchronous code executes first ('Start' and 'End')
2. Promise (microtask) executes before setTimeout (macrotask)

## Example 2: Nested Async Operations

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => {
    console.log('Promise in Timeout');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
  setTimeout(() => {
    console.log('Timeout in Promise');
  }, 0);
});

console.log('End');

// Output:
// Start
// End
// Promise 1
// Timeout 1
// Promise in Timeout
// Timeout in Promise
```

Explanation:

1. Synchronous code executes
2. Microtasks (Promises) are prioritized in each cycle
3. Macrotasks (setTimeout callbacks) execute after microtasks

## Example 3: Mixing Sync and Async

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);

new Promise(resolve => {
  console.log('Promise executor');
  resolve();
}).then(() => console.log('Promise then'));

console.log('End');

// Output:
// Start
// Promise executor
// End
// Promise then
// Timeout 1
```

Key Points:

- Promise executor runs synchronously
- `then` callbacks are microtasks, executed before the next macrotask
- Understanding this order is crucial for managing complex asynchronous flows
