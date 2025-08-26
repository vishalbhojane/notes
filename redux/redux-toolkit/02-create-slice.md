# Redux Toolkit createSlice

`createSlice` is a function that generates action creators and action types automatically, based on the reducer functions you provide.

## What is createSlice?

- Automatically generates action creators and action types
- Uses Immer for immutable updates
- Reduces boilerplate code significantly
- Provides a more intuitive way to write reducers

## Basic Usage

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

## Slice Configuration

### Name

The `name` property is used to generate action types.

```javascript
const todoSlice = createSlice({
  name: 'todos', // Action types will be: 'todos/addTodo', 'todos/toggleTodo', etc.
  // ...
});
```

### Initial State

The `initialState` can be any value that your reducer should return initially.

```javascript
// Simple state
const initialState = [];

// Object state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Complex state
const initialState = {
  entities: {},
  ids: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    priority: 'all',
  },
};
```

### Reducers

The `reducers` object contains functions that handle state updates.

```javascript
reducers: {
  // Simple reducer
  increment: (state) => {
    state.count += 1;
  },
  
  // Reducer with payload
  addTodo: (state, action) => {
    state.items.push(action.payload);
  },
  
  // Reducer with multiple parameters
  updateTodo: (state, action) => {
    const { id, text, completed } = action.payload;
    const todo = state.items.find(todo => todo.id === id);
    if (todo) {
      todo.text = text;
      todo.completed = completed;
    }
  },
  
  // Reducer that replaces state
  setTodos: (state, action) => {
    state.items = action.payload;
  },
}
```

## Action Payloads

### Simple Payload

```javascript
reducers: {
  addTodo: (state, action) => {
    // action.payload is the value passed to the action creator
    state.items.push(action.payload);
  },
}

// Usage
dispatch(addTodo({ id: 1, text: 'Learn Redux', completed: false }));
```

### Structured Payload

```javascript
reducers: {
  updateTodo: (state, action) => {
    const { id, text, completed } = action.payload;
    const todo = state.items.find(todo => todo.id === id);
    if (todo) {
      todo.text = text;
      todo.completed = completed;
    }
  },
}

// Usage
dispatch(updateTodo({ id: 1, text: 'Updated text', completed: true }));
```

### No Payload

```javascript
reducers: {
  clearTodos: (state) => {
    state.items = [];
  },
  increment: (state) => {
    state.count += 1;
  },
}

// Usage
dispatch(clearTodos());
dispatch(increment());
```

## Immutable Updates with Immer

Immer allows you to write "mutative" code that's actually immutable.

### Array Updates

```javascript
reducers: {
  addTodo: (state, action) => {
    // This looks like mutation but isn't!
    state.items.push(action.payload);
  },
  
  removeTodo: (state, action) => {
    // Filter creates a new array
    state.items = state.items.filter(todo => todo.id !== action.payload);
  },
  
  updateTodo: (state, action) => {
    const { id, text } = action.payload;
    const todo = state.items.find(todo => todo.id === id);
    if (todo) {
      // This looks like mutation but isn't!
      todo.text = text;
    }
  },
}
```

### Object Updates

```javascript
reducers: {
  updateUser: (state, action) => {
    // Spread operator for shallow updates
    state.user = { ...state.user, ...action.payload };
  },
  
  updateUserProfile: (state, action) => {
    // Nested updates
    state.user.profile.name = action.payload.name;
    state.user.profile.email = action.payload.email;
  },
  
  setLoading: (state, action) => {
    state.loading = action.payload;
  },
}
```

### Nested Updates

```javascript
reducers: {
  updateTodoStatus: (state, action) => {
    const { todoId, status } = action.payload;
    const todo = state.items.find(todo => todo.id === todoId);
    if (todo) {
      todo.status = status;
      todo.updatedAt = new Date().toISOString();
    }
  },
  
  updateUserPreferences: (state, action) => {
    const { theme, language } = action.payload;
    state.user.preferences.theme = theme;
    state.user.preferences.language = language;
  },
}
```

## Action Creators

`createSlice` automatically generates action creators for each reducer.

```javascript
const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [] },
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
  },
});

// Generated action creators
export const { addTodo, toggleTodo } = todoSlice.actions;

// Usage
dispatch(addTodo({ id: 1, text: 'Learn Redux', completed: false }));
dispatch(toggleTodo(1));
```

## Custom Action Creators

You can customize action creators by providing a function instead of a reducer.

```javascript
const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [] },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (text) => {
        return {
          payload: {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
  },
});

// Usage - only need to pass the text
dispatch(addTodo('Learn Redux'));
```

## Extra Reducers

Use `extraReducers` to handle actions from other slices or async thunks.

```javascript
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
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
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
      // Handle actions from other slices
      .addCase('user/logout', (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});
```

## TypeScript Support

`createSlice` has excellent TypeScript support.

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.items.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
```

## Best Practices

### 1. Keep Slices Focused

```javascript
// Good - focused on todos
const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [] },
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
  },
});

// Bad - mixing concerns
const appSlice = createSlice({
  name: 'app',
  initialState: { todos: [], users: [], settings: {} },
  reducers: {
    // Too many different concerns
  },
});
```

### 2. Use Descriptive Names

```javascript
// Good - descriptive names
reducers: {
  addTodo: (state, action) => { /* ... */ },
  toggleTodoCompletion: (state, action) => { /* ... */ },
  removeTodoById: (state, action) => { /* ... */ },
}

// Bad - unclear names
reducers: {
  add: (state, action) => { /* ... */ },
  toggle: (state, action) => { /* ... */ },
  remove: (state, action) => { /* ... */ },
}
```

### 3. Handle Edge Cases

```javascript
reducers: {
  updateTodo: (state, action) => {
    const { id, text } = action.payload;
    const todo = state.items.find(todo => todo.id === id);
    if (todo) {
      todo.text = text;
    }
    // Handle case where todo is not found
  },
  
  removeTodo: (state, action) => {
    const todoId = action.payload;
    const index = state.items.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      state.items.splice(index, 1);
    }
  },
}
```

### 4. Use Normalized State

```javascript
import { createEntityAdapter } from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter();

const todoSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {
    addTodo: todosAdapter.addOne,
    updateTodo: todosAdapter.updateOne,
    removeTodo: todosAdapter.removeOne,
    setTodos: todosAdapter.setAll,
  },
});
```

## Complete Example

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (text) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, completed: false }),
    });
    return response.json();
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filter: 'all',
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (text) => ({
        payload: {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      }),
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
        todo.updatedAt = new Date().toISOString();
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

## Key Benefits

1. **Less Boilerplate**: No need to write action types or action creators manually
2. **Immer Integration**: Write "mutative" code that's actually immutable
3. **TypeScript Support**: Excellent TypeScript integration
4. **DevTools Integration**: Works seamlessly with Redux DevTools
5. **Performance**: Optimized for performance with minimal re-renders
6. **Predictable**: Follows Redux patterns and best practices
