```javascript
Array.prototype.myMap = function (fn) {
  const mapped = [];
  for (let i = 0; i < this.length; i++) {
    mapped.push(fn(this[i], i, this));
  }
  return mapped;
};
```

Usage

```javascript
// Basic transformation
console.log([1, 2, 3].myMap((x) => x * 2));
// [2, 4, 6]

// Using index
console.log(['a', 'b', 'c'].myMap((item, index) => `${index}-${item}`));
// ['0-a', '1-b', '2-c']

// Object transformation
console.log([{x: 1}, {x: 2}].myMap((obj) => obj.x));
// [1, 2]

// Using array reference
console.log([1, 2, 3].myMap((num, i, arr) => arr[arr.length - 1 - i]));
// [3, 2, 1]

// Empty array
console.log([].myMap((x) => x * 2));
// []
```
