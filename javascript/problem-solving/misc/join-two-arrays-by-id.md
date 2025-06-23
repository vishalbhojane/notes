Create a function `join` that takes two arrays of objects.
It should:

1. Merge objects from both arrays based on 'id' property
2. Combine properties when same id exists in both arrays
3. Return sorted array of merged objects by id

## Solution

```javascript
function join(left, right) {
  const merged = {};

  [...left, ...right].forEach(item => {
    merged[item.id] = {...merged[item.id], ...item};
  });

  return Object.values(merged).sort((a, b) => a.id - b.id);
}
```

## Usage

```javascript
// Basic join
console.log(
  join(
    [
      {id: 1, x: 1},
      {id: 2, x: 9},
    ],
    [
      {id: 2, y: 2},
      {id: 3, y: 3},
    ]
  )
);
// [{id: 1, x: 1}, {id: 2, x: 9, y: 2}, {id: 3, y: 3}]

// Overlapping properties
console.log(join([{id: 1, val: 'old'}], [{id: 1, val: 'new'}]));
// [{id: 1, val: 'new'}]

// Empty arrays
console.log(join([], [{id: 1, x: 1}]));
// [{id: 1, x: 1}]
console.log(join([], []));
// []

// Multiple properties
console.log(join([{id: 1, x: 1, y: 2}], [{id: 1, y: 3, z: 4}]));
// [{id: 1, x: 1, y: 3, z: 4}]
```
