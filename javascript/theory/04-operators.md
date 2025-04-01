Operators are symbols that perform operations on values and variables.

## 1. Arithmetic Operators

Used for mathematical calculations.

| Operator | Name                | Example      | Result   |
| -------- | ------------------- | ------------ | -------- |
| `+`      | Addition            | `5 + 2`      | `7`      |
| `-`      | Subtraction         | `5 - 2`      | `3`      |
| `*`      | Multiplication      | `5 * 2`      | `10`     |
| `/`      | Division            | `5 / 2`      | `2.5`    |
| `%`      | Modulus (Remainder) | `5 % 2`      | `1`      |
| `**`     | Exponentiation      | `5 ** 2`     | `25`     |
| `++`     | Increment           | `let x = 5;` | `x++; 6` |
| `--`     | Decrement           | `let x = 5;` | `x--; 4` |

**Example:**

```javascript
console.log(10 + 5); // 15
console.log(10 % 3); // 1 (remainder)
console.log(2 ** 4); // 16 (2⁴)
```

## 2. Assignment Operators

Assign values to variables.

| Operator | Example   | Equivalent To |
| -------- | --------- | ------------- |
| `=`      | `x = 5`   | `x = 5`       |
| `+=`     | `x += 3`  | `x = x + 3`   |
| `-=`     | `x -= 3`  | `x = x - 3`   |
| `*=`     | `x *= 3`  | `x = x * 3`   |
| `/=`     | `x /= 3`  | `x = x / 3`   |
| `%=`     | `x %= 3`  | `x = x % 3`   |
| `**=`    | `x **= 3` | `x = x ** 3`  |

**Example:**

```javascript
let x = 10;
x += 5; // x = 15
x *= 2; // x = 30
```

## 3. Comparison Operators

Return true or false based on comparison.

| Operator | Name                           | Example     | Result  |
| -------- | ------------------------------ | ----------- | ------- |
| `==`     | Loose equality (value only)    | `"5" == 5`  | `true`  |
| `=== `   | Strict equality (value + type) | `"5" === 5` | `false` |
| `!=`     | Loose inequality               | `"5" != 5`  | `false` |
| `!==`    | Strict inequality              | `"5" !== 5` | `true`  |
| `>`      | Greater than                   | `10 > 5`    | `true`  |
| `<`      | Less than                      | `10 < 5`    | `false` |
| `>=`     | Greater than or equal          | `10 >= 10`  | `true`  |
| `<=`     | Less than or equal             | `10 <= 5`   | `false` |

**Example:**

```javascript
console.log(5 == '5'); // true (loose)
console.log(5 === '5'); // false (strict)
console.log(10 > 5); // true
```

## 4. Logical Operators

Used for boolean logic.

| Operator | Name               | Example           | Result    |
| -------- | ------------------ | ----------------- | --------- |
| &&       | AND                | true && false     | false     |
| \|\|     | OR                 | true \|\| false   | true      |
| !        | NOT                | !true             | false     |
| ??       | Nullish Coalescing | null ?? "default" | "default" |

**Example:**

```javascript
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false
console.log(null ?? 'fallback'); // "fallback"
```

## 5. String Operators

Used for string manipulation.

| Operator                 | Example                       | Result          |
| ------------------------ | ----------------------------- | --------------- |
| `+` (Concatenation)      | `"Hello" + " " + "World"`     | `"Hello World"` |
| `+=` (Append)            | `let str = "Hi"; str += "!";` | `"Hi!"`         |
| Template Literals (\`\`) | \`Hello ${name}\`             | Dynamic string  |

### Example

```javascript
let name = 'Alice';
console.log('Hello ' + name); // "Hello Alice"
console.log(`Hello ${name}`); // "Hello Alice" (template literal)
```

## 6. Bitwise & Type Operators

| Operator     | Name                 | Example                       | Result       |
| ------------ | -------------------- | ----------------------------- | ------------ |
| `&`          | AND                  | `5 & 1` (`0101 & 0001`)       | `1`          |
| \|           | OR                   | `5` \| `1` (`0101` \| `0001`) | `5`          |
| `~`          | NOT                  | `~5`                          | `-6`         |
| `^`          | XOR                  | `5 ^ 1` (`0101 ^ 0001`)       | `4`          |
| `<<`         | Left Shift           | `5 << 1` (`0101` → `1010`)    | `10`         |
| `>>`         | Right Shift          | `5 >> 1` (`0101` → `0010`)    | `2`          |
| `>>>`        | Unsigned Right Shift | `-5 >>> 1`                    | `2147483645` |
| `typeof`     | Type Check           | `typeof 5`                    | `"number"`   |
| `instanceof` | Object Type Check    | `[] instanceof Array`         | `true`       |

**Example:**

```javascript
console.log(5 & 1); // 1 (bitwise AND)
console.log(typeof 5); // "number"
```
