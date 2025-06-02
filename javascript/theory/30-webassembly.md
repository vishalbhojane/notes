# WebAssembly (Wasm)

WebAssembly is a low-level, high-performance language for the web that runs alongside JavaScript.

## Basic Concepts

### What is WebAssembly?

- Binary instruction format
- Stack-based virtual machine
- Designed for efficient execution
- Safe, sandboxed execution
- Works alongside JavaScript

### Key Features

- Near-native performance
- Compact binary format
- Fast loading and execution
- Memory-safe execution
- Platform-independent

## Basic Usage

### Loading and Running Wasm

```javascript
// Basic loading
WebAssembly.instantiateStreaming(fetch('module.wasm'))
  .then(({instance}) => {
    console.log(instance.exports.add(1, 2));
  });

// With imports
const importObject = {
  env: {
    memory: new WebAssembly.Memory({initial: 1}),
    table: new WebAssembly.Table({initial: 1, element: 'anyfunc'})
  }
};

WebAssembly.instantiateStreaming(fetch('module.wasm'), importObject)
  .then(({instance}) => {
    console.log(instance.exports.add(1, 2));
  });
```

### Memory Management

```javascript
// Create memory
const memory = new WebAssembly.Memory({
  initial: 1,  // 64KB
  maximum: 10, // 640KB
  shared: false
});

// Access memory
const buffer = new Uint8Array(memory.buffer);
buffer[0] = 42;
```

## Advanced Features

### Threading Support

```javascript
// Create shared memory
const memory = new WebAssembly.Memory({
  initial: 1,
  maximum: 10,
  shared: true
});

// Create worker
const worker = new Worker('worker.js');
worker.postMessage({memory}, [memory.buffer]);
```

### SIMD Operations

```javascript
// SIMD vector operations
const simd = new WebAssembly.Module(wasmCode);
const instance = new WebAssembly.Instance(simd);

// Use SIMD operations
const result = instance.exports.vectorAdd(vec1, vec2);
```

## Integration with JavaScript

### Data Exchange

```javascript
// JavaScript to Wasm
const wasmModule = await WebAssembly.instantiateStreaming(fetch('module.wasm'));
const {add, memory} = wasmModule.instance.exports;

// Pass array to Wasm
const array = new Float32Array([1, 2, 3, 4]);
const arrayPtr = instance.exports.allocate(array.length * 4);
new Float32Array(memory.buffer, arrayPtr, array.length).set(array);

// Call Wasm function
const result = add(arrayPtr, array.length);
```

### Error Handling

```javascript
try {
  const {instance} = await WebAssembly.instantiateStreaming(fetch('module.wasm'));
  const result = instance.exports.compute();
} catch (error) {
  console.error('Wasm error:', error);
}
```

## Performance Optimization

### Memory Management

```javascript
// Efficient memory allocation
class MemoryManager {
  constructor(memory) {
    this.memory = memory;
    this.offset = 0;
  }

  allocate(size) {
    const ptr = this.offset;
    this.offset += size;
    return ptr;
  }

  free(ptr) {
    // Implement memory freeing strategy
  }
}
```

### Batch Processing

```javascript
// Process data in batches
function processInBatches(data, batchSize) {
  const batches = [];
  for (let i = 0; i < data.length; i += batchSize) {
    batches.push(data.slice(i, i + batchSize));
  }
  
  return batches.map(batch => {
    return instance.exports.processBatch(batch);
  });
}
```

## Common Use Cases

### Image Processing

```javascript
// Load and process image
async function processImage(imageData) {
  const {instance} = await WebAssembly.instantiateStreaming(
    fetch('image_processor.wasm')
  );
  
  // Allocate memory for image data
  const imagePtr = instance.exports.allocate(imageData.length);
  new Uint8Array(instance.exports.memory.buffer, imagePtr, imageData.length)
    .set(imageData);
  
  // Process image
  const resultPtr = instance.exports.processImage(
    imagePtr,
    imageData.length
  );
  
  // Get processed data
  const result = new Uint8Array(
    instance.exports.memory.buffer,
    resultPtr,
    imageData.length
  );
  
  return result;
}
```

### Game Development

```javascript
// Game physics in Wasm
class PhysicsEngine {
  constructor() {
    this.instance = null;
    this.init();
  }

  async init() {
    const {instance} = await WebAssembly.instantiateStreaming(
      fetch('physics.wasm')
    );
    this.instance = instance;
  }

  update(entities) {
    const entityPtr = this.instance.exports.allocate(entities.length * 16);
    new Float32Array(
      this.instance.exports.memory.buffer,
      entityPtr,
      entities.length * 4
    ).set(entities.flat());
    
    this.instance.exports.updatePhysics(entityPtr, entities.length);
    
    const result = new Float32Array(
      this.instance.exports.memory.buffer,
      entityPtr,
      entities.length * 4
    );
    
    return Array.from(result);
  }
}
```

## Best Practices

### Memory Management

1. **Efficient Allocation**
```javascript
class MemoryPool {
  constructor(size) {
    this.pool = new ArrayBuffer(size);
    this.offset = 0;
  }

  allocate(size) {
    if (this.offset + size > this.pool.byteLength) {
      throw new Error('Out of memory');
    }
    const ptr = this.offset;
    this.offset += size;
    return ptr;
  }
}
```

2. **Memory Reuse**
```javascript
class RecyclableMemory {
  constructor() {
    this.blocks = new Map();
  }

  allocate(size) {
    if (this.blocks.has(size)) {
      return this.blocks.get(size);
    }
    const block = new ArrayBuffer(size);
    this.blocks.set(size, block);
    return block;
  }
}
```

### Error Handling

```javascript
class WasmError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

function wrapWasmCall(fn) {
  return function(...args) {
    try {
      return fn(...args);
    } catch (error) {
      throw new WasmError(error.message, error.code);
    }
  };
}
```

### Performance Monitoring

```javascript
class WasmPerformance {
  constructor() {
    this.metrics = new Map();
  }

  measure(fn, name) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    this.metrics.set(name, {
      time: end - start,
      timestamp: Date.now()
    });
    
    return result;
  }

  getMetrics() {
    return Array.from(this.metrics.entries());
  }
}
``` 