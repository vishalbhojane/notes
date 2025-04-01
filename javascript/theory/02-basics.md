## Console Logging

Used for debugging and outputting messages to the browser's console.

| Method          | Usage Example                                                              |
| --------------- | -------------------------------------------------------------------------- |
| console.log()   | General output console.log("Hello, World!");                               |
| console.error() | Displays error messages console.error("File not found!");                  |
| console.warn()  | Displays warnings console.warn("Deprecated function!");                    |
| console.info()  | Informational messages console.info("User logged in.");                    |
| console.table() | Displays data in a table format console.table([{name: "Alice", age: 25}]); |

**Example:**

```javascript
console.log('This is a log message.');
console.error('This is an error!');
console.warn('This is a warning!');
```

## Comments

Used to document code or disable execution temporarily.

| Type        | Syntax Example  |
| ----------- | --------------- | ------------------------------------- |
| Single-line | `// comment`    | `// This is a single-line comment`    |
| Multi-line  | `/* comment */` | `/* This is a multi-line comment */ ` |

**Example:**

```javascript
// This is a single-line comment

/*  
This is a  
multi-line comment  
*/
```

## Strict Mode ('use strict';)

Enforces stricter parsing and error handling in JavaScript. It helps write safer, cleaner code by catching common mistakes.

### Key Effects of Strict Mode:

- Prevents accidental global variables (throws an error if a variable is undeclared).
- Disallows duplicate parameter names in functions.
- Makes this in functions undefined instead of defaulting to the global object.
- Throws errors for deprecated features (e.g., with statement).

### How to Use:

```javascript
'use strict'; // Applies to the entire script

function myFunction() {
  'use strict'; // Applies only to this function
  // Strict mode code here
}
```

**Example Without Strict Mode:**

```javascript
x = 10; // No error (creates a global variable)
console.log(x); // 10
```

**Example With Strict Mode:**

```javascript
'use strict';
x = 10; // ReferenceError: x is not defined
```
