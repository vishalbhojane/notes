Create a function `myInstanceOf` that checks if an object is an instance of a constructor.
It should:

1. Check if an object is an instance of a constructor by traversing the prototype chain
2. Return true if the object inherits from the constructor's prototype
3. Return false otherwise

## Solution

```javascript
function myInstanceOf(obj, cons) {
  // Handle null and undefined
  if (obj === null || obj === undefined) {
    return false;
  }

  // Get the prototype of the object
  let proto = Object.getPrototypeOf(obj);

  // Get the prototype property of the constructor
  const constructorProto = cons.prototype;

  // Traverse up the prototype chain
  while (proto !== null) {
    if (proto === constructorProto) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}
```

## Usage

```javascript
class A {}
class B extends A {}
const b = new B();

// Check direct instance
console.log(myInstanceOf(b, B));
// true

// Check inherited instance
console.log(myInstanceOf(b, A));
// true

// Check Object inheritance
console.log(myInstanceOf(b, Object));
// true

// Check non-instance
function C() {}
console.log(myInstanceOf(b, C));
// false

// Check after prototype modification
C.prototype = B.prototype;
console.log(myInstanceOf(b, C));
// true

// Check after prototype reset
C.prototype = {};
console.log(myInstanceOf(b, C));
// false
```
