JavaScript has some quirky behaviors and hidden gems. Here's a collection of interesting trivia!

## 1. The Weird Parts

### A. NaN is Not Equal to Itself

```javascript
console.log(NaN === NaN); // false
```

**Why?**

- `NaN` (Not a Number) is the only value in JavaScript that is not equal to itself
- Fix: Use `isNaN()` or `Number.isNaN()`

### B. `0.1 + 0.2 !== 0.3`

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
```

**Why?**

- Floating-point precision errors (binary can't perfectly represent decimals)
- Fix: Round numbers or use libraries like decimal.js

### C. `[] + {}` vs `{} + []`

```javascript
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0 (in some environments)
```

**Why?**

- `[] + {}` → `Array` converts to `""`, `Object` to `"[object Object]"`
- `{} + []` → `{}` is treated as a code block, `+[]` converts to `0`

## 2. Historical Oddities

### A. `typeof null` is `"object"`

```javascript
console.log(typeof null); // "object"
```

**Why?**

- A bug from 1995 (JS creator Brendan Eich admitted this was a mistake)

### B. `Array.prototype.sort()`

Default Behavior

```javascript
console.log([10, 2, 1].sort()); // [1, 10, 2]
```

**Why?**

- Sorts elements as strings by default
- Fix:

```javascript
[10, 2, 1].sort((a, b) => a - b); // [1, 2, 10]
```

### C. "5" + 3 vs "5" - 3

```javascript
console.log('5' + 3); // "53" (string concatenation)
console.log('5' - 3); // 2 (numeric subtraction)
```

**Why?**

- `+` favors string concatenation if one operand is a string
- `-` always converts to numbers

## 3. Hidden Gems

### A. The Comma Operator

```javascript
let x = (1, 2, 3);
console.log(x); // 3 (returns the last value)
```

**Use Case:**

```javascript
for (let i = 0, j = 10; i < j; i++, j--) {
  /* ... */
}
```

### B. `void 0` vs `undefined`

```javascript
console.log(void 0 === undefined); // true
```

**Why?**

- `void` always returns `undefined`. Used in older code to avoid `undefined` being reassigned

### C. `!!` Double Negation Trick

```javascript
console.log(!!'hello'); // true (converts to boolean)
```

**Use Case:**

- Force any value to `true`/`false`

## 4. Fun Experiments

### A. `Array(3).map(() => "a")`

```javascript
console.log(Array(3).map(() => 'a')); // [empty × 3]
```

**Why?**

- `Array(3)` creates a sparse array (no actual indices)
- Fix:

```javascript
console.log([...Array(3)].map(() => 'a')); // ["a", "a", "a"]
```

### B. `Math.min()` > `Math.max()`

```javascript
console.log(Math.min() > Math.max()); // true
```

**Why?**

- `Math.min()` → `Infinity` (no args = neutral element)
- `Math.max()` → `-Infinity` (no args = neutral element)

### C. `"😂".length`

```javascript
console.log('😂'.length); // 2
```

**Why?**

- JavaScript uses UTF-16, and emojis are surrogate pairs
- Fix:

```javascript
console.log([...'😂'].length); // 1 (using spread)
```

## 5. WTF JavaScript

### A. `true == "true"`

```javascript
console.log(true == 'true'); // false
```

**Why?**

- `true` → `1` (number)
- `"true"` → `NaN` (when converted to number)

### B. `"b" + "a" + + "a" + "a"`

```javascript
console.log('b' + 'a' + +'a' + 'a'); // "baNaNa"
```

**Why?**

- `+"a"` → `NaN` (failed number conversion)
- Concatenation: `"ba" + NaN + "a"` → `"baNaNa"`

### C. `(! + [] + [] + ![]).length`

```javascript
console.log((!+[] + [] + ![]).length); // 9
```

**Breakdown:**

1. `+[]` → `0` (empty array → 0)
2. `!0` → `true`
3. `true + []` → `"true" `(string conversion)
4. `![]` → `false`
5. `"true" + "false"` → `"truefalse"`
6. `"truefalse".length` → `9`

---

## 1. The `Array.prototype.sort()` Mystery

### A. Sorting with `undefined`

```javascript
const arr = [1, undefined, 2];
arr.sort();
console.log(arr); // [1, 2, undefined] (Why isn't `undefined` last?)
```

**Why?**

- undefined is treated as the highest possible value in sorts

### B. `[10, 2, 1].sort()` vs `['10', '2', '1'].sort()`

```javascript
console.log([10, 2, 1].sort()); // [1, 10, 2] (WTF?)
console.log(['10', '2', '1'].sort()); // ['1', '10', '2'] (Correct?)
```

**Why?**

- Default `sort()` converts numbers to strings before comparing

## 2. The Case of the Vanishing `this`

### A. Method Losing `this`

```javascript
const obj = {
  name: 'Alice',
  greet: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

const greet = obj.greet;
greet(); // "Hello, undefined!" (Where did `this` go?)
```

**Fix:**

```javascript
greet.call(obj); // Or use `bind()`
```

### B. Arrow Functions & this

```javascript
const obj = {
  name: 'Bob',
  greet: () => console.log(`Hello, ${this.name}!`),
};
obj.greet(); // "Hello, undefined!" (Arrow functions don't bind `this`)
```

**Why?**

- Arrow functions inherit this from the parent scope (lexical scoping)

## 3. The `instanceof` Trap

### A. Primitive Types Fail

```javascript
console.log('hello' instanceof String); // false
console.log(123 instanceof Number); // false
```

**Why?**

- `instanceof` only works with objects, not primitives

### B. Cross-Frame/Window Issues

```javascript
// If you create an array in an iframe:
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const frameArray = window.frames[0].Array;
const arr = new frameArray(1, 2, 3);

console.log(arr instanceof Array); // false (WTF?)
```

**Why?**

- Each frame has its own global Array constructor

## 4. The `with` Statement (Deprecated but Wild)

javascript

```javascript
const obj = {a: 1, b: 2};

with (obj) {
  console.log(a + b); // 3 (Works, but DON'T USE THIS!)
}
```

**Why Avoid It?**

- Security risks (modifies scope dynamically)
- Hurts performance (disables optimizations)
- Strict mode bans it

  ## 5. The `arguments` Object Trickery

  ### A. It's Not a Real Array

```javascript
function sum() {
  return arguments.reduce((a, b) => a + b); // TypeError!
}
sum(1, 2, 3);
```

**Fix:**

```javascript
function sum() {
  return [...arguments].reduce((a, b) => a + b); // Convert to array
}
```

### B. `arguments` vs Arrow Functions

```javascript
const fn = () => console.log(arguments);
fn(1, 2, 3); // ReferenceError: `arguments` not defined
```

**Why?**

- Arrow functions don't have `arguments`

## 6. The debugger Statement Shenanigans

### A. Conditional Breakpoints

```javascript
let x = 10;
if (x > 5) debugger; // Pauses ONLY if DevTools is open
```

**Use Case:**

- Debugging without littering `console.log()`

### B. Minification Surprise

```javascript
// Before minification:
if (condition) debugger;

// After minification:
if (condition) debugger; // Still works!
```

**Why?**

- debugger is a reserved keyword, so minifiers leave it untouched

## 7. The `String.raw` Tagged Template

```javascript
const path = String.raw`C:\Users\Alice\file.txt`;
console.log(path); // "C:\Users\Alice\file.txt" (No escaping!)
```

**Use Case:**

- Writing Windows file paths or regex without double backslashes

## 8. The in Operator's Hidden Power

### A. Checking Array Indices

```javascript
const arr = [1, 2, 3];
console.log(1 in arr); // true (index exists)
console.log(3 in arr); // false (out of bounds)
```

### B. Prototype Chain Checks

```javascript
console.log('toString' in {}); // true (inherited from Object.prototype)
```

## 9. The `void` Operator's Weirdness

```javascript
console.log(void 0 === undefined); // true
console.log(void (1 + 1)); // undefined
```

**Historical Use:**

- Prevents navigation in `<a href="javascript:void(0)">`
- Ensures undefined isn't overwritten (in older JS)

## 10. The Ultimate WTF: `([] + [])`

```javascript
console.log([] + []); // "" (empty string)
console.log({} + []); // "[object Object]" or 0 (depends on context)
console.log([] + {}); // "[object Object]"
console.log({} + {}); // "[object Object][object Object]" or NaN
```

**Why?**

- `+` triggers string concatenation for objects/arrays
- `{}` at the start of a line is treated as a code block (hence `{} + []` → `0`)

**Want to break JavaScript yourself? Try:**

```javascript
console.log((![] + [])[+[]]); // "f" (from "false")
```
