Create a function `fibonacci(n)` that returns the nth number in the Fibonacci sequence. The Fibonacci sequence is defined as follows: the first two numbers are 0 and 1, and each subsequent number is the sum of the two preceding ones.

## Solution (Recursive Approach)

```javascript
function fibonacci(n) {
    if (n < 2) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

Core Logic:
1. Base cases: if n is 0 or 1, return n.
2. Recursive case: return the sum of the (n-1)th and (n-2)th Fibonacci numbers.

## Solution (Iterative Approach)

```javascript
function fibonacci(n) {
    if (n < 2) {
        return n;
    }
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

Core Logic:
1. Handle base cases for n < 2.
2. Use two variables to store the two most recent Fibonacci numbers.
3. Iterate from 2 to n, updating these variables in each iteration.

Usage

```javascript
console.log(fibonacci(0)); // 0
console.log(fibonacci(1)); // 1
console.log(fibonacci(5)); // 5
console.log(fibonacci(10)); // 55
```

Fibonacci Sequence Logic:

```text
F(n) = F(n-1) + F(n-2)
F(2) = F(1) + F(0) = 1 + 0 = 1
F(3) = F(2) + F(1) = 1 + 1 = 2
F(4) = F(3) + F(2) = 2 + 1 = 3
...
```

## Complexity

Recursive Approach:
- Time Complexity: O(2^n), as each call branches into two more calls.
- Space Complexity: O(n) due to the call stack.

Iterative Approach:
- Time Complexity: O(n), where n is the input number.
- Space Complexity: O(1), as it uses a constant amount of extra space.

Note: The recursive approach, while elegant, is highly inefficient for large n due to repeated calculations. The iterative approach is much more efficient and is preferred for larger values of n.

Optimizations:
1. Memoization can be used to improve the recursive approach, reducing time complexity to O(n).
2. For very large n, consider using BigInt in JavaScript to handle integer overflow.
3. There are also matrix exponentiation methods that can calculate Fibonacci numbers in O(log n) time.