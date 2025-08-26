# React-Redux Introduction

React-Redux is the official React binding for Redux, providing a way to connect React components to the Redux store.

## What is React-Redux?

- Official React binding for Redux
- Provides `Provider` component to make store available to components
- Offers `connect` function and hooks to connect components to store
- Handles store subscriptions and re-rendering automatically

## Why Use React-Redux?

- **Automatic Re-rendering**: Components re-render when relevant state changes
- **Performance Optimization**: Only re-renders when connected state changes
- **Store Access**: Provides easy access to store from any component
- **Subscription Management**: Handles store subscriptions automatically

## Basic Setup

### Provider Component

Wrap your app with the `Provider` component to make the store available.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Store Structure

```javascript
// Example store structure
{
  todos: [
    { id: 1, text: 'Learn Redux', completed: false },
    { id: 2, text: 'Build app', completed: true }
  ],
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  },
  ui: {
    loading: false,
    theme: 'light'
  }
}
```

## Connecting Components

### Using connect (Class Components)

```jsx
import React from 'react';
import { connect } from 'react-redux';

class TodoList extends React.Component {
  render() {
    const { todos, loading } = this.props;
    
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
}

// Map state to props
const mapStateToProps = (state) => ({
  todos: state.todos,
  loading: state.ui.loading
});

// Map dispatch to props
const mapDispatchToProps = (dispatch) => ({
  addTodo: (text) => dispatch({ type: 'ADD_TODO', payload: text }),
  toggleTodo: (id) => dispatch({ type: 'TOGGLE_TODO', payload: id })
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

### Using Hooks (Functional Components)

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function TodoList() {
  const todos = useSelector(state => state.todos);
  const loading = useSelector(state => state.ui.loading);
  const dispatch = useDispatch();
  
  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };
  
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo('New Todo')}>Add Todo</button>
    </div>
  );
}

export default TodoList;
```

## Key Concepts

### State Mapping

Connect specific parts of the Redux state to component props.

```jsx
// Map entire state
const mapStateToProps = (state) => state;

// Map specific parts
const mapStateToProps = (state) => ({
  todos: state.todos,
  user: state.user
});

// Map with ownProps
const mapStateToProps = (state, ownProps) => ({
  todo: state.todos.find(todo => todo.id === ownProps.todoId)
});
```

### Dispatch Mapping

Connect action creators to component props.

```jsx
// Map dispatch functions
const mapDispatchToProps = (dispatch) => ({
  addTodo: (text) => dispatch({ type: 'ADD_TODO', payload: text }),
  deleteTodo: (id) => dispatch({ type: 'DELETE_TODO', payload: id })
});

// Map action creators (shorthand)
const mapDispatchToProps = {
  addTodo: (text) => ({ type: 'ADD_TODO', payload: text }),
  deleteTodo: (id) => ({ type: 'DELETE_TODO', payload: id })
};
```

### Selectors

Functions that extract specific data from the state.

```jsx
// Simple selector
const selectTodos = (state) => state.todos;

// Computed selector
const selectCompletedTodos = (state) => 
  state.todos.filter(todo => todo.completed);

// Memoized selector (with reselect)
import { createSelector } from 'reselect';

const selectTodos = (state) => state.todos;
const selectFilter = (state) => state.ui.filter;

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

## Performance Considerations

### Preventing Unnecessary Re-renders

```jsx
// Bad - creates new object on every render
const mapStateToProps = (state) => ({
  todos: state.todos.filter(todo => !todo.completed)
});

// Good - use selectors
const selectActiveTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => !todo.completed)
);

const mapStateToProps = (state) => ({
  todos: selectActiveTodos(state)
});
```

### Using React.memo

```jsx
import React from 'react';

const TodoItem = React.memo(({ todo, onToggle }) => (
  <li onClick={() => onToggle(todo.id)}>
    {todo.text}
  </li>
));
```

## Best Practices

### 1. Keep Components Focused

```jsx
// Good - focused component
function TodoItem({ todo, onToggle }) {
  return (
    <li onClick={() => onToggle(todo.id)}>
      {todo.text}
    </li>
  );
}

// Bad - component doing too much
function TodoApp() {
  const todos = useSelector(state => state.todos);
  const user = useSelector(state => state.user);
  const theme = useSelector(state => state.ui.theme);
  // ... too many responsibilities
}
```

### 2. Use Selectors for Data Transformation

```jsx
// Good - selector handles transformation
const selectTodoCount = createSelector(
  [selectTodos],
  (todos) => todos.length
);

// Bad - transformation in component
function TodoCount() {
  const todos = useSelector(state => state.todos);
  const count = todos.length; // transformation in component
  return <div>{count} todos</div>;
}
```

### 3. Normalize State Shape

```jsx
// Good - normalized state
{
  todos: {
    byId: {
      1: { id: 1, text: 'Learn Redux', completed: false },
      2: { id: 2, text: 'Build app', completed: true }
    },
    allIds: [1, 2]
  }
}

// Bad - nested state
{
  todos: [
    { id: 1, text: 'Learn Redux', completed: false },
    { id: 2, text: 'Build app', completed: true }
  ]
}
```
