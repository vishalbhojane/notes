Control flow determines the order in which statements are executed in a program.

## 1. Conditional Statements

### A. if...else Statements

Used to execute code based on a condition.

**Syntax:**

```javascript
if (condition) {
  // code to run if condition is true
} else if (anotherCondition) {
  // code to run if anotherCondition is true
} else {
  // code to run if all conditions are false
}
```

**Example:**

```javascript
let age = 18;

if (age < 13) {
  console.log('Child');
} else if (age < 18) {
  console.log('Teenager');
} else {
  console.log('Adult');
}
// Output: "Adult"
```

### B. switch Statement

Used for multiple conditions (alternative to long if...else chains).

**Syntax:**

```javascript
switch (expression) {
  case value1:
    // code to run if expression === value1
    break;
  case value2:
    // code to run if expression === value2
    break;
  default:
  // code to run if no cases match
}
```

**Example:**

```javascript
let day = 'Monday';

switch (day) {
  case 'Monday':
    console.log('Start of the week');
    break;
  case 'Friday':
    console.log('Weekend is near!');
    break;
  default:
    console.log('Regular day');
}
// Output: "Start of the week"
```

> Note: `break` prevents "fall-through" (executing multiple cases).

## 2. Ternary Operator (? :)

A shorthand for if...else.

**Syntax:**

```javascript
condition ? exprIfTrue : exprIfFalse;
```

**Example:**

```javascript
let age = 20;
let status = age >= 18 ? 'Adult' : 'Minor';
console.log(status); // "Adult"
```

## 3. Nullish Coalescing (??)

Returns the right-hand operand if the left-hand operand is null or undefined.

**Syntax:**

```javascript
leftExpr ?? rightExpr;
```

**Example:**

```javascript
let userInput = null;
let username = userInput ?? 'Guest';
console.log(username); // "Guest"
```

**Difference from || (Logical OR):**

- || checks for falsy values (0, "", false, null, undefined)
- ?? only checks for null or undefined

```javascript
let count = 0;
console.log(count || 10); // 10 (0 is falsy)
console.log(count ?? 10); // 0 (only null/undefined are replaced)
```

## 4. Short-Circuit Evaluation (&&, ||)

Logical operators can be used for conditional execution.

### A. Logical AND (&&)

- If the first operand is truthy, returns the second operand
- If the first operand is falsy, returns the first operand

**Example:**

```javascript
let isLoggedIn = true;
let message = isLoggedIn && 'Welcome back!';
console.log(message); // "Welcome back!"
```

### B. Logical OR (||)

- If the first operand is falsy, returns the second operand
- If the first operand is truthy, returns the first operand

**Example:**

```javascript
let defaultName = 'Guest';
let userName = '' || defaultName;
console.log(userName); // "Guest" ("" is falsy)
```
