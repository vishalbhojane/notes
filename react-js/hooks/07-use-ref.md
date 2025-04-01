- A hook that returns a mutable ref object
- Used to persist values across renders without causing re-renders

## How to use it

```jsx
const refContainer = useRef(initialValue);
```

- `initialValue`: The initial value of the ref object (optional)
- Returns an object with a `current` property

## Key Points

1. Value persists for the full lifetime of the component
2. Changing ref value doesn't trigger re-render
3. Commonly used to access DOM elements
4. Can store any mutable value

## Examples

### Accessing DOM Elements

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### Storing Previous Value

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>
        Current: {count}, Previous: {prevCountRef.current}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Common Use Cases

- Accessing DOM elements
- Storing previous state values
- Holding mutable values without re-renders
- Caching expensive computations
- Managing timers and intervals

## Tips

- Don't overuse refs; prefer state for values that affect rendering
- Use when you need to interact with DOM elements directly
- Useful for storing values that don't require component re-renders
- Remember to access the value using `.current`
- Be cautious when mutating the `current` value, as it won't trigger updates
