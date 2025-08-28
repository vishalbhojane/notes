```javascript
Array.prototype.mySplice = function (start, deleteCount, ...items) {
  const originalLength = this.length;

  if (start < 0) {
    start = Math.max(originalLength + start, 0);
  } else {
    start = Math.min(start, originalLength);
  }

  if (isNaN(deleteCount) || deleteCount === undefined) {
    deleteCount = originalLength - start;
  } else {
    deleteCount = Math.max(deleteCount, 0);
    deleteCount = Math.min(deleteCount, originalLength - start);
  }

  const removedElements = this.slice(start, start + deleteCount);
  const remainingElements = this.slice(start + deleteCount);
  this.length = start;
  this.push(...items, ...remainingElements);

  return removedElements;
};
```

Usage

```javascript
console.log([1, 2, 3, 4, 5].mySplice(2, 1, 'a', 'b'));
// [3] // [1, 2, 'a', 'b', 4, 5]
console.log([1, 2, 3, 4, 5].mySplice(2));
// [3, 4, 5] // [1, 2]
console.log([1, 2, 3, 4, 5].mySplice(-2, 1));
// [4]
console.log([1, 2, 3, 4, 5].mySplice(2, 0, 'a', 'b'));
// [] // [1, 2, 'a', 'b', 3, 4, 5]
```
