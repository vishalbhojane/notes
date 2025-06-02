A stack is a sequential collection of elements that follows the Last In First Out (LIFO) principle.

## Key Characteristics:

- Last element inserted is the first to be removed
- Abstract data type defined by its behavior

## Main Operations:

1. Push: Add an element to the top
2. Pop: Remove the top element

## Use Cases:

- Browser history tracking
- Undo operations
- Expression conversions
- Call stack in JavaScript runtime

## Implementation

### Using Array:

```javascript
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
        return this;
    }

    pop() {
        return this.isEmpty() ? undefined : this.items.pop();
    }

    peek() {
        return this.isEmpty() ? undefined : this.items[this.items.length - 1];
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }

	clear() {
        this.items = [];
    }
    
	print() {
	    console.log(this.items.toString());
	}
}
```

### Using Object:

```javascript
class Stack {
    constructor() {
        this.items = {};
        this.head = 0;
    }

    push(element) {
        this.items[this.head] = element;
        this.head++;
        return this;
    }

    pop() {
        if (this.isEmpty()) return undefined;
        this.head--;
        const result = this.items[this.head];
        delete this.items[this.head];
        return result;
    }

    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.head - 1];
    }

    size() {
        return this.head;
    }

    isEmpty() {
        return this.head === 0;
    }

    clear() {
        this.items = {};
        this.head = 0;
    }
    
	print() {
	    console.log(this.items);
	}
}
```