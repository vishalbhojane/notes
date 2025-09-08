Error Boundaries are React components that catch JavaScript errors in their child component tree, log those errors, and display a fallback UI.

Key points:

- Prevent entire app crashes due to rendering errors
- Display user-friendly error messages
- Only catch errors in the components below them in the tree

## Without Error Boundary 🚨

```jsx
function App({user}) {
  if (!user) {
    throw new Error('No user Data'); // App will crash here
  }
  return <h1>{user.name}</h1>;
}

// Usage (will crash if no data is passed)
<App />;
```

## Using Error Boundaries ✅

### Class Component Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function SafeApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
```

### Using react-error-boundary Library

```jsx
import {ErrorBoundary} from 'react-error-boundary';

function Fallback({error}) {
  return (
    <div role="alert">
      <p>No user provided</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function SafeApp() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
    </ErrorBoundary>
  );
}
```

## Benefits:

- Improves app stability
- Provides better user experience during errors
- Helps in debugging by providing more context about errors

Note: Error boundaries do not catch errors in event handlers, asynchronous code, or server-side rendering. They only catch errors in the rendering phase.
