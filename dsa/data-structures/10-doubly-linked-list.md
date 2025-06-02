```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
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
      result += current.data + ' <-> ';
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
      newNode.prev = this.tail;
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
      this.head.prev = newNode;
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
    newNode.prev = current;
    current.next.prev = newNode;
    current.next = newNode;
    return true;
  }

  // Remove methods
  pop() {
    if (!this.head) return undefined;
    const popped = this.tail.data;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
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
      this.head.prev = null;
    }
    return shifted;
  }

  remove(index) {
    if (index < 0 || index >= this.getLength()) return undefined;
    if (index === 0) return this.shift();
    if (index === this.getLength() - 1) return this.pop();
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    current.prev.next = current.next;
    current.next.prev = current.prev;
    return current.data;
  }

  // Get and set methods
  get(index) {
    if (index < 0 || index >= this.getLength()) return null;
    let current;
    if (index <= this.getLength() / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.getLength() - 1; i > index; i--) {
        current = current.prev;
      }
    }
    return current.data;
  }

  set(index, data) {
    if (index < 0 || index >= this.getLength()) return false;
    let current;
    if (index <= this.getLength() / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;
      for (let i = this.getLength() - 1; i > index; i--) {
        current = current.prev;
      }
    }
    current.data = data;
    return true;
  }

  // Other operations
  reverse() {
    if (!this.head) return;
    let temp = null;
    let current = this.head;
    
    // Swap head and tail
    this.tail = this.head;
    this.head = this.tail;

    while (current !== null) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }

    // If the list has only one node, 
    // we don't need to do anything else
    if (temp !== null) {
      this.head = temp.prev;
    }
  }
}
```