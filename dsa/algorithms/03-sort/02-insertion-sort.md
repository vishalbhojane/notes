Create a function `insertionSort(arr)` that sorts an array of numbers using the Insertion Sort algorithm. The function should:
1. Iterate through the array, starting from the second element.
2. For each element, compare it with the previous elements and insert it in the correct position.
3. Handle arrays of any length, including empty arrays.

## Solution

```javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}
```

Core Logic:
1. Start from the second element (index 1) and iterate through the array.
2. For each element:
   - Store the current element in a variable.
   - Compare it with the previous elements.
   - Shift elements that are greater than the current element to the right.
   - Insert the current element in its correct position.

Usage

```javascript
console.log(insertionSort([3, 2, 1, 5, 4])); // [1, 2, 3, 4, 5]
console.log(insertionSort([5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5]
console.log(insertionSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(insertionSort([]));              // []
```

## Complexity

Time Complexity: O(n^2) in the worst and average cases, where n is the number of elements in the array. In the best case (already sorted array), it can be O(n).

Space Complexity: O(1), as it sorts the array in-place without using any extra space proportional to the input size.
