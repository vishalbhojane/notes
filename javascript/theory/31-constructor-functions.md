A constructor function is a regular function used with the `new` keyword to create and initialize object instances.

## Basic Usage

```javascript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

let myCar = new Car('Toyota', 'Corolla', 2020);

console.log(myCar);
// Output: Car { make: 'Toyota', model: 'Corolla', year: 2020 }
```

Key points:

- Constructor functions are typically capitalized.
- The `new` keyword creates a new object and sets `this` within the function to the new object.
- Properties are assigned to `this`.

## Adding Methods

Methods are added to the prototype to be shared by all instances:

```javascript
Car.prototype.getDetails = function () {
  return `${this.make} ${this.model} (${this.year})`;
};

console.log(myCar.getDetails()); // Output: Toyota Corolla (2020)
```

Benefits:

- Memory efficient: All instances share the same method.
- Allows for method overriding in subclasses.

## Static Methods

Static methods are added directly to the constructor function:

```javascript
Car.calculateAge = function (year) {
  return new Date().getFullYear() - year;
};

console.log(Car.calculateAge(2020)); // Output: 3 (assuming current year is 2023)
```

Key points:

- Called on the constructor function, not instances
- Typically used for utility functions related to the class.

## Inheritance

Inheritance is implemented through prototypal inheritance:

```javascript
function ElectricCar(make, model, year, batteryLife) {
  Car.call(this, make, model, year);
  this.batteryLife = batteryLife;
}

ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;

ElectricCar.prototype.getBatteryInfo = function () {
  return `Battery life: ${this.batteryLife} hours`;
};

let myElectricCar = new ElectricCar('Tesla', 'Model 3', 2021, 300);
console.log(myElectricCar.getDetails()); // Output: Tesla Model 3 (2021)
console.log(myElectricCar.getBatteryInfo()); // Output: Battery life: 300 hours
```

Key points:

- `Car.call(this, ...)` calls the parent constructor.
- `Object.create(Car.prototype)` creates a new object with `Car.prototype` as its prototype.
- Resetting the constructor property is important for maintaining the correct inheritance chain.
