A Set is a data structure that holds a collection of unique values.

## Key Characteristics:

- Contains only unique values
- Can store mixed data types (strings, numbers, booleans, objects)
- Dynamically sized
- Does not maintain insertion order
- Iterable (can be used with `for...of` loop)

## Creating a Set:

```javascript
const set = new Set([1, 2, 3]);
```

## Set Operations:

```javascript
// Add a value (duplicates are ignored)
set.add(4);

// Check if a value exists
set.has(4);  // Returns true or false

// Delete a value
set.delete(4);

// Clear all values
set.clear();

// Get set size
set.size;
```

## Looping Over a Set:

```javascript
for (const item of set) {
    console.log(item);
}
```

## Set vs Array:

1. Uniqueness: Sets only store unique values; Arrays can have duplicates
2. Order: Arrays maintain insertion order; Sets do not
3. Performance: Searching and deleting elements is generally faster in Sets

## Use Cases:

- Removing duplicates from an array
- Checking for presence of an item
- Efficient membership testing in large collections