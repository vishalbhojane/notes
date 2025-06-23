Create a function `cancellable` that takes a function `func`, parameters `params`, and a delay time.
It should:

1. Schedule the function to execute once after the specified delay
2. Return a cancel function that prevents the execution if called before the delay

```javascript
function cancellable(func, params, delay) {
  const timerId = setTimeout(() => func(...params), delay);

  return function cancel() {
    clearTimeout(timerId);
  };
}
```

Usage

```javascript
// Basic delayed execution
const cancel1 = cancellable(x => console.log(x), [5], 1000);
// After 1s: logs 5

// Cancel before execution
const cancel2 = cancellable(x => console.log(x), [10], 2000);
cancel2(); // Cancels the timeout
// Nothing logged

// Multiple parameters
const cancel3 = cancellable((x, y) => console.log(x + y), [2, 3], 500);
// After 500ms: logs 5

// Zero delay
const cancel4 = cancellable(() => console.log('Instant'), [], 0);
// Logs 'Instant' (next tick)

// Cancel multiple times (safe)
const cancel5 = cancellable(() => console.log('Never'), [], 1000);
cancel5();
cancel5(); // No effect
// Nothing logged
```
