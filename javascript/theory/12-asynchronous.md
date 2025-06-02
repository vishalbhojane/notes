Asynchronous programming allows JavaScript to perform non-blocking operations (e.g., API calls, file reading).

## 1. Callbacks

A function passed as an argument to another function, executed later.

**Example:**

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('Data received!');
  }, 1000);
}

fetchData((data) => {
  console.log(data); // "Data received!" (after 1 second)
});
```

**Drawbacks:**

- ❌ Callback Hell (Nested callbacks become unreadable)
- ❌ Hard error handling

## 2. Promises

An object representing the eventual completion (or failure) of an async operation.

### States of a Promise

- Pending → Initial state
- Fulfilled → Operation succeeded (.then() runs)
- Rejected → Operation failed (.catch() runs)

**Syntax:**

```javascript
const promise = new Promise((resolve, reject) => {
  if (success) resolve(value);
  else reject(error);
});

promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log('Done!'));
```

**Example (Fetching Data):**

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data loaded!');
    }, 1000);
  });
}

fetchData()
  .then((data) => console.log(data)) // "Data loaded!"
  .catch((err) => console.error(err));
```

### Promise APIs

These methods help manage multiple promises efficiently.

#### 1. Promise.all()

**Purpose:** Waits for all promises to resolve or any one to reject.
**Use Case:** Parallel API calls where all must succeed.

**Syntax:**

```javascript
Promise.all([promise1, promise2, ...])
  .then((results) => console.log(results))
  .catch((error) => console.error(error));
```

**Example:**

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject('Error');

Promise.all([p1, p2])
  .then((values) => console.log(values)) // [1, 2]
  .catch((err) => console.error(err)); // Skipped (all resolved)

Promise.all([p1, p2, p3])
  .then((values) => console.log(values))
  .catch((err) => console.error(err)); // "Error" (fails fast)
```

**Key Behavior:**

- Fails immediately if any promise rejects
- Returns array of results in order if all succeed

#### 2. Promise.allSettled()

**Purpose:** Waits for all promises to complete (resolve or reject).
**Use Case:** When you need all results, even if some fail.

**Syntax:**

```javascript
Promise.allSettled([promise1, promise2, ...])
  .then((results) => console.log(results));
```

**Example:**

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.reject('Error');

Promise.allSettled([p1, p2]).then((results) => console.log(results));

// Output:
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "Error" }
// ]
```

**Key Behavior:**

- Never fails (no .catch needed)
- Returns status + value/reason for each promise

#### 3. Promise.race()

**Purpose:** Returns the first settled promise (resolve or reject).
**Use Case:** Timeouts or fastest response wins.

**Syntax:**

```javascript
Promise.race([promise1, promise2, ...])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

**Example:**

```javascript
const fast = new Promise((res) => setTimeout(() => res('Fast'), 500));
const slow = new Promise((res) => setTimeout(() => res('Slow'), 1000));

Promise.race([fast, slow]).then((result) => console.log(result)); // "Fast" (wins the race)
```

**Key Behavior:**

- Returns the first settled promise (even if rejected)
- Use for timeouts:

```javascript
const apiCall = fetch('https://api.example.com/data');
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject('Timeout!'), 3000)
);

Promise.race([apiCall, timeout])
  .then((data) => console.log(data))
  .catch((err) => console.error(err)); // Fails if timeout wins
```

#### 4. Promise.any()

**Purpose:** Returns the first resolved promise (ignores rejections unless all fail).
**Use Case:** Fallback strategies (e.g., multiple API endpoints).

**Syntax:**

```javascript
Promise.any([promise1, promise2, ...])
  .then((result) => console.log(result))
  .catch((errors) => console.error(errors));
```

**Example:**

```javascript
const p1 = Promise.reject('Error 1');
const p2 = Promise.resolve('Success!');
const p3 = Promise.reject('Error 2');

Promise.any([p1, p2, p3]).then((result) => console.log(result)); // "Success!" (first resolved)

Promise.any([p1, p3]).catch((errors) => console.error(errors)); // AggregateError: All promises rejected
```

**Key Behavior:**

- Returns the first successful promise
- Only rejects if all promises fail (with AggregateError)

#### Comparison Table

| Method               | Resolves When                | Rejects When  | Use Case                 |
| -------------------- | ---------------------------- | ------------- | ------------------------ |
| `Promise.all`        | All succeed                  | Any fails     | Dependent parallel tasks |
| `Promise.allSettled` | All complete (success/fail)  | Never         | Logging/fallbacks        |
| `Promise.race`       | First settles (success/fail) | First rejects | Timeouts/competition     |
| `Promise.any`        | First succeeds               | All fail      | Fallback strategies      |

## 3. async/await

Syntactic sugar over Promises for cleaner async code.

**Syntax:**

```javascript
async function fetchData() {
  try {
    const data = await someAsyncOperation();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**Example:**

```javascript
async function getUser() {
  const response = await fetch('https://api.example.com/user');
  const user = await response.json();
  return user;
}

getUser().then((user) => console.log(user));
```

**Key Points:**

- async functions always return a Promise
- await pauses execution until the Promise settles

## 4. Error Handling in Async Code

### A. Promises (catch)

```javascript
fetchData()
  .then((data) => console.log(data))
  .catch((err) => console.error('Error:', err));
```

### B. async/await (try/catch)

```javascript
async function loadData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

## 5. Event Loop & Microtasks

### How JavaScript Executes Async Code?

- Call Stack → Executes synchronous code
- Web APIs → Handles async operations (setTimeout, fetch)
- Callback Queue (Macrotasks) → Holds callbacks from Web APIs
- Microtask Queue → Holds .then(), await, Promise callbacks

### Execution Priority

Microtasks (Promises) run before Macrotasks (setTimeout)

**Example:**

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('End');

// Output:
// "Start" → "End" → "Promise" → "Timeout"
```

## 6. for-await-of (Async Iteration)

### A. Introduction

A loop that iterates over async iterables (Promises, async generators, Node.js streams) in sequential order.

javascript

```javascript
for await (const item of asyncIterable) {
  // Process each item as it resolves
}
```

### B. Key Features

- Waits for each Promise to resolve before continuing
- Works with any async iterable (objects implementing Symbol.asyncIterator)
- Similar to for...of but for async operations

### C. Use Cases

- Processing API pagination
- Reading large files/streams
- Handling multiple sequential async operations

### D. Examples

#### 1. With Async Generators

javascript

```javascript
async function* asyncNumbers() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
}

(async () => {
  for await (const num of asyncNumbers()) {
    console.log(num); // 1, 2, 3 (in order)
  }
})();
```

#### 2. With API Pagination

javascript

```javascript
async function* fetchPages(url) {
  let nextPage = true;
  let page = 1;
  
  while (nextPage) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    
    yield data.items;
    page++;
    nextPage = data.hasMore;
  }
}

// Usage
(async () => {
  for await (const items of fetchPages('https://api.example.com/data')) {
    console.log('New batch:', items);
    // Process items sequentially
  }
})();
```

#### 3. With Promise Arrays

javascript

```javascript
const promises = [
  fetch('/api/1'),
  fetch('/api/2'), 
  fetch('/api/3')
];

(async () => {
  for await (const response of promises) {
    const data = await response.json();
    console.log(data); // Processes in order but starts all requests immediately
  }
})();
```

### E. Comparison with Promise.all

|Feature|for-await-of|Promise.all|
|---|---|---|
|Order|Sequential processing|Parallel processing|
|Memory|Processes one at a time|Loads all into memory|
|Error Handling|Can continue after errors (try/catch)|Fails fast on first error|
|Use Case|Streams, sequential dependencies|Independent parallel operations|

### F. Error Handling

javascript

```javascript
try {
  for await (const item of asyncIterable) {
    // Process item
  }
} catch (err) {
  console.error('Iteration failed:', err);
}
```

### G. Creating Async Iterables

javascript

```javascript
const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    yield await Promise.resolve('First');
    yield await Promise.resolve('Second');
  }
};

(async () => {
  for await (const value of asyncIterable) {
    console.log(value); // "First", "Second"
  }
})();
```

### H. Real-world Example (Node.js Stream)

javascript

```javascript
import { createReadStream } from 'fs';

const fileStream = createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 1024 // Chunk size
});

(async () => {
  for await (const chunk of fileStream) {
    console.log('Read chunk:', chunk.length);
    // Process file chunks sequentially
  }
  console.log('File fully processed');
})();
```