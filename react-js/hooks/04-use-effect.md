- A React Hook for performing side effects in functional components
- Allows you to synchronize a component with an external system

## How to use it

```jsx
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

- First argument: Effect function
- Second argument: Array of dependencies (optional)

## Key Points

1. Runs after every render by default
2. Can specify dependencies to control when effect runs
3. Can return a cleanup function
4. Replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount

## Examples

### Data Fetching

```jsx
function UserProfile({userId}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

### Event Listener

```jsx
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount

  return <div>Window width: {width}</div>;
}
```

## Common Use Cases

- Data fetching
- Setting up subscriptions
- Manually changing the DOM
- Logging
- Integrating with third-party libraries

## Tips

- Use multiple `useEffect` hooks to separate concerns
- Always include dependencies that the effect uses
- Use the cleanup function to prevent memory leaks
- Avoid unnecessary re-renders by properly setting dependencies
- Consider using `useCallback` or `useMemo` for function dependencies
