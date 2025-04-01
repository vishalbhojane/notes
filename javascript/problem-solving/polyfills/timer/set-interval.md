```javascript
function mySetInterval(callback, delay) {
  let start = Date.now();
  let timer = {id: true};

  function loop() {
    if (!timer.id) return;

    let current = Date.now();
    if (current - start >= delay) {
      callback();
      start = current;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
  return timer;
}

function myClearInterval(timer) {
  if (timer) timer.id = false;
}
```

Usage

```javascript
// Basic interval
let count = 0;
const timer1 = mySetInterval(() => {
  console.log('Tick', ++count);
  if (count >= 3) myClearInterval(timer1);
}, 1000);
// "Tick 1" (after 1s)
// "Tick 2" (after 2s)
// "Tick 3" (after 3s)

// Multiple intervals
const timer2 = mySetInterval(() => console.log('Every 500ms'), 500);
const timer3 = mySetInterval(() => console.log('Every 1000ms'), 1000);

// Clear specific interval
setTimeout(() => {
  myClearInterval(timer2);
  console.log('Stopped 500ms timer');
}, 2000);

// Clear remaining interval
setTimeout(() => {
  myClearInterval(timer3);
  console.log('Stopped all timers');
}, 3000);

// Zero delay
const rapidTimer = mySetInterval(() => {
  console.log('Rapid!');
}, 0);
setTimeout(() => myClearInterval(rapidTimer), 100);
```
