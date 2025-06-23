The Call Stack in JavaScript tracks function execution using the Last In, First Out (LIFO) principle.

## Key Points:

- Most recently called function is completed first
- Each function call adds a new frame to the stack top
- When a function completes, its frame is removed from the stack

## Basic Example:

```js
function greeting() {
  sayHi();
}
function sayHi() {
  return 'Hi!';
}
greeting();
```

Stack progression:

1. Empty stack 2. `greeting` added
2. `sayHi` added on top of `greeting`
3. `sayHi` completes and is removed
4. `greeting` completes and is removed
5. Stack is empty again

## Detailed Example:

```js
function f1() {
  console.log('Hi by f1!');
}

function f2() {
  f1();
  console.log('Hi by f2!');
}

f2();
```

Stack progression:

1. Global execution context
2. `f2()` added
3. `f1()` added on top of `f2()`
4. `console.log()` for f1 added
5. `console.log()` for f1 completes and is removed
6. `f1()` completes and is removed
7. `console.log()` for f2 added
8. `console.log()` for f2 completes and is removed
9. `f2()` completes and is removed
10. Only global execution context remains
