Big O describes the time or space complexity of algorithms.
- Time complexity: How long an algorithm takes to run as input size increases.
- Space complexity: How much memory an algorithm needs to run.
## Common Big O Notations

1. O(1) - Constant Time Example:

```javascript
function addNumbers(a, b) {
       return a + b;
   }
   // Always one operation, regardless of input size
```

2. O(n) - Linear Time Example:

```javascript
function printArray(arr) {
       for (let i = 0; i < arr.length; i++) {
           console.log(arr[i]);
       }
   }
   // Operations increase linearly with input size
```

3. O(n^2) - Quadratic Time Example:

```javascript
function printPairs(arr) {
       for (let i = 0; i < arr.length; i++) {
           for (let j = 0; j < arr.length; j++) {
               console.log(arr[i], arr[j]);
           }
       }
   }
   // Nested loops, operations increase quadratically
```

4. O(log n) - Logarithmic Time Example:

```javascript
function binarySearch(arr, target) {
       let left = 0;
       let right = arr.length - 1;
       while (left <= right) {
           let mid = Math.floor((left + right) / 2);
           if (arr[mid] === target) return mid;
           if (arr[mid] < target) left = mid + 1;
           else right = mid - 1;
       }
       return -1;
   }
   // Efficient for large datasets, divides search area in half each time
```

## Rules for Simplifying Big O

1. Drop constants:

```javascript
function exampleFunction(n) {
       for (let i = 0; i < n; i++) { console.log(i); }
       for (let j = 0; j < n; j++) { console.log(j); }
   }
   // O(2n) simplifies to O(n)
```

2. Drop non-dominants:

```javascript
function exampleFunction(n) {
       for (let i = 0; i < n; i++) {
           for (let j = 0; j < n; j++) {
               console.log(i, j);
           }
       }
       for (let k = 0; k < n; k++) {
           console.log(k);
       }
   }
   // O(n^2 + n) simplifies to O(n^2)
```

3. Different terms for inputs:

```javascript
function exampleFunction(a, b) {
       for (let i = 0; i < a; i++) { console.log(i); }
       for (let j = 0; j < b; j++) { console.log(j); }
   }
   // O(a + b)
```

## Array Operations

```javascript
const arr = [1, 2, 3, 4, 5];

arr.push(6);     // O(1) - Add to end
arr.pop();       // O(1) - Remove from end
arr.unshift(0);  // O(n) - Add to beginning, shifts all elements
arr.shift();     // O(n) - Remove from beginning, shifts all elements
arr.splice(2, 1, 7);  // O(n) - Modify at index, may shift elements
```

## Efficiency Order

O(1) < O(log n) < O(n) < O(n^2)