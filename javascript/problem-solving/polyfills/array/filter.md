```javascript
Array.prototype.myFilter = function (fn) {
  const filtered = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      filtered.push(this[i]);
    }
  }
  return filtered;
};
```

Usage

```javascript
// Basic filtering
console.log([1, 2, 3, 4].myFilter((x) => x % 2 === 0));
// [2, 4]

// Using index
console.log(['a', 'b', 'c'].myFilter((_, i) => i < 2));
// ['a', 'b']

// Object filtering
console.log(
  [
    {id: 1, active: true},
    {id: 2, active: false},
    {id: 3, active: true},
  ].myFilter((obj) => obj.active)
);
// [{id: 1, active: true}, {id: 3, active: true}]

// Using array reference
console.log([1, 2, 3].myFilter((num, i, arr) => num < arr.length));
// [1, 2]

// Empty array
console.log([].myFilter((x) => true));
// []
```
