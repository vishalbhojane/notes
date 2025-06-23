Data types define the kind of value a variable can hold in JavaScript. JavaScript is a dynamically typed language, meaning variables can hold different types of data at different times.

## Primitive Data Types

### String

Represents textual data.

```javascript
let str = 'hello';
let emptyStr = '';
```

### Number

Represents numeric values, including integers and floating-point numbers.

```javascript
let num1 = 1;
let num2 = 3.14;
```

### Boolean

Represents a logical entity with two values: `true` or `false`.

```javascript
let bool1 = true;
let bool2 = false;
```

### Undefined

Represents a variable that has been declared but not assigned a value.

```javascript
let myVar1 = undefined;
let myVar2;
console.log(myVar2);
// Output: undefined
```

### Null

Represents the intentional absence of any object value.

```javascript
let response = null;
```

### BigInt

Represents integers with arbitrary precision. Useful for working with very large integers.

```javascript
let bigInt1 = 1234567890123456789012345678901234567890n;
let bigInt2 = BigInt(9007199254740991);
```

### Symbol

Represents a unique and immutable value, often used as object property keys.

```javascript
let sym1 = Symbol('description');
let sym2 = Symbol('id');
```

## Reference Data Types

### Array

Used to store and organize multiple values within a single variable.

```javascript
let arr = [1, 2, 4, 5, 6];
```

### Object

Used to store multiple values in key-value pairs.

```javascript
let person = {
  name: 'Vishal',
  id: 1,
};
```

## Checking Data Types

The `typeof` operator returns the data type of a JavaScript variable.

```javascript
console.log(typeof 1);
// Output: number

console.log(typeof {});
// Output: object

console.log(typeof []);
// Output: object (Note: Arrays are considered objects in JavaScript, you can use Array.isArray())
```
