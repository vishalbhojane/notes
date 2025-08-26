# Redux Toolkit Introduction

Redux Toolkit (RTK) is the official, opinionated, batteries-included toolset for efficient Redux development.

## What is Redux Toolkit?

- Official, recommended way to write Redux logic
- Includes utilities to simplify common Redux use cases
- Reduces boilerplate code significantly
- Includes best practices by default

## Why Use Redux Toolkit?

- **Less Boilerplate**: Reduces the amount of code you need to write
- **Best Practices**: Includes recommended patterns out of the box
- **TypeScript Support**: Built-in TypeScript support
- **DevTools**: Includes Redux DevTools Extension by default
- **Immutability**: Uses Immer for immutable updates
- **Performance**: Optimized for performance

## Key Features

1. **configureStore**: Enhanced store setup with good defaults
2. **createSlice**: Generate action creators and action types automatically
3. **createAsyncThunk**: Handle async logic easily
4. **createEntityAdapter**: Manage normalized state
5. **Immer Integration**: Write "mutative" logic that's actually immutable

## Installation

```bash
npm install @reduxjs/toolkit react-redux
```

## Basic Setup

### Store Configuration

```javascript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
```

### Slice Creation

```javascript
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
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
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

## Comparison: Traditional Redux vs Redux Toolkit

### Traditional Redux

```javascript
// Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

// Action creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id
});

// Reducer
const todoReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case REMOVE_TODO:
      return {
        ...state,
        items: state.items.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};
```

### Redux Toolkit

```javascript
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
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
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

## Key Benefits

### 1. Less Code

- No need to write action types manually
- No need to write action creators manually
- No need to write immutable update logic manually

### 2. Immer Integration

```javascript
// With Redux Toolkit (Immer)
reducers: {
  addTodo: (state, action) => {
    state.items.push(action.payload); // This looks like mutation but isn't!
  },
}

// Traditional Redux
case ADD_TODO:
  return {
    ...state,
    items: [...state.items, action.payload]
  };
```

### 3. TypeScript Support

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [] as Todo[],
  },
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
  },
});
```

### 4. DevTools Integration

```javascript
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  // DevTools are enabled by default in development
});
```

## Store Setup

### Basic Store

```javascript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});

export default store;
```

### Store with Middleware

```javascript
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});
```

### Store with Preloaded State

```javascript
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: {
    todos: {
      items: [
        { id: 1, text: 'Learn Redux Toolkit', completed: false }
      ],
    },
  },
});
```

## Best Practices

### 1. Use Slices for Feature Organization

```javascript
// features/todos/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [] },
  reducers: {
    // ... reducers
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

### 2. Normalize State Shape

```javascript
import { createEntityAdapter } from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter();

const todoSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: todosAdapter.addOne,
    updateTodo: todosAdapter.updateOne,
    removeTodo: todosAdapter.removeOne,
  },
});
```

### 3. Use Async Thunks for Side Effects

```javascript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});
```

## Migration from Traditional Redux

### Step 1: Install Redux Toolkit

```bash
npm install @reduxjs/toolkit
```

### Step 2: Replace createStore

```javascript
// Before
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

// After
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});
```

### Step 3: Convert Reducers to Slices

```javascript
// Before: Separate action types, creators, and reducer
// After: Single slice file with everything
```

### Step 4: Update Imports

```javascript
// Before
import { addTodo, toggleTodo } from './actions';

// After
import { addTodo, toggleTodo } from './todoSlice';
```

## Complete Example

```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});

export default store;

// todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
```
