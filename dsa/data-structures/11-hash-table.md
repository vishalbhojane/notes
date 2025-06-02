Introduction to Hash Table:
- A Hash Table is a data structure that stores key-value pairs.
- It uses a hash function to compute an index into an array of buckets or slots.
- Ideal for quick insertion, deletion, and retrieval of data.
- Provides average time complexity of O(1) for basic operations.
- Handles collisions through methods like chaining or open addressing.

Real-world examples of Hash Table usage:
1. Database indexing
2. Caching systems (e.g., web browser cache)
3. Symbol tables in compilers and interpreters
4. Password verification
5. Spell checkers and dictionaries

```javascript
class HashTable {
  constructor(size = 7) {
    this.table = new Array(size);
  }

  hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total = (total + key.charCodeAt(i) * 23) % this.table.length;
    }
    return total;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i][0] === key) {
        this.table[index][i][1] = value;
        return;
      }
    }
    this.table[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          return this.table[index][i][1];
        }
      }
    }
    return undefined;
  }

  remove(key) {
    const index = this.hash(key);
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }

  keys() {
    const allKeys = [];
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        for (let j = 0; j < this.table[i].length; j++) {
          allKeys.push(this.table[i][j][0]);
        }
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        for (let j = 0; j < this.table[i].length; j++) {
          allValues.push(this.table[i][j][1]);
        }
      }
    }
    return allValues;
  }

  clear() {
    this.table = new Array(this.table.length);
  }

  print() {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        console.log(i + ":");
        for (let j = 0; j < this.table[i].length; j++) {
          console.log(`   {${this.table[i][j][0]}, ${this.table[i][j][1]}}`);
        }
      }
    }
  }
}
```

Usage

```javascript
const ht = new HashTable();

ht.set("grapes", 1000);
ht.set("apples", 54);
ht.set("oranges", 32);

ht.print();

console.log(ht.get("grapes")); // 1000
console.log(ht.keys()); // ["grapes", "apples", "oranges"]
console.log(ht.values()); // [1000, 54, 32]

ht.remove("apples");
console.log(ht.keys()); // ["grapes", "oranges"]

ht.clear();
ht.print(); // Empty hash table
```