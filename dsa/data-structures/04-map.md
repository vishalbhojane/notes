A Map is an ordered collection of key-value pairs.

## Key Characteristics:

- Both keys and values can be of any data type
- Maintains insertion order
- Iterable (can be used with `for...of` loop)

## Creating a Map:

```javascript
const map = new Map([['a', 1], ['b', 2]]);
```

## Map Operations:

```javascript
// Get a value
map.get('a');

// Set a new key-value pair
map.set('c', 3);

// Check if a key exists
map.has('a');

// Delete a key-value pair
map.delete('c');

// Clear all entries
map.clear();

// Get the number of entries
map.size;
```

## Looping Over a Map:

```javascript
for (const [key, value] of map) {
    console.log(key, value);
}
```

## Map vs Object:

1. Order: Maps maintain insertion order; Objects do not
2. Key Types: Map keys can be any type; Object keys are strings or symbols
3. Prototype: Maps have no default keys; Objects have a prototype
4. Iterability: Maps are iterable; Objects are not
5. Size: Maps have a `size` property; Objects require manual size calculation
6. Functionality: Objects can have methods; Maps are for data storage only

## Use Cases:

- When order of elements is important
- When keys are not strings
- For frequent additions and removals of key-value pairs
- When working with an unknown number of key-value pairs