Create a function `timeLimit` that takes a function and a delay time.
It should:

1. Return a new function that executes with a time limit
2. Resolve with the function's result if completed within time limit
3. Reject with "Time Limit Exceeded" if time limit is reached

## Solution

```javascript
function timeLimit(func, delay) {
  return async function (...params) {
    return Promise.race([
      func(...params),
      new Promise((_, reject) =>
        setTimeout(() => reject('Time Limit Exceeded'), delay)
      ),
    ]);
  };
}
```

## Usage

```javascript
// Completes within time limit
const success = timeLimit(async () => {
  await new Promise((res) => setTimeout(res, 100));
  return 'Success';
}, 200);

success().then(console.log);
// "Success"

// Exceeds time limit
const fail = timeLimit(async () => {
  await new Promise((res) => setTimeout(res, 200));
  return 'Never seen';
}, 100);

fail().catch(console.log);
// "Time Limit Exceeded"

// Immediate resolution
const instant = timeLimit(async () => 'Done', 1000);
instant().then(console.log);
// "Done"

// With parameters
const delayed = timeLimit(async (a, b) => {
  await new Promise((res) => setTimeout(res, 50));
  return a + b;
}, 100);

delayed(2, 3).then(console.log);
// 5
```
