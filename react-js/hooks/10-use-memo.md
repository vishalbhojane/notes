- A hook that memoizes the result of a computation
- Returns a memoized value that only recomputes when dependencies change

## How to use it

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- First argument: A function that returns the value to be memoized
- Second argument: An array of dependencies

## Key Points

1. Optimizes performance by avoiding unnecessary recalculations
2. Only recomputes the memoized value when one of the dependencies has changed
3. Useful for expensive calculations or preventing unnecessary re-renders
4. Should be used judiciously, as it comes with its own overhead

## Example: Expensive Computation

```jsx
import React, {useState, useMemo} from 'react';

function ExpensiveCalculation({number}) {
  const expensiveResult = useMemo(() => {
    console.log('Calculating...');
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += number;
    }
    return result;
  }, [number]);

  return <div>Result: {expensiveResult}</div>;
}

function App() {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <ExpensiveCalculation number={number} />
      <button onClick={() => setCount(count + 1)}>
        Increment Count: {count}
      </button>
    </div>
  );
}
```

## When to Use useMemo

- Memoizing expensive calculations
- Preventing unnecessary re-renders of child components
- Optimizing the creation of objects or arrays that are used in other hooks' dependency arrays

## Tips

- Use when the computation is genuinely expensive
- Ensure that the memoization benefit outweighs the cost of the useMemo call itself
- Always include all dependencies in the dependency array
- Can be used in conjunction with React.memo for optimizing child component renders
- Be cautious of overusing, as it can make code more complex

## useMemo vs useCallback

- `useMemo` is for memoizing values
- `useCallback` is for memoizing functions (it's essentially `useMemo` for functions)
