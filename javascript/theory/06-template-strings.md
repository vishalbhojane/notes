Template strings offer an easy way to interpolate variables and expressions into strings.

## Basic Usage

```javascript
let a = 'Hello';
let b = 'World';

// Regular string concatenation
console.log(a + ' ' + b); // Output: Hello World

// Template string (using backticks)
console.log(`${a} ${b}`); // Output: Hello World
```

## Features

Expression interpolation:

```javascript
console.log(`The sum is: ${2 + 3}`); // Output: The sum is: 5
```

Multiline strings:

```javascript
let multiline = `
     This is a
     multiline string.
   `;
```

Can include any valid JavaScript expression inside `${}`:

```javascript
let name = 'Alice';
console.log(`Hello, ${name.toUpperCase()}!`); // Output: Hello, ALICE!
```
