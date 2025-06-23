These methods are used to manipulate the context of the invoking function, allowing you to replace the value of `this` inside a function with any desired value.

## Call

Used to borrow methods/functions from other objects and change the context of standalone functions.

```js
let person1 = {
  firstName: 'vishal',
  lastName: 'bhojane',
  printFullName: function () {
    console.log(this.firstName + ' ' + this.lastName);
  },
};

let person2 = {
  firstName: 'ankesh',
  lastName: 'bhojane',
};

// Borrow method from other object
person1.printFullName.call(person2);

// Change context of standalone function
function printFullName2() {
  console.log(this.firstName + ' ' + this.lastName);
}
printFullName2.call(person2);

// Passing arguments
function printFullNameAndHometown(hometown) {
  console.log(this.firstName + ' ' + this.lastName + ' from ' + hometown);
}
printFullNameAndHometown.call(person2, 'mumbai');

// Multiple arguments (comma-separated)
function printFullNameAndHometownAndState(hometown, state) {
  console.log(
    this.firstName + ' ' + this.lastName + ' from ' + hometown + ', ' + state
  );
}
printFullNameAndHometownAndState.call(person2, 'mumbai', 'maharashtra');
```

## Apply

Similar to `call()`, but arguments are passed as an array.

```javascript
printFullNameAndHometownAndState.apply(person2, ['mumbai', 'maharashtra']);
```

## Bind

Similar to `call()`, but returns a new function instead of invoking it immediately.

```javascript
let printDetails = printFullNameAndHometownAndState.bind(
  person2,
  'mumbai',
  'maharashtra'
);
printDetails();
```

Key differences:

- `call()`: Invokes the function immediately with given context and comma-separated arguments.
- `apply()`: Invokes the function immediately with given context and arguments as an array.
- `bind()`: Returns a new function with the specified context and preset arguments, to be invoked later.
