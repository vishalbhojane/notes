The `new` keyword is used to create object instances from constructor functions or classes.

## What `new` Does:

1. Creates a new object instance.
2. Sets the new object's prototype to the constructor's prototype property.
3. Executes the constructor with `this` bound to the new object.
4. Returns the new object.

## Usage with Constructor Functions

```javascript
function Writer(fname, lname) {
  this.firstName = fname;
  this.lastName = lname;
  this.sayName = () => {
    console.log(`${this.firstName} ${this.lastName}`);
  };
}

let jsWriter = new Writer('John', 'Doe');
jsWriter.sayName(); // Output: John Doe
```

## Usage with Classes

```javascript
class Writer {
  constructor(fname, lname) {
    this.firstName = fname;
    this.lastName = lname;
  }

  sayName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
}

let jsWriter = new Writer('Jane', 'Doe');
jsWriter.sayName(); // Output: Jane Doe
```

## With Built-in Constructors

```javascript
const date = new Date();
console.log(date.getDate());
```

## `new` as Syntactic Sugar

The `new` keyword is essentially syntactic sugar for using the `call` method:

```javascript
let jsWriter = Writer.call({}, 'John', 'Doe');
```

Note: This approach doesn't set up the prototype chain correctly and is not recommended for actual use.
