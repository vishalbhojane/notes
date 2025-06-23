Generators are special functions that can pause and resume execution, yielding values along the way.

## Basic Syntax

```javascript
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generatorFunction();
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
```

## Key Concepts

- Defined using `function*` syntax
- Use `yield` keyword to pause and yield values
- Return a generator object
- Can be iterated using `.next()` or `for...of` loops

## Infinite Sequence Example

```javascript
function* naturalNumbers() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

const numbers = naturalNumbers();
for (let i = 0; i < 5; i++) {
  console.log(numbers.next().value);
}
// Outputs: 1, 2, 3, 4, 5
```

## `yield*` Operator

Used to delegate to another generator or iterable object:

```javascript
function* generator() {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
}

for (let value of generator()) {
  console.log(value);
}
// Outputs: 1, 2, 3, 4, 5
```

## Return in Generators

```javascript
function* generator() {
  yield 'a';
  return 'end';
  yield 'b'; // Never reached
}

const gen = generator();
console.log(gen.next()); // { value: 'a', done: false }
console.log(gen.next()); // { value: 'end', done: true }
```

## Error Handling

```javascript
function* generator() {
  try {
    yield 'Normal execution';
  } catch (e) {
    console.log('Error caught:', e);
  }
}

const gen = generator();
console.log(gen.next());
gen.throw(new Error('Generator error'));
```

## Async Generators

```javascript
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
}

(async () => {
  for await (let value of asyncGenerator()) {
    console.log(value);
  }
})();
// Outputs: 1, 2
```

## Limitations

- Cannot use `yield` inside callbacks or nested functions within the generator.

## Key Points

- Generators provide a way to work with iterative algorithms.
- They are useful for handling asynchronous operations and creating infinite sequences.
- The state of the generator is saved between yields.
- Async generators combine the power of async/await with generator functionality.
