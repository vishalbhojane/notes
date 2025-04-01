Create a class `ArrayWrapper` that wraps an array of numbers.
It should:

1. Implement `valueOf()` to return sum of all numbers
2. Implement `toString()` to return array in string format `[x,y,z]`

## Solution

```javascript
class ArrayWrapper {
  constructor(nums) {
    this.nums = nums;
  }

  valueOf() {
    return this.nums.reduce((sum, num) => sum + num, 0);
  }

  toString() {
    return `[${this.nums.join(',')}]`;
  }
}
```

## Usage

```javascript
const nums1 = new ArrayWrapper([1, 2]);
const nums2 = new ArrayWrapper([3, 4]);

console.log(nums1 + nums2); // 10
// Calls valueOf(): 1 + 2 + 3 + 4 = 10

console.log(String(nums1)); // "[1,2]"
// Calls toString()

console.log(nums1.toString()); // "[1,2]"

// Empty array
console.log(new ArrayWrapper([]) + nums1); // 3
console.log(String(new ArrayWrapper([]))); // "[]"
```
