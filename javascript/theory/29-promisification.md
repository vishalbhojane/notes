Promisification is the process of converting a callback-based function into a Promise-based one.

## Callback Example

```javascript
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = err => callback(err);

  document.head.append(script);
}

// Usage
loadScript('test.js', (err, script) => {
  if (err) {
    console.log(err);
  } else {
    console.log(script);
  }
});
```

## Promisify Function

```javascript
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback);
      fn.call(this, ...args);
    });
  };
}
```

This `promisify` function:

1. Returns a wrapper function that creates a new Promise.
2. Adds a custom callback to the original function's arguments.
3. Calls the original function with the new arguments.
4. Resolves or rejects the Promise based on the callback's result.

## Usage Examples

### Simple Function

```javascript
const loadScriptPromisified = promisify(loadScript);

loadScriptPromisified('test.js')
  .then(() => console.log('done'))
  .catch(err => console.log(err));
```

### Class Method

```javascript
class Example {
  constructor(a) {
    this.a = a;
  }
  method(b, callback) {
    const result = this.a + b;
    setTimeout(() => callback(null, result), 100);
  }
}

(async () => {
  try {
    const e = new Example(40);
    const promisifiedMethod = promisify(e.method);
    const result = await promisifiedMethod.call(e, 2);
    console.log(result); // Expected output: 42
  } catch (error) {
    console.error(error);
  }
})();
```

In this class method example:

1. We create an instance of `Example`.
2. We promisify its `method`.
3. We use `call` to ensure the correct `this` context when calling the promisified method.
4. We use `await` to handle the Promise's resolution.
