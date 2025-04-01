React provides a system to handle user interactions through events.

Key points:

- React has many built-in event handlers
- Event names use camelCase (e.g., onClick, onChange)
- Event handlers are typically defined as functions within components

## Common Event Types

```jsx
<>
  <button onClick={handleClick}>Click</button>
  <input onChange={handleChange} />
  <form onSubmit={handleSubmit}></form>
</>
```

## Example: Click Event Handler

```jsx
function RedAlert() {
  const handleClick = () => {
    alert('Red Alert');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

## Additional Notes:

- Event handlers receive an event object as a parameter
- You can pass arguments to event handlers using arrow functions or bind

```jsx
<button onClick={(e) => handleClick(id, e)}>Click Me</button>
```
