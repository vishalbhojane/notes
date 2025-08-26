# Redux Selectors

Selectors are functions that extract specific pieces of data from the Redux state.

## What are Selectors?

- Functions that compute derived data from the Redux state
- Help encapsulate state shape knowledge
- Can be memoized for performance optimization
- Make components more reusable

## Basic Selectors

### Simple Selectors

```javascript
// Basic selector
const selectTodos = (state) => state.todos;

// Selector with transformation
const selectCompletedTodos = (state) => 
  state.todos.filter(todo => todo.completed);

// Selector with parameters
const selectTodoById = (state, todoId) => 
  state.todos.find(todo => todo.id === todoId);
```

### Multiple Selectors

```javascript
// Select multiple pieces of state
const selectTodoState = (state) => ({
  todos: state.todos,
  loading: state.loading,
  error: state.error
});

// Select with ownProps
const selectTodoById = (state, ownProps) => 
  state.todos.find(todo => todo.id === ownProps.todoId);
```

## Memoized Selectors with Reselect

Reselect provides a way to create memoized selectors that only recompute when their inputs change.

### Installation

```bash
npm install reselect
```

### Basic Memoized Selector

```javascript
import { createSelector } from 'reselect';

// Base selectors
const selectTodos = (state) => state.todos;
const selectFilter = (state) => state.filter;

// Memoized selector
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
```

### Multiple Input Selectors

```javascript
const selectTodos = (state) => state.todos;
const selectUser = (state) => state.user;
const selectFilter = (state) => state.filter;

const selectUserTodos = createSelector(
  [selectTodos, selectUser, selectFilter],
  (todos, user, filter) => {
    const userTodos = todos.filter(todo => todo.userId === user.id);
    
    switch (filter) {
      case 'completed':
        return userTodos.filter(todo => todo.completed);
      case 'active':
        return userTodos.filter(todo => !todo.completed);
      default:
        return userTodos;
    }
  }
);
```

### Computed Values

```javascript
const selectTodos = (state) => state.todos;

const selectTodoStats = createSelector(
  [selectTodos],
  (todos) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const percentCompleted = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    return {
      total,
      completed,
      active,
      percentCompleted
    };
  }
);
```

## Advanced Selector Patterns

### Chaining Selectors

```javascript
const selectTodos = (state) => state.todos;
const selectFilter = (state) => state.filter;

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

const selectFilteredTodoCount = createSelector(
  [selectFilteredTodos],
  (filteredTodos) => filteredTodos.length
);
```

### Selector with Parameters

```javascript
const selectTodos = (state) => state.todos;

// Factory function for parameterized selector
const makeSelectTodoById = () => createSelector(
  [selectTodos, (state, todoId) => todoId],
  (todos, todoId) => todos.find(todo => todo.id === todoId)
);

// Usage
const selectTodoById = makeSelectTodoById();
```

### Normalized State Selectors

```javascript
const selectTodosById = (state) => state.todos.byId;
const selectTodoIds = (state) => state.todos.allIds;

const selectAllTodos = createSelector(
  [selectTodosById, selectTodoIds],
  (todosById, todoIds) => todoIds.map(id => todosById[id])
);

const selectTodoById = createSelector(
  [selectTodosById, (state, todoId) => todoId],
  (todosById, todoId) => todosById[todoId]
);
```

## Using Selectors in Components

### With useSelector Hook

```jsx
import { useSelector } from 'react-redux';
import { selectFilteredTodos, selectTodoStats } from './selectors';

function TodoList() {
  const todos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectTodoStats);
  
  return (
    <div>
      <div>Total: {stats.total}, Completed: {stats.completed}</div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### With connect

```jsx
import { connect } from 'react-redux';
import { selectFilteredTodos } from './selectors';

const mapStateToProps = (state) => ({
  todos: selectFilteredTodos(state)
});

export default connect(mapStateToProps)(TodoList);
```

### With Parameters

```jsx
import { useSelector } from 'react-redux';

function TodoItem({ todoId }) {
  const todo = useSelector(state => 
    state.todos.find(t => t.id === todoId)
  );
  
  return <div>{todo.text}</div>;
}
```

## Performance Optimization

### Preventing Unnecessary Re-renders

```jsx
// Bad - creates new object on every render
const mapStateToProps = (state) => ({
  todos: state.todos.filter(todo => !todo.completed)
});

// Good - use memoized selector
const selectActiveTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => !todo.completed)
);

const mapStateToProps = (state) => ({
  todos: selectActiveTodos(state)
});
```

### Using shallowEqual

```jsx
import { useSelector, shallowEqual } from 'react-redux';

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

## Selector Best Practices

### 1. Keep Selectors Simple

```javascript
// Good - simple and focused
const selectTodos = (state) => state.todos;
const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => todo.completed)
);

// Bad - too complex
const selectComplexData = (state) => {
  // Complex logic here
  return {
    todos: state.todos.filter(todo => todo.completed),
    users: state.users.filter(user => user.active),
    // ... more complex transformations
  };
};
```

### 2. Use Descriptive Names

```javascript
// Good - descriptive names
const selectActiveTodos = (state) => 
  state.todos.filter(todo => !todo.completed);

const selectTodoCount = (state) => state.todos.length;

// Bad - unclear names
const selectData = (state) => state.todos;
const selectCount = (state) => state.todos.length;
```

### 3. Group Related Selectors

```javascript
// todos/selectors.js
export const selectTodos = (state) => state.todos;
export const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => todo.completed)
);
export const selectActiveTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => !todo.completed)
);
export const selectTodoCount = createSelector(
  [selectTodos],
  (todos) => todos.length
);
```

### 4. Handle Edge Cases

```javascript
const selectTodoById = createSelector(
  [selectTodos, (state, todoId) => todoId],
  (todos, todoId) => {
    if (!todoId) return null;
    return todos.find(todo => todo.id === todoId) || null;
  }
);
```

## Testing Selectors

```javascript
import { selectFilteredTodos, selectTodoStats } from './selectors';

describe('Todo Selectors', () => {
  const mockState = {
    todos: [
      { id: 1, text: 'Learn Redux', completed: false },
      { id: 2, text: 'Build app', completed: true },
    ],
    filter: 'all'
  };

  test('selectFilteredTodos returns all todos when filter is all', () => {
    const result = selectFilteredTodos(mockState);
    expect(result).toHaveLength(2);
  });

  test('selectTodoStats calculates correct stats', () => {
    const result = selectTodoStats(mockState);
    expect(result).toEqual({
      total: 2,
      completed: 1,
      active: 1,
      percentCompleted: 50
    });
  });
});
```

## Complete Example

```javascript
// selectors.js
import { createSelector } from 'reselect';

// Base selectors
export const selectTodos = (state) => state.todos;
export const selectFilter = (state) => state.filter;
export const selectUser = (state) => state.user;

// Computed selectors
export const selectFilteredTodos = createSelector(
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

export const selectTodoStats = createSelector(
  [selectTodos],
  (todos) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return {
      total,
      completed,
      active,
      percentCompleted: total === 0 ? 0 : Math.round((completed / total) * 100)
    };
  }
);

export const selectUserTodos = createSelector(
  [selectFilteredTodos, selectUser],
  (filteredTodos, user) => 
    filteredTodos.filter(todo => todo.userId === user.id)
);

// Factory selector
export const makeSelectTodoById = () => createSelector(
  [selectTodos, (state, todoId) => todoId],
  (todos, todoId) => todos.find(todo => todo.id === todoId)
);
```

```jsx
// TodoList.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredTodos, selectTodoStats } from './selectors';

function TodoList() {
  const todos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectTodoStats);
  
  return (
    <div>
      <div className="stats">
        <span>Total: {stats.total}</span>
        <span>Active: {stats.active}</span>
        <span>Completed: {stats.completed}</span>
        <span>Progress: {stats.percentCompleted}%</span>
      </div>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```
