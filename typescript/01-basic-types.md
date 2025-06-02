## Number

Represents both integer and floating-point numbers.

```typescript
typescript let age: number = 30; // An integer
let temperature: number = 36.5; // A float
let sum: number = age + 5; // 35
```

## String

Used for representing text data, enclosed in single, double, or backticks.

```typescript
let firstName: string = 'John';
let lastName: string = 'Doe';
let greeting: string = `Hello, ${firstName} ${lastName}!`;
let fullName: string = firstName + ' ' + lastName; // "John Doe"
```

## Boolean

Represents a value that can be either true or false.

```typescript
let isActive: boolean = false;
let isLoggedIn: boolean = true;
if (isLoggedIn) {
  console.log('Welcome!');
}
```

## Array

An array can hold multiple values of the same type. Defined using the `Type[]` syntax or `Array<Type>`.

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: Array<string> = ['Apple', 'Banana', 'Cherry'];
let firstFruit: string = fruits[0]; // "Apple"
```

## Tuple

A fixed-size array where each element can have a different type.

```typescript
let user: [string, number] = ['Alice', 30];
let [username, userAge]: [string, number] = user; // username = "Alice", userAge = 30
```

## Any

A type that can hold any value; essentially opting out of type checking.

```typescript
let variable: any = 5;
variable = 'Hello'; // No error variable = true; // Still valid
```

## Unknown

Similar to any, but safer. You must do type-checking before using an unknown type.

```typescript
let value: unknown = 30;
if (typeof value === "number") { let numLength: number = value.toString().length; // Now it's safe }
```

## Never

Indicates that a function never finishes executing (not returnable).

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

## Void

Used as the return type for functions that do not return a value.

```typescript
function logMessage(message: string): void {
  console.log(message);
}
```

## Enum

A way to define a set of named constants, improving code readability.

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green; // c is now
enum Status {
  Active = 1,
  Inactive = 0,
  Pending = 2,
}
```
