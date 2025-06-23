## Problem Statement

Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

## Examples

```text
Input: nums = [0,1]
Output: 2
Explanation: The entire array has equal 0s and 1s.

Input: nums = [0,1,0]
Output: 2
Explanation: Subarrays [0,1] or [1,0] are valid.

Input: nums = [0,1,1,1,1,1,0,0,0]
Output: 6
Explanation: Subarray [1,1,1,0,0,0] has 3 zeros and 3 ones.
```

## Constraints

`1` <= `nums.length` <= `1e5`
`nums[i]` is either `0` or `1`

## Intuition

**Key Insight**: Treat 0 as -1 and 1 as +1. A subarray with equal 0s and 1s will have a sum of 0.

**Prefix Sum**: Track cumulative sum. If the same sum appears again, the subarray between the indices has sum 0 (equal 0s and 1s).

## Approach

1. Initialize a hash map to store the first occurrence of each sum (sum: index).
2. Iterate through the array:
   - Convert 0 to -1 and 1 to +1 for sum calculation.
   - If the current sum exists in the map, update maxLen using i - map.get(sum).
   - Else, store the sum with its index.
3. Return the maximum length found.

## Solution Code

javascript

```javascript
var findMaxLength = function (nums) {
  const map = new Map();
  map.set(0, -1); // Base case: sum 0 at index -1
  let maxLen = 0;
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] === 0 ? -1 : 1;
    if (map.has(sum)) {
      maxLen = Math.max(maxLen, i - map.get(sum));
    } else {
      map.set(sum, i);
    }
  }
  return maxLen;
};
```

## Time & Space Complexity

- **Time**: O(n) → Single pass through the array.
- **Space**: O(n) → Hash map stores at most n unique sums.

## Edge Cases

- All 0s or 1s: Return 0 (no valid subarray).
- Single Element: Return 0 (e.g., `[0]` or `[1]`).

## Related Problems

1. Subarray Sum Equals K
2. Maximum Size Subarray Sum Equals k

## Key Takeaways

1. **Sum Rebalancing**: Convert 0 to -1 to transform the problem into finding subarrays with sum 0.
2. **Hash Map Efficiency**: Stores the first occurrence of each sum for O(1) lookups.
3. **Base Case**: map.set(0, -1) handles subarrays starting from index 0.
