- A specialized hook for inserting styles into the DOM
- Runs before any DOM mutations and other effects

## How to use it

```jsx
useInsertionEffect(() => {
  // Insert styles here
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

- Syntax similar to useEffect and useLayoutEffect
- First argument: Effect function
- Second argument: Array of dependencies (optional)

## Key Points

1. Fires synchronously before all DOM mutations
2. Intended for CSS-in-JS library authors
3. Not for common application code
4. Cannot access refs or update state

## Example: Dynamic Style Injection

```jsx
import {useInsertionEffect} from 'react';

function DynamicStyle({color}) {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .dynamic-text {
        color: ${color};
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return <div className="dynamic-text">This text has dynamic styling</div>;
}
```

## When to Use useInsertionEffect

- Injecting critical CSS
- Dynamically generating and inserting style tags
- Optimizing CSS-in-JS libraries

## useInsertionEffect vs useLayoutEffect vs useEffect

1. useInsertionEffect: Runs before DOM mutations
2. useLayoutEffect: Runs after DOM mutations, before browser paint
3. useEffect: Runs after browser paint

## Tips

- Use only if you're building a CSS-in-JS library
- Not intended for typical React application code
- Cannot access DOM nodes via refs (they don't exist yet)
- Useful for performance optimizations in style injection scenarios
