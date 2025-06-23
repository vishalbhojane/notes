Create a function `executeConcurrentTasks` that takes an array of tasks and a concurrency limit.
It should:

1. Execute async tasks with maximum concurrent execution limit
2. Collect results and errors in order of task index
3. Return object with results and errors arrays

## Solution

```javascript
const executeConcurrentTasks = async (tasks, limit) => {
  const results = [];
  const errors = [];
  const pending = new Set();

  for (let idx = 0; idx < tasks.length; idx++) {
    if (pending.size >= limit) {
      await Promise.race(pending);
    }

    const promise = tasks[idx](idx)
      .then(result => {
        results[idx] = result;
        pending.delete(promise);
      })
      .catch(err => {
        errors[idx] = err;
        results[idx] = null;
        pending.delete(promise);
      });

    pending.add(promise);
  }

  await Promise.all(pending);
  return {results, errors};
};
```

## Usage

```javascript
// Simple tasks
const tasks = [
  i => Promise.resolve(`Task ${i} done`),
  i => Promise.resolve(`Task ${i} done`),
  i => Promise.resolve(`Task ${i} done`),
];

executeConcurrentTasks(tasks, 2).then(console.log);
// {
//   results: ['Task 0 done', 'Task 1 done', 'Task 2 done'],
//   errors: []
// }

// Mix of success and failure
const mixedTasks = [
  i => Promise.resolve(`Success ${i}`),
  i => Promise.reject(`Error ${i}`),
  i => Promise.resolve(`Success ${i}`),
];

executeConcurrentTasks(mixedTasks, 2).then(console.log);
// {
//   results: ['Success 0', null, 'Success 2'],
//   errors: [undefined, 'Error 1', undefined]
// }

// Async tasks with different durations
const delayedTasks = [
  i => new Promise(res => setTimeout(() => res(`Slow ${i}`), 200)),
  i => new Promise(res => setTimeout(() => res(`Fast ${i}`), 100)),
  i => new Promise(res => setTimeout(() => res(`Medium ${i}`), 150)),
];

executeConcurrentTasks(delayedTasks, 2).then(console.log);
// {
//   results: ['Slow 0', 'Fast 1', 'Medium 2'],
//   errors: []
// }
```
