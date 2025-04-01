Define the types of parameters and the return type.

```typescript
let add: (a: number, b: number) => number;
add = (x, y) => x + y; // implementation
```

## Optional and Default Parameters

Make parameters optional using ? or provide default values.

```typescript
function greet(name: string, age?: number): string {
  return age ? `Hello, ${name}. You are ${age} years old.` : `Hello, ${name}.`;
}

function multiply(a: number, b: number = 1): number {
  return a * b;
}

console.log(greet('Alice')); // "Hello, Alice."
console.log(greet('Bob', 25)); // "Hello, Bob. You are 25 years old."
console.log(multiply(5)); // 5
console.log(multiply(5, 2)); // 10
```
