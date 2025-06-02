Create a function `isPrime(n)` that determines whether a given number is prime. A prime number is a natural number greater than 1 that is only divisible by 1 and itself.

## Solution

```javascript
function isPrime(n) {
    if (n < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}
```

Core Logic:
1. If the number is less than 2, it's not prime.
2. Check for divisibility only up to the square root of n.
3. If any number divides n without a remainder, n is not prime.
4. If no such divisor is found, n is prime.

Usage

```javascript
console.log(isPrime(7));  // true
console.log(isPrime(17)); // true
console.log(isPrime(41)); // true
console.log(isPrime(4));  // false
```

## Complexity

Time Complexity: O(√n), where n is the input number.
Space Complexity: O(1), as it uses a constant amount of extra space.
