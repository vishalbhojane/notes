# Redux Actions

Actions are plain JavaScript objects that describe what happened in your application.

## What are Actions?

- Plain JavaScript objects
- Must have a `type` property that indicates the type of action being performed
- Can contain additional data (payload)
- The only way to send data to the store

## Action Structure

```javascript
{
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}
```

## Action Types

### Basic Action
```javascript
{
  type: 'INCREMENT'
}
```

### Action with Payload
```javascript
{
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}
```

### Action with Multiple Properties
```javascript
{
  type: 'UPDATE_USER',
  payload: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  }
}
```

## Action Creators

Functions that create and return action objects.

### Basic Action Creator
```javascript
function increment() {
  return {
    type: 'INCREMENT'
  };
}

// Usage
store.dispatch(increment());
```

### Action Creator with Parameters
```javascript
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: text
  };
}

// Usage
store.dispatch(addTodo('Learn Redux'));
```

### Action Creator with Complex Payload
```javascript
function updateUser(user) {
  return {
    type: 'UPDATE_USER',
    payload: user
  };
}

// Usage
store.dispatch(updateUser({
  id: 1,
  name: 'John Doe'
}));
```

## Action Type Constants

Define action types as constants to avoid typos and enable better tooling.

```javascript
// Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

// Action creators
function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: text
  };
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: id
  };
}

function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id
  };
}
```

## Async Actions

Actions that handle asynchronous operations (typically with middleware like thunk).

```javascript
// Async action creator
function fetchTodos() {
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
}
```

## Action Best Practices

### 1. Use Descriptive Action Types
```javascript
// Good
const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';

// Bad
const FETCH = 'FETCH';
```

### 2. Keep Actions Simple
```javascript
// Good
{
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}

// Bad - too complex
{
  type: 'ADD_TODO',
  payload: {
    text: 'Learn Redux',
    timestamp: Date.now(),
    userId: 123,
    category: 'learning'
  }
}
```

### 3. Use Consistent Naming
```javascript
// Consistent pattern
const FETCH_TODOS_START = 'FETCH_TODOS_START';
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR';
```

### 4. Separate Action Types
```javascript
// actions/types.js
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// actions/todoActions.js
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './types';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text
});
```

## Complete Example

```javascript
// Action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// Action creators
export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

export const reset = () => ({
  type: RESET
});

// Usage
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());
```
