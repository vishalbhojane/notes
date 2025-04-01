```javascript
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('Promise executor must be a function');
    }

    this.state = MyPromise.PENDING;
    this.result = null;
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.FULFILLED;
        this.result = value;
        this.fulfilledCallbacks.forEach((callback) => callback(this.result));
      }
    };

    const reject = (reason) => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.REJECTED;
        this.result = reason;
        this.rejectedCallbacks.forEach((callback) => callback(this.result));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const chainedPromise = new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        setTimeout(() => {
          try {
            const returnedValue = onFulfilled(value);
            MyPromise.resolvePromise(
              chainedPromise,
              returnedValue,
              resolve,
              reject
            );
          } catch (error) {
            reject(error);
          }
        }, 0);
      };

      const handleRejected = (reason) => {
        setTimeout(() => {
          try {
            const returnedValue = onRejected(reason);
            MyPromise.resolvePromise(
              chainedPromise,
              returnedValue,
              resolve,
              reject
            );
          } catch (error) {
            reject(error);
          }
        }, 0);
      };

      if (this.state === MyPromise.FULFILLED) {
        handleFulfilled(this.result);
      } else if (this.state === MyPromise.REJECTED) {
        handleRejected(this.result);
      } else if (this.state === MyPromise.PENDING) {
        this.fulfilledCallbacks.push(handleFulfilled);
        this.rejectedCallbacks.push(handleRejected);
      }
    });

    return chainedPromise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // Helper method to resolve promises
  static resolvePromise(promise, returnedValue, resolve, reject) {
    if (promise === returnedValue) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    if (
      returnedValue &&
      (typeof returnedValue === 'object' || typeof returnedValue === 'function')
    ) {
      let alreadyResolved = false;

      try {
        const thenMethod = returnedValue.then;

        if (typeof thenMethod === 'function') {
          thenMethod.call(
            returnedValue,
            (newValue) => {
              if (alreadyResolved) return;
              alreadyResolved = true;
              MyPromise.resolvePromise(promise, newValue, resolve, reject);
            },
            (rejectionReason) => {
              if (alreadyResolved) return;
              alreadyResolved = true;
              reject(rejectionReason);
            }
          );
        } else {
          resolve(returnedValue);
        }
      } catch (error) {
        if (alreadyResolved) return;
        alreadyResolved = true;
        reject(error);
      }
    } else {
      resolve(returnedValue);
    }
  }
}
```

## Static Methods

### Resolve and Reject

```javascript
MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => {
    resolve(value);
  });
};

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};
```

### All

```javascript
MyPromise.all = function (promiseArray) {
  return new MyPromise((resolve, reject) => {
    const results = [];
    let settledCount = 0;

    if (promiseArray.length === 0) {
      return resolve(results);
    }

    promiseArray.forEach((promise, index) => {
      MyPromise.resolve(promise).then(
        (value) => {
          results[index] = value;
          settledCount++;

          if (settledCount === promiseArray.length) {
            resolve(results);
          }
        },
        (reason) => reject(reason)
      );
    });
  });
};
```

### Race

```javascript
MyPromise.race = function (promiseArray) {
  return new MyPromise((resolve, reject) => {
    if (promiseArray.length === 0) {
      return;
    }

    promiseArray.forEach((promise) => {
      MyPromise.resolve(promise).then(resolve, reject);
    });
  });
};
```

### All Settled

```javascript
MyPromise.allSettled = function (promiseArray) {
  return new MyPromise((resolve, reject) => {
    const results = [];
    let settledCount = 0;

    if (promiseArray.length === 0) {
      return resolve(results);
    }

    promiseArray.forEach((promise, index) => {
      MyPromise.resolve(promise).then(
        (value) => {
          results[index] = {status: 'fulfilled', value};
          settledCount++;

          if (settledCount === promiseArray.length) {
            resolve(results);
          }
        },
        (reason) => {
          results[index] = {status: 'rejected', reason};
          settledCount++;

          if (settledCount === promiseArray.length) {
            resolve(results);
          }
        }
      );
    });
  });
};
```

### Any

```javascript
MyPromise.any = function (promiseArray) {
  return new MyPromise((resolve, reject) => {
    const errors = [];
    let rejectedCount = 0;

    if (promiseArray.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    promiseArray.forEach((promise, index) => {
      MyPromise.resolve(promise).then(
        (value) => {
          resolve(value);
        },
        (error) => {
          errors[index] = error;
          rejectedCount++;

          if (rejectedCount === promiseArray.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        }
      );
    });
  });
};
```
