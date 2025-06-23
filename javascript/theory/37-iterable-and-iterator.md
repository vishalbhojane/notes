## Iterables

An iterable is an object that implements the iterable protocol by having a `Symbol.iterator` method.

```javascript
const iterable = {
  [Symbol.iterator]() {
    // Iterator definition
    return {
      next() {
        // Implementation
      },
    };
  },
};
```

### Custom Iterable Example

```javascript
const customIterable = { 2, 3, 4, 5],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.data.length) {
                    return { value: this.data[index++], done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
};

for (const item of customIterable) {
    console.log(item);
}
```

## Iterators

An iterator is an object with a `next()` method that returns an object with `value` and `done` properties.

### Key Concepts of Iterators

- `next()`: Returns `{ value, done }` object.
- `value`: The current iteration value.
- `done`: Boolean indicating if iteration is complete.

### Using an Iterator

```javascript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### Custom Iterator Example

```javascript
function customIterator(array) {
  let index = 0;
  return {
    next: function () {
      if (index < array.length) {
        return {value: array[index++], done: false};
      }
      return {value: undefined, done: true};
    },
  };
}

const myIterator = customIterator([1, 2, 3]);
console.log(myIterator.next()); // { value: 1, done: false }
console.log(myIterator.next()); // { value: 2, done: false }
console.log(myIterator.next()); // { value: 3, done: false }
console.log(myIterator.next()); // { value: undefined, done: true }
```

## Generators as Iterators

Generators provide a more concise way to create iterators:

```javascript
function* generatorFunction() {
  yield 'hello';
  yield 'world';
}

const generator = generatorFunction();
for (const word of generator) {
  console.log(word);
}
```

## Key Points

- Iterables implement `Symbol.iterator` method.
- Iterators have a `next()` method returning `{ value, done }`.
- Generators are a concise way to create iterators.
- `for...of` loops work with iterables.
- Many built-in objects like Arrays and Strings are iterable.

Iterables and iterators provide a standardized way to traverse collections in JavaScript, enabling powerful and flexible data manipulation.
