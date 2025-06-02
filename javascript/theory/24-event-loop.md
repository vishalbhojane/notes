# Event Loop & Call Stack

## How JavaScript Executes Code

- Call Stack: Tracks function calls (LIFO)
- Web APIs: Handles async tasks (setTimeout, fetch)
- Callback Queue: Holds completed async tasks
- Event Loop: Moves tasks from the queue to the stack when it's empty

**Example**

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('End');

// Output: "Start" → "End" → "Promise" → "Timeout"
```

**Key Insight:**
- Microtasks (Promises) run before Macrotasks (setTimeout)

## Understanding the Event Loop

The event loop is JavaScript's way of handling asynchronous operations while maintaining a single-threaded execution model.

### Components:

1. **Call Stack**
   - Last In, First Out (LIFO) structure
   - Tracks currently executing functions
   - One function at a time

2. **Web APIs**
   - Browser-provided features
   - Handle async operations
   - Examples: setTimeout, fetch, DOM events

3. **Callback Queue**
   - First In, First Out (FIFO) structure
   - Holds callbacks from completed async operations
   - Also called "Task Queue" or "Macrotask Queue"

4. **Microtask Queue**
   - Higher priority than Callback Queue
   - Processes Promise callbacks
   - Runs after each macrotask

### Execution Flow:

1. Synchronous code runs first
2. Async operations are handed to Web APIs
3. When Web APIs complete, callbacks go to queues
4. Event loop checks call stack
5. If stack is empty, processes queues:
   - Microtasks first (until empty)
   - Then one macrotask
   - Repeat

### Practical Implications:

- Long-running tasks block the event loop
- Microtasks can starve macrotasks
- Proper async code structure is crucial
- Understanding helps debug timing issues 