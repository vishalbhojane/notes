```js
Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFunction = this;
  return function (...callArgs) {
    context = context || window;
    const uniqueKey = Symbol();
    context[uniqueKey] = originalFunction;
    const result = context[uniqueKey](...boundArgs, ...callArgs);
    delete context[uniqueKey];
    return result;
  };
};
```

Usage

```javascript
// Basic binding
function greet(name) {
  return `${this.title} ${name}`;
}
const boundGreet = greet.myBind({title: 'Hello'});
console.log(boundGreet('John'));
// "Hello John"

// Binding with preset arguments
function multiply(a, b, c) {
  return this.base * a * b * c;
}
const multiplyByTwo = multiply.myBind({base: 2}, 2);
console.log(multiplyByTwo(3, 4)); // 2 * 2 * 3 * 4
// 48

// Object methods
const person = {
  name: 'John',
  introduce(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
  },
};
const janeIntro = person.introduce.myBind({name: 'Jane'}, 'Hello');
console.log(janeIntro('!'));
// "Hello, I'm Jane!"

// Reusing bound function
const sum = function (a, b, c) {
  return this.num + a + b + c;
};
const addFive = sum.myBind({num: 5});
console.log(addFive(1, 2, 3)); // 11
console.log(addFive(2, 3, 4)); // 14
```
