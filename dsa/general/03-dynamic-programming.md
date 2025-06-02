Dynamic Programming is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems. It is applicable when a problem exhibits two key properties:

### 1. Optimal Substructure

A problem has optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems.

Examples:
- Shortest Path Problem
- Knapsack Problem

### 2. Overlapping Subproblems

This occurs when a problem's subproblems are solved multiple times. Dynamic programming stores these results to avoid redundant calculations.

Examples:
- Fibonacci Sequence
- Coin Change Problem

### Fibonacci Sequence Implementation

1. Naive Recursive Approach (O(2^n)):

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

2. Memoization (Top-down, O(n)):

```javascript
function fib(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}
```

3. Tabulation (Bottom-up, O(n)):

```javascript
function fib(n) {
  let fibArray = [0, 1];
  for (let i = 2; i <= n; i++) {
    fibArray[i] = fibArray[i - 1] + fibArray[i - 2];
  }
  return fibArray[n];
}
```

Note: The bottom-up approach is generally more efficient as it avoids the overhead of recursive calls and uses less memory.