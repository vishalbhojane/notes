## Problem Statement

Given an integer array nums, return an array answer where answer\[i] is the product of all elements in nums except nums\[i]. The algorithm must run in O(n) time and without using division.

## Examples

text

```text
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Explanation:
answer[0] = 2*3*4 = 24
answer[1] = 1*3*4 = 12
answer[2] = 1*2*4 = 8
answer[3] = 1*2*3 = 6

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
Explanation:
answer[2] = (-1)*1*(-3)*3 = 9 (other positions have 0 due to multiplication by 0).
```

## Constraints

- 2 <= nums.length <= 1e5
- -30 <= nums\[i] <= 30
- The product of any prefix/suffix fits in a 32-bit integer.

## Intuition

**Key Insight**: The product except nums\[i] is the product of elements to its left (prefix) multiplied by the product of elements to its right (suffix).

**Optimization**: Compute prefix products in one pass, then multiply by suffix products in a reverse pass.

## Approach

1. Initialize answer array with 1s.
2. Prefix Pass (Left to Right):
    - Store the product of all elements left of i in answer\[i].
    - Update the running prefix product.
3. Suffix Pass (Right to Left):
    - Multiply answer\[i] by the product of all elements right of i (stored in suffix).
    - Update the running suffix product.

## Solution Code

javascript

```javascript
function productExceptSelf(nums) {
    const n = nums.length;
    const answer = new Array(n).fill(1);
    
    // Prefix pass (left to right)
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = prefix;
        prefix *= nums[i];
    }
    
    // Suffix pass (right to left)
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }
    
    return answer;
}
```

## Time & Space Complexity

- **Time**: O(n) → Two passes through the array.
- **Space**: O(1) → Output array answer is not counted as extra space (problem allows modification).

## Edge Cases

- Zeroes: Handled naturally (e.g., nums = \[0,1,2] → \[2,0,0]).
- Negative Numbers: Product signs are preserved.
- Single Zero: nums = \[0,4] → \[4,0].

## Related Problems

- 1. Maximum Product Subarray
- 1. Trapping Rain Water (similar prefix/suffix logic)

## Key Takeaways

1. **Two-Pass Technique**: Efficiently compute prefix and suffix products without division.
2. **Space Optimization**: Reuse the output array to store intermediate results.
3. **Handling Zeroes**: The product becomes zero if any element except nums\[i] is zero.