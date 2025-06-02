# Meta-programming in JavaScript

Meta-programming refers to programming techniques that manipulate other programs or themselves as their data.

## Proxy

The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.

### Basic Proxy

```javascript
const target = {
  message: "hello"
};

const handler = {
  get: function(target, prop, receiver) {
    return prop in target ? target[prop] : `Property ${prop} not found`;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.message); // "hello"
console.log(proxy.unknown); // "Property unknown not found"
```

### Validation Proxy

```javascript
const validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('Age must be an integer');
      }
      if (value < 0) {
        throw new RangeError('Age must be positive');
      }
    }
    obj[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25; // OK
person.age = -1; // Throws RangeError
person.age = "young"; // Throws TypeError
```

### Logging Proxy

```javascript
const loggingHandler = {
  get: function(target, prop) {
    console.log(`Getting property: ${prop}`);
    return target[prop];
  },
  set: function(target, prop, value) {
    console.log(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({}, loggingHandler);
obj.name = "John"; // Logs: Setting property: name to John
console.log(obj.name); // Logs: Getting property: name
```

## Reflect

The Reflect object provides methods for interceptable JavaScript operations.

### Basic Usage

```javascript
const obj = { x: 1, y: 2 };

// Using Reflect
Reflect.set(obj, 'z', 3);
console.log(Reflect.get(obj, 'z')); // 3

// Equivalent to
obj.z = 3;
console.log(obj.z); // 3
```

### Property Operations

```javascript
const obj = {};

// Define property
Reflect.defineProperty(obj, 'name', {
  value: 'John',
  writable: true,
  configurable: true
});

// Check if property exists
console.log(Reflect.has(obj, 'name')); // true

// Get property descriptor
const desc = Reflect.getOwnPropertyDescriptor(obj, 'name');
console.log(desc.value); // "John"

// Delete property
Reflect.deleteProperty(obj, 'name');
console.log(Reflect.has(obj, 'name')); // false
```

## Symbol

Symbols are unique and immutable primitive values that can be used as object property keys.

### Creating Symbols

```javascript
// Unique symbols
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description');

console.log(sym1 === sym2); // false
console.log(sym2 === sym3); // false

// Global symbols
const globalSym = Symbol.for('global');
const sameGlobalSym = Symbol.for('global');
console.log(globalSym === sameGlobalSym); // true
```

### Well-known Symbols

```javascript
class CustomArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const arr = new CustomArray(1, 2, 3);
const mapped = arr.map(x => x * x);

console.log(mapped instanceof CustomArray); // false
console.log(mapped instanceof Array); // true
```

## Property Descriptors

Property descriptors describe the attributes of a property.

### Basic Descriptors

```javascript
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: true,
  enumerable: true,
  configurable: true
});

// Get property descriptor
const desc = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(desc);
// {
//   value: "John",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

### Advanced Usage

```javascript
const obj = {};

// Define multiple properties
Object.defineProperties(obj, {
  name: {
    value: 'John',
    writable: false
  },
  age: {
    get() {
      return this._age;
    },
    set(value) {
      if (value < 0) throw new Error('Age cannot be negative');
      this._age = value;
    }
  }
});

// Freeze object
Object.freeze(obj);
obj.name = 'Jane'; // Throws in strict mode
```

## Advanced Meta-programming Patterns

### Method Chaining with Proxy

```javascript
const chainable = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return function(...args) {
        target[prop] = args[0];
        return proxy;
      };
    }
  });
};

const obj = chainable({});
obj.setName('John').setAge(25).setCity('New York');
console.log(obj); // { name: 'John', age: 25, city: 'New York' }
```

### Observable Objects

```javascript
function observable(obj) {
  const observers = new Map();

  return new Proxy(obj, {
    set(target, prop, value) {
      const oldValue = target[prop];
      target[prop] = value;
      
      if (observers.has(prop)) {
        observers.get(prop).forEach(callback => 
          callback(value, oldValue)
        );
      }
      return true;
    }
  });
}

const person = observable({ name: 'John' });

// Add observer
person.observe = function(prop, callback) {
  if (!observers.has(prop)) {
    observers.set(prop, new Set());
  }
  observers.get(prop).add(callback);
};

person.observe('name', (newValue, oldValue) => {
  console.log(`Name changed from ${oldValue} to ${newValue}`);
});

person.name = 'Jane'; // Logs: Name changed from John to Jane
```

### Validation Framework

```javascript
const validators = {
  required: value => value !== undefined && value !== null && value !== '',
  min: min => value => value >= min,
  max: max => value => value <= max,
  pattern: pattern => value => pattern.test(value)
};

function createValidator(rules) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (rules[prop]) {
        for (const [validator, params] of Object.entries(rules[prop])) {
          const fn = typeof validators[validator] === 'function' 
            ? validators[validator] 
            : validators[validator](params);
          
          if (!fn(value)) {
            throw new Error(`Validation failed for ${prop}: ${validator}`);
          }
        }
      }
      target[prop] = value;
      return true;
    }
  });
}

const user = createValidator({
  age: {
    required: true,
    min: 18,
    max: 100
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
});

user.age = 25; // OK
user.email = "test@example.com"; // OK
user.age = 15; // Throws: Validation failed for age: min
``` 