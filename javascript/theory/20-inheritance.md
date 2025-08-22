Inheritance allows objects to acquire properties and methods from parent objects without redundant definition.

## Prototypal Inheritance

Every object has an internal reference called prototype, pointing to another object that provides common properties and methods.

- Property/method access starts at the object itself
- If not found, search continues up the prototype chain
- Stops at `Object.prototype`

### Examples

#### Array

```javascript
let arr = [1, 2, 3, 4, 5];
arr.__proto__ === Array.prototype;
arr.__proto__.__proto__ === Object.prototype;
arr.__proto__.__proto__.__proto__ === null;
```

#### Object

```javascript
let object = {
  name: 'vishal',
  city: 'mumbai',
  getIntro: function () {
    console.log(this.name + ' from ' + this.city);
  },
};
object.__proto__ === Object.prototype;
```

#### Function

```javascript
function printHello() {
  console.log('hello');
}
printHello.__proto__ === Function.prototype;
printHello.__proto__.__proto__ === Object.prototype;
```

Note: Everything in JavaScript is ultimately an object.

## Modifying Prototypes

### Changing the Prototype (Not Recommended)

```javascript
let object2 = {
  name: 'ankesh',
};

object2.__proto__ = object;
console.log(object2.name); // ankesh
console.log(object2.city); // mumbai
object2.getIntro(); // ankesh from mumbai
```

### Adding New Properties and Methods

```javascript
// Example: Custom polyfill for bind() method
Function.prototype.myBind = function () {
  // Implementation
};
```

Note: Modifying built-in prototypes can lead to unexpected behaviour and is generally discouraged.
