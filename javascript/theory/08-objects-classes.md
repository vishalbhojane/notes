Objects store key-value pairs, and classes provide a blueprint for creating objects.

## 1. Object Literals

The simplest way to create an object.

**Syntax:**

```javascript
const obj = {
  key1: value1,
  key2: value2,
  method() {
    /* ... */
  },
};
```

**Example:**

```javascript
const person = {
  name: "Alice",
  age: 25,
  greet() {
    console.log(`Hello, ${this.name}!`);
  },
};

person.greet(); // "Hello, Alice!"
```

## 2. Property Access

### A. Dot Notation (obj.key)

```javascript
console.log(person.name); // "Alice"
```

### B. Bracket Notation (obj\["key"])

Useful for dynamic keys.

```javascript
const key = "age";
console.log(person[key]); // 25
```

## 3. Object Methods

| Method              | Description                | Example                                                          |
| ------------------- | -------------------------- | ---------------------------------------------------------------- |
| Object.keys(obj)    | Returns keys as an array   | `Object.keys(person) → ["name", "age", "greet"]`                 |
| Object.values(obj)  | Returns values as an array | `Object.values(person) → ["Alice", 25, [Function]]`              |
| Object.entries(obj) | Returns [key, value] pairs | `Object.entries(person) → [["name", "Alice"], ["age", 25], ...]` |

**Example:**

```javascript
const keys = Object.keys(person); // ["name", "age", "greet"]
const values = Object.values(person); // ["Alice", 25, [Function]]
const entries = Object.entries(person); // [["name", "Alice"], ["age", 25], ...]
```

## 4. Destructuring Objects

Extract properties into variables.

**Syntax:**

```javascript
const { prop1, prop2 } = obj;
```

**Example:**

```javascript
const { name, age } = person;
console.log(name); // "Alice"
console.log(age); // 25
```

## 5. Spread & Rest ({ ...obj })

### A. Spread Operator (...)

Copies properties into a new object.

```javascript
const newPerson = { ...person, city: "Berlin" };
```

### B. Rest Operator (...)

Collects remaining properties.

```javascript
const { name, ...rest } = person;
console.log(rest); // { age: 25, greet: [Function] }
```

## 6. Prototypes & Inheritance

Objects inherit properties from a prototype.

**Example:**

```javascript
const animal = {
  eats: true,
  walk() {
    console.log("Walking...");
  },
};

const rabbit = {
  jumps: true,
  __proto__: animal, // Inherits from animal
};

rabbit.walk(); // "Walking..." (inherited)
```

## 7. Getters & Setters

Control access to object properties.

**Example:**

```javascript
const user = {
  firstName: "John",
  lastName: "Doe",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },
};

user.fullName = "Alice Cooper";
console.log(user.fullName); // "Alice Cooper"
```

## 8. Classes

Classes are syntactic sugar over prototypes.

**Syntax:**

```javascript
class ClassName {
  constructor() {
    /* ... */
  }
  method1() {
    /* ... */
  }
  static staticMethod() {
    /* ... */
  }
}
```

**Example:**

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Calls parent constructor
    this.breed = breed;
  }
  speak() {
    console.log(`${this.name} barks!`);
  }
}

const dog = new Dog("Rex", "Labrador");
dog.speak(); // "Rex barks!"
```

## 9. Static Methods & Properties

Belong to the class itself, not instances.

**Example:**

```javascript
class MathUtils {
  static PI = 3.14;
  static square(x) {
    return x * x;
  }
}

console.log(MathUtils.square(5)); // 25
console.log(MathUtils.PI); // 3.14
```

## 10. this Keyword

### A. How this Works

| Context        | this Value                                          | Example                                                   |
| -------------- | --------------------------------------------------- | --------------------------------------------------------- |
| Global         | window (browser) / global (Node)                    | console.log(this)                                         |
| Function       | window/global (non-strict), undefined (strict mode) | function f() { console.log(this); }                       |
| Method         | The object calling the method                       | obj.method() → this = obj                                 |
| Event Handler  | The DOM element that triggered the event            | button.onclick = function() { this.style.color = 'red'; } |
| Arrow Function | Inherits from parent scope (lexical this)           | const f = () => { console.log(this); }                    |

#### Example:

```javascript
const person = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, ${this.name}!`); // `this` = person object
  },
  arrowGreet: () => {
    console.log(`Hi, ${this.name}!`); // `this` = window (inherited)
  },
};
person.greet(); // "Hello, Alice!"
person.arrowGreet(); // "Hi, undefined!" (lexical this)
```

### B. Explicit Binding

| Method  | Description                                      | Example                              |
| ------- | ------------------------------------------------ | ------------------------------------ |
| call()  | Calls function with specified this and arguments | func.call(thisArg, arg1, arg2)       |
| apply() | Similar to call() but takes array of args        | func.apply(thisArg, [args])          |
| bind()  | Returns new function with bound this             | const boundFunc = func.bind(thisArg) |

#### Example:

```javascript
function introduce(lang) {
  console.log(`I code in ${lang} as ${this.name}`);
}

const dev = { name: "Alice" };
introduce.call(dev, "JavaScript"); // "I code in JavaScript as Alice"
introduce.apply(dev, ["Python"]); // "I code in Python as Alice"
const boundIntro = introduce.bind(dev);
boundIntro("Ruby"); // "I code in Ruby as Alice"
```

### C. Method Chaining

Design pattern where methods return this to enable consecutive calls.

#### Implementation:

```javascript
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this; // ← Key to chaining
  }

  multiply(n) {
    this.value *= n;
    return this;
  }
}

const calc = new Calculator();
calc.add(5).multiply(2).add(10); // value = 20
```

### D. Property Descriptors

Control property attributes like writability, enumerability, and configurability.

| Attribute    | Description                | Default   |
| ------------ | -------------------------- | --------- |
| value        | Property value             | undefined |
| writable     | Can be changed             | true      |
| enumerable   | Shows up in for...in loops | true      |
| configurable | Can be deleted or modified | true      |

#### Methods:

```javascript
// Get descriptor
const desc = Object.getOwnPropertyDescriptor(obj, "property");

// Define/modify property
Object.defineProperty(obj, "property", {
  value: 42,
  writable: false, // Makes it read-only
  enumerable: false, // Hides from Object.keys()
});
```

#### Example:

```javascript
const obj = {};
Object.defineProperty(obj, "readOnly", {
  value: 100,
  writable: false,
});

obj.readOnly = 200; // Fails silently in non-strict
console.log(obj.readOnly); // 100 (unchanged)
```
