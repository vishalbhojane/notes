JavaScript uses pass-by-value for primitive types and pass-by-reference for objects and arrays.

## Primitive Types (Pass-by-Value)

```javascript
let value1 = 1;
let value2 = value1;
value2 += 2;
console.log(value1); // 1
console.log(value2); // 3
```

## Objects and Arrays (Pass-by-Reference)

```javascript
let x = [1]; // Memory address: 0x01
let y = x; // y gets the same memory address: 0x01
y.push(2); // Modifies value at 0x01
console.log(x); // [1, 2]
console.log(y); // [1, 2]
```

## Comparing Values vs References

Primitive Values

```javascript
console.log(1 === 1); // true
console.log(1 === 1); // true
```

Object References

```javascript
const ar1 = [1];
const ar2 = [1];
console.log(ar1 === ar2); // false (different memory addresses)
console.log(ar1 === [1]); // false
const ar11 = ar1;
console.log(ar1 === ar11); // true (same memory address)
```

## Const and References

```javascript
const arr1 = [1, 2]; // 0x01
arr1.push(3); // Valid: modifies content, not reference
// arr1 = [1, 2, 3]; // Invalid: attempts to reassign reference
```

## Pass-by-Reference in Functions

```javascript
const arr3 = [1, 2];
const elementToPush = 3;

function add(array, element) {
  element++; // Local scope change
  array.push(element); // Modifies the original array
}

add(arr3, elementToPush);
console.log(arr3); // [1, 2, 4]
console.log(elementToPush); // 3 (unchanged)
```

## Key Points:

1. Primitive types are passed by value.
2. Objects and arrays are passed by reference.
3. `const` prevents reassignment of references but allows modification of referenced values.
4. Function parameters for objects/arrays receive references, allowing modification of the original data.
