Modules allow you to split your code into separate files and control the visibility of variables, functions, and classes.

```typescript
// In file moduleA.ts
export const PI = 3.14;
export function calculateCircumference(diameter: number): number {
  return PI * diameter;
}

// In file moduleB.ts
import {PI, calculateCircumference} from './moduleA';

console.log(PI); // 3.14
console.log(calculateCircumference(10)); // 31.4
```
