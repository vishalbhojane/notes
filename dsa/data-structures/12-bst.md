Introduction to Binary Search Tree:

- A Binary Search Tree is a hierarchical data structure composed of nodes.
- Each node contains a value and two references (links) to other nodes: left and right child.
- For any given node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater.
- Provides efficient operations for insertion, deletion, and searching.
- Offers ordered traversal of elements.
- Average time complexity for basic operations is O(log n), but can degrade to O(n) in worst cases (unbalanced tree).

Real-world examples of Binary Search Tree usage:

1. Implementing associative arrays (symbol tables)
2. Database indexing for range queries
3. File systems organization
4. Expression evaluation in compilers
5. Huffman coding trees in data compression algorithms

Key operations and their average time complexities:

- Insertion: O(log n)
- Deletion: O(log n)
- Search: O(log n)
- Traversal (in-order, pre-order, post-order): O(n)

Traversal

- Preorder (Root, Left, Right)
- Inorder (Left, Root, Right)
- Postorder (Left, Right, Root)

Advantages of BST:

1. Maintains sorted data
2. Allows for efficient range queries
3. Relatively simple to implement compared to more complex tree structures
4. Can be easily augmented to support additional operations

Disadvantages of BST:

1. Can become unbalanced, leading to worst-case O(n) time complexity
2. No constant-time access to elements (unlike arrays)
3. Requires more memory than arrays due to pointer overhead

Variations and improvements:

1. Self-balancing BSTs (e.g., AVL trees, Red-Black trees)
2. Threaded Binary Trees
3. Splay Trees
4. B-Trees and B+ Trees (used in databases and file systems)

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  find(value) {
    if (this.root === null) return false;
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  min() {
    if (this.root === null) return null;
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  max() {
    if (this.root === null) return null;
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.value;
  }

  bfs() {
    let node = this.root;
    const data = [];
    const queue = [];
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  dfsPreOrder() {
    const data = [];
    function traverse(node) {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return data;
  }

  dfsInOrder() {
    const data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return data;
  }

  dfsPostOrder() {
    const data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    }
    traverse(this.root);
    return data;
  }

  remove(value) {
    const removeNode = (node, value) => {
      if (node === null) return null;
      if (value === node.value) {
        // Node has no children
        if (node.left === null && node.right === null) return null;
        // Node has no left child
        if (node.left === null) return node.right;
        // Node has no right child
        if (node.right === null) return node.left;
        // Node has two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.value = tempNode.value;
        node.right = removeNode(node.right, tempNode.value);
        return node;
      } else if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    };
    this.root = removeNode(this.root, value);
  }
}
```

Usage

```javascript
const bst = new BinarySearchTree();

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(2);
bst.insert(7);
bst.insert(12);
bst.insert(17);

console.log(bst.find(7)); // true
console.log(bst.find(9)); // false

console.log(bst.min()); // 2
console.log(bst.max()); // 17

console.log(bst.bfs()); // [10, 5, 15, 2, 7, 12, 17]
console.log(bst.dfsPreOrder()); // [10, 5, 2, 7, 15, 12, 17]
console.log(bst.dfsInOrder()); // [2, 5, 7, 10, 12, 15, 17]
console.log(bst.dfsPostOrder()); // [2, 7, 5, 12, 17, 15, 10]

bst.remove(5);
console.log(bst.dfsInOrder()); // [2, 7, 10, 12, 15, 17]
```
