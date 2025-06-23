- A version of useEffect that fires synchronously after all DOM mutations
- Used for reading layout from the DOM and synchronously re-rendering

## How to use it

```jsx
useLayoutEffect(() => {
  // Effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

- Syntax is identical to useEffect
- First argument: Effect function
- Second argument: Array of dependencies (optional)

## Key Points

1. Runs synchronously immediately after React has performed all DOM mutations
2. Blocks visual updates until your effect is finished
3. Use when you need to make DOM measurements
4. Generally, prefer useEffect unless useLayoutEffect is specifically needed

## Example: Tooltip Positioning

```jsx
function Tooltip({text, children}) {
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const tooltipRef = useRef();

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const height = tooltipRef.current.offsetHeight;
      setTooltipHeight(height);
    }
  }, []);

  return (
    <div style={{position: 'relative'}}>
      {children}
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          bottom: `${tooltipHeight}px`,
          left: 0,
          background: 'black',
          color: 'white',
          padding: '5px',
        }}
      >
        {text}
      </div>
    </div>
  );
}
```

## When to Use useLayoutEffect

- Measuring and positioning DOM elements
- Animations that require immediate DOM updates
- Preventing visual flickers in UI

## useLayoutEffect vs useEffect

- useLayoutEffect: Synchronous, blocks visual updates
- useEffect: Asynchronous, doesn't block painting

## Tips

- Use sparingly, as it can impact performance
- Prefer useEffect for most cases
- Use when you need to make DOM measurements or updates that should be synchronous
- Be cautious of causing performance issues in large applications
