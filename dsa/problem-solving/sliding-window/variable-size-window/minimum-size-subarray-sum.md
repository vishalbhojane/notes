## Problem Statement

Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray whose sum is ≥ target. Return 0 if no such subarray exists.

## Examples

```text
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length (sum = 7).

Input: target = 4, nums = [1,4,4]
Output: 1
Explanation: The subarray [4] meets the target.

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
Explanation: No subarray sums to ≥ 11.
```

## Constraints

- 1 <= target <= 1e9
- 1 <= nums.length <= 1e5
- 1 <= nums\[i] <= 1e4

## Intuition

**Sliding Window**: Maintain a window \[left, right] that dynamically adjusts to find the smallest subarray with sum ≥ target.

**Key Insight**: If the current window sum ≥ target, try shrinking the window from the left to find a smaller valid subarray.

## Approach

1. Initialize left = 0, currentSum = 0, and minLength = Infinity.
2. Expand Window: Iterate right from 0 to n-1, adding nums\[right] to currentSum.
3. Shrink Window: While currentSum ≥ target:
   - Update minLength with the window size (right - left + 1).
   - Subtract nums\[left] from currentSum and move left forward.
4. Return minLength (or 0 if no valid subarray found).

## Solution Code

```javascript
function minSubArrayLen(target, nums) {
  let n = nums.length;
  let minLength = Infinity;
  let left = 0;
  let currentSum = 0;

  for (let right = 0; right < n; right++) {
    currentSum += nums[right];
    while (currentSum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      currentSum -= nums[left];
      left++;
    }
  }

  return minLength !== Infinity ? minLength : 0;
}
```

## Time & Space Complexity

- **Time**: O(n) → Each element is processed at most twice (once by right, once by left).
- **Space**: O(1) → Constant extra space.

## Edge Cases

- Single Element: If nums\[0] >= target, return 1.
- No Valid Subarray: Return 0 (e.g., target > sum(nums)).
- All Elements Equal: Handle cases like nums = \[2,2,2], target = 3.

## Related Problems

- 1. Subarray Product Less Than K
- 1. Fruit Into Baskets
- 1. Longest Substring Without Repeating Characters
