```javascript
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        },
        reason => {
          reject(reason);
        }
      );
    });
  });
};
```

Usage

```javascript
// All promises resolve
Promise.myAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(console.log);
// [1, 2, 3]

// Mix of values and promises
Promise.myAll([
  1,
  Promise.resolve(2),
  new Promise(res => setTimeout(() => res(3), 100)),
]).then(console.log);
// [1, 2, 3]

// Empty array
Promise.myAll([]).then(console.log);
// []

// One promise rejects
Promise.myAll([Promise.resolve(1), Promise.reject('Error'), Promise.resolve(3)])
  .then(console.log)
  .catch(console.log);
// "Error"

// Async operations
Promise.myAll([
  new Promise(res => setTimeout(() => res('first'), 200)),
  new Promise(res => setTimeout(() => res('second'), 100)),
]).then(console.log);
// ['first', 'second']
```
