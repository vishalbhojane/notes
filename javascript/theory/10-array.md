Arrays are ordered collections of values, used to store multiple elements in a single variable.

## Basic Operations

```javascript
const arr = [1, 2, 3, 4, 5];

Array.isArray(arr); // Check if it's an array
arr.length; // Get/set array length
arr[0]; // Access element (zero-indexed)
arr.push(6); // Add to end
arr.pop(); // Remove from end
arr.unshift(0); // Add to beginning
arr.shift(); // Remove from beginning
```

## Creating Arrays

```javascript
const arr1 = [1, 2, 3];
const arr2 = new Array(1, 2, 3);
const arr3 = Array.from('123'); // Creates [1, 2, 3]
const arr4 = Array(3).fill(0); // Creates [0, 0, 0]
```

## Array Methods

```javascript
arr.indexOf(3); // Find index of element
arr.lastIndexOf(3); // Find last index of element
arr.join(', '); // Convert array to string
arr.slice(1, 3); // Extract portion of array
arr.splice(1, 1, 'a'); // Add/remove elements
arr.concat([6, 7]); // Merge arrays
arr.reverse(); // Reverse array in place
arr.sort((a, b) => a - b); // Sort array
```

## Iteration Methods

```javascript
arr.forEach((el, i) => console.log(el, i));
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);
const sum = arr.reduce((acc, cur) => acc + cur, 0);
const found = arr.find(x => x > 3);
const hasNegative = arr.some(x => x < 0);
const allPositive = arr.every(x => x > 0);
```

## ES6+ Features

```javascript
const [first, second, ...rest] = arr; // Array destructuring
const newArr = [...arr, 6, 7]; // Spread operator
```

## Multidimensional Arrays

```javascript
const matrix = [
  [1, 2],
  [3, 4],
];
matrix[0][1]; // Access nested element (2)
```

## Key Points

- Arrays are objects and can have properties added to them.
- Array length is dynamic and can be manually changed.
- Sparse arrays can have "empty" slots.
- `const` arrays can be modified, but not reassigned.
- Use `Array.from()` to create arrays from array-like objects.
- `map()`, `filter()`, `reduce()` are powerful for data transformation.
- ES6 de-structuring and spread operators provide concise syntax.
- Performance considerations: `push()`/`pop()` are faster than `unshift()`/`shift()`.
