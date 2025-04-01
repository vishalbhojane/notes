Create a function `isValidParentheses` that takes a string `str`.
It should:

1. Check if parentheses, brackets, and curly braces are properly paired
2. Ensure closing brackets match their most recent opening bracket
3. Return true only if all brackets are valid and balanced

## Solution

```javascript
function isValidParentheses(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  for (let char of str) {
    if (!pairs[char]) {
      stack.push(char);
    } else if (stack.pop() !== pairs[char]) {
      return false;
    }
  }
  return stack.length === 0;
}
```

## Usage

```javascript
// Valid pairs
console.log(isValidParentheses('()')); // true
console.log(isValidParentheses('()[]{}')); // true
console.log(isValidParentheses('{[]}')); // true

// Invalid pairs
console.log(isValidParentheses('(]')); // false
console.log(isValidParentheses('([)]')); // false
console.log(isValidParentheses(']')); // false

// Empty string
console.log(isValidParentheses('')); // true

// Incomplete pairs
console.log(isValidParentheses('(')); // false
console.log(isValidParentheses('{[}')); // false

// Complex nesting
console.log(isValidParentheses('({[]})')); // true
console.log(isValidParentheses('((()))')); // true
```
