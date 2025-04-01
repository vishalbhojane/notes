Create a function `mergeSortedArrays` that takes two sorted arrays.
It should:

1. Merge both arrays into a single sorted array
2. Maintain the sorted order in the resulting array
3. Return the merged array

## Solution

```javascript
function mergeSortedArrays(leftArr, rightArr) {
  const mergedResult = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    const leftElement = leftArr[leftIndex];
    const rightElement = rightArr[rightIndex];

    if (leftElement <= rightElement) {
      mergedResult.push(leftElement);
      leftIndex++;
    } else {
      mergedResult.push(rightElement);
      rightIndex++;
    }
  }

  while (leftIndex < leftArr.length) {
    mergedResult.push(leftArr[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < rightArr.length) {
    mergedResult.push(rightArr[rightIndex]);
    rightIndex++;
  }

  return mergedResult;
}
```

## Usage

```javascript
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));
// [1, 2, 3, 4, 5, 6]

console.log(mergeSortedArrays([1, 4, 7], [2, 3, 6]));
// [1, 2, 3, 4, 6, 7]

console.log(mergeSortedArrays([1], [2]));
// [1, 2]

console.log(mergeSortedArrays([], [1, 2]));
// [1, 2]

console.log(mergeSortedArrays([1, 1, 3], [1, 2, 3]));
// [1, 1, 1, 2, 3, 3]
```
