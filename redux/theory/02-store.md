# Redux Store

The store is the object that brings together actions and reducers.

## What is a Store?

- Holds the complete state tree of your application
- The only way to change state is to dispatch an action
- Not a class, but an object with methods

## Creating a Store

```javascript
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
```

## Store Methods

### getState()
Returns the current state tree of your application.

```javascript
const currentState = store.getState();
console.log(currentState); // { count: 0, todos: [] }
```

### dispatch(action)
Dispatches an action to change the state.

```javascript
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'ADD_TODO', payload: 'Learn Redux' });
```

### subscribe(listener)
Adds a change listener that will be called any time an action is dispatched.

```javascript
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// Later, to stop listening
unsubscribe();
```

## Store Configuration

### With Initial State

```javascript
const initialState = {
  count: 10,
  todos: ['Learn Redux']
};

const store = createStore(rootReducer, initialState);
```

### With Middleware

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);
```

### With Redux DevTools

```javascript
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

## Complete Example

```javascript
import { createStore } from 'redux';

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Create store
const store = createStore(counterReducer);

// Subscribe to changes
store.subscribe(() => {
  console.log('Current state:', store.getState());
});

// Dispatch actions
store.dispatch({ type: 'INCREMENT' }); // { count: 1 }
store.dispatch({ type: 'INCREMENT' }); // { count: 2 }
store.dispatch({ type: 'DECREMENT' }); // { count: 1 }
```

## Best Practices

- Only create one store per application
- Use middleware for side effects (thunk, saga, etc.)
- Keep the store structure flat when possible
- Use Redux DevTools for debugging
- Subscribe only when necessary
