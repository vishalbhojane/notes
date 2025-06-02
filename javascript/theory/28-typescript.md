# TypeScript

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

## Basic Concepts

### Static Typing

```typescript
// Variable type annotation
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Function type annotation
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Array type annotation
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Tuple type
let person: [string, number] = ["John", 30];
```

### Interfaces

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Readonly property
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  createdAt: new Date()
};
```

### Types

```typescript
// Type alias
type Point = {
  x: number;
  y: number;
};

// Union types
type Status = "active" | "inactive" | "pending";

// Intersection types
type Employee = Person & {
  employeeId: number;
  department: string;
};
```

## Advanced Features

### Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface GenericArray<T> {
  [index: number]: T;
}

// Generic class
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
```

### Decorators

```typescript
// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### Enums

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}
```

## Type System Features

### Type Inference

```typescript
// TypeScript infers the type
let x = 3; // x is inferred as number
let y = "hello"; // y is inferred as string

// Contextual typing
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button); // OK
};
```

### Type Guards

```typescript
// typeof type guard
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// instanceof type guard
class Bird {
  fly() {
    console.log("flying");
  }
}

class Fish {
  swim() {
    console.log("swimming");
  }
}

function move(pet: Bird | Fish) {
  if (pet instanceof Bird) {
    pet.fly();
  } else {
    pet.swim();
  }
}
```

## Best Practices

### Type Definitions

```typescript
// Use type aliases for complex types
type UserPreferences = {
  theme: "light" | "dark";
  notifications: boolean;
  language: string;
};

// Use interfaces for object shapes
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}
```

### Error Handling

```typescript
// Custom error class
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Type-safe error handling
function validateInput(input: string): string {
  if (!input) {
    throw new ValidationError("Input cannot be empty");
  }
  return input;
}
```

### Utility Types

```typescript
// Partial<T>
type PartialUser = Partial<User>;

// Readonly<T>
type ReadonlyUser = Readonly<User>;

// Pick<T, K>
type UserName = Pick<User, "name">;

// Omit<T, K>
type UserWithoutId = Omit<User, "id">;
```

## Integration with JavaScript

### Declaration Files

```typescript
// types.d.ts
declare module "my-module" {
  export function doSomething(): void;
  export interface Options {
    name: string;
    age: number;
  }
}
```

### Type Assertions

```typescript
// Angle bracket syntax
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as syntax
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

## Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Common Patterns

### Factory Pattern

```typescript
interface Product {
  name: string;
  price: number;
}

class ProductFactory {
  static createProduct(name: string, price: number): Product {
    return { name, price };
  }
}
```

### Singleton Pattern

```typescript
class Singleton {
  private static instance: Singleton;
  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
```

### Observer Pattern

```typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  notifyObservers(data: any): void {
    this.observers.forEach(observer => observer.update(data));
  }
}
``` 