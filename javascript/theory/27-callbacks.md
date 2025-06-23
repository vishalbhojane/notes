A callback is a function passed as an argument to another function, to be executed later based on specific conditions. Callbacks are a fundamental way to handle asynchronous tasks in JavaScript.

## Basic Example

```javascript
console.log('Start');

setTimeout(function () {
  console.log('Callback executed');
}, 1000);

console.log('End');

// Output:
// Start
// End
// Callback executed (after 1 second)
```

## Nested Callbacks Example

```javascript
const cart = ['phone', 'shoes', 'watch'];

api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.updateWallet();
    });
  });
});
```

## Issues with Callbacks

### 1. Callback Hell

Callback hell occurs when multiple nested callbacks create code that is:

- Difficult to read
- Hard to maintain
- Prone to errors

The code grows horizontally instead of vertically, leading to the "pyramid of doom."

### 2. Inversion of Control

When using callbacks, you're handing control of your program execution to another function. This can lead to:

- Loss of control over the execution flow
- Difficulty in understanding what's happening behind the scenes
- Potential for unexpected behaviour if the callback is mishandled

## Best Practices

1. Use meaningful function names for callbacks
2. Keep callbacks small and focused
3. Use error-first callbacks (Node.js style)
4. Consider using Promises or async/await for complex asynchronous operations
5. Modularize your code to avoid deep nesting

## Alternative Approaches

- Promises
- Async/await (built on top of Promises)
- Libraries like `async.js` for managing complex asynchronous flows
