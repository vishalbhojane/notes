## Union Types

Allow a variable to hold multiple types.

```typescript
let value: string | number;
value = 'Hello'; // okay
value = 100; // okay

function printId(id: string | number) {
  console.log('Id: ' + id);
}
```

## Intersection Types

Combine multiple types into one.

```typescript
interface User {
  name: string;
}

interface Employee {
  employeeId: number;
}

type EmployeeUser = User & Employee;

let employee: EmployeeUser = {
  name: 'Alice',
  employeeId: 1,
};

function printUserInfo(user: User & Employee) {
  console.log(`Name: ${user.name}, Employee ID: ${user.employeeId}`);
}
```
