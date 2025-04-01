Proper error handling ensures your code fails gracefully and helps with debugging.

## 1. try...catch...finally

Handles synchronous errors.

**Syntax:**

```javascript
try {
  // Risky code
} catch (error) {
  // Handle error
} finally {
  // Always executes (cleanup)
}
```

**Example:**

```javascript
try {
  const result = riskyOperation();
  console.log(result);
} catch (err) {
  console.error('Error:', err.message);
} finally {
  console.log('Cleanup (runs always)');
}
```

**Key Points:**

- try → Code that might throw an error
- catch → Runs if an error occurs (error contains details)
- finally → Always runs (useful for cleanup like closing files)

## 2. Throwing Errors

### A. Built-in Errors

```javascript
throw new Error('Something went wrong!');
throw new SyntaxError('Invalid syntax');
throw new TypeError('Expected a number');
```

### B. Custom Errors

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

throw new ValidationError('Invalid input');
```

**Example Usage:**

```javascript
function validateInput(input) {
  if (!input) throw new Error('Input is empty!');
}
```

## 3. onerror

Event Handling Global error handler for uncaught exceptions.

### A. Browser (window.onerror)

```javascript
window.onerror = (message, url, line) => {
  console.error(`Error: ${message} at ${line}:${url}`);
  return true; // Prevents default browser error logging
};
```

### B. Node.js (process.on('uncaughtException'))

```javascript
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit after logging
});
```

**Use Case:**

- Logging unexpected errors in production

## 4. Debugging Techniques

### A. console Methods

```javascript
console.log('Info'); // General logging
console.warn('Warning'); // Non-critical issues
console.error('Error'); // Critical errors
console.table(data); // Displays data as a table
```

### B. debugger Statement

Pauses execution (works with browser DevTools).

```javascript
function buggyFunction() {
  debugger; // Execution stops here if DevTools is open
  // ...
}
```

### C. Browser DevTools

- Sources Tab → Step-through debugging
- Network Tab → Inspect API calls
- Console → Test snippets

## 5. Error Handling in Async Operations

### A. Promises (catch)

```javascript
fetch('https://api.example.com/data')
  .then((response) => response.json())
  .catch((err) => console.error('Fetch failed:', err));
```

### B. async/await (try/catch)

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Fetch failed:', err);
    throw err; // Re-throw if needed
  }
}
```

### C. Promise-Specific Errors

```javascript
Promise.reject(new Error('Failed!')).catch((err) => console.error(err.message)); // "Failed!"
```
