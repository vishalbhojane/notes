Create a function `cancellable` that takes a function `func`, parameters `params`, and a delay time.
It should:

1. Execute the function immediately with given parameters
2. Continue executing the function at regular intervals specified by delay
3. Return a cancel function that stops the repeated execution

```javascript
function cancellable(func, params, delay) {
  func(...params);
  const timerId = setInterval(() => func(...params), delay);

  return function cancel() {
    clearInterval(timerId);
  };
}
```

Usage

```javascript
// Basic repeated execution
const cancel1 = cancellable(x => console.log(x), [5], 1000);
// Immediately: logs 5
// Every 1s: logs 5
cancel1(); // Stops after some time

// Multiple parameters
const cancel2 = cancellable((x, y) => console.log(x + y), [2, 3], 500);
// Immediately: logs 5
// Every 500ms: logs 5
setTimeout(() => cancel2(), 2000); // Stops after 2s

// With state
let count = 0;
const cancel3 = cancellable(() => console.log(++count), [], 1000);
// Immediately: logs 1
// Every 1s: logs 2, 3, 4...
setTimeout(() => cancel3(), 3500); // Stops after 3.5s

// Zero delay
const cancel4 = cancellable(() => console.log('Rapid'), [], 0);
// Logs 'Rapid' very rapidly
setTimeout(() => cancel4(), 100); // Stops after 100ms
```
