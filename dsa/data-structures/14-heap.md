Introduction to Heaps:
- A heap is a specialized tree-based data structure that satisfies the heap property.
- In a max-heap, for any given node I, the value of I is greater than or equal to the values of its children.
- In a min-heap, the value of I is less than or equal to the values of its children.
- Heaps are commonly implemented as binary heaps, where each node has at most two children.

Key Properties:
1. Shape Property: A heap is a complete binary tree (all levels are fully filled except possibly the last level, which is filled from left to right).
2. Heap Property: Determines the relationship between parent and child nodes (max-heap or min-heap).

Types of Heaps:
1. Binary Heap (most common)
2. Fibonacci Heap
3. Leftist Heap
4. Binomial Heap
5. Pairing Heap

Basic Heap Operations:
1. Insert: Add an element to the heap
2. Remove (Extract Min/Max): Remove and return the root element
3. Peek: View the root element without removing it
4. Heapify: Create a heap from an array of elements

Advanced Heap Operations:
1. Decrease Key: Decrease the value of a given node
2. Delete: Remove a specific element from the heap
3. Merge: Combine two heaps into one

Time Complexities:
- Insert: O(log n)
- Remove (Extract Min/Max): O(log n)
- Peek: O(1)
- Build Heap: O(n)

Space Complexity:
- O(n) where n is the number of elements in the heap

Real-world applications of Heaps:
1. Priority Queues: Managing task priorities in operating systems
2. Dijkstra's Algorithm: Finding shortest paths in graphs
3. Huffman Coding: Data compression algorithms
4. Heap Sort: Efficient sorting algorithm
5. Memory Management: In some programming language implementations
6. Event-driven Simulation: Managing event queues
7. Median Maintenance: Finding median in a stream of numbers
8. K-way Merge: Merging k sorted arrays
9. Load Balancing: In distributed systems

Advantages of Heaps:
1. Efficient for maintaining a dynamic set of elements with priority
2. Constant time access to the minimum/maximum element
3. Relatively simple to implement and understand
4. Efficient for implementing priority queues

Challenges with Heaps:
1. Not suitable for searching for arbitrary elements (O(n) time)
2. Limited to priority-based operations
3. Can be less cache-friendly than arrays due to non-contiguous memory access

Variations:
1. d-ary Heap: Generalizes binary heaps to d children per node
2. Soft Heap: Probabilistic data structure with controlled corruption
3. Treap: Combination of binary search tree and heap

Implementation Techniques:
1. Array-based: Most common and efficient for random access
2. Pointer-based: Each node contains pointers to its children

Heaps in Standard Libraries:
- C++: `priority_queue` in STL
- Java: `PriorityQueue` class
- Python: `heapq` module

Heaps are fundamental in computer science, particularly in algorithm design and optimization problems. They provide an efficient way to maintain a set of elements with quick access to the element with highest (or lowest) priority.
## Min-Heap

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    let currentIndex = index;
    let parentIndex = this.getParentIndex(currentIndex);

    while (currentIndex > 0 && this.heap[parentIndex] > this.heap[currentIndex]) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  remove() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return min;
  }

  heapifyDown(index) {
    let currentIndex = index;
    let leftChildIndex = this.getLeftChildIndex(currentIndex);
    let rightChildIndex = this.getRightChildIndex(currentIndex);
    let smallestIndex = currentIndex;

    const size = this.heap.length;

    if (leftChildIndex < size && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < size && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== currentIndex) {
      this.swap(currentIndex, smallestIndex);
      this.heapifyDown(smallestIndex);
    }
  }

  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  buildHeap(array) {
    this.heap = array;
    for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  print() {
    console.log(this.heap);
  }
}
```

Usage

```javascript
const minHeap = new MinHeap();

minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(7);
minHeap.insert(1);

console.log("Heap after insertions:");
minHeap.print(); // [1, 3, 7, 5]

console.log("Minimum element:", minHeap.peek()); // 1

console.log("Removed minimum:", minHeap.remove()); // 1
console.log("Heap after removal:");
minHeap.print(); // [3, 5, 7]

console.log("Building heap from array:");
minHeap.buildHeap([10, 8, 6, 4, 2]);
minHeap.print(); // [2, 4, 6, 8, 10]

console.log("Heap size:", minHeap.size()); // 5
console.log("Is heap empty?", minHeap.isEmpty()); // false
```

## Max-Heap

```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    let currentIndex = index;
    let parentIndex = this.getParentIndex(currentIndex);

    while (currentIndex > 0 && this.heap[parentIndex] < this.heap[currentIndex]) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  remove() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return max;
  }

  heapifyDown(index) {
    let currentIndex = index;
    let leftChildIndex = this.getLeftChildIndex(currentIndex);
    let rightChildIndex = this.getRightChildIndex(currentIndex);
    let largestIndex = currentIndex;

    const size = this.heap.length;

    if (leftChildIndex < size && this.heap[leftChildIndex] > this.heap[largestIndex]) {
      largestIndex = leftChildIndex;
    }

    if (rightChildIndex < size && this.heap[rightChildIndex] > this.heap[largestIndex]) {
      largestIndex = rightChildIndex;
    }

    if (largestIndex !== currentIndex) {
      this.swap(currentIndex, largestIndex);
      this.heapifyDown(largestIndex);
    }
  }

  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  buildHeap(array) {
    this.heap = array;
    for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  print() {
    console.log(this.heap);
  }
}
```

Usage

```javascript
const maxHeap = new MaxHeap();

maxHeap.insert(5);
maxHeap.insert(3);
maxHeap.insert(7);
maxHeap.insert(1);

console.log("Heap after insertions:");
maxHeap.print(); // [7, 5, 3, 1]

console.log("Maximum element:", maxHeap.peek()); // 7

console.log("Removed maximum:", maxHeap.remove()); // 7
console.log("Heap after removal:");
maxHeap.print(); // [5, 1, 3]

console.log("Building heap from array:");
maxHeap.buildHeap([10, 8, 6, 4, 2]);
maxHeap.print(); // [10, 8, 6, 4, 2]

console.log("Heap size:", maxHeap.size()); // 5
console.log("Is heap empty?", maxHeap.isEmpty()); // false
```