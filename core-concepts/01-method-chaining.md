Method chaining is a programming technique that allows multiple methods to be called on the same object in a single statement.

## Key Points:

1. Calls a method on the result of another method of the same object.
2. Improves code readability and reduces the number of lines.
3. Each method in the chain returns `this` (the object itself) to allow further chaining.

## Example:

```javascript
const computeTotalAmount = function () {
  let totalAmount = 0;
  return {
    lacs: function (amount) {
      totalAmount += amount * 100000;
      return this;
    },
    thousand: function (amount) {
      totalAmount += amount * 1000;
      return this;
    },
    crore: function (amount) {
      totalAmount += amount * 10000000;
      return this;
    },
    value: function () {
      return totalAmount;
    },
  };
};

const result = computeTotalAmount().lacs(10).thousand(5).crore(2).value();
console.log(result); // Outputs the total amount
```

## How it works:

1. `computeTotalAmount()` returns an object with methods.
2. Each method (except `value()`) modifies `totalAmount` and returns `this`.
3. The `value()` method returns the final `totalAmount`.
4. Methods can be chained in any order.

## Benefits:

- Cleaner and more intuitive code
- Allows for fluent interfaces
- Reduces the need for temporary variables
