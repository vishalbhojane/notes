Create a function `reverseAlphanumeric` that takes a string `str`.
It should:

1. Reverse only alphanumeric characters (a-z, A-Z, 0-9)
2. Keep non-alphanumeric characters in their original positions
3. Preserve case sensitivity

## Solution

```javascript
function reverseAlphanumeric(str) {
  const chars = str.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    if (!isAlnum(chars[left])) {
      left++;
    } else if (!isAlnum(chars[right])) {
      right--;
    } else {
      [chars[left], chars[right]] = [chars[right], chars[left]];
      left++;
      right--;
    }
  }

  return chars.join('');
}

function isAlnum(char) {
  return /[a-zA-Z0-9]/.test(char);
}
```

## Usage

```javascript
// Basic alphanumeric reversal
console.log(reverseAlphanumeric('ab-cd'));
// "dc-ba"

// With special characters
console.log(reverseAlphanumeric('a-bC-dEf-ghIj'));
// "j-Ih-gfE-dCba"

// Numbers and letters
console.log(reverseAlphanumeric('Test1ng-Leet=code-Q!'));
// "Qedo1ct-eeLg=ntse-T!"

// Only special characters
console.log(reverseAlphanumeric('---'));
// "---"

// Mixed characters
console.log(reverseAlphanumeric('12&*34'));
// "43&*21"

// Empty string
console.log(reverseAlphanumeric(''));
// ""
```
