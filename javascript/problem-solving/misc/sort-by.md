Create a function `sortBy` that takes an array and a transform function.
It should:

1. Sort array elements based on values returned by transform function
2. Work with numbers, objects, and nested arrays
3. Return new sorted array without modifying original

## Solution

```javascript
function sortBy(arr, fn) {
  return arr.sort((a, b) => fn(a) - fn(b));
}
```

## Usage

```javascript
// Sort numbers
console.log(sortBy([5, 4, 1, 2, 3], x => x));
// [1,2,3,4,5]

// Sort by computed value
console.log(sortBy([1, 2, 3, 4], x => -x));
// [4,3,2,1]

// Sort objects by property
console.log(sortBy([{x: 3}, {x: 1}, {x: 2}], obj => obj.x));
// [{x: 1}, {x: 2}, {x: 3}]

// Sort by transformation
console.log(sortBy([-2, -1, 0, 1, 2], x => Math.abs(x)));
// [0,1,-1,2,-2]

// Empty array
console.log(sortBy([], x => x));
// []
```
