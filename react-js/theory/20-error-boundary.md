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
