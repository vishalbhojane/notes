# Redux Middleware

Middleware provides a way to intercept and modify actions before they reach the reducer.

## What is Middleware?

- Functions that sit between dispatching an action and the moment it reaches the reducer
- Can modify, delay, or stop actions
- Useful for logging, async operations, and side effects
- Applied using `applyMiddleware()` when creating the store

## Middleware Function Signature

```javascript
const middleware = store => next => action => {
  // Do something before the action reaches the reducer
  const result = next(action);
  // Do something after the action has been processed
  return result;
};
```

## Basic Middleware Example

```javascript
// Logger middleware
const logger = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

// Apply middleware
const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);
```

## Common Middleware

### Redux Thunk

Handles async actions and side effects.

```javascript
import thunk from 'redux-thunk';

// Async action creator
const fetchTodos = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_TODOS_START' });
    
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        payload: todos
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_TODOS_ERROR',
        payload: error.message
      });
    }
  };
};

// Apply thunk middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

### Redux Logger

Logs all actions and state changes.

```javascript
import logger from 'redux-logger';

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);
```

### Redux Saga

Advanced middleware for complex async operations.

```javascript
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

// Saga function
function* fetchTodosSaga() {
  try {
    const todos = yield call(fetch, '/api/todos');
    const data = yield call([todos, 'json']);
    yield put({ type: 'FETCH_TODOS_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_TODOS_ERROR', payload: error.message });
  }
}

// Root saga
function* rootSaga() {
  yield takeEvery('FETCH_TODOS_START', fetchTodosSaga);
}

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
```

## Custom Middleware Examples

### Timer Middleware

```javascript
const timerMiddleware = store => next => action => {
  const startTime = Date.now();
  const result = next(action);
  const endTime = Date.now();
  
  console.log(`Action ${action.type} took ${endTime - startTime}ms`);
  return result;
};
```

### Local Storage Middleware

```javascript
const localStorageMiddleware = store => next => action => {
  const result = next(action);
  
  if (action.type === 'ADD_TODO' || action.type === 'DELETE_TODO') {
    localStorage.setItem('todos', JSON.stringify(store.getState().todos));
  }
  
  return result;
};
```

### Conditional Dispatch Middleware

```javascript
const conditionalMiddleware = store => next => action => {
  // Only allow certain actions if user is logged in
  if (action.type === 'DELETE_TODO' && !store.getState().user) {
    console.log('User must be logged in to delete todos');
    return;
  }
  
  return next(action);
};
```

## Middleware Order

The order of middleware matters. They are executed in the order they are applied.

```javascript
const store = createStore(
  rootReducer,
  applyMiddleware(
    logger,        // First
    thunk,         // Second
    customMiddleware // Third
  )
);
```

## Async Action Patterns

### Loading States

```javascript
// Action creators
const fetchTodosStart = () => ({ type: 'FETCH_TODOS_START' });
const fetchTodosSuccess = (todos) => ({ type: 'FETCH_TODOS_SUCCESS', payload: todos });
const fetchTodosError = (error) => ({ type: 'FETCH_TODOS_ERROR', payload: error });

// Async action creator
const fetchTodos = () => {
  return async (dispatch) => {
    dispatch(fetchTodosStart());
    
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      dispatch(fetchTodosSuccess(todos));
    } catch (error) {
      dispatch(fetchTodosError(error.message));
    }
  };
};
```

### Optimistic Updates

```javascript
const addTodoOptimistic = (text) => {
  return async (dispatch, getState) => {
    const tempId = Date.now();
    
    // Optimistic update
    dispatch({
      type: 'ADD_TODO',
      payload: { id: tempId, text, completed: false }
    });
    
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      const newTodo = await response.json();
      
      // Replace optimistic todo with real one
      dispatch({
        type: 'REPLACE_TODO',
        payload: { tempId, newTodo }
      });
    } catch (error) {
      // Rollback on error
      dispatch({
        type: 'REMOVE_TODO',
        payload: tempId
      });
    }
  };
};
```

## Error Handling Middleware

```javascript
const errorHandlingMiddleware = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    console.error('Error in middleware:', error);
    
    // Dispatch error action
    store.dispatch({
      type: 'MIDDLEWARE_ERROR',
      payload: error.message
    });
    
    throw error;
  }
};
```

## Complete Example

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Custom middleware
const analyticsMiddleware = store => next => action => {
  // Track analytics
  if (action.type === 'USER_ACTION') {
    analytics.track(action.payload);
  }
  
  return next(action);
};

// Reducer
function reducer(state = { todos: [], loading: false }, action) {
  switch (action.type) {
    case 'FETCH_TODOS_START':
      return { ...state, loading: true };
    case 'FETCH_TODOS_SUCCESS':
      return { ...state, todos: action.payload, loading: false };
    case 'FETCH_TODOS_ERROR':
      return { ...state, loading: false };
    default:
      return state;
  }
}

// Create store with middleware
const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    thunk,
    analyticsMiddleware
  )
);

// Async action
const fetchTodos = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_TODOS_START' });
    
    try {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: todos });
    } catch (error) {
      dispatch({ type: 'FETCH_TODOS_ERROR', payload: error.message });
    }
  };
};
```
