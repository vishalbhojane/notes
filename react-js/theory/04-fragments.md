In React, you can only return one parent element from a component. Fragments provide a solution to this limitation.

- Fragments allow grouping multiple elements without adding an extra DOM node
- They're useful for improving component structure without affecting the layout
- Two syntaxes available: short `<>...</>` and long `<React.Fragment>...</React.Fragment>`

## Single Parent Element Rule

React components must return a single parent element:

```jsx
function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

## Using React Fragments

To avoid adding an extra DOM node, use React Fragments:

1. Short syntax (most common):

```jsx
function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}
```

2. Long syntax (allows adding keys if needed):

```jsx
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Content />
      <Footer />
    </React.Fragment>
  );
}
```
