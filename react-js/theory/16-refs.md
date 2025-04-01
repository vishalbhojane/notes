Refs provide a way to access DOM nodes or React elements directly.

- Allow direct manipulation of DOM elements
- Created using the `useRef` hook
- Accessed via the `.current` property
- Useful for managing focus, text selection, or media playback

## Creating and Attaching Refs

```jsx
const ref = useRef(null);

// Attaching to a button
<button ref={ref}>Click Me</button>

// Attaching to an input
<input ref={ref} />
```

## Accessing Ref Values

```jsx
// Example: Focusing an input
ref.current.focus();

// Example: Getting input value
const inputValue = ref.current.value;
```

## Common Use Cases:

- Managing focus, text selection, or media playback
- Triggering imperative animations
- Integrating with third-party DOM libraries

## Best Practices:

- Use refs sparingly; prefer declarative solutions when possible
- Avoid using refs for anything that can be done declaratively
- Remember that changing refs doesn't trigger re-renders
