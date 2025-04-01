```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};
```

Usage

```javascript
// Basic usage
function greet(name) {
  return `${this.title} ${name}`;
}

console.log(greet.myCall({title: 'Hello'}, 'John'));
// "Hello John"

// Multiple arguments
function add(b, c) {
  return this.a + b + c;
}

console.log(add.myCall({a: 1}, 2, 3));
// 6

// Using object methods
const person = {
  name: 'John',
  sayHi() {
    return `Hi, I'm ${this.name}`;
  },
};

console.log(person.sayHi.myCall({name: 'Jane'}));
// "Hi, I'm Jane"

// With null/undefined context
function getCurrentContext() {
  return this;
}

console.log(getCurrentContext.myCall(null));
// window (in browser) or global (in Node)
```
