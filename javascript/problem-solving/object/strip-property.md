Create a function `stripProperty` that takes an object and a property name.
It should:

1. Remove the specified property if it exists
2. Return the modified object
3. Leave object unchanged if property doesn't exist

## Solution

```js
function stripProperty(obj, prop) {
  if (obj.hasOwnProperty(prop)) {
    delete obj[prop];
  }
  return obj;
}
```

Usage

```javascript
stripProperty({a: 1, b: 2}, 'a'); // {b: 2}
stripProperty({x: 1, y: 2}, 'z'); // {x: 1, y: 2}
stripProperty({name: 'test'}, 'name'); // {}
```
