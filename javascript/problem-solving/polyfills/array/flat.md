```javascript
Array.prototype.myFlat = function (depth = 1) {
  const flattened = [];

  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i]) && depth > 0) {
      flattened.push(...this[i].myFlat(depth - 1));
    } else {
      flattened.push(this[i]);
    }
  }
  return flattened;
};
```

Usage

```javascript
[1, [2, 3]].myFlat(); // [1, 2, 3]
[1, [2, [3, 4]]].myFlat(); // [1, 2, [3, 4]]
[1, [2, [3, [4]]]].myFlat(2); // [1, 2, 3, [4]]
[1, [2, [3, [4]]]].myFlat(Infinity); // [1, 2, 3, 4]
```
