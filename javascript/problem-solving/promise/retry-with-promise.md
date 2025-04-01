Create a function `retryPromise` that takes a function and number of attempts.
It should:

1. Execute the promise-returning function
2. Retry on failure up to specified number of attempts
3. Return result if successful, reject with error if all attempts fail

## Solution

```js
function retryPromise(func, attempts) {
  return func().catch((err) => {
    if (attempts > 0) {
      console.log(`Retrying... (${attempts} attempts left)`);
      return retryPromise(func, attempts - 1);
    } else {
      return Promise.reject(err);
    }
  });
}
```

## Usage

```js
// Success on first try
const successfulPromise = () => Promise.resolve('Success!');
retryPromise(successfulPromise, 3).then(console.log);
// "Success!"

// Success after retries
let attempts = 0;
const eventualSuccess = () => {
  return new Promise((resolve, reject) => {
    attempts++;
    if (attempts < 3) {
      reject(`Attempt ${attempts} failed`);
    } else {
      resolve('Finally succeeded!');
    }
  });
};
retryPromise(eventualSuccess, 3).then(console.log);
// "Retrying... (2 attempts left)"
// "Retrying... (1 attempt left)"
// "Finally succeeded!"

// All attempts fail
const alwaysFails = () => Promise.reject('Failed');
retryPromise(alwaysFails, 2).catch(console.log);
// "Retrying... (1 attempt left)"
// "Retrying... (0 attempts left)"
// "Failed"

// Zero attempts
retryPromise(alwaysFails, 0).catch(console.log);
// "Failed"
```
