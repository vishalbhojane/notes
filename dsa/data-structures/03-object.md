An object is an unordered collection of key-value pairs.

## Key Characteristics:

- Keys must be strings or symbols
- Values can be of any data type
- Not iterable with `for...of` loop
- Accessed via dot notation or bracket notation

## Creating an Object:

```javascript
const obj = {
    name: 'vishal',
    age: 28,
    'key-three': true,
    sayMyName: function() {
        console.log(this.name);
    }
};
```

## Accessing Properties:

```javascript
obj.name;            // Dot notation
obj['name'];         // Bracket notation
obj['key-three'];    // Bracket notation for keys with special characters
```

## Modifying Objects:

```javascript
// Add or modify a property
obj.hobby = 'playing guitar';

// Delete a property
delete obj.hobby;

// Call a method
obj.sayMyName();
```

## Looping Over Objects:

```javascript
for (const key in obj) {
    console.log(obj[key]);
}
```

## Useful Object Methods:

- `Object.keys(obj)`: Returns an array of keys
- `Object.values(obj)`: Returns an array of values
- `Object.entries(obj)`: Returns an array of \[key, value] pairs

## Time Complexity (Big-O):

- Insert: O(1)
- Remove: O(1)
- Access: O(1)
- Search: O(n)
- Object.keys(), Object.values(), Object.entries(): O(n)

## Use Cases:

- Storing related data
- Creating custom data structures
- Implementing hash tables or dictionaries