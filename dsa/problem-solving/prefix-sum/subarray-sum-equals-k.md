## Problem Statement

Given an array of integers nums and an integer k, return the total number of contiguous subarrays whose sum equals k.

## Examples

```
Input: nums = [1,1,1], k = 2
Output: 2
Explanation: Subarrays [1,1] (indices 0-1) and [1,1] (indices 1-2) sum to 2.

Input: nums = [1,2,3], k = 3
Output: 2
Explanation: Subarrays [1,2] (indices 0-1) and [3] (index 2) sum to 3.
```

## Constraints

`1` <= `nums.length` <= `2e4`
`-1000` <= `nums[i]` <= `1000`
`-1e7` <= `k` <= `1e7`

## Intuition

**Key Insight**: The sum of a subarray `nums[i..j]` can be expressed as `prefixSum[j] - prefixSum[i-1] = k`

**Hash Map**: Track the frequency of prefix sums encountered. For each prefixSum, check if prefixSum - k exists in the map to count valid subarrays.

## Approach

1. Initialize a hash map to store prefix sums and their frequencies (sum: count). Start with {0: 1} to account for subarrays starting at index 0.
2. Iterate through the array:
   - Update the running prefixSum.
   - If prefixSum - k exists in the map, increment count by its frequency.
   - Record the current prefixSum in the map (incrementing its count).
3. Return the total count.

## Solution Code

```javascript
var subarraySum = function (nums, k) {
  const map = new Map();
  map.set(0, 1); // Base case: prefix sum 0 occurs once
  let count = 0;
  let prefixSum = 0;

  for (const num of nums) {
    prefixSum += num;
    if (map.has(prefixSum - k)) {
      count += map.get(prefixSum - k);
    }
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }
  return count;
};
```

## Time & Space Complexity

- **Time**: O(n) → Single pass through the array.
- **Space**: O(n) → Hash map stores up to n unique prefix sums.

## Edge Cases

- Entire Array Sum: If sum(nums) == k, include the full array.
- Negative Numbers: Handled naturally by tracking all possible prefix sums.
- Multiple Prefix Sums: The same sum can occur multiple times (e.g., nums = `[0,0,0]`, k=0).

## Related Problems

1. Contiguous Array
2. Maximum Size Subarray Sum Equals k
3. Subarray Sums Divisible by K

## Key Takeaways

1. **Prefix Sum + Hash Map**: Efficiently counts subarrays by leveraging `prefixSum[j] - prefixSum[i] = k`
2. **Base Case**: map.set(0, 1) ensures subarrays starting at index 0 are counted.
3. **Frequency Tracking**: The map stores counts of prefix sums to handle overlapping subarrays.
