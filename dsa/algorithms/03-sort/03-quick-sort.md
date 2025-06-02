Create a function `quickSort(arr)` that sorts an array of numbers using the Quick Sort algorithm. The function should:
1. Choose a pivot element (in this case, the last element of the array).
2. Partition the array into two subarrays: elements less than the pivot and elements greater than or equal to the pivot.
3. Recursively apply the algorithm to the subarrays.
4. Handle arrays of any length, including empty arrays and arrays with one element.

## Solution

```javascript
function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}
```

Core Logic:
1. If the array has less than two elements, return it as is (base case for recursion).
2. Choose the last element as the pivot.
3. Partition the array into two subarrays:
   - Left subarray: elements less than the pivot
   - Right subarray: elements greater than or equal to the pivot
4. Recursively apply quickSort to both subarrays.
5. Combine the sorted left subarray, pivot, and sorted right subarray.

Usage

```javascript
console.log(quickSort([3, 2, 1, 5, 4])); // [1, 2, 3, 4, 5]
console.log(quickSort([5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5]
console.log(quickSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(quickSort([]));              // []
```

## Complexity

Time Complexity: 
- Average case: O(n log n), where n is the number of elements in the array.
- Worst case: O(n^2), which occurs when the array is already sorted or reverse sorted.

Space Complexity: O(n) in the worst case due to the recursive calls on the call stack. The space complexity can be improved to O(log n) with careful implementation.
