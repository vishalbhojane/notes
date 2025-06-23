Create a function `myJSONStringify` that takes a value.
It should:

1. Convert JavaScript values to JSON string format
2. Handle all data types (null, undefined, string, number, boolean, array, object)
3. Escape special characters in strings
4. Detect and throw error for circular references

## Solution

```javascript
function myJSONStringify(input) {
  const seen = new WeakSet();

  function stringify(value) {
    // Handle primitive types
    if (value === null) return 'null';
    if (value === undefined) return undefined;
    if (typeof value === 'string')
      return `${value.replace(/"/g, '\\"').replace(/\n/g, '\\n')}`;
    if (typeof value === 'number')
      return isFinite(value) ? String(value) : 'null';
    if (typeof value === 'boolean') return String(value);

    // Handle arrays
    if (Array.isArray(value)) {
      const elements = value.map(item => {
        const result = stringify(item);
        return result === undefined ? 'null' : result;
      });
      return `[${elements.join(',')}]`;
    }

    // Handle objects
    if (typeof value === 'object') {
      if (seen.has(value)) {
        throw new TypeError('Converting circular structure to JSON');
      }
      seen.add(value);

      const keys = Object.keys(value);
      const entries = [];

      for (const key of keys) {
        const result = stringify(value[key]);
        if (result !== undefined) {
          entries.push(`"${key}":${result}`);
        }
      }

      seen.delete(value);
      return `{${entries.join(',')}}`;
    }

    return undefined;
  }

  return stringify(input);
}
```

## Usage

```javascript
// Basic types
console.log(myJSONStringify(null)); // "null"
console.log(myJSONStringify(42)); // "42"
console.log(myJSONStringify('hello')); // "\"hello\""
console.log(myJSONStringify(true)); // "true"

// Arrays
console.log(myJSONStringify([1, 'two', false]));
// "[1,\"two\",false]"

// Objects
console.log(myJSONStringify({a: 1, b: 'two'}));
// "{\"a\":1,\"b\":\"two\"}"

// Nested structures
console.log(
  myJSONStringify({
    name: 'John',
    age: 30,
    address: {
      street: 'Main St',
      city: 'Boston',
    },
    hobbies: ['reading', 'music'],
  })
);
// "{\"name\":\"John\",\"age\":30,\"address\":{\"street\":\"Main St\",\"city\":\"Boston\"},\"hobbies\":[\"reading\",\"music\"]}"

// Special cases
console.log(myJSONStringify(undefined)); // undefined
console.log(myJSONStringify(Infinity)); // "null"
console.log(myJSONStringify({a: undefined})); // "{}"

// Error case - circular reference
const circular = {a: 1};
circular.self = circular;
try {
  myJSONStringify(circular);
} catch (e) {
  console.log(e.message); // "Converting circular structure to JSON"
}
```
