- A hook that returns a memoized version of a callback function
- Useful for optimizing performance in child components that rely on reference equality

## How to use it

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- First argument: The callback function to be memoized
- Second argument: An array of dependencies

## Key Points

1. Returns a memoized version of the callback that only changes if one of the dependencies has changed
2. Helps prevent unnecessary re-renders in child components that receive callbacks as props
3. Useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders
4. Should be used in conjunction with React.memo for child components for optimal performance gains

## Example: Optimized Child Component

```jsx
import React, {useState, useCallback} from 'react';

const ExpensiveComponent = React.memo(({onClick}) => {
  console.log('ExpensiveComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <ExpensiveComponent onClick={handleClick} />
      <p>Count: {count}</p>
      <button onClick={() => setOtherState(otherState + 1)}>
        Update Other State: {otherState}
      </button>
    </div>
  );
}
```

## When to Use useCallback

- When passing callbacks to optimized child components that rely on reference equality
- In scenarios where a function is a dependency for other hooks like useEffect or useMemo
- When creating event handlers in components that render often

## Tips

- Use in combination with React.memo on child components for best performance gains
- Include all values from the component scope that the callback function uses in the dependency array
- Don't overuse – only apply when there's a tangible performance benefit
- Consider whether the performance gain outweighs the added complexity
- Useful for preventing unnecessary re-creation of functions in every render

## useCallback vs useMemo

- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`
- `useCallback` is specifically for memoizing functions, while `useMemo` is for memoizing any value
