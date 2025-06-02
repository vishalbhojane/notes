An array is a data structure that holds a collection of values.

## Key Characteristics:

- Can contain mixed data types (strings, numbers, booleans, objects)
- Resizable (no need to declare size beforehand)
- Zero-indexed
- Maintains insertion order
- Iterable (can be used with `for...of` loop)

## Creating an Array:

```javascript
const arr = [1, 2, 3, 4];
```

## Accessing Elements:

```javascript
arr[0];               // First element
arr[arr.length - 1];  // Last element
```

## Array Properties:

```javascript
arr.length;  // Number of elements
```

## Common Methods:

```javascript
arr.push(5);     // Add to end
arr.pop();       // Remove from end
arr.unshift(5);  // Add to beginning
arr.shift();     // Remove from beginning
```

## Looping Over Arrays:

```javascript
// Using for loop
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// Using for...of loop
for (const item of arr) {
    console.log(item);
}
```

## Other Useful Methods:

`map`, `filter`, `reduce`, `concat`, `slice`, `splice`

## Time Complexity (Big-O):

- Insert/Remove from end (push/pop): O(1)
- Insert/Remove from beginning (unshift/shift): O(n)
- Access: O(1)
- Search: O(n)
- concat/slice/splice: O(n)
- forEach/map/filter/reduce: O(n)