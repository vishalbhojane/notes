```javascript
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = {status: 'fulfilled', value};
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        },
        (reason) => {
          results[index] = {status: 'rejected', reason};
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        }
      );
    });
  });
};
```

Usage

```javascript
// Mix of resolved and rejected
Promise.myAllSettled([
  Promise.resolve(1),
  Promise.reject('Error'),
  Promise.resolve(3),
]).then(console.log);
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'Error' },
//   { status: 'fulfilled', value: 3 }
// ]

// All resolved
Promise.myAllSettled([Promise.resolve('a'), Promise.resolve('b')]).then(
  console.log
);
// [
//   { status: 'fulfilled', value: 'a' },
//   { status: 'fulfilled', value: 'b' }
// ]

// All rejected
Promise.myAllSettled([
  Promise.reject('Error 1'),
  Promise.reject('Error 2'),
]).then(console.log);
// [
//   { status: 'rejected', reason: 'Error 1' },
//   { status: 'rejected', reason: 'Error 2' }
// ]

// Empty array
Promise.myAllSettled([]).then(console.log);
// []

// Async operations
Promise.myAllSettled([
  new Promise((res) => setTimeout(() => res('done'), 100)),
  new Promise((_, rej) => setTimeout(() => rej('failed'), 200)),
]).then(console.log);
// [
//   { status: 'fulfilled', value: 'done' },
//   { status: 'rejected', reason: 'failed' }
// ]
```
