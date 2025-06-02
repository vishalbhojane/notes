# Web Workers

Web Workers allow you to run JavaScript code in background threads, separate from the main execution thread of a web application.

## Basic Concepts

- Run CPU-heavy tasks without blocking the UI
- Communicate via message passing
- No DOM access
- Run in parallel with main thread

## Types of Web Workers

1. **Dedicated Workers**
   - Single script execution
   - Communication with one parent
   - Terminated when parent closes

2. **Shared Workers**
   - Multiple scripts can connect
   - Accessible from different windows/tabs
   - More complex communication

3. **Service Workers**
   - Special type for offline capabilities
   - Network proxy functionality
   - PWA support

## Implementation

### Main Script

```javascript
// Create a new worker
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage('Start calculation');

// Receive data from worker
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// Handle errors
worker.onerror = (error) => {
  console.error('Worker error:', error);
};

// Terminate worker when done
worker.terminate();
```

### Worker Script (worker.js)

```javascript
// Receive data from main thread
self.onmessage = (e) => {
  const result = heavyCalculation(e.data);
  
  // Send result back
  self.postMessage(result);
};

// Handle errors
self.onerror = (error) => {
  console.error('Worker error:', error);
};

// Example heavy calculation
function heavyCalculation(data) {
  // CPU-intensive work here
  return processedData;
}
```

## Communication Patterns

1. **Simple Message Passing**
```javascript
// Main thread
worker.postMessage({type: 'calculate', data: input});

// Worker
self.onmessage = (e) => {
  if (e.data.type === 'calculate') {
    const result = process(e.data.data);
    self.postMessage({type: 'result', data: result});
  }
};
```

2. **Transferable Objects**
```javascript
// Main thread
const buffer = new ArrayBuffer(1000000);
worker.postMessage(buffer, [buffer]); // Transfer ownership

// Worker
self.onmessage = (e) => {
  const buffer = e.data;
  // Use buffer
};
```

## Best Practices

1. **Error Handling**
```javascript
worker.onerror = (error) => {
  console.error('Worker error:', error);
  // Handle error appropriately
};
```

2. **Cleanup**
```javascript
// When worker is no longer needed
worker.terminate();
```

3. **Performance Considerations**
- Use transferable objects for large data
- Minimize message passing
- Batch operations when possible

## Use Cases

1. **Image Processing**
```javascript
// Main thread
worker.postMessage({
  type: 'processImage',
  imageData: imageData
});

// Worker
self.onmessage = (e) => {
  if (e.data.type === 'processImage') {
    const processed = processImage(e.data.imageData);
    self.postMessage({type: 'imageProcessed', data: processed});
  }
};
```

2. **Data Analysis**
```javascript
// Main thread
worker.postMessage({
  type: 'analyzeData',
  dataset: largeDataset
});

// Worker
self.onmessage = (e) => {
  if (e.data.type === 'analyzeData') {
    const analysis = analyze(e.data.dataset);
    self.postMessage({type: 'analysisComplete', data: analysis});
  }
};
```

## Limitations

1. **No DOM Access**
   - Workers cannot access the DOM
   - Cannot use window or document objects

2. **Limited APIs**
   - Some Web APIs not available
   - No localStorage access
   - Limited XMLHttpRequest capabilities

3. **Communication Overhead**
   - Message passing can be slow
   - Need to serialize/deserialize data

## Debugging

1. **Console Logging**
```javascript
// In worker
console.log('Worker message:', message);

// In main thread
worker.onmessage = (e) => {
  console.log('Main thread received:', e.data);
};
```

2. **Error Tracking**
```javascript
worker.onerror = (error) => {
  console.error('Worker error:', error);
  // Log to error tracking service
};
```

## Performance Optimization

1. **Data Transfer**
```javascript
// Use transferable objects
const buffer = new ArrayBuffer(1000000);
worker.postMessage(buffer, [buffer]);
```

2. **Batch Processing**
```javascript
// Process data in chunks
function processInChunks(data, chunkSize) {
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    worker.postMessage(chunk);
  }
}
```

3. **Worker Pool**
```javascript
class WorkerPool {
  constructor(size) {
    this.workers = [];
    this.queue = [];
    
    for (let i = 0; i < size; i++) {
      this.workers.push(new Worker('worker.js'));
    }
  }
  
  process(data) {
    return new Promise((resolve) => {
      this.queue.push({data, resolve});
      this.processQueue();
    });
  }
  
  processQueue() {
    if (this.queue.length === 0) return;
    
    const worker = this.workers.find(w => !w.busy);
    if (!worker) return;
    
    const {data, resolve} = this.queue.shift();
    worker.busy = true;
    
    worker.onmessage = (e) => {
      worker.busy = false;
      resolve(e.data);
      this.processQueue();
    };
    
    worker.postMessage(data);
  }
}
``` 