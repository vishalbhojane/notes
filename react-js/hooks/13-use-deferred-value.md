- A hook that accepts a value and returns a new copy of the value that will defer to more urgent updates
- Allows you to defer updating a part of the UI

## How to use it

```jsx
const deferredValue = useDeferredValue(value);
```

- `value`: The value you want to defer
- Returns a new version of the value that might "lag behind" the original

## Key Points

1. Useful for deferring rendering of less important parts of the UI
2. Does not require wrapping state updates like useTransition
3. Helps in keeping the UI responsive during expensive rendering operations
4. Works well with existing code and doesn't require restructuring

## Example: Deferred List Rendering

```jsx
import React, {useState, useDeferredValue, useMemo} from 'react';

function ListItem({item}) {
  // Artificially slow down rendering
  let now = performance.now();
  while (performance.now() - now < 3) {
    // Artificial delay -- do nothing for 3ms
  }
  return <li>{item}</li>;
}

function SlowList({text}) {
  const items = useMemo(() => {
    return Array(10000)
      .fill(null)
      .map((_, i) => text + ' ' + (i + 1));
  }, [text]);

  return (
    <ul>
      {items.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
}

function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```

## When to Use useDeferredValue

- When you need to defer updates to a computationally expensive part of the UI
- For optimizing performance without changing the implementation of child components
- When you're working with values from props or state that you can't directly control

## Tips

- Use when you can't directly apply useTransition to the state update
- Combine with useMemo to avoid unnecessary re-renders of deferred content
- The deferred value might be "stale", so design your UI accordingly
- Useful for scenarios where you're receiving frequently changing data that's expensive to render
- Consider using useTransition if you have control over the state update causing the slowdown

## useDeferredValue vs useTransition

- useDeferredValue is for deferring a value itself
- useTransition is for marking state updates as non-urgent
- useDeferredValue is often easier to integrate into existing code
