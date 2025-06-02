A queue is a sequential collection of elements that follows the First In First Out (FIFO) principle.

## Key Characteristics

- The first element inserted is the first to be removed.
- Elements are added at one end (rear/tail) and removed from the other end (front/head).
- Queue is an abstract data type, defined by its behavior rather than a specific mathematical model.

## Main Operations

1. **Enqueue**: Adds an element to the rear of the queue.
2. **Dequeue**: Removes an element from the front of the queue.

## Common Use Cases

- Printer job scheduling
- CPU task scheduling
- Callback queue in JavaScript runtime

## Implementation

### Using Array

```js
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        return this.items.shift();
    }

    peek() {
        if (!this.isEmpty()) {
            return this.items[0];
        }
        return undefined;
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    print() {
        console.log(this.items.toString());
    }
}
```

### Using an Object

```javascript
class Queue {
    constructor() {
        this.items = {};
        this.front = 0;
        this.rear = 0;
    }

    enqueue(element) {
        this.items[this.rear] = element;
        this.rear++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }

    peek() {
        return this.isEmpty() ? undefined : this.items[this.front];
    }

    size() {
        return this.rear - this.front;
    }

    isEmpty() {
        return this.rear - this.front === 0;
    }

    print() {
        console.log(this.items);
    }
}
```

