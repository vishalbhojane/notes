## 1. Traditional Loops

### A. for Loop

Best for looping a specific number of times.

**Syntax:**

```javascript
for (initialization; condition; update) {
  // code to run
}
```

**Example:**

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

### B. while Loop

Runs while a condition is true.

**Syntax:**

```javascript
while (condition) {
  // code to run
}
```

**Example:**

```javascript
let i = 0;
while (i < 5) {
  console.log(i); // 0, 1, 2, 3, 4
  i++;
}
```

### C. do...while Loop

Runs at least once before checking the condition.

**Syntax:**

```javascript
do {
  // code to run
} while (condition);
```

**Example:**

```javascript
let i = 0;
do {
  console.log(i); // 0 (runs once even if condition is false)
  i++;
} while (i < 0);
```

## 2. Modern Iteration (for...of, for...in)

### A. for...of (Iterables: Arrays, Strings, Maps, Sets)

Loops through values of an iterable.

**Syntax:**

```javascript
for (const item of iterable) {
  // code to run
}
```

**Example:**

```javascript
const fruits = ['Apple', 'Banana', 'Orange'];

for (const fruit of fruits) {
  console.log(fruit); // "Apple", "Banana", "Orange"
}
```

### B. for...in (Objects: Loops through keys)

Loops through enumerable properties of an object.

**Syntax:**

```javascript
for (const key in object) {
  // code to run
}
```

**Example:**

```javascript
const person = {name: 'Alice', age: 25};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output: "name: Alice", "age: 25"
```

> Note: Avoid using for...in with arrays (use for...of instead).

## 3. Loop Control Statements

### A. break

Exits the entire loop.

**Example:**

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}
```

### B. continue

Skips the current iteration and moves to the next.

**Example:**

javascript

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0, 1, 3, 4 (skips 2)
}
```

## 4. Array Methods as Loops

### A. forEach()

Executes a function for each array element.

**Syntax:**

```javascript
array.forEach((item, index, array) => {
  // code to run
});
```

**Example:**

```javascript
const numbers = [1, 2, 3];

numbers.forEach((num) => {
  console.log(num); // 1, 2, 3
});
```

### B. map()

Creates a new array by transforming each element.

**Syntax:**

```javascript
const newArray = array.map((item, index, array) => {
  return modifiedItem;
});
```

**Example:**

```javascript
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6]
```

### C. filter()

Creates a new array with elements that pass a test.

**Syntax:**

```javascript
const filteredArray = array.filter((item, index, array) => {
  return condition;
});
```

**Example:**

```javascript
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2]
```

### D. reduce()

Reduces an array to a single value (e.g., sum).

**Syntax:**

```javascript
const result = array.reduce((accumulator, currentValue, index, array) => {
  return updatedAccumulator;
}, initialValue);
```

**Example:**

```javascript
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 6
```
