Classes in JavaScript are syntactical sugar over prototypal inheritance, introduced in ES6.

## Key Points:

- Classes are templates for creating objects
- They encapsulate data with code to work on that data
- Classes in JS are built on prototypes ## Class Syntax

```javascript
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getDetails() {
    return `${this.make} ${this.model} (${this.year})`;
  }
}

let myCar = new Car('Toyota', 'Corolla', 2020);
```

## Static Methods

Static methods are defined using the `static` keyword:

```javascript
class Car {
  static calculateAge(year) {
    return new Date().getFullYear() - year;
  }
}
```

## Inheritance

Inheritance is implemented using the `extends` keyword:

```javascript
class ElectricCar extends Car {
  constructor(make, model, year, batteryLife) {
    super(make, model, year);
    this.batteryLife = batteryLife;
  }
}
```

## Private Fields

Private fields, denoted by `#`, encapsulate data within the class:

```javascript
class Book {
  #title;
  constructor(title) {
    this.#title = title;
  }
}
```

## Decorators

Decorators can modify the behavior of classes or methods:

```javascript
@logMethod
getFileSize() {
    return `${this.#title} file size: ${this.#fileSize}MB`;
}
```

Note: Decorators are a proposed feature and may require additional setup to use.
