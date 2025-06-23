Functions are reusable blocks of code that perform a specific task. They help organize code into smaller, manageable pieces and allow for reuse.

## Basic Syntax

```javascript
// Declaration
function sayHi() {
  console.log('hi');
}

// Expression
const sayHello = function () {
  console.log('hello');
};

// Arrow Function
const greet = name => `Hello, ${name}`;
```

## Parameters and Arguments

```javascript
function sum(a, b = 0) {
  // Default parameter
  return a + b;
}
sum(1, 2); // 3
sum(1); // 1
```

## Return Statement

```javascript
function greet(name) {
  return `Hello, ${name}`;
  // Code after return is not executed
}
```

## Rest Parameters

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4); // 10
```

## Higher-Order Functions

```javascript
function higherOrderFunction(callback) {
  callback('Hello world');
}
higherOrderFunction(console.log);
```

## Arrow Functions

```javascript
const sum = (a, b) => a + b;
const printName = name => `Hi ${name}`;
```

## Anonymous Functions and Callbacks

```javascript
[1, 2, 3].map(function (num) {
  return num * 2;
});
[1, 2, 3].map(num => num * 2);
```

## Immediately Invoked Function Expression (IIFE)

```javascript
(function () {
  console.log('IIFE');
})();

(() => console.log('Arrow IIFE'))();
```

## Key Points

- Functions are first-class citizens in JavaScript.
- Function declarations are hoisted, expressions are not.
- Functions create their own scope.
- Recursive functions call themselves.
- `this` keyword behaves differently in arrow functions.
- Function methods: `call()`, `apply()`, and `bind()` for manipulating `this`.
