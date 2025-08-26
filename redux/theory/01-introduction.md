# Redux Introduction

Redux is a predictable state container for JavaScript applications.

## What is Redux?

- A state management library for JavaScript applications
- Provides a predictable way to manage application state
- Based on the Flux architecture pattern
- Works with any UI framework (React, Vue, Angular, vanilla JS)

## Core Principles

1. **Single Source of Truth**: The entire application state is stored in one object tree
2. **State is Read-Only**: The only way to change state is to emit an action
3. **Changes are Made with Pure Functions**: Reducers are pure functions that take previous state and action, return new state

## Why Use Redux?

- **Predictable State Management**: State changes are predictable and traceable
- **Centralized State**: All application state in one place
- **Debugging**: Easy to debug with Redux DevTools
- **Time Travel**: Can replay actions to see how state evolved
- **Middleware Support**: Extensible with middleware for side effects

## When to Use Redux?

- Complex application state
- Multiple components need the same data
- Need predictable state management
- Want powerful debugging tools
- Building large-scale applications

## Redux vs Local State

```javascript
// Local state (component-level)
const [count, setCount] = useState(0);

// Redux state (application-level)
const store = createStore(reducer);
store.dispatch({ type: 'INCREMENT' });
```

## Basic Redux Flow

1. **Action**: Describes what happened
2. **Reducer**: Pure function that updates state
3. **Store**: Holds the application state
4. **Dispatch**: Sends actions to the store
5. **Subscribe**: Listens for state changes
