```javascript
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
};
```

Usage

```javascript
// First to resolve wins
Promise.myRace([
  new Promise((res) => setTimeout(() => res('slow'), 200)),
  new Promise((res) => setTimeout(() => res('fast'), 100)),
]).then(console.log);
// "fast"

// First to reject wins
Promise.myRace([
  new Promise((_, rej) => setTimeout(() => rej('fast error'), 100)),
  new Promise((res) => setTimeout(() => res('slow success'), 200)),
]).catch(console.log);
// "fast error"

// Immediate resolution
Promise.myRace([
  Promise.resolve('instant'),
  new Promise((res) => setTimeout(() => res('delayed'), 100)),
]).then(console.log);
// "instant"

// Mix of sync and async
Promise.myRace([
  new Promise((res) => setTimeout(() => res('delayed'), 100)),
  'instant value',
  Promise.reject('instant error'),
]).catch(console.log);
// "instant error"

// Empty array
Promise.myRace([]).then(console.log);
// (never settles)
```
