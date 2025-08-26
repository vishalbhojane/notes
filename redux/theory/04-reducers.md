# Redux Reducers

Reducers are pure functions that specify how the application's state changes in response to actions.

## What are Reducers?

- Pure functions that take the current state and an action
- Return the new state based on the action type
- Must be predictable and side-effect free
- Handle all state updates in Redux

## Reducer Function Signature

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'SOME_ACTION':
      return newState;
    default:
      return state;
  }
}
```

## Basic Reducer Example

```javascript
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
}
```

## Object State Reducer

```javascript
function todoReducer(state = { todos: [], loading: false }, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
```

## State Immutability

Reducers must never mutate the original state. Always return a new state object.

### ❌ Wrong - Mutating State
```javascript
function todoReducer(state = { todos: [] }, action) {
  switch (action.type) {
    case 'ADD_TODO':
      state.todos.push(action.payload); // ❌ Mutating!
      return state;
    default:
      return state;
  }
}
```

### ✅ Correct - Immutable Updates
```javascript
function todoReducer(state = { todos: [] }, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    default:
      return state;
  }
}
```

## Common State Update Patterns

### Adding to Arrays
```javascript
case 'ADD_TODO':
  return {
    ...state,
    todos: [...state.todos, action.payload]
  };
```

### Removing from Arrays
```javascript
case 'DELETE_TODO':
  return {
    ...state,
    todos: state.todos.filter(todo => todo.id !== action.payload)
  };
```

### Updating Array Items
```javascript
case 'TOGGLE_TODO':
  return {
    ...state,
    todos: state.todos.map(todo =>
      todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  };
```

### Updating Object Properties
```javascript
case 'UPDATE_USER':
  return {
    ...state,
    user: {
      ...state.user,
      ...action.payload
    }
  };
```

### Nested Object Updates
```javascript
case 'UPDATE_USER_PROFILE':
  return {
    ...state,
    user: {
      ...state.user,
      profile: {
        ...state.user.profile,
        ...action.payload
      }
    }
  };
```

## Combining Reducers

For large applications, split reducers into smaller functions and combine them.

### Individual Reducers
```javascript
// todosReducer.js
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

// userReducer.js
function userReducer(state = null, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}
```

### Combining with combineReducers
```javascript
import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer
});

// Resulting state structure:
// {
//   todos: [],
//   user: null
// }
```

## Reducer Best Practices

### 1. Keep Reducers Pure
```javascript
// ✅ Pure function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}

// ❌ Impure - has side effects
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      console.log('Incrementing'); // Side effect!
      return state + 1;
    default:
      return state;
  }
}
```

### 2. Handle Unknown Actions
```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state; // Always return current state for unknown actions
  }
}
```

### 3. Provide Default State
```javascript
function reducer(state = initialState, action) {
  // Always provide a default state
}
```

### 4. Use Descriptive Action Types
```javascript
// ✅ Clear and descriptive
case 'FETCH_TODOS_SUCCESS':
case 'FETCH_TODOS_ERROR':

// ❌ Unclear
case 'FETCH':
case 'ERROR':
```

## Complete Example

```javascript
// Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

// Initial state
const initialState = {
  todos: [],
  loading: false,
  error: null
};

// Reducer
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
      
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
      
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
      
    default:
      return state;
  }
}
```
