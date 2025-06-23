- A hook that allows you to mark some state updates as non-urgent
- Helps in prioritizing rendering updates in the UI

## How to use it

```jsx
const [isPending, startTransition] = useTransition();
```

- Returns an array with two elements:
  1. `isPending`: A boolean indicating if the transition is pending
  2. `startTransition`: A function to wrap state updates that can be deferred

## Key Points

1. Allows React to interrupt non-urgent updates to focus on more pressing updates
2. Useful for improving user experience during large rendering operations
3. Does not delay the update itself, but rather how React prioritizes it
4. Helps maintain UI responsiveness during heavy computations

## Example: Search with Transition

```jsx
import React, {useState, useTransition} from 'react';

function SearchResults({query}) {
  // Imagine this is a complex, slow rendering operation
  let results = [];
  for (let i = 0; i < 10000; i++) {
    results.push(
      <li key={i}>
        {query} result {i}
      </li>
    );
  }
  return <ul>{results}</ul>;
}

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = e => {
    setQuery(e.target.value);
    startTransition(() => {
      setDeferredQuery(e.target.value);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <div>Updating list...</div>}
      <SearchResults query={deferredQuery} />
    </div>
  );
}
```

## When to Use useTransition

- For expensive rendering operations that might cause UI lag
- When you want to keep the UI responsive during heavy computations
- To prioritize certain updates over others

## Tips

- Use for non-urgent updates that might cause the UI to feel slow
- The `isPending` boolean can be used to show loading indicators
- Combine with other optimization techniques like `useMemo` or `useCallback` for best results
- Don't use for all state updates; reserve for computationally expensive operations
- Remember that transitions don't make your code faster, they just help in prioritizing updates

## useTransition vs useDeferredValue

- `useTransition` is for wrapping state updates
- `useDeferredValue` is for deferring the value itself, useful when you can't directly modify the state update (e.g., with props)
