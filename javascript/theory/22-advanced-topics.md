Dive deeper into JavaScript's internals and cutting-edge features.

## 1. Event Loop & Call Stack

### How JavaScript Executes Code

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

## 2. Memory Management & Garbage Collection

### Memory Lifecycle

1. Allocation: Variables, objects, functions
2. Usage: Read/write operations
3. Release: Automatically freed by GC

### Garbage Collection (GC) Strategies

- Mark-and-Sweep: Removes unreachable objects
- Reference Counting: Frees objects with zero references (obsolete)

### Memory Leak Prevention

```javascript
// Leak: Global variable
window.leak = "I'm a leak!";

// Fix: Use block scope
let safeVar = "I'm safe!";
```

## 3. Web Workers

Run CPU-heavy tasks in background threads without blocking the UI.

### Main Script

```javascript
const worker = new Worker('worker.js');

worker.postMessage('Start calculation'); // Send data

worker.onmessage = (e) => {
  console.log('Result:', e.data); // Receive data
};
```

### worker.js

```javascript
self.onmessage = (e) => {
  const result = heavyCalculation(e.data);
  self.postMessage(result); // Send back
};
```

**Limitations:**

- ❌ No DOM access
- ❌ Communication via postMessage

## 4. Service Workers & Progressive Web Apps (PWAs)

### Service Worker

A script that acts as a network proxy, enabling offline caching.

### Registration

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### sw.js (Caching Strategy)

```javascript
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
```

### PWA Features

- Offline support
- Push notifications
- Installable (like native apps)

## 5. TypeScript Introduction

A typed superset of JavaScript that compiles to plain JS.

### Key Features

- Static Typing:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

- Interfaces & Types:

```typescript
interface User {
  id: number;
  name: string;
}

const user: User = {id: 1, name: 'Alice'};
```

- Compiler Checks: Catches errors before runtime

### Why Use TypeScript?

- Better tooling (autocomplete, refactoring)
- Early bug detection

## 6. Meta-programming

Modify program behavior at runtime.

### A. Proxy

Intercept object operations.

```javascript
const target = {};
const handler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : `Property ${prop} not found`;
  },
};

const proxy = new Proxy(target, handler);
console.log(proxy.name); // "Property name not found"
```

### B. Reflect

Provides methods for interceptable operations.

```javascript
const obj = {a: 1};
Reflect.set(obj, 'b', 2);
console.log(obj.b); // 2
```

## 7. WebAssembly (Wasm)

A low-level, high-performance language for the web.

### Use Cases

- Heavy computations (games, video editing)
- Porting C/C++/Rust apps to the web

### Loading Wasm in JavaScript

```javascript
WebAssembly.instantiateStreaming(fetch('module.wasm')).then(({instance}) => {
  console.log(instance.exports.add(1, 2)); // Call Wasm function
});
```

**Advantages:**
- Near-native speed
- Works alongside JavaScript
