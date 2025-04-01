Arrays are ordered collections of data (can hold multiple types).

## 1. Creating and Accessing Arrays

### A. Creating Arrays

```javascript
const fruits = ['Apple', 'Banana', 'Orange']; // Literal syntax
const numbers = new Array(1, 2, 3); // Constructor (rarely used)
```

### B. Accessing Elements

```javascript
console.log(fruits[0]); // "Apple" (0-based indexing)
console.log(fruits.length); // 3
```

## 2. Array Methods (Modification)

| Method      | Description               | Example                                                               | Mutates Original? |
| ----------- | ------------------------- | --------------------------------------------------------------------- | ----------------- |
| `push()`    | Adds to end               | `fruits.push("Mango")` → `["Apple", "Banana", "Orange", "Mango"]`     | ✅                |
| `pop()`     | Removes from end          | `fruits.pop()` → `["Apple", "Banana"]`                                | ✅                |
| `shift()`   | Removes from start        | `fruits.shift()` → `["Banana", "Orange"]`                             | ✅                |
| `unshift()` | Adds to start             | `fruits.unshift("Kiwi")` → `["Kiwi", "Apple", "Banana", "Orange"]`    | ✅                |
| `splice()`  | Adds/removes at any index | `fruits.splice(1, 1, "Peach")` → `["Apple", "Peach", "Orange"]`       | ✅                |
| `slice()`   | Copies a portion          | `fruits.slice(1, 2)` → `["Banana"]`                                   | ❌                |
| `concat()`  | Merges arrays             | `fruits.concat(["Grape"])` → `["Apple", "Banana", "Orange", "Grape"]` | ❌                |

**Example:**

```javascript
const arr = [1, 2, 3];
arr.splice(1, 0, 99); // Inserts 99 at index 1 → [1, 99, 2, 3]
```

## 3. Searching in Arrays

| Method        | Description                    | Example                                   |
| ------------- | ------------------------------ | ----------------------------------------- |
| `indexOf()`   | Returns first index of item    | `fruits.indexOf("Banana")` → `1`          |
| `includes()`  | Checks if item exists          | `fruits.includes("Apple")` → `true`       |
| `find()`      | Returns first match (callback) | `[1, 2, 3].find(x => x > 1)` → `2`        |
| `findIndex()` | Returns index of first match   | `[1, 2, 3].findIndex(x => x === 2)` → `1` |

**Example:**

```javascript
const users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'},
];
const user = users.find((u) => u.id === 2); // { id: 2, name: "Bob" }
```

## 4. Transformation Methods

| Method     | Description                                 | Example                                          |
| ---------- | ------------------------------------------- | ------------------------------------------------ |
| `map()`    | Creates new array by transforming each item | `[1, 2, 3].map(x => x * 2)` → `[2, 4, 6]`        |
| `filter()` | Returns items passing a test                | `[1, 2, 3].filter(x => x > 1)` → `[2, 3] `       |
| `reduce()` | Reduces array to a single value             | `[1, 2, 3].reduce((sum, x) => sum + x, 0)` → `6` |

**Example:**

```javascript
const numbers = [1, 2, 3];
const sum = numbers.reduce((total, num) => total + num, 0); // 6
```

## 5. Sorting & Reversing

| Method      | Description                                | Example                             |
| ----------- | ------------------------------------------ | ----------------------------------- |
| `sort()`    | Sorts in place (alphabetically by default) | `[3, 1, 2].sort()` → `[1, 2, 3]`    |
| `reverse()` | Reverses the array                         | `[1, 2, 3].reverse()` → `[3, 2, 1]` |

**Custom Sort Example:**

```javascript
const nums = [10, 2, 5];
nums.sort((a, b) => a - b); // [2, 5, 10] (ascending)
```

## 6. Spread & Destructuring

### A. Spread Operator (...)

Copies or merges arrays.

```javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3]; // [1, 2, 3]
```

### B. Destructuring Extracts values into variables.

```javascript
const [first, ...rest] = [1, 2, 3];
console.log(first); // 1
console.log(rest); // [2, 3]
```

## 7. Nested Arrays (Multi-dimensional Arrays)

### A. flat()

Flattens nested arrays by a depth.

```javascript
const nested = [1, [2, [3]]];
console.log(nested.flat(2)); // [1, 2, 3]
```

### B. flatMap()

Maps then flattens (depth = 1).

```javascript
const arr = [1, 2];
console.log(arr.flatMap((x) => [x, x * 2])); // [1, 2, 2, 4]
```
