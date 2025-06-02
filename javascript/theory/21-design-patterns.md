Design patterns are reusable solutions to common software design problems. Below are key patterns used in JavaScript.

## 1. Module Pattern

Encapsulates code into self-contained modules with private/public members.

### Using IIFE (Immediately Invoked Function Expression)

```javascript
const CounterModule = (() => {
  let count = 0; // Private variable

  const increment = () => count++;
  const getCount = () => count;

  return {increment, getCount}; // Public API
})();

CounterModule.increment();
console.log(CounterModule.getCount()); // 1
console.log(CounterModule.count); // undefined (private)
```

**Use Case:**

- Isolate logic to avoid global scope pollution

## 2. Singleton Pattern

Ensures only one instance of a class exists.

### Implementation

```javascript
class Database {
  constructor() {
    if (Database.instance) return Database.instance;
    Database.instance = this;
    this.connection = 'Connected to DB';
    return this;
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true (same instance)
```

**Use Case:**

- Managing shared resources (e.g., database connections)

## 3. Factory Pattern

Creates objects without exposing the instantiation logic.

### Example

```javascript
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

class CarFactory {
  createCar(type) {
    switch (type) {
      case 'sedan':
        return new Car('Toyota', 'Camry');
      case 'suv':
        return new Car('Ford', 'Explorer');
      default:
        throw new Error('Unknown car type');
    }
  }
}

const factory = new CarFactory();
const myCar = factory.createCar('sedan');
console.log(myCar); // { make: "Toyota", model: "Camry" }
```

**Use Case:**

- Dynamic object creation (e.g., UI components, API clients)

## 4. Observer Pattern

Allows objects (observers) to subscribe to events from another object (subject).

### Implementation

```javascript
class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

const observer = new EventObserver();

// Subscribe
const logData = (data) => console.log('Received:', data);
observer.subscribe(logData);

// Notify
observer.notify('Hello!'); // "Received: Hello!"

// Unsubscribe
observer.unsubscribe(logData);
```

**Use Case:**

- Real-time updates (e.g., chat apps, stock tickers)

## 5. MVC / MVVM Architecture

### A. MVC (Model-View-Controller)

| Layer      | Responsibility                        |
| ---------- | ------------------------------------- |
| Model      | Manages data and business logic       |
| View       | Handles UI rendering                  |
| Controller | Mediates input between Model and View |

**Example (Backend MVC with Express):**

```javascript
// Model (user.js)
class User {
  static getAll() { return db.query("SELECT * FROM users"); }
}

// Controller (userController.js)
const getUsers = (req, res) => {
  const users = User.getAll();
  res.render("users", { users });
};

// View (users.ejs)
<% users.forEach(user => { %>
  <p><%= user.name %></p>
<% }); %>
```

### B. MVVM (Model-View-ViewModel)

Used in frontend frameworks (e.g., Vue, Angular).

| Layer     | Responsibility                   |
| --------- | -------------------------------- |
| Model     | Data structure                   |
| View      | UI (template)                    |
| ViewModel | Binds Model to View (reactivity) |

**Example (Vue):**

```html
<template>
  <!-- View -->
  <p>{{ message }}</p>
</template>

<script>
  export default {
    // ViewModel
    data() {
      // Model
      return {message: 'Hello!'};
    },
  };
</script>
```

## 6. Dependency Injection

Provides dependencies to a class externally (improves testability).

### Constructor Injection

```javascript
class UserService {
  constructor(database) {
    this.db = database;
  }

  getUsers() {
    return this.db.query('SELECT * FROM users');
  }
}

const db = new Database();
const userService = new UserService(db); // Inject dependency
```

**Use Case:**

- Unit testing (easily mock dependencies)
- Decoupling components

## 7. Pub/Sub (Publish-Subscribe) Pattern

A messaging pattern where publishers send messages to subscribers via a broker.

### Implementation

```javascript
class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, callback) {
    if (!this.topics[topic]) this.topics[topic] = [];
    this.topics[topic].push(callback);
  }

  publish(topic, data) {
    if (!this.topics[topic]) return;
    this.topics[topic].forEach((cb) => cb(data));
  }
}

const pubsub = new PubSub();

// Subscribe
pubsub.subscribe('news', (data) => console.log('News:', data));

// Publish
pubsub.publish('news', 'JavaScript is awesome!');
```

**Use Case:**

- Decoupled event handling (e.g., microservices, UI events)

## 8. Prototype Pattern

Creates new objects by cloning an existing prototype object, rather than creating new instances from scratch.

#### Implementation

javascript

```javascript
const carPrototype = {
  wheels: 4,
  start() {
    return 'Engine started!';
  },
  stop() {
    return 'Engine stopped!';
  }
};

// Create new object by cloning prototype
const myCar = Object.create(carPrototype);
myCar.make = 'Toyota';
console.log(myCar.start()); // "Engine started!"
console.log(myCar.wheels); // 4 (inherited)

// Alternative constructor approach
function Car(make) {
  this.make = make;
}
Car.prototype = carPrototype;

const anotherCar = new Car('Ford');
```

**Use Cases:**

- When object creation is expensive (clone instead)
- Default configurations for similar objects
- JavaScript's native prototypal inheritance

## 9. Decorator Pattern

Adds behavior to objects dynamically without affecting other objects of the same class.

#### Implementation

javascript

```javascript
class Coffee {
  cost() {
    return 5;
  }
}

// Decorator
function withMilk(coffee) {
  const cost = coffee.cost();
  coffee.cost = () => cost + 2;
}

// Another Decorator
function withSugar(coffee) {
  const cost = coffee.cost();
  coffee.cost = () => cost + 1;
}

const myCoffee = new Coffee();
withMilk(myCoffee);
withSugar(myCoffee);
console.log(myCoffee.cost()); // 8 (5 + 2 + 1)

// Modern ES6 Decorators (Stage 3 Proposal)
@withMilk
@withSugar
class SpecialCoffee {
  cost = 5;
}
```

**Use Cases:**

- Adding features to existing classes
- Alternative to subclassing
- Middleware implementations

## 10. Strategy Pattern

Encapsulates interchangeable algorithms/behaviors and lets the algorithm vary independently from clients.

#### Implementation

javascript

```javascript
// Strategies
const paymentStrategies = {
  creditCard: (amount) => `Paid ${amount} via Credit Card`,
  paypal: (amount) => `Paid ${amount} via PayPal`,
  crypto: (amount) => `Paid ${amount} via Bitcoin`
};

// Context
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = paymentStrategies[strategy];
  }

  process(amount) {
    return this.strategy(amount);
  }
}

const payment = new PaymentProcessor('crypto');
console.log(payment.process(100)); // "Paid 100 via Bitcoin"
```

**Use Cases:**

- Multiple ways to perform an operation (e.g., payments, sorting)
- Replacing conditional logic
- Plugin architectures

## 11. Revealing Module Pattern

An improved Module Pattern that explicitly declares public members.

#### Implementation

javascript

```javascript
const UserModule = (() => {
  const privateVar = 'I am private';

  function privateMethod() {
    console.log(privateVar);
  }

  function publicMethod() {
    privateMethod();
  }

  return {
    publicMethod // Only expose what's needed
  };
})();

UserModule.publicMethod(); // "I am private"
console.log(UserModule.privateVar); // undefined
```

**Advantages over Classic Module Pattern:**

- Clearer intent (explicit exports)
- Easier to rename public methods
- Better code organization

**Use Cases:**

- Browser-side modules
- Library development
- Anywhere encapsulation is needed
## Key Takeaways

- Module → Encapsulation with private/public members
- Singleton → Single instance of a class
- Factory → Object creation without new
- Observer → Event-driven subscriptions
- MVC/MVVM → Separation of concerns in apps
- Dependency Injection → Testable, decoupled code
- Pub/Sub → Decoupled message broadcasting
