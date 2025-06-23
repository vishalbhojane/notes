Create a function `sleep` that takes a time in milliseconds.
It should:

1. Return a promise that resolves after the specified delay
2. Used to pause execution in async functions

```javascript
function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
```

## Usage

```javascript
// Basic sleep
async function demo1() {
  console.log('Start');
  await sleep(1000);
  console.log('After 1 second');
}
demo1();
// "Start"
// (1 second later)
// "After 1 second"

// Multiple sleeps
async function demo2() {
  console.log('First');
  await sleep(500);
  console.log('After 500ms');
  await sleep(1000);
  console.log('After 1.5 seconds total');
}
demo2();

// Sleep in loop
async function demo3() {
  for (let i = 1; i <= 3; i++) {
    await sleep(1000);
    console.log(`${i} second(s) passed`);
  }
}
demo3();

// Zero milliseconds
async function demo4() {
  console.log('Before');
  await sleep(0);
  console.log('After');
}
demo4();
```
