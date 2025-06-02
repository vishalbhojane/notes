Create a function `mergeSort(arr)` that sorts an array of numbers using the Merge Sort algorithm. The function should:
1. Divide the array into two halves.
2. Recursively sort the two halves.
3. Merge the sorted halves to produce a sorted array.
4. Handle arrays of any length, including empty arrays and arrays with one element.
## Solution

```javascript
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(leftArr, rightArr) {
    const sortedArr = [];

    while (leftArr.length && rightArr.length) {
        if (leftArr[0] <= rightArr[0]) {
            sortedArr.push(leftArr.shift());
        } else {
            sortedArr.push(rightArr.shift());
        }
    }

    return [...sortedArr, ...leftArr, ...rightArr];
}
```

Core Logic:
1. If the array has less than two elements, return it as is (base case for recursion).
2. Divide the array into two halves: leftArr and rightArr.
3. Recursively apply mergeSort to both halves.
4. Merge the sorted halves using the merge function:
   - Compare elements from both arrays and push the smaller one to the sortedArr.
   - Continue until one of the arrays is empty.
   - Append any remaining elements from either array to the sortedArr.

Usage

```javascript
console.log(mergeSort([1, 0, 4, 2]));    // [0, 1, 2, 4]
console.log(mergeSort([5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5]
console.log(mergeSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(mergeSort([]));              // []
```

## Complexity

Time Complexity: O(n log n), where n is the number of elements in the array. This time complexity is consistent for all cases (best, average, and worst).

Space Complexity: O(n), as it requires additional space to store the left and right subarrays during the merge process.
