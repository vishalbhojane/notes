State is a core concept in React for managing dynamic data within a component.

- Represents the current condition of a component
- Changes in state trigger re-renders
- Regular JavaScript variables don't cause re-renders
- React provides hooks like useState and useReducer for state management

## Why Not JavaScript Variables

```jsx
let likes = 0;
likes = 1; // Changing these won't update the UI
```

## Using useState Hook

```jsx
const [votes, setVotes] = useState(0);
```

## Example: Like Counter

```jsx
function Likes() {
  const [likes, setLikes] = useState(0);

  const handleClick = () => {
    setLikes(likes + 1);
  };

  return <button onClick={handleClick}>Likes: {likes}</button>;
}
```

Additional notes:

- State updates are asynchronous
- Always use the state setter function (e.g., setLikes) to update state
- For complex state logic, consider useReducer
