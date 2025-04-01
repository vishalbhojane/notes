Extend the Array prototype with a `last` method.
It should:

1. Return the last element of the array
2. Return -1 if array is empty

## Solution

```javascript
Array.prototype.last = function () {
  if (this.length < 0) {
    return -1;
  }
  return this[this.length - 1];
};
```

## Usage

```javascript
console.log([1, 2, 3, 4].last());
// 4

console.log(['a', 'b', 'c'].last());
// 'c'

console.log([].last());
// undefined

// Works with mixed types
console.log([1, 'two', {three: 3}].last());
// {three: 3}
```
