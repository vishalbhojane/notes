Writing clean, efficient, and maintainable JavaScript is crucial for scalability and performance. Below are key practices and optimizations.

## 1. Writing Readable Code

### A. Consistent Naming Conventions

- Use camelCase for variables/functions (getUserData)
- Use PascalCase for classes (class UserProfile)
- Use SCREAMING_SNAKE_CASE for constants (const API_KEY = "123")

### B. Avoid Magic Numbers/Strings

```javascript
// Bad
if (status === 2) {
  /* ... */
}

// Good
const STATUS_COMPLETED = 2;
if (status === STATUS_COMPLETED) {
  /* ... */
}
```

### C. Use Descriptive Variable Names

```javascript
// Bad
let d = 5;

// Good
let daysSinceLastLogin = 5;
```

## 2. Avoiding Global Variables

Global variables can cause naming collisions and unexpected side effects.

**Solutions:**

- Use modules (import/export)
- Wrap code in IIFE (Immediately Invoked Function Expression):

```javascript
(function () {
  let localVar = "I'm not global!";
})();
```

- Use block scope (let, const)

## 3. Using Modern ES6+ Syntax

### A. Arrow Functions

```javascript
// Traditional
function add(a, b) {
  return a + b;
}

// ES6
const add = (a, b) => a + b;
```

### B. Destructuring

```javascript
const user = {name: 'Alice', age: 25};
const {name, age} = user;
```

### C. Template Literals

```javascript
const greeting = `Hello, ${name}!`;
```

### D. Optional Chaining (?.)

```javascript
const street = user?.address?.street; // No error if undefined
```

## 4. Efficient Loops & Array Methods

### A. Prefer for...of Over Traditional for

```javascript
const arr = [1, 2, 3];

// Good
for (const num of arr) {
  console.log(num);
}

// Avoid
for (let i = 0; i < arr.length; i++) {
  /* ... */
}
```

### B. Use Array Methods (map, filter, reduce)

```javascript
const doubled = numbers.map((num) => num * 2);
const evens = numbers.filter((num) => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);
```

### C. Avoid forEach for Async Operations

```javascript
// Bad (parallel execution not guaranteed)
array.forEach(async (item) => await process(item));

// Good (use `for...of` with `await`)
for (const item of array) {
  await process(item);
}
```

## 5. Optimizing DOM

### A. Minimize Reflows & Repaints

- Batch DOM updates:

```javascript
// Bad (triggers multiple reflows)
element.style.width = '100px';
element.style.height = '200px';

// Good (updates in one pass)
element.style.cssText = 'width: 100px; height: 200px;';
```

- Use documentFragment for bulk inserts:

```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment);
```

### B. Debounce/Throttle Expensive Events

```javascript
// Debounce (executes after a pause)
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

window.addEventListener('resize', debounce(handleResize, 200));
```

## 6. Memory Management

### A. Avoid Memory Leaks

- Remove event listeners when no longer needed:

```javascript
button.addEventListener('click', onClick);
button.removeEventListener('click', onClick);
```

- Clear intervals/timeouts:

```javascript
const timer = setInterval(() => {}, 1000);
clearInterval(timer);
```

### B. Use WeakMap/WeakSet for Temporary References

```javascript
const weakMap = new WeakMap();
weakMap.set(element, metadata); // Automatically garbage-collected
```

## 7. Code Organization

### A. Modular Architecture

- Split code into small, reusable modules:

```text
src/
├── utils/
│   ├── math.js
│   └── validation.js
├── components/
│   ├── Button.js
│   └── Modal.js
└── index.js
```

### B. Follow SOLID Principles

| Principle             | Description                             |
| --------------------- | --------------------------------------- |
| Single Responsibility | One function = one task                 |
| Open/Closed           | Extendable without modifying source     |
| Liskov Substitution   | Subclasses should replace parents       |
| Interface Segregation | Avoid bloated interfaces                |
| Dependency Inversion  | Depend on abstractions, not concretions |
