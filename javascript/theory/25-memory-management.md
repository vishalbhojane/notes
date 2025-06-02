# Memory Management & Garbage Collection

## Memory Lifecycle

1. **Allocation**: Variables, objects, functions
2. **Usage**: Read/write operations
3. **Release**: Automatically freed by GC

## Garbage Collection (GC) Strategies

### Mark-and-Sweep Algorithm
- Most common GC algorithm
- Two-phase process:
  1. Mark: Identifies reachable objects
  2. Sweep: Removes unreachable objects

### Reference Counting (Obsolete)
- Counts references to each object
- Frees objects with zero references
- Problem: Circular references

## Memory Leaks

### Common Causes

1. **Global Variables**
```javascript
// Leak: Global variable
window.leak = "I'm a leak!";

// Fix: Use block scope
let safeVar = "I'm safe!";
```

2. **Closures**
```javascript
// Leak: Unnecessary closure
function createLeak() {
  const largeObject = new Array(1000000);
  return function() {
    console.log('Hello');
  };
}

// Fix: Release references
function createSafe() {
  const largeObject = new Array(1000000);
  // Use largeObject
  largeObject = null; // Release reference
  return function() {
    console.log('Hello');
  };
}
```

3. **Event Listeners**
```javascript
// Leak: Unremoved event listener
element.addEventListener('click', handler);

// Fix: Remove when done
element.removeEventListener('click', handler);
```

## Best Practices

1. **Variable Scope**
   - Use `let` and `const` instead of `var`
   - Keep variables in smallest possible scope

2. **Object Management**
   - Null references when done
   - Use WeakMap/WeakSet for temporary references
   - Avoid circular references

3. **DOM Management**
   - Remove event listeners
   - Clean up intervals/timeouts
   - Remove DOM elements when not needed

4. **Large Data Structures**
   - Process in chunks
   - Use streaming when possible
   - Clear arrays/objects when done

## Tools for Memory Management

1. **Browser DevTools**
   - Memory tab
   - Heap snapshots
   - Allocation timeline

2. **Performance Monitoring**
   - Memory usage graphs
   - GC events
   - Memory pressure events

## Common Patterns

1. **Object Pool**
```javascript
class ObjectPool {
  constructor() {
    this.pool = [];
  }
  
  get() {
    return this.pool.pop() || new Object();
  }
  
  release(obj) {
    this.pool.push(obj);
  }
}
```

2. **Weak References**
```javascript
const weakMap = new WeakMap();
const obj = {};
weakMap.set(obj, 'data');
// obj can be garbage collected
```

3. **Memory Cleanup**
```javascript
function cleanup() {
  // Clear caches
  cache.clear();
  
  // Remove event listeners
  document.removeEventListener('event', handler);
  
  // Clear intervals
  clearInterval(intervalId);
  
  // Null references
  largeObject = null;
}
``` 