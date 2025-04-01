Create a function `chunk` that takes an array and a size parameter.
It should:

1. Split the array into smaller arrays of specified size
2. Return array of these chunks
3. Handle empty arrays and invalid sizes

## Solution

```javascript
function chunk(arr, size) {
  if (arr.length === 0) {
    return arr;
  }
  if (size <= 0) {
    return [];
  }

  const result = [];

  for (let i = 0; i < arr.length; i = i + size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}
```

## Usage

```javascript
console.log(chunk([1, 2, 3, 4, 5], 2));
// [[1, 2], [3, 4], [5]]

console.log(chunk(['a', 'b', 'c', 'd'], 3));
// [['a', 'b', 'c'], ['d']]

console.log(chunk([], 2)); // []
console.log(chunk([1, 2], 0)); // []
```
