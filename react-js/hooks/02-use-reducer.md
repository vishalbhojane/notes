- A React Hook for managing complex state logic in functional components
- An alternative to useState when state logic becomes more complicated

## How to use it

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`: The current state
- `dispatch`: Function to send actions to the reducer
- `reducer`: Function that specifies how the state updates
- `initialState`: Starting value for the state

## Key Points

1. Useful for complex state logic
2. Helps separate state logic from component rendering
3. Can be more predictable than multiple useState calls

### Counter with useReducer

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + 1};
    case 'DECREMENT':
      return {count: state.count - 1};
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {count: 0});

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'INCREMENT'})}>+</button>
      <button onClick={() => dispatch({type: 'DECREMENT'})}>-</button>
    </>
  );
}
```

### Todo List

```jsx
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {id: Date.now(), text: action.payload, completed: false},
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload
          ? {...todo, completed: !todo.completed}
          : todo
      );
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_TODO', payload: text});
    setText('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({type: 'TOGGLE_TODO', payload: todo.id})}
            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

## Tips

- Use when state logic is complex
- Great for managing state that has multiple sub-values
- Helps with testing as reducer functions are pure functions
- Can be used with useContext for global state management
