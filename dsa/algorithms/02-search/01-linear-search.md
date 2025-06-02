Create a function `linearSearch(arr, target)` that searches for a target value in an array using the Linear Search algorithm. The function should:
1. Iterate through each element of the array sequentially.
2. Compare each element with the target value.
3. If the target is found, return its index.
4. If the target is not found after checking all elements, return -1.
## Solution

```javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}
```

Core Logic:
1. Iterate through the array from the beginning to the end.
2. For each element:
   - If the element matches the target, return its index.
3. If the loop completes without finding the target, return -1.

Usage

```javascript
console.log(linearSearch([1, 2, 3, 4], 3)); // 2
console.log(linearSearch([1, 2, 3, 4], 5)); // -1
```

## Complexity

Time Complexity: O(n), where n is the number of elements in the array. In the worst case, the algorithm may need to check every element in the array.

Space Complexity: O(1), as it uses a constant amount of extra space regardless of the input size.

Note: Linear Search is simple to implement and works on both sorted and unsorted arrays. It's efficient for small arrays or when the target is likely to be near the beginning of the array. However, for large datasets, other search algorithms like Binary Search (for sorted arrays) can be more efficient.

Advantages:
- Simple and easy to implement
- Works on unsorted arrays
- Efficient for small datasets

Disadvantages:
- Inefficient for large datasets
- Time complexity increases linearly with the size of the array