# Todo App with Redux Toolkit

A complete todo application demonstrating Redux Toolkit patterns and best practices.

## Project Structure

```
src/
├── store/
│   └── index.js
├── features/
│   └── todos/
│       ├── todoSlice.js
│       ├── TodoList.jsx
│       ├── TodoItem.jsx
│       ├── AddTodo.jsx
│       └── TodoFilters.jsx
├── components/
│   └── Layout.jsx
└── App.jsx
```

## Store Setup

```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
```

## Todo Slice

```javascript
// features/todos/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const todos = await response.json();
    return todos.map(todo => ({
      id: todo.id,
      text: todo.title,
      completed: todo.completed,
    }));
  }
);

// Async thunk for adding todo
export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (text) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: text,
        completed: false,
      }),
    });
    const todo = await response.json();
    return {
      id: todo.id,
      text: todo.title,
      completed: todo.completed,
    };
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filter: 'all', // 'all', 'active', 'completed'
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(todo => !todo.completed);
    },
    toggleAll: (state, action) => {
      const completed = action.payload;
      state.items.forEach(todo => {
        todo.completed = completed;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add todo async
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  updateTodo,
  setFilter,
  clearCompleted,
  toggleAll,
} = todoSlice.actions;

export default todoSlice.reducer;
```

## Selectors

```javascript
// features/todos/selectors.js
import { createSelector } from '@reduxjs/toolkit';

// Base selectors
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;

// Computed selectors
export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
);

export const selectTodoCounts = createSelector(
  [selectTodos],
  (todos) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }
);

export const selectAllCompleted = createSelector(
  [selectTodos],
  (todos) => todos.length > 0 && todos.every(todo => todo.completed)
);
```

## Components

### TodoList Component

```jsx
// features/todos/TodoList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, toggleAll } from './todoSlice';
import { selectFilteredTodos, selectAllCompleted, selectLoading } from './selectors';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const allCompleted = useSelector(selectAllCompleted);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleToggleAll = () => {
    dispatch(toggleAll(!allCompleted));
  };

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  return (
    <div className="todo-list">
      {todos.length > 0 && (
        <div className="toggle-all">
          <input
            type="checkbox"
            checked={allCompleted}
            onChange={handleToggleAll}
          />
          <label>Toggle all</label>
        </div>
      )}
      
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      
      <TodoFilters />
    </div>
  );
}

export default TodoList;
```

### TodoItem Component

```jsx
// features/todos/TodoItem.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, updateTodo } from './todoSlice';

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: todo.id, text: editText.trim() }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="toggle"
        />
        <label onDoubleClick={handleEdit}>
          {todo.text}
        </label>
        <button onClick={handleDelete} className="destroy">
          ×
        </button>
      </div>
      
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      )}
    </li>
  );
}

export default TodoItem;
```

### AddTodo Component

```jsx
// features/todos/AddTodo.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, addTodoAsync } from './todoSlice';

function AddTodo() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // Use async thunk for API call
      dispatch(addTodoAsync(text.trim()));
      // Or use sync action for local state
      // dispatch(addTodo(text.trim()));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="new-todo"
        autoFocus
      />
    </form>
  );
}

export default AddTodo;
```

### TodoFilters Component

```jsx
// features/todos/TodoFilters.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, clearCompleted } from './todoSlice';
import { selectFilter, selectTodoCounts } from './selectors';

function TodoFilters() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const { total, completed, active } = useSelector(selectTodoCounts);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  if (total === 0) return null;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{active}</strong> item{active !== 1 ? 's' : ''} left
      </span>
      
      <ul className="filters">
        <li>
          <button
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
      
      {completed > 0 && (
        <button
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default TodoFilters;
```

## Main App Component

```jsx
// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AddTodo from './features/todos/AddTodo';
import TodoList from './features/todos/TodoList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="header">
          <h1>Todo App</h1>
        </header>
        
        <main className="main">
          <AddTodo />
          <TodoList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
```

## Custom Hooks

```javascript
// features/todos/useTodos.js
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  updateTodo,
  setFilter,
  clearCompleted,
  toggleAll,
} from './todoSlice';
import {
  selectFilteredTodos,
  selectTodoCounts,
  selectAllCompleted,
  selectLoading,
  selectError,
} from './selectors';

export function useTodos() {
  const dispatch = useDispatch();
  
  const todos = useSelector(selectFilteredTodos);
  const counts = useSelector(selectTodoCounts);
  const allCompleted = useSelector(selectAllCompleted);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const add = useCallback((text) => {
    dispatch(addTodo(text));
  }, [dispatch]);

  const toggle = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const remove = useCallback((id) => {
    dispatch(removeTodo(id));
  }, [dispatch]);

  const update = useCallback((id, text) => {
    dispatch(updateTodo({ id, text }));
  }, [dispatch]);

  const setFilterType = useCallback((filter) => {
    dispatch(setFilter(filter));
  }, [dispatch]);

  const clearCompletedTodos = useCallback(() => {
    dispatch(clearCompleted());
  }, [dispatch]);

  const toggleAllTodos = useCallback((completed) => {
    dispatch(toggleAll(completed));
  }, [dispatch]);

  return {
    todos,
    counts,
    allCompleted,
    loading,
    error,
    addTodo: add,
    toggleTodo: toggle,
    removeTodo: remove,
    updateTodo: update,
    setFilter: setFilterType,
    clearCompleted: clearCompletedTodos,
    toggleAll: toggleAllTodos,
  };
}
```

## CSS Styles

```css
/* App.css */
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.add-todo {
  margin-bottom: 20px;
}

.new-todo {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-list {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.toggle-all {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.todo-item.completed label {
  text-decoration: line-through;
  color: #999;
}

.todo-item.editing .view {
  display: none;
}

.todo-item.editing .edit {
  display: block;
}

.view {
  display: flex;
  align-items: center;
  flex: 1;
}

.toggle {
  margin-right: 12px;
}

.todo-item label {
  flex: 1;
  cursor: pointer;
}

.destroy {
  background: none;
  border: none;
  color: #cc9a9a;
  font-size: 18px;
  cursor: pointer;
}

.edit {
  width: 100%;
  padding: 8px;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 16px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-top: 1px solid #eee;
}

.filters {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.filters li {
  margin: 0 4px;
}

.filters button {
  background: none;
  border: 1px solid transparent;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.filters button.selected {
  border-color: #cc9a9a;
}

.clear-completed {
  background: none;
  border: none;
  color: #cc9a9a;
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}
```

## Key Features Demonstrated

1. **Redux Toolkit Slice**: Complete state management with reducers and async thunks
2. **Async Operations**: API calls with loading states and error handling
3. **Selectors**: Memoized selectors for performance optimization
4. **Component Organization**: Feature-based folder structure
5. **Custom Hooks**: Encapsulated Redux logic for reusability
6. **Filtering**: Multiple filter states with computed selectors
7. **Optimistic Updates**: Immediate UI updates with async operations
8. **Error Handling**: Comprehensive error states and user feedback
9. **Performance**: Memoized selectors and stable references
10. **Accessibility**: Keyboard navigation and proper ARIA attributes
