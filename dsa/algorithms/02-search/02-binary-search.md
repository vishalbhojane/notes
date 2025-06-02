Create a function `binarySearch(arr, t)` that searches for a target value `t` in a sorted array `arr` using the Binary Search algorithm. The function should:
1. Repeatedly divide the search interval in half.
2. Compare the target value with the middle element of the interval.
3. If the target value is found, return its index.
4. If the target value is not found after the search interval is empty, return -1.

## Solution (Iterative Approach)

```javascript
function binarySearch(arr, t) {
    let leftIndex = 0;
    let rightIndex = arr.length - 1;

    while (leftIndex <= rightIndex) {
        let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
        let el = arr[middleIndex];
        if (el === t) {
            return middleIndex;
        }
        if (t < el) {
            rightIndex = middleIndex - 1;
        } else {
            leftIndex = middleIndex + 1;
        }
    }
    return -1;
}
```

Core Logic:
1. Initialize left and right pointers to the start and end of the array.
2. While the left pointer is less than or equal to the right pointer:
   - Calculate the middle index.
   - If the middle element is the target, return its index.
   - If the target is less than the middle element, search the left half.
   - If the target is greater than the middle element, search the right half.
3. If the target is not found, return -1.

## Solution (Recursive Approach)

```javascript
function binarySearch(arr, t) {
    return search(arr, t, 0, arr.length - 1);
}

function search(arr, t, leftIndex, rightIndex) {
    if (leftIndex > rightIndex) {
        return -1;
    }

    let middleIndex = Math.floor((leftIndex + rightIndex) / 2);

    if (arr[middleIndex] === t) {
        return middleIndex;
    }

    if (t < arr[middleIndex]) {
        return search(arr, t, leftIndex, middleIndex - 1);
    } else {
        return search(arr, t, middleIndex + 1, rightIndex);
    }
}
```

Core Logic (Recursive):
1. If the left index is greater than the right index, return -1 (base case).
2. Calculate the middle index.
3. If the middle element is the target, return its index.
4. If the target is less than the middle element, recursively search the left half.
5. If the target is greater than the middle element, recursively search the right half.

Usage

```javascript
console.log(binarySearch([1, 2, 3, 4], 3)); // 2
console.log(binarySearch([1, 2, 3, 4], 1)); // 0
console.log(binarySearch([1, 2, 3, 4], 5)); // -1
```

## Complexity

Time Complexity: O(log n), where n is the number of elements in the array. This is because the search space is halved in each step.

Space Complexity: 
- Iterative approach: O(1), as it uses a constant amount of extra space.
- Recursive approach: O(log n) due to the call stack in the worst case.
