```javascript
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let completed = 0;

    if (promises.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    promises.forEach((promise) => {
      Promise.resolve(promise).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          errors.push(reason);
          completed++;
          if (completed === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        }
      );
    });
  });
};
```

Usage

```javascript
// One promise resolves
Promise.myAny([
  Promise.reject('Error 1'),
  Promise.resolve('Success'),
  Promise.reject('Error 2'),
]).then(console.log);
// "Success"

// First to resolve wins
Promise.myAny([
  new Promise((res) => setTimeout(() => res('slow'), 200)),
  new Promise((res) => setTimeout(() => res('fast'), 100)),
]).then(console.log);
// "fast"

// All rejected
Promise.myAny([Promise.reject('Error 1'), Promise.reject('Error 2')])
  .then(console.log)
  .catch((e) => {
    console.log(e instanceof AggregateError); // true
    console.log(e.errors); // ['Error 1', 'Error 2']
    console.log(e.message); // "All promises were rejected"
  });

// Empty array
Promise.myAny([]).catch((e) => {
  console.log(e instanceof AggregateError); // true
  console.log(e.errors); // []
  console.log(e.message); // "All promises were rejected"
});

// Mix of sync and async
Promise.myAny([
  new Promise((_, rej) => setTimeout(() => rej('late error'), 200)),
  Promise.resolve('immediate success'),
  Promise.reject('immediate error'),
]).then(console.log);
// "immediate success"
```
