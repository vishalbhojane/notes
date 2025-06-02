Bit manipulation involves performing operations at the binary level of numbers. These techniques can be very efficient for certain types of problems. Here are some common bit manipulation operations:

## 1. Is Even

Check if a number is even using bitwise AND.

```javascript
function isEven(number) {
  return (number & 1) === 0;
}
```

Core Logic: The least significant bit of an even number is always 0.

## 2. Is Positive

Check if a 32-bit integer is positive.

```javascript
function isPositive(number) {
  if (number === 0) {
    return false;
  }
  return ((number >> 31) & 1) === 0;
}
```

Core Logic: The most significant bit (sign bit) of a positive number is 0.

## 3. Is Power of Two

Check if a number is a power of two.

```javascript
function isPowerOfTwo(number) {
  return (number & (number - 1)) === 0;
}
```

Core Logic: A power of two in binary has only one bit set. Subtracting 1 flips all bits after the set bit.

## 4. Divide by Two

Divide a number by two using right shift.

```javascript
function divideByTwo(number) {
  return number >> 1;
}
```

Core Logic: Right shifting by 1 is equivalent to integer division by 2.

## 5. Multiply by Two

Multiply a number by two using left shift.

```javascript
function multiplyByTwo(number) {
  return number << 1;
}
```

Core Logic: Left shifting by 1 is equivalent to multiplication by 2.

Usage

```javascript
console.log(isEven(4));           // true
console.log(isPositive(5));       // true
console.log(isPowerOfTwo(8));     // true
console.log(divideByTwo(10));     // 5
console.log(multiplyByTwo(3));    // 6
```

## Complexity

Time Complexity: O(1) for all operations, as they involve a constant number of bitwise operations regardless of the input size.

Space Complexity: O(1) for all operations, as they use a constant amount of extra space.