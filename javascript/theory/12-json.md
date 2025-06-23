JSON (JavaScript Object Notation) is a lightweight data interchange format.

## Basic Syntax

```javascript
{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "English"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
}
```

## JSON vs JavaScript Objects

- JSON keys must be strings enclosed in double quotes
- JSON values can be: strings, numbers, booleans, null, arrays, objects
- JSON doesn't support: functions, undefined, Date objects

## Converting JSON

### Object to JSON string

```javascript
JSON.stringify(object, replacer, space);
```

- `replacer`: Function to transform values or array of allowed keys
- `space`: Number of spaces for indentation or string for custom indentation

```javascript
const obj = {name: 'John', age: 30};
JSON.stringify(obj); // '{"name":"John","age":30}'
JSON.stringify(obj, null, 2); // Pretty-printed
```

### JSON string to Object

```javascript
JSON.parse(jsonString, reviver);
```

- `reviver`: Function to transform parsed values

```javascript
const jsonStr = '{"name":"John","age":30}';
JSON.parse(jsonStr); // { name: "John", age: 30 }
```

## Key Points

- `JSON.stringify()` ignores functions, undefined, and symbols
- Circular references cause `JSON.stringify()` to throw an error
- Date objects are converted to ISO string format
- Use a `reviver` function with `JSON.parse()` to deserialize custom data types
- JSON is language-independent but uses JavaScript syntax

## Common Use Cases

- Data storage in localStorage/sessionStorage
- API communication (sending/receiving data)
- Configuration files

## Handling Special Cases

```javascript
// Handling circular references
const circular = {name: 'circular'};
circular.self = circular;
JSON.stringify(circular); // Throws error

// Custom serialization
const customObj = {
  date: new Date(),
  toJSON() {
    return this.date.toISOString();
  },
};
JSON.stringify(customObj); // '"2023-05-20T12:00:00.000Z"'
```
