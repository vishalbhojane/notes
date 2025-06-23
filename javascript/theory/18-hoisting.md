Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope (either the current function or global scope) before code execution.

## Function Hoisting

Function declarations are fully hoisted.

```javascript
console.log(sum(1, 2)); // Outputs: 3

function sum(a, b) {
  return a + b;
}
```

## Variable Hoisting

`var` declarations are hoisted, but not their initializations.

```javascript
console.log(x); // Outputs: undefined
var x = 5;

// Equivalent to:
var x;
console.log(x);
x = 5;
```

## Let and Const

`let` and `const` declarations are hoisted but not initialized, resulting in a "temporal dead zone".

```javascript
console.log(y); // Throws ReferenceError
let y = 10;
```

## Function Expressions

Function expressions using `var` are hoisted like variables.

```javascript
console.log(multiply); // Outputs: undefined
console.log(multiply(2, 3)); // Throws TypeError

var multiply = function (a, b) {
  return a * b;
};
```

## Arrow Functions

Arrow functions, being a form of function expression, behave like `let` and `const` declarations.

```javascript
console.log(divide); // Throws ReferenceError

const divide = (a, b) => a / b;
```

## Best Practices

1. Declare variables at the top of their scope to mimic hoisting behavior and improve code readability.
2. Use `let` and `const` instead of `var` to avoid unexpected hoisting behavior.
3. Define functions before calling them to maintain clear code structure.

## Key Points:

1. Function declarations are fully hoisted.
2. `var` declarations are hoisted and initialized with `undefined`.
3. `let` and `const` declarations are hoisted but not initialized (temporal dead zone).
4. Function expressions and arrow functions are not hoisted (when declared with `let` or `const`).
5. Understanding hoisting helps in avoiding unexpected behavior and writing more predictable code.
