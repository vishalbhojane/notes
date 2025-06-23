Asynchronous JavaScript enables non-blocking execution of tasks, allowing:

- Concurrent operations
- Improved responsiveness
- Efficient handling of time-consuming operations in web applications

## JavaScript's Nature

JavaScript is fundamentally:

- Single-threaded
- Synchronous (code executes in order, one line at a time)

However, JavaScript can appear asynchronous in certain situations.

## Methods for Asynchronous Tasks

1. Callbacks
2. Promises
3. Async/Await (built on Promises)

## Examples of Asynchronous JavaScript

### setTimeout

```javascript
setTimeout(() => {
  console.log('This runs after 1 second');
}, 1000);
```

### Event Listeners

```javascript
const button = document.querySelector('#asy');
button.addEventListener('click', () => {
  console.log('Button clicked');
});
```
