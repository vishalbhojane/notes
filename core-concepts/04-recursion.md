Recursion is a programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar sub-problems.

## Key Concepts:

1. A recursive function calls itself.
2. Must have a base case (exit condition) to prevent infinite recursion.
3. Each recursive call should work towards the base case.

## Examples:

### Basic Structure:

```javascript
function recursiveFunction() {
  if (baseCase) {
    return someValue;
  }
  // Recursive call
  return recursiveFunction();
}
```

### Print Numbers 1 to 10:

```javascript
function printNumber(number) {
  if (number > 10) return;
  console.log(number);
  printNumber(number + 1);
}
printNumber(1);
```

### Sum Numbers Below:

```javascript
function sumNumbersBelow(number) {
  if (number <= 0) return 0;
  return number + sumNumbersBelow(number - 1);
}
const result = sumNumbersBelow(10);
```

### Traverse Nested Objects:

```javascript
const person = {
  name: 'Kyle',
  friend: {
    name: 'Joe',
    friend: {
      name: 'Sally',
    },
  },
};

function printNames(currentPerson) {
  if (currentPerson === null) return;
  console.log(currentPerson.name);
  printNames(currentPerson.friend);
}
printNames(person);
```

### Implement `sum(1)(2)(3)(4)()`

```js
// recursion
let sum = function sum(a) {
  return function (b) {
    if (b) {
      return sum(a + b);
    }
    return a;
  };
};
let result = sum(1)(2)(3)();
```
