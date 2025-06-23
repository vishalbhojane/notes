Memory management in JavaScript is handled automatically by the runtime environment (e.g., browser's JavaScript engine or `Node.js`).

## Key Points:

- Uses garbage collection for automatic memory management
- Developers don't need to manually allocate or deallocate memory

## Memory Life Cycle:

1. Allocation of required memory
2. Usage of allocated memory
3. Release of memory when no longer needed

## Memory Storage Areas

### Stack

- Stores static data (size known at compile time)
- Contains: - Primitive values (strings, numbers, booleans, null, undefined)
- References to objects and functions
- Uses static memory allocation

### Heap

- Stores objects and functions
- Dynamic allocation (no fixed size)
- Allocates space as required

## Comparison:

Stack vs Heap

| Feature            | Stack                     | Heap                      |
| ------------------ | ------------------------- | ------------------------- |
| Content            | Primitives and references | Objects and functions     |
| Size determination | Compile time              | Run time                  |
| Memory allocation  | Fixed                     | Dynamic (no preset limit) |

## Garbage Collection (GC)

Garbage Collection is an automatic memory management system that handles the release of unused memory.

## How Garbage Collection Works:

1. **Reference Counting:**

- Counts references to each object
- Frees memory when reference count reaches zero
- Limitation: Can't handle circular references

```javascript
let obj = {a: 1}; // Reference count: 1
let anotherRef = obj; // Reference count: 2
obj = null; // Reference count: 1
anotherRef = null; // Reference count: 0, object can be garbage collected
```

2. **Mark and Sweep Algorithm:**

- Marks all reachable objects from root
- Sweeps and frees unmarked (unreachable) objects
- Handles circular references

```javascript
function createCycle() {
  let obj1 = {};
  let obj2 = {};
  obj1.a = obj2; // obj1 references obj2
  obj2.a = obj1; // obj2 references obj1
}
createCycle();
// After function execution, obj1 and obj2 are unreachable and can be garbage collected
```

## Best Practices:

1. Avoid global variables
2. Nullify references to large objects when no longer needed
3. Be cautious with closures that can retain references

```javascript
function potentialMemoryLeak() {
  let largeData = new Array(1000000);
  return function () {
    console.log(largeData[0]);
  };
}
let leak = potentialMemoryLeak(); // largeData is retained in closure
leak = null; // Allow garbage collection
```
