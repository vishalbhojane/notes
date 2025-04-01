Type aliases create a new name for a type, simplifying complex type declarations.

```typescript
type StringOrNumber = string | number;

let value: StringOrNumber;
value = 'Hello'; // okay
value = 42; // okay

type Point = {
  x: number;
  y: number;
};

function logPoint(point: Point) {
  console.log(`x: ${point.x}, y: ${point.y}`);
}
```
