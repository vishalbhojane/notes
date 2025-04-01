```javascript
Array.prototype.myReduce = function (fn, initial) {
  let acc = initial === undefined ? this[0] : initial;
  const start = initial === undefined ? 1 : 0;

  for (let i = start; i < this.length; i++) {
    acc = fn(acc, this[i], i, this);
  }
  return acc;
};
```

Usage

```javascript
// Sum numbers
console.log([1, 2, 3].myReduce((acc, curr) => acc + curr, 0));
// 6

// Without initial value
console.log([1, 2, 3].myReduce((acc, curr) => acc + curr));
// 6

// Concatenate strings
console.log(['a', 'b', 'c'].myReduce((acc, curr) => acc + curr, ''));
// "abc"

// Create object
console.log(
  ['a', 'b', 'c'].myReduce((acc, curr, i) => {
    acc[curr] = i;
    return acc;
  }, {})
);
// {a: 0, b: 1, c: 2}

// Find max
console.log([1, 5, 2, 4].myReduce((max, curr) => Math.max(max, curr)));
// 5

// Empty array with initial
console.log([].myReduce((acc, curr) => acc + curr, 0));
// 0
```
