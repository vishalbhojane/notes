Currying is a technique of transforming a function with multiple arguments into a sequence of functions, each taking a single argument.

## Key Concepts:

1. Converts a function of `n` arguments into `n` functions of one argument each.
2. Allows partial application of a function's arguments.
3. Can be implemented using `bind()` or closures.

## Examples:

### Normal Function:

```javascript
const multiply = (x, y) => x * y;
const multiplyByTwo = y => 2 * y;
```

### Currying using `bind()`:

```javascript
const multiplyByTwo_Bind = multiply.bind(null, 2);
multiplyByTwo_Bind(3); // Returns 6
```

### Currying using Closures:

```javascript
const multiplyNew = x => y => x * y;
const multiplyByTwo_Closure = multiplyNew(2);
multiplyByTwo_Closure(3); // Returns 6
```

## Infinite Curry

```javascript
function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...nextArgs) => curried(...args, ...nextArgs);
  };
}
```

Usage

```javascript
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

Note: Here `fn.length` is number of parameters that `fn` expects, and `args.length` is number of arguments passed

## Advantages:

1. **Flexibility**: Create specialized functions from more general ones.
2. **Partial Application**: Apply some arguments now and the rest later.
3. **Composition**: Easily combine curried functions.

## Best Practices:

- Use currying for functions that are frequently called with the same initial arguments.
- Consider using libraries like Ramda or Lodash for advanced currying techniques.
- Be mindful of potential performance implications with excessive currying.
