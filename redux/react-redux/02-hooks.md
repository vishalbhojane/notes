# React-Redux Hooks

React-Redux provides hooks for functional components to interact with the Redux store.

## Available Hooks

- `useSelector`: Extract data from the Redux store state
- `useDispatch`: Get the dispatch function to dispatch actions
- `useStore`: Access the store directly (use sparingly)

## useSelector Hook

Extract data from the Redux store state.

### Basic Usage

```jsx
import { useSelector } from 'react-redux';

function TodoList() {
  const todos = useSelector(state => state.todos);
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

### Multiple Selectors

```jsx
function TodoApp() {
  const todos = useSelector(state => state.todos);
  const loading = useSelector(state => state.ui.loading);
  const user = useSelector(state => state.user);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <TodoList todos={todos} />
    </div>
  );
}
```

### Equality Function

By default, `useSelector` uses reference equality (`===`) to determine if the selected value has changed.

```jsx
// Custom equality function
import { shallowEqual } from 'react-redux';

function TodoList() {
  const todos = useSelector(
    state => state.todos,
    shallowEqual // Only re-render if todos array reference changes
  );
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

### Computed Values

```jsx
function TodoStats() {
  const todos = useSelector(state => state.todos);
  const completedCount = useSelector(state => 
    state.todos.filter(todo => todo.completed).length
  );
  const totalCount = useSelector(state => state.todos.length);
  
  return (
    <div>
      <p>Completed: {completedCount} / {totalCount}</p>
    </div>
  );
}
```

## useDispatch Hook

Get the dispatch function to dispatch actions.

### Basic Usage

```jsx
import { useDispatch } from 'react-redux';

function AddTodo() {
  const dispatch = useDispatch();
  
  const handleAddTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };
  
  return (
    <button onClick={() => handleAddTodo('New Todo')}>
      Add Todo
    </button>
  );
}
```

### Action Creators

```jsx
import { useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './actions';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  
  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };
  
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };
  
  return (
    <li>
      <span onClick={handleToggle}>
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
```

### Async Actions

```jsx
import { useDispatch } from 'react-redux';
import { fetchTodos } from './actions';

function TodoList() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  // ... rest of component
}
```

## useStore Hook

Access the store directly. Use sparingly - prefer `useSelector` and `useDispatch`.

```jsx
import { useStore } from 'react-redux';

function DebugComponent() {
  const store = useStore();
  
  const logState = () => {
    console.log('Current state:', store.getState());
  };
  
  return (
    <button onClick={logState}>
      Log State
    </button>
  );
}
```

## Performance Optimization

### Memoized Selectors

```jsx
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

// Create memoized selector
const selectTodos = state => state.todos;
const selectFilter = state => state.ui.filter;

const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
);

function FilteredTodoList() {
  const filteredTodos = useSelector(selectFilteredTodos);
  
  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

### Stable References

```jsx
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  
  // Stable callback references
  const handleToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  }, [dispatch, todo.id]);
  
  const handleDelete = useCallback(() => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  }, [dispatch, todo.id]);
  
  return (
    <li>
      <span onClick={handleToggle}>{todo.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}
```

## Custom Hooks

Create custom hooks to encapsulate Redux logic.

### Todo Hooks

```jsx
// hooks/useTodos.js
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../actions';

export function useTodos() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  const add = useCallback((text) => {
    dispatch(addTodo(text));
  }, [dispatch]);
  
  const toggle = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);
  
  const remove = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);
  
  return {
    todos,
    addTodo: add,
    toggleTodo: toggle,
    deleteTodo: remove
  };
}

// Usage in component
function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo('New Todo')}>
        Add Todo
      </button>
    </div>
  );
}
```

### User Hooks

```jsx
// hooks/useUser.js
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateProfile } from '../actions';

export function useUser() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const loginUser = useCallback((credentials) => {
    dispatch(login(credentials));
  }, [dispatch]);
  
  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  
  const updateUserProfile = useCallback((profile) => {
    dispatch(updateProfile(profile));
  }, [dispatch]);
  
  return {
    user,
    isLoggedIn: !!user,
    login: loginUser,
    logout: logoutUser,
    updateProfile: updateUserProfile
  };
}
```

## Error Handling

```jsx
function TodoList() {
  const todos = useSelector(state => state.todos);
  const error = useSelector(state => state.ui.error);
  const loading = useSelector(state => state.ui.loading);
  const dispatch = useDispatch();
  
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => dispatch({ type: 'CLEAR_ERROR' })}>
          Dismiss
        </button>
      </div>
    );
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## Complete Example

```jsx
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

// Selectors
const selectTodos = state => state.todos;
const selectFilter = state => state.ui.filter;

const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
);

// Action creators
const addTodo = (text) => ({ type: 'ADD_TODO', payload: text });
const toggleTodo = (id) => ({ type: 'TOGGLE_TODO', payload: id });
const deleteTodo = (id) => ({ type: 'DELETE_TODO', payload: id });
const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter });

function TodoApp() {
  const todos = useSelector(selectFilteredTodos);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  
  const handleAddTodo = useCallback((text) => {
    dispatch(addTodo(text));
  }, [dispatch]);
  
  const handleToggleTodo = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);
  
  const handleDeleteTodo = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);
  
  const handleSetFilter = useCallback((newFilter) => {
    dispatch(setFilter(newFilter));
  }, [dispatch]);
  
  return (
    <div>
      <div>
        <button onClick={() => handleSetFilter('all')}>All</button>
        <button onClick={() => handleSetFilter('active')}>Active</button>
        <button onClick={() => handleSetFilter('completed')}>Completed</button>
      </div>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              onClick={() => handleToggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      <button onClick={() => handleAddTodo('New Todo')}>
        Add Todo
      </button>
    </div>
  );
}

export default TodoApp;
```
