Type assertions tell the TypeScript compiler to treat a value as a different type.

```typescript
let someValue: unknown = 'Hello, World!';
let strLength: number = (someValue as string).length; // Using 'as'

let anotherValue: unknown = 42;
let numberValue: number = <number>anotherValue; // Using angle-bracket syntax
```
