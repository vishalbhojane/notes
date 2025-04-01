```javascript
Array.prototype.myUnshift = function (...items) {
  const originalLength = this.length;
  const itemsLength = items.length;

  for (let i = originalLength - 1; i >= 0; i--) {
    this[i + itemsLength] = this[i];
  }

  for (let i = 0; i < itemsLength; i++) {
    this[i] = items[i];
  }

  return this.length;
};
```

Usage

```javascript
// Basic unshift
const arr1 = [4, 5];
console.log(arr1.myUnshift(1, 2, 3)); // 5
console.log(arr1); // [1, 2, 3, 4, 5]

// Unshift to empty array
const arr2 = [];
console.log(arr2.myUnshift('a')); // 1
console.log(arr2); // ['a']

// Unshift single item
const arr3 = [1, 2];
console.log(arr3.myUnshift(0)); // 3
console.log(arr3); // [0, 1, 2]

// Unshift no items
const arr4 = [1, 2];
console.log(arr4.myUnshift()); // 2
console.log(arr4); // [1, 2]

// Unshift with mixed types
const arr5 = ['b', 'c'];
console.log(arr5.myUnshift(1, null, 'a')); // 5
console.log(arr5); // [1, null, 'a', 'b', 'c']
```
