Create a function `factorial(n)` that calculates the factorial of a non-negative integer n. The factorial of a number is the product of all positive integers less than or equal to that number.

## Solution (Iterative Approach)

```javascript
function factorial(n) {
    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}
```

Core Logic:
1. Initialize the result to 1.
2. Multiply the result by each integer from 2 to n.
3. Return the final product.

## Solution (Recursive Approach)

```javascript
function factorial(n) {
    if (n === 0) {
        return 1;
    }

    return n * factorial(n - 1);
}
```

Core Logic:
1. Base case: if n is 0, return 1 (0! is defined as 1).
2. Recursive case: return n multiplied by the factorial of (n-1).

Usage

```javascript
console.log(factorial(5)); // 120
```

Recursive Logic Breakdown:

```text
5! = 5 * 4!
5! = 5 * 4 * 3!
5! = 5 * 4 * 3 * 2!
5! = 5 * 4 * 3 * 2 * 1!
5! = 5 * 4 * 3 * 2 * 1 * 0!
5! = 5 * 4 * 3 * 2 * 1 * 1
```

## Complexity

Iterative Approach:
- Time Complexity: O(n), where n is the input number.
- Space Complexity: O(1), as it uses a constant amount of extra space.

Recursive Approach:
- Time Complexity: O(n), where n is the input number.
- Space Complexity: O(n) due to the call stack.