Regular Expressions are patterns used to match, search, and manipulate text.

## 1. RegExp Syntax

### A. Creating a RegExp

```javascript
// Literal syntax (recommended for static patterns)
const regex1 = /pattern/flags;

// Constructor (useful for dynamic patterns)
const regex2 = new RegExp('pattern', 'flags');
```

### B. Common Flags

| Flag | Meaning                                      |
| ---- | -------------------------------------------- |
| `i`  | Case-insensitive                             |
| `g`  | Global (find all matches)                    |
| `m`  | Multiline (^ and $ match start/end of lines) |

**Example:**

```javascript
const caseInsensitiveRegex = /hello/i;
```

## 2. Pattern Matching

### A. Basic Patterns

| Pattern  | Matches                                    |
| -------- | ------------------------------------------ |
| `abc`    | Exact sequence "abc"                       |
| `[abc]`  | Any one of a, b, or c                      |
| `[^abc]` | Any character not a, b, or c               |
| `[a-z]`  | Any lowercase letter                       |
| `\d`     | Any digit ([0-9])                          |
| `\w`     | Word character (alphanumeric + underscore) |
| `\s`     | Whitespace (space, tab, newline)           |
| `.`      | Any character except newline               |

### B. Quantifiers

| Quantifier | Meaning               |
| ---------- | --------------------- |
| `*`        | 0 or more             |
| `+`        | 1 or more             |
| `?`        | 0 or 1 (optional)     |
| `{n}`      | Exactly n times       |
| `{n,}`     | n or more times       |
| `{n,m}`    | Between n and m times |

**Example:**

```javascript
const digitPattern = /\d+/; // Matches one or more digits
```

### C. Anchors & Boundaries

| Pattern | Meaning                             |
| ------- | ----------------------------------- |
| `^`     | Start of string (or line in m mode) |
| `$`     | End of string (or line in m mode)   |
| `\b`    | Word boundary                       |

**Example:**

```javascript
const startsWithHello = /^hello/i;
```

## 3. Common Patterns

| Use Case                      | RegEx                          |
| ----------------------------- | ------------------------------ |
| Email Validation              | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Password (8+ chars, 1 number) | `/^(?=.*\d).{8,}$/`            |
| Extract Hashtags              | `/#\w+/g`                      |
| Match URLs                    | `/(https?:\/\/[^\s]+)/g`       |

**Example (Email Validation):**

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test("test@example.com")); // true
```

## 4. RegExp Methods

### A. test()

Checks if a string matches the pattern (returns true/false).

```javascript
const regex = /hello/;
console.log(regex.test("hello world")); // true
```

### B. exec()

Returns match details (or null if no match).

```javascript
const regex = /world/;
const result = regex.exec("hello world");
console.log(result[0]); // "world" (matched text)
console.log(result.index); // 6 (position of match)
```

## 5. String Methods with RegExp

### A. match()

Returns an array of matches (or null).

```javascript
const str = "Hello 123 World 456";
const matches = str.match(/\d+/g); // ["123", "456"]
```

### B. replace()

Replaces matches with a new string.

```javascript
const newStr = "Hello World".replace(/world/i, "JavaScript");
console.log(newStr); // "Hello JavaScript"
```

### C. search()

Returns the index of the first match (or -1).

```javascript
const idx = "Hello World".search(/world/i);
console.log(idx); // 6
```

### D. split()

Splits a string using a RegEx delimiter.

```javascript
const parts = "Hello,World,JavaScript".split(/,/);
console.log(parts); // ["Hello", "World", "JavaScript"]
```

## 6. Advanced Regex

### A. Lookaheads & Lookbehinds

Assertions that check for patterns without including them in the match.

#### 1. Positive Lookahead (?=)

Matches a pattern followed by another pattern.

javascript

```javascript
// Match "q" followed by "u"
const regex = /q(?=u)/;
console.log("queen".match(regex)); // ["q"] (matches q only if followed by u)
```

#### 2. Negative Lookahead (?!)

Matches a pattern not followed by another pattern.

javascript

```javascript
// Match "q" not followed by "u"
const regex = /q(?!u)/;
console.log("qatar".match(regex)); // ["q"]
```

#### 3. Positive Lookbehind (?<=)

Matches a pattern preceded by another pattern.

javascript

```javascript
// Match "$" preceded by a digit
const regex = /(?<=\d)\$/;
console.log("100$".match(regex)); // ["$"]
```

#### 4. Negative Lookbehind (?<!)

Matches a pattern not preceded by another pattern.

javascript

```javascript
// Match "$" not preceded by a digit
const regex = /(?<!\d)\$/;
console.log("Price$".match(regex)); // ["$"]
```

### B. Named Capture Groups

Assigns names to captured groups for better readability.

javascript

```javascript
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = dateRegex.exec("2023-05-15");

console.log(match.groups.year); // "2023"
console.log(match.groups.month); // "05"
console.log(match.groups.day); // "15"
```

### C. Practical Applications

#### 1. Password Validation

javascript

```javascript
// At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const pwRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
```

#### 2. Extracting Data

javascript

```javascript
// Extract prices with currency symbols
const priceRegex = /(?<currency>[$€£])(?<amount>\d+\.\d{2})/g;
const text = 'Prices: $19.99, €29.99, £9.99';
let match;

while ((match = priceRegex.exec(text)) {
  console.log(`${match.groups.currency}${match.groups.amount}`);
}
// Output: $19.99, €29.99, £9.99
```

#### 3. Complex Replacements

javascript

```javascript
// Reformat dates (YYYY-MM-DD → DD/MM/YYYY)
const reformatDate = "2023-05-15".replace(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  "$<day>/$<month>/$<year>"
);
console.log(reformatDate); // "15/05/2023"
```

### D. Performance Considerations

javascript

```javascript
// Cache regex patterns
const regexCache = {};
function getRegex(pattern) {
  if (!regexCache[pattern]) {
    regexCache[pattern] = new RegExp(pattern);
  }
  return regexCache[pattern];
}

// Use non-capturing groups
const regex = /(?:https?):\/\/([^/]+)/;
```
