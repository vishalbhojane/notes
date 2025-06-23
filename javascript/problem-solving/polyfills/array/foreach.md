```js
Array.prototype.myForEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this);
  }
};
```

Usage

```javascript
// Basic usage
[1, 2, 3].myForEach(x => console.log(x));
// 1
// 2
// 3

// Using index
['a', 'b', 'c'].myForEach((item, index) => {
  console.log(`${index}: ${item}`);
});
// "0: a"
// "1: b"
// "2: c"

// Using array reference
const sum = {val: 0};
[1, 2, 3].myForEach(function (num, i, arr) {
  sum.val += num;
  console.log(`Processing ${i} of ${arr.length}`);
});
// "Processing 0 of 3"
// "Processing 1 of 3"
// "Processing 2 of 3"
console.log(sum.val); // 6

// Empty array
[].myForEach(x => console.log(x));
// (nothing printed)
```
