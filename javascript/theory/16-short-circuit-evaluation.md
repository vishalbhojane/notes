Short-circuit evaluation is a technique where logical operators (`||` and `&&`) are evaluated from left to right, potentially skipping unnecessary evaluations.

## Logical OR (`||`) Operator

Returns the first truthy value or the last value if all are falsy.

```javascript
true || false; // true
false || true; // true
false || false; // false
```

## Logical AND (`&&`) Operator

Returns the first falsy value or the last value if all are truthy.

```javascript
true && false; // false
true && true; // true
false && true; // false
```

## Examples

```javascript
function printTrue() {
  console.log('true');
  return true;
}

function printFalse() {
  console.log('false');
  return false;
}

printTrue() || printFalse(); // Outputs: "true"
printFalse() || printTrue(); // Outputs: "false" "true"

printFalse() && printTrue(); // Outputs: "false"
printTrue() && printFalse(); // Outputs: "true" "false"
```

## Practical Uses

### Default Values (OR)

```javascript
function printName(name) {
  name = name || 'Default';
  console.log(name);
}

printName('Alice'); // Outputs: Alice
printName(); // Outputs: Default
```

### Safe Property Access (AND)

```javascript
const person = {
  address: {
    street: 'Main Street',
  },
};

console.log(person && person.address && person.address.street);
// Outputs: "Main Street"

// Modern alternative using optional chaining
console.log(person?.address?.street);
```

## Key Points:

1. Short-circuit evaluation can improve performance by avoiding unnecessary computations.
2. It's useful for providing default values and safe property access.
3. Be cautious with falsy values (0, "", false, null, undefined, NaN) in OR operations.
4. Consider using the nullish coalescing operator (`??`) for default values when 0 or "" are valid.
5. Modern JavaScript offers optional chaining (`?.`) as an alternative to AND chaining for safe property access.
