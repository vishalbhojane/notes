Create a class `Calculator` that performs chainable mathematical operations.
It should:

1. Initialize with a starting number
2. Support `add`, `subtract`, `multiply`, `divide`, and `power` operations
3. Throw error for division by zero
4. Return result through `getResult()`

## Solution

```javascript
class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(value) {
    this.value += value;
    return this;
  }

  subtract(value) {
    this.value -= value;
    return this;
  }

  multiply(value) {
    this.value *= value;
    return this;
  }

  divide(value) {
    if (value === 0) throw new Error('Division by zero is not allowed');
    this.value /= value;
    return this;
  }

  power(value) {
    this.value **= value;
    return this;
  }

  getResult() {
    return this.value;
  }
}
```

## Usage

```javascript
// Basic operations
const calc = new Calculator(10);

console.log(calc.add(5).getResult()); // 15
console.log(calc.subtract(3).getResult()); // 12
console.log(calc.multiply(2).getResult()); // 24
console.log(calc.divide(4).getResult()); // 6
console.log(calc.power(2).getResult()); // 36

// Chain multiple operations
console.log(new Calculator(2).multiply(5).power(2).add(10).getResult()); // 60

// Division by zero error
try {
  console.log(new Calculator(10).divide(0));
} catch (e) {
  console.log(e.message); // "Division by zero is not allowed"
}
```
