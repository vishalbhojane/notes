Lifecycle methods are special methods in Class Components
They allow running code at specific points in a component’s life cycle.
In Functional Components, similar behaviour is achieved using the `useEffect` hook.

1. Mounting (when component is created)

- `constructor()` → Initialize state, bind methods
- `componentDidMount()` → Called once after render, good for API calls

2. Updating (when props/state change)

- `componentDidUpdate(prevProps, prevState)` → Called after re-render, compare props/state here

3. Unmounting (when component is removed)

- `componentWillUnmount()` → Cleanup (event listeners, timers, subscriptions)

## Example (Class Component)

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    console.log('Constructor: initialize state');
  }

  componentDidMount() {
    console.log('componentDidMount: runs after first render');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate: runs after update');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount: cleanup before removal');
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={() => this.setState({count: this.state.count + 1})}>
          Increment
        </button>
      </div>
    );
  }
}
```

### Functional Equivalent with Hooks

```tsx
import {useEffect, useState} from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Mounted!');

    return () => {
      console.log('Cleanup before unmount!');
    };
  }, []); // [] ensures it runs only once after mount

  useEffect(() => {
    console.log('Updated when count changes');
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Lifecycle Order (Reference)

Mounting phase

1. `constructor()`
2. `getDerivedStateFromProps()`
3. `render()`
4. `componentDidMount()`

Updating phase (props/state change)

1. `getDerivedStateFromProps()`
2. `shouldComponentUpdate()`
3. `render()`
4. `getSnapshotBeforeUpdate()`
5. `componentDidUpdate()`

Unmounting phase

1. `componentWillUnmount()`

### Error Handling

Used with Error Boundry Component

1. `static getDerivedStateFromError(error)`

- Invoked after an error is thrown in a descendant component
- Used to update state to show a fallback UI

2. `componentDidCatch(error, info)`

- Called after an error has been thrown
- Used for logging error details (to a service like Sentry, LogRocket, etc.)
