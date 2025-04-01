Side effects are operations that interact with the world outside of the React component.

- Involve interactions with external systems or APIs
- Can affect the component's behavior or the application state
- Require careful management to maintain predictable component behavior

## Common Examples of Side Effects:

- Fetching data from an API
- Manipulating the DOM directly
- Setting up event listeners or subscriptions

## Handling Side Effects:

1. **Preferred Method:** Inside event handlers (e.g., onClick)
2. **Alternative:** Use `useEffect` hook when event handlers are not suitable

## Using useEffect for Side Effects:

```jsx
useEffect(() => {
  fetchData().then((data) => {
    // Handle the fetched data
  });
}, []); // Runs only when the component mounts
```

**Note:** The empty `[]` dependency array ensures the effect runs only once when the component first loads.

## Best Practices:

- Keep components pure by managing side effects properly
- Use `useEffect` for side effects that need to sync with the component lifecycle
- Be mindful of the dependency array to control when effects run
