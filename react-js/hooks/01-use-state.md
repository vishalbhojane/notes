- A React Hook that adds state to functional components
- Allows you to use state without writing a class

## How to use it

```jsx
const [state, setState] = useState(initialValue);
```

- `state`: The current state value
- `setState`: Function to update the state
- `initialValue`: Starting value for the state

## Key Points

1. Updates cause re-renders
2. Can be used multiple times in one component
3. Can hold any type of value (numbers, strings, objects, etc.)

## Updating State

- Direct update: `setState(newValue)`
- Update based on previous state: `setState(prevState => newState)`

## Examples

### Basic Counter

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>
        Decrement
      </button>
    </>
  );
}
```

### Form with Object State

```jsx
function Form() {
  const [form, setForm] = useState({name: '', email: ''});

  const handleChange = e => {
    setForm(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
    </form>
  );
}
```
