- A hook that allows you to consume context in a functional component
- Provides a way to pass data through the component tree without prop-drilling

## How to use it

```jsx
const value = useContext(MyContext);
```

- `MyContext`: The context object created by `React.createContext()`
- Returns the current context value for that context

## Key Points

1. Simplifies the consumption of context in functional components
2. Allows components to subscribe to context changes
3. Always uses the value from the closest matching Provider above in the tree
4. Triggers a re-render when the context value changes

## Example: Theme Context

```jsx
// Create a context
const ThemeContext = React.createContext('light');

// Provider component
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Header />
        <Main />
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

// Consumer component using useContext
function Header() {
  const theme = useContext(ThemeContext);
  return (
    <header className={`header-${theme}`}>
      <h1>My App</h1>
    </header>
  );
}

function Main() {
  const theme = useContext(ThemeContext);
  return (
    <main className={`main-${theme}`}>
      <p>This is the main content</p>
    </main>
  );
}
```

## Common Use Cases

- Theming (like in the example above)
- User authentication state
- Localization/internationalization
- Global application state management
- Shared configuration or settings

## Tips

- Use context for data that is considered "global" for a tree of components
- Avoid overusing context; it can make component reuse more difficult
- Consider using context with `useReducer` for more complex state management
- Remember that all consumers will re-render when the context value changes
- For performance optimization, you might need to use memoization techniques
