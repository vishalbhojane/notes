Create a function `hasCycle` that takes an object.
It should:

1. Detect if the object has circular references
2. Return true if a cycle is found, false otherwise
3. Handle nested objects and arrays

## Solution

```javascript
function hasCycle(root) {
  const seen = new WeakSet();

  function detectCycle(curr) {
    if (!isObject(curr)) {
      return false;
    }

    if (seen.has(curr)) {
      return true;
    }

    seen.add(curr);
    for (let prop in curr) {
      if (curr.hasOwnProperty(prop) && detectCycle(curr[prop])) {
        return true;
      }
    }
    seen.delete(curr);

    return false;
  }

  return detectCycle(root);
}

function isObject(val) {
  return typeof val === 'object' && val !== null;
}
```

## Usage

```javascript
// No cycle
console.log(
  hasCycle({
    a: 1,
    b: {x: 2},
  })
); // false

// Direct cycle
const obj1 = {a: 1};
obj1.b = obj1;
console.log(hasCycle(obj1)); // true

// Indirect cycle
const obj2 = {a: 1};
const obj3 = {b: 2};
obj2.ref = obj3;
obj3.ref = obj2;
console.log(hasCycle(obj2)); // true

// Deep nested cycle
const deep = {
  level1: {
    level2: {
      level3: {},
    },
  },
};
deep.level1.level2.level3.cycle = deep.level1;
console.log(hasCycle(deep)); // true

// Primitives
console.log(hasCycle(123)); // false
console.log(hasCycle('test')); // false
console.log(hasCycle(null)); // false
```
