## Callback Queue

- Stores functions passed as arguments to asynchronous functions (e.g., `setTimeout()`)
- Functions are executed only after the Call Stack is empty (all synchronous functions have finished)

## Microtask Queue

- Stores asynchronous operations requiring immediate execution compared to regular callback functions
- Typically used for Promises and Mutation Observers

## Comparison

| Feature          | Callback Queue                                 | Microtask Queue                                  |
| ---------------- | ---------------------------------------------- | ------------------------------------------------ |
| Content          | Callbacks from `setTimeout()` and similar APIs | Callbacks from Promises and Mutation Observers   |
| Priority         | Lower                                          | Higher                                           |
| Execution Timing | After Call Stack is empty                      | Immediately after current task, before rendering |
