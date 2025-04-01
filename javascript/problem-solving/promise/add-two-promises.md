Create a function `addTwoPromises` that takes two promises that resolve to numbers.
It should:

1. Wait for both promises to resolve
2. Return a promise that resolves to their sum

## Solution

```javascript
async function addTwoPromises(promise1, promise2) {
  const [value1, value2] = await Promise.all([promise1, promise2]);
  return value1 + value2;
}
```

## Usage

```javascript
// Basic addition
addTwoPromises(Promise.resolve(2), Promise.resolve(3)).then(console.log);
// 5

// Different resolution times
addTwoPromises(
  new Promise((res) => setTimeout(() => res(10), 100)),
  new Promise((res) => setTimeout(() => res(20), 200))
).then(console.log);
// 30

// Mix of sync and async
addTwoPromises(
  Promise.resolve(5),
  new Promise((res) => setTimeout(() => res(7), 100))
).then(console.log);
// 12

// Zero values
addTwoPromises(Promise.resolve(0), Promise.resolve(0)).then(console.log);
// 0

// Error handling
addTwoPromises(Promise.resolve(1), Promise.reject('Error')).catch(console.log);
// "Error"
```
