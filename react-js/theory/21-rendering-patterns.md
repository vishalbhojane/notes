Render different components or elements based on conditions:

```jsx
function Greeting({isLoggedIn}) {
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
}
```

## Lists and Keys

Render lists of elements and use keys for efficient updates:

```jsx
const items = ['apple', 'banana', 'orange'];

function ItemList() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

Note: Using index as key is not recommended for lists that can change.

## Rendering Optimization

### For Functional Components:

Use React.memo to prevent unnecessary re-renders:

```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Component logic
});
```

### For Class Components:

Implement shouldComponentUpdate:

```jsx
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Return true if you want the component to update
    // Return false to prevent update
  }

  render() {
    // Render logic
  }
}
```
