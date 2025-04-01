Interfaces define the structure of an object, including its properties and methods.

```typescript
interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: 'John',
  age: 30,
};

interface Employee extends Person {
  employeeId: number;
}

let employee: Employee = {
  name: 'Jane',
  age: 28,
  employeeId: 123,
};
```
