A closure is a combination of a function bundled together with references to its surrounding state (lexical environment).

## Key Points:

- Closures provide access to an outer function's scope from an inner function.
- To create a closure, define a function inside another function and expose it by returning it or passing it to another function.
- Closures can access variables from outer scopes, but not vice versa.

## Basic Example:

```javascript
function outer() {
  let a = 7;
  function inner() {
    console.log(a);
  }
  return inner;
}
let closure = outer();
closure(); // Outputs: 7
```

## Important Concepts:

1. **Lexical Scope**: Closures retain access to variables in their lexical scope, even after the outer function has finished executing.
2. **Reference Persistence**: Closures store references to variables, not their values at the time of creation.

```javascript
function outer() {
  let a = 7;
  function inner() {
    console.log(a);
  }
  a = 100;
  return inner;
}
let closure = outer();
closure(); // Outputs: 100
```

3. **Nested Closures**: Closures can be chained, accessing variables from multiple outer scopes.

## Use Cases:

- Module design pattern
- Currying - Function memoization
- State management in asynchronous operations
- Implementing private variables and methods

## Best Practices:

- Use closures judiciously to avoid memory leaks
- Be aware of the performance implications of creating many closures
