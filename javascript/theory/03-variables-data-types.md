## Variables

Variables are containers for storing data values in JavaScript.

### Variable Declarations (`var`, `let`, `const`)

| Keyword | Scope             | Hoisting                           | Reassignable             | Example         |
| ------- | ----------------- | ---------------------------------- | ------------------------ | --------------- |
| var     | Function-scoped   | Hoisted (initialized as undefined) | Yes                      | `var x = 10;`   |
| let     | Block-scoped `{}` | Hoisted (but in TDZ)               | Yes                      | `let y = 20;`   |
| const   | Block-scoped `{}` | Hoisted (but in TDZ)               | No (must be initialized) | `const z = 30;` |

### Key Differences:

- `var` is function-scoped and can be redeclared (avoid in modern JS).
- `let` & `const` are block-scoped (preferred).
- `const` must be assigned at declaration and cannot be reassigned (but object/array properties can be modified).

**Example:**

```javascript
var a = 1; // Avoid (legacy)
let b = 2; // Reassignable
const c = 3; // Immutable (but objects/arrays can be modified)

if (true) {
  var a = 10; // Same variable
  let b = 20; // New block-scoped variable
}
console.log(a); // 10 (var leaks out)
console.log(b); // 2 (let is block-scoped)
```

> TDZ (Temporal Dead Zone): `let`/`const` variables exist but cannot be accessed until declared.

## Primitive Data Types (Immutable)

| Type      | Description Example                                        |
| --------- | ---------------------------------------------------------- |
| String    | Text (in '', "", or \`\`) "Hello", 'World', \`Hi ${name}\` |
| Number    | Integers & floats 42, 3.14, NaN, Infinity                  |
| Boolean   | true or false true, false                                  |
| Undefined | Uninitialized variable let x; (default: undefined)         |
| Null      | Intentional empty value let y = null;                      |
| Symbol    | Unique identifier const sym = Symbol('id');                |
| BigInt    | Large integers (suffix n) 9007199254740991n                |

**Example:**

```javascript
let name = 'Alice'; // String
let age = 25; // Number
let isStudent = true; // Boolean
let nothing = null; // Null
let unknown; // Undefined
const id = Symbol('id'); // Symbol
const bigNum = 12345678901234567890n; // BigInt
```

## Reference Types (Mutable)

| Type       | Description         | Example                                 |
| ---------- | ------------------- | --------------------------------------- |
| `Object`   | Key-value pairs     | `{ name: "Alice", age: 25 }`            |
| `Array`    | Ordered list        | `[1, 2, 3]`                             |
| `Function` | Reusable code block | `function greet() { return "Hello!"; }` |

**Example:**

```javascript
const person = {name: 'Bob', age: 30}; // Object
const numbers = [1, 2, 3]; // Array
function sayHi() {
  return 'Hi!';
} // Function
```

## Type Checking

| Method     | Usage Example                                         |
| ---------- | ----------------------------------------------------- |
| typeof     | Checks primitive types `typeof "hello"` → `"string"`  |
| instanceof | Checks reference types `[] instanceof Array` → `true` |

**Example:**

```javascript
console.log(typeof 42); // "number"
console.log(typeof []); // "object" (limitation)
console.log([] instanceof Array); // true
```

## Type Conversion (Explicit)

| Function    | Converts To | Example                 |
| ----------- | ----------- | ----------------------- |
| `String()`  | `String`    | `String(123)` → `"123"` |
| `Number()`  | `Number`    | `Number("42")` → `42`   |
| `Boolean()` | `Boolean`   | `Boolean(1)` → `true`   |

**Example:**

```javascript
let num = Number('123'); // 123 (number)
let str = String(123); // "123" (string)
let bool = Boolean(1); // true
```

## Type Coercion (Implicit Conversion)

JavaScript automatically converts types in operations:

```javascript
console.log(1 + '1'); // "11" (number → string)
console.log('5' - 2); // 3 (string → number)
console.log('5' * '2'); // 10
console.log(5 + null); // 5 (null → 0)
console.log('abc' * 2); // NaN
```

### Key Rules:

- `+` favors string concatenation if one operand is a string.
- Other operators (`-`, `*`, `/`) favor number conversion.

## Key Takeaways

- Use `let` & `const` (avoid `var`).
- Primitives are immutable; Reference types are mutable.
- `typeof` checks primitives; `instanceof` checks objects.
- Explicit conversion (`Number()`, `String()`) is safer than implicit coercion.
