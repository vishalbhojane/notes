Design an EventEmitter class with two methods:

1. subscribe(eventName, callback):
   - Adds a callback function for the given event.
   - Returns an object with an unsubscribe method.
2. emit(eventName, args):
   - Triggers all callbacks for the given event with optional arguments.
   - Returns an array of results from the callbacks.

## Solution

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    return {
      unsubscribe: () => {
        this.events[eventName] = this.events[eventName].filter(
          (cb) => cb !== callback
        );
        if (this.events[eventName].length === 0) {
          delete this.events[eventName];
        }
      },
    };
  }

  emit(eventName, args = []) {
    if (!this.events[eventName]) {
      return [];
    }
    return this.events[eventName].map((cb) => cb(...args));
  }
}
```

## Usage

```javascript
const emitter = new EventEmitter();

// Subscribe to events
const sub1 = emitter.subscribe('onClick', (x) => x + 1);
const sub2 = emitter.subscribe('onClick', (x) => x + 2);
const sub3 = emitter.subscribe('onKeyPress', (key) => key.toUpperCase());

// Emit events and get results
console.log(emitter.emit('onClick', [5]));
// [6, 7]

console.log(emitter.emit('onKeyPress', ['a']));
// ['A']

// Unsubscribe
sub1.unsubscribe();
console.log(emitter.emit('onClick', [5]));
// [7]

// Emit non-existent event
console.log(emitter.emit('nonExistent'));
// []

// Multiple arguments
const logSub = emitter.subscribe('log', (msg, level) => `${level}: ${msg}`);
console.log(emitter.emit('log', ['Hello', 'INFO']));
// ['INFO: Hello']
```
