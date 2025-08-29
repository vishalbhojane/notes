Memoization is an optimization technique that speeds up applications by caching the results of expensive function calls and returning the cached result when the same inputs occur again.

## Key Concepts:

1. Caches function results based on input arguments.
2. Improves performance for expensive computations or I/O-bound operations.
3. Particularly useful for recursive or repetitive function calls.

## Example: Fibonacci Sequence

### Without Memoization:

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

### With Memoization:

```javascript
function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));
}
```

## Generic Memoize Function:

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = args.length > 1 ? JSON.stringify(args) : args[0];
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

## LRU Memoize with Size Limit

```javascript
function memoize(fn, maxSize = 100) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value); // move to most recent
      return value;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    if (cache.size > maxSize) {
      cache.delete(cache.keys().next().value); // evict oldest
    }
    return result;
  };
}
```

## Usage:

```javascript
function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}

const memoizedFib = memoize(fib);

console.log(memoizedFib(15)); // First computation
console.log(memoizedFib(15)); // Returns cached result
```

## Best Practices:

- Use memoization for pure functions with expensive computations.
- Be cautious with memory usage, especially for functions with many possible inputs.
- Consider using libraries like Lodash for more advanced memoization features.
- Clear the cache periodically if the function's output might change over time.

## Considerations:

- Memoization trades memory for speed.
- Not suitable for functions with side effects or those dependent on external state.
- The effectiveness depends on the frequency of repeated calls with the same arguments.

Remember: While memoization can significantly improve performance in certain scenarios, it's important to profile your application to ensure it's beneficial in your specific use case.
