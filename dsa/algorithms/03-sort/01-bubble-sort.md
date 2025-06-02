Create a function `bubbleSort(arr)` that sorts an array of numbers using the Bubble Sort algorithm. The function should:
1. Compare adjacent elements and swap them if they are in the wrong order.
2. Repeat this process until no more swaps are needed.
3. Handle arrays of any length, including empty arrays.

## Solution

```javascript
function bubbleSort(arr) {
    let isSwapped = true;

    while (isSwapped) {
        isSwapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                isSwapped = true;
            }
        }
    }

    return arr;
}
```

Core Logic:
1. Use a `while` loop that continues as long as swaps are being made.
2. In each iteration of the `while` loop, traverse the array:
   - Compare each element with its adjacent element.
   - If the left element is greater than the right element, swap them.
   - Set `isSwapped` to true if a swap occurs.
3. If no swaps occur in a full traversal, the array is sorted, and the loop ends.

Usage

```javascript
console.log(bubbleSort([3, 2, 1, 5, 4])); // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5]
console.log(bubbleSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(bubbleSort([]));              // []
```

## Complexity

Time Complexity: O(n^2) in the worst and average cases, where n is the number of elements in the array. In the best case (already sorted array), it can be O(n).

Space Complexity: O(1), as it sorts the array in-place without using any extra space proportional to the input size.