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
    this.tail = null;
  }

  // Basic info and utility methods
  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
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
    this.tail = null;
  }

  // Add methods
  push(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  unshift(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  insert(index, data) {
    if (index < 0 || index > this.getLength()) return false;
    if (index === 0) {
      this.unshift(data);
      return true;
    }
    if (index === this.getLength()) {
      this.push(data);
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
    if (this.head === this.tail) {
      const popped = this.head.data;
      this.head = null;
      this.tail = null;
      return popped;
    }
    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next;
    }
    const popped = this.tail.data;
    this.tail = current;
    this.tail.next = null;
    return popped;
  }

  shift() {
    if (!this.head) return undefined;
    const shifted = this.head.data;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    return shifted;
  }

  remove(index) {
    if (index < 0 || index >= this.getLength()) return undefined;
    if (index === 0) return this.shift();
    if (index === this.getLength() - 1) return this.pop();
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
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    let prev = null;
    let current = this.tail;
    let next = null;
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
  }
}
```