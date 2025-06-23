Create an Array method `groupBy` that takes a callback function.
It should:

1. Group array elements by callback function's return value
2. Create an object with keys as group identifiers
3. Return object where each key contains array of matching elements

## Solution

```js
Array.prototype.groupBy = function (fn) {
  const groups = {};

  this.forEach(item => {
    const key = fn(item);

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  return groups;
};
```

## Usage

```javascript
// Group numbers by remainder
console.log([1, 2, 3, 4, 5].groupBy(num => num % 2));
// { '0': [2,4], '1': [1,3,5] }

// Group strings by length
console.log(['one', 'two', 'three'].groupBy(str => str.length));
// { '3': ['one', 'two'], '5': ['three'] }

// Group objects by property
const items = [
  {type: 'fruit', name: 'apple'},
  {type: 'veg', name: 'carrot'},
  {type: 'fruit', name: 'banana'},
];
console.log(items.groupBy(item => item.type));
// {
//   fruit: [{type:'fruit', name:'apple'}, {type:'fruit', name:'banana'}],
//   veg: [{type:'veg', name:'carrot'}]
// }

// Empty array
console.log([].groupBy(x => x)); // {}
```
