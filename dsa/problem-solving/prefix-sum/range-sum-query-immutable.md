## Problem Statement

Given an integer array nums, handle multiple queries of the type: Calculate the sum of elements between indices left and right (inclusive).

Implement the NumArray class:

- `NumArray(int[] nums)` → Initializes the object with nums.
- `int sumRange(int left, int right)` → Returns the sum of elements from left to right.

## Examples

```text
Input:
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]

Output:
[null, 1, -1, -3]

Explanation:
sumRange(0, 2) → -2 + 0 + 3 = 1
sumRange(2, 5) → 3 + (-5) + 2 + (-1) = -1
sumRange(0, 5) → -2 + 0 + 3 + (-5) + 2 + (-1) = -3
```

## Constraints

`1` <= `nums.length` <= `1e4`
`-1e5` <= `nums[i]` <= `1e5`
At most `1e4` calls to sumRange.

## Approach

**Prefix Sum Array**: Precompute cumulative sums to answer queries in O(1) time.

- `prefix[i]` = sum of `nums[0..i-1]`.
- `sumRange(left, right)` = `prefix[right+1] - prefix[left]`.

## Solution Code

```javascript
var NumArray = function (nums) {
  this.prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    this.prefix[i + 1] = this.prefix[i] + nums[i];
  }
};

NumArray.prototype.sumRange = function (left, right) {
  return this.prefix[right + 1] - this.prefix[left];
};
```

## Time & Space Complexity

**Time**:

- Constructor: O(n)
- sumRange: O(1) per query

**Space**: O(n) for prefix array.

## Related Problems

1. Contiguous Array
2. Subarray Sum Equals K
