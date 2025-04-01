```javascript
function mySetTimeout(callback, delay) {
  let start = Date.now();
  let timer = {id: true};

  function loop() {
    if (!timer.id) return;

    let current = Date.now();
    if (current - start >= delay) {
      callback();
    } else {
      requestAnimationFrame(loop);
    }
  }
  requestAnimationFrame(loop);
  return timer;
}

function myClearTimeout(timer) {
  if (timer) timer.id = false;
}
```

Usage

```javascript
// Basic timeout
const timer1 = mySetTimeout(() => {
  console.log('Executed after 1 second');
}, 1000);

// Clear before execution
const timer2 = mySetTimeout(() => {
  console.log('This will not execute');
}, 2000);
myClearTimeout(timer2);

// Multiple timeouts
mySetTimeout(() => console.log('First - 500ms'), 500);
mySetTimeout(() => console.log('Second - 1000ms'), 1000);
mySetTimeout(() => console.log('Third - 1500ms'), 1500);

// Zero delay
mySetTimeout(() => {
  console.log('Immediate execution');
}, 0);

// Nested timeouts
mySetTimeout(() => {
  console.log('Outer timeout');
  mySetTimeout(() => {
    console.log('Inner timeout');
  }, 500);
}, 1000);
```
