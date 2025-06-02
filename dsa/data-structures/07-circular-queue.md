A circular queue, also known as a circular buffer or ring buffer, is a fixed-size queue that follows the FIFO (First In First Out) principle.

## Key Characteristics

- Fixed size queue where the last element is connected to the first element.
- Efficiently reuses empty spaces created by dequeue operations.
- Ideal for applications with a fixed maximum size requirement.

## Main Operations

1. **Enqueue**: Adds an element to the rear of the queue.
2. **Dequeue**: Removes an element from the front of the queue.

## Common Use Cases

- Clock systems
- Streaming data buffers
- Traffic light controllers

```javascript
class CircularQueue {
    constructor(capacity) {
        this.items = new Array(capacity);
        this.capacity = capacity;
        this.front = 0;
        this.rear = 0;
        this.currentLength = 0;
    }

    enqueue(element) {
        if (this.isFull()) {
            return false;
        }
        this.items[this.rear] = element;
        this.rear = (this.rear + 1) % this.capacity;
        this.currentLength++;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const item = this.items[this.front];
        this.items[this.front] = undefined;
        this.front = (this.front + 1) % this.capacity;
        this.currentLength--;
        return item;
    }

    peek() {
        return this.isEmpty() ? null : this.items[this.front];
    }

    size() {
        return this.currentLength;
    }

    isEmpty() {
        return this.currentLength === 0;
    }

    isFull() {
        return this.currentLength === this.capacity;
    }

    print() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return;
        }
        let result = [];
        for (let i = 0; i < this.currentLength; i++) {
            result.push(this.items[(this.front + i) % this.capacity]);
        }
        console.log(result.join(' '));
    }
}
```