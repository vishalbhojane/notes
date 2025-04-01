Create a function `argumentsLength` that takes any number of arguments.
It should:

1. Return the count of arguments passed to the function
2. Work with any type and number of arguments

## Solution

```javascript
function argumentsLength(...args) {
  return args.length;
}
```

## Usage

```javascript
console.log(argumentsLength(1, 2, 3)); // 3
console.log(argumentsLength('a')); // 1
console.log(argumentsLength()); // 0
console.log(argumentsLength(null, undefined)); // 2
console.log(argumentsLength([1, 2], {a: 1})); // 2
```
