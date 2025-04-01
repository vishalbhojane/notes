```js
Function.prototype.myApply = function (context, args) {
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
function greet(name, age) {
  return `${this.title} ${name}, age ${age}`;
}

console.log(greet.myApply({title: 'Hello'}, ['John', 25]));
// "Hello John, age 25"

// With array methods
const numbers = [5, 6, 2, 3, 7];
console.log(Math.max.myApply(null, numbers));
// 7

// Using object methods
const person = {
  name: 'John',
  introduce(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
  },
};

console.log(person.introduce.myApply({name: 'Jane'}, ['Hi', '!']));
// "Hi, I'm Jane!"

// Empty args array
function getContext() {
  return this.value;
}

console.log(getContext.myApply({value: 42}, []));
// 42
```
