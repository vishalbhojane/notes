Understanding scope and hoisting is crucial for avoiding bugs and writing predictable code.

## 1. Types of Scope

### A. Global Scope

Variables declared outside any function or block.

```javascript
const globalVar = "I'm global!"; // Global scope

function checkScope() {
  console.log(globalVar); // Accessible
}
checkScope();
```

### B. Function Scope

Variables declared inside a function are only accessible inside it.

```javascript
function myFunc() {
  var functionVar = "I'm function-scoped!";
  console.log(functionVar); // Works
}
// console.log(functionVar); // Error (not accessible outside)
```

### C. Block Scope (ES6: let, const)

Variables inside {} (if-statements, loops) are only accessible inside the block.

```javascript
if (true) {
  let blockVar = "I'm block-scoped!";
  const anotherBlockVar = 'Me too!';
  console.log(blockVar); // Works
}
// console.log(blockVar); // Error (not accessible outside)
```

## 2. var vs let vs const in Scope

| Keyword | Scope    | Hoisting                   | Reassignable | TDZ |
| ------- | -------- | -------------------------- | ------------ | --- |
| `var`   | Function | ✅ (initialized undefined) | ✅           | ❌  |
| `let`   | Block    | ❌ (hoisted but in TDZ)    | ✅           | ✅  |
| `const` | Block    | ❌ (hoisted but in TDZ)    | ❌           | ✅  |

    **Example:**

```javascript
// var (function-scoped, hoisted)
function varTest() {
  console.log(x); // undefined (hoisted)
  var x = 10;
}

// let/const (block-scoped, TDZ)
if (true) {
  // console.log(y); // ReferenceError (TDZ)
  let y = 20;
}
```

## 3. Hoisting

JavaScript moves var declarations and function declarations to the top of their scope.

### A. var Hoisting

Variables are hoisted but initialized as undefined.

```javascript
console.log(hoistedVar); // undefined (not an error)
var hoistedVar = 5;
```

### B. Function Hoisting

Function declarations are fully hoisted.

```javascript
sayHello(); // Works (function is hoisted)

function sayHello() {
  console.log('Hello!');
}
```

Function expressions (assigned to var, let, const) are not hoisted the same way.

```javascript
// sayHi(); // Error (sayHi is not a function yet)
const sayHi = function () {
  console.log('Hi!');
};
```

## 4. Temporal Dead Zone (TDZ)

A variable declared with let or const cannot be accessed before its declaration. The time between entering scope and the declaration is called the TDZ.

**Example (TDZ in Action):**

```javascript
// console.log(tdzVar); // ReferenceError (TDZ)
let tdzVar = "I'm in TDZ until declared!";
```

**Why TDZ Exists?**

- Prevents accidental usage before initialization
- Makes const behavior predictable (cannot be reassigned)
