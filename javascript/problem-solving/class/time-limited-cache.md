Create a class `TimeLimitedCache` that implements a time-based cache.
It should:

1. Store key-value pairs that expire after specified duration
2. Return -1 for expired or non-existent keys
3. Track count of active cache entries

## Solution

```javascript
class TimeLimitedCache {
  constructor() {
    this.store = new Map();
  }

  set(key, data, time) {
	const entry = this.store.get(key);
    if (entry) clearTimeout(entry.timerId);

    const timerId = setTimeout(() => this.store.delete(key), time);
    this.store.set(key, {data, timerId});

    return Boolean(entry);Ï
  }

  get(key) {
    return this.store.has(key) ? this.store.get(key).data : -1;
  }

  count() {
    return this.store.size;
  }
}
```

## Usage

```javascript
const cache = new TimeLimitedCache();

// Set key with timeout
console.log(cache.set(1, 'one', 1000)); // false (key didn't exist)
console.log(cache.get(1)); // "one"
console.log(cache.count()); // 1

// Update existing key
console.log(cache.set(1, 'new one', 1000)); // true (key existed)
console.log(cache.get(1)); // "new one"

// Key expires after timeout
setTimeout(() => {
  console.log(cache.get(1)); // -1 (expired)
  console.log(cache.count()); // 0
}, 1500);

// Multiple keys
cache.set(1, 'one', 3000);
cache.set(2, 'two', 2000);
console.log(cache.count()); // 2
```
