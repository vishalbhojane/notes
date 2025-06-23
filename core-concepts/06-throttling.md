Throttling is a technique that limits the execution of a function to once within a specified time interval, regardless of how many times it's invoked.

## Key Concepts:

1. Ensures function execution at most once per specified time period.
2. Useful for rate-limiting expensive operations.
3. Can be implemented using timers or by tracking elapsed time.

## Basic Implementation:

```javascript
function throttle(fn, delay) {
  let isTimerActive = false;
  return function (...args) {
    const context = this;
    if (!isTimerActive) {
      fn.apply(context, args);
      isTimerActive = true;
      setTimeout(() => {
        isTimerActive = false;
      }, delay);
    }
  };
}
```

## Alternative Implementation (using Date):

```javascript
function throttle(fn, delay) {
  let lastEventTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastEventTime >= delay) {
      fn.apply(this, args);
      lastEventTime = now;
    }
  };
}
```

## Usage Examples:

### Simple Usage:

```javascript
const logClick = () => console.log('click');
const throttledLogClick = throttle(logClick, 1000);
document.body.addEventListener('click', throttledLogClick);
```

### With Arguments:

```javascript
const logClick = name => console.log('click ' + name);
const throttledLogClick = throttle(logClick, 1000);
document.body.addEventListener('click', () => throttledLogClick('vishal'));
```

### Object Method:

```javascript
function logClick() {
  console.log('click ' + this.fullName);
}

const person = {
  fullName: 'vishal',
  sayName: throttle(logClick, 1000),
};

document.body.addEventListener('click', () => person.sayName());
```

## Advanced Throttling (with Trailing Call):

```javascript
function throttle(callback, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    callback(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
```

## Best Practices:

- Use throttling for continuous events like scrolling or resizing.
- Choose an appropriate delay based on the use case and performance requirements.
- Consider using established libraries for more robust implementations.

## Analogy:

Mom to child: "You can only get a piece of cake once every hour, no matter how many times you ask."

Remember: Throttling is particularly useful for optimizing performance in scenarios where an action might be triggered rapidly, but you want to limit its execution frequency.
