## String Literal Types

Restrict a variable to specific string values.

```typescript
let direction: 'left' | 'right';
direction = 'left'; // okay

function logDirection(direction: 'up' | 'down') {
  console.log(`Moving ${direction}`);
}
```

## Numeric Literal Types

Restrict a variable to specific number values.

```typescript
let num: 1 | 2 | 3;
num = 2; // okay

function printStatus(status: 0 | 1) {
  console.log(status ? 'Active' : 'Inactive');
}
```

## Boolean Literal Types

Restrict a boolean variable to true or false.

```typescript
let isDone: true = true; // okay

function setFlag(flag: true | false) {
  console.log(`Flag is set to: ${flag}`);
}
```
