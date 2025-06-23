Objects are collections of key-value pairs used to store and organize data and functionality in JavaScript.

## Basic Syntax and Access

```javascript
let person = {
  name: 'Vishal',
  age: 26,
  sayHi() {
    console.log('Hi');
  },
  address: {city: 'somewhere'},
  hobbies: ['Programming', 'Music'],
};

person.name; // Dot notation
person['name']; // Bracket notation
person.address.city; // Nested access
```

## Object Creation Methods

```javascript
// Object literal
let obj1 = {key: 'value'};

// Constructor function
function Person(name) {
  this.name = name;
}
let obj2 = new Person('John');

// Object.create()
let obj3 = Object.create(Object.prototype);

// Class syntax (ES6+)
class Car {
  constructor(brand) {
    this.brand = brand;
  }
}
let obj4 = new Car('Toyota');
```

## Property Descriptors

```javascript
Object.defineProperty(person, 'id', {
  value: 100,
  writable: false,
  enumerable: true,
  configurable: false,
});
```

## Getters and Setters

```javascript
let user = {
  firstName: 'John',
  lastName: 'Doe',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
};
```

## Object Methods

```javascript
Object.keys(person);
Object.values(person);
Object.entries(person);
Object.assign(target, source1, source2);
Object.freeze(person); // Make object immutable
Object.seal(person); // Prevent adding/deleting properties
```

## Prototypes and Inheritance

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
```

## ES6+ Features

```javascript
// Destructuring
let {name, age} = person;

// Spread operator
let newPerson = {...person, job: 'Developer'};

// Object shorthand
let x = 10,
  y = 20;
let point = {x, y};

// Computed property names
let prop = 'foo';
let obj = {[prop]: 'bar'};
```

## Key Points

- Objects are mutable even when declared with `const`.
- Use `Object.is()` for strict equality comparisons.
- `for...in` loop iterates over enumerable properties.
- `Object.hasOwnProperty()` checks direct properties.
- JSON methods have limitations with functions, `undefined`, and circular references.
- Prototype chain is used for inheritance in JavaScript.
- ES6+ introduced more concise syntax for working with objects.
