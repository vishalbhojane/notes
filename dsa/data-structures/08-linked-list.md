A linked list is a linear data structure consisting of a sequence of elements where each element points to the next one.

## Key Characteristics

- Each node contains a data value and a pointer to the next node.
- Elements can be easily inserted or removed without reorganizing the entire structure.
- Random access is not feasible; accessing elements has linear time complexity.

## Main Operations

1. **Insertion**: Add an element at the beginning, end, or at a given index.
2. **Deletion**: Remove an item given its index or value.
3. **Search**: Find an element given its value.

## Common Use Cases

- Implementation of stacks and queues
- Image viewers (for navigating through images)
- Music players (for creating playlists)

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Basic info and utility methods
  getHead() {
    return this.head;
  }

  getLength() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  printList() {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.data + ' -> ';
      current = current.next;
    }
    console.log(result + 'null');
  }

  makeEmpty() {
    this.head = null;
  }

  // Add methods
  push(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  unshift(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  insert(index, data) {
    if (index < 0 || index > this.getLength()) return false;
    if (index === 0) {
      this.unshift(data);
      return true;
    }
    const newNode = new Node(data);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    return true;
  }

  // Remove methods
  pop() {
    if (!this.head) return undefined;
    if (!this.head.next) {
      const popped = this.head.data;
      this.head = null;
      return popped;
    }
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    const popped = current.next.data;
    current.next = null;
    return popped;
  }

  shift() {
    if (!this.head) return undefined;
    const shifted = this.head.data;
    this.head = this.head.next;
    return shifted;
  }

  remove(index) {
    if (index < 0 || index >= this.getLength()) return undefined;
    if (index === 0) return this.shift();
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    const removed = current.next.data;
    current.next = current.next.next;
    return removed;
  }

  // Get and set methods
  get(index) {
    if (index < 0 || index >= this.getLength()) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  set(index, data) {
    if (index < 0 || index >= this.getLength()) return false;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    current.data = data;
    return true;
  }

  // Other operations
  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}
```

Usage

```javascript
const list = new LinkedList();
list.push(1);
list.push(2);
list.push(3);
list.printList(); // 1 -> 2 -> 3 -> null
list.reverse();
list.printList(); // 3 -> 2 -> 1 -> null
console.log(list.pop()); // 1
list.printList(); // 3 -> 2 -> null
```




