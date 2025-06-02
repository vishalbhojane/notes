Create a function `fibonacci(n)` that generates the Fibonacci sequence up to the nth number. The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.

## Solution

```javascript
function fibonacci(n) {
    const sequence = [0, 1];

    for (let i = 2; i < n; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }

    return sequence;
}
```

Core Logic:
1. Initialize the sequence with the first two Fibonacci numbers: 0 and 1.
2. Iterate from 2 to n-1.
3. For each iteration, calculate the next Fibonacci number by summing the two preceding numbers.
4. Add the calculated number to the sequence.
5. Return the complete sequence.

Usage

```javascript
console.log(fibonacci(5));  // [0, 1, 1, 2, 3]
console.log(fibonacci(8));  // [0, 1, 1, 2, 3, 5, 8, 13]
```

Fibonacci Sequence Explanation:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) for n > 1

## Complexity

Time Complexity: O(n), where n is the input number. The function performs a single loop from 2 to n-1.

Space Complexity: O(n), as it stores the entire Fibonacci sequence up to the nth number in an array.

Note: This implementation is efficient for generating the entire Fibonacci sequence up to a given number. It's more space-efficient than recursive approaches and allows easy access to any Fibonacci number in the sequence once generated.
