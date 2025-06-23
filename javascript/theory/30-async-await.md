Async/await is a syntax for handling Promises, introduced in ES2017 (ES8).

## Async Functions

The `async` keyword is used to define an asynchronous function.

```javascript
async function simpleAsync() {
  return 'hello';
}

console.log(simpleAsync());
// Output: Promise {<fulfilled>: 'hello'}

simpleAsync().then(data => console.log(data));
// Output: hello
```

Key points:

- An async function always returns a Promise.
- If the function returns a value, it becomes the resolved value of the Promise.
- If no value is returned, the Promise resolves to `undefined`.

## Await Keyword

The `await` keyword can only be used inside an async function. It pauses the execution of the async function until the Promise is settled.

```javascript
function returnPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Promise Executed...');
      resolve('Sample Data');
    }, 3000);
  });
}

async function executeFunction() {
  try {
    console.log('Start');
    const getData = await returnPromise();
    console.log(getData);
    console.log('End');
  } catch (error) {
    console.log(error);
  }
}

executeFunction();
// Output:
// Start
// Promise Executed... (after 3 seconds)
// Sample Data
// End
```

Key points:

- `await` makes the execution wait for the Promise to resolve.
- It can only be used inside an async function.
- It introduces synchronous-like behavior in asynchronous code.

## Error Handling

Use try/catch blocks for error handling in async functions:

```javascript
async function doStuff() {
  try {
    const message = await setTimeoutPromise(100);
    console.log(message);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('finally');
  }
}
```

## Async/Await vs. Promises

Async/await can make asynchronous code look and behave more like synchronous code:

```javascript
// Using Promises
function getValueWithDelay(value, delay) {
  return new Promise(resolve => setTimeout(() => resolve(value), delay));
}

// Using async/await
async function doStuffSequentially() {
  for (let i = 0; i < 10; i++) {
    const value = await getValueWithDelay(i, 250);
    console.log(value);
  }
}

// Using Promises for parallel execution
function doStuffParallel() {
  for (let i = 0; i < 10; i++) {
    getValueWithDelay(i, 250).then(value => console.log(value));
  }
}
```

Key differences:

- Async/await provides a more synchronous-looking code structure.
- Promises can be used for parallel execution more easily.
- Error handling is typically cleaner with async/await (using try/catch).
