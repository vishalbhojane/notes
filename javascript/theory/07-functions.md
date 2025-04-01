## 1. Function Declarations vs. Expressions

| Feature  | Function Declaration                  | Function Expression              |
| -------- | ------------------------------------- | -------------------------------- |
| Syntax   | `function name() {}`                  | `const name = function() {}`     |
| Hoisting | ✅ (Can be called before declaration) | ❌ (Must be defined before use)  |
| Use Case | General-purpose functions             | Assigning functions to variables |

**Example:**

```javascript
// Function Declaration (hoisted)
sayHello(); // Works
function sayHello() {
  console.log('Hello!');
}

// Function Expression (not hoisted)
const greet = function () {
  console.log('Hi!');
};
greet(); // Must be called after definition
```

## 2. Arrow Functions (ES6+)

Shorter syntax, lexical `this` (inherits from parent scope).

**Syntax:**

```javascript
const funcName = (param1, param2) => {
  // function body
  return value;
};

// Single-line implicit return
const add = (a, b) => a + b;
```

**Example:**

```javascript
const square = (x) => x * x;
console.log(square(5)); // 25
```

> Note:
>
> - No arguments object
> - Cannot be used as constructors (new)

## 3. Default Parameters

Sets a default value if an argument is missing.

**Syntax:**

```javascript
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}
```

**Example:**

```javascript
greet(); // "Hello, Guest!"
greet('Alice'); // "Hello, Alice!"
```

## 4. Rest Parameters (...args)

Collects remaining arguments into an array.

**Syntax:**

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
```

**Example:**

```javascript
console.log(sum(1, 2, 3)); // 6
```

Difference from arguments object:

- `arguments` is array-like (not a real array)
- Rest parameters (`...args`) are real arrays

## 5. Closures

A function that remembers its lexical scope even when executed outside it.

**Example:**

```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
```

**Use Cases:**

- Data privacy (module pattern)
- Currying & partial applications

## 6. IIFE (Immediately Invoked Function Expression)

A function that runs immediately after definition.

**Syntax:**

```javascript
(function () {
  // code here
})();

// Arrow function IIFE
(() => {
  // code here
})();
```

**Example:**

```javascript
(function () {
  console.log('Runs immediately!');
})();
```

**Use Cases:**

- Avoiding global scope pollution
- Module patterns (before ES6 modules)

## 7. Higher-Order Functions

Functions that:

- Take other functions as arguments, or
- ✔ Return a function

**Example (Taking a Function):**

```javascript
function operate(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
console.log(operate(3, 4, add)); // 7
```

**Example (Returning a Function):**

```javascript
function multiplier(factor) {
  return (x) => x * factor;
}

const double = multiplier(2);
console.log(double(5)); // 10
```

## 8. Function Binding (call, apply, bind)

Used to control `this` in functions.

| Method  | Syntax                                 | Purpose                                       |
| ------- | -------------------------------------- | --------------------------------------------- |
| call()  | `func.call(thisArg, arg1, arg2)`       | Calls function with given this and arguments  |
| apply() | `func.apply(thisArg, [argsArray])`     | Same as call, but takes an array of arguments |
| bind()  | `const boundFunc = func.bind(thisArg)` | Returns a new function with fixed this        |

**Example:**

```javascript
const person = {
  name: 'Alice',
  greet: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

const anotherPerson = {name: 'Bob'};

person.greet.call(anotherPerson); // "Hello, Bob!"
person.greet.apply(anotherPerson); // "Hello, Bob!"

const boundGreet = person.greet.bind(anotherPerson);
boundGreet(); // "Hello, Bob!"
```
