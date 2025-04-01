React components should behave like mathematical functions, where the same input always produces the same output.

- Only return JSX
- Do not modify external variables
- Have no side effects during rendering

## Impure Component Example ❌

```jsx
let count = 0;

function Cup() {
  count = count + 1; // ❌ Modifying an external variable
  return <h2>Cup {count}</h2>;
}
```

🔴 This is impure because it modifies an external variable (`count`), leading to unpredictable results.

## Pure Component Example ✅

```jsx
function Cup() {
  const [count, setCount] = useState(0);

  return <h2>Cup {count}</h2>;
}
```

✅ This ensures that state is managed properly, keeping the component pure and predictable.

## Benefits of Pure Components:

- Predictable behavior
- Easier to test and debug
- Better performance optimization potential
