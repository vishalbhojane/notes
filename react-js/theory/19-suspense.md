Suspense is a React component that manages loading states for components or their data, improving user experience.

Key points:

- Displays a fallback UI while content is loading
- Works with lazy-loaded components and data fetching
- Enhances perceived performance of React applications

## Basic Usage

```jsx
import {Suspense} from 'react';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}
```

The `fallback` prop defines the UI displayed during loading.

## Using Suspense for Lazy Loading

```jsx
import {lazy, Suspense} from 'react';

const LazyComponent = lazy(() => import('./Component'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <LazyComponent />
    </Suspense>
  );
}
```

Lazy loading improves initial loading performance by loading components only when needed.

## Benefits:

- Improves perceived performance
- Simplifies handling of loading states
- Enables code-splitting for better load times
